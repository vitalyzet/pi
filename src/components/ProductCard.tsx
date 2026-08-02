import React from 'react';
import { Product } from '../data/products';
import { Heart, MapPin, Star, Clock } from 'lucide-react';

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
  const isTurism = product.category === 'Turism' || product.category === 'Cazare';
  const isModa = product.category === 'Modă';

  if (isModa && viewMode === 'classic') {
    return (
      <div className="product-card moda-card-classic" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.title}
          className="moda-classic-image"
          loading="lazy"
        />
        <div className="moda-classic-details">
          <h3 className="moda-classic-title">{product.title}</h3>
          
          <div className="moda-price-container">
            {product.originalPrice && (
              <span className="moda-original-price">
                {product.originalPrice}<span className="moda-superscript">,00</span> lei
              </span>
            )}
            <span className="moda-current-price">
              {product.price}<span className="moda-superscript">,00</span> lei
            </span>
          </div>

          <div className="ad-star-rating small" style={{ '--rating': 4, '--rating-decimal': 0.8 } as any}></div>
        </div>
      </div>
    );
  }

  if (isTurism) {
    return (
      <div className="product-card turism-card" onClick={() => onQuickView(product)}>
        <div className="card-image-wrapper">
          {product.discountPercentage ? (
            <div className="turism-badge discount">{product.discountPercentage}%</div>
          ) : (
            <div className="turism-badge">OFERTA</div>
          )}
          <img src={product.image} alt={product.title} className="card-image" loading="lazy" />
        </div>
        
        <div className="turism-details">
          <div className="turism-title">{product.title}</div>
          <div className="turism-rating">
            <Star fill="#94A3B8" color="#94A3B8" size={12} /> 4.7 (89)
          </div>
          
          <div className="turism-tags">
            <span className="turism-tag">Cazare</span>
            <span className="turism-tag">2 pers.</span>
          </div>

          <div className="turism-footer">
            <div className="turism-price">
              {product.price} € <span className="turism-price-suffix">/ noapte</span>
            </div>
            <div className="turism-location">
              <MapPin size={13} /> {product.location || 'București'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAuto) {
    return (
      <div className="product-card auto-card-new" onClick={() => onQuickView(product)}>
        <div className="auto-new-image-wrapper">
          <img src={product.image} alt={product.title} className="auto-new-image" loading="lazy" />
          <div className="auto-new-p-badge">P</div>
        </div>
        
        <div className="auto-new-details">
          <h3 className="auto-new-title">{product.title}</h3>
          <div className="auto-new-price">{product.price.toLocaleString('ro-RO')} €</div>
          
          <div className="auto-new-specs">
            {product.specs?.modelSize || product.specs?.year || '2018'} • {product.specs?.mileage || '150.000'} km
          </div>
          
          <div className="auto-new-footer">
            <div className="auto-new-footer-item">
              <MapPin size={14} /> {product.location || 'Bucuresti, Sectorul 1'}
            </div>
            <div className="auto-new-footer-item">
              <Clock size={14} /> {product.createdAt ? timeAgo(product.createdAt) : 'Acum 5 luni'}
            </div>
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
