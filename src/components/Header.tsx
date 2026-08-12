import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X, Truck, RotateCcw, PackageCheck, Shield, PlusCircle, Heart, Globe } from 'lucide-react';
import { RegionLanguageModal, REGIONS } from './RegionLanguageModal';

interface HeaderProps {
  cartCount: number;
  favoritesCount: number;
  isLoggedIn: boolean;
  currentUser?: { name: string, email: string, type: string } | null;
  announcementText?: string;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenUser: () => void;
  onOpenAdmin: () => void;
  onOpenSuperAdmin: () => void;
  onGoToStore: () => void;
  onOpenFavorites: () => void;
  onOpenPublish?: () => void;
  onOpenReviews?: () => void;
  onOpenRegionLanguage?: () => void;
  isRegionLanguageOpen?: boolean;
  selectedRegion?: string;
  onSelectRegion?: (r: string) => void;
  selectedLanguage?: string;
  onSelectLanguage?: (l: string) => void;
  userAvatar?: string;
  showAnnouncementBar?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  favoritesCount,
  isLoggedIn,
  currentUser,
  announcementText,
  onOpenCart,
  onOpenSearch,
  onOpenUser,
  onOpenAdmin,
  onOpenSuperAdmin,
  onGoToStore,
  onOpenFavorites,
  onOpenPublish,
  onOpenReviews,
  onOpenRegionLanguage,
  isRegionLanguageOpen,
  selectedRegion,
  onSelectRegion,
  selectedLanguage,
  onSelectLanguage,
  userAvatar = 'initials',
  showAnnouncementBar = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      {showAnnouncementBar && (
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
      )}

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
                <a href="#" onClick={(e) => { e.preventDefault(); onOpenReviews?.(); }} className="nav-link">RECENZII</a>
              </li>
              {currentUser?.email === 'alexandruzet29@gmail.com' && (
                <li>
                  <button
                    onClick={onOpenSuperAdmin}
                    style={{
                      backgroundColor: '#10B981',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      letterSpacing: '1px',
                      marginLeft: '8px'
                    }}
                  >
                    <Shield size={14} /> ADMIN
                  </button>
                </li>
              )}
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

            {onOpenRegionLanguage && (
              <div style={{ position: 'relative' }}>
                <button 
                  className="icon-btn" 
                  onClick={onOpenRegionLanguage} 
                  title="Limbă și Regiune"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    width: 'auto', 
                    padding: '6px 12px',
                    borderRadius: '20px',
                    backgroundColor: '#F3F4F6',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  {(() => {
                    const currentRegionData = REGIONS.find(r => r.id === selectedRegion) || REGIONS[0];
                    return (
                      <>
                        {currentRegionData.icon ? currentRegionData.icon : <span style={{ fontSize: '16px' }}>{currentRegionData.flag}</span>}
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{currentRegionData.id.toUpperCase()}</span>
                      </>
                    );
                  })()}
                </button>
                {isRegionLanguageOpen && selectedRegion && onSelectRegion && selectedLanguage && onSelectLanguage && (
                  <RegionLanguageModal
                    isOpen={isRegionLanguageOpen}
                    onClose={onOpenRegionLanguage}
                    selectedRegion={selectedRegion}
                    onSelectRegion={onSelectRegion}
                    selectedLanguage={selectedLanguage}
                    onSelectLanguage={onSelectLanguage}
                  />
                )}
              </div>
            )}

            <button className="icon-btn" onClick={onOpenSearch} title="Căutare">
              <Search size={22} />
            </button>
            
            <div 
              onClick={onOpenUser}
              title={isLoggedIn ? 'Contul Meu' : 'Autentificare'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                backgroundColor: isLoggedIn ? '#FFFDF0' : 'transparent',
                border: isLoggedIn ? '1px solid var(--primary-yellow)' : '1px solid #E2E8F0',
                borderRadius: '24px',
                padding: '4px 12px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F5F9' }}>
                {isLoggedIn ? (
                  userAvatar === 'initials' ? (
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#222' }}>
                      {currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'AB'}
                    </span>
                  ) : (
                    <img src={userAvatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )
                ) : (
                  <User size={16} />
                )}
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {isLoggedIn ? (currentUser?.name ? currentUser.name.split(' ')[0].toUpperCase() : 'CONTUL MEU') : 'LOGIN'}
              </span>
            </div>

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
