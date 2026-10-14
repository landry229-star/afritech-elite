import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hors connexion",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return (
    <main className="offline-page">
      <div className="offline-card">
        <p className="eyebrow">AfriTech Elite</p>
        <h1>Vous êtes hors connexion</h1>
        <p>
          Cette page n’est pas encore disponible hors ligne. Reconnectez-vous à
          Internet puis réessayez.
        </p>
        <a className="button" href="/">
          Réessayer
        </a>
      </div>
    </main>
  );
}
