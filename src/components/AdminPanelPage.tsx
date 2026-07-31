import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Plus,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  ChevronRight,
  Shield,
  Save
} from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';

interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  paymentMethod: string;
  status: 'În procesare' | 'În livrare' | 'Livrat' | 'Anulat';
  itemsCount: number;
}

const INITIAL_ADMIN_ORDERS: AdminOrder[] = [
  { id: 'PIN-94820', customer: 'Elena Popescu', email: 'elena.popescu@pinpin.ro', date: '31 Iul 2026', total: 80, paymentMethod: 'Card Online', status: 'În livrare', itemsCount: 2 },
  { id: 'PIN-94819', customer: 'Andrei Ionescu', email: 'andrei.i@gmail.com', date: '31 Iul 2026', total: 120, paymentMethod: 'Easybox Pay', status: 'În procesare', itemsCount: 4 },
  { id: 'PIN-94818', customer: 'Maria Radu', email: 'maria.radu@yahoo.com', date: '30 Iul 2026', total: 50, paymentMethod: 'Card Online', status: 'Livrat', itemsCount: 1 },
  { id: 'PIN-94817', customer: 'Cristian Matei', email: 'c.matei@outlook.com', date: '30 Iul 2026', total: 90, paymentMethod: 'Ramburs', status: 'Livrat', itemsCount: 3 },
  { id: 'PIN-94816', customer: 'Diana Stoica', email: 'diana.s@gmail.com', date: '29 Iul 2026', total: 30, paymentMethod: 'Card Online', status: 'Livrat', itemsCount: 1 }
];

interface AdminPanelPageProps {
  onBackToStore: () => void;
  announcementText: string;
  onUpdateAnnouncement: (text: string) => void;
  onAddProduct: (product: Product) => void;
}

