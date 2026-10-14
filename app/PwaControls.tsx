"use client";

import { useEffect, useState } from "react";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function PwaControls() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(
    null,
  );
  const [installMessage, setInstallMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error: unknown) => {
        console.error("AfriTech Elite: service worker registration failed.", error);
      });
    }

    const handleInstallAvailable = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const handleInstalled = () => {
      setInstallPrompt(null);
      setInstallMessage("AfriTech Elite est installé sur votre appareil.");
    };

    window.addEventListener("beforeinstallprompt", handleInstallAvailable);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallAvailable);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  async function installApp() {
    if (!installPrompt) return;

    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      setInstallMessage(
        choice.outcome === "accepted"
          ? "AfriTech Elite est en cours d’installation."
          : "Installation annulée. Vous pouvez l’installer plus tard depuis le menu du navigateur.",
      );
      setInstallPrompt(null);
    } catch (error) {
      console.error("AfriTech Elite: app installation prompt failed.", error);
      setInstallMessage(
        "L’installation n’a pas pu démarrer. Essayez depuis le menu du navigateur.",
      );
    }
  }

  return (
    <div className="pwa-install-area">
      {installPrompt && (
        <button className="button button-secondary" type="button" onClick={installApp}>
          Installer l’application
        </button>
      )}
      <p className="pwa-install-hint">
        Sur téléphone, ajoutez AfriTech Elite à l’écran d’accueil depuis le menu
        du navigateur.
      </p>
      {installMessage && (
        <p className="pwa-install-status" role="status">
          {installMessage}
        </p>
      )}
    </div>
  );
}
