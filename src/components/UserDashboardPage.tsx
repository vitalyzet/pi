import React, { useState, useEffect } from 'react';
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
  List,
  ShoppingBag,
  CreditCard,
  User,
  Image as ImageIcon,
  LayoutDashboard,
  Package,
  Users,
  DollarSign,
  ArrowUpRight,
  Search,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Shield,
  Save,
  Crown
} from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';
import { AvatarSelectionModal, AVATARS } from './AvatarSelectionModal';

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

interface UserDashboardPageProps {
  currentUser?: { id?: string, name: string, email: string, type: string } | null;
  onBackToStore: () => void;
  onLogout: () => void;
  userAds?: Product[];
  favorites?: Product[];
  onToggleFavorite?: (product: Product) => void;
  onViewProduct?: (product: Product) => void;
  onUpdateAnnouncement?: (text: string) => void;
  announcementText?: string;
  onAddProduct?: (product: Product) => void;
  userAvatarIndex?: number;
  onAvatarChange?: (index: number) => void;
  initialTab?: string;
}

type TabType = 'my_ads' | 'messages' | 'favorites' | 'wallet' | 'settings' | 'vip' | 'admin_overview' | 'admin_orders' | 'admin_products' | 'admin_customers' | 'admin_settings';

export const UserDashboardPage: React.FC<UserDashboardPageProps> = ({
  currentUser,
  onBackToStore,
  onLogout,
  onViewProduct,
  userAds = [],
  favorites = [],
  onToggleFavorite,
  userAvatarIndex = 0,
  onAvatarChange,
  initialTab = 'my_ads',
  announcementText = '',
  onUpdateAnnouncement,
  onAddProduct
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab as TabType);
  
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab as TabType);
  }, [initialTab]);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // Admin states
  const currentUserNameForOrders = currentUser?.name || 'Andrei Popescu';
  const [orders, setOrders] = useState<AdminOrder[]>(
    currentUserNameForOrders === 'Andrei Popescu' ? INITIAL_ADMIN_ORDERS : []
  );
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState(announcementText);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newPinTitle, setNewPinTitle] = useState('');
  const [newPinPrice, setNewPinPrice] = useState(30);
  const [newPinOriginalPrice, setNewPinOriginalPrice] = useState(40);
  const [newPinCategory, setNewPinCategory] = useState('Animale');
  const [newPinDiscount, setNewPinDiscount] = useState(25);
  
  // VIP States
  const [selectedVipPlan, setSelectedVipPlan] = useState<'1_luna' | '3_luni' | '12_luni' | null>(null);
  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [billingType, setBillingType] = useState<'fizica' | 'juridica'>('fizica');
  const [showAddBillingModal, setShowAddBillingModal] = useState(false);
  
  const [billingDetails, setBillingDetails] = useState({
    nume: 'Alexandru bugeag',
    judet: 'Olt',
    localitate: 'Scornicesti',
    strada: 'sat negreni, 32',
    numeFirma: '',
    cui: ''
  });
  
  const [modalForm, setModalForm] = useState({
    nume: '',
    judet: '',
    strada: '',
    numeFirma: '',
    cui: '',
    neplatitorTVA: false
  });

  const handleSaveNewBilling = () => {
    setBillingDetails({
      nume: billingType === 'fizica' ? (modalForm.nume || 'Nume Nesetat') : (modalForm.numeFirma || 'Companie Nesetata'),
      judet: modalForm.judet || 'Bucuresti',
      localitate: 'Localitate', // default placeholder
      strada: modalForm.strada || 'Strada Nesetata',
      numeFirma: modalForm.numeFirma,
      cui: modalForm.cui
    });
    setShowAddBillingModal(false);
    setIsEditingBilling(false);
  };

  const handleAvatarClick = () => {
    setIsAvatarModalOpen(true);
  };
  
  const userProfile = {
    name: currentUser?.name || 'Andrei Popescu',
    email: currentUser?.email || 'andrei.popescu@exemplu.ro',
    phone: '+40 722 123 456',
    memberSince: '14 Mai 2026',
    credits: 1500
  };

  const removeFromWishlist = (product: Product) => {
    if (onToggleFavorite) onToggleFavorite(product);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: AdminOrder['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
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
      category: 'Auto',
      color: 'Roșu',
      feeling: 'Sporty',
      design: 'Modern',
      description: 'Pin nou adăugat din panoul de administrare PinPin.',
      seller: {
        name: ['Andrei Popescu', 'Maria Radu', 'Ionuț Dumitru', 'Elena Ionescu', 'Cristian Matei', 'Diana Stoica', 'Florin Tudor', 'Alina Marin', 'George Vasile', 'Ioana Mihai', 'Mihai Stan', 'Ana Georgescu', 'Răzvan Ilie', 'Gabriela Enache', 'Bogdan Toma', 'Simona Barbu'][Math.floor(Math.random() * 16)],
        avatar: ['https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'][Math.floor(Math.random() * 4)],
        rating: Number((4.5 + Math.random() * 0.5).toFixed(1)),
        reviews: Math.floor(Math.random() * 50) + 1,
        joined: '2026'
      }
    };

    setProductsList([newProduct, ...productsList]);
    if (onAddProduct) onAddProduct(newProduct);
    setIsAddProductModalOpen(false);
    setNewPinTitle('');
    alert('Pin-ul a fost adăugat cu succes în magazin!');
  };

  const filteredOrders = orders.filter(
    (o) => o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.customer.toLowerCase().includes(searchQuery.toLowerCase()) || o.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentUserName = currentUser?.name || 'Alexandru B.';
  const myAds: MyAd[] = userAds
    .filter(p => p.seller?.name === currentUserName)
    .map(p => ({
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
    }));

  // Show MOCK_MY_ADS only if it's the default mock user
  if (myAds.length === 0 && currentUserName === 'Alexandru B.') {
    myAds.push(...MOCK_MY_ADS);
  }

  const getBreadcrumbName = () => {
    switch (activeTab) {
      case 'my_ads': return 'Anunțurile mele';
      case 'messages': return 'Mesaje';
      case 'favorites': return 'Anunțuri Favorite';
      case 'wallet': return 'Portofel & Promovare';
      case 'settings': return 'Setări Cont';
      case 'admin_overview': return 'Tablou de Comandă Magazin';
      case 'admin_orders': return 'Gestiune Comenzi';
      case 'admin_products': return 'Gestiune Produse';
      case 'admin_customers': return 'Clienți Registrați';
      case 'admin_settings': return 'Setări Magazin';
      default: return 'Contul meu';
    }
  };

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
            {getBreadcrumbName()}
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
                <div 
                  onClick={handleAvatarClick}
                  style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--primary-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A', fontSize: '24px', fontWeight: 800, cursor: 'pointer', overflow: 'hidden' }}
                >
                  {AVATARS[userAvatarIndex] === 'initials' ? (
                    userProfile.name.split(' ').map(n => n[0]).join('').substring(0, 2)
                  ) : (
                    <img src={AVATARS[userAvatarIndex]} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>{userProfile.name}</h3>
                  <div style={{ fontSize: '13px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <ShieldCheck size={14} color="#10B981" />
                    Cont Verificat
                  </div>
                  {currentUser?.id && (
                    <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>
                      ID: #{currentUser.id}
                    </div>
                  )}
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
                  Setări Cont
                </button>

                <button
                  onClick={() => setActiveTab('vip')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '16px', border: 'none', cursor: 'pointer',
                    backgroundColor: activeTab === 'vip' ? '#FFFDF0' : 'transparent',
                    color: activeTab === 'vip' ? '#0F172A' : '#64748B',
                    fontWeight: activeTab === 'vip' ? 800 : 600,
                    fontSize: '15px', transition: 'all 0.2s'
                  }}
                >
                  <Crown size={20} color={activeTab === 'vip' ? 'var(--primary-yellow)' : '#94A3B8'} />
                  Abonamente VIP
                </button>

                {/* MODA ADMIN SECTION */}
                {currentUser?.email === 'alexandruzet29@gmail.com' && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '16px' }}>
                      Magazin Modă
                    </div>
                    
                    <button
                      onClick={() => setActiveTab('admin_overview')}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '16px', border: 'none', cursor: 'pointer',
                        backgroundColor: activeTab === 'admin_overview' ? 'var(--primary-yellow)' : 'transparent',
                        color: activeTab === 'admin_overview' ? '#0F172A' : '#64748B',
                        fontWeight: activeTab === 'admin_overview' ? 800 : 600,
                        fontSize: '15px', transition: 'all 0.2s', width: '100%'
                      }}
                    >
                      <LayoutDashboard size={20} color={activeTab === 'admin_overview' ? '#0F172A' : '#94A3B8'} />
                      Tablou Comandă
                    </button>

                    <button
                      onClick={() => setActiveTab('admin_orders')}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '16px', border: 'none', cursor: 'pointer',
                        backgroundColor: activeTab === 'admin_orders' ? 'var(--primary-yellow)' : 'transparent',
                        color: activeTab === 'admin_orders' ? '#0F172A' : '#64748B',
                        fontWeight: activeTab === 'admin_orders' ? 800 : 600,
                        fontSize: '15px', transition: 'all 0.2s', width: '100%'
                      }}
                    >
                      <ShoppingBag size={20} color={activeTab === 'admin_orders' ? '#0F172A' : '#94A3B8'} />
                      Comenzi <span style={{ marginLeft: 'auto', fontSize: '12px' }}>({orders.length})</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('admin_products')}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '16px', border: 'none', cursor: 'pointer',
                        backgroundColor: activeTab === 'admin_products' ? 'var(--primary-yellow)' : 'transparent',
                        color: activeTab === 'admin_products' ? '#0F172A' : '#64748B',
                        fontWeight: activeTab === 'admin_products' ? 800 : 600,
                        fontSize: '15px', transition: 'all 0.2s', width: '100%'
                      }}
                    >
                      <Package size={20} color={activeTab === 'admin_products' ? '#0F172A' : '#94A3B8'} />
                      Produse <span style={{ marginLeft: 'auto', fontSize: '12px' }}>({productsList.length})</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('admin_customers')}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '16px', border: 'none', cursor: 'pointer',
                        backgroundColor: activeTab === 'admin_customers' ? 'var(--primary-yellow)' : 'transparent',
                        color: activeTab === 'admin_customers' ? '#0F172A' : '#64748B',
                        fontWeight: activeTab === 'admin_customers' ? 800 : 600,
                        fontSize: '15px', transition: 'all 0.2s', width: '100%'
                      }}
                    >
                      <Users size={20} color={activeTab === 'admin_customers' ? '#0F172A' : '#94A3B8'} />
                      Clienți
                    </button>

                    <button
                      onClick={() => setActiveTab('admin_settings')}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '16px', border: 'none', cursor: 'pointer',
                        backgroundColor: activeTab === 'admin_settings' ? 'var(--primary-yellow)' : 'transparent',
                        color: activeTab === 'admin_settings' ? '#0F172A' : '#64748B',
                        fontWeight: activeTab === 'admin_settings' ? 800 : 600,
                        fontSize: '15px', transition: 'all 0.2s', width: '100%'
                      }}
                    >
                      <Settings size={20} color={activeTab === 'admin_settings' ? '#0F172A' : '#94A3B8'} />
                      Setări Magazin
                    </button>
                  </div>
                )}
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

                <div style={viewMode === 'grid' ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' } : { display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {myAds.map((ad) => (
                    <div key={ad.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: viewMode === 'grid' ? '12px' : '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: viewMode === 'grid' ? 'column' : 'row', gap: viewMode === 'grid' ? '12px' : '24px', border: '1px solid #F1F5F9' }}>
                      <div style={{ position: 'relative' }}>
                        <img src={ad.image} alt={ad.title} style={{ width: viewMode === 'grid' ? '100%' : '180px', height: viewMode === 'grid' ? '160px' : '140px', objectFit: 'cover', borderRadius: '14px' }} />
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
                              <h3 style={{ margin: '0 0 6px 0', fontSize: viewMode === 'grid' ? '16px' : '20px', fontWeight: 800, color: '#0F172A', lineHeight: 1.3 }}>
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
                                  PROMOVAT
                                </span>
                              )}
                            </div>
                          )}

                          {viewMode === 'grid' && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                              <div style={{ fontSize: '18px', fontWeight: 900, color: '#E55B86' }}>
                                {ad.price} €
                              </div>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button style={{ padding: '8px 12px', borderRadius: '10px', border: '2px solid #E2E8F0', backgroundColor: '#FFFFFF', fontSize: '12px', fontWeight: 700, color: '#0F172A', cursor: 'pointer' }}>
                                  Editează
                                </button>
                                <button style={{ padding: '8px 12px', borderRadius: '10px', border: 'none', backgroundColor: 'var(--primary-yellow)', fontSize: '12px', fontWeight: 800, color: '#0F172A', cursor: 'pointer' }}>
                                  Promovează
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: viewMode === 'list' ? '0' : 'auto' }}>
                          <div style={{ display: 'flex', gap: viewMode === 'grid' ? '12px' : '20px', color: '#64748B', fontSize: '12px', fontWeight: viewMode === 'grid' ? 700 : 600 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Eye size={14} /> {ad.views} {viewMode === 'list' && 'vizualizări'}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Heart size={14} /> {ad.favorites} {viewMode === 'list' && 'salvări'}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MessageCircle size={14} /> {ad.messages} {viewMode === 'list' && 'mesaje'}</div>
                          </div>
                          
                          {viewMode === 'list' && (
                            <div style={{ display: 'flex', gap: '12px' }}>
                              <button style={{ padding: '10px 20px', borderRadius: '12px', border: '2px solid #E2E8F0', backgroundColor: '#FFFFFF', fontSize: '14px', fontWeight: 700, color: '#0F172A', cursor: 'pointer' }}>
                                Editează
                              </button>
                              <button style={{ padding: '10px 20px', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary-yellow)', fontSize: '14px', fontWeight: 800, color: '#0F172A', cursor: 'pointer' }}>
                                Promovează
                              </button>
                            </div>
                          )}
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
                {favorites.length === 0 ? (
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
                    {favorites.map((product) => (
                      <div key={product.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '16px', display: 'flex', gap: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                        <div style={{ position: 'relative' }}>
                          <img src={product.image} alt={product.title} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '16px' }} />
                          <button
                            onClick={() => removeFromWishlist(product)}
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
            
            {/* PLATFORM: SUBSCRIPTIONS */}
            {activeTab === 'vip' && selectedVipPlan && (
              <div style={{ backgroundColor: '#F8FAFC', borderRadius: '16px', overflow: 'hidden', maxWidth: '850px', margin: '0 auto', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0' }}>
                {/* Header */}
                <div style={{ backgroundColor: '#FFF', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
                  <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#0284C7' }}>Detalii comandă</h2>
                  <button onClick={() => setSelectedVipPlan(null)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#FFF', fontWeight: 600, cursor: 'pointer', color: '#64748B' }}>Înapoi</button>
                </div>

                <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {/* Subscription Details */}
                  <div>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: '#1E293B' }}>
                      Abonament VIP {selectedVipPlan === '12_luni' ? '12 luni' : selectedVipPlan === '3_luni' ? '3 luni' : '1 luna'}
                    </h3>
                    <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                      <p style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: '#1E293B' }}>
                        Abonament VIP {selectedVipPlan === '12_luni' ? '12 luni' : selectedVipPlan === '3_luni' ? '3 luni' : '1 luna'}
                      </p>
                      <p style={{ margin: 0, fontSize: '15px', color: '#475569' }}>
                        Cost (TVA inclus): <span style={{ color: '#0284C7', fontWeight: 900, fontSize: '18px' }}>
                          {selectedVipPlan === '12_luni' ? '29.88 EUR (160.17 RON)' : selectedVipPlan === '3_luni' ? '11.97 EUR (59.49 RON)' : '4.99 EUR (24.80 RON)'}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Billing Details */}
                  <div>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: '#1E293B' }}>Date facturare</h3>
                    {isEditingBilling ? (
                      <div style={{ backgroundColor: '#F8FAFC', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingRight: '24px' }}>
                          <div style={{ display: 'flex' }}>
                            <div 
                              onClick={() => setBillingType('fizica')}
                              style={{ 
                                cursor: 'pointer',
                                backgroundColor: billingType === 'fizica' ? '#FFF' : 'transparent', 
                                padding: '16px 32px', 
                                fontWeight: billingType === 'fizica' ? 800 : 500, 
                                fontSize: '16px', 
                                color: billingType === 'fizica' ? '#0F172A' : '#1E293B', 
                                borderRight: '1px solid #E2E8F0', 
                                borderTopLeftRadius: '12px',
                                borderBottom: billingType === 'fizica' ? 'none' : '1px solid #E2E8F0'
                              }}
                            >
                              Persoană fizică
                            </div>
                            <div 
                              onClick={() => setBillingType('juridica')}
                              style={{ 
                                cursor: 'pointer',
                                backgroundColor: billingType === 'juridica' ? '#FFF' : 'transparent', 
                                padding: '16px 32px', 
                                fontWeight: billingType === 'juridica' ? 800 : 500, 
                                fontSize: '16px', 
                                color: billingType === 'juridica' ? '#0F172A' : '#1E293B',
                                borderBottom: billingType === 'juridica' ? 'none' : '1px solid #E2E8F0',
                                borderRight: billingType === 'juridica' ? '1px solid #E2E8F0' : 'none'
                              }}
                            >
                              Persoană juridică
                            </div>
                          </div>
                          <button onClick={() => setShowAddBillingModal(true)} style={{ backgroundColor: '#0284C7', color: '#FFF', border: 'none', borderRadius: '6px', padding: '10px 16px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Adauga date facturare</button>
                        </div>
                        
                        {billingType === 'fizica' ? (
                          <div style={{ padding: '40px 32px', display: 'flex', alignItems: 'center', gap: '32px', backgroundColor: '#FFF' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0284C7' }}></div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <span style={{ fontSize: '15px', color: '#0F172A', fontWeight: 500, alignSelf: 'flex-start', marginTop: '6px' }}>Nume:</span>
                              <span style={{ color: '#0284C7', fontWeight: 800, fontSize: '24px', lineHeight: 1.1 }}>{billingDetails.nume.split(' ').map((w, i) => <span key={i}>{w}<br/></span>)}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '15px', color: '#0F172A' }}>
                              <span>Județ: <strong>{billingDetails.judet}</strong></span>
                              <span>Localitate: <strong>{billingDetails.localitate}</strong></span>
                              <span>Strada: <strong>{billingDetails.strada}</strong></span>
                            </div>
                          </div>
                        ) : (
                          <div style={{ padding: '40px 32px', display: 'flex', alignItems: 'center', gap: '32px', backgroundColor: '#FFF', minHeight: '135px' }}>
                            <h4 style={{ margin: '0 0 0 16px', fontSize: '18px', fontWeight: 800, color: '#1E293B' }}>Nu ai date de facturare!</h4>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ backgroundColor: '#FFF', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                        <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                          <span style={{ color: '#64748B', fontSize: '14px' }}>Am preluat datele de facturare de la ultima comandă</span>
                          <button onClick={() => setIsEditingBilling(true)} style={{ backgroundColor: '#0284C7', color: '#FFF', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Schimba date facturare</button>
                        </div>
                        <div style={{ padding: '32px 24px', display: 'flex', gap: '80px', alignItems: 'center' }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span style={{ fontSize: '15px', color: '#0F172A', fontWeight: 500 }}>Nume:</span>
                            <span style={{ color: '#0284C7', fontWeight: 800, fontSize: '18px' }}>{billingDetails.nume}</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px', color: '#1E293B' }}>
                            <span>Județ: <strong>{billingDetails.judet}</strong></span>
                            <span>Localitate: <strong>{billingDetails.localitate}</strong></span>
                            <span>Strada: <strong>{billingDetails.strada}</strong></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: '#1E293B' }}>Modalitate de plată</h3>
                    <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                          <div style={{ border: '1px solid #CBD5E1', borderRadius: '6px', padding: '4px 8px' }}>
                            <CreditCard size={24} color="#64748B" />
                          </div>
                          <div>
                            <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 800, color: '#64748B' }}>Card online</h4>
                            <p style={{ margin: 0, fontSize: '14px', color: '#94A3B8' }}>Plătești imediat, fără costuri suplimentare.</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontWeight: 900, fontSize: '16px' }}>
                          <span style={{ color: '#1A1F71' }}>VISA</span>
                          <span style={{ color: '#EB001B' }}>Mastercard</span>
                          <span style={{ color: '#4285F4' }}>G Pay</span>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '32px' }}>
                        <div style={{ backgroundColor: '#0284C7', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#FFF', fontWeight: 900, fontSize: '12px' }}>i</div>
                        <p style={{ margin: 0, fontSize: '15px', color: '#1E293B', lineHeight: 1.4 }}>
                          <strong>Nu ai încă un card salvat.</strong> Alege salvarea cardului și bucură-te de fiecare tranzacție realizată cu succes. Plătești simplu, rapid și sigur cu un singur click
                        </p>
                      </div>
                      
                      <div style={{ backgroundColor: '#FFFAF0', border: '1px solid #FEF08A', borderRadius: '12px', padding: '24px', margin: '0 auto', maxWidth: '400px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', marginBottom: '20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ backgroundColor: '#0284C7', padding: '6px', borderRadius: '4px' }}>
                              <CreditCard size={20} color="#FFF" />
                            </div>
                            <span style={{ color: '#0284C7', fontWeight: 800, fontSize: '15px', maxWidth: '160px', lineHeight: 1.2 }}>Salvează cardul și plătește cu un singur click</span>
                          </div>
                          <div style={{ width: '20px', height: '20px', borderRadius: '6px', border: '2px solid #94A3B8', backgroundColor: '#FFF' }}></div>
                        </label>
                        
                        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderTop: '1px solid #FEF08A', paddingTop: '20px' }}>
                          <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1px solid #94A3B8', backgroundColor: '#FFF' }}></div>
                          <span style={{ fontSize: '15px', color: '#1E293B' }}>Plătește cu alt card</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Voucher */}
                  <div>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ display: 'inline-flex', backgroundColor: '#000', borderRadius: '50%', width: '20px', height: '20px', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '12px' }}>%</span> Voucher
                    </h3>
                    <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                      <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 800, color: '#1E293B' }}>Introdu un cod de voucher aici</h4>
                      <input type="text" placeholder="Introdu codul" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px', width: '300px', marginBottom: '16px', display: 'block', outline: 'none' }} />
                      <button style={{ backgroundColor: '#0284C7', color: '#FFF', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Aplică voucher</button>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <p style={{ fontSize: '13px', color: '#64748B', fontStyle: 'italic', margin: '0 0 8px 0' }}>* Vei fi redirectat către o pagină de plată pentru a finaliza tranzacția.</p>
                    <p style={{ fontSize: '13px', color: '#64748B', fontStyle: 'italic', margin: '0 0 32px 0' }}>*Mai multe informații în <span style={{ color: '#0284C7', cursor: 'pointer' }}>prețuri și modalități de plată</span></p>
                    <button style={{ backgroundColor: '#65A30D', color: '#FFF', border: 'none', borderRadius: '8px', padding: '16px 32px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(101,163,13,0.3)' }}>
                      Continuă către plată
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'vip' && !selectedVipPlan && (
              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 4px 0' }}>Plăți Abonamente PRO</h3>
                    <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Istoricul plăților lunare efectuate de utilizatorii cu abonament PRO.</p>
                  </div>
                </div>

                {/* VIP Subscription Plans Overview */}
                <div style={{ display: 'flex', gap: '24px', margin: '0 auto 32px auto', maxWidth: '700px' }}>
                  {/* Basic VIP */}
                  <div style={{ flex: 1, backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '32px 0', borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
                      <img src="/light.svg" alt="VIP Light" style={{ width: '80px', height: '80px', margin: '0 auto', display: 'block', borderRadius: '50%', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} />
                    </div>
                    <div style={{ padding: '24px 20px', flex: 1, background: 'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(15, 23, 42, 0.03) 40px, rgba(15, 23, 42, 0.03) 80px, transparent 80px, transparent 120px, rgba(15, 23, 42, 0.03) 120px, rgba(15, 23, 42, 0.03) 160px, transparent 160px, transparent 210px, rgba(15, 23, 42, 0.03) 210px, rgba(15, 23, 42, 0.03) 220px)' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', color: '#0284C7', marginBottom: '16px' }}>
                        <span style={{ fontSize: '48px', fontWeight: 900, lineHeight: 1 }}>4</span>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1 }}>99€</span>
                          <span style={{ fontSize: '16px', fontWeight: 700, marginTop: '2px' }}>/ lună</span>
                        </div>
                      </div>
                      <div style={{ width: '80%', margin: '0 auto 16px auto', borderBottom: '1px solid #E2E8F0' }}></div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>
                        <img src="/diamond.svg" alt="diamond" style={{ width: '18px', height: '18px' }} />
                        pentru 1 luna
                      </div>
                    </div>
                    <div style={{ padding: '0 20px 24px 20px' }}>
                      <button onClick={() => setSelectedVipPlan('1_luna')} style={{ width: '100%', padding: '12px', backgroundColor: '#0284C7', color: '#FFF', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>ACTIVEAZA</button>
                    </div>
                  </div>

                  {/* Popular VIP */}
                  <div style={{ flex: 1, backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', textAlign: 'center', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                    <div style={{ padding: '32px 0', borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
                      <img src="/normal.svg" alt="VIP Normal" style={{ width: '80px', height: '80px', margin: '0 auto', display: 'block', borderRadius: '50%', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} />
                    </div>
                    <div style={{ padding: '24px 20px', flex: 1, background: 'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(15, 23, 42, 0.03) 40px, rgba(15, 23, 42, 0.03) 80px, transparent 80px, transparent 120px, rgba(15, 23, 42, 0.03) 120px, rgba(15, 23, 42, 0.03) 160px, transparent 160px, transparent 210px, rgba(15, 23, 42, 0.03) 210px, rgba(15, 23, 42, 0.03) 220px)' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', color: '#0284C7', marginBottom: '16px' }}>
                        <span style={{ fontSize: '48px', fontWeight: 900, lineHeight: 1 }}>3</span>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1 }}>99€</span>
                          <span style={{ fontSize: '16px', fontWeight: 700, marginTop: '2px' }}>/ lună</span>
                        </div>
                      </div>
                      <div style={{ width: '80%', margin: '0 auto 16px auto', borderBottom: '1px solid #E2E8F0' }}></div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ display: 'flex' }}><img src="/diamond.svg" alt="diamond" style={{ width: '18px', height: '18px' }} /><img src="/diamond.svg" alt="diamond" style={{ width: '18px', height: '18px', marginLeft: '-10px' }} /></div>
                          pentru 3 luni
                        </div>
                        <div>reducere de 20%</div>
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#F0F9FF', padding: '12px', fontSize: '14px', fontWeight: 900, color: '#0284C7' }}>
                      CEL MAI POPULAR
                    </div>
                    <div style={{ padding: '20px' }}>
                      <button onClick={() => setSelectedVipPlan('3_luni')} style={{ width: '100%', padding: '12px', backgroundColor: '#0284C7', color: '#FFF', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>ACTIVEAZA</button>
                    </div>
                  </div>

                  {/* Advantageous VIP */}
                  <div style={{ flex: 1, backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #1E293B', overflow: 'hidden', textAlign: 'center', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)' }}>
                    <div style={{ padding: '32px 0', borderBottom: '1px solid #1E293B', backgroundColor: '#1E293B' }}>
                      <img src="/strong.svg" alt="VIP Strong" style={{ width: '80px', height: '80px', margin: '0 auto', display: 'block', borderRadius: '50%', boxShadow: '0 0 0 8px rgba(100, 116, 139, 0.25), 0 0 0 16px rgba(100, 116, 139, 0.15), 0 4px 10px rgba(0,0,0,0.5)' }} />
                    </div>
                    <div style={{ padding: '24px 20px', flex: 1, background: 'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255, 255, 255, 0.03) 40px, rgba(255, 255, 255, 0.03) 80px, transparent 80px, transparent 120px, rgba(255, 255, 255, 0.03) 120px, rgba(255, 255, 255, 0.03) 160px, transparent 160px, transparent 210px, rgba(255, 255, 255, 0.03) 210px, rgba(255, 255, 255, 0.03) 220px)' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', color: '#0284C7', marginBottom: '16px' }}>
                        <span style={{ fontSize: '48px', fontWeight: 900, lineHeight: 1 }}>2</span>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1 }}>49€</span>
                          <span style={{ fontSize: '16px', fontWeight: 700, marginTop: '2px' }}>/ lună</span>
                        </div>
                      </div>
                      <div style={{ width: '80%', margin: '0 auto 16px auto', borderBottom: '1px solid #E2E8F0' }}></div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ display: 'flex' }}><img src="/diamond.svg" alt="diamond" style={{ width: '18px', height: '18px' }} /><img src="/diamond.svg" alt="diamond" style={{ width: '18px', height: '18px', marginLeft: '-10px' }} /><img src="/diamond.svg" alt="diamond" style={{ width: '18px', height: '18px', marginLeft: '-10px' }} /></div>
                          pentru 12 luni
                        </div>
                        <div>reducere de 50%</div>
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#475569', padding: '12px', fontSize: '14px', fontWeight: 900, color: '#FFF' }}>
                      CEL MAI AVANTAJOS
                    </div>
                    <div style={{ padding: '20px' }}>
                      <button onClick={() => setSelectedVipPlan('12_luni')} style={{ width: '100%', padding: '12px', backgroundColor: '#0284C7', color: '#FFF', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>ACTIVEAZA</button>
                    </div>
                  </div>
                </div>

                {/* VIP Benefits Card */}
                <div style={{ maxWidth: '700px', margin: '0 auto 32px auto', backgroundColor: '#FFF', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)', display: 'flex', alignItems: 'center', gap: '48px' }}>
                  <div style={{ flexShrink: 0 }}>
                    <img src="/normal.svg" alt="VIP Badge" style={{ width: '160px', height: '160px', display: 'block' }} />
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 24px 0', fontSize: '24px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Profită de beneficiile 
                      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '4px' }}>
                        <Crown size={16} color="#F59E0B" fill="#F59E0B" style={{ marginBottom: '-4px' }} />
                        <span style={{ fontSize: '28px', fontWeight: 900, lineHeight: 1 }}>VIP</span>
                      </div>
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', color: '#4B5563', fontWeight: 500 }}>
                        <img src="/diamond.svg" alt="diamond" style={{ width: '20px', height: '20px', marginTop: '2px' }} />
                        Insignă Statut VIP
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', color: '#4B5563', fontWeight: 500 }}>
                        <img src="/diamond.svg" alt="diamond" style={{ width: '20px', height: '20px', marginTop: '2px' }} />
                        Mesaje nelimitate
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', color: '#4B5563', fontWeight: 500 }}>
                        <img src="/diamond.svg" alt="diamond" style={{ width: '20px', height: '20px', marginTop: '2px' }} />
                        De 2X mai multe poze la anunțurile tale
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', color: '#4B5563', fontWeight: 500 }}>
                        <img src="/diamond.svg" alt="diamond" style={{ width: '20px', height: '20px', marginTop: '2px' }} />
                        Mesajele tale în topul căsuței destinatarului
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '16px', color: '#4B5563', fontWeight: 500 }}>
                        <img src="/diamond.svg" alt="diamond" style={{ width: '20px', height: '20px', marginTop: '2px' }} />
                        Notificări în timp real la căutari salvate și anunțuri favorite
                      </li>
                    </ul>
                  </div>
                </div>

                <p style={{ maxWidth: '700px', margin: '0 auto 32px auto', fontSize: '14px', color: '#6B7280', textAlign: 'left', lineHeight: 1.5 }}>
                  Prin activarea abonamentului VIP, confirmați acceptarea <span style={{ color: '#0284C7', cursor: 'pointer' }}>termenilor și condițiilor</span> aplicabile acestui serviciu.
                </p>
              </div>
            )}
            
            {/* ====== ADMIN SECTION TABS ====== */}
            
            {/* ADMIN OVERVIEW */}
            {activeTab === 'admin_overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Tablou de Comandă Magazin</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748B', marginBottom: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>Vânzări Luna Aceasta</span>
                      <DollarSign size={20} color="#10B981" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>14,850 €</div>
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
                          <td style={{ padding: '14px 12px', fontWeight: 800, color: 'var(--pink-accent)' }}>{order.total} €</td>
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
              </div>
            )}

            {/* ADMIN ORDERS */}
            {activeTab === 'admin_orders' && (
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
                        <td style={{ padding: '14px 12px', fontWeight: 800, color: 'var(--pink-accent)' }}>{order.total} €</td>
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

            {/* ADMIN PRODUCTS */}
            {activeTab === 'admin_products' && (
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
                          <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--pink-accent)' }}>{product.price} €</span>
                          <span style={{ fontSize: '12px', color: '#94A3B8', textDecoration: 'line-through' }}>{product.originalPrice} €</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADMIN CUSTOMERS */}
            {activeTab === 'admin_customers' && (
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
                      <td style={{ padding: '14px 12px', fontWeight: 800, color: 'var(--pink-accent)' }}>340 €</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #F1F5F9', fontSize: '14px' }}>
                      <td style={{ padding: '14px 12px', fontWeight: 800 }}>Andrei Ionescu</td>
                      <td style={{ padding: '14px 12px', color: '#64748B' }}>andrei.i@gmail.com</td>
                      <td style={{ padding: '14px 12px', fontWeight: 700 }}>4 comenzi</td>
                      <td style={{ padding: '14px 12px', fontWeight: 800, color: 'var(--pink-accent)' }}>210 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* ADMIN SETTINGS */}
            {activeTab === 'admin_settings' && (
              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>Setări Generale Magazin Modă</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (onUpdateAnnouncement) onUpdateAnnouncement(newAnnouncement);
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

          </div>
        </div>
      </div>

      <AvatarSelectionModal 
        isOpen={isAvatarModalOpen} 
        onClose={() => setIsAvatarModalOpen(false)} 
        currentAvatar={AVATARS[userAvatarIndex]} 
        onSelectAvatar={(avatarPath) => {
          const newIndex = AVATARS.indexOf(avatarPath);
          if (newIndex !== -1 && onAvatarChange) {
            onAvatarChange(newIndex);
          }
          setIsAvatarModalOpen(false);
        }} 
      />

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
                  <label style={{ fontSize: '12px', fontWeight: 700 }}>Preț Redus (€)</label>
                  <div className="newsletter-input-wrapper" style={{ background: '#F8F8F8' }}>
                    <input type="number" required className="newsletter-input" value={newPinPrice} onChange={(e) => setNewPinPrice(Number(e.target.value))} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700 }}>Preț Inițial (€)</label>
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

      {/* ADD BILLING MODAL */}
      {showAddBillingModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#FFF', borderRadius: '12px', width: '850px', padding: '40px', position: 'relative' }}>
            <button 
              onClick={() => setShowAddBillingModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
            >
              <div style={{ backgroundColor: '#000', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 'bold' }}>X</div>
            </button>
            <h2 style={{ fontSize: '28px', fontWeight: 500, margin: '0 0 32px 0', color: '#1E293B' }}>Detalii factura</h2>
            
            <div style={{ display: 'flex', gap: '32px' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input 
                  type="text" 
                  placeholder="Nume si prenume" 
                  value={modalForm.nume}
                  onChange={e => setModalForm({...modalForm, nume: e.target.value})}
                  style={{ padding: '16px 20px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '16px', width: '100%', boxSizing: 'border-box', color: '#64748B' }} 
                />
                <div style={{ position: 'relative' }}>
                  <select 
                    value={modalForm.judet}
                    onChange={e => setModalForm({...modalForm, judet: e.target.value})}
                    style={{ padding: '16px 20px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '16px', width: '100%', appearance: 'none', boxSizing: 'border-box', color: '#1E293B' }}
                  >
                    <option value="">Alege judetul</option>
                    <option value="Bucuresti">Bucuresti</option>
                    <option value="Cluj">Cluj</option>
                    <option value="Olt">Olt</option>
                  </select>
                  <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748B' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
                <input 
                  type="text" 
                  placeholder="Adresa (str, nr, bloc, apartament)" 
                  value={modalForm.strada}
                  onChange={e => setModalForm({...modalForm, strada: e.target.value})}
                  style={{ padding: '16px 20px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '16px', width: '100%', boxSizing: 'border-box', color: '#64748B' }} 
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input 
                  type="text" 
                  placeholder="Nume firma" 
                  value={modalForm.numeFirma}
                  onChange={e => setModalForm({...modalForm, numeFirma: e.target.value})}
                  style={{ padding: '16px 20px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '16px', width: '100%', boxSizing: 'border-box', color: '#64748B' }} 
                />
                <input 
                  type="text" 
                  placeholder="Cod de identificare fiscala" 
                  value={modalForm.cui}
                  onChange={e => setModalForm({...modalForm, cui: e.target.value})}
                  style={{ padding: '16px 20px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '16px', width: '100%', boxSizing: 'border-box', color: '#64748B' }} 
                />
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                  <input 
                    type="checkbox" 
                    id="neplatitorTVA" 
                    checked={modalForm.neplatitorTVA}
                    onChange={e => setModalForm({...modalForm, neplatitorTVA: e.target.checked})}
                    style={{ width: '22px', height: '22px', cursor: 'pointer', border: '2px solid #94A3B8', borderRadius: '4px' }} 
                  />
                  <label htmlFor="neplatitorTVA" style={{ fontSize: '16px', color: '#475569', cursor: 'pointer' }}>Neplatitor TVA</label>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button onClick={handleSaveNewBilling} style={{ backgroundColor: '#0284C7', color: '#FFF', border: 'none', borderRadius: '6px', padding: '16px 24px', fontSize: '16px', fontWeight: 500, cursor: 'pointer' }}>
                    Adauga detalii noi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
