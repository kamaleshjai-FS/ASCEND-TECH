/**
 * PORTFOLIO CONFIGURATION — DIGITAL CRAFT
 * 
 * Edit this file to customize your personal details, contact endpoints,
 * social links, and messaging configurations.
 */

export const PERSONAL_INFO = {
  name: "Ascend Tech",
  monogram: "Ascend Tech !",
  brandName: "DIGITAL STRATEGIST & DEVELOPER",
  edition: "2025/26",
  role: " Digital Marketing Strategist & Full-Stack Web Developer",
  introLabel: "DIGITAL MARKETING SPECIALIST & FULL-STACK DEVELOPER ",
  location: "chennai, India / Available Worldwide",
  studioAddress: "Not - mentioned for privacy reasons",
  coordinates: "",
  email: "ascendtech0413@gmail.com",
  phoneFormatted: "+91 9790318255",
  experience: " 2+ Years of Paid Ad Growth Experience",
  availability: "Available for Q1/Q2 2025 Engagements",
  statusBadge: "OPEN FOR NEW CLIENT PROJECTS",
  workingHours: "Monday – Friday: 09:30 – 18:30 IST ",
  responseTime: "Within 24 Hours Guaranteed",
  resumePath: "/resume.pdf",
  calendarLink: "https://calendar.google.com"
};

/**
 * WHATSAPP CLICK-TO-CHAT CONFIGURATION
 */
export const WHATSAPP_CONFIG = {
  phoneNumber: "919790318255",
  defaultMessage: "Hi Ascend Tech! I reviewed your portfolio. I'd like to discuss a custom website / digital marketing ad campaign.",
  serviceMessages: {
    frontend: "Hello Ascend Tech! I'm interested in building a full custom website tailored to our client requirements.",
    marketing: "Hi Ascend Tech! I'd like to discuss Meta ads and lead generation to get more customers for our business.",
    b2bAds: "Hi Ascend Tech! I'd like to consult on B2B client acquisition ads and inbound funnels for our software startup.",
    brand: "Hi Ascend Tech! I'd like to discuss product visibility, SEO, and conversion optimization."
  }
};

export const getWhatsAppUrl = (customMessage) => {
  const message = customMessage || WHATSAPP_CONFIG.defaultMessage;
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
};

/**
 * GOOGLE SHEETS WEB APP ENDPOINT
 */
export const GOOGLE_SHEETS_CONFIG = {
  scriptUrl: "https://script.google.com/macros/s/AKfycbxJ6blB22R5Cxmu-aGDOCffiuWb9cu2XU7fhji4MFszN2KR5TJENKceuMDUyocseVI/exec",
  isConfigured: function () {
    return this.scriptUrl && !this.scriptUrl.includes("PLACEHOLDER");
  }
};

/**
 * SOCIAL MEDIA & EXTERNAL PROFILES
 */
export const SOCIAL_LINKS = [
  { name: "GitHub", url: "", handle: "" },
  { name: "LinkedIn", url: "https://linkedin.com", handle: "" },
  { name: "Instagram", url: "https://instagram.com", handle: "" },
  { name: "Email", url: "mailto:ascendtech0413@gmail.com", handle: "ascendtech0413@gmail.com" }
];

/**
 * NAVIGATION LINKS (Exact Top-To-Bottom DOM Sequence, Showcase removed)
 */
export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" }
];
