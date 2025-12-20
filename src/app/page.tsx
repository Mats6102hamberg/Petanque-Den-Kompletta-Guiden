"use client";

import { useEffect, useMemo, useState } from "react";

type ProductCard = {
  icon: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref?: string;
  variant?: "primary" | "outline";
};

type ModalProduct = {
  id: string;
  title: string;
  description: string;
  features: string[];
  monthlyPrice: string;
  yearlyPrice: string;
  link: string;
  bonusNote?: string;
};

const stats = [
  { label: "Länder", value: "7+" },
  { label: "Produkter", value: "10+" },
  { label: "Språk", value: "6" },
  { label: "Support", value: "24/7" },
];

const flagshipProducts: ProductCard[] = [
  {
    icon: "🛡️",
    title: "Enterprise Research Shield",
    tagline: "Säkerhet i realtid för känslig data",
    description:
      "Skydda din organisation med AI-driven övervakning av medicinsk och personlig data. Blockera hot automatiskt.",
    features: [
      "Realtidsövervakning av känslig data",
      "Automatisk riskanalys och blockering",
      "Stöd för medicinska & sociala profiler",
      "Export och rapportering för compliance",
    ],
    ctaLabel: "Se dashboard",
    ctaHref: "/security-dashboard",
    variant: "primary",
  },
  {
    icon: "📊",
    title: "Prospero",
    tagline: "AI-driven ekonomisk planering",
    description:
      "Avancerad finansiell rådgivning med Monte Carlo-simuleringar och scenariojämförelser. Visualisera framtiden.",
    features: [
      "Monte Carlo-simuleringar (2000+ scenarion)",
      "Advisor Mode med scenariojämförelse",
      "Stresstest & optimistiska prognoser",
      "PDF-rapporter för kunder",
    ],
    ctaLabel: "Öppna Prospero",
    ctaHref: "https://prospero-lovat.vercel.app",
    variant: "primary",
  },
  {
    icon: "🇸🇪",
    title: "FakturaSnap Sverige",
    tagline: "Smart fakturering för svenska företag",
    description:
      "Skapa fakturor på sekunder, skanna kvitton och låt AI fixa moms, SIE-export och påminnelser.",
    features: [
      "AI-driven kvittoskanning",
      "Svensk momsberäkning (25%, 12%, 6%)",
      "SIE4-export till Visma/Fortnox",
      "Skatt-O-Meter för egenföretagare",
    ],
    ctaLabel: "Kontakta oss",
    ctaHref: "#kontakt",
    variant: "primary",
  },
  {
    icon: "🇬🇧",
    title: "Boris Storbritannien",
    tagline: "Bokföring för brittiska företag",
    description:
      "Boris hjälper dig med VAT, HMRC-rapporter och brittiska skatteregler. Perfekt för sole traders och limited companies.",
    features: [
      "UK VAT-beräkning (20%, 5%, 0%)",
      "HMRC MTD-integration",
      "Mileage tracking (45p/mile)",
      "Tax Bill Estimator",
    ],
    ctaLabel: "Kontakta oss",
    ctaHref: "#kontakt",
    variant: "outline",
  },
  {
    icon: "🇩🇪",
    title: "Boris Tyskland",
    tagline: "Bokföring för tyska företag",
    description:
      "Boris hjälper dig med Umsatzsteuer, DATEV-export och tyska skatteregler. GoBD-konform och säker.",
    features: [
      "Tysk moms (19%, 7%, 0%)",
      "DATEV CSV-export",
      "GoBD-konform audit trail",
      "Steuer-O-Meter",
    ],
    ctaLabel: "Kontakta oss",
    ctaHref: "#kontakt",
    variant: "outline",
  },
  {
    icon: "🇳🇱",
    title: "Boris Nederländerna",
    tagline: "Bokföring för nederländska företag",
    description:
      "Boris hjälper dig med BTW, XAF-export och nederländska skatteregler. Perfekt för ZZP:are och kleine ondernemers.",
    features: [
      "Nederländsk BTW (21%, 9%, 0%)",
      "XAF-export för Belastingdienst",
      "KOR-gränsvarning (€20.000)",
      "ICP-rapportering för EU-handel",
    ],
    ctaLabel: "Kontakta oss",
    ctaHref: "#kontakt",
    variant: "outline",
  },
  {
    icon: "💚",
    title: "VitalMonitor Pro",
    tagline: "Klinisk övervakning i realtid",
    description:
      "Avancerat övervakningssystem för vårdteam med AI-insikter, NEWS2-beräkningar och realtidsströmning av vitalparametrar.",
    features: [
      "Realtidsövervakning av vitala parametrar",
      "AI-genererade kliniska insikter",
      "NEWS2-beräkningar och larmhantering",
      "Ventilator- och infusionspumpsstatus",
    ],
    ctaLabel: "Läs mer",
    ctaHref: "#kontakt",
    variant: "primary",
  },
  {
    icon: "🛡️",
    title: "Crash Catcher",
    tagline: "Systemövervakning och felhantering",
    description:
      "Realtidsövervakning av alla tjänster med automatisk felrapportering, latency tracking och health checks för 7 länder.",
    features: [
      "Error logging med stack traces",
      "Latency tracking och performance monitoring",
      "Health checks för alla tjänster",
      "Memory monitoring och alerts",
    ],
    ctaLabel: "Läs mer",
    ctaHref: "#kontakt",
    variant: "outline",
  },
  {
    icon: "🧪",
    title: "Supertestaren",
    tagline: "API-testning och validering",
    description:
      "Automatiserad testplattform för API:er och backend-tjänster med integration till VitalMonitor Pro och andra system.",
    features: [
      "Automatiserad API-testning",
      "Integration med backend-tjänster",
      "Validering och kvalitetssäkring",
      "Continuous testing pipeline",
    ],
    ctaLabel: "Läs mer",
    ctaHref: "#kontakt",
    variant: "outline",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Familjehemsportalen",
    tagline: "Tryggt stöd för familjehemskonsulenterna",
    description:
      "AI-driven plattform för akutstöd och beslutsfattande i svåra situationer. Hjälper familjehemskonsulenterna med verktyg, checklistor och kunskapsbank.",
    features: [
      "Akutstöd i svåra situationer",
      "AI-genererade mötessammanfattningar",
      "Verktyg & checklistor för bedömningar",
      "Kunskapsbank och kursmaterial",
    ],
    ctaLabel: "Läs mer",
    ctaHref: "#kontakt",
    variant: "primary",
  },
  {
    icon: "🎯",
    title: "Pétanque-guiden",
    tagline: "Den kompletta guiden",
    description:
      "Digital bok med 16 kapitel, matchprotokoll och träningsjournal på sex språk.",
    features: [
      "16 kapitel",
      "Matchprotokoll",
      "Träningsjournal",
      "6 språk",
    ],
    ctaLabel: "Läs mer",
    ctaHref: "https://petanque-den-kompletta-guiden.vercel.app",
    variant: "outline",
  },
];

