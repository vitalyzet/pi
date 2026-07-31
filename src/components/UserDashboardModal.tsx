import React from 'react';
import {
  X,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  LayoutGrid,
  MessageCircle,
  Wallet
} from 'lucide-react';

interface UserDashboardModalProps {
  onClose: () => void;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  onClose,
  onNavigate,
  onLogout,
}) => {
  const userProfile = {
    name: 'Alexandru B.',
    email: 'alexandru.b@pinpin.ro',
    credits: 150,
    activeAds: 2,
    unreadMessages: 2,
    favorites: 3
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'flex-end', zIndex: 1000,
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{
        width: '100%', maxWidth: '420px', backgroundColor: '#FFFFFF',
        height: '100%', display: 'flex', flexDirection: 'column',
        animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '-10px 0 40px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: '#0F172A' }}>Contul Meu</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={20} color="#64748B" />
          </button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: '24px' }}>
          {/* User Profile Summary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--primary-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A', fontSize: '28px', fontWeight: 900 }}>
              {userProfile.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>{userProfile.name}</h3>
              <div style={{ fontSize: '14px', color: '#64748B' }}>{userProfile.email}</div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
            <div onClick={() => onNavigate('my_ads')} style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '16px', cursor: 'pointer', border: '1.5px solid transparent', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.borderColor = '#CBD5E1'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#64748B', fontWeight: 700, fontSize: '13px' }}>
                <LayoutGrid size={16} /> Anunțuri Active
              </div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A' }}>{userProfile.activeAds}</div>
            </div>
            
            <div onClick={() => onNavigate('messages')} style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '16px', cursor: 'pointer', border: '1.5px solid transparent', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.borderColor = '#CBD5E1'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#64748B', fontWeight: 700, fontSize: '13px' }}>
                <MessageCircle size={16} /> Mesaje Noi
              </div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#E55B86' }}>{userProfile.unreadMessages}</div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => onNavigate('my_ads')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', border: 'none', backgroundColor: '#FFFFFF', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LayoutGrid size={18} color="#64748B" />
                </div>
                Anunțurile Mele
              </div>
              <ChevronRight size={18} color="#94A3B8" />
            </button>

            <button onClick={() => onNavigate('favorites')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', border: 'none', backgroundColor: '#FFFFFF', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={18} color="#64748B" />
                </div>
                Anunțuri Favorite
              </div>
              <ChevronRight size={18} color="#94A3B8" />
            </button>

            <button onClick={() => onNavigate('wallet')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', border: 'none', backgroundColor: '#FFFFFF', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#FFFDF0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Wallet size={18} color="var(--primary-yellow)" />
                </div>
                Portofel & Promovare
              </div>
              <ChevronRight size={18} color="#94A3B8" />
            </button>

            <button onClick={() => onNavigate('settings')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', border: 'none', backgroundColor: '#FFFFFF', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Settings size={18} color="#64748B" />
                </div>
                Setări Cont
              </div>
              <ChevronRight size={18} color="#94A3B8" />
            </button>
          </div>
        </div>

        <div style={{ padding: '24px', borderTop: '1px solid #F1F5F9' }}>
          <button onClick={onLogout} style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '2px solid #F1F5F9', backgroundColor: '#FFFFFF', color: '#64748B', fontSize: '15px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
            <LogOut size={18} />
            Deconectare
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
