import React, { useState } from 'react';
import {
  Heart,
  Settings,
  LogOut,
  Plus,
  Trash2,
  ChevronRight,
  ShieldCheck,
  LayoutGrid,
  MessageCircle,
  Wallet,
  Eye,
  TrendingUp,
  MapPin,
  List
} from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';

interface MyAd {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  status: 'Activ' | 'Inactiv' | 'În revizuire';
  views: number;
  favorites: number;
  messages: number;
  dateAdded: string;
  isPromoted: boolean;
}

const MOCK_MY_ADS: MyAd[] = [
  {
    id: 'AD-94820',
    title: 'BMW Serie 3 M Sport 2018',
    price: 18500,
    category: 'Auto & Moto',
    image: '/images/coches.png',
    status: 'Activ',
    views: 342,
    favorites: 12,
    messages: 3,
    dateAdded: '28 Iul 2026',
    isPromoted: true
  },
  {
    id: 'AD-73911',
    title: 'Apartament 2 camere Ultracentral',
    price: 85000,
    category: 'Imobiliare',
    image: '/images/inmobilia.png',
    status: 'Activ',
    views: 890,
    favorites: 45,
    messages: 8,
    dateAdded: '15 Iun 2026',
    isPromoted: false
  },
  {
    id: 'AD-22910',
    title: 'IPhone 14 Pro Max 256GB',
    price: 850,
    category: 'Electronice',
    image: '/images/electronica.png',
    status: 'Inactiv',
    views: 120,
    favorites: 5,
    messages: 0,
    dateAdded: '10 Mai 2026',
    isPromoted: false
  }
];

interface UserDashboardPageProps {
  onBackToStore: () => void;
  onLogout: () => void;
  onViewProduct?: (product: Product) => void;
  userAds?: Product[];
}

