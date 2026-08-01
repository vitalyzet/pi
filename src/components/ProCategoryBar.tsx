import React from 'react';
import {
  Home,
  Car,
  Briefcase,
  Heart,
  Smartphone,
  Shirt,
  PawPrint,
  Plane,
  Gamepad2
} from 'lucide-react';

interface ProCategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORIES = [
  { id: 'Imobiliare', label: 'Imobiliare', icon: Home, isNew: true },
  { id: 'Auto', label: 'Auto & Moto', icon: Car },
  { id: 'Locuri de muncă', label: 'Locuri de muncă', icon: Briefcase },
  { id: 'Matrimoniale', label: 'Matrimoniale', icon: Heart },
  { id: 'Electronice', label: 'Electronice', icon: Smartphone },
  { id: 'Modă', label: 'Modă', icon: Shirt },
  { id: 'Animale', label: 'Animale', icon: PawPrint },
  { id: 'Turism', label: 'Turism', icon: Plane },
  { id: 'Gaming', label: 'Gaming', icon: Gamepad2 }
];

export const ProCategoryBar: React.FC<ProCategoryBarProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div style={{ width: '100%', padding: '10px 0', backgroundColor: 'transparent', marginBottom: '10px' }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#0F172A', fontSize: '28px', fontWeight: 800, marginBottom: '30px' }}>
          Categorii principale
        </h2>
        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px 32px', 
            maxWidth: '1100px',
            margin: '0 auto'
          }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = cat.icon;
            
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="pro-category-btn"
              >
                <div 
                  className="pro-category-icon-wrapper"
                  style={{
                    border: isSelected ? '2px solid #F8D247' : '1.5px solid #E2E8F0',
                    boxShadow: isSelected ? '0 8px 16px rgba(248, 210, 71, 0.25)' : '0 4px 10px rgba(226, 232, 240, 0.5)',
                    color: isSelected ? '#F8D247' : '#475569'
                  }}
                >
                  <Icon size={32} strokeWidth={1.5} />
                  
                  {cat.isNew && (
                    <div style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '0px',
                      backgroundColor: '#E55B86',
                      color: '#FFFFFF',
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '4px 8px',
                      borderRadius: '12px',
                      letterSpacing: '0.5px',
                      boxShadow: '0 2px 4px rgba(229, 91, 134, 0.4)'
                    }}>
                      Nou
                    </div>
                  )}
                </div>
                
                <span 
                  className="pro-category-label"
                  style={{
                    fontSize: '13px',
                    fontWeight: isSelected ? 700 : 600,
                    color: isSelected ? '#0F172A' : '#475569',
                    textAlign: 'center',
                    lineHeight: 1.2,
                    transition: 'color 0.2s ease-in-out'
                  }}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
