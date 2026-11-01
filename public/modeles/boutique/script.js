// Configurez le numéro de commande WhatsApp du commerce au format international, sans + ni espaces.
const STORE_WHATSAPP_NUMBER = "";

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
const productGrid = document.querySelector("#product-grid");
const cartCount = document.querySelector("#cart-count");
const cartSummary = document.querySelector("#cart-summary");
const cartList = document.querySelector("#cart-list");
const cartTotal = document.querySelector("#cart-total");
const orderButton = document.querySelector("#order-button");
const cartStatus = document.querySelector("#cart-status");
const cart = new Map();

const formatMoney = (amount) =>
  `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(amount)} FCFA`;

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

function renderCart() {
  const itemCount = [...cart.values()].reduce((sum, item) => sum + item.quantity, 0);
  const total = [...cart.values()].reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartCount.textContent = String(itemCount);
  cartSummary.textContent = itemCount === 0 ? "Aucun article ajouté" : `${itemCount} article${itemCount > 1 ? "s" : ""}`;
  cartTotal.textContent = formatMoney(total);
  orderButton.disabled = itemCount === 0;
  cartList.replaceChildren();

  if (itemCount === 0) {
    const empty = document.createElement("li");
    empty.className = "cart-empty";
    empty.textContent = "Votre sélection est vide pour le moment.";
    cartList.append(empty);
    return;
  }

  for (const [name, item] of cart) {
    const row = document.createElement("li");
    row.className = "cart-item";
    const description = document.createElement("span");
    description.textContent = `${name} × ${item.quantity}`;
    const price = document.createElement("strong");
    price.textContent = formatMoney(item.price * item.quantity);
    const remove = document.createElement("button");
    remove.className = "remove-item";
    remove.type = "button";
    remove.setAttribute("aria-label", `Retirer ${name}`);
    remove.textContent = "×";
    remove.addEventListener("click", () => {
      cart.delete(name);
      cartStatus.textContent = "";
      renderCart();
    });
    row.append(description, price, remove);
    cartList.append(row);
  }
}

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.product;
    const price = Number(button.dataset.price);
    if (!name || !Number.isFinite(price) || price < 0) {
      cartStatus.textContent = "Impossible d’ajouter cet article : vérifiez les informations du produit.";
      return;
    }
    const current = cart.get(name);
    cart.set(name, { price, quantity: (current?.quantity ?? 0) + 1 });
    cartStatus.textContent = `${name} ajouté à votre sélection.`;
    renderCart();
  });
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((filterButton) => {
      const active = filterButton === button;
      filterButton.classList.toggle("is-active", active);
      filterButton.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".product-card").forEach((card) => {
      card.hidden = selected !== "all" && card.dataset.category !== selected;
    });
  });
});

document.querySelector("#sort-products")?.addEventListener("change", (event) => {
  const direction = event.target.value;
  const cards = [...document.querySelectorAll(".product-card")];
  if (direction === "price-asc" || direction === "price-desc") {
    cards.sort((a, b) => {
      const difference = Number(a.dataset.price) - Number(b.dataset.price);
      return direction === "price-asc" ? difference : -difference;
    });
  } else {
    cards.sort((a, b) => Number(a.dataset.originalOrder) - Number(b.dataset.originalOrder));
  }
  cards.forEach((card) => productGrid.append(card));
});

document.querySelectorAll(".product-card").forEach((card, index) => {
  card.dataset.originalOrder = String(index);
});

orderButton?.addEventListener("click", () => {
  const entries = [...cart.entries()];
  if (!entries.length) return;

  if (!/^\d{8,15}$/.test(STORE_WHATSAPP_NUMBER)) {
    cartStatus.textContent =
      "La sélection est prête. Configurez le vrai numéro WhatsApp du commerce avant publication pour envoyer la demande.";
    return;
  }

  const itemLines = entries.map(([name, item]) => `- ${name} × ${item.quantity} : ${formatMoney(item.price * item.quantity)}`);
  const total = entries.reduce((sum, [, item]) => sum + item.price * item.quantity, 0);
  const message = [
    "Bonjour, je souhaite vérifier la disponibilité des articles suivants.",
    ...itemLines,
    `Total indicatif : ${formatMoney(total)}`,
    "Merci de confirmer les stocks, le prix et les modalités de retrait/livraison. Ceci est une demande, pas une commande confirmée.",
  ].join("\n");

  window.open(
    `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
  cartStatus.textContent = "Votre demande WhatsApp est prête. La boutique confirmera les stocks, les prix et la commande.";
});

renderCart();
document.querySelector("#year").textContent = String(new Date().getFullYear());
