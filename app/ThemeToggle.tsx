"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "afritech-elite-theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#151b26" : "#f6f1e7");
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    let savedTheme: string | null = null;
    try {
      savedTheme = window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      console.error("AfriTech Elite: saved theme could not be read.", error);
    }

    const currentTheme: Theme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : document.documentElement.dataset.theme === "dark"
          ? "dark"
          : "light";

    applyTheme(currentTheme);
    setTheme(currentTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    setTheme(nextTheme);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch (error) {
      console.error("AfriTech Elite: selected theme could not be saved.", error);
    }
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Activer le mode ${theme === "light" ? "sombre" : "clair"}`}
      title={`Activer le mode ${theme === "light" ? "sombre" : "clair"}`}
    >
      {theme === "light" ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <path
            d="M20.2 15.1A8.3 8.3 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}
      <span>{theme === "light" ? "Mode sombre" : "Mode clair"}</span>
    </button>
  );
}
