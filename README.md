# ASCEND-TECH

> A production-grade, editorial portfolio crafted for a **Full-Stack Custom Web Developer** & **Digital Marketing / Lead Generation Specialist**. Built with React 18, Vite, modern CSS3, Lucide React, and direct lead generation integrations (WhatsApp Click-to-Chat & Google Sheets).

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to: **`http://localhost:3000/`**

### 3. Build for Production
```bash
npm run build
```
Generates an optimized, minified production bundle in the `dist/` directory with zero runtime errors.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🗺️ Developer Code Map: Where Data is Stored

All data, configurations, copy, and styling in this codebase are strictly modularized so you can easily locate and update any detail in seconds.

```
portfolio/
├── src/
│   ├── config.js              <-- PERSONAL INFO, WHATSAPP NUMBER, GOOGLE SHEETS URL
│   ├── data/
│   │   └── portfolioData.js   <-- ALL PROJECTS, SERVICES, TIMELINE, FAQ, SKILLS
│   ├── components/            <-- REUSABLE REACT UI SECTIONS
│   │   ├── CustomCursor.jsx   <-- Dual-element smooth magnetic cursor & hover states
│   │   ├── ScrollProgressBar.jsx <-- Top scroll reading progress indicator bar
│   │   ├── Navbar.jsx         <-- Sticky navigation & trending mobile hamburger drawer
│   │   ├── Hero.jsx           <-- Hero headline, availability badge, orbital graphic
│   │   ├── SelectedWork.jsx   <-- Project grid with dynamic category filter pills
│   │   ├── ProjectCard.jsx    <-- Project cover mockups (Meta Ads, B2B Ads, Web Code)
│   │   ├── CaseStudyModal.jsx <-- In-depth case study modal with deliverables & metrics
│   │   ├── About.jsx          <-- Story, career timeline & credentials tabs
│   │   ├── Skills.jsx         <-- Typographic skills matrix (Web dev, Ads, Tools)
│   │   ├── Services.jsx       <-- 4 Core service scopes + 3 engagement packages
│   │   ├── Process.jsx        <-- 4-Step methodology (Discover, Strategize, Build, Deliver)
│   │   ├── TrustSection.jsx   <-- Collaboration ethos & client trust principles
│   │   ├── ContactForm.jsx    <-- Inquiry form, quick presets, IST live clock, FAQs
│   │   ├── WhatsAppButton.jsx <-- Persistent floating WhatsApp chat trigger
│   │   └── Footer.jsx         <-- Typographic footer & copyright notes
│   ├── styles/
│   │   ├── variables.css      <-- Color tokens, clamp typography, spacing & radii
│   │   ├── global.css         <-- Global resets, utility classes, scroll padding
│   │   └── animations.css     <-- Scroll reveals, orbit animations, hover effects
│   └── App.jsx                <-- Main layout & section orchestration
```

---

### Detailed File Guide

| Section / Content | File Location | Key Export / Variable | Description |
| :--- | :--- | :--- | :--- |
| **Personal Information** | [`src/config.js`](./src/config.js) | `PERSONAL_INFO` | Name, professional title, location, studio address, email, availability badge, and resume link. |
| **WhatsApp Chat & Phone** | [`src/config.js`](./src/config.js) | `WHATSAPP_CONFIG` | WhatsApp phone number (with country code) and pre-filled inquiry message templates. |
| **Google Sheets Form URL** | [`src/config.js`](./src/config.js) | `GOOGLE_SHEETS_CONFIG` | Google Apps Script Web App endpoint URL for receiving contact form submissions. |
| **Featured Projects** | [`src/data/portfolioData.js`](./src/data/portfolioData.js) | `PROJECTS_DATA` | Real featured projects: Dress Shop Meta Ads, Software Startup Inbound Ads, Bespoke Web Builds. |
| **Services & Scopes** | [`src/data/portfolioData.js`](./src/data/portfolioData.js) | `SERVICES_DATA` | 4 primary service scopes with timelines, deliverables, and icons. |
| **Engagement Packages** | [`src/data/portfolioData.js`](./src/data/portfolioData.js) | `ENGAGEMENT_MODELS` | Sprint Intensive, Full Project Build, and Monthly Retainer tiers. |
| **Career Timeline** | [`src/data/portfolioData.js`](./src/data/portfolioData.js) | `CAREER_TIMELINE` | Historical roles, companies, descriptions, and achievements. |
| **Superpowers & Value** | [`src/data/portfolioData.js`](./src/data/portfolioData.js) | `CORE_SUPERPOWERS` | 4 pillars of the dual developer + marketing advantage. |
| **Education & Certs** | [`src/data/portfolioData.js`](./src/data/portfolioData.js) | `EDUCATION_CREDENTIALS`| Engineering degrees, Meta Blueprint & Google certifications. |
| **Skills & Tools** | [`src/data/portfolioData.js`](./src/data/portfolioData.js) | `SKILLS_DATA` | Full-stack web technologies, performance marketing platforms, and tools. |
| **Methodology & Process** | [`src/data/portfolioData.js`](./src/data/portfolioData.js) | `PROCESS_DATA` | 4-step client collaboration workflow and checklists. |
| **Client FAQs** | [`src/data/portfolioData.js`](./src/data/portfolioData.js) | `FAQ_DATA` | Collapsible questions & answers displayed in the contact section. |
| **Inquiry Presets** | [`src/data/portfolioData.js`](./src/data/portfolioData.js) | `CONTACT_PRESETS` | 1-click preset pills that auto-populate the inquiry form. |
| **Color Palette & Fonts** | [`src/styles/variables.css`](./src/styles/variables.css)| CSS Custom Properties | `--bg-primary`, `--accent-lime`, `--font-heading`, fluid clamp scales. |

