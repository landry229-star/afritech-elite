// Renseignez le numéro public de la pharmacie au format international, sans + ni espaces.
const PHARMACY_WHATSAPP_NUMBER = "";

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

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  if (!/^\d{8,15}$/.test(PHARMACY_WHATSAPP_NUMBER)) {
    formStatus.textContent =
      "Le formulaire est prêt. Configurez le numéro WhatsApp public de la pharmacie avant publication.";
    return;
  }

  const formData = new FormData(contactForm);
  const message = [
    "Bonjour, j’ai une question pratique pour la Pharmacie Les Flamboyants.",
    `Nom : ${formData.get("name")}`,
    `Coordonnée pour répondre : ${formData.get("contact")}`,
    `Question : ${formData.get("message")}`,
  ].join("\n");

  window.open(
    `https://wa.me/${PHARMACY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
  formStatus.textContent = "Votre message WhatsApp est prêt. N’y ajoutez pas de données médicales sensibles.";
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
