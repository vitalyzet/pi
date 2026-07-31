import React, { useState } from 'react';
import { X, User, Lock, Mail, UserPlus } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
    onClose();
  };

  const resetAndClose = () => {
    setMode('login');
    setName('');
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={resetAndClose} style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '24px',
          width: '90%',
          maxWidth: '420px',
          padding: '32px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          position: 'relative',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        <button
          onClick={resetAndClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: '#F8FAFC', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748B' }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-yellow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}
          >
            {mode === 'login' ? <User size={32} color="#0F172A" /> : <UserPlus size={32} color="#0F172A" />}
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: '0 0 8px 0' }}>
            {mode === 'login' ? 'Autentificare' : 'Creează Cont'}
          </h2>
          <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
            {mode === 'login' ? 'Intră în contul tău PinPin' : 'Alătură-te comunității PinPin'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mode === 'register' && (
            <div>
              <label style={{ fontSize: '12px', fontWeight: 800, color: '#475569', marginBottom: '8px', display: 'block' }}>NUME COMPLET</label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  required
                  placeholder="Ion Popescu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', border: '2px solid #F1F5F9', backgroundColor: '#F8FAFC', fontSize: '15px', fontWeight: 600, color: '#0F172A', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary-yellow)'}
                  onBlur={(e) => e.target.style.borderColor = '#F1F5F9'}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '12px', fontWeight: 800, color: '#475569', marginBottom: '8px', display: 'block' }}>EMAIL</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                required
                placeholder="adresa@email.ro"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', border: '2px solid #F1F5F9', backgroundColor: '#F8FAFC', fontSize: '15px', fontWeight: 600, color: '#0F172A', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-yellow)'}
                onBlur={(e) => e.target.style.borderColor = '#F1F5F9'}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 800, color: '#475569', marginBottom: '8px', display: 'block' }}>PAROLĂ</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', border: '2px solid #F1F5F9', backgroundColor: '#F8FAFC', fontSize: '15px', fontWeight: 600, color: '#0F172A', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-yellow)'}
                onBlur={(e) => e.target.style.borderColor = '#F1F5F9'}
              />
            </div>
          </div>

          <button type="submit" style={{ width: '100%', padding: '16px', borderRadius: '14px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '15px', fontWeight: 800, cursor: 'pointer', marginTop: '8px', boxShadow: '0 8px 20px rgba(15, 23, 42, 0.15)' }}>
            {mode === 'login' ? 'INTRĂ ÎN CONT' : 'CREEAZĂ CONTUL'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #F1F5F9' }}>
          <span style={{ fontSize: '14px', color: '#64748B' }}>
            {mode === 'login' ? 'Nu ai un cont încă?' : 'Ai deja un cont?'}
          </span>
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setName('');
              setEmail('');
              setPassword('');
            }}
            style={{ background: 'none', border: 'none', color: '#E55B86', fontSize: '14px', fontWeight: 800, cursor: 'pointer', marginLeft: '6px' }}
          >
            {mode === 'login' ? 'Creează unul acum' : 'Intră în cont'}
          </button>
        </div>
      </div>
    </div>
  );
};
