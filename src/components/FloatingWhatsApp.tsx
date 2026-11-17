import { useState } from 'react';
import { MessageSquare, X, School, GraduationCap, Sparkles } from 'lucide-react';
import { generateWhatsAppLink, BUSINESS_CONFIG } from '../services/leadService';

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="floating-whatsapp-container">
      {isOpen && (
        <div className="whatsapp-quick-card">
          <div className="quick-card-header">
            <div className="header-info">
              <span className="online-indicator" />
              <div>
                <h4>The Threador Concierge</h4>
                <p>Direct WhatsApp Atelier Desk</p>
              </div>
            </div>
            <button
              type="button"
              className="close-quick-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp card"
            >
              <X size={16} />
            </button>
          </div>

          <div className="quick-card-body">
            <p className="quick-intro">How may our studio team assist you today?</p>

            <a
              href={generateWhatsAppLink('school')}
              target="_blank"
              rel="noopener noreferrer"
              className="quick-action-link"
              onClick={() => setIsOpen(false)}
            >
              <School size={15} className="link-icon" />
              <div>
                <strong>School Annual Day Costumes</strong>
                <span>Theme consultation & stage production</span>
              </div>
            </a>

            <a
              href={generateWhatsAppLink('course')}
              target="_blank"
              rel="noopener noreferrer"
              className="quick-action-link"
              onClick={() => setIsOpen(false)}
            >
              <GraduationCap size={15} className="link-icon" />
              <div>
                <strong>Fashion Education Course</strong>
                <span>Enrolment & weekend batches for kids</span>
              </div>
            </a>

            <a
              href={generateWhatsAppLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="quick-action-link"
              onClick={() => setIsOpen(false)}
            >
              <Sparkles size={15} className="link-icon" />
              <div>
                <strong>General Atelier Inquiry</strong>
                <span>Collaborations & textile partnerships</span>
              </div>
            </a>
          </div>

          <div className="quick-card-footer">
            <span>Verified Business: {BUSINESS_CONFIG.displayPhone}</span>
          </div>
        </div>
      )}

      <button
        type="button"
        className="floating-whatsapp-trigger"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with The Threador on WhatsApp"
        aria-label="Open WhatsApp Concierge"
      >
        <MessageSquare size={22} />
        <span className="tooltip-badge">CHAT WITH US</span>
      </button>
    </div>
  );
}

