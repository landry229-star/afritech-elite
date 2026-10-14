import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site-url";
import ScrollReveal from "../ScrollReveal";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getSiteUrl();
  const pageUrl = new URL("/contact", baseUrl);

  return {
    title: "Nous contacter — AfriTech Elite",
    description:
      "Contactez AfriTech Elite via email, téléphone, LinkedIn ou WhatsApp pour parler de votre projet de site web ou de cours de mathématiques.",
    alternates: {
      canonical: "/contact",
    },
    openGraph: {
      title: "Nous contacter — AfriTech Elite",
      description:
        "Vous cherchez à créer un site web pour votre métier ou suivre des cours de mathématiques ? Contactez-nous !",
      type: "website",
      url: pageUrl,
      siteName: "AfriTech Elite",
      locale: "fr_BJ",
    },
  };
}

interface ContactChannel {
  icon: string;
  label: string;
  description: string;
  href: string;
  actionLabel: string;
  external?: boolean;
}

function getContactChannels(): ContactChannel[] {
  const channels: ContactChannel[] = [];
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  const linkedIn = process.env.NEXT_PUBLIC_CONTACT_LINKEDIN?.trim();

  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    channels.push({
      icon: "📧",
      label: "Email",
      description: "Pour un devis, une question ou une demande de partenariat.",
      href: `mailto:${email}`,
      actionLabel: "Écrire un email",
    });
  }

  if (whatsappNumber && /^\d{8,15}$/.test(whatsappNumber)) {
    const message = encodeURIComponent("Bonjour, je souhaite prendre contact avec AfriTech Elite.");
    channels.push({
      icon: "📱",
      label: "WhatsApp",
      description: "Envoyez-nous un message au sujet de votre projet ou de vos cours.",
      href: `https://wa.me/${whatsappNumber}?text=${message}`,
      actionLabel: "Écrire sur WhatsApp",
      external: true,
    });
  }

  if (phone) {
    const normalizedPhone = phone.replace(/[()\s.-]/g, "");
    if (/^\+?\d{8,15}$/.test(normalizedPhone)) {
      channels.push({
        icon: "☎️",
        label: "Téléphone",
        description: "Appelez-nous pour discuter de votre demande.",
        href: `tel:${normalizedPhone}`,
        actionLabel: "Appeler AfriTech Elite",
      });
    }
  }

  if (linkedIn) {
    try {
      const linkedInUrl = new URL(linkedIn);
      if (
        linkedInUrl.protocol === "https:" &&
        (linkedInUrl.hostname === "linkedin.com" || linkedInUrl.hostname === "www.linkedin.com")
      ) {
        channels.push({
          icon: "💼",
          label: "LinkedIn",
          description: "Retrouvez notre profil professionnel et nos actualités.",
          href: linkedInUrl.toString(),
          actionLabel: "Voir notre profil",
          external: true,
        });
      }
    } catch {
      // Ignore an invalid optional LinkedIn URL; other contact channels remain available.
    }
  }

  channels.push({
    icon: "🖥️",
    label: "Portfolio",
    description: "Découvrez mes réalisations et les projets présentés dans mon portfolio.",
    href: "https://portfoliolandry.netlify.app/",
    actionLabel: "Voir mon portfolio",
    external: true,
  });

  return channels;
}

function ContactChannelCard({ channel }: { channel: ContactChannel }) {
  return (
    <article className="contact-channel">
      <div className="channel-icon" aria-hidden="true">{channel.icon}</div>
      <h3>{channel.label}</h3>
      <p className="channel-description">{channel.description}</p>
      <a
        href={channel.href}
        className="channel-link"
        target={channel.external ? "_blank" : undefined}
        rel={channel.external ? "noopener noreferrer" : undefined}
      >
        {channel.actionLabel}
        {channel.external && <span aria-hidden="true"> ↗</span>}
      </a>
    </article>
  );
}

