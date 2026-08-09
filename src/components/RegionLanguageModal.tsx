import React, { useState } from 'react';
import { X, Globe } from 'lucide-react';

interface RegionLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
}

export interface Region {
  id: string;
  name: string;
  flag: string;
  defaultLang: string;
  icon?: React.ReactNode;
}

export const REGIONS: Region[] = [
  { id: 'ro', name: 'România', flag: '🇷🇴', defaultLang: 'ro' },
  { id: 'es', name: 'España', flag: '🇪🇸', defaultLang: 'es' },
  { id: 'it', name: 'Italia', flag: '🇮🇹', defaultLang: 'it' },
  { id: 'fr', name: 'Francia', flag: '🇫🇷', defaultLang: 'fr' },
  { id: 'de', name: 'Germania', flag: '🇩🇪', defaultLang: 'de' },
  { id: 'nl', name: 'Olanda', flag: '🇳🇱', defaultLang: 'nl' },
];

const LANGUAGES = [
  { id: 'en', name: 'English' },
  { id: 'ar', name: 'اللغة العربية' },
  { id: 'fr', name: 'Français' },
  { id: 'ru', name: 'русский язык' },
  { id: 'es', name: 'Español' },
  { id: 'pt', name: 'Português' },
  { id: 'de', name: 'Deutsch' },
  { id: 'pl', name: 'Polski' },
  { id: 'cs', name: 'Čeština' },
  { id: 'it', name: 'Italiano' },
  { id: 'ro', name: 'Română' },
  { id: 'nl', name: 'Nederlands' },
];

export const RegionLanguageModal: React.FC<RegionLanguageModalProps> = ({
  isOpen,
  onClose,
  selectedRegion,
  onSelectRegion,
  selectedLanguage,
  onSelectLanguage,
}) => {

  if (!isOpen) return null;

  return (
    <>
      <div 
        style={{ position: 'fixed', inset: 0, zIndex: 9998 }} 
        onClick={onClose} 
      />
      <div
        style={{
          position: 'absolute',
          top: '100%',
          right: 0,
        marginTop: '12px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        width: '280px',
        maxHeight: '400px',
        overflowY: 'auto',
        padding: '20px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB',
        zIndex: 9999,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>Regiune</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
          {REGIONS.map((region) => {
            const isSelected = selectedRegion === region.id;
            return (
              <button
                key={region.id}
                onClick={() => {
                  onSelectRegion(region.id);
                  if (region.defaultLang) {
                    onSelectLanguage(region.defaultLang);
                  }
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: `1px solid ${isSelected ? '#10B981' : 'transparent'}`,
                  backgroundColor: isSelected ? '#F0FDF4' : 'transparent',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
              >
                {region.icon ? region.icon : <span style={{ fontSize: '18px' }}>{region.flag}</span>}
                <span style={{ fontSize: '14px', fontWeight: isSelected ? 600 : 400, color: isSelected ? '#10B981' : '#111827' }}>
                  {region.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
