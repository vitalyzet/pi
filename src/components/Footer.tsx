import React, { useState } from 'react';
import { ArrowRight, Facebook, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Column 1: Contact */}
        <div>
          <h4 className="footer-column-title">CONTACT</h4>
          <ul className="footer-list">
            <li>
              E-mail:<br />
              <a href="mailto:contact@pinpin.ro" className="footer-link underline">
                contact@pinpin.ro
              </a>
            </li>
            <li>
              Instagram:<br />
              <a href="#" className="footer-link underline">
                @pinpin.ro
              </a>
            </li>
            <li>
              Facebook:<br />
              <a href="#" className="footer-link underline">
                @pinpin.ro
              </a>
            </li>
            <li>
              Telefon:<br />
              <a href="tel:+40743565030" className="footer-link underline">
                +40 743 565 030
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2: Ajutor */}
        <div>
          <h4 className="footer-column-title">AJUTOR</h4>
          <ul className="footer-list">
            <li><a href="#" className="footer-link">Politica de confidențialitate</a></li>
            <li><a href="#" className="footer-link">Politica de retur</a></li>
            <li><a href="#" className="footer-link">Termeni și condiții</a></li>
            <li><a href="#" className="footer-link">A.N.P.C.</a></li>
            <li><a href="#" className="footer-link">A.N.P.C. - SAL</a></li>
            <li><a href="#" className="footer-link">A.N.P.C. Reclamații</a></li>
          </ul>
        </div>

        {/* Column 3: Utile */}
        <div>
          <h4 className="footer-column-title">UTILE</h4>
          <ul className="footer-list">
            <li><a href="#" className="footer-link">Contact</a></li>
            <li><a href="#" className="footer-link">Întrebări frecvente</a></li>
            <li><a href="#" className="footer-link">Livrare</a></li>
            <li><a href="#" className="footer-link">Retur</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h4 className="footer-column-title">REDUCERI PERIODICE</h4>
          <form onSubmit={handleSubscribe}>
            <div className="newsletter-input-wrapper">
              <input
                type="email"
                placeholder="Introdu adresa ta de e-mail"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-submit-btn">
                <ArrowRight size={18} />
              </button>
            </div>
          </form>

          {subscribed ? (
            <p style={{ fontSize: '13px', color: '#155724', fontWeight: 600, marginTop: '8px' }}>
              ✓ Te-ai abonat cu succes!
            </p>
          ) : (
            <p style={{ fontSize: '13px', lineHeight: '1.4', opacity: 0.9 }}>
              Abonează-te pentru a beneficia de promoții exclusive și multe altele!
            </p>
          )}

          <h4 className="footer-column-title" style={{ marginTop: '30px', marginBottom: '12px' }}>
            URMĂREȘTE-NE
          </h4>
          <div className="social-icons-wrapper">
            <a href="#" className="social-icon-btn"><Facebook size={20} /></a>
            <a href="#" className="social-icon-btn"><Instagram size={20} /></a>
            <a href="#" className="social-icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom-bar">
        <div>
          © 2026, PinPin. Toate drepturile rezervate.
        </div>
        <div className="payment-badges">
          <span className="payment-badge" style={{ color: '#006FCF' }}>AMEX</span>
          <span className="payment-badge" style={{ color: '#000000' }}>Apple Pay</span>
          <span className="payment-badge" style={{ color: '#E55B86' }}>Discover</span>
          <span className="payment-badge" style={{ color: '#4285F4' }}>G Pay</span>
          <span className="payment-badge" style={{ color: '#EB001B' }}>Mastercard</span>
          <span className="payment-badge" style={{ color: '#1A1F71' }}>VISA</span>
        </div>
      </div>
    </footer>
  );
};