export const UserDashboardPage: React.FC<UserDashboardPageProps> = ({
  onBackToStore,
  onLogout,
  onViewProduct,
  userAds = [],
}) => {
  const [activeTab, setActiveTab] = useState<'my_ads' | 'messages' | 'favorites' | 'wallet' | 'settings'>('my_ads');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[1], PRODUCTS[4], PRODUCTS[5]]);
  
  const [userProfile] = useState({
    name: 'Alexandru B.',
    email: 'alexandru.b@pinpin.ro',
    phone: '+40 722 123 456',
    joined: 'Aprilie 2026',
    credits: 150
  });

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const myAds: MyAd[] = userAds.length > 0 ? userAds.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    category: p.category,
    image: p.image,
    status: 'Activ',
    views: Math.floor(Math.random() * 500) + 10,
    favorites: Math.floor(Math.random() * 50) + 1,
    messages: Math.floor(Math.random() * 10),
    dateAdded: 'Astăzi',
    isPromoted: !!p.isPopular
  })) : MOCK_MY_ADS;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '80vh', paddingBottom: '80px' }}>
      {/* Breadcrumb Navigation Bar */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #F1F5F9', padding: '16px 0' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B' }}>
          <button onClick={onBackToStore} style={{ border: 'none', background: 'none', color: '#64748B', cursor: 'pointer', fontWeight: 600 }}>
            Acasă
          </button>
          <ChevronRight size={14} />
          <span style={{ color: '#0F172A', fontWeight: 700 }}>Contul Meu</span>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--primary-yellow)', fontWeight: 800, textTransform: 'capitalize' }}>
            {activeTab === 'my_ads' && 'Anunțurile mele'}
            {activeTab === 'messages' && 'Mesaje'}
            {activeTab === 'favorites' && 'Anunțuri Favorite'}
            {activeTab === 'wallet' && 'Portofel & Promovare'}
            {activeTab === 'settings' && 'Setări Cont'}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1300px', margin: '40px auto 0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
          
          {/* Sidebar */}
          <div>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--primary-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A', fontSize: '24px', fontWeight: 800 }}>
                  {userProfile.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>{userProfile.name}</h3>
                  <div style={{ fontSize: '13px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={14} color="#10B981" />
                    Cont Verificat
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => setActiveTab('my_ads')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '16px', border: 'none', cursor: 'pointer',
                    backgroundColor: activeTab === 'my_ads' ? '#FFFDF0' : 'transparent',
                    color: activeTab === 'my_ads' ? '#0F172A' : '#64748B',
                    fontWeight: activeTab === 'my_ads' ? 800 : 600,
                    fontSize: '15px', transition: 'all 0.2s'
                  }}
                >
                  <LayoutGrid size={20} color={activeTab === 'my_ads' ? 'var(--primary-yellow)' : '#94A3B8'} />
                  Anunțurile Mele
                  <span style={{ marginLeft: 'auto', backgroundColor: activeTab === 'my_ads' ? 'var(--primary-yellow)' : '#F1F5F9', color: activeTab === 'my_ads' ? '#0F172A' : '#64748B', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 800 }}>
                    {myAds.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('messages')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '16px', border: 'none', cursor: 'pointer',
                    backgroundColor: activeTab === 'messages' ? '#FFFDF0' : 'transparent',
                    color: activeTab === 'messages' ? '#0F172A' : '#64748B',
                    fontWeight: activeTab === 'messages' ? 800 : 600,
                    fontSize: '15px', transition: 'all 0.2s'
                  }}
                >
                  <MessageCircle size={20} color={activeTab === 'messages' ? 'var(--primary-yellow)' : '#94A3B8'} />
                  Mesaje
                  <span style={{ marginLeft: 'auto', backgroundColor: '#E55B86', color: '#FFF', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 800 }}>
                    2
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('favorites')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '16px', border: 'none', cursor: 'pointer',
                    backgroundColor: activeTab === 'favorites' ? '#FFFDF0' : 'transparent',
                    color: activeTab === 'favorites' ? '#0F172A' : '#64748B',
                    fontWeight: activeTab === 'favorites' ? 800 : 600,
                    fontSize: '15px', transition: 'all 0.2s'
                  }}
                >
                  <Heart size={20} color={activeTab === 'favorites' ? 'var(--primary-yellow)' : '#94A3B8'} />
                  Favorite
                </button>

                <button
                  onClick={() => setActiveTab('wallet')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '16px', border: 'none', cursor: 'pointer',
                    backgroundColor: activeTab === 'wallet' ? '#FFFDF0' : 'transparent',
                    color: activeTab === 'wallet' ? '#0F172A' : '#64748B',
                    fontWeight: activeTab === 'wallet' ? 800 : 600,
                    fontSize: '15px', transition: 'all 0.2s'
                  }}
                >
                  <Wallet size={20} color={activeTab === 'wallet' ? 'var(--primary-yellow)' : '#94A3B8'} />
                  Portofel
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '16px', border: 'none', cursor: 'pointer',
                    backgroundColor: activeTab === 'settings' ? '#FFFDF0' : 'transparent',
                    color: activeTab === 'settings' ? '#0F172A' : '#64748B',
                    fontWeight: activeTab === 'settings' ? 800 : 600,
                    fontSize: '15px', transition: 'all 0.2s'
                  }}
                >
                  <Settings size={20} color={activeTab === 'settings' ? 'var(--primary-yellow)' : '#94A3B8'} />
                  Setări
                </button>
              </div>
            </div>

            <button
              onClick={onLogout}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px', borderRadius: '16px', border: '2px solid #F1F5F9', backgroundColor: '#FFFFFF', color: '#64748B', fontWeight: 700, fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              <LogOut size={18} />
              Deconectare
            </button>
          </div>

          {/* Main Content Area */}
          <div>
            
            {/* MY ADS TAB */}
            {activeTab === 'my_ads' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Anunțurile Mele</h2>
                  <div style={{ display: 'flex', gap: '8px', backgroundColor: '#FFFFFF', padding: '4px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <button onClick={() => setViewMode('grid')} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: viewMode === 'grid' ? '#F1F5F9' : 'transparent', color: viewMode === 'grid' ? '#0F172A' : '#94A3B8', cursor: 'pointer' }}>
                      <LayoutGrid size={18} />
                    </button>
                    <button onClick={() => setViewMode('list')} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: viewMode === 'list' ? '#F1F5F9' : 'transparent', color: viewMode === 'list' ? '#0F172A' : '#94A3B8', cursor: 'pointer' }}>
                      <List size={18} />
                    </button>
                  </div>
                </div>

                <div style={viewMode === 'grid' ? { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' } : { display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {myAds.map((ad) => (
                    <div key={ad.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: viewMode === 'grid' ? '16px' : '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: viewMode === 'grid' ? 'column' : 'row', gap: viewMode === 'grid' ? '16px' : '24px', border: '1px solid #F1F5F9' }}>
                      <div style={{ position: 'relative' }}>
                        <img src={ad.image} alt={ad.title} style={{ width: viewMode === 'grid' ? '100%' : '180px', height: viewMode === 'grid' ? '180px' : '140px', objectFit: 'cover', borderRadius: '16px' }} />
                        {viewMode === 'grid' && (
                          <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px' }}>
                            <span style={{ padding: '6px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 800, backgroundColor: ad.status === 'Activ' ? '#DCFCE7' : '#F1F5F9', color: ad.status === 'Activ' ? '#166534' : '#64748B', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                              {ad.status}
                            </span>
                            {ad.isPromoted && (
                              <span style={{ padding: '6px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 800, backgroundColor: '#FFFDF0', color: '#B45309', border: '1px solid var(--primary-yellow)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                👑 PROMOVAT
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', display: 'inline-block' }}>
                                {ad.category}
                              </span>
                              <h3 style={{ margin: '0 0 8px 0', fontSize: viewMode === 'grid' ? '18px' : '20px', fontWeight: 800, color: '#0F172A', lineHeight: 1.3 }}>
                                {ad.title}
                              </h3>
                            </div>
                            {viewMode === 'list' && (
                              <div style={{ fontSize: '22px', fontWeight: 900, color: '#E55B86' }}>
                                {ad.price} €
                              </div>
                            )}
                          </div>

                          {viewMode === 'list' && (
                            <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                              <span style={{ 
                                padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 800,
                                backgroundColor: ad.status === 'Activ' ? '#DCFCE7' : '#F1F5F9',
                                color: ad.status === 'Activ' ? '#166534' : '#64748B'
                              }}>
                                {ad.status}
                              </span>
                              {ad.isPromoted && (
                                <span style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 800, backgroundColor: '#FFFDF0', color: '#B45309', border: '1px solid var(--primary-yellow)' }}>
                                  PROMOVAT 👑
                                </span>
                              )}
                            </div>
                          )}

                          {viewMode === 'grid' && (
                            <div style={{ fontSize: '20px', fontWeight: 900, color: '#E55B86', marginBottom: '16px' }}>
                              {ad.price} €
                            </div>
                          )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: viewMode === 'list' ? '0' : 'auto' }}>
                          <div style={{ display: 'flex', gap: viewMode === 'grid' ? '16px' : '20px', color: '#64748B', fontSize: '13px', fontWeight: viewMode === 'grid' ? 700 : 600, marginBottom: viewMode === 'grid' ? '16px' : '0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Eye size={14} /> {ad.views} {viewMode === 'list' && 'vizualizări'}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Heart size={14} /> {ad.favorites} {viewMode === 'list' && 'salvări'}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MessageCircle size={14} /> {ad.messages} {viewMode === 'list' && 'mesaje'}</div>
                          </div>
                          
                          <div style={{ display: viewMode === 'grid' ? 'grid' : 'flex', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <button style={{ padding: viewMode === 'grid' ? '12px' : '10px 20px', borderRadius: '12px', border: '2px solid #E2E8F0', backgroundColor: '#FFFFFF', fontSize: '14px', fontWeight: 700, color: '#0F172A', cursor: 'pointer' }}>
                              Editează
                            </button>
                            <button style={{ padding: viewMode === 'grid' ? '12px' : '10px 20px', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary-yellow)', fontSize: '14px', fontWeight: 800, color: '#0F172A', cursor: 'pointer' }}>
                              Promovează
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGES TAB */}
            {activeTab === 'messages' && (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '60px 24px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
                  <MessageCircle size={40} color="#CBD5E1" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>Nu ai mesaje noi</h3>
                <p style={{ color: '#64748B', maxWidth: '400px', margin: '0 auto' }}>Când cumpărătorii te vor contacta în legătură cu anunțurile tale, mesajele vor apărea aici.</p>
              </div>
            )}

            {/* FAVORITES TAB */}
            {activeTab === 'favorites' && (
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', marginBottom: '24px' }}>Anunțuri Favorite</h2>
                {wishlist.length === 0 ? (
                  <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '60px 24px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
                      <Heart size={40} color="#CBD5E1" />
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>Lista ta este goală</h3>
                    <p style={{ color: '#64748B', maxWidth: '400px', margin: '0 auto 24px auto' }}>Salvează anunțurile care te interesează pentru a le găsi mai ușor mai târziu.</p>
                    <button onClick={onBackToStore} style={{ padding: '14px 28px', borderRadius: '20px', border: 'none', backgroundColor: '#0F172A', color: '#FFF', fontSize: '15px', fontWeight: 800, cursor: 'pointer' }}>
                      Descoperă Anunțuri
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {wishlist.map((product) => (
                      <div key={product.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '16px', display: 'flex', gap: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                        <div style={{ position: 'relative' }}>
                          <img src={product.image} alt={product.title} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '16px' }} />
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            style={{ position: 'absolute', top: '8px', right: '8px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                          >
                            <Trash2 size={16} color="#E55B86" />
                          </button>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '4px 0' }}>
                          <div>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>{product.category}</span>
                            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '4px 0 8px 0', lineHeight: 1.3 }}>{product.title}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748B' }}>
                              <MapPin size={12} /> București
                            </div>
                          </div>
                          <div style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A' }}>
                            {product.price} €
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* WALLET TAB */}
            {activeTab === 'wallet' && (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', marginBottom: '32px' }}>Portofelul Meu</h2>
                
                <div style={{ display: 'flex', gap: '24px', marginBottom: '40px' }}>
                  <div style={{ flex: 1, backgroundColor: '#0F172A', borderRadius: '24px', padding: '32px', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#94A3B8', marginBottom: '8px' }}>Credit Disponibil</div>
                      <div style={{ fontSize: '48px', fontWeight: 900, marginBottom: '24px' }}>{userProfile.credits} <span style={{ fontSize: '24px', color: 'var(--primary-yellow)' }}>monede</span></div>
                      <button style={{ padding: '12px 24px', borderRadius: '16px', border: 'none', backgroundColor: 'var(--primary-yellow)', color: '#0F172A', fontSize: '15px', fontWeight: 800, cursor: 'pointer' }}>
                        Cumpără Credit
                      </button>
                    </div>
                    <TrendingUp size={160} color="#1E293B" style={{ position: 'absolute', right: '-20px', bottom: '-40px', zIndex: 1, opacity: 0.5 }} />
                  </div>

                  <div style={{ flex: 1, backgroundColor: '#F8FAFC', borderRadius: '24px', padding: '32px', border: '2px dashed #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                      <Eye size={24} color="#E55B86" />
                    </div>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>Promovează-ți anunțurile</h4>
                    <p style={{ fontSize: '13px', color: '#64748B', margin: 0, maxWidth: '200px' }}>Folosește monedele pentru a ajunge la mai mulți cumpărători.</p>
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', marginBottom: '32px' }}>Setări Cont</h2>
                
                <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Nume Complet</label>
                    <input type="text" defaultValue={userProfile.name} style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #E2E8F0', fontSize: '15px', fontWeight: 600, color: '#0F172A', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Adresă de Email</label>
                    <input type="email" defaultValue={userProfile.email} style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #E2E8F0', fontSize: '15px', fontWeight: 600, color: '#0F172A', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Număr Telefon</label>
                    <input type="tel" defaultValue={userProfile.phone} style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #E2E8F0', fontSize: '15px', fontWeight: 600, color: '#0F172A', outline: 'none' }} />
                  </div>
                  
                  <button style={{ marginTop: '12px', padding: '16px', borderRadius: '16px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '15px', fontWeight: 800, cursor: 'pointer' }}>
                    Salvează Modificările
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};
