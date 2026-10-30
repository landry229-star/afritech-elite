"use client";

import { useRef, type ReactNode } from "react";

export default function MobileNav({ children }: { children: ReactNode }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  return (
    <details className="mobile-nav" ref={detailsRef}>
      <summary className="mobile-nav-trigger" aria-label="Ouvrir le menu de navigation">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </summary>
      <div
        className="mobile-nav-panel"
        onClick={() => {
          if (detailsRef.current) detailsRef.current.open = false;
        }}
      >
        {children}
      </div>
    </details>
  );
}
