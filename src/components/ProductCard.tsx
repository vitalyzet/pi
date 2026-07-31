import React from 'react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
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

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
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
