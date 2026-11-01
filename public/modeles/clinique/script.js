// Renseignez le numéro public du secrétariat au format international, sans + ni espaces.
const CLINIC_WHATSAPP_NUMBER = "";

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

  if (!/^\d{8,15}$/.test(CLINIC_WHATSAPP_NUMBER)) {
    formStatus.textContent =
      "Le formulaire est prêt. Configurez le numéro public du secrétariat avant publication.";
    return;
  }

  const formData = new FormData(contactForm);
  const message = [
    "Bonjour, je souhaite contacter le secrétariat du Centre Médical Élan.",
    `Nom : ${formData.get("name")}`,
    `Téléphone : ${formData.get("phone")}`,
    `Demande administrative : ${formData.get("request")}`,
    "Je communiquerai toute information médicale directement à un professionnel de santé.",
  ].join("\n");

  window.open(
    `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
  formStatus.textContent =
    "Votre message WhatsApp est prêt. N’ajoutez pas d’information médicale ; ce canal n’est pas destiné aux urgences.";
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
