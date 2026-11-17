import { useState } from 'react';
import { Mail, MapPin, MessageSquare, Send, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG, generateWhatsAppLink, saveGeneralInquiry } from '../services/leadService';
import type { PageId } from '../types';

interface ContactSectionProps {
  onNavigatePage: (page: PageId) => void;
}

export function ContactSection({ onNavigatePage }: ContactSectionProps) {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'school' as 'school' | 'parent' | 'general',
    message: ''
  });
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    setErrorMsg('');
    saveGeneralInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      inquiryType: formData.inquiryType,
      message: formData.message
    });
    setFormSubmitted(true);
  };

  return (
    <div className="page-view-wrapper contact-page" id="contact-page">
      {/* 1. Page Header */}
      <div className="page-hero-header">
        <span className="eyebrow">PAGE 06 — CONNECT WITH THE ATELIER</span>
        <h1 className="page-main-title">
          Every conversation<br />
          threads a new <i>story.</i>
        </h1>
        <p className="page-lead-para">
          Whether you represent an institution planning an ambitious Annual Day production, or a parent
          exploring design education for your child, our studio doors are open.
        </p>
      </div>

      {/* 2. Direct Channels Grid */}
      <div className="contact-channels-grid">
        <a
          href={generateWhatsAppLink('general')}
          target="_blank"
          rel="noopener noreferrer"
          className="channel-card whatsapp-channel"
        >
          <div className="channel-icon-wrap">
            <MessageSquare size={20} />
          </div>
          <h4>Direct WhatsApp Desk</h4>
          <p>Instant consultation for schools, coordinators, and parents.</p>
          <span className="channel-action">Start WhatsApp Chat →</span>
        </a>

        <a href={`mailto:${BUSINESS_CONFIG.email}`} className="channel-card email-channel">
          <div className="channel-icon-wrap">
            <Mail size={20} />
          </div>
          <h4>Official Email</h4>
          <p>{BUSINESS_CONFIG.email}</p>
          <span className="channel-action">Send Inquiries & Briefs →</span>
        </a>

        <div className="channel-card location-channel">
          <div className="channel-icon-wrap">
            <MapPin size={20} />
          </div>
          <h4>Studio & Atelier Hubs</h4>
          <p>New Delhi & Mumbai, India</p>
          <span className="channel-note">Onboarding and school visits arranged by appointment</span>
        </div>
      </div>

      {/* 3. Direct Pathways CTAs */}
      <div className="contact-pathways-banner">
        <div className="pathway-split school-side">
          <span className="p-tag">INSTITUTIONAL PATHWAY</span>
          <h3>Looking for School Annual Day Costumes?</h3>
          <p>Request an end-to-end theme consultation, choreography design, and costume sampling.</p>
          <button
            type="button"
            className="pathway-btn"
            onClick={() => onNavigatePage('annual-day')}
          >
            <span>GO TO ANNUAL DAY ATELIER</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="pathway-split parent-side">
          <span className="p-tag">PARENT & STUDENT PATHWAY</span>
          <h3>Looking for Fashion Education Courses?</h3>
          <p>Explore structured grade cohorts (Grades 1–3, 4–6, 7–8) and reserve weekend batch seats.</p>
          <button
            type="button"
            className="pathway-btn"
            onClick={() => onNavigatePage('course')}
          >
            <span>GO TO CERTIFICATION ENROLMENT</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 4. General Contact Form */}
      <div className="general-contact-form-box">
        <div className="form-header-area">
          <span className="form-badge">STUDIO INQUIRY FORM</span>
          <h3>Send a Direct Message to the Studio</h3>
          <p>Fill out the form below and an atelier coordinator will reply within one business day.</p>
        </div>

        {formSubmitted ? (
          <div className="form-success-box" role="status">
            <CheckCircle2 size={36} className="success-icon" />
            <h4>Message Transmitted to Atelier</h4>
            <p>
              Thank you, <strong>{formData.name}</strong>. Your inquiry regarding{' '}
              {formData.inquiryType.toUpperCase()} has been forwarded to our creative director.
            </p>
            <button
              type="button"
              className="reset-form-btn"
              onClick={() => {
                setFormSubmitted(false);
                setFormData({ name: '', email: '', phone: '', inquiryType: 'school', message: '' });
              }}
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="threador-form">
            {errorMsg && <div className="form-error-alert">{errorMsg}</div>}

            <div className="form-row three-cols">
              <div className="form-field">
                <label htmlFor="contactName">Your Name *</label>
                <input
                  type="text"
                  id="contactName"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ananya Mehra"
                />
              </div>

              <div className="form-field">
                <label htmlFor="contactEmail">Your Email *</label>
                <input
                  type="email"
                  id="contactEmail"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ananya@example.com"
                />
              </div>

              <div className="form-field">
                <label htmlFor="contactPhone">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  id="contactPhone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="inquiryType">Primary Inquiry Category</label>
              <select
                id="inquiryType"
                value={formData.inquiryType}
                onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value as any })}
              >
                <option value="school">School Annual Day & Costumes Consultation</option>
                <option value="parent">Fashion Education Course Enrolment</option>
                <option value="general">Artisan Collaboration / Institutional Partnership</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="contactMsg">Message / Specific Requirements *</label>
              <textarea
                id="contactMsg"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your requirements, dates, or questions with us..."
              />
            </div>

            <div className="form-footer-bar">
              <p className="privacy-guarantee-note">
                <ShieldCheck size={13} className="shield-icon" />
                No spam. Strictly respectful, verified atelier communication.
              </p>

              <button type="submit" className="form-submit-btn">
                <span>SEND DIRECT MESSAGE</span>
                <Send size={14} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