export default function ContactPage() {
  const contactChannels = getContactChannels();

  return (
    <>
      <ScrollReveal />
      <header className="site-header">
        <nav className="nav wrap" aria-label="Navigation principale">
          <Link className="brand" href="/">AfriTech Elite</Link>
          <div className="nav-links">
            <Link href="/">Accueil</Link>
            <Link href="/#solutions">Nos solutions</Link>
            <Link href="/#cours-mathematiques">Cours de maths</Link>
            <Link className="button nav-cta" href="#contact-methods">Nous contacter</Link>
          </div>
        </nav>
      </header>

      <main className="page-contact">
        <section className="contact-hero">
          <div className="wrap">
            <h1>Nous contacter</h1>
            <p className="lead">
              Vous avez un projet de site web pour votre métier ou des questions sur nos cours de mathématiques ?
              Envoyez-nous un message ou choisissez l’un des moyens de contact disponibles.
            </p>
          </div>
        </section>

        <section className="section contact-form-section" id="contact-form">
          <div className="wrap">
            <div className="section-heading">
              <p className="eyebrow">Écrivez-nous</p>
              <h2>Parlons de votre demande</h2>
              <p>Remplissez ce formulaire ; les champs marqués d’un astérisque sont obligatoires.</p>
            </div>
            <form
              className="contact-form"
              action="https://formspree.io/f/xldkjyko"
              method="POST"
            >
              <input type="hidden" name="_subject" value="Nouveau message depuis AfriTech Elite" />
              <div className="contact-form-honeypot" aria-hidden="true">
                <label htmlFor="contact-website">Ne pas remplir ce champ</label>
                <input
                  id="contact-website"
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="contact-form-grid">
                <div className="contact-form-field">
                  <label htmlFor="contact-name">Nom complet *</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    maxLength={120}
                    required
                  />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="contact-email">Adresse e-mail *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                  />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="contact-phone">Téléphone (facultatif)</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="telephone"
                    autoComplete="tel"
                    maxLength={30}
                  />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="contact-subject">Objet de votre demande *</label>
                  <select id="contact-subject" name="objet" defaultValue="" required>
                    <option value="" disabled>Sélectionnez un sujet</option>
                    <option value="Création de site web">Création de site web</option>
                    <option value="Cours de mathématiques">Cours de mathématiques</option>
                    <option value="Partenariat">Partenariat</option>
                    <option value="Autre demande">Autre demande</option>
                  </select>
                </div>
                <div className="contact-form-field contact-form-field-full">
                  <label htmlFor="contact-message">Votre message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    maxLength={5000}
                    required
                  />
                </div>
              </div>
              <div className="contact-form-submit">
                <button className="button" type="submit">
                  Envoyer le message <span aria-hidden="true">→</span>
                </button>
                <p>Votre message sera transmis à AfriTech Elite par Formspree.</p>
              </div>
            </form>
          </div>
        </section>

        <section className="section" id="contact-methods">
          <div className="wrap">
            {contactChannels.length > 0 ? (
              <div className="contact-channels">
                {contactChannels.map((channel) => (
                  <ContactChannelCard key={channel.label} channel={channel} />
                ))}
              </div>
            ) : (
              <p className="contact-unavailable">
                Aucun moyen de contact n’est disponible pour le moment. Merci de réessayer ultérieurement.
              </p>
            )}
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Quelle est votre situation ?</h2>
              <p>Choisissez le canal le plus adapté à votre demande.</p>
            </div>
            <div className="situation-list">
              <article className="situation-card">
                <h3>📊 Vous cherchez à créer un site web</h3>
                <p>
                  Indiquez votre activité, les personnes que vous souhaitez toucher et les fonctionnalités attendues.
                  Nous pourrons ainsi mieux comprendre votre besoin.
                </p>
              </article>
              <article className="situation-card">
                <h3>📚 Vous vous intéressez aux cours de mathématiques</h3>
                <p>
                  Précisez la classe de l’élève, les notions à travailler et votre objectif : remise à niveau,
                  approfondissement ou préparation à un examen.
                </p>
              </article>
              <article className="situation-card">
                <h3>🤝 Vous souhaitez un partenariat ou collaborer</h3>
                <p>
                  Présentez brièvement votre structure et la nature de la collaboration envisagée.
                </p>
              </article>
              <article className="situation-card">
                <h3>❓ Vous avez une question urgente</h3>
                <p>Choisissez un moyen de contact disponible et précisez clairement l’objet de votre demande.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Questions fréquentes</h2>
            </div>
            <div className="faq-list">
              <details>
                <summary>Quel est le délai de réponse ?</summary>
                <p>
                  Le délai dépend du moyen utilisé et de nos disponibilités. Pour une demande urgente, indiquez-le dans
                  votre message ou privilégiez l’appel si le canal téléphonique est disponible.
                </p>
              </details>
              <details>
                <summary>Existe-t-il des frais cachés ?</summary>
                <p>
                  Non. Toute proposition de site web détaillera clairement le coût, les livrables, le délai et les
                  modalités de paiement. Il n'y a pas de frais supplémentaires non annoncés.
                </p>
              </details>
              <details>
                <summary>Pouvez-vous créer un site pour une activité spécifique ?</summary>
                <p>
                  Oui, nous adaptons chaque site aux besoins de votre métier, secteur et public. Contactez-nous pour en
                  parler et recevoir une proposition sur mesure.
                </p>
              </details>
              <details>
                <summary>Proposez-vous du support après le lancement ?</summary>
                <p>
                  Les possibilités de suivi ou d’évolution peuvent être discutées et précisées dans la proposition.
                  Aucune maintenance n’est incluse par défaut.
                </p>
              </details>
              <details>
                <summary>Comment se déroulent les cours de mathématiques ?</summary>
                <p>
                  Les cours se font à domicile ou à distance (en visioconférence). Nous fixons ensemble le nombre de
                  séances, la durée et les horaires selon vos besoins. Chaque cours suit une progression adaptée à votre
                  niveau et vos objectifs.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="section cta-section">
          <div className="wrap">
            <div className="cta-box">
              <h2>Prêt à commencer ?</h2>
              <p>
                Décrivez votre demande et nous pourrons convenir des prochaines étapes.
              </p>
              <a href="#contact-form" className="btn btn-primary">
                Remplir le formulaire <span aria-hidden="true">→</span>
              </a>
              <p className="small-text">
                Retour à la <Link href="/">page d'accueil</Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner wrap">
          <p>
            <strong>AfriTech Elite</strong> — Sites web pour commerçants, artisans et indépendants. © {new Date().getFullYear()}
          </p>
          <div className="footer-links">
            <a href="/">Accueil</a>
            <a href="/#metiers">Les métiers</a>
            <a href="/#cours-mathematiques">Cours de maths</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
