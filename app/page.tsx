import type { ReactNode } from "react";
import PwaControls from "./PwaControls";
import ScrollReveal from "./ScrollReveal";

const sectors = [
  { icon: "🍽️", title: "Restaurant", description: "Menu, horaires et réservation.", portfolio: true },
  { icon: "⚕️", title: "Clinique et cabinet", description: "Soins, équipe et rendez-vous.", portfolio: true },
  { icon: "💇", title: "Coiffure et esthétique", description: "Prestations, tarifs et réalisations.", portfolio: true },
  { icon: "🛍️", title: "Boutique et commerce", description: "Produits, nouveautés et coordonnées." },
  { icon: "🏠", title: "Agence immobilière", description: "Biens et demandes de visite." },
  { icon: "🎓", title: "École et formation", description: "Programmes, inscriptions et établissement." },
  { icon: "💼", title: "Avocat et consultant", description: "Domaines d’intervention et rendez-vous." },
  { icon: "🛏️", title: "Hôtel et auberge", description: "Chambres, services et informations pratiques." },
  { icon: "🔧", title: "Garage et mécanique", description: "Services, horaires et demandes de devis." },
  { icon: "🧵", title: "Couturier et tailleur", description: "Créations, prestations et rendez-vous." },
  { icon: "📷", title: "Photographe", description: "Portfolio, formules et disponibilités." },
  { icon: "💊", title: "Pharmacie", description: "Horaires, services et coordonnées." },
];

const portfolio = [
  {
    kind: "restaurant",
    category: "Concept de démonstration · Restaurant",
    title: "Une table accueillante, un menu à portée de main",
    description: "Une page d’accueil chaleureuse avec accès rapide au menu, aux horaires et aux réservations.",
    details: ["Menu mis en avant", "Horaires et localisation", "Contact pour réserver"],
    previewTitle: "La table du quartier",
    previewText: "Des produits choisis. Une cuisine généreuse.",
    previewAction: "DÉCOUVRIR LE MENU",
  },
  {
    kind: "cabinet",
    category: "Concept de démonstration · Santé",
    title: "Rendre les informations de santé faciles à trouver",
    description: "Un aperçu sobre pour présenter les soins, l’équipe, les horaires et les modalités de contact.",
    details: ["Présentation des soins", "Informations pratiques", "Demande de rendez-vous"],
    previewTitle: "Votre santé, notre attention",
    previewText: "Une équipe à votre écoute, près de chez vous.",
    previewAction: "NOS SERVICES",
  },
  {
    kind: "beaute",
    category: "Concept de démonstration · Beauté",
    title: "Mettre en valeur les prestations et le savoir-faire",
    description: "Une vitrine élégante pour présenter les prestations, les réalisations et les demandes de rendez-vous.",
    details: ["Prestations présentées clairement", "Espace réalisations", "Contact en quelques clics"],
    previewTitle: "Le soin jusque dans le détail",
    previewText: "Beauté, bien-être et gestes personnalisés.",
    previewAction: "VOIR LES PRESTATIONS",
  },
];

const benefits = [
  {
    title: "Adapté à votre métier",
    description:
      "Les rubriques et les contenus sont définis selon votre activité et les informations que vos clients recherchent.",
  },
  {
    title: "Une présentation professionnelle",
    description:
      "Une organisation claire aide vos visiteurs à comprendre vos services et à trouver les informations utiles.",
  },
  {
    title: "Un contact facilité",
    description:
      "Ajoutez les moyens de contact qui vous conviennent : téléphone, e-mail ou WhatsApp.",
  },
  {
    title: "Un projet cadré ensemble",
    description:
      "Contenu, fonctionnalités, délais, livraison et éventuelle maintenance sont clarifiés avant le démarrage.",
  },
];

const steps = [
  {
    title: "Vous présentez votre activité",
    description:
      "Parlez-nous de votre métier, de vos services et des clients que vous souhaitez toucher.",
  },
  {
    title: "Nous définissons le contenu",
    description:
      "Nous choisissons ensemble les informations, les rubriques et les moyens de contact à mettre en avant.",
  },
  {
    title: "Vous examinez la proposition",
    description:
      "Vous partagez vos remarques et demandez les ajustements prévus dans l’offre retenue.",
  },
  {
    title: "Nous réalisons votre site",
    description:
      "Après votre accord sur le devis et les conditions de démarrage, nous créons votre site et le préparons pour la mise en ligne selon le délai convenu.",
  },
];

