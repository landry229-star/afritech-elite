// Renseignez le numéro de l'agence au format international, sans +, espaces ni tirets.
const AGENCY_WHATSAPP_NUMBER = "";

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

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((filterButton) => {
      const selected = filterButton === button;
      filterButton.classList.toggle("is-active", selected);
      filterButton.setAttribute("aria-pressed", String(selected));
    });
    document.querySelectorAll(".property-card").forEach((card) => {
      card.hidden = selectedFilter !== "all" && card.dataset.category !== selectedFilter;
    });
  });
});

document.querySelectorAll("[data-filter-link]").forEach((link) => {
  link.addEventListener("click", () => {
    const filter = document.querySelector(`[data-filter="${link.dataset.filterLink}"]`);
    filter?.click();
  });
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  if (!/^\d{8,15}$/.test(AGENCY_WHATSAPP_NUMBER)) {
    formStatus.textContent =
      "Le formulaire est prêt. Configurez le vrai numéro WhatsApp de l’agence avant publication pour transmettre les demandes.";
    return;
  }

  const formData = new FormData(contactForm);
  const message = [
    "Bonjour, je souhaite échanger avec Horizon Immobilier.",
    `Nom : ${formData.get("name")}`,
    `Projet : ${formData.get("project")}`,
    `Contact : ${formData.get("contact")}`,
    `Détails : ${formData.get("message")}`,
  ].join("\n");

  window.open(
    `https://wa.me/${AGENCY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
  formStatus.textContent = "Votre message est prêt. L’agence vous répondra pour préciser la suite.";
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
