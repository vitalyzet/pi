import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ alignItems: 'flex-start', paddingTop: '80px' }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '600px',
          padding: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '2px solid var(--primary-yellow)', paddingBottom: '12px' }}>
          <Search size={22} color="#777" />
          <input
            type="text"
            placeholder="Caută pinuri, animale, profesii..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              fontFamily: 'inherit',
              fontWeight: 600
            }}
          />
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {query.trim() && (
          <div style={{ marginTop: '20px', maxHeight: '350px', overflowY: 'auto' }}>
            {results.length === 0 ? (
              <p style={{ color: '#888', textAlign: 'center', padding: '20px 0' }}>
                Nu am găsit niciun produs pentru "{query}".
              </p>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8F8F8')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <img src={product.image} alt={product.title} style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700 }}>{product.title}</h4>
                    <span style={{ fontSize: '13px', color: 'var(--pink-accent)', fontWeight: 800 }}>{product.price} lei</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