const offers = [
  {
    label: "Pour démarrer",
    title: "Site essentiel",
    description: "Une page claire pour présenter votre activité et guider les visiteurs vers une prise de contact.",
    points: ["1 page avec sections structurées", "Présentation, services et coordonnées", "Mise en page adaptée au mobile", "Bouton d’appel ou de contact"],
  },
  {
    label: "Pour développer sa présence",
    title: "Site professionnel",
    description: "Plusieurs pages pour détailler vos services et donner à vos clients les informations dont ils ont besoin.",
    points: ["Jusqu’à 5 pages définies au devis", "Présentation détaillée des services", "Galerie ou réalisations si nécessaire", "Base SEO : titres et descriptions des pages"],
  },
  {
    label: "Sur mesure",
    title: "Projet personnalisé",
    description: "Une réponse adaptée aux besoins qui dépassent le cadre d’un site vitrine classique.",
    points: ["Pages et parcours définis ensemble", "Fonctionnalités chiffrées séparément", "Planning et livrables précisés", "Devis détaillé avant le démarrage"],
  },
];

const questions = [
  {
    question: "Que comprend chaque formule ?",
    answer:
      "Le site essentiel comprend une page structurée, les informations fournies sur votre activité et un affichage adapté au mobile. Le site professionnel prévoit jusqu’à cinq pages et peut inclure une galerie selon le besoin. Le devis précise les pages, contenus, fonctionnalités et ajustements inclus.",
  },
  {
    question: "Combien coûte la création d’un site ?",
    answer:
      "Le tarif est établi sur devis après un échange sur votre activité, le nombre de pages et les fonctionnalités souhaitées. Le montant et les éventuels frais récurrents sont communiqués avant toute validation.",
  },
  {
    question: "L’hébergement, le nom de domaine et la maintenance sont-ils inclus ?",
    answer:
      "Ils ne sont pas automatiquement inclus dans les formules présentées. Le devis indique clairement s’ils sont nécessaires, qui les prend en charge et leurs coûts éventuels.",
  },
  {
    question: "Combien de temps faut-il pour créer mon site ?",
    answer:
      "Le délai dépend du contenu, des fonctionnalités et des éléments que vous fournissez. Un délai estimatif vous est indiqué après la définition du projet.",
  },
  {
    question: "Que dois-je fournir pour commencer ?",
    answer:
      "En général, il faut les informations sur votre activité, vos services et vos coordonnées. Votre logo et vos photos peuvent aussi être utiles. La liste des éléments nécessaires est précisée au démarrage.",
  },
  {
    question: "Puis-je demander un site pour un métier qui n’est pas dans la liste ?",
    answer:
      "Oui. Les secteurs affichés sont des exemples. Contactez-nous pour discuter de votre activité et de ce que vous souhaitez présenter.",
  },
  {
    question: "Le site sera-t-il adapté aux téléphones ?",
    answer:
      "L’affichage sur téléphone est pris en compte dans le projet et vérifié avant la mise en ligne. Les caractéristiques exactes sont confirmées dans la proposition.",
  },
  {
    question: "Le site m’appartiendra-t-il ?",
    answer:
      "Les conditions de propriété et de livraison sont expliquées dans la proposition avant le début du travail, afin que vous sachiez précisément ce qui est inclus.",
  },
  {
    question: "Pourrai-je modifier le site moi-même ?",
    answer:
      "Les possibilités de modification dépendent de la solution choisie. Les options d’autonomie et d’accompagnement sont présentées avant le démarrage.",
  },
];

