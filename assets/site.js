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
  const initial = isGermanOnly || (navigator.language || "en").toLowerCase().startsWith("de") ? "de" : "en";

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
  const header = document.createElement("header");
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
  if (isGermanOnly) header.querySelector(".language-switch")?.remove();

  if (page === "product") {
    const heroContainer = document.querySelector(".hero")?.parentElement;
    if (heroContainer) {
      const productFacts = document.createElement("div");
      productFacts.className = "product-facts";
      productFacts.innerHTML = `
        <div><span data-de="Plattform" data-en="Platform">Plattform</span><strong>iPhone / iPad</strong></div>
        <div><span data-de="Entwicklung" data-en="Development">Entwicklung</span><strong data-de="Native für iOS" data-en="Native for iOS">Native für iOS</strong></div>
        <div><span data-de="Datenschutz" data-en="Privacy">Datenschutz</span><strong data-de="Bewusst konzipiert" data-en="Built in by design">Bewusst konzipiert</strong></div>`;
      heroContainer.append(productFacts);
    }

    ["#features", ".feature-ledger"].forEach((selector) => {
      document.querySelectorAll(`${selector} .card-icon`).forEach((element, index) => {
        element.textContent = String(index + 1).padStart(2, "0");
      });
    });
  }

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-inner">
      <span>© 2026 JSPixelcraft</span>
      <div class="footer-links">
        ${isAppPage ? `<a href="support.html">Support</a>` : ""}
        <a href="${isAppPage ? "privacy.html" : `${root}impressum.html#privacy`}" data-de="Datenschutz" data-en="Privacy">Privacy</a>
        <a href="${root}impressum.html" data-de="Impressum" data-en="Legal notice">Impressum</a>
        <a href="mailto:jspixelcraft@icloud.com" data-de="Kontakt" data-en="Contact">Contact</a>
      </div>
    </div>`;
  body.append(footer);

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });

  setLanguage(initial);
})();
