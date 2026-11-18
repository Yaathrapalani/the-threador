import { useState, useEffect } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Lock
} from 'lucide-react';
import { cartService } from '../services/cartService';
import type { CartItem, PageId } from '../types';

interface ShoppingBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePage: (page: PageId) => void;
  onOpenProductDetail: (productId: string) => void;
}

export function ShoppingBagDrawer({
  isOpen,
  onClose,
  onNavigatePage,
  onOpenProductDetail
}: ShoppingBagDrawerProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);

  // Checkout form state
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [orderType, setOrderType] = useState<'individual' | 'institutional'>('individual');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedOrderRef, setSubmittedOrderRef] = useState<string | null>(null);

  // Sync cart items on mount & listen to cart update events
  useEffect(() => {
    setItems(cartService.getItems());

    const handleCartUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<CartItem[]>;
      setItems(customEvent.detail || cartService.getItems());
    };

    window.addEventListener('the-threador-cart-update', handleCartUpdate);
    return () => window.removeEventListener('the-threador-cart-update', handleCartUpdate);
  }, []);

  const handleUpdateQty = (itemId: string, newQty: number) => {
    const updated = cartService.updateQuantity(itemId, newQty);
    setItems(updated);
  };

  const handleRemoveItem = (itemId: string) => {
    const updated = cartService.removeItem(itemId);
    setItems(updated);
  };

  const subtotal = cartService.getSubtotal(items);
  const totalCount = cartService.getCount(items);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      alert('Please fill in your name, email, and phone number for atelier dispatch.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const orderRef = `THREADOR-${Date.now().toString().slice(-6)}`;
      setSubmittedOrderRef(orderRef);
      setIsSubmitting(false);
      cartService.clearCart();
      setItems([]);
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 1. BACKDROP OVERLAY */}
      <div className="bag-drawer-backdrop" onClick={onClose} aria-hidden="true" />

      {/* 2. SLIDING LUXURY ATELIER BAG DRAWER */}
      <aside className="bag-drawer-container" aria-label="Shopping Bag Drawer">
        {/* Header */}
        <div className="bag-drawer-header">
          <div className="bag-header-title">
            <ShoppingBag size={15} />
            <span>ATELIER SHOPPING BAG ({totalCount})</span>
          </div>
          <button
            type="button"
            className="bag-close-btn"
            onClick={onClose}
            aria-label="Close Shopping Bag"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="bag-empty-state">
            <div className="empty-icon-wrap">
              <ShoppingBag size={32} />
            </div>
            <h3 className="empty-title">Your Atelier Bag is Empty</h3>
            <p className="empty-subtitle">
              Explore our Men’s & Women’s collections or configure a bespoke made-to-measure piece in the 3D Atelier.
            </p>
            <div className="empty-actions">
              <button
                type="button"
                className="empty-nav-btn"
                onClick={() => {
                  onNavigatePage('women');
                  onClose();
                }}
              >
                WOMEN’S HAUTE COUTURE
              </button>
              <button
                type="button"
                className="empty-nav-btn"
                onClick={() => {
                  onNavigatePage('men');
                  onClose();
                }}
              >
                MEN’S TAILORED ARCHITECTURE
              </button>
            </div>
          </div>
        ) : (
          <div className="bag-items-scroll-list">
            {items.map((item) => (
              <div key={item.id} className="bag-item-card">
                <img
                  src={item.product.featuredMedia.thumbnail || item.product.featuredMedia.heroImage}
                  alt={item.product.name}
                  className="bag-item-thumb"
                  onClick={() => {
                    onOpenProductDetail(item.product.id);
                    onClose();
                  }}
                />

                <div className="bag-item-details">
                  <div className="bag-item-top">
                    <span className="bag-item-category">{item.product.category.toUpperCase()}</span>
                    <button
                      type="button"
                      className="bag-item-delete-btn"
                      onClick={() => handleRemoveItem(item.id)}
                      title="Remove item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <h4
                    className="bag-item-name"
                    onClick={() => {
                      onOpenProductDetail(item.product.id);
                      onClose();
                    }}
                  >
                    {item.product.name}
                  </h4>

                  <div className="bag-item-specs">
                    <span>Size: <strong>{item.selectedSize}</strong></span>
                    <span>•</span>
                    <span>Color: <strong>{item.selectedColor}</strong></span>
                  </div>

                  {item.customNotes && (
                    <p className="bag-custom-notes">{item.customNotes}</p>
                  )}

                  <div className="bag-item-footer">
                    <div className="bag-qty-selector">
                      <button
                        type="button"
                        onClick={() => handleUpdateQty(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <span className="bag-item-price">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="bag-drawer-footer">
            <div className="bag-summary-line">
              <span>Subtotal ({totalCount} items):</span>
              <strong className="summary-price">₹{subtotal.toLocaleString('en-IN')}</strong>
            </div>

            <p className="bag-shipping-notice">
              <ShieldCheck size={12} className="inline-icon" />
              Complimentary White-Glove Courier Packaging & Atelier Hanger included.
            </p>

            <button
              type="button"
              className="bag-checkout-button"
              onClick={() => setIsCheckoutModalOpen(true)}
            >
              <span>PROCEED TO ATELIER ORDER / QUOTATION</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </aside>

      {/* 3. CHECKOUT & ATELIER ORDER SUBMISSION MODAL */}
      {isCheckoutModalOpen && (
        <div className="checkout-modal-overlay" onClick={() => setIsCheckoutModalOpen(false)}>
          <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="checkout-modal-header">
              <div className="header-badge">
                <Lock size={13} />
                <span>THE THREADOR ATELIER CHECKOUT & BESPOKE DISPATCH</span>
              </div>
              <button
                type="button"
                className="checkout-close-btn"
                onClick={() => setIsCheckoutModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            {submittedOrderRef ? (
              <div className="order-success-screen">
                <CheckCircle size={48} className="success-icon" />
                <h3 className="success-title">Atelier Order Confirmed</h3>
                <p className="success-order-ref">Order Reference: <strong>{submittedOrderRef}</strong></p>
                <p className="success-desc">
                  Thank you, {clientName}. Your bespoke order has been registered in our Mumbai atelier master ledger.
                  Our senior cutter and client concierge will contact you via WhatsApp and email within 2 business hours.
                </p>
                <button
                  type="button"
                  className="success-close-btn"
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    onClose();
                  }}
                >
                  RETURN TO ATELIER
                </button>
              </div>
            ) : (
              <form className="checkout-form" onSubmit={handleSubmitOrder}>
                <div className="checkout-order-summary-box">
                  <div className="summary-top">
                    <span>Order Total:</span>
                    <strong>₹{subtotal.toLocaleString('en-IN')} INR</strong>
                  </div>
                  <span className="summary-count-note">{totalCount} Bespoke Garments • Made to Order</span>
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label>Full Name / School Authority *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Singhania"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>Contact Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="client@threador-couture.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Shipping / Institutional Delivery Address</label>
                  <textarea
                    rows={2}
                    placeholder="Suite / House Number, Street, City, Postal Code"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Client Type</label>
                  <div className="client-type-radios">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="orderType"
                        value="individual"
                        checked={orderType === 'individual'}
                        onChange={() => setOrderType('individual')}
                      />
                      <span>Private Client (Bespoke / Couture)</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="orderType"
                        value="institutional"
                        checked={orderType === 'institutional'}
                        onChange={() => setOrderType('institutional')}
                      />
                      <span>School / Academy (Annual Day Stage Production)</span>
                    </label>
                  </div>
                </div>

                <div className="payment-gateway-notice">
                  <ShieldCheck size={14} className="notice-icon" />
                  <div>
                    <strong>Production Payment & Invoicing Boundary:</strong>
                    <p>
                      In adherence to luxury bespoke tailoring protocol, invoices are reviewed by our master tailors.
                      Upon confirmation, you will receive an encrypted Razorpay / UPI link and GST invoice.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="checkout-submit-btn"
                >
                  {isSubmitting ? 'TRANSMITTING TO ATELIER...' : 'CONFIRM ATELIER ORDER & DISPATCH'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
