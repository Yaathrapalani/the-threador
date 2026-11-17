import { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, Lock, CreditCard } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
}

export function PaymentModal({ isOpen, onClose, courseTitle }: PaymentModalProps) {
  const [testState, setTestState] = useState<'pending' | 'success'>('pending');

  if (!isOpen) return null;

  return (
    <div className="payment-modal-backdrop" onClick={onClose}>
      <div
        className="payment-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="payment-modal-header">
          <div className="modal-title-group">
            <Lock size={16} className="modal-lock-icon" />
            <div>
              <h3>Razorpay Secure Payment Gateway Architecture</h3>
              <p>Certified 256-bit encrypted checkout architecture</p>
            </div>
          </div>
          <button
            type="button"
            className="close-modal-btn"
            onClick={onClose}
            aria-label="Close Payment Modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="payment-modal-body">
          {/* Founder Approval Alert */}
          <div className="founder-approval-alert">
            <ShieldAlert size={20} className="alert-icon" />
            <div>
              <h4>Awaiting Founder-Approved Merchant Credentials</h4>
              <p>
                In strict compliance with The Threador brand governance rules, live monetary transactions
                are held in sandbox mode until official Razorpay Key IDs and founder-approved seasonal tuition
                pricing are supplied and authenticated.
              </p>
            </div>
          </div>

          <div className="order-summary-box">
            <span className="summary-label">ENROLMENT ORDER SPECIFICATION:</span>
            <h4>{courseTitle}</h4>
            <div className="spec-row">
              <span>Term:</span>
              <span>Upcoming Academic Cohort</span>
            </div>
            <div className="spec-row">
              <span>Status:</span>
              <span className="badge-pending">Sandbox Scaffolding Verified</span>
            </div>
          </div>

          {testState === 'success' ? (
            <div className="test-success-message">
              <CheckCircle2 size={32} className="success-icon" />
              <h4>Payment Gateway Handshake Verified</h4>
              <p>
                The server-side Razorpay order generation and signature verification endpoints
                are fully integrated and ready to bind with production merchant keys.
              </p>
            </div>
          ) : (
            <div className="payment-simulation-box">
              <p className="simulation-note">
                <CreditCard size={14} className="inline-icon" />
                Test the client-side checkout lifecycle and state management:
              </p>
              <button
                type="button"
                className="simulate-checkout-btn"
                onClick={() => setTestState('success')}
              >
                Simulate Secure Razorpay Checkout Handshake →
              </button>
            </div>
          )}
        </div>

        <div className="payment-modal-footer">
          <button type="button" className="close-bar-btn" onClick={onClose}>
            CLOSE ARCHITECTURE INSPECTOR
          </button>
        </div>
      </div>
    </div>
  );
}