export const AdminPanelPage: React.FC<AdminPanelPageProps> = ({
  onBackToStore,
  announcementText,
  onUpdateAnnouncement,
  onAddProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'customers' | 'settings'>('overview');
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ADMIN_ORDERS);
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState(announcementText);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  // New Product Form State
  const [newPinTitle, setNewPinTitle] = useState('');
  const [newPinPrice, setNewPinPrice] = useState(30);
  const [newPinOriginalPrice, setNewPinOriginalPrice] = useState(40);
  const [newPinCategory, setNewPinCategory] = useState('Animale');
  const [newPinDiscount, setNewPinDiscount] = useState(25);

  const handleUpdateOrderStatus = (orderId: string, newStatus: AdminOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinTitle) return;

    const newProduct: Product = {
      id: String(Date.now()),
      title: newPinTitle,
      price: Number(newPinPrice),
      originalPrice: Number(newPinOriginalPrice),
      discountPercentage: Number(newPinDiscount),
      badges: [`${newPinDiscount}%`],
      image: '/images/mystery_pins.png',
      category: newPinCategory,
      feeling: 'Cute',
      design: 'Special',
      color: 'Multicolor',
      description: 'Pin nou adăugat din panoul de administrare PinPin.'
    };

    setProductsList([newProduct, ...productsList]);
    onAddProduct(newProduct);
    setIsAddProductModalOpen(false);
    setNewPinTitle('');
    alert('Pin-ul a fost adăugat cu succes în magazin!');
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#F4F5F7', minHeight: '85vh', paddingBottom: '80px' }}>
      {/* Top Admin Header Bar */}
      <div style={{ backgroundColor: '#1A1F2C', color: '#FFF', padding: '14px 0' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ backgroundColor: 'var(--primary-yellow)', color: '#222', fontSize: '11px', fontWeight: 800, padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              PANOU ADMIN
            </span>
            <h1 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>PinPin Store Management</h1>
          </div>
          <button
            onClick={onBackToStore}
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#FFF',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Vezi Magazinul Live
          </button>
        </div>
      </div>

      {/* Main Admin Container */}
      <div style={{ maxWidth: '1300px', margin: '32px auto 0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '28px' }}>
          
          {/* Admin Navigation Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '12px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
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
                  gap: '12px',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  backgroundColor: activeTab === 'overview' ? 'var(--primary-yellow)' : 'transparent',
                  fontWeight: activeTab === 'overview' ? 800 : 600,
                  color: activeTab === 'overview' ? '#222' : '#475569'
                }}
                onClick={() => setActiveTab('overview')}
              >
                <LayoutDashboard size={18} /> Tablou de Comandă
              </button>

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
                  color: activeTab === 'orders' ? '#222' : '#475569'
                }}
                onClick={() => setActiveTab('orders')}
              >
                <ShoppingBag size={18} /> Gestiune Comenzi ({orders.length})
              </button>

              <button
                className="dropdown-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  backgroundColor: activeTab === 'products' ? 'var(--primary-yellow)' : 'transparent',
                  fontWeight: activeTab === 'products' ? 800 : 600,
                  color: activeTab === 'products' ? '#222' : '#475569'
                }}
                onClick={() => setActiveTab('products')}
              >
                <Package size={18} /> Gestiune Produse ({productsList.length})
              </button>

              <button
                className="dropdown-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  backgroundColor: activeTab === 'customers' ? 'var(--primary-yellow)' : 'transparent',
                  fontWeight: activeTab === 'customers' ? 800 : 600,
                  color: activeTab === 'customers' ? '#222' : '#475569'
                }}
                onClick={() => setActiveTab('customers')}
              >
                <Users size={18} /> Clienți Registrați
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
                  color: activeTab === 'settings' ? '#222' : '#475569'
                }}
                onClick={() => setActiveTab('settings')}
              >
                <Settings size={18} /> Setări Magazin
              </button>
            </div>
          </aside>

          {/* Right Main Admin Area */}
          <main style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* KPI METRICS OVERVIEW CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748B', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Vânzări Luna Aceasta</span>
                  <DollarSign size={20} color="#10B981" />
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>14,850 lei</div>
                <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <ArrowUpRight size={14} /> +18.4% față de luna trecută
                </div>
              </div>

              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748B', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Comenzi Totale</span>
                  <ShoppingBag size={20} color="#3B82F6" />
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>342</div>
                <div style={{ fontSize: '12px', color: '#3B82F6', fontWeight: 700, marginTop: '4px' }}>
                  5 comenzi noi azi
                </div>
              </div>

              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748B', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Pinuri În Stoc</span>
                  <Package size={20} color="#F59E0B" />
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>157</div>
                <div style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 700, marginTop: '4px' }}>
                  8 categorii active
                </div>
              </div>

              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748B', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Clienți Registrați</span>
                  <Users size={20} color="#EC4899" />
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>1,280</div>
                <div style={{ fontSize: '12px', color: '#EC4899', fontWeight: 700, marginTop: '4px' }}>
                  +42 clienți noi săptămâna aceasta
                </div>
              </div>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>Comenzi Recente În Așteptare</h3>
                
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E2E8F0', fontSize: '12px', color: '#64748B', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px' }}>ID Comandă</th>
                      <th style={{ padding: '12px' }}>Client</th>
                      <th style={{ padding: '12px' }}>Data</th>
                      <th style={{ padding: '12px' }}>Total</th>
                      <th style={{ padding: '12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 4).map((order) => (
                      <tr key={order.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '14px' }}>
                        <td style={{ padding: '14px 12px', fontWeight: 800 }}>{order.id}</td>
                        <td style={{ padding: '14px 12px' }}>
                          <div style={{ fontWeight: 700 }}>{order.customer}</div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>{order.email}</div>
                        </td>
                        <td style={{ padding: '14px 12px', color: '#64748B' }}>{order.date}</td>
                        <td style={{ padding: '14px 12px', fontWeight: 800, color: 'var(--pink-accent)' }}>{order.total} lei</td>
                        <td style={{ padding: '14px 12px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '12px', backgroundColor: order.status === 'Livrat' ? '#DCFCE7' : '#FEF3C7', color: order.status === 'Livrat' ? '#166534' : '#92400E' }}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 2: ORDERS MANAGEMENT */}
            {activeTab === 'orders' && (
              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Gestiune Comenzi Clienti</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F1F5F9', padding: '8px 14px', borderRadius: '6px' }}>
                    <Search size={16} color="#64748B" />
                    <input
                      type="text"
                      placeholder="Căutare după id sau nume..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px' }}
                    />
                  </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E2E8F0', fontSize: '12px', color: '#64748B', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px' }}>Comandă</th>
                      <th style={{ padding: '12px' }}>Client</th>
                      <th style={{ padding: '12px' }}>Metodă Plată</th>
                      <th style={{ padding: '12px' }}>Total</th>
                      <th style={{ padding: '12px' }}>Status</th>
                      <th style={{ padding: '12px' }}>Acțiune</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '14px' }}>
                        <td style={{ padding: '14px 12px', fontWeight: 800 }}>{order.id}</td>
                        <td style={{ padding: '14px 12px' }}>
                          <div style={{ fontWeight: 700 }}>{order.customer}</div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>{order.email}</div>
                        </td>
                        <td style={{ padding: '14px 12px', color: '#475569' }}>{order.paymentMethod}</td>
                        <td style={{ padding: '14px 12px', fontWeight: 800, color: 'var(--pink-accent)' }}>{order.total} lei</td>
                        <td style={{ padding: '14px 12px' }}>
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as AdminOrder['status'])}
                            style={{
                              padding: '4px 8px',
                              borderRadius: '6px',
                              border: '1px solid #CBD5E1',
                              fontSize: '12px',
                              fontWeight: 700,
                              background: '#FFF'
                            }}
                          >
                            <option value="În procesare">În procesare</option>
                            <option value="În livrare">În livrare</option>
                            <option value="Livrat">Livrat</option>
                            <option value="Anulat">Anulat</option>
                          </select>
                        </td>
                        <td style={{ padding: '14px 12px' }}>
                          <button
                            className="load-more-btn"
                            style={{ padding: '4px 10px', fontSize: '11px' }}
                            onClick={() => alert(`A fost generată factura PDF pentru comanda ${order.id}`)}
                          >
                            Factură PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 3: PRODUCTS MANAGEMENT */}
            {activeTab === 'products' && (
              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Gestiune Inventar Produse</h3>
                    <p style={{ fontSize: '13px', color: '#64748B' }}>Adaugă sau modifică pinurile din magazin</p>
                  </div>
                  <button
                    className="checkout-btn"
                    style={{ width: 'auto', padding: '10px 20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                    onClick={() => setIsAddProductModalOpen(true)}
                  >
                    <Plus size={16} /> Adaugă Pin Nou
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {productsList.map((product) => (
                    <div
                      key={product.id}
                      style={{
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
                        padding: '14px',
                        display: 'flex',
                        gap: '14px',
                        alignItems: 'center'
                      }}
                    >
                      <img src={product.image} alt={product.title} style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 800 }}>{product.title}</h4>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Categorie: {product.category}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--pink-accent)' }}>{product.price} lei</span>
                          <span style={{ fontSize: '12px', color: '#94A3B8', textDecoration: 'line-through' }}>{product.originalPrice} lei</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: CUSTOMERS */}
            {activeTab === 'customers' && (
              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>Director Clienți Registrați</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E2E8F0', fontSize: '12px', color: '#64748B', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px' }}>Nume Client</th>
                      <th style={{ padding: '12px' }}>Email</th>
                      <th style={{ padding: '12px' }}>Comenzi</th>
                      <th style={{ padding: '12px' }}>Total Cheltuit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #F1F5F9', fontSize: '14px' }}>
                      <td style={{ padding: '14px 12px', fontWeight: 800 }}>Elena Popescu</td>
                      <td style={{ padding: '14px 12px', color: '#64748B' }}>elena.popescu@pinpin.ro</td>
                      <td style={{ padding: '14px 12px', fontWeight: 700 }}>6 comenzi</td>
                      <td style={{ padding: '14px 12px', fontWeight: 800, color: 'var(--pink-accent)' }}>340 lei</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #F1F5F9', fontSize: '14px' }}>
                      <td style={{ padding: '14px 12px', fontWeight: 800 }}>Andrei Ionescu</td>
                      <td style={{ padding: '14px 12px', color: '#64748B' }}>andrei.i@gmail.com</td>
                      <td style={{ padding: '14px 12px', fontWeight: 700 }}>4 comenzi</td>
                      <td style={{ padding: '14px 12px', fontWeight: 800, color: 'var(--pink-accent)' }}>210 lei</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 5: STORE SETTINGS */}
            {activeTab === 'settings' && (
              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>Setări Generale Magazin</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onUpdateAnnouncement(newAnnouncement);
                    alert('Setările magazinului au fost actualizate!');
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}
                >
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#475569' }}>
                      Text Anunț Banner Superior (Yellow Bar)
                    </label>
                    <div className="newsletter-input-wrapper" style={{ marginTop: '6px', background: '#F8FAFC' }}>
                      <input
                        type="text"
                        className="newsletter-input"
                        value={newAnnouncement}
                        onChange={(e) => setNewAnnouncement(e.target.value)}
                      />
                    </div>
                  </div>

                  <button className="checkout-btn" type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Save size={16} /> Salvează Modificările
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ADD NEW PRODUCT MODAL */}
      {isAddProductModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddProductModalOpen(false)} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#FFF', borderRadius: '12px', width: '90%', maxWidth: '450px', padding: '28px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>Adaugă Pin Nou în Magazin</h3>
            <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700 }}>Titlu Pin</label>
                <div className="newsletter-input-wrapper" style={{ background: '#F8F8F8' }}>
                  <input type="text" required placeholder="Pin Metalic Custom" className="newsletter-input" value={newPinTitle} onChange={(e) => setNewPinTitle(e.target.value)} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700 }}>Preț Redus (lei)</label>
                  <div className="newsletter-input-wrapper" style={{ background: '#F8F8F8' }}>
                    <input type="number" required className="newsletter-input" value={newPinPrice} onChange={(e) => setNewPinPrice(Number(e.target.value))} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700 }}>Preț Inițial (lei)</label>
                  <div className="newsletter-input-wrapper" style={{ background: '#F8F8F8' }}>
                    <input type="number" required className="newsletter-input" value={newPinOriginalPrice} onChange={(e) => setNewPinOriginalPrice(Number(e.target.value))} />
                  </div>
                </div>
              </div>
              <button className="checkout-btn" type="submit" style={{ marginTop: '8px' }}>
                SALVEAZĂ PRODUSUL
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
