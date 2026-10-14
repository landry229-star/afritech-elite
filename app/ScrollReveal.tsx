"use client";

import { useEffect } from "react";

const revealSelector = [
  "main > .hero",
  "main > .section",
  "main > .contact",
  ".section-heading",
  ".grid",
  ".portfolio-cta",
  ".portfolio-disclaimer",
  ".offer-note",
  ".faq-list",
  ".contact-form",
  ".contact-channels",
  ".situation-list",
  ".cta-box",
].join(", ");

export default function ScrollReveal() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelector),
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.dataset.reveal = "visible";
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -36px 0px",
      },
    );

    for (const element of elements) {
      element.dataset.reveal = "pending";
      observer.observe(element);
    }

    document.documentElement.classList.add("has-scroll-reveal");

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("has-scroll-reveal");
      for (const element of elements) {
        delete element.dataset.reveal;
      }
    };
  }, []);

  return null;
}
