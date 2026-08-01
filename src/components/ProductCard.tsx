import React from 'react';
import { Product } from '../data/products';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  viewMode?: 'classic' | 'pro';
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (product: Product) => void;
}

const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'Acum câteva secunde';
  if (minutes < 60) return `Acum ${minutes} min`;
  if (hours < 24) return `Acum ${hours} ore`;
  if (days === 1) return `Ieri`;
  return `Acum ${days} zile`;
};

// Auto date formatting (e.g., "3 iun. 2026")
const formatDateAuto = (dateStr: string) => {
  const date = new Date(dateStr);
  const months = ['ian.', 'feb.', 'mar.', 'apr.', 'mai', 'iun.', 'iul.', 'aug.', 'sep.', 'oct.', 'nov.', 'dec.'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = 'classic',
  onAddToCart,
  onQuickView,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const isAuto = product.category === 'Auto' || product.category === 'Auto & Moto' || product.category === 'Vehicule';

  if (isAuto && viewMode === 'pro') {
    return (
      <div className="product-card auto-card" onClick={() => onQuickView(product)}>
        <div className="card-image-wrapper">
          <div className="auto-category-badge">Auto & Moto</div>
          <div className="auto-location-overlay">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span style={{ marginTop: '2px' }}>{product.location || 'slatina'}</span>
          </div>
          
          <img
            src={product.image}
            alt={product.title}
            className="card-image"
            loading="lazy"
          />
        </div>
        
        <div className="auto-details">
          <button 
            className="favorite-icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(product);
            }}
          >
            <Heart size={20} strokeWidth={2.5} fill={isFavorite ? "#E63946" : "none"} color={isFavorite ? "#E63946" : "currentColor"} />
          </button>
          
          <span className="auto-price">{product.price.toLocaleString('ro-RO')} €</span>
          <h3 className="auto-title">{product.title}</h3>
        </div>
      </div>
    );
  }

  if (isAuto && viewMode === 'classic') {
    return (
      <div className="product-card auto-card-classic" onClick={() => onQuickView(product)}>
        <div className="classic-image-wrapper">
          <img
            src={product.image}
            alt={product.title}
            className="classic-image"
            loading="lazy"
          />
        </div>
        
        <div className="classic-details">
          <h3 className="classic-title">{product.title}</h3>
          
          <div className="classic-location-date">
            {product.location || 'Bucuresti, Sectorul 4'} - Reactualizat la {product.createdAt ? formatDateAuto(product.createdAt) : '30 iulie 2026'}
          </div>
          
          <div className="classic-footer">
            <span className="classic-price">{product.price.toLocaleString('ro-RO')} €</span>
            <button 
              className="classic-favorite-btn"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite?.(product);
              }}
            >
              <Heart size={24} strokeWidth={2} fill={isFavorite ? "#E63946" : "none"} color={isFavorite ? "#E63946" : "currentColor"} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card" onClick={() => onQuickView(product)}>
      <div className="card-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="card-image"
          loading="lazy"
        />

        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="card-badges">
            {product.badges.map((badge, idx) => (
              <span
                key={idx}
                className={`badge-tag ${badge === 'HOT PICK' ? 'hot' : 'pink'}`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Favorite Button */}
        <button 
          className="favorite-icon-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(product);
          }}
        >
          <Heart size={20} strokeWidth={2.5} fill={isFavorite ? "#E63946" : "none"} color={isFavorite ? "#E63946" : "currentColor"} />
        </button>

        {/* Add to Cart Hover Button */}
        <button
          className="add-to-cart-hover-btn"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product, e);
          }}
        >
          ADAUGĂ ÎN COȘ
        </button>
      </div>

      <div className="card-details">
        <h3 className="product-title">{product.title}</h3>
        <div className="price-container">
          {product.originalPrice && (
            <span className="original-price">{product.originalPrice} €</span>
          )}
          <span className="discounted-price">{product.price} €</span>
        </div>
        {(product.createdAt || product.location) && (
          <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            {product.createdAt && <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>}
            {product.createdAt ? timeAgo(product.createdAt) : ''}
            {product.createdAt && product.location ? ' • ' : ''}
            {product.location ? product.location : ''}
          </div>
        )}
      </div>
    </div>
  );
};
