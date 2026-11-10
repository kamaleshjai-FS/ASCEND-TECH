import React, { useState, useEffect } from 'react';
import { GOOGLE_SHEETS_CONFIG, PERSONAL_INFO, getWhatsAppUrl } from '../config';
import { FAQ_DATA, CONTACT_PRESETS } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { 
  Send, CheckCircle2, AlertCircle, Loader2, ArrowUpRight, MessageSquare, 
  MapPin, Mail, Phone, Clock, Calendar, HelpCircle, ChevronDown, ChevronUp, Sparkles 
} from 'lucide-react';

export const ContactForm = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    details: '',
    privacy: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(0); // Accordion state
  const [currentTimeIST, setCurrentTimeIST] = useState('');
  const [isStudioOpen, setIsStudioOpen] = useState(true);

  // Compute live IST time for studio availability badge
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const istString = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        setCurrentTimeIST(istString);

        // Check if IST hours are between 9:30 AM and 6:30 PM (Mon-Fri)
        const istHours = parseInt(
          now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', hour12: false })
        );
        const istDay = now.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', weekday: 'short' });
        const isWeekday = !['Sat', 'Sun'].includes(istDay);
        setIsStudioOpen(isWeekday && istHours >= 9 && istHours < 19);
      } catch (e) {
        setCurrentTimeIST('10:00 AM IST');
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  // Quick Preset Click
  const handleApplyPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      projectType: preset.type,
      budget: preset.budget,
      details: preset.details
    }));
    // Clear relevant errors
    setErrors((prev) => ({
      ...prev,
      projectType: null,
      details: null
    }));
  };

  // Validate fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type.';
    }

    if (!formData.details.trim()) {
      newErrors.details = 'Project details are required.';
    } else if (formData.details.trim().length < 15) {
      newErrors.details = 'Please provide a bit more detail (minimum 15 characters).';
    }

    if (!formData.privacy) {
      newErrors.privacy = 'You must acknowledge the privacy agreement.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    const submissionPayload = {
      timestamp: new Date().toISOString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      projectType: formData.projectType,
      budget: formData.budget || 'Not specified',
      details: formData.details.trim()
    };

    if (!GOOGLE_SHEETS_CONFIG.isConfigured()) {
      // Demo Mode simulation
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          projectType: '',
          budget: '',
          details: '',
          privacy: false
        });
      }, 1200);
      return;
    }

    try {
      const postData = new URLSearchParams();
      postData.append('timestamp', submissionPayload.timestamp);
      postData.append('name', submissionPayload.name);
      postData.append('email', submissionPayload.email);
      postData.append('projectType', submissionPayload.projectType);
      postData.append('budget', submissionPayload.budget);
      postData.append('details', submissionPayload.details);

      const response = await fetch(GOOGLE_SHEETS_CONFIG.scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: postData.toString(),
      });

      if (response.ok) {
        const result = await response.json().catch(() => ({ status: 'success' }));
        if (result.status === 'success' || result.result === 'success') {
          setSubmitStatus('success');
          setFormData({
            name: '',
            email: '',
            projectType: '',
            budget: '',
            details: '',
            privacy: false
          });
        } else {
          throw new Error(result.message || 'Script returned an unsuccessful response.');
        }
      } else {
        throw new Error(`Server returned HTTP ${response.status}`);
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      try {
        const fallbackData = new FormData();
        fallbackData.append('timestamp', submissionPayload.timestamp);
        fallbackData.append('name', submissionPayload.name);
        fallbackData.append('email', submissionPayload.email);
        fallbackData.append('projectType', submissionPayload.projectType);
        fallbackData.append('budget', submissionPayload.budget);
        fallbackData.append('details', submissionPayload.details);

        await fetch(GOOGLE_SHEETS_CONFIG.scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: fallbackData
        });

        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          projectType: '',
          budget: '',
          details: '',
          privacy: false
        });
      } catch (fallbackErr) {
        setSubmitStatus('error');
        setErrorMessage(
          'Failed to send message. Please verify your connection or reach out directly on WhatsApp or Email.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDemo = !GOOGLE_SHEETS_CONFIG.isConfigured();

  return (
    <section id="contact" className="section-wrapper contact-section" aria-label="Contact and Inquiry">
      <div className="container" ref={sectionRef}>
        {/* Section Header */}
        <div className="section-meta reveal-init delay-50">
          <span className="section-meta-num">08</span>
          <span className="section-meta-line" aria-hidden="true"></span>
          <span>GET IN TOUCH</span>
        </div>

        <div className="contact-header-row reveal-init delay-100">
          <h2 className="section-title">
            HAVE A PROJECT <span className="highlight-lime">IN MIND?</span>
          </h2>
          <p className="section-subtitle">
            Tell me what you're building. Let's turn your idea into an engaging, high-performing reality.
          </p>
        </div>

        {/* Contact Layout: Form + Direct Studio Channels */}
        <div className="contact-main-grid reveal-init delay-200">
          {/* Left Column: Inquiry Form & Presets */}
          <div className="contact-form-wrapper">
            {/* Quick Fill Preset Buttons */}
            <div className="presets-container">
              <span className="presets-label">
                <Sparkles size={13} className="text-lime" />
                <span>Quick-Select Inquiry Scopes:</span>
              </span>
              <div className="presets-pills-row">
                {CONTACT_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="preset-btn"
                    onClick={() => handleApplyPreset(preset)}
                    title="Click to populate form with this sample scope"
                  >
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {isDemo && (
              <div className="demo-notice-banner">
                <AlertCircle size={15} className="text-lime" />
                <span>
                  <strong>Demo Mode Active:</strong> Form submissions are fully validated. To save submissions
                  into your own Google Sheet, paste your Web App URL in <code>src/config.js</code>.
                </span>
              </div>
            )}

            {submitStatus === 'success' && (
              <div className="status-banner success-banner" role="alert">
                <CheckCircle2 size={20} className="status-icon" />
                <div className="status-text">
                  <h4>Thank you! Your project inquiry has been recorded.</h4>
                  <p>I typically review inquiries within 24 hours. Looking forward to speaking!</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="status-banner error-banner" role="alert">
                <AlertCircle size={20} className="status-icon" />
                <div className="status-text">
                  <h4>Submission failed</h4>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="editorial-form">
              {/* Row 1: Name & Email */}
              <div className="form-row two-col">
                <div className="form-field">
                  <label htmlFor="name" className="field-label">
                    FULL NAME <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Riya J"
                    className={`text-input ${errors.name ? 'input-error' : ''}`}
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <span className="field-error-msg">{errors.name}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="email" className="field-label">
                    EMAIL ADDRESS <span className="required-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="riya@company.com"
                    className={`text-input ${errors.email ? 'input-error' : ''}`}
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <span className="field-error-msg">{errors.email}</span>}
                </div>
              </div>

              {/* Row 2: Project Type & Budget Range */}
              <div className="form-row two-col">
                <div className="form-field">
                  <label htmlFor="projectType" className="field-label">
                    PROJECT SCOPE <span className="required-star">*</span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className={`select-input ${errors.projectType ? 'input-error' : ''}`}
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-invalid={!!errors.projectType}
                  >
                    <option value="">Select project scope...</option>
                    <option value="Digital Marketing Campaign">Digital Marketing & Growth Strategy</option>
                    <option value="Brand & Campaign Creative">Brand Storytelling & Ad Creatives</option>
                    <option value="Fullstack / Web Development">Fullstack / Web Development (Web App / Mobile App)</option>
                    <option value="Website Design & UI">Website Design & UI Architecture</option>
                    <option value="Full-Service Consultation">Full-Service Design + Code Sprint</option>
                    <option value="Others"> Others </option>
                  </select>
                  {errors.projectType && <span className="field-error-msg">{errors.projectType}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="budget" className="field-label">
                    ESTIMATED BUDGET <span className="optional-tag">(OPTIONAL)</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="select-input"
                    disabled={isSubmitting}
                  >
                    <option value="">Select an investment tier...</option>
                    <option value=" 3,000">&lt; 3,000</option>
                    <option value="3,000 - 5,000">3,000 — 5,000</option>
                    <option value="5,000 - 7,000">5,000 — 7,000</option>
                    <option value="7,000+">7,000+</option>
                    <option value="To be determined">To be determined / Flexible</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Project Details */}
              <div className="form-field">
                <label htmlFor="details" className="field-label">
                  PROJECT DETAILS <span className="required-star">*</span>
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={5}
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Share context on your current vision, timeline expectations, or links to references..."
                  className={`textarea-input ${errors.details ? 'input-error' : ''}`}
                  disabled={isSubmitting}
                  aria-required="true"
                  aria-invalid={!!errors.details}
                />
                {errors.details && <span className="field-error-msg">{errors.details}</span>}
              </div>

              {/* Row 4: Privacy Checkbox */}
              <div className="checkbox-field">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleChange}
                    className="styled-checkbox"
                    disabled={isSubmitting}
                    aria-required="true"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">
                    I acknowledge that the submitted information will only be used to respond to this project inquiry.
                  </span>
                </label>
                {errors.privacy && <span className="field-error-msg">{errors.privacy}</span>}
              </div>

              {/* Submit Button */}
              <div className="form-action-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary form-submit-btn"
                  aria-label="Send Project Inquiry"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="anim-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Project Inquiry</span>
                      <ArrowUpRight size={16} strokeWidth={2.4} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Direct Channels & Studio Info */}
          <div className="contact-direct-sidebar">
            {/* WhatsApp Card */}
            <div className="direct-card whatsapp-direct-card">
              <div className="direct-card-header">
                <MessageSquare size={20} className="text-lime" />
                <span className="card-kicker">INSTANT CHAT PROTOCOL</span>
              </div>
              <h3 className="direct-card-title">Prefer WhatsApp?</h3>
              <p className="direct-card-desc">
                For fast discussions, quick questions, or direct voice notes, message me directly via WhatsApp.
              </p>
              <a
                href={getWhatsAppUrl("Hi Ascend Tech! I visited your portfolio and would like to connect about an inquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary direct-wa-btn"
              >
                <span>Direct WhatsApp Chat</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            {/* Studio Information Card */}
            <div className="direct-card info-direct-card">
              <div className="studio-status-row">
                <span className={`pulse-indicator ${isStudioOpen ? '' : 'pulse-dim'}`}></span>
                <span className="status-label">
                  {isStudioOpen ? '🟢 STUDIO OPEN • IST' : '🌙 STUDIO ASYNC MODE'}
                </span>
                <span className="live-clock">{currentTimeIST}</span>
              </div>

              <div className="studio-details-list">
                <div className="studio-item">
                  <MapPin size={16} className="text-lime flex-shrink-0" />
                  <div className="studio-item-text">
                    <span className="item-title">STUDIO LOCATION</span>
                    <p className="item-val">{PERSONAL_INFO.studioAddress}</p>
                  </div>
                </div>

                <div className="studio-item">
                  <Mail size={16} className="text-lime flex-shrink-0" />
                  <div className="studio-item-text">
                    <span className="item-title">PRIMARY INQUIRIES</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="item-link">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="studio-item">
                  <Phone size={16} className="text-lime flex-shrink-0" />
                  <div className="studio-item-text">
                    <span className="item-title">DIRECT PHONE / WHATSAPP</span>
                    <a href={`tel:${PERSONAL_INFO.phoneNumber}`} className="item-link">
                      {PERSONAL_INFO.phoneFormatted}
                    </a>
                  </div>
                </div>

                <div className="studio-item">
                  <Clock size={16} className="text-lime flex-shrink-0" />
                  <div className="studio-item-text">
                    <span className="item-title">OPERATING HOURS</span>
                    <p className="item-val">{PERSONAL_INFO.workingHours}</p>
                    <span className="item-sub">Guaranteed response within 24 hours</span>
                  </div>
                </div>
              </div>

              {/* Discovery Call Booking CTA */}
              <div className="calendar-booking-box">
                <Calendar size={16} className="text-lime" />
                <div className="calendar-text">
                  <strong>Need a face-to-face video sync?</strong>
                  <p>Book a dedicated 20-minute Google Meet or Zoom intro call.</p>
                </div>
                <a
                  href={getWhatsAppUrl("Hi Ascend Tech! I'd like to schedule a 20-minute discovery call.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link"
                >
                  Schedule Call ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Client FAQ Section */}
        <div className="contact-faq-section reveal-init delay-300">
          <div className="faq-header">
            <HelpCircle size={18} className="text-lime" />
            <h3 className="faq-title">FREQUENTLY ASKED COLLABORATION QUESTIONS</h3>
          </div>

          <div className="faq-accordion">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">{faq.question}</span>
                    {isOpen ? <ChevronUp size={18} className="text-lime" /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <div className="faq-answer-pane">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background-color: var(--bg-primary);
          position: relative;
        }

        .contact-header-row {
          margin-bottom: 2.5rem;
        }

        /* Preset Pills */
        .presets-container {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 2rem;
          padding: 1.25rem;
          background: rgba(245, 243, 235, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
        }

        .presets-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .presets-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        @media (max-width: 640px) {
          .presets-pills-row {
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 0.35rem;
          }
          .presets-pills-row::-webkit-scrollbar {
            display: none;
          }
          .preset-btn {
            flex-shrink: 0;
            white-space: nowrap;
          }
        }

        .preset-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .preset-btn:hover {
          background: var(--accent-lime-dim);
          border-color: var(--accent-lime);
          color: var(--accent-lime);
          transform: translateY(-1px);
        }

        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-bottom: 3.5rem;
          align-items: flex-start;
          width: 100%;
        }

        @media (min-width: 992px) {
          .contact-main-grid {
            grid-template-columns: 1.22fr 0.78fr;
            gap: 3.25rem;
            align-items: flex-start;
          }

          .contact-direct-sidebar {
            position: sticky;
            top: 88px;
          }
        }

        @media (min-width: 640px) and (max-width: 991px) {
          .contact-direct-sidebar {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }
        }

        .contact-form-wrapper {
          width: 100%;
          min-width: 0;
        }

        .demo-notice-banner {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 0.85rem 1.15rem;
          background: rgba(215, 255, 100, 0.05);
          border: 1px solid var(--accent-lime-border);
          border-radius: var(--radius-xs);
          font-size: 0.8rem;
          color: var(--accent-lime);
          margin-bottom: 1.75rem;
          line-height: 1.5;
          word-break: break-word;
        }

        .demo-notice-banner code {
          background: rgba(0, 0, 0, 0.4);
          padding: 0.1rem 0.35rem;
          border-radius: 3px;
          color: var(--text-primary);
        }

        .status-banner {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.15rem 1.35rem;
          border-radius: var(--radius-xs);
          margin-bottom: 1.75rem;
          word-break: break-word;
        }

        .status-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .success-banner {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10B981;
        }

        .success-banner h4 {
          color: #10B981;
          font-size: 0.95rem;
          margin-bottom: 0.25rem;
        }

        .success-banner p {
          color: #A7F3D0;
          font-size: 0.84rem;
        }

        .error-banner {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #EF4444;
        }

        .error-banner h4 {
          color: #EF4444;
          font-size: 0.95rem;
          margin-bottom: 0.25rem;
        }

        .error-banner p {
          color: #FCA5A5;
          font-size: 0.84rem;
        }

        .editorial-form {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
          width: 100%;
        }

        .form-row.two-col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          width: 100%;
        }

        @media (min-width: 640px) {
          .form-row.two-col {
            grid-template-columns: 1fr 1fr;
            gap: 1.25rem;
          }
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          width: 100%;
          min-width: 0;
        }

        .field-label {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--text-primary);
        }

        .required-star {
          color: var(--accent-lime);
        }

        .optional-tag {
          font-size: 0.65rem;
          color: var(--text-dim);
          font-weight: 400;
        }

        .text-input,
        .select-input,
        .textarea-input {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
          padding: 0.85rem 1rem;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.9rem;
          transition: border-color var(--transition-fast), background var(--transition-fast);
        }

        .text-input:focus,
        .select-input:focus,
        .textarea-input:focus {
          border-color: var(--accent-lime);
          background: var(--bg-surface-elevated);
          outline: none;
        }

        .input-error {
          border-color: #EF4444 !important;
        }

        .field-error-msg {
          font-size: 0.75rem;
          color: #F87171;
          margin-top: 0.2rem;
        }

        .select-input {
          cursor: pointer;
          text-overflow: ellipsis;
        }

        .select-input option {
          background-color: var(--bg-surface-elevated);
          color: var(--text-primary);
        }

        .textarea-input {
          resize: vertical;
          min-height: 120px;
        }

        /* Checkbox */
        .checkbox-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          width: 100%;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          cursor: pointer;
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .checkbox-text {
          flex: 1;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .styled-checkbox {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .checkbox-custom {
          width: 18px;
          height: 18px;
          border: 1px solid var(--border-medium);
          border-radius: 3px;
          background: var(--bg-surface);
          flex-shrink: 0;
          margin-top: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .styled-checkbox:checked + .checkbox-custom {
          background: var(--accent-lime);
          border-color: var(--accent-lime);
        }

        .styled-checkbox:checked + .checkbox-custom::after {
          content: '✓';
          color: var(--bg-primary);
          font-weight: 700;
          font-size: 11px;
        }

        .form-action-row {
          margin-top: 0.35rem;
        }

        .form-submit-btn {
          width: 100%;
          padding: 0.95rem 1.6rem;
          font-size: 0.92rem;
        }

        @media (min-width: 640px) {
          .form-submit-btn {
            width: auto;
            min-width: 240px;
          }
        }

        .anim-spin {
          animation: slowOrbit 1s linear infinite;
        }

        /* Direct Sidebar */
        .contact-direct-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          min-width: 0;
        }

        .direct-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
        }

        .whatsapp-direct-card {
          border-color: var(--accent-lime-border);
          background: radial-gradient(circle at top right, rgba(215, 255, 100, 0.08) 0%, var(--bg-surface) 70%);
        }

        .direct-card-header {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .card-kicker {
          font-family: var(--font-heading);
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          color: var(--accent-lime);
          text-transform: uppercase;
        }

        .direct-card-title {
          font-size: 1.25rem;
          letter-spacing: -0.02em;
        }

        .direct-card-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .direct-wa-btn {
          align-self: flex-start;
          width: 100%;
          justify-content: center;
        }

        /* Studio Information Card */
        .studio-status-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.45rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--border-subtle);
          font-family: var(--font-heading);
          font-size: 0.74rem;
        }

        .status-label {
          color: var(--text-primary);
          font-weight: 600;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .live-clock {
          color: var(--accent-lime);
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }

        .pulse-dim {
          background-color: #A5A69C !important;
          animation: none !important;
        }

        .studio-details-list {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .studio-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .studio-item-text {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          min-width: 0;
          flex: 1;
        }

        .item-title {
          font-family: var(--font-heading);
          font-size: 0.64rem;
          letter-spacing: 0.12em;
          color: var(--text-dim);
          text-transform: uppercase;
        }

        .item-val {
          font-size: 0.84rem;
          color: var(--text-primary);
          line-height: 1.45;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .item-link {
          font-family: var(--font-heading);
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--accent-lime);
          word-break: break-all;
          overflow-wrap: break-word;
        }

        .item-sub {
          font-size: 0.72rem;
          color: var(--text-dim);
        }

        .calendar-booking-box {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          padding: 1rem;
          background: rgba(215, 255, 100, 0.04);
          border: 1px solid var(--accent-lime-border);
          border-radius: var(--radius-xs);
          margin-top: 0.35rem;
        }

        .calendar-text strong {
          font-size: 0.82rem;
          color: var(--text-primary);
          display: block;
        }

        .calendar-text p {
          font-size: 0.76rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        /* FAQ Section */
        .contact-faq-section {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 2.25rem 2rem;
          width: 100%;
          box-sizing: border-box;
        }

        .faq-header {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 1.75rem;
        }

        .faq-title {
          font-size: 1.15rem;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .faq-accordion {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          width: 100%;
        }

        .faq-item {
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
          background: var(--bg-secondary);
          overflow: hidden;
          cursor: pointer;
          transition: border-color var(--transition-fast);
          width: 100%;
          box-sizing: border-box;
        }

        .faq-item-open {
          border-color: var(--accent-lime-border);
        }

        .faq-question-btn {
          width: 100%;
          padding: 1.15rem 1.35rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          gap: 0.85rem;
          box-sizing: border-box;
        }

        .faq-q-text {
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-primary);
          flex: 1;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .faq-answer-pane {
          padding: 0 1.35rem 1.15rem 1.35rem;
          font-size: 0.86rem;
          color: var(--text-muted);
          line-height: 1.6;
          border-top: 1px solid var(--border-subtle);
          padding-top: 0.95rem;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        /* Responsive Optimization Across Mobile & Tablet */
        @media (max-width: 680px) {
          .presets-pills-row {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.45rem;
          }
          .preset-btn {
            width: 100%;
            justify-content: flex-start;
            white-space: normal;
            line-height: 1.35;
          }
        }

        @media (max-width: 640px) {
          .contact-header-row {
            margin-bottom: 1.25rem;
          }
          .presets-container {
            padding: 0.75rem;
            gap: 0.45rem;
            margin-bottom: 1.25rem;
          }
          .presets-label {
            font-size: 0.68rem;
          }
          .contact-main-grid {
            gap: 1.5rem;
            margin-bottom: 2rem;
          }
          .demo-notice-banner {
            padding: 0.65rem 0.85rem;
            font-size: 0.74rem;
            line-height: 1.45;
          }
          .direct-card {
            padding: 1.15rem 1rem;
            gap: 0.75rem;
          }
          .direct-card-title {
            font-size: 1.05rem;
          }
          .direct-card-desc {
            font-size: 0.8rem;
            line-height: 1.45;
          }
          .studio-status-row {
            font-size: 0.68rem;
          }
          .studio-details-list {
            gap: 0.75rem;
          }
          .item-val,
          .item-link {
            font-size: 0.78rem;
          }
          .calendar-booking-box {
            padding: 0.75rem;
          }
          .calendar-text strong {
            font-size: 0.78rem;
          }
          .calendar-text p {
            font-size: 0.72rem;
          }
          .contact-faq-section {
            padding: 1.25rem 0.95rem;
            border-radius: var(--radius-sm);
          }
          .faq-header {
            margin-bottom: 1rem;
          }
          .faq-title {
            font-size: 0.95rem;
          }
          .faq-question-btn {
            padding: 0.85rem 0.95rem;
            gap: 0.5rem;
          }
          .faq-q-text {
            font-size: 0.82rem;
          }
          .faq-answer-pane {
            padding: 0.65rem 0.95rem 0.85rem 0.95rem;
            font-size: 0.78rem;
            line-height: 1.5;
          }
          .form-submit-btn {
            padding: 0.75rem 1.25rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 440px) {
          .presets-pills-row {
            grid-template-columns: 1fr;
          }
          .preset-btn {
            font-size: 0.7rem;
            padding: 0.4rem 0.6rem;
          }
        }
      `}</style>
    </section>
  );
};
