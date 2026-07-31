import React, { useState } from 'react';
import { X, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../data/products';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '12px',
          maxWidth: '800px',
          width: '90%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}
      >
        <button
          className="icon-btn"
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: 'rgba(255,255,255,0.8)' }}
        >
          <X size={20} />
        </button>

        {/* Product Image */}
        <div style={{ backgroundColor: '#F8F8F8', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {product.badges && product.badges.length > 0 && (
            <div className="card-badges" style={{ top: '16px', left: '16px' }}>
              {product.badges.map((b, i) => (
                <span key={i} className={`badge-tag ${b === 'HOT PICK' ? 'hot' : 'pink'}`}>{b}</span>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', color: '#888', fontWeight: 700, letterSpacing: '1px' }}>
              {product.category}
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '8px 0 12px 0', color: '#222' }}>
              {product.title}
            </h2>

            <div className="price-container" style={{ marginBottom: '20px', fontSize: '18px' }}>
              <span className="original-price" style={{ fontSize: '16px' }}>{product.originalPrice} lei</span>
              <span className="discounted-price" style={{ fontSize: '22px' }}>{product.price} lei</span>
            </div>

            <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', marginBottom: '24px' }}>
              {product.description}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                Cantitate:
              </span>
              <div className="quantity-controls" style={{ padding: '4px' }}>
                <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span className="qty-val" style={{ padding: '0 16px', fontSize: '15px' }}>{quantity}</span>
                <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
          </div>

          <button
            className="checkout-btn"
            onClick={handleAdd}
            style={{
              backgroundColor: added ? '#2b8a3e' : 'var(--orange-btn)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            {added ? (
              <>
                <Check size={20} /> ADAUGAT ÎN COȘ!
              </>
            ) : (
              <>
                <ShoppingBag size={20} /> ADAUGĂ ÎN COȘ
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
