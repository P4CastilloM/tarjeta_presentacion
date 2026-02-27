// ============================================
// DATOS EDITABLES - Modificar aquí
// ============================================
const defaultConfig = {
  nombre: "María González",
  titulo: "Corredora de Propiedades",
  telefono: "+56 9 1234 5678",
  whatsapp: "56912345678",
  email: "contacto@ejemplo.com",
  instagram: "mariagonzalez.propiedades",
  tagline: "Tu próximo hogar comienza aquí",
  bio: "Con dedicación y profesionalismo, te acompaño en cada paso del proceso inmobiliario. Mi enfoque está en entender tus necesidades para encontrar la propiedad perfecta o conseguir el mejor resultado en la venta de tu inmueble. Trabajo con transparencia, comunicación constante y un servicio personalizado que marca la diferencia.",
  zones: ["Concepción", "San Pedro", "Talcahuano", "Hualpén", "Chiguayante"],
  services: [
    { titulo: "Venta de Propiedades", descripcion: "Gestión completa de la venta de tu propiedad con estrategias de marketing efectivas." },
    { titulo: "Arriendo", descripcion: "Encuentra el arriendo ideal o gestiona tu propiedad de forma profesional." },
    { titulo: "Tasación", descripcion: "Evaluación profesional del valor de mercado de tu propiedad." },
    { titulo: "Asesoría Documental", descripcion: "Apoyo en toda la documentación legal y trámites necesarios." },
    { titulo: "Gestión de Visitas", descripcion: "Coordinación y acompañamiento en todas las visitas a propiedades." }
  ],
  background_color: "#fafafa",
  surface_color: "#ffffff",
  text_color: "#1a1a1a",
  accent_color: "#0d9488",
  muted_color: "#6b7280"
};

// Service icons SVG paths
const serviceIcons = [
  "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  "M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm4 4H9v-2h2v2zm0-4H9V9h2v2zm0-4H9V5h2v2zm4 8h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2z",
  "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H6v-2h6v2zm3-4H6v-2h9v2zm3-4H6V7h12v2z",
  "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
  "M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-5-6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
];

// ============================================
// THEME MANAGEMENT
// ============================================
function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredTheme() {
  return localStorage.getItem("theme") || "system";
}

function setTheme(theme) {
  const effectiveTheme = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.setAttribute("data-theme", effectiveTheme);
  localStorage.setItem("theme", theme);
}

// Apply theme ASAP (defer runs after parsing, but html starts in dark anyway)
(() => {
  const stored = getStoredTheme();
  const effective = stored === "system" ? getSystemTheme() : stored;
  document.documentElement.setAttribute("data-theme", effective);
  localStorage.setItem("theme", stored);

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (getStoredTheme() === "system") {
      document.documentElement.setAttribute("data-theme", getSystemTheme());
    }
  });
})();

