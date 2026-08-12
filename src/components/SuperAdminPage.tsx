import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  TrendingUp,
  BarChart2,
  Briefcase,
  User as UserIcon,
  Filter,
  Check,
  X,
  ShoppingBag,
  DollarSign,
  Settings,
  CreditCard,
  Package,
  PlusCircle,
  RefreshCw,
  FileText,
  Download,
  Calculator,
  PieChart,
  Crown,
  Diamond
} from 'lucide-react';
import { Product } from '../data/products';

interface PlatformUser {
  id: string;
  name: string;
  email: string;
  type: 'Fizică' | 'Firmă';
  adsCount: number;
  joined: string;
  status: 'Activ' | 'Suspendat';
  modaSales: number; // Only for Moda
  isPro?: boolean;
}

const MOCK_USERS: PlatformUser[] = [
  { id: 'U-1029', name: 'AutoBavaria SRL', email: 'contact@autobavaria.ro', type: 'Firmă', adsCount: 45, joined: '12 Ian 2026', status: 'Activ', modaSales: 0, isPro: true },
  { id: 'U-9921', name: 'Imobiliare Expert', email: 'office@imoexpert.ro', type: 'Firmă', adsCount: 112, joined: '04 Mar 2026', status: 'Activ', modaSales: 0, isPro: true },
  { id: 'U-2210', name: 'Alexandru B.', email: 'alex@yahoo.com', type: 'Fizică', adsCount: 3, joined: '15 Mai 2026', status: 'Activ', modaSales: 120, isPro: false },
  { id: 'U-4552', name: 'Elena Popescu', email: 'elena.p@gmail.com', type: 'Fizică', adsCount: 1, joined: '20 Iul 2026', status: 'Suspendat', modaSales: 0, isPro: false },
  { id: 'U-8821', name: 'TechStore Romania', email: 'sales@techstore.ro', type: 'Firmă', adsCount: 89, joined: '10 Apr 2026', status: 'Activ', modaSales: 4580, isPro: true },
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

const MOCK_MODA_ORDERS: AdminOrder[] = [
  { id: 'MODA-94820', customer: 'Elena Popescu', email: 'elena.popescu@pinpin.ro', date: '31 Iul 2026', total: 80, paymentMethod: 'Card Online', status: 'În livrare', itemsCount: 2 },
  { id: 'MODA-94819', customer: 'Andrei Ionescu', email: 'andrei.i@gmail.com', date: '31 Iul 2026', total: 120, paymentMethod: 'Easybox Pay', status: 'În procesare', itemsCount: 4 },
  { id: 'MODA-94818', customer: 'Maria Radu', email: 'maria.radu@yahoo.com', date: '30 Iul 2026', total: 50, paymentMethod: 'Card Online', status: 'Livrat', itemsCount: 1 },
];

interface SubscriptionPayment {
  id: string;
  userName: string;
  userType: 'Fizică' | 'Firmă';
  date: string;
  plan: string;
  amount: number;
  status: 'Plătit' | 'Eșuat' | 'În Așteptare';
  expiresAt: string;
  autoRenew: boolean;
}

const MOCK_SUBSCRIPTIONS: SubscriptionPayment[] = [
  { id: 'SUB-1001', userName: 'AutoBavaria SRL', userType: 'Firmă', date: '01 Aug 2026', plan: 'PRO Lunar', amount: 25, status: 'Plătit', expiresAt: '01 Sep 2026', autoRenew: true },
  { id: 'SUB-1002', userName: 'Imobiliare Expert', userType: 'Firmă', date: '05 Aug 2026', plan: 'PRO Lunar', amount: 25, status: 'Plătit', expiresAt: '05 Sep 2026', autoRenew: true },
  { id: 'SUB-1003', userName: 'TechStore Romania', userType: 'Firmă', date: '08 Aug 2026', plan: 'PRO Lunar', amount: 25, status: 'În Așteptare', expiresAt: '08 Sep 2026', autoRenew: false },
];

export interface SuperAdminPageProps {
  onBackToStore: () => void;
  productsList: Product[];
  onUpdateProductStatus?: (productId: string, newStatus: string) => void;
  onDeleteProduct?: (productId: string) => void;
}

export const SuperAdminPage: React.FC<SuperAdminPageProps> = ({
  onBackToStore,
  productsList,
  onUpdateProductStatus,
  onDeleteProduct
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'moderation' | 'users' | 'subscriptions' | 'accounting' | 'settings' | 'moda_dashboard' | 'moda_orders' | 'moda_products' | 'moda_customers' | 'moda_settings'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [moderationList, setModerationList] = useState(() => 
    productsList.map((p, i) => ({
      ...p,
      moderationStatus: i % 7 === 0 ? 'În Așteptare' : (i % 11 === 0 ? 'Respins' : 'Aprobat'),
      sellerType: i % 3 === 0 ? 'Firmă' : 'Fizică',
      sellerName: i % 3 === 0 ? 'AutoBavaria SRL' : (i % 2 === 0 ? 'TechStore Romania' : 'Alexandru B.')
    }))
  );

  const [users, setUsers] = useState<PlatformUser[]>(() => {
    const saved = localStorage.getItem('pinpin_registered_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...MOCK_USERS];
      } catch (e) {
        return MOCK_USERS;
      }
    }
    return MOCK_USERS;
  });
  const [modaOrders, setModaOrders] = useState<AdminOrder[]>(MOCK_MODA_ORDERS);
  const [selectedUser, setSelectedUser] = useState<PlatformUser | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<SubscriptionPayment | null>(null);
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
  
  const [selectedAnafMonth, setSelectedAnafMonth] = useState('August 2026');
  const [currency, setCurrency] = useState<'EUR' | 'RON'>('EUR');

  const pendingAdsCount = moderationList.filter(p => p.moderationStatus === 'În Așteptare').length;
  
  // Calculate Accounting Totals dynamically for current month, mock for history
  const getMonthlyData = (month: string) => {
    let gross = 0;
    if (month === 'August 2026') {
      const totalSubRevenue = MOCK_SUBSCRIPTIONS.filter(s => s.status === 'Plătit').reduce((sum, s) => sum + s.amount, 0);
      const totalModaRevenue = modaOrders.reduce((sum, o) => sum + o.total, 0);
      gross = totalSubRevenue + totalModaRevenue;
    } else {
      const multipliers: Record<string, number> = { 'Iulie 2026': 0.85, 'Iunie 2026': 0.6, 'Mai 2026': 0.4 };
      const mult = multipliers[month] || 0.5;
      gross = 7450 * mult; // Using a mock base value for past months
    }
    
    const netBeforeTax = gross / 1.21;
    const vatAmount = gross - netBeforeTax;
    const incomeTax = netBeforeTax * 0.01;
    const netProfit = netBeforeTax - incomeTax;
    
    return { grossRevenue: gross, vatAmount, incomeTax, netBeforeTax, netProfit };
  };

  const { grossRevenue, vatAmount, incomeTax, netBeforeTax, netProfit } = getMonthlyData(selectedAnafMonth);
  
  const formatCurrency = (amountInEuro: number) => {
    if (currency === 'RON') {
      return `${(amountInEuro * 4.97).toLocaleString('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} RON`;
    }
    return `${amountInEuro.toLocaleString('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
  };
  
  // Global Metrics (Ads only, no financial data)
  const totalAds = 145230;
  const activeUsers = 85400;
  const newAdsToday = 1245;
  const registeredFirms = 12500;

  const handleUpdateModerationStatus = (productId: string, status: 'Aprobat' | 'Respins' | 'În Așteptare') => {
    setModerationList(prev => 
      prev.map(p => p.id === productId ? { ...p, moderationStatus: status } : p)
    );
    if (onUpdateProductStatus) {
      onUpdateProductStatus(productId, status);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Ești sigur că vrei să ștergi acest anunț? Această acțiune este ireversibilă.')) {
      setModerationList(prev => prev.filter(p => p.id !== productId));
      if (onDeleteProduct) onDeleteProduct(productId);
    }
  };

  const handleUpdateUserStatus = (userId: string, status: 'Activ' | 'Suspendat') => {
    setUsers(prev => 
      prev.map(u => u.id === userId ? { ...u, status } : u)
    );
  };

  const filteredModerationList = moderationList.filter(
    p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
         p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
         p.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         p.sellerType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const modaProductsList = moderationList.filter(p => p.category.toLowerCase().includes('mod') || p.category.toLowerCase().includes('hain') || p.category.toLowerCase().includes('încălț'));
  const filteredModaProductsList = modaProductsList.filter(
    p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
         p.sellerType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredModaOrders = modaOrders.filter(
    o => o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#F4F5F7', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Top Admin Header Bar */}
      <div style={{ backgroundColor: '#8B0000', color: '#FFF', padding: '14px 0', boxShadow: '0 4px 12px rgba(139, 0, 0, 0.2)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ backgroundColor: '#FFF', color: '#8B0000', fontSize: '11px', fontWeight: 900, padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              SUPER ADMIN
            </span>
            <h1 style={{ fontSize: '16px', fontWeight: 700, margin: 0, letterSpacing: '0.5px' }}>Platform Global Control</h1>
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
              gap: '6px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          >
            Ieșire Super Admin
          </button>
        </div>
      </div>

      {/* Main Admin Container */}
      <div style={{ maxWidth: '1300px', margin: '32px auto 0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '28px' }}>
          
          {/* Admin Navigation Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* PLATFORMĂ GLOBALĂ */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '16px 12px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', paddingLeft: '14px' }}>
                Platformă Globală
              </div>

              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '8px', padding: '12px 14px', border: 'none', cursor: 'pointer',
                  backgroundColor: activeTab === 'dashboard' ? '#FEE2E2' : 'transparent',
                  fontWeight: activeTab === 'dashboard' ? 800 : 600,
                  color: activeTab === 'dashboard' ? '#991B1B' : '#475569',
                  transition: 'all 0.2s'
                }}
                onClick={() => { setActiveTab('dashboard'); setSearchQuery(''); }}
              >
                <LayoutDashboard size={18} /> Tablou de Bord
              </button>

              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '8px', padding: '12px 14px', border: 'none', cursor: 'pointer',
                  backgroundColor: activeTab === 'moderation' ? '#FEE2E2' : 'transparent',
                  fontWeight: activeTab === 'moderation' ? 800 : 600,
                  color: activeTab === 'moderation' ? '#991B1B' : '#475569',
                  transition: 'all 0.2s'
                }}
                onClick={() => { setActiveTab('moderation'); setSearchQuery(''); }}
              >
                <ShieldAlert size={18} /> Toate Anunțurile
                {pendingAdsCount > 0 && (
                  <span style={{ marginLeft: 'auto', backgroundColor: '#EF4444', color: '#FFF', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>
                    {pendingAdsCount}
                  </span>
                )}
              </button>

              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '8px', padding: '12px 14px', border: 'none', cursor: 'pointer',
                  backgroundColor: activeTab === 'users' ? '#FEE2E2' : 'transparent',
                  fontWeight: activeTab === 'users' ? 800 : 600,
                  color: activeTab === 'users' ? '#991B1B' : '#475569',
                  transition: 'all 0.2s'
                }}
                onClick={() => { setActiveTab('users'); setSearchQuery(''); }}
              >
                <Users size={18} /> Gestiune Utilizatori
              </button>

              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '8px', padding: '12px 14px', border: 'none', cursor: 'pointer',
                  backgroundColor: activeTab === 'subscriptions' ? '#FEE2E2' : 'transparent',
                  fontWeight: activeTab === 'subscriptions' ? 800 : 600,
                  color: activeTab === 'subscriptions' ? '#991B1B' : '#475569',
                  transition: 'all 0.2s'
                }}
                onClick={() => { setActiveTab('subscriptions'); setSearchQuery(''); }}
              >
                <CreditCard size={18} /> Abonamente PRO
              </button>

              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '8px', padding: '12px 14px', border: 'none', cursor: 'pointer',
                  backgroundColor: activeTab === 'accounting' ? '#FEE2E2' : 'transparent',
                  fontWeight: activeTab === 'accounting' ? 800 : 600,
                  color: activeTab === 'accounting' ? '#991B1B' : '#475569',
                  transition: 'all 0.2s'
                }}
                onClick={() => { setActiveTab('accounting'); setSearchQuery(''); }}
              >
                <Calculator size={18} /> Raport ANAF
              </button>

              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '8px', padding: '12px 14px', border: 'none', cursor: 'pointer',
                  backgroundColor: activeTab === 'settings' ? '#FEE2E2' : 'transparent',
                  fontWeight: activeTab === 'settings' ? 800 : 600,
                  color: activeTab === 'settings' ? '#991B1B' : '#475569',
                  transition: 'all 0.2s'
                }}
                onClick={() => { setActiveTab('settings'); setSearchQuery(''); }}
              >
                <Settings size={18} /> Setări Platformă
              </button>
            </div>

            {/* MAGAZIN MODĂ */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '16px 12px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', paddingLeft: '14px' }}>
                Magazin Modă
              </div>

              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '8px', padding: '12px 14px', border: 'none', cursor: 'pointer',
                  backgroundColor: activeTab === 'moda_dashboard' ? '#F3F4F6' : 'transparent',
                  fontWeight: activeTab === 'moda_dashboard' ? 800 : 600,
                  color: activeTab === 'moda_dashboard' ? '#0F172A' : '#64748B',
                  transition: 'all 0.2s'
                }}
                onClick={() => { setActiveTab('moda_dashboard'); setSearchQuery(''); }}
              >
                <LayoutDashboard size={18} /> Tablou Comandă
              </button>

              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '8px', padding: '12px 14px', border: 'none', cursor: 'pointer',
                  backgroundColor: activeTab === 'moda_orders' ? '#F3F4F6' : 'transparent',
                  fontWeight: activeTab === 'moda_orders' ? 800 : 600,
                  color: activeTab === 'moda_orders' ? '#0F172A' : '#64748B',
                  transition: 'all 0.2s'
                }}
                onClick={() => { setActiveTab('moda_orders'); setSearchQuery(''); }}
              >
                <ShoppingBag size={18} /> Comenzi
                <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 800 }}>({modaOrders.length})</span>
              </button>

              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '8px', padding: '12px 14px', border: 'none', cursor: 'pointer',
                  backgroundColor: activeTab === 'moda_products' ? '#F3F4F6' : 'transparent',
                  fontWeight: activeTab === 'moda_products' ? 800 : 600,
                  color: activeTab === 'moda_products' ? '#0F172A' : '#64748B',
                  transition: 'all 0.2s'
                }}
                onClick={() => { setActiveTab('moda_products'); setSearchQuery(''); }}
              >
                <Package size={18} /> Produse
                <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 800 }}>({modaProductsList.length})</span>
              </button>

              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '8px', padding: '12px 14px', border: 'none', cursor: 'pointer',
                  backgroundColor: activeTab === 'moda_customers' ? '#F3F4F6' : 'transparent',
                  fontWeight: activeTab === 'moda_customers' ? 800 : 600,
                  color: activeTab === 'moda_customers' ? '#0F172A' : '#64748B',
                  transition: 'all 0.2s'
                }}
                onClick={() => { setActiveTab('moda_customers'); setSearchQuery(''); }}
              >
                <Users size={18} /> Vânzători & Clienți
              </button>

              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '8px', padding: '12px 14px', border: 'none', cursor: 'pointer',
                  backgroundColor: activeTab === 'moda_settings' ? '#F3F4F6' : 'transparent',
                  fontWeight: activeTab === 'moda_settings' ? 800 : 600,
                  color: activeTab === 'moda_settings' ? '#0F172A' : '#64748B',
                  transition: 'all 0.2s'
                }}
                onClick={() => { setActiveTab('moda_settings'); setSearchQuery(''); }}
              >
                <Settings size={18} /> Setări Magazin
              </button>
            </div>

          </aside>

          {/* Right Main Admin Area */}
          <main style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* PLATFORM: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Vedere Generală Platformă (Anunțuri)</h2>
                
                {/* KPI METRICS OVERVIEW CARDS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                  <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748B', marginBottom: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>Total Anunțuri Active</span>
                      <Package size={20} color="#3B82F6" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A' }}>{totalAds.toLocaleString()}</div>
                    <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <TrendingUp size={14} /> +5.2% luna aceasta
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748B', marginBottom: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>Utilizatori Activi</span>
                      <Users size={20} color="#8B5CF6" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A' }}>{activeUsers.toLocaleString()}</div>
                  </div>

                  <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748B', marginBottom: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>Anunțuri Noi (Azi)</span>
                      <PlusCircle size={20} color="#10B981" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A' }}>{newAdsToday.toLocaleString()}</div>
                  </div>

                  <div 
                    onClick={() => {
                      setActiveTab('users');
                      setSearchQuery('Firmă');
                    }}
                    style={{ 
                      backgroundColor: '#FFF', 
                      borderRadius: '12px', 
                      padding: '20px', 
                      border: '1px solid #E2E8F0', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      const title = e.currentTarget.querySelector('.kpi-title') as HTMLElement;
                      if (title) title.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      const title = e.currentTarget.querySelector('.kpi-title') as HTMLElement;
                      if (title) title.style.textDecoration = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748B', marginBottom: '8px' }}>
                      <span className="kpi-title" style={{ fontSize: '13px', fontWeight: 600 }}>Firme Înregistrate</span>
                      <Briefcase size={20} color="#F59E0B" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A' }}>{registeredFirms.toLocaleString()}</div>
                  </div>

                  <div 
                    onClick={() => {
                      setActiveTab('subscriptions');
                      setSearchQuery('');
                    }}
                    style={{ 
                      backgroundColor: '#FFF', 
                      borderRadius: '12px', 
                      padding: '20px', 
                      border: '1px solid #E2E8F0', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      const title = e.currentTarget.querySelector('.kpi-title') as HTMLElement;
                      if (title) title.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      const title = e.currentTarget.querySelector('.kpi-title') as HTMLElement;
                      if (title) title.style.textDecoration = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748B', marginBottom: '8px' }}>
                      <span className="kpi-title" style={{ fontSize: '13px', fontWeight: 600 }}>Venituri Abonamente</span>
                      <CreditCard size={20} color="#10B981" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A' }}>2,450 €</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '20px' }}>Informații Sistem</h3>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1, backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>Stabilitate Platformă</h4>
                      <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px 0' }}>Sistemul funcționează la parametri optimi. Nu există erori de afișare pentru anunțuri.</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#10B981' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></div>
                        100% UPTIME
                      </div>
                    </div>
                    <div style={{ flex: 1, backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>Raport Activitate Spam</h4>
                      <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px 0' }}>Filtrul automat a blocat 14 tentative de spam în ultimele 24 de ore.</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#3B82F6' }}>
                        <ShieldAlert size={14} /> FILTRU ACTIV
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PLATFORM: MODERATION */}
            {activeTab === 'moderation' && (
              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 4px 0' }}>Toate Anunțurile (Auto, Imobiliare etc)</h3>
                    <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Aprobă sau respinge anunțurile clasice postate de utilizatori.</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', padding: '8px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <Search size={16} color="#64748B" />
                    <input
                      type="text"
                      placeholder="Căutare anunț..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '200px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filteredModerationList.filter(p => !p.category.toLowerCase().includes('mod') && !p.category.toLowerCase().includes('hain')).map((product) => (
                    <div key={product.id} style={{ display: 'flex', gap: '16px', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', backgroundColor: product.moderationStatus === 'În Așteptare' ? '#FFFBEB' : '#FFF' }}>
                      <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>{product.title}</h4>
                              <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#64748B' }}>
                                <span>ID: #{product.id}</span>
                                <span>•</span>
                                <span>Categorie: {product.category}</span>
                                <span>•</span>
                                <span>Postat de: {product.sellerName} ({product.sellerType})</span>
                              </div>
                            </div>
                            <div style={{ fontSize: '18px', fontWeight: 900, color: '#E55B86' }}>{product.price} €</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <span style={{ 
                              padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase',
                              backgroundColor: product.moderationStatus === 'Aprobat' ? '#DCFCE7' : product.moderationStatus === 'Respins' ? '#FEE2E2' : '#FEF3C7',
                              color: product.moderationStatus === 'Aprobat' ? '#166534' : product.moderationStatus === 'Respins' ? '#991B1B' : '#92400E'
                            }}>
                              Status: {product.moderationStatus}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => handleUpdateModerationStatus(product.id, 'Respins')}
                              disabled={product.moderationStatus === 'Respins'}
                              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #FCA5A5', backgroundColor: '#FEF2F2', color: '#DC2626', fontSize: '12px', fontWeight: 700, cursor: product.moderationStatus === 'Respins' ? 'not-allowed' : 'pointer', opacity: product.moderationStatus === 'Respins' ? 0.5 : 1 }}
                            >
                              <X size={14} /> Respinge
                            </button>
                            <button
                              onClick={() => handleUpdateModerationStatus(product.id, 'Aprobat')}
                              disabled={product.moderationStatus === 'Aprobat'}
                              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #86EFAC', backgroundColor: '#F0FDF4', color: '#16A34A', fontSize: '12px', fontWeight: 700, cursor: product.moderationStatus === 'Aprobat' ? 'not-allowed' : 'pointer', opacity: product.moderationStatus === 'Aprobat' ? 0.5 : 1 }}
                            >
                              <Check size={14} /> Aprobă
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFF', color: '#EF4444', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                              title="Șterge Anunț"
                            >
                              <Trash2 size={14} /> Șterge
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PLATFORM: USERS */}
            {activeTab === 'users' && (
              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 4px 0' }}>Gestiune Utilizatori</h3>
                    <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Toate firmele și persoanele fizice înregistrate care au listat anunțuri.</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', padding: '8px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <Search size={16} color="#64748B" />
                    <input
                      type="text"
                      placeholder="Căutare utilizator/tip..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '200px' }}
                    />
                  </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E2E8F0', fontSize: '12px', color: '#64748B', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px' }}>Utilizator / Nume</th>
                      <th style={{ padding: '12px' }}>Tip Cont</th>
                      <th style={{ padding: '12px' }}>Abonament</th>
                      <th style={{ padding: '12px' }}>Anunțuri Active</th>
                      <th style={{ padding: '12px' }}>Data Înregistrării</th>
                      <th style={{ padding: '12px' }}>Status</th>
                      <th style={{ padding: '12px' }}>Acțiune</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.type.toLowerCase().includes(searchQuery.toLowerCase())).map((user) => (
                      <tr key={user.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '14px' }}>
                        <td style={{ padding: '16px 12px' }}>
                          <div 
                            style={{ fontWeight: 800, color: '#0F172A', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                            onClick={() => setSelectedUser(user)}
                          >
                            {user.name}
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>{user.email}</div>
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: user.type === 'Firmă' ? '#8B5CF6' : '#3B82F6', backgroundColor: user.type === 'Firmă' ? '#F5F3FF' : '#EFF6FF', padding: '4px 10px', borderRadius: '12px' }}>
                            {user.type === 'Firmă' ? <Briefcase size={12} /> : <UserIcon size={12} />}
                            {user.type}
                          </span>
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          {user.isPro ? (
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#D97706', backgroundColor: '#FEF3C7', padding: '4px 8px', borderRadius: '6px', border: '1px solid #FDE68A' }}>
                              PRO Lunar
                            </span>
                          ) : (
                            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', backgroundColor: '#F1F5F9', padding: '4px 8px', borderRadius: '6px' }}>
                              Gratuit
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '16px 12px', fontWeight: 800 }}>{user.adsCount}</td>
                        <td style={{ padding: '16px 12px', color: '#64748B' }}>{user.joined}</td>
                        <td style={{ padding: '16px 12px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: user.status === 'Activ' ? '#16A34A' : '#DC2626' }}>
                            {user.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          <button
                            onClick={() => handleUpdateUserStatus(user.id, user.status === 'Activ' ? 'Suspendat' : 'Activ')}
                            style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${user.status === 'Activ' ? '#FCA5A5' : '#86EFAC'}`, backgroundColor: 'transparent', color: user.status === 'Activ' ? '#DC2626' : '#16A34A', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            {user.status === 'Activ' ? 'Suspendă' : 'Activează'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* PLATFORM: SETTINGS */}
            {activeTab === 'settings' && (
              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 4px 0' }}>Setări Platformă</h3>
                    <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Configurează regulile de postare pentru anunțurile generale.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Limita de Anunțuri Gratuite (Persoane Fizice)</label>
                    <input type="number" defaultValue={5} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', fontWeight: 600, color: '#0F172A', outline: 'none' }} />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Cost Adăugare Anunț Extra (Peste limită - €)</label>
                    <input type="number" defaultValue={2} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', fontWeight: 600, color: '#0F172A', outline: 'none' }} />
                  </div>

                  <button style={{ marginTop: '12px', padding: '14px 24px', borderRadius: '8px', border: 'none', backgroundColor: '#8B0000', color: '#FFFFFF', fontSize: '14px', fontWeight: 800, cursor: 'pointer', width: 'fit-content' }}>
                    Salvează Setările
                  </button>
                </div>
              </div>
            )}

            {/* PLATFORM: SUBSCRIPTIONS */}
            {activeTab === 'subscriptions' && selectedVipPlan && (
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
            
            {activeTab === 'subscriptions' && !selectedVipPlan && (
              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 4px 0' }}>Plăți Abonamente PRO</h3>
                    <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Istoricul plăților lunare efectuate de utilizatorii cu abonament PRO.</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', padding: '8px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <Search size={16} color="#64748B" />
                    <input
                      type="text"
                      placeholder="Căutare după utilizator..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '200px' }}
                    />
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

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E2E8F0', fontSize: '12px', color: '#64748B', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px' }}>ID Plată</th>
                      <th style={{ padding: '12px' }}>Utilizator / Firmă</th>
                      <th style={{ padding: '12px' }}>Abonament</th>
                      <th style={{ padding: '12px' }}>Data Plății</th>
                      <th style={{ padding: '12px' }}>Expiră La</th>
                      <th style={{ padding: '12px' }}>Reînnoire</th>
                      <th style={{ padding: '12px' }}>Suma</th>
                      <th style={{ padding: '12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_SUBSCRIPTIONS.filter(s => s.userName.toLowerCase().includes(searchQuery.toLowerCase())).map((sub) => (
                      <tr key={sub.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '14px' }}>
                        <td style={{ padding: '16px 12px' }}>
                          <span 
                            style={{ fontWeight: 900, color: '#0F172A', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                            onClick={() => setSelectedInvoice(sub)}
                          >
                            {sub.id}
                          </span>
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          <div style={{ fontWeight: 800, color: '#0F172A' }}>{sub.userName}</div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>{sub.userType}</div>
                        </td>
                        <td style={{ padding: '16px 12px', fontWeight: 700 }}>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: '#D97706', backgroundColor: '#FEF3C7', padding: '4px 8px', borderRadius: '6px', border: '1px solid #FDE68A' }}>
                            {sub.plan}
                          </span>
                        </td>
                        <td style={{ padding: '16px 12px', color: '#64748B' }}>{sub.date}</td>
                        <td style={{ padding: '16px 12px', color: '#0F172A', fontWeight: 700 }}>{sub.expiresAt}</td>
                        <td style={{ padding: '16px 12px' }}>
                          {sub.autoRenew ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, color: '#166534', backgroundColor: '#DCFCE7', padding: '4px 8px', borderRadius: '6px' }}><RefreshCw size={12} /> Automată</span>
                          ) : (
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#991B1B', backgroundColor: '#FEE2E2', padding: '4px 8px', borderRadius: '6px' }}>Manuală</span>
                          )}
                        </td>
                        <td style={{ padding: '16px 12px', fontWeight: 900, color: '#10B981' }}>{sub.amount} €</td>
                        <td style={{ padding: '16px 12px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '12px', backgroundColor: sub.status === 'Plătit' ? '#DCFCE7' : sub.status === 'Eșuat' ? '#FEE2E2' : '#FEF3C7', color: sub.status === 'Plătit' ? '#166534' : sub.status === 'Eșuat' ? '#991B1B' : '#92400E' }}>
                            {sub.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* PLATFORM: ACCOUNTING (ANAF) */}
            {activeTab === 'accounting' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: '0 0 8px 0' }}>Contabilitate & Raport ANAF (2026)</h3>
                    <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>Vedere de ansamblu asupra veniturilor brute, taxelor de plată (TVA 21% + Impozit 1%) și profitului net.</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ backgroundColor: '#F8FAFC', padding: '10px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <PieChart size={18} color="#3B82F6" />
                      <select 
                        value={selectedAnafMonth}
                        onChange={(e) => setSelectedAnafMonth(e.target.value)}
                        style={{ border: 'none', background: 'transparent', fontSize: '15px', fontWeight: 800, color: '#0F172A', outline: 'none', cursor: 'pointer' }}
                      >
                        <option value="August 2026">August 2026 (Curent)</option>
                        <option value="Iulie 2026">Iulie 2026</option>
                        <option value="Iunie 2026">Iunie 2026</option>
                        <option value="Mai 2026">Mai 2026</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', backgroundColor: '#F1F5F9', padding: '4px', borderRadius: '8px' }}>
                      <button 
                        onClick={() => setCurrency('EUR')}
                        style={{ padding: '6px 12px', fontSize: '13px', fontWeight: 700, border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: currency === 'EUR' ? '#FFF' : 'transparent', color: currency === 'EUR' ? '#0F172A' : '#64748B', boxShadow: currency === 'EUR' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none' }}>
                        EUR (€)
                      </button>
                      <button 
                        onClick={() => setCurrency('RON')}
                        style={{ padding: '6px 12px', fontSize: '13px', fontWeight: 700, border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: currency === 'RON' ? '#FFF' : 'transparent', color: currency === 'RON' ? '#0F172A' : '#64748B', boxShadow: currency === 'RON' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none' }}>
                        RON (Lei)
                      </button>
                    </div>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0F172A', color: '#FFF', padding: '10px 16px', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                      <Download size={16} /> Exportă PDF
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                  {/* Gross Revenue */}
                  <div style={{ backgroundColor: '#FFF', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                    <div style={{ fontSize: '13px', textTransform: 'uppercase', color: '#64748B', fontWeight: 800, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <DollarSign size={16} /> Total Încasări Brute
                    </div>
                    <div style={{ fontSize: '36px', fontWeight: 900, color: '#0F172A', marginBottom: '8px' }}>{formatCurrency(grossRevenue)}</div>
                    <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Din abonamente PRO și vânzări Modă (TVA Inclus)</div>
                  </div>

                  {/* Taxes (ANAF) */}
                  <div style={{ backgroundColor: '#FEF2F2', borderRadius: '16px', padding: '24px', border: '1px solid #FECACA', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                    <div style={{ fontSize: '13px', textTransform: 'uppercase', color: '#991B1B', fontWeight: 800, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calculator size={16} /> Total de Plată ANAF
                    </div>
                    <div style={{ fontSize: '36px', fontWeight: 900, color: '#DC2626', marginBottom: '8px' }}>{formatCurrency(vatAmount + incomeTax)}</div>
                    <div style={{ fontSize: '13px', color: '#991B1B', fontWeight: 600 }}>Suma totală care trebuie virată statului.</div>
                  </div>

                  {/* Net Profit */}
                  <div style={{ backgroundColor: '#F0FDF4', borderRadius: '16px', padding: '24px', border: '1px solid #BBF7D0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                    <div style={{ fontSize: '13px', textTransform: 'uppercase', color: '#166534', fontWeight: 800, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <TrendingUp size={16} /> Profit Net (Banii Tăi)
                    </div>
                    <div style={{ fontSize: '36px', fontWeight: 900, color: '#16A34A', marginBottom: '8px' }}>{formatCurrency(netProfit)}</div>
                    <div style={{ fontSize: '13px', color: '#166534', fontWeight: 600 }}>Suma curată care îți rămâne în firmă.</div>
                  </div>
                </div>

                {/* Tax Breakdown Details */}
                <div style={{ backgroundColor: '#FFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PieChart size={20} color="#0F172A" /> Defalcare Taxe ANAF (2026)
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px dashed #E2E8F0' }}>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>TVA Colectat (21%)</div>
                        <div style={{ fontSize: '13px', color: '#64748B' }}>Taxa pe valoarea adăugată din totalul brut facturat.</div>
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#DC2626' }}>{formatCurrency(vatAmount)}</div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px dashed #E2E8F0' }}>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>Baza Netă Impozabilă</div>
                        <div style={{ fontSize: '13px', color: '#64748B' }}>Veniturile firmei după ce s-a eliminat TVA-ul de 21%.</div>
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#475569' }}>{formatCurrency(netBeforeTax)}</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px dashed #E2E8F0' }}>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>Impozit pe Venit Micro (1%)</div>
                        <div style={{ fontSize: '13px', color: '#64748B' }}>Aplicat la baza netă impozabilă (condiție minim 1 angajat).</div>
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#DC2626' }}>{formatCurrency(incomeTax)}</div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                      <div style={{ fontSize: '16px', fontWeight: 900, color: '#991B1B' }}>TOTAL DE PLATĂ LA STAT:</div>
                      <div style={{ fontSize: '24px', fontWeight: 900, color: '#DC2626' }}>{formatCurrency(vatAmount + incomeTax)}</div>
                    </div>
                  </div>
                </div>

                {/* History Table */}
                <div style={{ backgroundColor: '#FFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BarChart2 size={20} color="#0F172A" /> Arhivă Luni Anterioare (2026)
                  </h4>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #E2E8F0', fontSize: '12px', color: '#64748B', textTransform: 'uppercase' }}>
                        <th style={{ padding: '12px' }}>Luna</th>
                        <th style={{ padding: '12px' }}>Total Brut</th>
                        <th style={{ padding: '12px' }}>TVA (21%)</th>
                        <th style={{ padding: '12px' }}>Impozit (1%)</th>
                        <th style={{ padding: '12px', color: '#DC2626' }}>Total de Plată</th>
                        <th style={{ padding: '12px', color: '#16A34A' }}>Profit Net</th>
                        <th style={{ padding: '12px', textAlign: 'right' }}>Acțiune</th>
                      </tr>
                    </thead>
                    <tbody>
                      {['Iulie 2026', 'Iunie 2026', 'Mai 2026', 'Aprilie 2026'].map((month, idx) => {
                        const mData = getMonthlyData(month);
                        return (
                          <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '14px' }}>
                            <td style={{ padding: '16px 12px', fontWeight: 800, color: '#0F172A' }}>{month}</td>
                            <td style={{ padding: '16px 12px', color: '#475569', fontWeight: 600 }}>{formatCurrency(mData.grossRevenue)}</td>
                            <td style={{ padding: '16px 12px', color: '#475569' }}>{formatCurrency(mData.vatAmount)}</td>
                            <td style={{ padding: '16px 12px', color: '#475569' }}>{formatCurrency(mData.incomeTax)}</td>
                            <td style={{ padding: '16px 12px', color: '#DC2626', fontWeight: 800 }}>{formatCurrency(mData.vatAmount + mData.incomeTax)}</td>
                            <td style={{ padding: '16px 12px', color: '#16A34A', fontWeight: 800 }}>{formatCurrency(mData.netProfit)}</td>
                            <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                              <button 
                                onClick={() => {
                                  setSelectedAnafMonth(month);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 700, backgroundColor: selectedAnafMonth === month ? '#0F172A' : '#F1F5F9', color: selectedAnafMonth === month ? '#FFF' : '#0F172A', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                                {selectedAnafMonth === month ? 'Selecție Activă' : 'Vezi Detalii'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================= MODA STORE SECTION ======================= */}

            {/* MODA: DASHBOARD */}
            {activeTab === 'moda_dashboard' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: 0 }}>Tablou de Comandă Magazin Modă</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748B', marginBottom: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>Vânzări Haine</span>
                      <DollarSign size={20} color="#10B981" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A' }}>14,850 €</div>
                  </div>

                  <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748B', marginBottom: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>Comenzi Modă</span>
                      <ShoppingBag size={20} color="#3B82F6" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A' }}>342</div>
                  </div>

                  <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748B', marginBottom: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>Produse (Inventar)</span>
                      <Package size={20} color="#F59E0B" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A' }}>{modaProductsList.length}</div>
                  </div>

                  <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748B', marginBottom: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>Cumpărători</span>
                      <Users size={20} color="#EC4899" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A' }}>1,280</div>
                  </div>
                </div>
              </div>
            )}

            {/* MODA: ORDERS */}
            {activeTab === 'moda_orders' && (
              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 900 }}>Gestiune Comenzi Modă</h3>
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
                      <th style={{ padding: '12px' }}>ID Comandă</th>
                      <th style={{ padding: '12px' }}>Cumpărător</th>
                      <th style={{ padding: '12px' }}>Data</th>
                      <th style={{ padding: '12px' }}>Total</th>
                      <th style={{ padding: '12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredModaOrders.map((order) => (
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
            )}

            {/* MODA: PRODUCTS (Inventar Haine) */}
            {activeTab === 'moda_products' && (
              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 4px 0' }}>Produse Modă (Inventar)</h3>
                    <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Toate produsele din categoria haine, pantofi, accesorii.</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', padding: '8px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <Search size={16} color="#64748B" />
                    <input
                      type="text"
                      placeholder="Căutare haine..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '200px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filteredModaProductsList.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>
                      Nu s-au găsit produse în secțiunea Modă.
                    </div>
                  ) : filteredModaProductsList.map((product) => (
                    <div key={product.id} style={{ display: 'flex', gap: '16px', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                      <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>{product.title}</h4>
                              <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#64748B' }}>
                                <span>ID: #{product.id}</span>
                                <span>•</span>
                                <span>Categorie: {product.category}</span>
                                <span>•</span>
                                <span>Vânzător: {product.sellerType}</span>
                              </div>
                            </div>
                            <div style={{ fontSize: '18px', fontWeight: 900, color: '#E55B86' }}>{product.price} €</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <span style={{ 
                              padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase',
                              backgroundColor: product.moderationStatus === 'Aprobat' ? '#DCFCE7' : product.moderationStatus === 'Respins' ? '#FEE2E2' : '#FEF3C7',
                              color: product.moderationStatus === 'Aprobat' ? '#166534' : product.moderationStatus === 'Respins' ? '#991B1B' : '#92400E'
                            }}>
                              Status Magazin: {product.moderationStatus}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFF', color: '#0F172A', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                            >
                              Vezi Produs
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFF', color: '#EF4444', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                            >
                              <Trash2 size={14} /> Șterge din Magazin
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MODA: CUSTOMERS */}
            {activeTab === 'moda_customers' && (
              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 4px 0' }}>Vânzători & Clienți Modă</h3>
                    <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Toate firmele și utilizatorii fizici care vând sau cumpără haine pe platformă.</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', padding: '8px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <Search size={16} color="#64748B" />
                    <input
                      type="text"
                      placeholder="Căutare utilizator..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '200px' }}
                    />
                  </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E2E8F0', fontSize: '12px', color: '#64748B', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px' }}>Vânzător / Magazin</th>
                      <th style={{ padding: '12px' }}>Tip Cont</th>
                      <th style={{ padding: '12px' }}>Abonament</th>
                      <th style={{ padding: '12px' }}>Produse Modă</th>
                      <th style={{ padding: '12px' }}>Vânzări Generate (Modă)</th>
                      <th style={{ padding: '12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(0, 4).filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase())).map((user, index) => (
                      <tr key={user.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '14px' }}>
                        <td style={{ padding: '16px 12px' }}>
                          <div 
                            style={{ fontWeight: 800, color: '#0F172A', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                            onClick={() => setSelectedUser(user)}
                          >
                            {user.name}
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>{user.email}</div>
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: user.type === 'Firmă' ? '#8B5CF6' : '#3B82F6', backgroundColor: user.type === 'Firmă' ? '#F5F3FF' : '#EFF6FF', padding: '4px 10px', borderRadius: '12px' }}>
                            {user.type === 'Firmă' ? <Briefcase size={12} /> : <UserIcon size={12} />}
                            {user.type}
                          </span>
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          {user.isPro ? (
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#D97706', backgroundColor: '#FEF3C7', padding: '4px 8px', borderRadius: '6px', border: '1px solid #FDE68A' }}>
                              PRO Lunar
                            </span>
                          ) : (
                            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', backgroundColor: '#F1F5F9', padding: '4px 8px', borderRadius: '6px' }}>
                              Gratuit
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '16px 12px', fontWeight: 800 }}>{Math.floor(user.adsCount * 0.8) + index * 2} produse</td>
                        <td style={{ padding: '16px 12px', fontWeight: 900, color: '#10B981' }}>{user.modaSales.toLocaleString()} €</td>
                        <td style={{ padding: '16px 12px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: '#16A34A' }}>
                            Activ în Modă
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* MODA: SETTINGS */}
            {activeTab === 'moda_settings' && (
              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 4px 0' }}>Setări Magazin Modă</h3>
                    <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Configurează livrarea și politicile magazinului de modă.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Cost Livrare Standard (€)</label>
                    <input type="number" defaultValue={5} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', fontWeight: 600, color: '#0F172A', outline: 'none' }} />
                  </div>
                  
                  <button style={{ marginTop: '12px', padding: '14px 24px', borderRadius: '8px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '14px', fontWeight: 800, cursor: 'pointer', width: 'fit-content' }}>
                    Salvează Setările Magazinului
                  </button>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#FFF', borderRadius: '16px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
            
            <div style={{ padding: '24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: '#FFF', zIndex: 10, borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: selectedUser.type === 'Firmă' ? '#F5F3FF' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: selectedUser.type === 'Firmă' ? '#8B5CF6' : '#3B82F6' }}>
                  {selectedUser.type === 'Firmă' ? <Briefcase size={24} /> : <UserIcon size={24} />}
                </div>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 4px 0', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {selectedUser.name}
                    {selectedUser.isPro && (
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#D97706', backgroundColor: '#FEF3C7', padding: '2px 8px', borderRadius: '12px', border: '1px solid #FDE68A' }}>PRO</span>
                    )}
                  </h2>
                  <div style={{ fontSize: '14px', color: '#64748B' }}>{selectedUser.email}</div>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>Detalii Cont</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, marginBottom: '4px' }}>Data Înregistrării</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>{selectedUser.joined}</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, marginBottom: '4px' }}>Status Cont</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: selectedUser.status === 'Activ' ? '#16A34A' : '#DC2626' }}>{selectedUser.status}</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, marginBottom: '4px' }}>Anunțuri Generale Active</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>{selectedUser.adsCount}</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, marginBottom: '4px' }}>Total Vânzări Modă</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#10B981' }}>{selectedUser.modaSales.toLocaleString()} €</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, marginBottom: '4px' }}>Abonament</div>
                  <div style={{ fontSize: '15px', fontWeight: 800 }}>
                    {selectedUser.isPro ? (
                      <span style={{ color: '#D97706' }}>PRO Lunar</span>
                    ) : (
                      <span style={{ color: '#64748B' }}>Gratuit</span>
                    )}
                  </div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, marginBottom: '4px' }}>Tip Cont</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>{selectedUser.type}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Anunțuri Recente</h3>
                <span 
                  onClick={() => {
                    setSelectedUser(null);
                    setActiveTab('moderation');
                    setSearchQuery(selectedUser.name);
                  }}
                  style={{ fontSize: '13px', color: '#3B82F6', fontWeight: 700, cursor: 'pointer' }}
                >
                  Vezi toate
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[1, 2, 3].map((_, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Package size={20} color="#94A3B8" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Produs / Serviciu #{i + 1}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>Categorie aleatorie • Adăugat recent</div>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 900, color: '#0F172A' }}>
                      {Math.floor(Math.random() * 500) + 50} €
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
            
            <div style={{ padding: '16px 24px', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '12px', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
               <button onClick={() => setSelectedUser(null)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFF', color: '#0F172A', fontWeight: 700, cursor: 'pointer' }}>Închide</button>
               <button style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#EF4444', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>Suspendă Cont</button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#FFF', borderRadius: '12px', width: '90%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '24px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText color="#FFF" size={24} />
                </div>
                <div>
                  <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: 900, color: '#0F172A' }}>
                    {selectedInvoice.status === 'Plătit' ? 'Factură Fiscală' : 'Factură Proformă'}
                  </h2>
                  <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>ID: {selectedInvoice.id}</div>
                </div>
              </div>
              <button onClick={() => setSelectedInvoice(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, marginBottom: '4px' }}>Facturat Către</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>{selectedInvoice.userName}</div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>Cont: {selectedInvoice.userType}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, marginBottom: '4px' }}>Data Emiterii</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>{selectedInvoice.date}</div>
                </div>
              </div>

              <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '12px', fontWeight: 700, color: '#64748B' }}>
                  <span>Descriere Serviciu</span>
                  <span>Total</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', fontSize: '14px', color: '#0F172A' }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>Abonament {selectedInvoice.plan}</div>
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>Perioadă: {selectedInvoice.date} - {selectedInvoice.expiresAt}</div>
                  </div>
                  <div style={{ fontWeight: 800 }}>{selectedInvoice.amount} €</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', padding: '16px', backgroundColor: '#F1F5F9', borderRadius: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#475569' }}>Total de Plată (TVA Inclus)</span>
                <span style={{ fontSize: '24px', fontWeight: 900, color: '#10B981' }}>{selectedInvoice.amount} €</span>
              </div>
              
              <div style={{ marginTop: '24px', display: 'flex', gap: '8px' }}>
                 <div style={{ fontSize: '12px', fontWeight: 600, color: selectedInvoice.status === 'Plătit' ? '#16A34A' : '#DC2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                   {selectedInvoice.status === 'Plătit' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                   Status: {selectedInvoice.status.toUpperCase()}
                 </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
               <button onClick={() => setSelectedInvoice(null)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFF', color: '#0F172A', fontWeight: 700, cursor: 'pointer' }}>Închide</button>
               <button style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#0F172A', color: '#FFF', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <Download size={16} /> Descarcă PDF
               </button>
            </div>
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
