import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
  onSearchSubmit: (query: string) => void;
  onSearchCategorySubmit: (query: string, category: string) => void;
  products: Product[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSearchSubmit,
  onSearchCategorySubmit,
  products,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  const results = searchTerms.length > 0
    ? products.filter((p) => {
        const searchableText = `${p.title} ${p.category} ${p.location || ''} ${p.description || ''}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      })
    : [];

  const matchedCategories = Array.from(new Set(results.map(p => p.category)));

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
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                onSearchSubmit(query.trim());
                onClose();
              }
            }}
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
                Nu am găsit nicio potrivire pentru "{query}".
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  onClick={() => {
                    onSearchCategorySubmit(query.trim(), 'Toate');
                    onClose();
                  }}
                  style={{
                    padding: '16px 8px',
                    cursor: 'pointer',
                    borderBottom: '1px dotted #D1D5DB',
                    fontSize: '16px',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8F8F8')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <strong style={{ color: '#1A56A8', fontWeight: 700 }}>{query.trim()}</strong> <em style={{ color: '#4B5563', fontStyle: 'italic', margin: '0 4px' }}>în</em> <strong style={{ color: '#111827', fontWeight: 700 }}>toate categoriile</strong>
                </div>

                {matchedCategories.map((cat, index) => (
                  <div
                    key={cat}
                    onClick={() => {
                      onSearchCategorySubmit(query.trim(), cat);
                      onClose();
                    }}
                    style={{
                      padding: '16px 8px',
                      cursor: 'pointer',
                      borderBottom: index === matchedCategories.length - 1 ? 'none' : '1px dotted #D1D5DB',
                      fontSize: '16px',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8F8F8')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <strong style={{ color: '#1A56A8', fontWeight: 700 }}>{query.trim()}</strong> <em style={{ color: '#4B5563', fontStyle: 'italic', margin: '0 4px' }}>în</em> <strong style={{ color: '#111827', fontWeight: 700 }}>{cat}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
