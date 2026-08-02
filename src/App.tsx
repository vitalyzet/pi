import React, { useState, useMemo, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Header } from './components/Header';

import { FilterBar } from './components/FilterBar';
import { ProCategoryBar } from './components/ProCategoryBar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { LoginModal } from './components/LoginModal';
import { UserDashboardPage } from './components/UserDashboardPage';
import { AdminPanelPage } from './components/AdminPanelPage';
import { BrandMarquee } from './components/BrandMarquee';
import { PublishModal } from './components/PublishModal';
import { AutoPublishModal } from './components/AutoPublishModal';
import { AutoDetailModal } from './components/AutoDetailModal';
import { ProductDetailPage } from './components/ProductDetailPage';
import { PublishListingPage } from './components/PublishListingPage';
import { ReviewsPage } from './components/ReviewsPage';
import { PRODUCTS, Product } from './data/products';
import { saveListingToFirebase, fetchListingsFromFirebase } from './lib/firebase';
import { AVATARS } from './components/AvatarSelectionModal';

export const App: React.FC = () => {
  // Page View Mode: 'store' | 'dashboard' | 'admin' | 'publish' | 'reviews'
  const [currentView, setCurrentView] = useState<'store' | 'dashboard' | 'admin' | 'publish' | 'reviews'>('store');

  // Dynamic Store Settings
  const [announcementText, setAnnouncementText] = useState('Livrare la Easybox');
  const [productList, setProductList] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pinpin_products');
    if (saved) {
      try {
        const parsed: Product[] = JSON.parse(saved);
        // Filter out old demo products
        return parsed.filter(p => !['auto-1', 'auto-2', '1', '2', '3', '4', '5', '6', '7', '8'].includes(p.id));
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('pinpin_products', JSON.stringify(productList));
  }, [productList]);

  // Fetch Firebase listings on mount
  useEffect(() => {
    fetchListingsFromFirebase().then((firebaseListings) => {
      if (firebaseListings.length > 0) {
        setProductList((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newItems = firebaseListings.filter((p) => !existingIds.has(p.id));
          return [...newItems, ...prev];
        });
      }
    });
  }, []);

  // View Mode: 'classic' (4 cards) | 'pro' (5 cards)
  const [viewMode, setViewMode] = useState<'classic' | 'pro'>(() => {
    const saved = localStorage.getItem('pinpin_view_mode');
    return (saved === 'pro' || saved === 'classic') ? saved : 'classic';
  });

  const handleSetViewMode = (mode: 'classic' | 'pro') => {
    setViewMode(mode);
    localStorage.setItem('pinpin_view_mode', mode);
  };

  // Filters & Sort State
  const [selectedCategory, setSelectedCategory] = useState('Toate');
  const [selectedFeeling, setSelectedFeeling] = useState('Toate');
  const [selectedDesign, setSelectedDesign] = useState('Toate');
  const [selectedColor, setSelectedColor] = useState('Toate');
  const [sortBy, setSortBy] = useState('Recomandate');

  // Pagination / Load More State
  const [visibleCount, setVisibleCount] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Cart & Modal State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isAutoPublishOpen, setIsAutoPublishOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [userAvatarIndex, setUserAvatarIndex] = useState(() => {
    const saved = localStorage.getItem('pinpin_avatar_index');
    return saved ? parseInt(saved, 10) : 0;
  });

  const handleAvatarChange = (index: number) => {
    setUserAvatarIndex(index);
    localStorage.setItem('pinpin_avatar_index', index.toString());
  };

  const handleToggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        const nextFavorites = [...prev, product];
        setToastMessage(`Salvat! Acum ai ${nextFavorites.length} anunțuri salvate.`);
        setTimeout(() => setToastMessage(null), 3000);
        return nextFavorites;
      }
    });
  };

  const handlePublishProduct = (newProd: Product) => {
    setProductList((prev) => [newProd, ...prev]);
    saveListingToFirebase(newProd);

    setSelectedCategory('Toate');
    setSelectedFeeling('Toate');
    setSelectedDesign('Toate');
    setSelectedColor('Toate');
    setToastMessage('Anunțul tău a fost publicat și salvat în Firebase!');
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Cart Action Handlers
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setToastMessage(`Adăugat în coș: ${product.title}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...productList];

    if (selectedCategory !== 'Toate') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedFeeling !== 'Toate') {
      result = result.filter((p) => p.feeling === selectedFeeling);
    }
    if (selectedDesign !== 'Toate') {
      result = result.filter((p) => p.design === selectedDesign);
    }
    if (selectedColor !== 'Toate') {
      result = result.filter((p) => p.color === selectedColor);
    }

    if (sortBy === 'Preț: Mic la Mare') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Preț: Mare la Mic') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [productList, selectedCategory, selectedFeeling, selectedDesign, selectedColor, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const totalCount = 157 + (productList.length - PRODUCTS.length);
  const displayedCount = Math.min(totalCount, Math.max(40, displayedProducts.length * 5));

  const totalCartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleUserClick = () => {
    if (isLoggedIn) {
      setCurrentView('dashboard');
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#222',
            color: '#fff',
            padding: '14px 24px',
            borderRadius: '8px',
            zIndex: 1000,
            fontSize: '14px',
            fontWeight: 600,
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          ✓ {toastMessage}
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={totalCartItemsCount}
        favoritesCount={favorites.length}
        isLoggedIn={isLoggedIn}
        announcementText={announcementText}
        userAvatar={AVATARS[userAvatarIndex]}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenUser={handleUserClick}
        onOpenAdmin={() => setCurrentView('admin')}
        onGoToStore={() => {
          setSelectedDetailProduct(null);
          setCurrentView('store');
        }}
        onOpenPublish={() => {
          setSelectedDetailProduct(null);
          setCurrentView('publish');
        }}
        onOpenReviews={() => {
          setSelectedDetailProduct(null);
          setCurrentView('reviews');
        }}
      />

      {/* MAIN VIEW SWITCH */}
      {currentView === 'admin' ? (
        <AdminPanelPage
          onBackToStore={() => setCurrentView('store')}
          announcementText={announcementText}
          onUpdateAnnouncement={(text) => setAnnouncementText(text)}
          onAddProduct={(newProd) => setProductList([newProd, ...productList])}
        />
      ) : currentView === 'dashboard' ? (
        <UserDashboardPage
          onBackToStore={() => setCurrentView('store')}
          onLogout={() => {
            setIsLoggedIn(false);
            setCurrentView('store');
            setToastMessage('Te-ai deconectat cu succes.');
            setTimeout(() => setToastMessage(null), 3000);
          }}
          onViewProduct={(p) => setSelectedDetailProduct(p)}
          userAds={productList}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          userAvatarIndex={userAvatarIndex}
          onAvatarChange={handleAvatarChange}
        />
      ) : currentView === 'publish' ? (
        <PublishListingPage
          onBackToStore={() => setCurrentView('store')}
          onPublishProduct={handlePublishProduct}
        />
      ) : currentView === 'reviews' ? (
        <ReviewsPage />
      ) : selectedDetailProduct ? (
        <ProductDetailPage
          product={selectedDetailProduct}
          onBack={() => setSelectedDetailProduct(null)}
          onAddToCart={(p, qty) => handleAddToCart(p, qty)}
          onSelectProduct={(p) => setSelectedDetailProduct(p)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          relatedProducts={productList.filter(
            (p) => p.id !== selectedDetailProduct.id && p.category === selectedDetailProduct.category
          )}
          userAvatarIndex={userAvatarIndex}
          onAvatarChange={handleAvatarChange}
        />
      ) : (
        <>
          {/* Category Header */}
          <section className="category-header-section" style={{ padding: '0 0 20px 0' }}>
            <ProCategoryBar
              selectedCategory={selectedCategory}
              onSelectCategory={(val) => {
                setSelectedCategory(val);
                setVisibleCount(20);
              }}
            />
          </section>

          {/* Filter Bar */}
          <FilterBar
            selectedCategory={selectedCategory}
            selectedFeeling={selectedFeeling}
            selectedDesign={selectedDesign}
            selectedColor={selectedColor}
            sortBy={sortBy}
            productCount={displayedProducts.length}
            viewMode={viewMode}
            onSelectCategory={(val) => {
              setSelectedCategory(val);
              setVisibleCount(20);
            }}
            onSelectFeeling={setSelectedFeeling}
            onSelectDesign={setSelectedDesign}
            onSelectColor={setSelectedColor}
            onSelectSort={setSortBy}
            onToggleViewMode={handleSetViewMode}
          />

          {/* Main Product Grid */}
          <main className="product-grid-container">
            <div className={`product-grid ${viewMode === 'pro' ? 'pro-mode' : ''}`}>
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onQuickView={(p) => setSelectedDetailProduct(p)}
                  isFavorite={favorites.some((f) => f.id === product.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>

            {/* Load More & Viewing Progress Section */}
            <div className="load-more-section">
              <div className="progress-text">
                Ai vizualizat {displayedCount} din {totalCount} produse
              </div>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${(displayedCount / totalCount) * 100}%` }}
                />
              </div>
              {displayedCount < totalCount && (
                <button
                  className="load-more-btn"
                  disabled={isLoadingMore}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                  onClick={() => {
                    setIsLoadingMore(true);
                    setTimeout(() => {
                      setVisibleCount((prev) => prev + 20);
                      setIsLoadingMore(false);
                    }, 800);
                  }}
                >
                  {isLoadingMore ? (
                    <>
                      <span className="spinner" /> SE ÎNCARCĂ...
                    </>
                  ) : (
                    'ÎNCARCĂ MAI MULTE'
                  )}
                </button>
              )}
            </div>
          </main>

          {/* Features Section */}
          <FeaturesSection />

          {/* Car Brands Infinite Auto-Slider Marquee */}
          <BrandMarquee onSelectBrand={(brandName) => {
            setSelectedCategory('Auto');
            setToastMessage(`Filtrat după marca ${brandName}`);
            setTimeout(() => setToastMessage(null), 2500);
          }} />

          {/* Recommendations Section */}
          <section className="recommendations-section">
            <h2 className="line-heading section-heading" style={{ marginBottom: '40px' }}>
              RECOMANDĂRI
            </h2>
            <div className="product-grid">
              {productList.slice(0, 4).map((product) => (
                <ProductCard
                  key={`rec-${product.id}`}
                  product={product}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  isFavorite={favorites.some((f) => f.id === product.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleToggleFavorite}
      />

      {quickViewProduct && (quickViewProduct.category === 'Auto' || quickViewProduct.title.toLowerCase().includes('polo') || quickViewProduct.title.toLowerCase().includes('bmw')) ? (
        <AutoDetailModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(product, qty) => handleAddToCart(product, qty)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(product, qty) => handleAddToCart(product, qty)}
        />
      )}

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedDetailProduct(p)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setToastMessage('Te-ai autentificat cu succes!');
          setTimeout(() => setToastMessage(null), 3000);
        }}
      />

      <PublishModal
        isOpen={isPublishOpen}
        onClose={() => setIsPublishOpen(false)}
        onPublishProduct={handlePublishProduct}
        onOpenAutoPublish={() => {
          setIsPublishOpen(false);
          setIsAutoPublishOpen(true);
        }}
      />

      <AutoPublishModal
        isOpen={isAutoPublishOpen}
        onClose={() => setIsAutoPublishOpen(false)}
        onPublishProduct={handlePublishProduct}
      />

      {/* Floating Publish Button */}
      <button
        onClick={() => {
          setSelectedDetailProduct(null);
          setCurrentView('publish');
        }}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          backgroundColor: 'var(--primary-yellow)',
          color: '#0F172A',
          border: 'none',
          borderRadius: '30px',
          padding: '14px 22px',
          fontSize: '14px',
          fontWeight: 800,
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(248, 210, 71, 0.5)',
          zIndex: 900,
          transition: 'transform 0.2s ease'
        }}
        title="Publică un anunț nou"
      >
        <PlusCircle size={20} color="#0F172A" />
        <span>+ ADAUGĂ ANUNȚ</span>
      </button>
    </div>
  );
};
