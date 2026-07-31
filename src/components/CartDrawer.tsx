import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 99;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total);

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="cart-drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} />
            <h2 className="drawer-title">Coșul tău ({items.reduce((a, b) => a + b.quantity, 0)})</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div style={{ padding: '16px 24px', backgroundColor: '#FFFDF0', borderBottom: '1px solid #F8D247' }}>
          {remainingForFreeShipping > 0 ? (
            <p style={{ fontSize: '13px', color: '#333' }}>
              Mai adaugă produse în valoare de <strong style={{ color: '#E55B86' }}>{remainingForFreeShipping} lei</strong> pentru livrare gratuită!
            </p>
          ) : (
            <p style={{ fontSize: '13px', color: '#2b8a3e', fontWeight: 'bold' }}>
              🎉 Felicitări! Beneficiezi de livrare gratuită.
            </p>
          )}
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div style={{ textTransform: 'none', textAlign: 'center', padding: '60px 0', color: '#888' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <p style={{ fontSize: '16px', fontWeight: 600 }}>Coșul tău este gol</p>
              <p style={{ fontSize: '13px', marginTop: '6px' }}>Adaugă câteva pinuri colorate pentru a începe!</p>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="cart-item">
                <img src={product.image} alt={product.title} className="cart-item-img" />
                <div className="cart-item-details">
                  <div>
                    <h4 className="cart-item-title">{product.title}</h4>
                    <span className="cart-item-price">{product.price * quantity} lei</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="quantity-controls">
                      <button className="qty-btn" onClick={() => onUpdateQuantity(product.id, -1)}>-</button>
                      <span className="qty-val">{quantity}</span>
                      <button className="qty-btn" onClick={() => onUpdateQuantity(product.id, 1)}>+</button>
                    </div>
                    <button
                      className="icon-btn"
                      onClick={() => onRemoveItem(product.id)}
                      style={{ color: '#999' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '16px', fontWeight: 700 }}>Total</span>
              <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--pink-accent)' }}>
                {total} lei
              </span>
            </div>
            <button className="checkout-btn" onClick={() => alert('Vă mulțumim! Comanda a fost trimisă cu succes.')}>
              FINALIZEAZĂ COMANDA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
