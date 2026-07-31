import React, { useState } from 'react';
import {
  X,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  Truck,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  ShoppingBag
} from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';

interface Order {
  id: string;
  date: string;
  status: 'În livrare' | 'Livrat' | 'În procesare';
  total: number;
  items: { product: Product; quantity: number }[];
  awb: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'PIN-94820',
    date: '28 Iulie 2026',
    status: 'În livrare',
    total: 80,
    awb: 'EASYBOX-8392019',
    items: [
      { product: PRODUCTS[0], quantity: 1 },
      { product: PRODUCTS[1], quantity: 1 }
    ]
  },
  {
    id: 'PIN-73911',
    date: '12 Iunie 2026',
    status: 'Livrat',
    total: 60,
    awb: 'FAN-4920182',
    items: [
      { product: PRODUCTS[2], quantity: 1 },
      { product: PRODUCTS[3], quantity: 1 }
    ]
  }
];

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onAddToCart: (product: Product) => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  onLogout,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'settings'>('orders');
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[1], PRODUCTS[4], PRODUCTS[5]]);
  const [userProfile, setUserProfile] = useState({
    name: 'Elena Popescu',
    email: 'elena.popescu@pinpin.ro',
    phone: '+40 722 123 456'
  });

  if (!isOpen) return null;

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '16px',
          width: '95%',
          maxWidth: '900px',
          height: '85vh',
          maxHeight: '700px',
          display: 'flex',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          position: 'relative'
        }}
      >
        <button
          className="icon-btn"
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 20 }}
        >
          <X size={22} />
        </button>

        {/* Sidebar Navigation */}
        <div
          style={{
            width: '260px',
            backgroundColor: '#FAFAFA',
            borderRight: '1px solid #EBEBEB',
            padding: '32px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            {/* User Profile Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-yellow)',
                  color: '#222',
                  fontSize: '24px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                  border: '3px solid #FFF',
                  boxShadow: '0 4px 12px rgba(248, 210, 71, 0.4)'
                }}
              >
                EP
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#222' }}>{userProfile.name}</h3>
              <p style={{ fontSize: '12px', color: '#777', marginTop: '2px' }}>{userProfile.email}</p>
              
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#FFFDF0',
                  border: '1px solid var(--primary-yellow)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  marginTop: '10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#B8860B'
                }}
              >
                ★ 150 Puncte PinPin
              </div>
            </div>

            {/* Nav Menu */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                className="dropdown-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  backgroundColor: activeTab === 'orders' ? 'var(--primary-yellow)' : 'transparent',
                  fontWeight: activeTab === 'orders' ? 800 : 600,
                  color: activeTab === 'orders' ? '#222' : '#555'
                }}
                onClick={() => setActiveTab('orders')}
              >
                <Package size={18} /> Comenzile Mele
              </button>

              <button
                className="dropdown-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  backgroundColor: activeTab === 'wishlist' ? 'var(--primary-yellow)' : 'transparent',
                  fontWeight: activeTab === 'wishlist' ? 800 : 600,
                  color: activeTab === 'wishlist' ? '#222' : '#555'
                }}
                onClick={() => setActiveTab('wishlist')}
              >
                <Heart size={18} /> Favorite ({wishlist.length})
              </button>

              <button
                className="dropdown-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  backgroundColor: activeTab === 'addresses' ? 'var(--primary-yellow)' : 'transparent',
                  fontWeight: activeTab === 'addresses' ? 800 : 600,
                  color: activeTab === 'addresses' ? '#222' : '#555'
                }}
                onClick={() => setActiveTab('addresses')}
              >
                <MapPin size={18} /> Adrese de Livrare
              </button>

              <button
                className="dropdown-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  backgroundColor: activeTab === 'settings' ? 'var(--primary-yellow)' : 'transparent',
                  fontWeight: activeTab === 'settings' ? 800 : 600,
                  color: activeTab === 'settings' ? '#222' : '#555'
                }}
                onClick={() => setActiveTab('settings')}
              >
                <Settings size={18} /> Setări Cont
              </button>
            </div>
          </div>

          <button
            onClick={onLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: 'none',
              background: 'none',
              color: '#d9534f',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              padding: '10px'
            }}
          >
            <LogOut size={16} /> Deconectare
          </button>
        </div>

        {/* Content Panel */}
        <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px' }}>Comenzile Mele</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      border: '1px solid #EBEBEB',
                      borderRadius: '12px',
                      padding: '20px',
                      backgroundColor: '#FFF'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F0F0F0', paddingBottom: '12px', marginBottom: '16px' }}>
                      <div>
                        <span style={{ fontSize: '15px', fontWeight: 800 }}>{order.id}</span>
                        <span style={{ fontSize: '13px', color: '#777', marginLeft: '12px' }}>{order.date}</span>
                      </div>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          padding: '4px 12px',
                          borderRadius: '20px',
                          backgroundColor: order.status === 'Livrat' ? '#E6F4EA' : '#FEF3D6',
                          color: order.status === 'Livrat' ? '#137333' : '#B8860B',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {order.status === 'Livrat' ? <CheckCircle2 size={14} /> : <Truck size={14} />}
                        {order.status}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                      {order.items.map(({ product, quantity }, index) => {
                        if (!product) return null;
                        return (
                          <div key={product.id || index} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F9F9F9', padding: '8px 12px', borderRadius: '8px' }}>
                            <img src={product.image} alt={product.title} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: 700 }}>{product.title}</div>
                              <div style={{ fontSize: '12px', color: '#777' }}>x{quantity} • {product.price} €</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                      <span style={{ fontSize: '13px', color: '#666' }}>
                        AWB: <strong>{order.awb}</strong>
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--pink-accent)' }}>
                          Total: {order.total} €
                        </span>
                        <button
                          className="load-more-btn"
                          style={{ padding: '8px 16px', fontSize: '11px' }}
                          onClick={() => alert(`Urmărire colet AWB ${order.awb} pe Easybox!`)}
                        >
                          Urmărește Colet
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px' }}>Produse Favorite</h2>
              {wishlist.length === 0 ? (
                <p style={{ color: '#888', textAlign: 'center', padding: '40px 0' }}>Nu ai salvat niciun produs la favorite.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {wishlist.map((product) => (
                    <div
                      key={product.id}
                      style={{
                        border: '1px solid #EBEBEB',
                        borderRadius: '10px',
                        padding: '12px',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center'
                      }}
                    >
                      <img src={product.image} alt={product.title} style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 700 }}>{product.title}</h4>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--pink-accent)' }}>{product.price} €</span>
                        <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                          <button
                            className="checkout-btn"
                            style={{ padding: '6px 12px', fontSize: '11px', width: 'auto' }}
                            onClick={() => onAddToCart(product)}
                          >
                            <ShoppingBag size={12} style={{ display: 'inline', marginRight: '4px' }} /> Adaugă în Coș
                          </button>
                          <button
                            className="icon-btn"
                            onClick={() => removeFromWishlist(product.id)}
                            style={{ color: '#999' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Adrese de Livrare</h2>
                <button className="load-more-btn" style={{ padding: '8px 16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Plus size={14} /> Adaugă Adresă
                </button>
              </div>

              <div style={{ border: '2px solid var(--primary-yellow)', borderRadius: '12px', padding: '20px', backgroundColor: '#FFFDF5', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800 }}>Easybox Afi Cotroceni (Implicită)</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'var(--primary-yellow)', padding: '2px 8px', borderRadius: '4px' }}>EASYBOX</span>
                </div>
                <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.4' }}>
                  Bulevardul Vasile Milea 4, București, Sector 6<br />
                  Telefon: +40 722 123 456
                </p>
              </div>

              <div style={{ border: '1px solid #EBEBEB', borderRadius: '12px', padding: '20px', backgroundColor: '#FFF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800 }}>Adresă Acasă</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#F0F0F0', padding: '2px 8px', borderRadius: '4px' }}>CURIER</span>
                </div>
                <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.4' }}>
                  Strada Lipscani Nr. 15, Ap. 4, București, Sector 3<br />
                  Telefon: +40 722 123 456
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === 'settings' && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px' }}>Setări Cont</h2>
              <form onSubmit={(e) => { e.preventDefault(); alert('Datele contului au fost actualizate!'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Nume complet</label>
                  <div className="newsletter-input-wrapper" style={{ marginTop: '6px', background: '#F8F8F8' }}>
                    <input
                      type="text"
                      className="newsletter-input"
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Email</label>
                  <div className="newsletter-input-wrapper" style={{ marginTop: '6px', background: '#F8F8F8' }}>
                    <input
                      type="email"
                      className="newsletter-input"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Telefon</label>
                  <div className="newsletter-input-wrapper" style={{ marginTop: '6px', background: '#F8F8F8' }}>
                    <input
                      type="tel"
                      className="newsletter-input"
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                    />
                  </div>
                </div>

                <button className="checkout-btn" type="submit" style={{ marginTop: '12px' }}>
                  SALVEAZĂ MODIFICĂRILE
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
