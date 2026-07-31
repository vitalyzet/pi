import React, { useState } from 'react';
import {
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Truck,
  CheckCircle2,
  Plus,
  Trash2,
  ShoppingBag,
  CreditCard,
  ChevronRight,
  User,
  ShieldCheck
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

interface UserDashboardPageProps {
  onBackToStore: () => void;
  onLogout: () => void;
  onAddToCart: (product: Product) => void;
}

export const UserDashboardPage: React.FC<UserDashboardPageProps> = ({
  onBackToStore,
  onLogout,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'payments' | 'settings'>('orders');
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[1], PRODUCTS[4], PRODUCTS[5]]);
  const [userProfile, setUserProfile] = useState({
    name: 'Elena Popescu',
    email: 'elena.popescu@pinpin.ro',
    phone: '+40 722 123 456'
  });

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div style={{ backgroundColor: '#F9F9F9', minHeight: '80vh', paddingBottom: '80px' }}>
      {/* Breadcrumb Navigation Bar */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #EBEBEB', padding: '16px 0' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#666' }}>
          <button onClick={onBackToStore} style={{ border: 'none', background: 'none', color: '#666', cursor: 'pointer', fontWeight: 600 }}>
            Acasă
          </button>
          <ChevronRight size={14} />
          <span style={{ color: '#222', fontWeight: 700 }}>Contul Meu</span>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--pink-accent)', fontWeight: 700, textTransform: 'capitalize' }}>
            {activeTab === 'orders' && 'Comenzile Mele'}
            {activeTab === 'wishlist' && 'Produse Favorite'}
            {activeTab === 'addresses' && 'Adrese de Livrare'}
            {activeTab === 'payments' && 'Metode de Plată'}
            {activeTab === 'settings' && 'Setări Cont'}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1300px', margin: '40px auto 0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
          
          {/* Left Sidebar Panel */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* User Profile Info Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid #EBEBEB',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-yellow)',
                  color: '#222',
                  fontSize: '28px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 14px auto',
                  border: '3px solid #FFF',
                  boxShadow: '0 4px 12px rgba(248, 210, 71, 0.4)'
                }}
              >
                EP
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#222' }}>{userProfile.name}</h3>
              <p style={{ fontSize: '13px', color: '#777', marginTop: '2px' }}>{userProfile.email}</p>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#FFFDF0',
                  border: '1px solid var(--primary-yellow)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  marginTop: '14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#B8860B'
                }}
              >
                ★ 150 Puncte PinPin
              </div>
            </div>

            {/* Navigation Menu Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '12px',
                border: '1px solid #EBEBEB',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <button
                className="dropdown-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  backgroundColor: activeTab === 'orders' ? 'var(--primary-yellow)' : 'transparent',
                  fontWeight: activeTab === 'orders' ? 800 : 600,
                  color: activeTab === 'orders' ? '#222' : '#444'
                }}
                onClick={() => setActiveTab('orders')}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Package size={18} /> Comenzile Mele
                </span>
                <ChevronRight size={16} />
              </button>

              <button
                className="dropdown-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  backgroundColor: activeTab === 'wishlist' ? 'var(--primary-yellow)' : 'transparent',
                  fontWeight: activeTab === 'wishlist' ? 800 : 600,
                  color: activeTab === 'wishlist' ? '#222' : '#444'
                }}
                onClick={() => setActiveTab('wishlist')}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Heart size={18} /> Favorite ({wishlist.length})
                </span>
                <ChevronRight size={16} />
              </button>

              <button
                className="dropdown-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  backgroundColor: activeTab === 'addresses' ? 'var(--primary-yellow)' : 'transparent',
                  fontWeight: activeTab === 'addresses' ? 800 : 600,
                  color: activeTab === 'addresses' ? '#222' : '#444'
                }}
                onClick={() => setActiveTab('addresses')}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MapPin size={18} /> Adrese de Livrare
                </span>
                <ChevronRight size={16} />
              </button>

              <button
                className="dropdown-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  backgroundColor: activeTab === 'payments' ? 'var(--primary-yellow)' : 'transparent',
                  fontWeight: activeTab === 'payments' ? 800 : 600,
                  color: activeTab === 'payments' ? '#222' : '#444'
                }}
                onClick={() => setActiveTab('payments')}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CreditCard size={18} /> Metode de Plată
                </span>
                <ChevronRight size={16} />
              </button>

              <button
                className="dropdown-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  backgroundColor: activeTab === 'settings' ? 'var(--primary-yellow)' : 'transparent',
                  fontWeight: activeTab === 'settings' ? 800 : 600,
                  color: activeTab === 'settings' ? '#222' : '#444'
                }}
                onClick={() => setActiveTab('settings')}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Settings size={18} /> Setări Cont
                </span>
                <ChevronRight size={16} />
              </button>

              <div style={{ height: '1px', backgroundColor: '#EBEBEB', margin: '8px 0' }} />

              <button
                onClick={onLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: 'none',
                  background: 'none',
                  color: '#d9534f',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: '14px 16px'
                }}
              >
                <LogOut size={18} /> Deconectare Din Cont
              </button>
            </div>
          </aside>

          {/* Right Main Content Card */}
          <main
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '32px',
              border: '1px solid #EBEBEB',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}
          >
            {/* TAB 1: ORDERS */}
            {activeTab === 'orders' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '2px solid #F0F0F0', paddingBottom: '16px' }}>
                  <div>
                    <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#222' }}>Comenzile Mele</h2>
                    <p style={{ fontSize: '13px', color: '#777', marginTop: '2px' }}>Istoricul și statusul livrărilor tale</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {MOCK_ORDERS.map((order) => (
                    <div
                      key={order.id}
                      style={{
                        border: '1px solid #EBEBEB',
                        borderRadius: '12px',
                        padding: '24px',
                        backgroundColor: '#FFF'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F0F0F0', paddingBottom: '16px', marginBottom: '20px' }}>
                        <div>
                          <span style={{ fontSize: '16px', fontWeight: 800 }}>Comanda {order.id}</span>
                          <span style={{ fontSize: '13px', color: '#777', marginLeft: '12px' }}>plasată pe {order.date}</span>
                        </div>
                        <span
                          style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            padding: '6px 16px',
                            borderRadius: '20px',
                            backgroundColor: order.status === 'Livrat' ? '#E6F4EA' : '#FEF3D6',
                            color: order.status === 'Livrat' ? '#137333' : '#B8860B',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          {order.status === 'Livrat' ? <CheckCircle2 size={16} /> : <Truck size={16} />}
                          {order.status}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                        {order.items.map(({ product, quantity }) => (
                          <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F8F8F8', padding: '12px 16px', borderRadius: '10px', flex: '1', minWidth: '220px' }}>
                            <img src={product.image} alt={product.title} style={{ width: '54px', height: '54px', borderRadius: '8px', objectFit: 'cover' }} />
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 700 }}>{product.title}</div>
                              <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>Cantitate: {quantity} • {product.price} €</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #F8F8F8' }}>
                        <span style={{ fontSize: '13px', color: '#555' }}>
                          AWB AWB Easybox: <strong style={{ color: '#222' }}>{order.awb}</strong>
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                          <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--pink-accent)' }}>
                            Total: {order.total} €
                          </span>
                          <button
                            className="load-more-btn"
                            style={{ padding: '10px 20px', fontSize: '12px' }}
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
                <div style={{ marginBottom: '24px', borderBottom: '2px solid #F0F0F0', paddingBottom: '16px' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#222' }}>Produse Favorite</h2>
                  <p style={{ fontSize: '13px', color: '#777', marginTop: '2px' }}>Pinurile pe care le-ai salvat pentru mai târziu</p>
                </div>

                {wishlist.length === 0 ? (
                  <p style={{ color: '#888', textAlign: 'center', padding: '60px 0' }}>Nu ai salvat niciun produs la favorite.</p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    {wishlist.map((product) => (
                      <div
                        key={product.id}
                        style={{
                          border: '1px solid #EBEBEB',
                          borderRadius: '12px',
                          padding: '16px',
                          display: 'flex',
                          gap: '16px',
                          alignItems: 'center'
                        }}
                      >
                        <img src={product.image} alt={product.title} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 800 }}>{product.title}</h4>
                          <div style={{ marginTop: '4px', fontSize: '15px', fontWeight: 800, color: 'var(--pink-accent)' }}>
                            {product.price} €
                          </div>
                          <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                            <button
                              className="checkout-btn"
                              style={{ padding: '8px 16px', fontSize: '12px', width: 'auto' }}
                              onClick={() => onAddToCart(product)}
                            >
                              <ShoppingBag size={14} style={{ display: 'inline', marginRight: '6px' }} /> Adaugă în Coș
                            </button>
                            <button
                              className="icon-btn"
                              onClick={() => removeFromWishlist(product.id)}
                              style={{ color: '#999' }}
                            >
                              <Trash2 size={18} />
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '2px solid #F0F0F0', paddingBottom: '16px' }}>
                  <div>
                    <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#222' }}>Adrese de Livrare</h2>
                    <p style={{ fontSize: '13px', color: '#777', marginTop: '2px' }}>Gestionează adresele Easybox și de acasă</p>
                  </div>
                  <button className="load-more-btn" style={{ padding: '10px 20px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Plus size={16} /> Adaugă Adresă
                  </button>
                </div>

                <div style={{ border: '2px solid var(--primary-yellow)', borderRadius: '12px', padding: '24px', backgroundColor: '#FFFDF5', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 800 }}>Easybox Afi Cotroceni (Implicită)</span>
                    <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: 'var(--primary-yellow)', padding: '4px 10px', borderRadius: '4px' }}>EASYBOX</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.5' }}>
                    Bulevardul Vasile Milea 4, București, Sector 6<br />
                    Telefon de contact: +40 722 123 456
                  </p>
                </div>

                <div style={{ border: '1px solid #EBEBEB', borderRadius: '12px', padding: '24px', backgroundColor: '#FFF' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 800 }}>Adresă Domiciul (Curier Rapid)</span>
                    <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: '#F0F0F0', padding: '4px 10px', borderRadius: '4px' }}>CURIER</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.5' }}>
                    Strada Lipscani Nr. 15, Ap. 4, București, Sector 3<br />
                    Telefon de contact: +40 722 123 456
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: PAYMENTS */}
            {activeTab === 'payments' && (
              <div>
                <div style={{ marginBottom: '24px', borderBottom: '2px solid #F0F0F0', paddingBottom: '16px' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#222' }}>Metode de Plată</h2>
                  <p style={{ fontSize: '13px', color: '#777', marginTop: '2px' }}>Cardurile tale salvate pentru checkout rapid</p>
                </div>

                <div style={{ border: '1px solid #EBEBEB', borderRadius: '12px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '500px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ background: '#1A1F71', color: 'white', fontWeight: 'bold', padding: '10px 14px', borderRadius: '6px', fontSize: '14px' }}>
                      VISA
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 800 }}>Visa de la Banca Transilvania</div>
                      <div style={{ fontSize: '13px', color: '#777' }}>•••• •••• •••• 4242 (Expira 08/28)</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#2b8a3e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={16} /> Verificat
                  </span>
                </div>
              </div>
            )}

            {/* TAB 5: SETTINGS */}
            {activeTab === 'settings' && (
              <div>
                <div style={{ marginBottom: '24px', borderBottom: '2px solid #F0F0F0', paddingBottom: '16px' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#222' }}>Setări Cont</h2>
                  <p style={{ fontSize: '13px', color: '#777', marginTop: '2px' }}>Editează informațiile personale ale contului</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); alert('Datele au fost salvate cu succes!'); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '450px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#444' }}>Nume complet</label>
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
                    <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#444' }}>Adresă de e-mail</label>
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
                    <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#444' }}>Număr de telefon</label>
                    <div className="newsletter-input-wrapper" style={{ marginTop: '6px', background: '#F8F8F8' }}>
                      <input
                        type="tel"
                        className="newsletter-input"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <button className="checkout-btn" type="submit" style={{ marginTop: '10px' }}>
                    SALVEAZĂ MODIFICĂRILE
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