const irisProduct: ProductCard = {
  icon: "🔮",
  title: "Iris",
  tagline: "Holistisk självinsikt",
  description:
    "Utforska din energisignatur via astrologi, numerologi, färganalys och tarot – med spelifiering.",
  features: [
    "Personligt horoskop",
    "Numerologi & livssiffra",
    "Färganalys & paletter",
    "Tarot med animationer",
  ],
  ctaLabel: "Öppna Iris",
  ctaHref: "https://iris-holistisk.vercel.app",
  variant: "primary",
};

const textScannerProducts: ModalProduct[] = [
  {
    id: "dagbok",
    title: "Dagboksscannern",
    description: "Skanna handskrivna dagböcker och skapa berättelser med AI.",
    features: [
      "OCR för handskrift",
      "AI-förtydligande av text",
      "Automatisk berättarstruktur",
      "Exportera som PDF",
      "Inkluderar Minnesböcker & SläktMagi",
    ],
    monthlyPrice: "99 kr/mån",
    yearlyPrice: "990 kr/år",
    link: "https://textscanner.smartflow.se/dagbok",
  },
  {
    id: "avtal",
    title: "Avtalsscannern",
    description: "Ladda upp avtal och få riskanalys och förklaringar på enkel svenska.",
    features: [
      "Riskanalys med AI",
      "Förenklad juridisk text",
      "Stöd för flera språk",
      "Exportera sammanfattningar",
      "Skicka vidare till Prospero",
    ],
    monthlyPrice: "99 kr/mån",
    yearlyPrice: "990 kr/år",
    link: "https://textscanner.smartflow.se/avtal",
  },
  {
    id: "maskering",
    title: "Maskeringsverktyget",
    description: "Maskera känslig information innan dokument delas vidare.",
    features: [
      "Identifierar personnummer automatiskt",
      "Maskerar adresser och kontaktfält",
      "GDPR-vänligt arbetsflöde",
      "Stöd för PDF och bilder",
      "Perfekt för företag & kommuner",
    ],
    monthlyPrice: "149 kr/mån",
    yearlyPrice: "1 490 kr/år",
    link: "https://textscanner.smartflow.se/maskering",
  },
  {
    id: "minnesbok",
    title: "Minnesböcker",
    description: "Skapa en vacker minnesbok med kapitel, tidslinjer och personregister.",
    features: [
      "AI-genererad kapitelindelning",
      "Tidslinje över händelser",
      "Automatiskt personregister",
      "Temaanalys",
      "Export som bok",
    ],
    monthlyPrice: "99 kr/mån",
    yearlyPrice: "990 kr/år",
    link: "https://textscanner.smartflow.se/minnesbok",
  },
  {
    id: "slaktmagi",
    title: "SläktMagi",
    description: "Bygg släktträd och generera berättelser ur ditt arkiv.",
    features: [
      "Interaktivt släktträd",
      "Tidslinje för viktiga händelser",
      "AI-genererade utkast",
      "Relationsanalys",
      "Exportera som film",
    ],
    monthlyPrice: "99 kr/mån",
    yearlyPrice: "990 kr/år",
    link: "https://textscanner.smartflow.se/slaktmagin",
  },
  {
    id: "sprak",
    title: "Språkverktyget",
    description: "Förenkla, sammanfatta och översätt dokument med AI.",
    features: [
      "Förenkla svår text",
      "Sammanfatta långa dokument",
      "Översätt mellan flera språk",
      "Anpassa för målgrupp",
      "Stöd för flera format",
    ],
    monthlyPrice: "79 kr/mån",
    yearlyPrice: "790 kr/år",
    link: "https://textscanner.smartflow.se/sprak",
  },
];