---

## 🛠️ How to Customize Common Elements

### 1. Changing Your Contact & WhatsApp Information
Open [`src/config.js`](./src/config.js) and update the values:
```javascript
export const PERSONAL_INFO = {
  name: "YOUR NAME",
  role: "Full-Stack Web Developer & Digital Marketing Strategist",
  location: "Your City, Country",
  email: "your.email@domain.com",
  phoneFormatted: "+1 (555) 000-0000",
  // ...
};

export const WHATSAPP_CONFIG = {
  phoneNumber: "15550000000", // International format, no '+' or special characters
  defaultMessage: "Hi! I'd like to discuss a project.",
  // ...
};
```

---

### 2. Adding or Editing a Project
Open [`src/data/portfolioData.js`](./src/data/portfolioData.js) and locate `PROJECTS_DATA`. Each project follows this schema:

```javascript
{
  id: "unique-project-slug",
  title: "PROJECT TITLE",
  category: "Digital Marketing & Meta Ads", // Automatically creates category filter pills
  typeLabel: "Client Project",
  year: "2025/26",
  shortDescription: "One sentence summary of the project and client outcome.",
  accentColor: "#D7FF64",
  secondaryColor: "#171813",
  tags: ["Meta Ads", "Lead Generation", "React.js"],
  visualType: "dress-meta-ads", // 'dress-meta-ads' | 'software-startup-ads' | 'custom-web-platform'
  metrics: [
    { label: "ROAS", value: "4.8x" },
    { label: "Qualified Leads", value: "340+ Leads" }
  ],
  caseStudy: {
    tagline: "High-impact tagline for the case study modal.",
    overview: "Background context on the client and target audience.",
    challenge: "The primary friction or business bottleneck solved.",
    solution: "The exact technical and advertising strategy implemented.",
    deliverables: [
      "Item 1",
      "Item 2"
    ],
    technologies: ["React 18", "Meta Ads Manager", "WhatsApp API"]
  }
}
```

---

### 3. Connecting Google Sheets for the Contact Form
1. Create a Google Sheet to store inquiries.
2. In the Google Sheet, go to **Extensions > Apps Script**.
3. Paste the following script:
```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.inquiryType,
      data.budget,
      data.details
    ]);
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```
4. Click **Deploy > New deployment**, select type **Web app**:
   - **Execute as**: *Me*
   - **Who has access**: *Anyone*
5. Copy the deployed Web App URL and paste it into [`src/config.js`](./src/config.js):
```javascript
export const GOOGLE_SHEETS_CONFIG = {
  scriptUrl: "https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec"
};
```

---

## 🚀 Deployment

### Option A: Vercel (Recommended)
1. Push your code to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**.

### Option B: Netlify
1. Drag and drop the `dist/` folder into Netlify, or connect your GitHub repository.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

---

## 🎨 Design System & Palette

- **Primary Background**: `#10110F` (Deep editorial dark)
- **Secondary Surface**: `#191A17` (Subtle elevation)
- **Signature Accent**: `#D7FF64` (Vibrant craft lime)
- **Main Typography**: Space Grotesk (Headlines) & Inter (Body & UI)
