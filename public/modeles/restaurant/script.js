const RESTAURANT_WHATSAPP_NUMBER = "";
const WHATSAPP_NUMBER_DIGITS = RESTAURANT_WHATSAPP_NUMBER.replace(/\D/g, "");
const currencyFormatter = new Intl.NumberFormat("fr-FR");

function openWhatsAppMessage(message, fallbackLink) {
  if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER_DIGITS)) return false;

  const url = `https://wa.me/${WHATSAPP_NUMBER_DIGITS}?text=${encodeURIComponent(message)}`;
  fallbackLink.href = url;
  const openedWindow = window.open(url, "_blank");
  if (openedWindow) openedWindow.opener = null;
  fallbackLink.hidden = Boolean(openedWindow);
  return Boolean(openedWindow);
}

function validatePhoneField(field) {
  if (!(field instanceof HTMLInputElement)) return;
  const digits = field.value.replace(/\D/g, "");
  field.setCustomValidity(
    digits.length >= 8 && digits.length <= 15
      ? ""
      : "Saisissez un numéro de rappel valide, avec l’indicatif du pays si nécessaire.",
  );
}

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
const menuCards = [...document.querySelectorAll(".dish-card")];

document.querySelectorAll("[data-menu-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.menuFilter;
    document.querySelectorAll(".menu-filter").forEach((filter) => {
      const isActive = filter === button;
      filter.classList.toggle("is-active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });
    menuCards.forEach((card) => {
      card.hidden = category !== "all" && card.dataset.menuCategory !== category;
    });
  });
});

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.querySelector(".sr-only").textContent = isOpen ? "Ouvrir le menu" : "Fermer le menu";
  navigation?.classList.toggle("is-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    const label = menuToggle?.querySelector(".sr-only");
    if (label) label.textContent = "Ouvrir le menu";
  });
});

const reservationForm = document.querySelector("#reservation-form");
const formStatus = document.querySelector("#form-status");
const reservationFallback = document.querySelector("#reservation-whatsapp-fallback");
const dateField = reservationForm?.elements.namedItem("date");
const timeField = reservationForm?.elements.namedItem("time");
const phoneField = reservationForm?.elements.namedItem("phone");
const requestPreview = document.querySelector("#request-preview");
const requestPreviewContent = document.querySelector("#request-preview-content");
const reservationDownload = document.querySelector("#reservation-download");
const reservationMenuOptions = document.querySelector("#reservation-menu-options");
let latestReservationSummary = "";

menuCards.forEach((card, index) => {
  const name = card.querySelector(".dish-title h3").textContent.trim();
  const price = Number(card.dataset.price);
  const option = document.createElement("div");
  option.className = "preorder-option";

  const label = document.createElement("label");
  label.className = "preorder-dish";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "preorder";
  checkbox.value = name;
  checkbox.id = `preorder-${index}`;
  const dish = document.createElement("span");
  dish.textContent = `${name} · ${currencyFormatter.format(price)} FCFA`;
  label.append(checkbox, dish);

  const quantity = document.createElement("select");
  quantity.className = "preorder-quantity";
  quantity.name = "preorder-quantity";
  quantity.dataset.itemName = name;
  quantity.disabled = true;
  quantity.setAttribute("aria-label", `Quantité souhaitée pour ${name}`);
  for (let count = 1; count <= 10; count += 1) {
    quantity.add(new Option(String(count), String(count)));
  }

  checkbox.addEventListener("change", () => {
    quantity.disabled = !checkbox.checked;
    reservationDownload.hidden = true;
  });
  option.append(label, quantity);
  reservationMenuOptions.append(option);
});

function getLocalDateValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function setAvailableTimes() {
  if (!(dateField instanceof HTMLInputElement) || !(timeField instanceof HTMLSelectElement)) return;

  timeField.replaceChildren(new Option("Choisir un créneau", ""));
  if (!dateField.value) {
    timeField.disabled = true;
    return;
  }

  const [year, month, day] = dateField.value.split("-").map(Number);
  const selectedDate = new Date(year, month - 1, day);
  if (selectedDate.getDay() === 1) {
    dateField.value = "";
    timeField.disabled = true;
    formStatus.textContent = "Maison Naya est fermée le lundi. Choisissez un autre jour.";
    return;
  }

  timeField.disabled = false;
  const times = ["11:30", "12:00", "12:30", "13:00", "13:30", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
  times.forEach((time) => timeField.add(new Option(time, time)));
  formStatus.textContent = "Créneaux d’exemple uniquement ; la disponibilité réelle doit être confirmée.";
}

if (dateField instanceof HTMLInputElement) {
  dateField.min = getLocalDateValue();
  dateField.addEventListener("change", setAvailableTimes);
}
setAvailableTimes();

if (phoneField instanceof HTMLInputElement) {
  phoneField.addEventListener("input", () => validatePhoneField(phoneField));
}

reservationForm?.addEventListener("input", () => {
  requestPreview.hidden = true;
  reservationFallback.hidden = true;
  reservationDownload.hidden = true;
  latestReservationSummary = "";
});

reservationForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  validatePhoneField(phoneField);
  if (!reservationForm.reportValidity()) return;

  const formData = new FormData(reservationForm);
  const selectedDate = String(formData.get("date"));
  const [year, month, day] = selectedDate.split("-").map(Number);
  if (new Date(year, month - 1, day).getDay() === 1) {
    formStatus.textContent = "Le restaurant est fermé le lundi. Choisissez un autre jour.";
    return;
  }

  const preorder = [...reservationForm.querySelectorAll('input[name="preorder"]:checked')].map((checkbox) => {
    const quantity = reservationForm.querySelector(`select[data-item-name="${CSS.escape(checkbox.value)}"]`).value;
    const card = menuCards.find((menuCard) => menuCard.querySelector(".dish-title h3").textContent.trim() === checkbox.value);
    return {
      name: checkbox.value,
      quantity: Number(quantity),
      price: Number(card.dataset.price),
    };
  });
  const preorderLines = preorder.length
    ? preorder.map(({ name, quantity, price }) =>
        `- ${name} × ${quantity} · ${currencyFormatter.format(price * quantity)} FCFA (prix indicatif)`,
      )
    : ["Aucun plat demandé à l’avance."];
  const preorderEstimate = preorder.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const occasion = String(formData.get("occasion")).trim() || "Aucune occasion particulière";
  const seating = String(formData.get("seating")).trim() || "Aucune préférence";
  const notes = String(formData.get("notes")).trim() || "Aucune précision";
  const reference = `NAYA-${getLocalDateValue().replaceAll("-", "")}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  const reservationDate = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(
    new Date(year, month - 1, day),
  );
  const message = [
    "Bonjour, je souhaite demander une réservation chez Maison Naya.",
    `Référence de demande : ${reference}`,
    `Nom : ${formData.get("name")}`,
    `Téléphone : ${formData.get("phone")}`,
    `Date : ${reservationDate}`,
    `Heure : ${formData.get("time")}`,
    `Nombre de personnes : ${formData.get("guests")}`,
    `Occasion : ${occasion}`,
    `Préférence de placement (selon disponibilité) : ${seating}`,
    "",
    "Plats souhaités à préparer (à confirmer par le restaurant) :",
    ...preorderLines,
    ...(preorder.length ? [`Total indicatif des plats : ${currencyFormatter.format(preorderEstimate)} FCFA`] : []),
    `Allergies, régimes ou autres précisions à confirmer : ${notes}`,
    "",
    "Merci de confirmer la disponibilité de la table et des plats. Cette demande n’est pas encore confirmée.",
  ].join("\n");

  latestReservationSummary = [
    "MAISON NAYA — RÉCAPITULATIF DE DEMANDE DE RÉSERVATION",
    `Référence de demande : ${reference}`,
    "STATUT : EN ATTENTE DE CONFIRMATION — CE DOCUMENT N’EST PAS UNE RÉSERVATION CONFIRMÉE.",
    "",
    `Nom : ${formData.get("name")}`,
    `Téléphone : ${formData.get("phone")}`,
    `Date souhaitée : ${reservationDate}`,
    `Heure souhaitée : ${formData.get("time")}`,
    `Nombre de personnes : ${formData.get("guests")}`,
    `Occasion : ${occasion}`,
    `Préférence de placement : ${seating}`,
    "",
    "PLATS SOUHAITÉS À PRÉPARER (À CONFIRMER)",
    ...preorderLines,
    ...(preorder.length
      ? [`Total indicatif : ${currencyFormatter.format(preorderEstimate)} FCFA — prix de démonstration à vérifier.`]
      : []),
    "",
    `Allergies, régimes ou autres précisions : ${notes}`,
    "",
    "À l’arrivée, présentez ce récapitulatif à l’équipe et faites confirmer votre table et les plats.",
    "Les plats, prix, horaires et disponibilités du site sont des informations de démonstration.",
  ].join("\n");
  reservationDownload.hidden = false;

  if (openWhatsAppMessage(message, reservationFallback)) {
    formStatus.textContent =
      "Si WhatsApp s’est ouvert, vérifiez puis envoyez le message. Cette demande n’est pas une réservation confirmée.";
    requestPreview.hidden = true;
  } else if (WHATSAPP_NUMBER_DIGITS.length >= 8 && WHATSAPP_NUMBER_DIGITS.length <= 15) {
    formStatus.textContent = "Le navigateur a bloqué l’ouverture de WhatsApp. Utilisez le lien ci-dessous.";
    requestPreview.hidden = true;
  } else {
    requestPreviewContent.textContent = message;
    requestPreview.hidden = false;
    formStatus.textContent = "Le numéro WhatsApp du restaurant doit être vérifié. Voici l’aperçu de votre demande, non envoyé.";
  }
});

reservationDownload.addEventListener("click", () => {
  if (!latestReservationSummary) return;
  const [title, reference, status, ...details] = latestReservationSummary.split("\n");
  const escapeHtml = (value) =>
    value.replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[character]);
  const documentContent = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <style>
    body{margin:0;padding:32px;background:#eee7db;color:#27251f;font:15px/1.65 Arial,sans-serif}
    main{max-width:760px;margin:0 auto;padding:36px;background:#fffdf9;border:1px solid #d9d1c4}
    header{padding-bottom:22px;border-bottom:2px solid #c69b58}
    .brand{margin:0;color:#263c32;font-weight:bold;letter-spacing:.14em}
    h1{margin:14px 0;color:#263c32;font:500 30px/1.2 Georgia,serif}
    .reference{color:#77736b;font-size:13px}
    .status{margin:22px 0;padding:12px 15px;background:#f7edda;color:#674c20;font-size:13px;font-weight:bold}
    pre{margin:24px 0 0;white-space:pre-wrap;overflow-wrap:anywhere;font:14px/1.8 Arial,sans-serif}
    footer{margin-top:28px;padding-top:16px;border-top:1px solid #ddd5c8;color:#77736b;font-size:12px}
    .print{margin-top:22px;padding:11px 16px;border:0;background:#263c32;color:white;font-weight:bold;cursor:pointer}
    @media print{body{padding:0;background:white}main{max-width:none;border:0;padding:0}.print{display:none}}
  </style>
</head>
<body>
  <main>
    <header><p class="brand">MAISON NAYA · CUISINE &amp; HOSPITALITÉ</p><h1>Demande de réservation</h1><div class="reference">${escapeHtml(reference)}</div></header>
    <p class="status">${escapeHtml(status)}</p>
    <pre>${escapeHtml(details.join("\n").trim())}</pre>
    <footer>Présentez ce récapitulatif à l’équipe à votre arrivée. La disponibilité de la table et des plats doit être confirmée par le restaurant. Ce document n’est ni un billet ni une confirmation.</footer>
    <button class="print" type="button" onclick="window.print()">Imprimer ou enregistrer en PDF</button>
  </main>
</body>
</html>`;
  const file = new Blob([documentContent], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "maison-naya-recapitulatif-reservation.html";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

const orderForm = document.querySelector("#order-form");
const orderItems = document.querySelector("#cart-items");
const emptyCartMessage = document.querySelector("#cart-empty");
const cartCount = document.querySelector("#cart-count");
const menuCartCount = document.querySelector("#menu-cart-count");
const cartTotal = document.querySelector("#cart-total");
const orderSubmit = document.querySelector("#order-submit");
const orderStatus = document.querySelector("#order-status");
const orderFallback = document.querySelector("#order-whatsapp-fallback");
const orderDownload = document.querySelector("#order-download");
const fulfillmentField = document.querySelector("#fulfillment");
const addressField = document.querySelector("#delivery-address-field");
const addressInput = orderForm.elements.namedItem("address");
const orderPhoneField = orderForm.elements.namedItem("phone");
const orderDateField = orderForm.elements.namedItem("date");
const orderTimeField = orderForm.elements.namedItem("time");
const shareLocationButton = document.querySelector("#share-location");
const locationStatus = document.querySelector("#location-status");
const pickupLocation = document.querySelector("#pickup-location");
const cart = new Map();
let latestOrderDetails = null;
const restaurantAddress = "Maison Naya · 12 rue des Flamboyants, Haie Vive, Cotonou (adresse fictive)";
const restaurantMapUrl = "https://www.google.com/maps/search/?api=1&query=Haie+Vive+Cotonou+B%C3%A9nin";

function getOrderTimes(dateValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const selectedDate = new Date(year, month - 1, day);
  if (selectedDate.getDay() === 1) return [];

  const slots = [];
  for (const [start, end] of [[11 * 60 + 30, 14 * 60], [18 * 60 + 30, 21 * 60 + 30]]) {
    for (let minute = start; minute <= end; minute += 30) {
      slots.push(`${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`);
    }
  }

  if (dateValue === getLocalDateValue()) {
    const now = new Date();
    const earliest = now.getHours() * 60 + now.getMinutes() + 30;
    return slots.filter((slot) => {
      const [hour, minute] = slot.split(":").map(Number);
      return hour * 60 + minute >= earliest;
    });
  }
  return slots;
}

function updateOrderTimes() {
  orderTimeField.replaceChildren(new Option("Choisir une heure", ""));
  if (!orderDateField.value) {
    orderTimeField.disabled = true;
    orderTimeField.options[0].textContent = "Choisissez d’abord une date";
    return;
  }
  const slots = getOrderTimes(orderDateField.value);
  const [year, month, day] = orderDateField.value.split("-").map(Number);
  if (new Date(year, month - 1, day).getDay() === 1) {
    orderTimeField.disabled = true;
    orderTimeField.options[0].textContent = "Restaurant fermé le lundi";
    orderStatus.textContent = "Le restaurant est fermé le lundi. Choisissez un autre jour.";
    return;
  }

  if (slots.length === 0) {
    orderTimeField.disabled = true;
    orderTimeField.options[0].textContent = "Aucun créneau restant aujourd’hui";
    orderStatus.textContent = "Il n’y a plus de créneau de démonstration aujourd’hui. Choisissez une autre date.";
    return;
  }

  orderTimeField.disabled = false;
  slots.forEach((time) => orderTimeField.add(new Option(time, time)));
  orderStatus.textContent = "Choisissez un horaire précis ; la disponibilité finale sera confirmée par le restaurant.";
}

orderDateField.min = getLocalDateValue();
orderDateField.addEventListener("change", updateOrderTimes);
orderDateField.value = orderDateField.min;
updateOrderTimes();

function renderCart() {
  orderItems.replaceChildren();
  let itemCount = 0;
  let total = 0;

  cart.forEach((item, name) => {
    itemCount += item.quantity;
    total += item.price * item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";
    const details = document.createElement("div");
    details.className = "cart-item-details";
    const title = document.createElement("strong");
    title.textContent = name;
    const price = document.createElement("span");
    price.textContent = `${currencyFormatter.format(item.price)} FCFA l’unité`;
    details.append(title, price);

    const controls = document.createElement("div");
    controls.className = "cart-item-controls";
    const decrease = document.createElement("button");
    decrease.type = "button";
    decrease.className = "quantity-button";
    decrease.dataset.cartAction = "decrease";
    decrease.dataset.itemName = name;
    decrease.setAttribute("aria-label", `Retirer une portion de ${name}`);
    decrease.textContent = "−";
    const quantity = document.createElement("span");
    quantity.textContent = String(item.quantity);
    quantity.setAttribute("aria-label", "Quantité");
    const increase = document.createElement("button");
    increase.type = "button";
    increase.className = "quantity-button";
    increase.dataset.cartAction = "increase";
    increase.dataset.itemName = name;
    increase.setAttribute("aria-label", `Ajouter une portion de ${name}`);
    increase.textContent = "+";
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-item";
    remove.dataset.cartAction = "remove";
    remove.dataset.itemName = name;
    remove.textContent = "Retirer";
    controls.append(decrease, quantity, increase, remove);
    row.append(details, controls);
    orderItems.append(row);
  });

  emptyCartMessage.hidden = itemCount > 0;
  cartCount.textContent = `${itemCount} ${itemCount === 1 ? "article" : "articles"}`;
  menuCartCount.textContent = String(itemCount);
  cartTotal.textContent = `${currencyFormatter.format(total)} FCFA`;
  orderSubmit.disabled = itemCount === 0;
  menuCards.forEach((card) => {
    const name = card.querySelector(".dish-title h3").textContent.trim();
    const addButton = card.querySelector("[data-add-to-cart]");
    const quantity = cart.get(name)?.quantity ?? 0;
    addButton.textContent = quantity ? `Ajouter encore · ${quantity} au panier` : "Ajouter au panier";
  });
  if (itemCount === 0) orderStatus.textContent = "Ajoutez au moins un article pour continuer.";
}

document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".dish-card");
    const name = card?.querySelector(".dish-title h3")?.textContent.trim();
    const price = Number(card?.dataset.price);
    if (!name || !Number.isSafeInteger(price) || price <= 0) {
      orderStatus.textContent = "Impossible d’ajouter cet article : vérifiez son nom et son prix dans la carte.";
      return;
    }

    const existing = cart.get(name);
    cart.set(name, { price, quantity: (existing?.quantity ?? 0) + 1 });
    renderCart();
    orderStatus.textContent = `${name} ajouté au panier.`;
  });
});

orderItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-cart-action]");
  if (!button) return;
  const name = button.dataset.itemName;
  const item = cart.get(name);
  if (!item) return;

  if (button.dataset.cartAction === "remove" || (button.dataset.cartAction === "decrease" && item.quantity === 1)) {
    cart.delete(name);
  } else if (button.dataset.cartAction === "decrease") {
    item.quantity -= 1;
  } else if (button.dataset.cartAction === "increase") {
    item.quantity += 1;
  }
  renderCart();
});

fulfillmentField.addEventListener("change", () => {
  const isDelivery = fulfillmentField.value === "delivery";
  addressField.hidden = !isDelivery;
  pickupLocation.hidden = isDelivery || fulfillmentField.value !== "pickup";
  addressInput.required = isDelivery;
  if (!isDelivery) locationStatus.textContent = "Vous pouvez décrire le lieu ou partager votre position. Le lien GPS sera inclus dans le message WhatsApp.";
});

shareLocationButton.addEventListener("click", () => {
  if (!("geolocation" in navigator)) {
    locationStatus.textContent = "La géolocalisation n’est pas disponible dans ce navigateur. Décrivez votre adresse et ajoutez un repère.";
    return;
  }

  shareLocationButton.disabled = true;
  locationStatus.textContent = "Recherche de votre position… Autorisez la géolocalisation si votre navigateur le demande.";
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const latitude = coords.latitude.toFixed(6);
      const longitude = coords.longitude.toFixed(6);
      const mapLink = `https://maps.google.com/?q=${latitude},${longitude}`;
      addressInput.value = `Position GPS : ${latitude}, ${longitude}\nLien vers ma position : ${mapLink}`;
      addressInput.dispatchEvent(new Event("input", { bubbles: true }));
      locationStatus.textContent = "Position ajoutée au récapitulatif. Vous pouvez encore compléter l’adresse avec un repère.";
      shareLocationButton.disabled = false;
    },
    (error) => {
      const errors = {
        1: "Autorisation refusée. Autorisez la position dans votre navigateur ou décrivez votre adresse.",
        2: "Position introuvable. Réessayez ou décrivez votre adresse et un repère.",
        3: "La recherche de position a expiré. Réessayez ou décrivez votre adresse.",
      };
      locationStatus.textContent = errors[error.code] ?? "Impossible d’obtenir votre position. Décrivez votre adresse et un repère.";
      shareLocationButton.disabled = false;
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
  );
});

