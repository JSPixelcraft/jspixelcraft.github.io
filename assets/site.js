(() => {
  const html = document.documentElement;
  const body = document.body;
  const root = body.dataset.root || "";
  const app = body.dataset.app || "JSPixelcraft";
  const page = body.dataset.page || "home";
  const icon = body.dataset.icon || `${root}logo.png`;
  const isAppPage = ["product", "support", "privacy"].includes(page);

  const labels = {
    de: { home: "Übersicht", product: "App", support: "Support", privacy: "Datenschutz", skip: "Zum Inhalt" },
    en: { home: "Overview", product: "App", support: "Support", privacy: "Privacy", skip: "Skip to content" }
  };

  const isGermanOnly = body.dataset.languageMode === "de-only";
  let savedLanguage = null;
  try {
    savedLanguage = localStorage.getItem("jspixelcraft-language");
  } catch (_) {}
  const initial = isGermanOnly ? "de" : savedLanguage === "de" || savedLanguage === "en" ? savedLanguage : "en";

  const staticTranslations = [
    ["Zum Inhalt", "Skip to content"],
    ["Webentwicklung", "Web development"],
    ["Datenschutz", "Privacy"],
    ["Impressum", "Legal notice"],
    ["Kontakt", "Contact"],
    ["E-Mail:", "Email:"],
    ["Ablauf", "Process"],
    ["Leistungen", "Services"],
    ["Rechtliches", "Legal"],
    ["Dein Fahrtenbuch.", "Your logbook."],
    ["Flüge im Blick", "Flights at a glance"],
    ["Teams klar organisiert", "Teams clearly organized"],
    ["12 Dokumente", "12 documents"],
    ["Geschäftsjahr 2026", "Fiscal year 2026"],
    ["KassenAnker mobil", "KassenAnker mobile"],
    ["iOS App · Bald", "iOS app · Coming soon"],
    ["Mac + iPhone · Bald", "Mac + iPhone · Coming soon"],
    ["01 / PRÜFEN", "01 / REVIEW"],
    ["02 / ÜBERGEBEN", "02 / HAND OVER"],
    ["01 / REISEABLAUF", "01 / ITINERARY"],
    ["02 / FLUGHAFEN", "02 / AIRPORT"],
    ["03 / ASSISTENZ", "03 / ASSISTANCE"],
    ["01 / ERFASSEN", "01 / CAPTURE"],
    ["02 / VERSTEHEN", "02 / UNDERSTAND"],
    ["03 / ORGANISIEREN", "03 / ORGANIZE"],
    ["01 / TAGESABLAUF", "01 / DAILY ROUTINE"],
    ["02 / GEMEINSAM", "02 / TOGETHER"],
    ["03 / HILFE", "03 / HELP"],
    ["02 / TEAM", "02 / TEAM"],
    ["03 / AUSWERTEN", "03 / ANALYZE"],
    ["SCHNELLBUCHUNGEN", "QUICK ENTRIES"],
    ["02 / BELEGE", "02 / RECEIPTS"],
    ["03 / ABSCHLIESSEN", "03 / CLOSE"],
    ["04 / GESCHÄFTSKONTO", "04 / BUSINESS ACCOUNT"],
    ["05 / STEUERBERATER-EXPORT", "05 / TAX ADVISOR EXPORT"],
    ["06 / ARCHIV", "06 / ARCHIVE"],
    ["01 / KONZEPT", "01 / CONCEPT"],
    ["02 / DESIGN & ENTWICKLUNG", "02 / DESIGN & DEVELOPMENT"],
    ["03 / RELEASE", "03 / RELEASE"],
    ["TestFlight & Qualitätsprüfung", "TestFlight & quality assurance"],
    ["01 / VERSTEHEN", "01 / UNDERSTAND"],
    ["02 / ENTWERFEN", "02 / DESIGN"],
    ["03 / SYSTEMATISIEREN", "03 / SYSTEMIZE"],
    ["01 / ERHALTEN", "01 / MAINTAIN"],
    ["02 / REAGIEREN", "02 / RESPOND"],
    ["03 / WEITERENTWICKELN", "03 / EVOLVE"],
    ["01 / STRATEGIE & DESIGN", "01 / STRATEGY & DESIGN"],
    ["02 / ENTWICKLUNG", "02 / DEVELOPMENT"],
    ["03 / VERÖFFENTLICHUNG", "03 / LAUNCH"],
    ["Technische SEO", "Technical SEO"],
    ["Projekt anfragen", "Start a project"],
    ["Design-Projekt besprechen", "Discuss a design project"],
    ["Leistungsumfang", "Scope of services"],
    ["Support anfragen", "Request support"],
    ["Betreuung anfragen", "Request ongoing support"],
    ["Navigation", "Navigation"],
    ["iOS App-Entwicklung", "iOS app development"],
    ["Wartung & Support", "Maintenance & support"],
    ["Mit Sorgfalt für ambitionierte Produkte entwickelt.", "Crafted with care for ambitious products."]
  ];

  const staticTranslationLookup = new Map();
  staticTranslations.forEach(([de, en]) => {
    staticTranslationLookup.set(de, { de, en });
    staticTranslationLookup.set(en, { de, en });
  });

  function localizeStaticText(language) {
    const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || parent.closest("[data-de][data-en]") || ["SCRIPT", "STYLE"].includes(parent.tagName)) return;
      const value = node.nodeValue;
      const trimmed = value.trim();
      const translation = staticTranslationLookup.get(trimmed);
      if (!translation) return;
      node.nodeValue = value.replace(trimmed, translation[language]);
    });

    const attributeTranslations = new Map();
    [
      ["Hauptnavigation", "Main navigation"],
      ["Zurück zur Hauptseite", "Back to home"],
      ["Sprache", "Language"],
      ["JSPixelcraft Startseite", "JSPixelcraft home page"],
      ["FlyBuddy auf dem iPhone und ZeitPilot auf dem iPad", "FlyBuddy on iPhone and ZeitPilot on iPad"],
      ["ZeitPilot App auf einem iPad mit Mitarbeiterübersicht", "ZeitPilot app on an iPad with an employee overview"],
      ["FlyBuddy App auf einem iPhone mit Flugübersicht", "FlyBuddy app on an iPhone with a flight overview"],
      ["FlyBuddy Flugübersicht auf einem iPhone", "FlyBuddy flight overview on an iPhone"],
      ["FlyBuddy Flugübersicht mit Reiseplan, Check-in und Gate", "FlyBuddy flight overview with itinerary, check-in and gate"],
      ["ZeitPilot Mitarbeiterübersicht auf einem iPad", "ZeitPilot employee overview on an iPad"],
      ["Beispielhafte KassenAnker Dashboard-Ansicht", "Example KassenAnker dashboard view"],
      ["Beispielhafte KassenAnker iPhone-Ansicht", "Example KassenAnker iPhone view"]
    ].forEach(([de, en]) => {
      attributeTranslations.set(de, { de, en });
      attributeTranslations.set(en, { de, en });
    });
    document.querySelectorAll("[aria-label], [alt]").forEach((element) => {
      ["aria-label", "alt"].forEach((attribute) => {
        const translation = attributeTranslations.get(element.getAttribute(attribute));
        if (translation) element.setAttribute(attribute, translation[language]);
      });
    });
  }

  function localizeElements(language) {
    document.querySelectorAll("[data-de][data-en]").forEach((element) => {
      element.textContent = element.dataset[language];
    });
    document.querySelectorAll("[data-de-label][data-en-label]").forEach((element) => {
      element.setAttribute("aria-label", element.dataset[`${language}Label`]);
    });
  }

  function setLanguage(language) {
    html.lang = language;
    localizeElements(language);
    localizeStaticText(language);
    document.querySelectorAll("[data-language]").forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const titleKey = `title${language.charAt(0).toUpperCase()}${language.slice(1)}`;
    const title = body.dataset[titleKey];
    if (title) document.title = title;
  }

  const navTarget = page === "home" ? `${root}index.html` : "index.html";
  let header = document.querySelector(".site-header");
  if (!header) {
    header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
    <a class="skip-link" href="#content" data-de="Zum Inhalt" data-en="Skip to content">Skip to content</a>
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="${navTarget}" aria-label="${app}">
        <img src="${icon}" alt="">
        <span>${app}</span>
      </a>
      <div class="nav-links">
        ${page === "home" ? `<a href="#apps" data-de="Apps" data-en="Apps">Apps</a><a href="#entwicklung" data-de="Entwicklung" data-en="Development">Entwicklung</a>` : page === "legal" ? `<a class="all-apps-link" href="${root}index.html" data-de-label="Zurück zur Hauptseite" data-en-label="Back to home" aria-label="Zurück zur Hauptseite">←</a>` : `
          <a class="all-apps-link" href="${root}index.html" data-de-label="Zurück zur Hauptseite" data-en-label="Back to home" aria-label="Zurück zur Hauptseite">←</a>
          <a href="index.html" ${page === "product" ? 'aria-current="page"' : ""} data-de="App" data-en="App">App</a>
          <a href="support.html" ${page === "support" ? 'aria-current="page"' : ""} data-de="Support" data-en="Support">Support</a>
          <a href="privacy.html" ${page === "privacy" ? 'aria-current="page"' : ""} data-de="Datenschutz" data-en="Privacy">Privacy</a>`}
      </div>
      <div class="language-switch" aria-label="Language">
        <button type="button" data-language="de">DE</button>
        <button type="button" data-language="en">EN</button>
      </div>
    </nav>`;
    body.prepend(header);
  }
  if (isGermanOnly) header.querySelector(".language-switch")?.remove();

  if (page === "product") {
    const heroContainer = document.querySelector(".hero")?.parentElement;
    if (heroContainer) {
      const platform = body.dataset.platform || "iPhone / iPad";
      const developmentDe = body.dataset.developmentDe || "Native für iOS";
      const developmentEn = body.dataset.developmentEn || "Native for iOS";
      const privacyDe = body.dataset.privacyDe || "Bewusst konzipiert";
      const privacyEn = body.dataset.privacyEn || "Built in by design";
      const productFacts = document.createElement("div");
      productFacts.className = "product-facts";
      productFacts.innerHTML = `
        <div><span data-de="Plattform" data-en="Platform">Plattform</span><strong>${platform}</strong></div>
        <div><span data-de="Entwicklung" data-en="Development">Entwicklung</span><strong data-de="${developmentDe}" data-en="${developmentEn}">${developmentDe}</strong></div>
        <div><span data-de="Datenschutz" data-en="Privacy">Datenschutz</span><strong data-de="${privacyDe}" data-en="${privacyEn}">${privacyDe}</strong></div>`;
      heroContainer.append(productFacts);
    }

    ["#features", ".feature-ledger"].forEach((selector) => {
      document.querySelectorAll(`${selector} .card-icon`).forEach((element, index) => {
        element.textContent = String(index + 1).padStart(2, "0");
      });
    });
  }

  let footer = document.querySelector(".site-footer");
  if (!footer) {
    footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
    <div class="footer-inner">
      <span>© 2026 JSPixelcraft</span>
      <div class="footer-links">
        <a href="${root}#apps" data-de="Apps" data-en="Apps">Apps</a>
        <a href="${root}#entwicklung" data-de="Webentwicklung" data-en="Web development">Webentwicklung</a>
        ${isAppPage ? `<a href="support.html">Support</a>` : ""}
        <a href="${isAppPage ? "privacy.html" : `${root}impressum.html#privacy`}" data-de="Datenschutz" data-en="Privacy">Privacy</a>
        <a href="${root}impressum.html" data-de="Impressum" data-en="Legal notice">Impressum</a>
        <a href="mailto:jspixelcraft@icloud.com" data-de="Kontakt" data-en="Contact">Contact</a>
      </div>
    </div>`;
    body.append(footer);
  }

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.language;
      try {
        localStorage.setItem("jspixelcraft-language", language);
      } catch (_) {}
      setLanguage(language);
    });
  });

  setLanguage(initial);
})();
