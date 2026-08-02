import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X, Truck, RotateCcw, PackageCheck, Shield, PlusCircle, Heart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  favoritesCount: number;
  isLoggedIn: boolean;
  announcementText?: string;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenUser: () => void;
  onOpenAdmin: () => void;
  onGoToStore: () => void;
  onOpenFavorites: () => void;
  onOpenPublish?: () => void;
  userAvatar?: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  favoritesCount,
  isLoggedIn,
  announcementText,
  onOpenCart,
  onOpenSearch,
  onOpenUser,
  onOpenAdmin,
  onGoToStore,
  onOpenFavorites,
  onOpenPublish,
  userAvatar = 'initials',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="announcement-item">
          <PackageCheck size={16} />
          <span>{announcementText || 'Livrare la Easybox'}</span>
        </div>
        <div className="announcement-item">
          <Truck size={16} />
          <span>Livrare gratuită de la 99 €</span>
        </div>
        <div className="announcement-item">
          <RotateCcw size={16} />
          <span>Retur gratuit</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="header-container">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); onGoToStore(); }} className="logo-container">
            <div className="logo-badge">
              <span className="logo-text-top">Pin</span>
              <span className="logo-text-bottom">Pin</span>
            </div>
          </a>

          {/* Nav Menu */}
          <nav>
            <ul className="nav-menu">
              <li>
                <a href="#" className="nav-link">PERSONALIZATE</a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onGoToStore(); }} className="nav-link active">PINURI</a>
              </li>
              <li>
                <a href="#" className="nav-link">NOUTĂȚI</a>
              </li>
              <li>
                <a href="#" className="nav-link">ÎMPACHETARE</a>
              </li>
              <li>
                <a href="#" className="nav-link">RECENZII</a>
              </li>
              <li>
                <a href="#" className="nav-link">CONTACT</a>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  style={{
                    backgroundColor: '#222',
                    color: 'var(--primary-yellow)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    letterSpacing: '1px'
                  }}
                >
                  <Shield size={14} /> ADMIN
                </button>
              </li>
            </ul>
          </nav>

          {/* Action Icons */}
          <div className="header-actions">
            {onOpenPublish && (
              <button
                onClick={onOpenPublish}
                style={{
                  backgroundColor: 'var(--primary-yellow)',
                  color: '#0F172A',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(248, 210, 71, 0.4)',
                  transition: 'transform 0.2s ease'
                }}
                title="Publică un anunț nou"
              >
                <PlusCircle size={16} color="#0F172A" />
                <span>+ ADAUGĂ ANUNȚ</span>
              </button>
            )}

            <button className="icon-btn" onClick={onOpenSearch} title="Căutare">
              <Search size={22} />
            </button>
            
            <button
              className="icon-btn"
              onClick={onOpenUser}
              title={isLoggedIn ? 'Panou Cont Utilizator' : 'Autentificare'}
              style={{
                backgroundColor: isLoggedIn ? '#FFFDF0' : 'transparent',
                border: isLoggedIn ? '1px solid var(--primary-yellow)' : 'none',
                overflow: 'hidden',
                padding: userAvatar !== 'initials' && isLoggedIn ? '4px' : '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isLoggedIn ? (
                userAvatar === 'initials' ? (
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#222' }}>AB</span>
                ) : (
                  <img src={userAvatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                )
              ) : (
                <User size={22} />
              )}
            </button>

            <button className="icon-btn" onClick={onOpenFavorites} title="Anunțuri salvate" style={{ position: 'relative' }}>
              <Heart size={22} />
              {favoritesCount > 0 && <span className="cart-count-badge" style={{ backgroundColor: '#E55B86' }}>{favoritesCount}</span>}
            </button>

            <button className="icon-btn" onClick={onOpenCart} title="Coșul de cumpărături">
              <ShoppingBag size={22} />
              {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
            </button>

            <button
              className="icon-btn md:hidden"
              style={{ display: 'none' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
