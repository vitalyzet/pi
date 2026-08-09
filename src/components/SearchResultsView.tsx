import React from 'react';
import { ProductCard } from './ProductCard';
import { Product, CATEGORIES } from '../data/products';
import { Filter, Search, X, LayoutGrid, List, RefreshCw } from 'lucide-react';

interface SearchResultsViewProps {
  products: Product[];
  searchQuery: string;
  onClearSearch: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedCountry: string;
  onSelectCountry: (country: string) => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  maxPrice: string;
  onSetMaxPrice: (price: string) => void;
  transactionType: string;
  onSetTransactionType: (type: string) => void;
  sortBy: string;
  onSelectSort: (sort: string) => void;
  viewMode: 'classic' | 'pro' | 'list';
  onToggleViewMode: (mode: 'classic' | 'pro' | 'list') => void;
  favorites: Product[];
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onGoToProfile: (sellerName: string) => void;
}


export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  products,
  searchQuery,
  onClearSearch,
  selectedCategory,
  onSelectCategory,
  selectedCountry,
  onSelectCountry,
  selectedCity,
  onSelectCity,
  maxPrice,
  onSetMaxPrice,
  transactionType,
  onSetTransactionType,
  sortBy,
  onSelectSort,
  viewMode,
  onToggleViewMode,
  favorites,
  onToggleFavorite,
  onAddToCart,
  onQuickView,
  onGoToProfile,
}) => {

  return (
    <div className="search-results-layout" style={{ display: 'flex', gap: '24px', padding: '24px', maxWidth: '1280px', margin: '0 auto', background: '#F8F9FA' }}>
      
      {/* Left Sidebar */}
      <aside style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px 20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111827' }}>
              <Filter size={20} color="#FF3B5C" />
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>Filtre</h2>
            </div>
            <button 
              onClick={() => {
                onSelectCategory('Toate');
                onSetMaxPrice('100000');
                onSetTransactionType('Toate');
                onSelectCountry('Toate');
                onSelectCity('Toate');
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#6B7280', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
            >
              <RefreshCw size={14} /> Curăță
            </button>
          </div>

          {/* Categorie */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Categorie</h3>
            <select
              value={selectedCategory}
              onChange={(e) => onSelectCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                outline: 'none',
                background: '#fff',
                fontSize: '15px',
                color: '#111827',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111827%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px top 50%',
                backgroundSize: '10px auto',
              }}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat === 'Toate' ? 'Toate categoriile' : cat}</option>
              ))}
            </select>
          </div>

          <div style={{ height: '1px', background: '#F3F4F6', margin: '24px 0' }}></div>

          {/* Preț Maxim */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>Preț Maxim</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: '#FF3B5C', fontWeight: 700, fontSize: '15px' }}>0€</span>
              <span style={{ color: '#FF3B5C', fontWeight: 700, fontSize: '15px' }}>
                {maxPrice === '100000' || !maxPrice ? 'Fără Limită' : `${maxPrice}€`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              step="100"
              value={maxPrice || 100000}
              onChange={(e) => onSetMaxPrice(e.target.value)}
              style={{
                width: '100%',
                accentColor: '#FF3B5C',
                cursor: 'pointer'
              }}
            />
          </div>

          <div style={{ height: '1px', background: '#F3F4F6', margin: '24px 0' }}></div>

          {/* Conditional Filter: Tip Tranzacție vs Stare Produs */}
          {selectedCategory === 'Imobiliare' ? (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Tip Tranzacție</h3>
              <select
                value={transactionType}
                onChange={(e) => onSetTransactionType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  outline: 'none',
                  background: '#fff',
                  fontSize: '15px',
                  color: '#111827',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111827%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px top 50%',
                  backgroundSize: '10px auto',
                }}
              >
                <option value="Toate">Toate</option>
                <option value="Vânzare">Vânzare</option>
                <option value="Închiriere">Închiriere</option>
              </select>
            </div>
          ) : selectedCategory === 'Auto' || selectedCategory === 'Auto & Moto' || selectedCategory === 'Vehicule' ? (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Stare Vehicul</h3>
              <select
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  outline: 'none',
                  background: '#fff',
                  fontSize: '15px',
                  color: '#111827',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111827%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px top 50%',
                  backgroundSize: '10px auto',
                }}
              >
                <option value="Toate">Toate stările</option>
                <option value="Nou">Nou</option>
                <option value="Rulat">Rulat</option>
              </select>
            </div>
          ) : (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Stare Produs</h3>
              <select
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  outline: 'none',
                  background: '#fff',
                  fontSize: '15px',
                  color: '#111827',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111827%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px top 50%',
                  backgroundSize: '10px auto',
                }}
              >
                <option value="Toate">Toate stările</option>
                <option value="Nou">Nou</option>
                <option value="Utilizat">Utilizat</option>
              </select>
            </div>
          )}

          <div style={{ height: '1px', background: '#F3F4F6', margin: '24px 0' }}></div>

          {/* Oraș */}
          <div style={{ marginBottom: '8px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Oraș</h3>
            <select
              value={selectedCity}
              onChange={(e) => onSelectCity(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                outline: 'none',
                background: selectedCountry === 'Toate' ? '#F9FAFB' : '#fff',
                fontSize: '15px',
                color: selectedCountry === 'Toate' ? '#9CA3AF' : '#111827',
                cursor: selectedCountry === 'Toate' ? 'not-allowed' : 'pointer',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111827%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px top 50%',
                backgroundSize: '10px auto',
              }}
            >
              <option value="Toate">Toate orașele</option>
              {(!selectedCountry || selectedCountry === 'global' || selectedCountry === 'ro') && (
                <>
                  <option value="București">București</option>
                  <option value="Cluj">Cluj-Napoca</option>
                  <option value="Timișoara">Timișoara</option>
                  <option value="Ilfov">Ilfov</option>
                  <option value="Bacău">Bacău</option>
                  <option value="Mehedinți">Mehedinți</option>
                </>
              )}
              {selectedCountry === 'es' && (
                <>
                  <option value="Madrid">Madrid</option>
                  <option value="Barcelona">Barcelona</option>
                </>
              )}
              {selectedCountry === 'it' && (
                <>
                  <option value="Roma">Roma</option>
                  <option value="Milan">Milan</option>
                </>
              )}
              {selectedCountry === 'fr' && (
                <>
                  <option value="Paris">Paris</option>
                  <option value="Lyon">Lyon</option>
                </>
              )}
              {selectedCountry === 'de' && (
                <>
                  <option value="Berlin">Berlin</option>
                  <option value="Munchen">München</option>
                </>
              )}
              {selectedCountry === 'nl' && (
                <>
                  <option value="Amsterdam">Amsterdam</option>
                  <option value="Rotterdam">Rotterdam</option>
                </>
              )}
            </select>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Active Search & Header Controls */}
        <div style={{ background: '#fff', padding: '16px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#049D88' }}>{products.length}</span>
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#334155' }}>rezultate</span>
            </div>
            
            {(searchQuery || selectedCategory !== 'Toate') && (
              <>
                <div style={{ width: '1px', height: '24px', background: '#E2E8F0' }}></div>
                
                {searchQuery && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F8FAFC', padding: '6px 12px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Căutare:</span>
                    <strong style={{ fontSize: '14px', color: '#0F172A' }}>{searchQuery}</strong>
                    <button onClick={onClearSearch} style={{ display: 'flex', background: '#E2E8F0', border: 'none', borderRadius: '50%', padding: '2px', cursor: 'pointer', color: '#64748B' }}>
                      <X size={12} />
                    </button>
                  </div>
                )}
                
                {selectedCategory !== 'Toate' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFDF0', padding: '6px 12px', borderRadius: '20px', border: '1px solid var(--primary-yellow)' }}>
                    <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Categorie:</span>
                    <strong style={{ fontSize: '14px', color: '#0F172A' }}>{selectedCategory}</strong>
                    <button onClick={() => onSelectCategory('Toate')} style={{ display: 'flex', background: 'var(--primary-yellow)', border: 'none', borderRadius: '50%', padding: '2px', cursor: 'pointer', color: '#0F172A' }}>
                      <X size={12} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <select
              value={sortBy}
              onChange={(e) => onSelectSort(e.target.value)}
              style={{
                padding: '10px 32px 10px 16px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                outline: 'none',
                background: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23334155%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px top 50%',
                backgroundSize: '10px auto',
              }}
            >
              <option value="Recomandate">Recomandate</option>
              <option value="Cele mai noi">Cele mai noi</option>
              <option value="Preț: Mic la Mare">Preț crescător</option>
              <option value="Preț: Mare la Mic">Preț descrescător</option>
            </select>

            <div style={{ display: 'flex', background: '#F8FAFC', borderRadius: '8px', padding: '4px', border: '1px solid #E2E8F0' }}>
              <button
                onClick={() => onToggleViewMode('pro')}
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  border: 'none',
                  background: viewMode === 'pro' || viewMode === 'classic' ? '#049D88' : 'transparent',
                  color: viewMode === 'pro' || viewMode === 'classic' ? '#fff' : '#64748B',
                  cursor: 'pointer',
                  display: 'flex',
                  transition: 'all 0.2s'
                }}
                title="Afișare Grilă"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => onToggleViewMode('list')}
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  border: 'none',
                  background: viewMode === 'list' ? '#049D88' : 'transparent',
                  color: viewMode === 'list' ? '#fff' : '#64748B',
                  cursor: 'pointer',
                  display: 'flex',
                  transition: 'all 0.2s'
                }}
                title="Afișare Listă"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className={`product-grid ${viewMode === 'pro' || viewMode === 'classic' ? 'pro-mode' : 'list-mode'}`} style={{ margin: 0, padding: 0 }}>
          {products.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '12px' }}>
              <Search size={48} color="#CBD5E1" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>Nu am găsit rezultate</h3>
              <p style={{ color: '#64748B' }}>Încearcă să modifici termenii căutării sau filtrele selectate.</p>
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                onAddToCart={(p) => onAddToCart(p)}
                onQuickView={(p) => onQuickView(p)}
                isFavorite={favorites.some((f) => f.id === product.id)}
                onToggleFavorite={onToggleFavorite}
                onGoToProfile={onGoToProfile}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};
