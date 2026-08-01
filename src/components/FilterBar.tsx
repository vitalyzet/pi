import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Grid2X2,
  LayoutGrid
} from 'lucide-react';
import { FEELINGS, DESIGNS, COLORS } from '../data/products';

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