// ============================================
// RENDER / CONFIG
// ============================================
async function onConfigChange(config) {
  const incomingConfig = config || {};
  const c = { ...defaultConfig, ...incomingConfig };

  // Text content
  const splashName = document.getElementById("splash-name");
  const headerName = document.getElementById("header-name");
  const heroName = document.getElementById("hero-name");
  const heroTitle = document.getElementById("hero-title");
  const heroTagline = document.getElementById("hero-tagline");
  const aboutBio = document.getElementById("about-bio");
  const footerText = document.getElementById("footer-text");

  if (splashName) splashName.textContent = c.nombre;
  if (headerName) headerName.textContent = c.nombre;
  if (heroName) heroName.textContent = c.nombre;
  if (heroTitle) heroTitle.textContent = c.titulo;
  if (heroTagline) heroTagline.textContent = c.tagline;
  if (aboutBio) aboutBio.textContent = c.bio;
  if (footerText) footerText.textContent = `© ${new Date().getFullYear()} ${c.nombre} · Todos los derechos reservados`;

  // Contact links
  const btnCall = document.getElementById("btn-call");
  const btnWhatsapp = document.getElementById("btn-whatsapp");
  const btnEmail = document.getElementById("btn-email");
  const contactPhone = document.getElementById("contact-phone");
  const contactWa = document.getElementById("contact-wa");
  const contactEmail = document.getElementById("contact-email");
  const contactIg = document.getElementById("contact-ig");
  const waFloat = document.getElementById("wa-float");

  const telHref = `tel:${String(c.telefono || "").replace(/\s/g, "")}`;

  if (btnCall) btnCall.href = telHref;
  if (btnWhatsapp) btnWhatsapp.href = `https://wa.me/${c.whatsapp}`;
  if (btnEmail) btnEmail.href = `mailto:${c.email}`;
  if (contactPhone) contactPhone.href = telHref;
  if (contactWa) contactWa.href = `https://wa.me/${c.whatsapp}`;
  if (contactEmail) contactEmail.href = `mailto:${c.email}`;
  if (contactIg) contactIg.href = `https://instagram.com/${c.instagram}`;
  if (waFloat) waFloat.href = `https://wa.me/${c.whatsapp}`;

  // Zones
  const zonesList = document.getElementById("zones-list");
  if (zonesList && Array.isArray(c.zones)) {
    zonesList.innerHTML = c.zones.map((zone) => `<span class="zone-chip">${zone}</span>`).join("");
  }

  // Services
  const servicesGrid = document.getElementById("services-grid");
  if (servicesGrid && Array.isArray(c.services)) {
    servicesGrid.innerHTML = c.services
      .map(
        (service, i) => `
        <div class="service-card">
          <div class="service-icon">
            <svg viewBox="0 0 24 24"><path d="${serviceIcons[i % serviceIcons.length]}"/></svg>
          </div>
          <h3 class="service-title">${service.titulo}</h3>
          <p class="service-desc">${service.descripcion}</p>
        </div>
      `
      )
      .join("");
  }

  // Colors
  const root = document.documentElement;
  if (Object.hasOwn(incomingConfig, "background_color") && c.background_color) {
    root.style.setProperty("--bg", c.background_color);
  }
  if (Object.hasOwn(incomingConfig, "surface_color") && c.surface_color) {
    root.style.setProperty("--surface", c.surface_color);
  }
  if (Object.hasOwn(incomingConfig, "text_color") && c.text_color) {
    root.style.setProperty("--text", c.text_color);
  }
  if (Object.hasOwn(incomingConfig, "accent_color") && c.accent_color) {
    root.style.setProperty("--accent", c.accent_color);
    root.style.setProperty("--accent-hover", adjustColor(c.accent_color, -15));
    root.style.setProperty("--accent-light", adjustColor(c.accent_color, 80, 0.15));
  }
  if (Object.hasOwn(incomingConfig, "muted_color") && c.muted_color) {
    root.style.setProperty("--muted", c.muted_color);
  }
}

function adjustColor(hex, amount, opacity = 1) {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  if (opacity < 1) return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  return `#${(1 << 24 | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

function mapToCapabilities(config) {
  const c = { ...defaultConfig, ...config };
  return {
    recolorables: [
      { get: () => c.background_color || defaultConfig.background_color, set: (v) => window.elementSdk?.setConfig({ background_color: v }) },
      { get: () => c.surface_color || defaultConfig.surface_color, set: (v) => window.elementSdk?.setConfig({ surface_color: v }) },
      { get: () => c.text_color || defaultConfig.text_color, set: (v) => window.elementSdk?.setConfig({ text_color: v }) },
      { get: () => c.accent_color || defaultConfig.accent_color, set: (v) => window.elementSdk?.setConfig({ accent_color: v }) },
      { get: () => c.muted_color || defaultConfig.muted_color, set: (v) => window.elementSdk?.setConfig({ muted_color: v }) }
    ],
    borderables: [],
    fontEditable: undefined,
    fontSizeable: undefined
  };
}

function mapToEditPanelValues(config) {
  const c = { ...defaultConfig, ...config };
  return new Map([
    ["nombre", c.nombre],
    ["titulo", c.titulo],
    ["tagline", c.tagline],
    ["telefono", c.telefono],
    ["whatsapp", c.whatsapp],
    ["email", c.email],
    ["instagram", c.instagram],
    ["bio", c.bio]
  ]);
}

// Initialize Element SDK (si existe)
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
}

// ============================================
// DOM READY
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = getStoredTheme();
      const effectiveCurrent = current === "system" ? getSystemTheme() : current;
      const newTheme = effectiveCurrent === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // Contact form -> WhatsApp
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name").value.trim();
      const message = document.getElementById("form-message").value.trim();
      const config = window.elementSdk ? window.elementSdk.config : defaultConfig;
      const whatsapp = config.whatsapp || defaultConfig.whatsapp;

      const text = encodeURIComponent(`Hola, soy ${name}. ${message}`);
      const waUrl = `https://wa.me/${whatsapp}?text=${text}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Initial render
  onConfigChange(window.elementSdk ? window.elementSdk.config : defaultConfig);
});