orderPhoneField.addEventListener("input", () => validatePhoneField(orderPhoneField));
orderForm.addEventListener("input", () => {
  orderFallback.hidden = true;
  orderDownload.hidden = true;
  latestOrderDetails = null;
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (cart.size === 0) {
    orderStatus.textContent = "Votre panier est vide. Ajoutez au moins un article avant de continuer.";
    return;
  }
  validatePhoneField(orderPhoneField);
  if (!orderForm.reportValidity()) return;

  const data = new FormData(orderForm);
  const dateValue = String(data.get("date"));
  const [year, month, day] = dateValue.split("-").map(Number);
  const selectedDate = new Date(year, month - 1, day);
  const selectedTime = String(data.get("time"));
  const availableTimes = getOrderTimes(dateValue);
  if (selectedDate.getDay() === 1 || !availableTimes.includes(selectedTime)) {
    orderStatus.textContent = "La date ou l’heure n’est plus valide selon les horaires de démonstration. Choisissez un créneau proposé.";
    updateOrderTimes();
    return;
  }

  const orderDate = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(selectedDate);
  const items = [...cart].map(([name, item]) =>
    `- ${name} × ${item.quantity} : ${currencyFormatter.format(item.price * item.quantity)} FCFA`,
  );
  const printableItems = [...cart].map(([name, item]) => ({
    name,
    quantity: item.quantity,
    unitPrice: item.price,
    total: item.price * item.quantity,
  }));
  const total = [...cart.values()].reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isDelivery = data.get("fulfillment") === "delivery";
  const fulfillment = isDelivery ? "Livraison" : "Retrait au restaurant";
  const destination = isDelivery ? String(data.get("address")).trim() : restaurantAddress;
  const destinationMapUrl = isDelivery
    ? destination.match(/https:\/\/maps\.google\.com\/\?q=[^\s]+/)?.[0] ?? ""
    : restaurantMapUrl;
  const notes = String(data.get("notes")).trim();
  const reference = `NAYA-CMD-${getLocalDateValue().replaceAll("-", "")}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  const message = [
    "Bonjour Maison Naya, je souhaite passer cette commande :",
    `Référence de demande : ${reference}`,
    "",
    ...items,
    "",
    `Sous-total estimé (hors livraison) : ${currencyFormatter.format(total)} FCFA`,
    `Nom : ${data.get("name")}`,
    `Téléphone : ${data.get("phone")}`,
    `Mode : ${fulfillment}`,
    `${isDelivery ? "Adresse / position" : "Lieu de retrait"} : ${destination}`,
    ...(destinationMapUrl ? [`Carte : ${destinationMapUrl}`] : []),
    `Date et heure souhaitées : ${orderDate} à ${selectedTime}`,
    ...(notes ? [`Instructions : ${notes}`] : []),
    "",
    "Merci de confirmer la disponibilité, les frais éventuels et le délai.",
  ].join("\n");

  latestOrderDetails = {
    reference,
    name: String(data.get("name")),
    phone: String(data.get("phone")),
    fulfillment,
    destination,
    destinationMapUrl,
    date: orderDate,
    time: selectedTime,
    notes,
    items: printableItems,
    total,
  };
  orderDownload.hidden = false;

  if (openWhatsAppMessage(message, orderFallback)) {
    orderStatus.textContent = "WhatsApp est ouvert avec votre commande. Vérifiez le récapitulatif puis envoyez le message ; le restaurant confirmera.";
  } else if (WHATSAPP_NUMBER_DIGITS.length >= 8 && WHATSAPP_NUMBER_DIGITS.length <= 15) {
    orderStatus.textContent = "Le navigateur a bloqué l’ouverture de WhatsApp. Utilisez le lien ci-dessous.";
  } else {
    orderStatus.textContent = "Le numéro WhatsApp du restaurant doit être vérifié. Aucun message n’a été envoyé.";
  }
});

orderDownload.addEventListener("click", () => {
  if (!latestOrderDetails) return;
  const details = latestOrderDetails;
  const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[character]);
  const rows = details.items.map((item) => `
      <tr>
        <td>${escapeHtml(item.name)}</td>
        <td class="number">${item.quantity}</td>
        <td class="number">${currencyFormatter.format(item.unitPrice)} FCFA</td>
        <td class="number">${currencyFormatter.format(item.total)} FCFA</td>
      </tr>`).join("");
  const destinationLink = details.destinationMapUrl
    ? `<a href="${escapeHtml(details.destinationMapUrl)}">${escapeHtml(details.destinationMapUrl)}</a>`
    : "";
  const receipt = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Commande ${escapeHtml(details.reference)} — Maison Naya</title>
  <style>
    *{box-sizing:border-box}body{margin:0;padding:32px;background:#eee7db;color:#27251f;font:14px/1.6 Arial,sans-serif}
    main{max-width:800px;margin:0 auto;padding:40px;background:#fffdf9;border:1px solid #d9d1c4}
    header{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;padding-bottom:24px;border-bottom:2px solid #c69b58}
    .brand{margin:0;color:#263c32;font-weight:bold;letter-spacing:.14em}.brand-note{margin:4px 0 0;color:#77736b;font-size:11px}
    h1{margin:0;color:#263c32;font:500 28px/1.2 Georgia,serif}.reference{margin-top:7px;color:#77736b;font-size:12px}
    .status{margin:22px 0;padding:13px 16px;background:#f7edda;color:#674c20;font-size:12px;font-weight:bold}
    h2{margin:25px 0 10px;color:#263c32;font:500 18px Georgia,serif}.details{display:grid;grid-template-columns:1fr 1fr;gap:8px 20px;margin:0}.details div{padding:8px 0;border-bottom:1px solid #e9e2d8}.details dt{color:#77736b;font-size:11px}.details dd{margin:2px 0 0;font-weight:600;overflow-wrap:anywhere}
    a{color:#263c32;overflow-wrap:anywhere}table{width:100%;border-collapse:collapse;font-size:12px}th,td{padding:10px 8px;border-bottom:1px solid #e9e2d8;text-align:left}th{background:#f5f1e9;color:#263c32}.number{text-align:right;white-space:nowrap}
    .total{display:flex;justify-content:space-between;margin-top:14px;padding:15px;background:#263c32;color:white;font-weight:bold}.notice{margin-top:18px;color:#77736b;font-size:11px}
    .print{margin-top:24px;padding:12px 18px;border:0;background:#263c32;color:white;font-weight:bold;cursor:pointer}
    @media(max-width:600px){body{padding:12px}main{padding:22px}header{display:block}header>div+div{margin-top:18px}.details{grid-template-columns:1fr}}
    @media print{body{padding:0;background:white}main{max-width:none;border:0;padding:0}.print{display:none}a{color:inherit;text-decoration:none}}
  </style>
</head>
<body>
  <main>
    <header><div><p class="brand">MAISON NAYA</p><p class="brand-note">Cuisine béninoise · Haie Vive, Cotonou</p></div><div><h1>Récapitulatif de commande</h1><div class="reference">${escapeHtml(details.reference)}</div></div></header>
    <p class="status">DEMANDE EN ATTENTE — CET DOCUMENT N’EST PAS UNE COMMANDE CONFIRMÉE NI UNE PREUVE DE PAIEMENT.</p>
    <h2>Client et réception</h2>
    <dl class="details">
      <div><dt>Nom</dt><dd>${escapeHtml(details.name)}</dd></div>
      <div><dt>Téléphone</dt><dd>${escapeHtml(details.phone)}</dd></div>
      <div><dt>Mode</dt><dd>${escapeHtml(details.fulfillment)}</dd></div>
      <div><dt>Date et heure souhaitées</dt><dd>${escapeHtml(details.date)} à ${escapeHtml(details.time)}</dd></div>
      <div><dt>${details.fulfillment === "Livraison" ? "Adresse / position" : "Lieu de retrait"}</dt><dd>${escapeHtml(details.destination)}</dd></div>
      ${destinationLink ? `<div><dt>Carte</dt><dd>${destinationLink}</dd></div>` : ""}
    </dl>
    <h2>Articles</h2>
    <table><thead><tr><th>Article</th><th class="number">Qté</th><th class="number">Prix unitaire</th><th class="number">Total</th></tr></thead><tbody>${rows}</tbody></table>
    <div class="total"><span>Sous-total estimé, hors livraison</span><span>${currencyFormatter.format(details.total)} FCFA</span></div>
    ${details.notes ? `<h2>Instructions</h2><p>${escapeHtml(details.notes)}</p>` : ""}
    <p class="notice">Les prix, l’adresse, les horaires et les disponibilités sont fictifs. Frais de livraison, disponibilité et heure à confirmer auprès du restaurant. Présentez ce récapitulatif à l’équipe ; il ne remplace pas la confirmation WhatsApp. Aucun paiement n’a été effectué par ce site.</p>
    <button class="print" type="button" onclick="window.print()">Imprimer ou enregistrer en PDF</button>
  </main>
</body>
</html>`;
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.opener = null;
    printWindow.addEventListener("load", () => printWindow.print(), { once: true });
    printWindow.document.open();
    printWindow.document.write(receipt);
    printWindow.document.close();
    orderStatus.textContent = "Le récapitulatif est ouvert dans un nouvel onglet. Choisissez « Enregistrer au format PDF » dans la boîte d’impression.";
    return;
  }

  const file = new Blob([receipt], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = `maison-naya-commande-${details.reference}.html`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  orderStatus.textContent = "Le navigateur a bloqué la fenêtre d’impression. Le récapitulatif HTML a été téléchargé : ouvrez-le puis choisissez Imprimer > Enregistrer au format PDF.";
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
