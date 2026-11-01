// Renseignez le numéro de l'hôtel au format international, sans +, espaces ni tirets.
const HOTEL_WHATSAPP_NUMBER = "";

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

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
const arrivalField = reservationForm?.elements.namedItem("checkin");
const departureField = reservationForm?.elements.namedItem("checkout");

function updateDepartureMinimum() {
  if (arrivalField instanceof HTMLInputElement && departureField instanceof HTMLInputElement) {
    departureField.min = arrivalField.value;
    if (departureField.value && departureField.value <= arrivalField.value) {
      departureField.value = "";
    }
  }
}

arrivalField?.addEventListener("change", updateDepartureMinimum);

reservationForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  updateDepartureMinimum();
  if (!reservationForm.reportValidity()) return;

  if (!/^\d{8,15}$/.test(HOTEL_WHATSAPP_NUMBER)) {
    formStatus.textContent =
      "La demande est prête. Configurez le numéro WhatsApp réel de l’établissement avant publication.";
    return;
  }

  const formData = new FormData(reservationForm);
  const message = [
    "Bonjour, je souhaite demander des disponibilités aux Jardins d’Akoma.",
    `Nom : ${formData.get("name")}`,
    `Arrivée : ${formData.get("checkin")}`,
    `Départ : ${formData.get("checkout")}`,
    `Voyageurs : ${formData.get("guests")}`,
    `Chambre souhaitée : ${formData.get("room")}`,
  ].join("\n");

  window.open(
    `https://wa.me/${HOTEL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
  formStatus.textContent =
    "Votre demande WhatsApp est prête. L’établissement confirmera les disponibilités, le tarif et les conditions.";
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