const values = [
  {
    icon: "🎯",
    title: "Enkelhet",
    text: "Vi tar bort krånglet så du kan fokusera på det viktiga.",
  },
  {
    icon: "🤝",
    title: "Rättvisa",
    text: "Schyssta priser så att även små företag har råd med bra verktyg.",
  },
  {
    icon: "🌍",
    title: "Tillgänglighet",
    text: "Flera språk och lokala regler i varje land vi verkar i.",
  },
];

const navLinks = [
  { href: "#produkter", label: "Produkter" },
  { href: "#om-oss", label: "Om oss" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function SmartflowPage() {
  const [selectedProduct, setSelectedProduct] = useState<ModalProduct | null>(
    null,
  );

  const modalProducts = useMemo(
    () =>
      textScannerProducts.reduce<Record<string, ModalProduct>>(
        (acc, product) => {
          acc[product.id] = product;
          return acc;
        },
        {},
      ),
    [],
  );

  useEffect(() => {
    if (!selectedProduct) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProduct(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProduct]);

  const openModal = (id: string) => {
    setSelectedProduct(modalProducts[id]);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="sf-page">
      <nav className="sf-nav">
        <div className="sf-nav__inner">
          <a href="#" className="sf-logo" aria-label="Smartflow AB">
            <span className="sf-logo__smart">Smart</span>
            <span className="sf-logo__flow">flow</span>
          </a>
          <div className="sf-nav__links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <a
              className="sf-btn sf-btn--primary"
              href="#kontakt"
              aria-label="Kontakta Smartflow AB"
            >
              Kontakta oss
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="sf-section sf-hero">
          <div className="sf-hero__inner">
            <span className="sf-eyebrow">
              🚀 Smartflow AB <span>Digitalt produktbolag</span>
            </span>
            <h1>
              Digitala lösningar som <span>förenklar vardagen</span>
            </h1>
            <p>
              Vi utvecklar smarta appar och verktyg för företagare och
              privatpersoner. Från fakturering till bokföring – vi gör det
              enkelt.
            </p>
            <div className="sf-hero__actions">
              <a className="sf-btn sf-btn--primary" href="#produkter">
                Se våra produkter
              </a>
              <a className="sf-btn sf-btn--outline" href="#kontakt">
                Kontakta oss
              </a>
            </div>
          </div>
        </section>

        <section className="sf-section sf-stats">
          <div className="sf-stats__grid">
            {stats.map((stat) => (
              <div key={stat.label} className="sf-stat">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sf-section" id="produkter">
          <div className="sf-section__header">
            <span className="sf-section__label">🚀 Våra produkter</span>
            <h2 className="sf-section__title">Appar som gör skillnad</h2>
            <p className="sf-section__subtitle">
              Från fakturering till bokföring – våra verktyg hjälper tusentals
              användare varje dag.
            </p>
          </div>

          <div className="sf-products__grid">
            {flagshipProducts.map((product) => (
              <article key={product.title} className="sf-card">
                <div className="sf-card__icon" aria-hidden>
                  {product.icon}
                </div>
                <h3 className="sf-card__headline">{product.title}</h3>
                <p className="sf-card__tagline">{product.tagline}</p>
                <p className="sf-card__body">{product.description}</p>
                <ul className="sf-card__list">
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                {product.ctaHref && (
                  <a
                    className={`sf-btn ${
                      product.variant === "outline"
                        ? "sf-btn--outline"
                        : "sf-btn--primary"
                    }`}
                    href={product.ctaHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {product.ctaLabel}
                  </a>
                )}
              </article>
            ))}
          </div>

          <div className="sf-section__header" style={{ marginTop: "4rem" }}>
            <span className="sf-section__label">🔮 Iris</span>
            <h2 className="sf-section__title">Din holistiska guide</h2>
            <p className="sf-section__subtitle">
              Upptäck dig själv genom astrologi, numerologi, färganalys och
              tarot – allt i en app.
            </p>
          </div>

          <div className="sf-products__grid">
            <article className="sf-card">
              <div className="sf-card__icon" aria-hidden>
                {irisProduct.icon}
              </div>
              <h3 className="sf-card__headline">{irisProduct.title}</h3>
              <p className="sf-card__tagline">{irisProduct.tagline}</p>
              <p className="sf-card__body">{irisProduct.description}</p>
              <ul className="sf-card__list">
                {irisProduct.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                className="sf-btn sf-btn--primary"
                href={irisProduct.ctaHref}
                target="_blank"
                rel="noreferrer"
              >
                {irisProduct.ctaLabel} →
              </a>
            </article>
          </div>

          <div className="sf-section__header" style={{ marginTop: "4rem" }}>
            <span className="sf-section__label">📄 Textscanner</span>
            <h2 className="sf-section__title">AI-drivna textverktyg</h2>
            <p className="sf-section__subtitle">
              Skanna, analysera och bearbeta dokument med AI. Perfekt för
              privatpersoner, företag och organisationer.
            </p>
          </div>

          <div className="sf-products__grid">
            {textScannerProducts.map((tool) => (
              <article key={tool.id} className="sf-card">
                <div className="sf-card__icon" aria-hidden>
                  {tool.id === "maskering"
                    ? "🔒"
                    : tool.id === "sprak"
                      ? "🌐"
                      : tool.id === "slaktmagi"
                        ? "🌳"
                        : tool.id === "minnesbok"
                          ? "📖"
                          : tool.id === "avtal"
                            ? "📄"
                            : "📘"}
                </div>
                <h3 className="sf-card__headline">{tool.title}</h3>
                <p className="sf-card__tagline">{tool.description}</p>
                <ul className="sf-card__list">
                  {tool.features.slice(0, 4).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="sf-btn sf-btn--primary"
                  onClick={() => openModal(tool.id)}
                >
                  Välj plan →
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="sf-section sf-about" id="om-oss">
          <div className="sf-about__grid">
            <div>
              <div className="sf-section__label">Om Smartflow AB</div>
              <h2 className="sf-section__title" style={{ textAlign: "left" }}>
                Teknik med mänskligt fokus
              </h2>
              <p>
                Vi är ett svenskt techbolag som bygger digitala verktyg för att
                förenkla vardagen för företagare och privatpersoner.
              </p>
              <p>
                Vår filosofi är enkel – teknik ska vara tillgängligt, prisvärt
                och faktiskt lösa riktiga problem. Därför bygger vi appar som är
                lätta att använda men ändå kraftfulla under huven.
              </p>
              <p>
                Med kunder i sju länder och produkter på sex språk växer vi
                snabbt – men vi glömmer aldrig att det handlar om att hjälpa
                människor.
              </p>
            </div>
            <div className="sf-about__visual" aria-hidden>
              🚀
            </div>
          </div>
        </section>

        <section className="sf-section">
          <div className="sf-section__header">
            <span className="sf-section__label">💡 Våra värderingar</span>
            <h2 className="sf-section__title">Det vi tror på</h2>
          </div>
          <div className="sf-values__grid">
            {values.map((value) => (
              <article key={value.title} className="sf-value">
                <div className="sf-value__icon" aria-hidden>
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="sf-section sf-contact" id="kontakt">
          <div className="sf-section__header">
            <span className="sf-section__label">📬 Kontakt</span>
            <h2 className="sf-section__title">Kontakta oss</h2>
            <p className="sf-section__subtitle" style={{ color: "white" }}>
              Har du frågor om våra produkter eller vill samarbeta? Hör av dig!
            </p>
          </div>
          <a className="sf-btn sf-btn--primary" href="mailto:info@smartflow.se">
            info@smartflow.se
          </a>
          <div className="sf-contact__info">
            <div>
              <p className="sf-card__tagline" style={{ color: "white" }}>
                Företag
              </p>
              <p>Smartflow AB</p>
            </div>
            <div>
              <p className="sf-card__tagline" style={{ color: "white" }}>
                Org.nr
              </p>
              <p>559050-6894</p>
            </div>
            <div>
              <p className="sf-card__tagline" style={{ color: "white" }}>
                Moms.nr
              </p>
              <p>SE559050689401</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="sf-footer">
        <div className="sf-logo" style={{ justifyContent: "center" }}>
          <span className="sf-logo__smart">Smart</span>
          <span className="sf-logo__flow">flow</span>
        </div>
        <p>© 2024 Smartflow AB. Alla rättigheter förbehållna.</p>
        <p>Org.nr: 559050-6894</p>
      </footer>

      {selectedProduct && (
        <div className="sf-modal" role="dialog" aria-modal="true">
          <div className="sf-modal__panel">
            <button
              className="sf-modal__close"
              onClick={closeModal}
              aria-label="Stäng"
            >
              ×
            </button>
            <div className="sf-modal__header">
              <h3>{selectedProduct.title}</h3>
              <p>{selectedProduct.description}</p>
            </div>
            <div className="sf-modal__body">
              <ul className="sf-card__list" style={{ marginBottom: "1.5rem" }}>
                {selectedProduct.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <h4 style={{ marginBottom: "1rem" }}>Välj din plan</h4>
              <div className="sf-pricing">
                <a
                  className="sf-pricing__option"
                  href={`${selectedProduct.link}?plan=free`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <div className="sf-pricing__label">🎁 Gratis test</div>
                    <div className="sf-pricing__note">
                      5 dokument, sedan väntelista i 1 år
                    </div>
                  </div>
                  <span className="sf-pricing__price">0 kr</span>
                </a>
                <a
                  className="sf-pricing__option"
                  href={`${selectedProduct.link}?plan=monthly`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <div className="sf-pricing__label">
                      📅 Månadsprenumeration
                    </div>
                    <div className="sf-pricing__note">
                      Obegränsat antal dokument
                    </div>
                  </div>
                  <span className="sf-pricing__price">
                    {selectedProduct.monthlyPrice}
                  </span>
                </a>
                <a
                  className="sf-pricing__option sf-pricing__option--featured"
                  href={`${selectedProduct.link}?plan=yearly`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <div className="sf-pricing__label">⭐ Årsprenumeration</div>
                    <div className="sf-pricing__note">
                      Spara 17% – bästa värdet
                    </div>
                  </div>
                  <span className="sf-pricing__price">
                    {selectedProduct.yearlyPrice}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
