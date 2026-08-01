import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Building2,
  Car,
  Briefcase,
  Wrench,
  Coffee,
  Store,
  GraduationCap,
  Smartphone,
  Bed,
  Heart,
  LayoutGrid,
  Grid2X2
} from 'lucide-react';
import { CATEGORIES, FEELINGS, DESIGNS, COLORS } from '../data/products';

interface FilterBarProps {
  selectedCategory: string;
  selectedFeeling: string;
  selectedDesign: string;
  selectedColor: string;
  sortBy: string;
  productCount: number;
  viewMode: 'classic' | 'pro';
  onSelectCategory: (val: string) => void;
  onSelectFeeling: (val: string) => void;
  onSelectDesign: (val: string) => void;
  onSelectColor: (val: string) => void;
  onSelectSort: (val: string) => void;
  onToggleViewMode: (mode: 'classic' | 'pro') => void;
}

const CATEGORY_PILL_ITEMS = [
  {
    name: 'Toate',
    label: 'Toate',
    icon: <LayoutGrid size={18} color="#FFFFFF" />,
    badgeBg: '#475569'
  },
  {
    name: 'Auto',
    label: 'Auto & Moto',
    icon: <Car size={18} color="#FFFFFF" />,
    badgeBg: '#EF4444'
  },
  {
    name: 'Locuri de muncă',
    label: 'Locuri de muncă',
    icon: <Briefcase size={18} color="#FFFFFF" />,
    badgeBg: '#0D9488'
  },
  {
    name: 'Servicii',
    label: 'Servicii',
    icon: <Wrench size={18} color="#FFFFFF" />,
    badgeBg: '#3B82F6'
  },
  {
    name: 'Timp liber',
    label: 'Timp liber',
    icon: <Coffee size={18} color="#FFFFFF" />,
    badgeBg: '#EAB308'
  },
  {
    name: 'Imobiliare',
    label: 'Imobiliare',
    icon: <Building2 size={18} color="#FFFFFF" />,
    badgeBg: '#059669'
  },
  {
    name: 'Afaceri & Firme',
    label: 'Afaceri & Firme',
    icon: <Store size={18} color="#FFFFFF" />,
    badgeBg: '#F97316'
  },
  {
    name: 'Cursuri & Instruire',
    label: 'Cursuri & Instruire',
    icon: <GraduationCap size={18} color="#FFFFFF" />,
    badgeBg: '#EC4899'
  },
  {
    name: 'Electronice',
    label: 'Electronice',
    icon: <Smartphone size={18} color="#FFFFFF" />,
    badgeBg: '#8B5CF6'
  },
  {
    name: 'Cazare',
    label: 'Cazare',
    icon: <Bed size={18} color="#FFFFFF" />,
    badgeBg: '#F59E0B'
  },
  {
    name: 'Matrimoniale',
    label: 'Matrimoniale',
    icon: <Heart size={18} color="#FFFFFF" />,
    badgeBg: '#F43F5E'
  }
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  selectedFeeling,
  selectedDesign,
  selectedColor,
  sortBy,
  productCount,
  viewMode,
  onSelectCategory,
  onSelectFeeling,
  onSelectDesign,
  onSelectColor,
  onSelectSort,
  onToggleViewMode
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [sortOpen, setSortOpen] = useState(false);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
    setSortOpen(false);
  };

  return (
    <>
      {activeDropdown && (
        <div
          className="dropdown-backdrop-overlay"
          onClick={() => setActiveDropdown(null)}
        />
      )}
      <div className="filter-bar-container">
        <div className="filter-dropdowns">
          {/* Feeling Filter */}
          <div className="filter-group">
            <button
              className="filter-btn"
              onClick={() => toggleDropdown('feeling')}
            >
              FEELING {selectedFeeling !== 'Toate' && `(${selectedFeeling})`} <ChevronDown size={16} />
            </button>
            {activeDropdown === 'feeling' && (
              <div className="filter-dropdown-menu">
                {FEELINGS.map((item) => (
                  <button
                    key={item}
                    className={`dropdown-item ${selectedFeeling === item ? 'selected' : ''}`}
                    onClick={() => {
                      onSelectFeeling(item);
                      setActiveDropdown(null);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Design Filter */}
          <div className="filter-group">
            <button
              className="filter-btn"
              onClick={() => toggleDropdown('design')}
            >
              DESIGN {selectedDesign !== 'Toate' && `(${selectedDesign})`} <ChevronDown size={16} />
            </button>
            {activeDropdown === 'design' && (
              <div className="filter-dropdown-menu">
                {DESIGNS.map((item) => (
                  <button
                    key={item}
                    className={`dropdown-item ${selectedDesign === item ? 'selected' : ''}`}
                    onClick={() => {
                      onSelectDesign(item);
                      setActiveDropdown(null);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color Filter */}
          <div className="filter-group">
            <button
              className="filter-btn"
              onClick={() => toggleDropdown('color')}
            >
              CULOARE {selectedColor !== 'Toate' && `(${selectedColor})`} <ChevronDown size={16} />
            </button>
            {activeDropdown === 'color' && (
              <div className="filter-dropdown-menu">
                {COLORS.map((item) => (
                  <button
                    key={item}
                    className={`dropdown-item ${selectedColor === item ? 'selected' : ''}`}
                    onClick={() => {
                      onSelectColor(item);
                      setActiveDropdown(null);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Filter - Only visible in Classic Mode */}
          {viewMode === 'classic' && (
            <div className="filter-group">
              <button
                className="filter-btn"
                onClick={() => toggleDropdown('category')}
              >
                CATEGORII {selectedCategory !== 'Toate' && `(${selectedCategory})`}{' '}
                {activeDropdown === 'category' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {activeDropdown === 'category' && (
                <div className="category-popup-card" style={{ width: '480px', padding: '16px' }}>
                  <div className="category-pill-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    {CATEGORY_PILL_ITEMS.map((cat) => (
                      <button
                        key={cat.name}
                        className={`category-pill-card ${selectedCategory === cat.name ? 'selected' : ''}`}
                        onClick={() => {
                          onSelectCategory(cat.name);
                          setActiveDropdown(null);
                        }}
                      >
                        <div className="category-pill-badge" style={{ backgroundColor: cat.badgeBg }}>
                          {cat.icon}
                        </div>
                        <span className="category-pill-title">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Toolbar */}
      <div className="product-toolbar">
        <div className="product-count-text">
          {productCount} produse
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Mode Switcher: Clasic vs Pro */}
          <div className="view-mode-switcher">
            <button
              className={`mode-btn ${viewMode === 'classic' ? 'active' : ''}`}
              onClick={() => onToggleViewMode('classic')}
              title="Mod Clasic (4 carduri)"
            >
              <Grid2X2 size={16} />
              <span>CLASIC</span>
            </button>
            <button
              className={`mode-btn ${viewMode === 'pro' ? 'active' : ''}`}
              onClick={() => onToggleViewMode('pro')}
              title="Mod Pro (5 carduri pe rând)"
            >
              <LayoutGrid size={16} />
              <span>PRO (5)</span>
            </button>
          </div>

          <div className="sort-select-wrapper">
          <button
            className="sort-select-btn"
            onClick={() => {
              setSortOpen(!sortOpen);
              setActiveDropdown(null);
            }}
          >
            <span>{sortBy}</span>
            <ChevronDown size={16} />
          </button>
          {sortOpen && (
            <div className="filter-dropdown-menu" style={{ right: 0, left: 'auto' }}>
              <button
                className="dropdown-item"
                onClick={() => {
                  onSelectSort('Recomandate');
                  setSortOpen(false);
                }}
              >
                Recomandate
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  onSelectSort('Preț: Mic la Mare');
                  setSortOpen(false);
                }}
              >
                Preț: Mic la Mare
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  onSelectSort('Preț: Mare la Mic');
                  setSortOpen(false);
                }}
              >
                Preț: Mare la Mic
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  onSelectSort('Cele mai noi');
                  setSortOpen(false);
                }}
              >
                Cele mai noi
              </button>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
};
