import React, { useRef } from 'react';
import {
  Home,
  Car,
  Briefcase,
  Heart,
  Wrench,
  Smartphone,
  Shirt,
  PawPrint,
  Sofa,
  Dumbbell,
  Baby,
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
  { id: 'Servicii', label: 'Servicii', icon: Wrench },
  { id: 'Electronice', label: 'Electronice', icon: Smartphone },
  { id: 'Modă', label: 'Modă', icon: Shirt },
  { id: 'Animale', label: 'Animale', icon: PawPrint },
  { id: 'Casă & Grădină', label: 'Casă & Grădină', icon: Sofa },
  { id: 'Timp liber', label: 'Sport', icon: Dumbbell },
  { id: 'Copii', label: 'Copii', icon: Baby },
  { id: 'Cazare', label: 'Turism', icon: Plane },
  { id: 'Gaming', label: 'Gaming', icon: Gamepad2 }
];

export const ProCategoryBar: React.FC<ProCategoryBarProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mouse drag to scroll
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (scrollRef.current) {
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div style={{ width: '100%', overflow: 'hidden', padding: '24px 0', backgroundColor: '#FFFFFF', marginBottom: '24px' }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ 
            display: 'flex', 
            gap: '24px', 
            overflowX: 'auto', 
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none',  // IE and Edge
            cursor: isDragging ? 'grabbing' : 'grab',
            paddingBottom: '8px',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = cat.icon;
            
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  minWidth: '90px',
                  position: 'relative'
                }}
              >
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '24px',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: isSelected ? '2px solid #10B981' : '1px solid #E2E8F0',
                  boxShadow: isSelected ? '0 8px 16px rgba(16, 185, 129, 0.15)' : '0 4px 6px rgba(226, 232, 240, 0.4)',
                  transition: 'all 0.2s ease-in-out',
                  color: isSelected ? '#10B981' : '#64748B'
                }}>
                  <Icon size={30} strokeWidth={1.5} />
                  
                  {cat.isNew && (
                    <div style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '0px',
                      backgroundColor: '#10B981',
                      color: '#FFFFFF',
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '4px 8px',
                      borderRadius: '12px',
                      letterSpacing: '0.5px'
                    }}>
                      Nou
                    </div>
                  )}
                </div>
                
                <span style={{
                  fontSize: '13px',
                  fontWeight: isSelected ? 700 : 600,
                  color: isSelected ? '#0F172A' : '#64748B',
                  textAlign: 'center',
                  lineHeight: 1.2
                }}>
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
