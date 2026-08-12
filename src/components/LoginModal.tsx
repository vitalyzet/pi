import React, { useState } from 'react';
import { X, User, Lock, Mail, UserPlus } from 'lucide-react';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: any) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('Persoană Fizică');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      if (mode === 'register') {
        if (password.length < 6) {
          throw new Error('Parola trebuie să aibă minim 6 caractere!');
        }
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const fbUser = userCredential.user;
        
        onLoginSuccess({ id: fbUser.uid, name, email, type: accountType });
      } else {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const fbUser = userCredential.user;
          
          const savedUsers = localStorage.getItem('pinpin_registered_users');
          const parsedUsers = savedUsers ? JSON.parse(savedUsers) : [];
          const existingUser = parsedUsers.find((u: any) => u.email === email);
          
          onLoginSuccess({ 
            id: fbUser.uid, 
            name: existingUser ? existingUser.name : email.split('@')[0], 
            email, 
            type: existingUser ? (existingUser.type || 'Persoană Fizică') : 'Persoană Fizică' 
          });
        } catch (err: any) {
          console.warn('Firebase login failed, attempting local fallback', err);
          const savedUsers = localStorage.getItem('pinpin_registered_users');
          const parsedUsers = savedUsers ? JSON.parse(savedUsers) : [];
          const existingUser = parsedUsers.find((u: any) => u.email === email);
          
          if (existingUser) {
            onLoginSuccess({ id: existingUser.id, name: existingUser.name, email: existingUser.email, type: existingUser.type || 'Persoană Fizică' });
          } else {
            throw err;
          }
        }
      }
      onClose();
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'A apărut o eroare la conectare.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetAndClose = () => {
    setMode('login');
    setName('');
    setEmail('');
    setPassword('');
    setErrorMsg('');
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

        {errorMsg && (
          <div style={{ background: '#FEE2E2', color: '#EF4444', padding: '12px', borderRadius: '12px', fontSize: '13px', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mode === 'register' && (
            <>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 800, color: '#475569', marginBottom: '8px', display: 'block' }}>TIP CONT</label>
                <div style={{ position: 'relative' }}>
                  <UserPlus size={18} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', border: '2px solid #F1F5F9', backgroundColor: '#F8FAFC', fontSize: '15px', fontWeight: 600, color: '#0F172A', outline: 'none', transition: 'border-color 0.2s', appearance: 'none' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-yellow)'}
                    onBlur={(e) => e.target.style.borderColor = '#F1F5F9'}
                  >
                    <option value="Persoană Fizică">Persoană Fizică</option>
                    <option value="Firmă">Firmă</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 800, color: '#475569', marginBottom: '8px', display: 'block' }}>NUME COMPLET / COMPANIE</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    placeholder={accountType === 'Firmă' ? 'Numele firmei' : 'Ion Popescu'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', border: '2px solid #F1F5F9', backgroundColor: '#F8FAFC', fontSize: '15px', fontWeight: 600, color: '#0F172A', outline: 'none', transition: 'border-color 0.2s' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-yellow)'}
                    onBlur={(e) => e.target.style.borderColor = '#F1F5F9'}
                  />
                </div>
              </div>
            </>
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
