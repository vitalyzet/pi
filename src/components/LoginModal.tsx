import React, { useState } from 'react';
import { X, User, Lock } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Autentificare reușită pentru ${email}!`);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '420px',
          padding: '32px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          position: 'relative'
        }}
      >
        <button
          className="icon-btn"
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px' }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-yellow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto'
            }}
          >
            <User size={28} color="#222" />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Autentificare</h2>
          <p style={{ fontSize: '13px', color: '#777', marginTop: '4px' }}>
            Intră în contul tău PinPin
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#444' }}>Email</label>
            <div className="newsletter-input-wrapper" style={{ marginTop: '6px', background: '#F8F8F8' }}>
              <input
                type="email"
                required
                placeholder="adresa@email.ro"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#444' }}>Parolă</label>
            <div className="newsletter-input-wrapper" style={{ marginTop: '6px', background: '#F8F8F8' }}>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="newsletter-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="checkout-btn" type="submit" style={{ marginTop: '12px' }}>
            INTRĂ ÎN CONT
          </button>
        </form>
      </div>
    </div>
  );
};
