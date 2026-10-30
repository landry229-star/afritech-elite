const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();

export default function WhatsAppButton() {
  if (!whatsappNumber || !/^\d{8,15}$/.test(whatsappNumber)) {
    return null;
  }

  const message = encodeURIComponent(
    "Bonjour, je souhaite obtenir des renseignements sur vos services.",
  );

  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter AfriTech Elite sur WhatsApp"
      title="Contacter AfriTech Elite sur WhatsApp"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16.04 3C8.87 3 3.04 8.78 3.04 15.9c0 2.28.61 4.5 1.77 6.46L3 29l6.83-1.78a13.1 13.1 0 0 0 6.2 1.57h.01c7.16 0 13-5.78 13-12.9 0-3.45-1.35-6.7-3.8-9.14A12.94 12.94 0 0 0 16.04 3Zm0 23.6h-.01c-1.9 0-3.76-.51-5.39-1.48l-.39-.23-4.05 1.06 1.08-3.93-.25-.4a10.63 10.63 0 0 1-1.63-5.72c0-5.88 4.78-10.66 10.65-10.66 2.84 0 5.51 1.1 7.52 3.12a10.56 10.56 0 0 1 3.12 7.53c0 5.88-4.78 10.66-10.65 10.66Zm5.84-7.98c-.32-.16-1.9-.94-2.2-1.05-.29-.1-.5-.16-.71.16-.21.32-.82 1.05-1 1.27-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.6-.95-.84-1.6-1.89-1.79-2.21-.18-.32-.02-.49.14-.65.14-.14.32-.37.47-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.72-.97-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.64 0 1.56 1.13 3.07 1.29 3.28.16.21 2.23 3.39 5.4 4.76.75.32 1.34.52 1.8.67.76.24 1.45.21 2 .13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" />
      </svg>
      <span className="whatsapp-float-label">WhatsApp</span>
    </a>
  );
}