function whatsappHref(message: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  if (!number || !/^\d{8,15}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function ContactLink({
  message,
  children,
  className = "button",
}: {
  message: string;
  children: ReactNode;
  className?: string;
}) {
  const href = whatsappHref(message);
  if (!href) {
    return (
      <a className={className} href="#contact-setup">
        {children}
      </a>
    );
  }
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function Home() {
  const whatsappConfigured = Boolean(whatsappHref("Bonjour"));

  return (
    <>
      <ScrollReveal />
      <header className="site-header">
        <nav className="nav wrap" aria-label="Navigation principale">
          <a className="brand" href="#accueil">
            AfriTech Elite
          </a>
          <div className="nav-links">
            <a href="#solutions">Nos solutions</a>
            <a href="#cours-mathematiques">Cours de maths</a>
            <a href="#metiers">Les métiers</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#etapes">Projet de site</a>
            <a href="#faq">FAQ</a>
            <a className="button nav-cta" href="#contact">
              Parler de mon projet
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-inner wrap">
            <p className="eyebrow">Création de sites web · Cours de mathématiques</p>
            <h1>Sites web professionnels et cours de maths au Bénin</h1>
            <p className="hero-copy">
              Nous créons des sites web adaptés aux commerçants, artisans et professionnels.
              Nous proposons aussi des cours de mathématiques de la 6e à la Terminale, selon le programme béninois.
            </p>
            <div className="actions">
              <ContactLink message="Bonjour, je voudrais parler de mon projet de site web.">
                Parler de mon projet <span aria-hidden="true">→</span>
              </ContactLink>
              <a className="button button-secondary" href="#cours-mathematiques">
                Découvrir les cours
              </a>
            </div>
            <p className="hero-note">Un projet simple à expliquer. Un site conçu autour de votre activité.</p>
            <PwaControls />
          </div>
        </section>

        <section className="section section-tint" id="cours-mathematiques">
          <div className="wrap">
            <div className="section-heading">
              <p className="eyebrow">Cours et accompagnement</p>
              <h2>Des cours de mathématiques pour progresser</h2>
              <p>
                Cours selon le programme béninois, de la 6e à la Terminale. L’accompagnement est adapté à la classe,
                aux notions à travailler et aux objectifs de l’apprenant.
              </p>
            </div>
            <div className="grid math-level-grid">
              <article className="benefit">
                <span className="benefit-mark math-level-mark" aria-hidden="true">6e–3e</span>
                <h3>Collège</h3>
                <p>Accompagnement en mathématiques de la Sixième à la Troisième, avec préparation aux devoirs et au BEPC.</p>
              </article>
              <article className="benefit">
                <span className="benefit-mark math-level-mark" aria-hidden="true">2nde–Tle</span>
                <h3>Collège</h3>
                <p>Accompagnement de la Seconde à la Terminale, avec préparation aux devoirs et au BAC.</p>
              </article>
            </div>
            <div className="section-heading math-method-heading">
              <p className="eyebrow">Une méthode attentive</p>
              <h3>Un enseignement structuré et adapté à chaque élève</h3>
              <p>Les séances partent des besoins de l’élève et avancent progressivement, sans promettre de résultat automatique.</p>
            </div>
            <div className="grid math-course-grid">
              <article className="benefit">
                <span className="benefit-mark" aria-hidden="true">01</span>
                <h3>Faire le point</h3>
                <p>Préciser la classe, le chapitre et les difficultés rencontrées pour cibler le travail.</p>
              </article>
              <article className="benefit">
                <span className="benefit-mark" aria-hidden="true">02</span>
                <h3>Expliquer clairement</h3>
                <p>Reprendre les notions avec des explications progressives et adaptées au niveau de l’élève.</p>
              </article>
              <article className="benefit">
                <span className="benefit-mark" aria-hidden="true">03</span>
                <h3>S’entraîner et vérifier</h3>
                <p>Résoudre des exercices corrigés, revoir les erreurs et vérifier les acquis au fil des séances.</p>
              </article>
            </div>
            <p className="section-after math-course-format">
              Cours à domicile ou à distance. Le format, les disponibilités et les modalités sont à convenir ensemble.
            </p>
            <div className="section-heading math-method-heading">
              <p className="eyebrow">Comment se déroule un cours ?</p>
              <h3>Un parcours simple, du besoin au suivi</h3>
            </div>
            <div className="grid math-course-grid math-course-steps">
              <article className="benefit">
                <span className="benefit-mark" aria-hidden="true">01</span>
                <h3>Vous indiquez le niveau</h3>
                <p>Précisez la classe, le chapitre ou le type d’exercice à travailler.</p>
              </article>
              <article className="benefit">
                <span className="benefit-mark" aria-hidden="true">02</span>
                <h3>Nous échangeons</h3>
                <p>Nous discutons des besoins, du format souhaité, des disponibilités et des modalités.</p>
              </article>
              <article className="benefit">
                <span className="benefit-mark" aria-hidden="true">03</span>
                <h3>Le cours est ciblé</h3>
                <p>La séance reprend les notions nécessaires puis les applique à des exercices adaptés.</p>
              </article>
              <article className="benefit">
                <span className="benefit-mark" aria-hidden="true">04</span>
                <h3>Les progrès sont suivis</h3>
                <p>Les difficultés restantes guident les exercices et les points à revoir ensuite.</p>
              </article>
            </div>
            <div className="actions section-after">
              <ContactLink message="Bonjour, je suis intéressé(e) par vos cours de mathématiques. L’élève est en classe de ____. Il/elle souhaite travailler ____. Nous préférons des cours ____. Quelles sont vos disponibilités et modalités ?">
                Me renseigner sur les cours de maths <span aria-hidden="true">→</span>
              </ContactLink>
            </div>
          </div>
        </section>

        <section className="section" id="metiers">
          <div className="wrap">
            <div className="section-heading">
              <p className="eyebrow">Votre activité, votre vitrine</p>
              <h2>Un site adapté à votre métier</h2>
              <p>Chaque métier a ses propres besoins. Découvrez les informations que votre site pourrait mettre en avant.</p>
            </div>
            <div className="grid sector-grid">
              {sectors.map((sector) => (
                <a
                  className="sector-card"
                  href={sector.portfolio ? "#portfolio" : "#contact"}
                  key={sector.title}
                >
                  <span className="sector-icon" aria-hidden="true">{sector.icon}</span>
                  <strong>{sector.title}</strong>
                  <span>{sector.description}</span>
                  {sector.portfolio && <span className="demo-link">Voir le concept →</span>}
                </a>
              ))}
            </div>
            <p className="section-after">
              Votre activité n’est pas dans la liste ? <a className="text-link" href="#contact">Parlons de vos besoins.</a>
            </p>
          </div>
        </section>

        <section className="section section-tint" id="solutions">
          <div className="wrap">
            <div className="section-heading">
              <p className="eyebrow">Pourquoi AfriTech Elite</p>
              <h2>Votre activité au centre du projet</h2>
              <p>Un accompagnement pensé pour vous aider à présenter clairement votre travail et à faciliter le contact avec vos clients.</p>
            </div>
            <div className="grid benefit-grid">
              {benefits.map((benefit, index) => (
                <article className="benefit" key={benefit.title}>
                  <span className="benefit-mark" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section portfolio-section" id="portfolio">
          <div className="wrap">
            <div className="section-heading">
              <p className="eyebrow">Aperçus de sites</p>
              <h2>Imaginez votre activité en ligne</h2>
              <p>Quelques concepts fictifs pour illustrer la création de sites web adaptés à différents métiers.</p>
            </div>
            <p className="portfolio-disclaimer">
              Ces aperçus sont des concepts fictifs créés pour illustrer l’offre. Ce ne sont pas des sites clients ni des réalisations livrées.
            </p>
            <div className="grid portfolio-grid">
              {portfolio.map((project) => (
                <article className="portfolio-card" key={project.kind}>
                  <div className={`portfolio-preview preview-${project.kind}`} role="img" aria-label={`Aperçu conceptuel de site : ${project.category}`}>
                    <div className="preview-browser">
                      <span /><span /><span />
                      <i>exemple-site.fr</i>
                    </div>
                    <div className="preview-page">
                      <div className="preview-nav"><b>{project.previewTitle.split(" ")[0]}</b><span>ACCUEIL　 SERVICES　 CONTACT</span></div>
                      <div className="preview-hero">
                        <small>BIENVENUE</small>
                        <strong>{project.previewTitle}</strong>
                        <span>{project.previewText}</span>
                        <em>{project.previewAction}</em>
                      </div>
                      <div className="preview-columns"><span /><span /><span /></div>
                    </div>
                  </div>
                  <div className="portfolio-copy">
                    <p className="portfolio-category">{project.category}</p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <ul>
                      {project.details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                    <a className="text-link" href="#contact">Imaginer mon site →</a>
                  </div>
                </article>
              ))}
            </div>
            <div className="portfolio-cta">
              <div>
                <p className="eyebrow">Portfolio personnel</p>
                <h3>Découvrez mes réalisations</h3>
                <p>Consultez mon portfolio pour voir mes projets et mon parcours.</p>
              </div>
              <a
                className="button"
                href="https://portfoliolandry.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visiter mon portfolio <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="etapes">
          <div className="wrap">
            <div className="section-heading">
              <p className="eyebrow">Création de site web</p>
              <h2>De votre idée à votre site</h2>
              <p>Voici comment se déroule un projet de création de site, distinct de l’accompagnement en mathématiques.</p>
            </div>
            <div className="grid steps-grid">
              {steps.map((step) => (
                <article className="step" key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-tint" id="offres">
          <div className="wrap">
            <div className="section-heading">
              <p className="eyebrow">Des solutions selon vos besoins</p>
              <h2>Choisissons le bon format pour votre activité</h2>
              <p>Choisissez un niveau de départ. Le nombre de pages, les livrables et le tarif exact seront confirmés dans votre devis.</p>
            </div>
            <div className="grid offer-grid">
              {offers.map((offer) => (
                <article className="offer" key={offer.title}>
                  <span className="offer-tag">{offer.label}</span>
                  <h3>{offer.title}</h3>
                  <p>{offer.description}</p>
                  <ul>
                    {offer.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                  <ContactLink
                    className="button button-secondary"
                    message={`Bonjour, je souhaite demander un devis pour l’offre « ${offer.title} ». Mon activité : `}
                  >
                    {offer.label === "Sur mesure" ? "Décrire mon besoin" : "Demander un devis"}
                  </ContactLink>
                </article>
              ))}
            </div>
            <p className="offer-note">
              <strong>Avant de démarrer :</strong> le devis précisera le nombre de pages, le contenu fourni, les fonctionnalités,
              les retouches prévues, le délai, le coût et les éventuels frais de domaine, d’hébergement ou de maintenance.
              Ces frais ne sont pas présumés inclus.
            </p>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="wrap">
            <div className="section-heading">
              <p className="eyebrow">Questions fréquentes</p>
              <h2>Avant de vous lancer</h2>
              <p>Les détails exacts dépendent de votre projet et sont clarifiés dans la proposition.</p>
            </div>
            <div className="faq-list">
              {questions.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="wrap">
            <p className="eyebrow">Parlons de votre activité</p>
            <h2>Prêt à présenter votre métier en ligne ?</h2>
            <p>Expliquez-nous ce que vous faites et ce que vous souhaitez montrer à vos clients. Nous échangerons pour définir une solution adaptée à votre projet.</p>
            <ContactLink message="Bonjour, je voudrais parler de mon projet de site web.">
              Écrire sur WhatsApp <span aria-hidden="true">→</span>
            </ContactLink>
            {!whatsappConfigured && (
              <p className="config-note" id="contact-setup">
                Pour activer ce bouton, renseignez votre numéro WhatsApp au format international (chiffres uniquement)
                dans la variable <code>NEXT_PUBLIC_WHATSAPP_NUMBER</code> de votre fichier <code>.env.local</code>,
                puis redémarrez le site.
              </p>
            )}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner wrap">
          <p><strong>AfriTech Elite</strong> — Sites web pour commerçants, artisans et indépendants. © {new Date().getFullYear()}</p>
          <div className="footer-links">
            <a href="#metiers">Les métiers</a>
            <a href="#etapes">Projet de site web</a>
            <a href="#faq">FAQ</a>
            <a href="#cours-mathematiques">Cours de maths</a>
            <a href="https://portfoliolandry.netlify.app/" target="_blank" rel="noopener noreferrer">Portfolio</a>
            <a href="/contact">Nous contacter</a>
          </div>
        </div>
      </footer>
    </>
  );
}
