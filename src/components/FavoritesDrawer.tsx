import React from 'react';
import { X, Trash2, Heart } from 'lucide-react';
import { Product } from '../data/products';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Product[];
  onRemoveFavorite: (product: Product) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
}) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="cart-drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={20} fill="#E55B86" color="#E55B86" />
            <h2 className="drawer-title" style={{ fontSize: '18px' }}>Mis Guardados ({favorites.length})</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body" style={{ padding: '24px 16px' }}>
          {favorites.length === 0 ? (
            <div style={{ textTransform: 'none', textAlign: 'center', padding: '60px 0', color: '#888' }}>
              <Heart size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <p style={{ fontSize: '16px', fontWeight: 600 }}>Nu ai anunțuri salvate</p>
              <p style={{ fontSize: '13px', marginTop: '6px' }}>Apasă pe inima de pe un anunț pentru a-l salva aici!</p>
            </div>
          ) : (
            favorites.map((product) => (
              <div 
                key={product.id} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  marginBottom: '16px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                <img 
                  src={product.image} 
                  alt={product.title} 
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                />
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ 
                    fontSize: '14px', 
                    fontWeight: 600, 
                    color: '#0F172A', 
                    margin: '0 0 6px 0',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {product.title}
                  </h4>
                  <span style={{ 
                    fontSize: '15px', 
                    fontWeight: 800, 
                    color: '#E55B86' 
                  }}>
                    {product.category === 'Auto' || product.category === 'Auto & Moto' || product.category === 'Vehicule' 
                      ? `${product.price.toLocaleString('ro-RO')} €` 
                      : `${product.price.toLocaleString('ro-RO')} lei`}
                  </span>
                </div>
                
                <button
                  className="icon-btn"
                  onClick={() => onRemoveFavorite(product)}
                  style={{ color: '#94A3B8', padding: '8px', marginLeft: 'auto' }}
                  title="Șterge din salvate"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
