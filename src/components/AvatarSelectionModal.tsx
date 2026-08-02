import React from 'react';
import { X, Check, Upload } from 'lucide-react';

interface AvatarSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string;
  onSelectAvatar: (avatarPath: string) => void;
}

export const AVATARS = [
  'initials',
  '/an74.png', '/an32.png', '/an53.png', '/an54.png', '/an55.png', '/an57.png',
  '/an61.png', '/an62.png', '/an70.png', '/an71-1.png', '/an71.png', '/an75.png',
  '/an86.png', '/an87.png', '/an89.png', '/an91.png', '/an94.png', '/an95.png', '/an97.png'
];

export const AvatarSelectionModal: React.FC<AvatarSelectionModalProps> = ({
  isOpen,
  onClose,
  currentAvatar,
  onSelectAvatar,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '700px',
          padding: '32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: '0 0 8px 0' }}>
              Alege un avatar predefinit
            </h2>
            <p style={{ margin: 0, color: '#64748B', fontSize: '15px' }}>
              Selectează o ilustrație pentru profilul tău Pinpin
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94A3B8',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#0F172A')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
          >
            <X size={24} />
          </button>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9', margin: '0 0 32px 0' }} />

        {/* Avatars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '16px',
            marginBottom: '40px',
            maxHeight: '400px',
            overflowY: 'auto',
            paddingRight: '8px'
          }}
        >
          {AVATARS.map((avatar, idx) => {
            const isSelected = currentAvatar === avatar || (currentAvatar === 'initials' && avatar === 'initials');
            
            return (
              <div
                key={idx}
                onClick={() => onSelectAvatar(avatar)}
                style={{
                  position: 'relative',
                  aspectRatio: '1/1',
                  borderRadius: '16px',
                  border: isSelected ? '2px solid #059669' : '1px solid #E2E8F0',
                  boxShadow: isSelected ? '0 4px 12px rgba(5, 150, 105, 0.15)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  backgroundColor: '#FFFFFF',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden'
                }}
              >
                {avatar === 'initials' ? (
                  <div style={{ width: '100%', height: '100%', borderRadius: '12px', backgroundColor: '#FCD34D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, color: '#0F172A' }}>
                    AB
                  </div>
                ) : (
                  <img src={avatar} alt={`Avatar ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}

                {/* Checkmark icon if selected */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Check size={12} strokeWidth={4} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9', margin: '0 0 24px 0' }} />

        {/* Footer Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#475569',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              padding: 0
            }}
          >
            <Upload size={18} color="#059669" />
            Sau încarcă o foto din dispozitiv
          </button>
          
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#F1F5F9',
              color: '#0F172A',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E2E8F0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
          >
            Închide
          </button>
        </div>
      </div>
    </div>
  );
};
