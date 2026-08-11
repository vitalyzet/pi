import React, { useState, useMemo, useEffect } from 'react';
import { PlusCircle, X, ArrowUp } from 'lucide-react';
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
import { SuperAdminPage } from './components/SuperAdminPage';
import { BrandMarquee } from './components/BrandMarquee';
import { PublishModal } from './components/PublishModal';
import { AutoPublishModal } from './components/AutoPublishModal';
import { AutoDetailModal } from './components/AutoDetailModal';
import { SearchResultsView } from './components/SearchResultsView';
import { ProductDetailPage } from './components/ProductDetailPage';
import { PublishListingPage } from './components/PublishListingPage';
import { ReviewsPage } from './components/ReviewsPage';
import { PublicUserProfilePage } from './components/PublicUserProfilePage';
import { PRODUCTS, Product } from './data/products';
import { saveListingToFirebase, fetchListingsFromFirebase } from './lib/firebase';
import { AVATARS } from './components/AvatarSelectionModal';
import { RegionLanguageModal } from './components/RegionLanguageModal';

export const App: React.FC = () => {
  // Page View Mode: 'store' | 'dashboard' | 'super_admin' | 'publish' | 'reviews' | 'public_profile'
  const [currentView, setCurrentView] = useState<'store' | 'dashboard' | 'super_admin' | 'publish' | 'reviews' | 'public_profile'>('store');
  const [initialDashboardTab, setInitialDashboardTab] = useState('my_ads');

  // Dynamic Store Settings
  const [announcementText, setAnnouncementText] = useState('Anunțurile tale sunt acum mult mai vizibile!');
  const [productList, setProductList] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pinpin_products');
    if (saved) {
      try {
        const parsed: Product[] = JSON.parse(saved);
        const valid = parsed.filter(p => !['auto-1', 'auto-2', '1', '2', '3', '4', '5', '6', '7', '8'].includes(p.id));
        // Merge PRODUCTS to ensure demo items load even if cache exists
        const existingIds = new Set(valid.map(p => p.id));
        const deletedSaved = localStorage.getItem('pinpin_deleted_products');
        const deletedSet = deletedSaved ? new Set(JSON.parse(deletedSaved)) : new Set();
        
        const newDemos = PRODUCTS.filter(p => !existingIds.has(p.id) && !deletedSet.has(p.id));
        return [...newDemos, ...valid];
      } catch (e) {
        console.error(e);
      }
    }
    return PRODUCTS;
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

  // View Mode: 'classic' (4 cards) | 'pro' (5 cards) | 'list'
  const [viewMode, setViewMode] = useState<'classic' | 'pro' | 'list'>(() => {
    const saved = localStorage.getItem('pinpin_view_mode');
    return (saved === 'pro' || saved === 'classic' || saved === 'list') ? saved : 'classic';
  });

  const getRelatedProducts = (currentProduct: Product | null, allProducts: Product[]) => {
    if (!currentProduct) return [];
    
    let related = allProducts.filter(p => p.id !== currentProduct.id && p.category === currentProduct.category);
    
    const isAuto = currentProduct.category === 'Auto' || currentProduct.category === 'Auto & Moto' || currentProduct.category === 'Vehicule';
    
    if (isAuto) {
      const currentBrand = currentProduct.specs?.brand || currentProduct.title.split(' ')[0];
      const currentLocation = currentProduct.location;
  
      related = related.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;
  
        const aBrand = a.specs?.brand || a.title.split(' ')[0];
        const bBrand = b.specs?.brand || b.title.split(' ')[0];
  
        if (aBrand.toLowerCase() === currentBrand.toLowerCase()) scoreA += 10;
        if (bBrand.toLowerCase() === currentBrand.toLowerCase()) scoreB += 10;
  
        if (currentLocation) {
          if (a.location === currentLocation) scoreA += 5;
          if (b.location === currentLocation) scoreB += 5;
        }
  
        return scoreB - scoreA;
      });
    }
  
    return related;
  };

  const handleSetViewMode = (mode: 'classic' | 'pro' | 'list') => {
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(() => {
    const saved = localStorage.getItem('pinpin_region');
    return (saved && saved !== 'global') ? saved : 'ro';
  });
  const [selectedLanguage, setSelectedLanguage] = useState(() => localStorage.getItem('pinpin_language') || 'ro');
  
  useEffect(() => {
    localStorage.setItem('pinpin_region', selectedCountry);
    setSelectedCity('Toate'); // Reset city when country changes
  }, [selectedCountry]);

  useEffect(() => {
    localStorage.setItem('pinpin_language', selectedLanguage);
  }, [selectedLanguage]);
  const [selectedCity, setSelectedCity] = useState('Toate');
  const [maxPrice, setMaxPrice] = useState('100000');
  const [transactionType, setTransactionType] = useState('Toate');
  const [selectedFuel, setSelectedFuel] = useState('Orice');
  const [selectedBody, setSelectedBody] = useState('Orice');
  const [selectedTransmission, setSelectedTransmission] = useState('Orice');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isAutoPublishOpen, setIsAutoPublishOpen] = useState(false);
  const [isRegionLanguageOpen, setIsRegionLanguageOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  useEffect(() => {
    setIsGlobalLoading(true);
    const timer = setTimeout(() => {
      setIsGlobalLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, selectedCountry, selectedCity, sortBy, maxPrice, transactionType]);

  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pinpin_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('pinpin_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const [publicProfileName, setPublicProfileName] = useState<string | null>(null);
  const [selectedSellerForReviews, setSelectedSellerForReviews] = useState<string | null>(null);
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

  const handleDeleteProduct = (productId: string) => {
    setProductList((prev) => prev.filter(p => p.id !== productId));
    setFavorites((prev) => prev.filter(p => p.id !== productId));
    
    // Save to deleted_products so it doesn't get re-merged on refresh
    const deletedSaved = localStorage.getItem('pinpin_deleted_products');
    const deletedList: string[] = deletedSaved ? JSON.parse(deletedSaved) : [];
    if (!deletedList.includes(productId)) {
      deletedList.push(productId);
      localStorage.setItem('pinpin_deleted_products', JSON.stringify(deletedList));
    }

    setToastMessage('Anunțul a fost șters definitiv.');
    setTimeout(() => setToastMessage(null), 3000);
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

    if (selectedCategory === 'Toate' && !searchQuery) {
      result = result.filter(p => p.category === 'Imobiliare' || p.category === 'Auto' || p.category === 'Auto & Moto' || p.category === 'Vehicule');
    } else if (selectedCategory !== 'Toate') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    
    if (searchQuery) {
      const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
      result = result.filter((p) => {
        const searchableText = `${p.title} ${p.category} ${p.location || ''} ${p.description || ''}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      });
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

    if (selectedCountry === 'ro') {
      result = result.filter(p => !p.location?.toUpperCase().includes('MADRID') && !p.location?.toUpperCase().includes('PARIS') && !p.location?.toUpperCase().includes('ROMA'));
    } else if (selectedCountry === 'es') {
      result = result.filter(p => p.location?.toUpperCase().includes('MADRID') || p.location?.toUpperCase().includes('BARCELONA') || p.location?.toUpperCase().includes('SPANIA'));
    } else if (selectedCountry === 'it') {
      result = result.filter(p => p.location?.toUpperCase().includes('ROMA') || p.location?.toUpperCase().includes('MILAN') || p.location?.toUpperCase().includes('ITALIA'));
    } else if (selectedCountry === 'fr') {
      result = result.filter(p => p.location?.toUpperCase().includes('PARIS') || p.location?.toUpperCase().includes('LYON') || p.location?.toUpperCase().includes('FRANȚA'));
    } else if (selectedCountry === 'de') {
      result = result.filter(p => p.location?.toUpperCase().includes('BERLIN') || p.location?.toUpperCase().includes('MUNCHEN') || p.location?.toUpperCase().includes('GERMANIA'));
    } else if (selectedCountry === 'nl') {
      result = result.filter(p => p.location?.toUpperCase().includes('AMSTERDAM') || p.location?.toUpperCase().includes('ROTTERDAM') || p.location?.toUpperCase().includes('OLANDA'));
    }

    if (selectedCity !== 'Toate') {
      result = result.filter(p => p.location?.toLowerCase().includes(selectedCity.toLowerCase()));
    }

    if (maxPrice && maxPrice !== '100000') {
      result = result.filter(p => p.price <= parseInt(maxPrice));
    }

    if (selectedCategory === 'Imobiliare' && transactionType !== 'Toate') {
      result = result.filter(p => p.feeling === transactionType);
    }
    
    if (selectedFuel !== 'Orice') {
      result = result.filter(p => p.specs?.fuel === selectedFuel);
    }
    if (selectedBody !== 'Orice') {
      result = result.filter(p => p.specs?.caroserie === selectedBody);
    }
    if (selectedTransmission !== 'Orice') {
      result = result.filter(p => p.specs?.transmission === selectedTransmission);
    }

    if (sortBy === 'Preț: Mic la Mare') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Preț: Mare la Mic') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Cele mai noi') {
      result.sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      });
    } else {
      // Smart category grouping (Recomandate)
      const grouped = result.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
      }, {} as Record<string, typeof result>);

      const categoryLatestTimes: Record<string, number> = {};
      Object.keys(grouped).forEach(cat => {
        let maxTime = 0;
        grouped[cat].forEach(p => {
          const time = p.createdAt ? new Date(p.createdAt).getTime() : 0;
          if (time > maxTime) maxTime = time;
        });
        categoryLatestTimes[cat] = maxTime;
      });

      const sortedCategories = Object.keys(grouped).sort((catA, catB) => {
        return categoryLatestTimes[catB] - categoryLatestTimes[catA];
      });

      result = sortedCategories.flatMap(cat => {
        return grouped[cat].sort((a, b) => {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeB - timeA;
        });
      });
    }

    return result;
  }, [productList, selectedCategory, selectedFeeling, selectedDesign, selectedColor, sortBy, selectedCountry, selectedCity, searchQuery, maxPrice, transactionType, selectedFuel, selectedBody, selectedTransmission]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const totalCount = 157 + (productList.length - PRODUCTS.length);
  const displayedCount = Math.min(totalCount, Math.max(40, displayedProducts.length * 5));

  const totalCartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleUserClick = () => {
    if (isLoggedIn) {
      setInitialDashboardTab('my_ads');
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

      {/* Global Loader Overlay */}
      {isGlobalLoading && (
        <div className="global-loader-overlay">
          <div className="loading-circle"></div>
        </div>
      )}

      {/* Header */}
      <Header
        showAnnouncementBar={selectedCategory === 'Modă' || selectedCategory === 'Electronice'}
        cartCount={totalCartItemsCount}
        favoritesCount={favorites.length}
        isLoggedIn={isLoggedIn}
        announcementText={announcementText}
        userAvatar={AVATARS[userAvatarIndex]}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenUser={handleUserClick}
        onOpenAdmin={() => {
          setInitialDashboardTab('admin_overview');
          setCurrentView('dashboard');
        }}
        onOpenSuperAdmin={() => setCurrentView('super_admin')}
        selectedRegion={selectedCountry}
        onSelectRegion={setSelectedCountry}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        isRegionLanguageOpen={isRegionLanguageOpen}
        onOpenRegionLanguage={() => setIsRegionLanguageOpen(!isRegionLanguageOpen)}
        onGoToStore={() => {
          setSelectedDetailProduct(null);
          setSelectedCategory('Toate');
          setSelectedFeeling('Toate');
          setSelectedDesign('Toate');
          setSelectedColor('Toate');
          setSelectedCity('Toate');
          setMaxPrice('100000');
          setTransactionType('Toate');
          setSelectedFuel('Orice');
          setSelectedBody('Orice');
          setSelectedTransmission('Orice');
          setSortBy('Recomandate');
          setSearchQuery('');
          setCurrentView('store');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPublish={() => {
          setSelectedDetailProduct(null);
          setCurrentView('publish');
        }}
        onOpenReviews={() => {
          setSelectedDetailProduct(null);
          setSelectedSellerForReviews(null);
          setCurrentView('reviews');
        }}
      />

      {/* MAIN VIEW SWITCH */}
      {currentView === 'super_admin' ? (
        <SuperAdminPage 
          onBackToStore={() => setCurrentView('store')}
          productsList={productList}
          onDeleteProduct={handleDeleteProduct}
        />
      ) : currentView === 'dashboard' ? (
        <UserDashboardPage
          initialTab={initialDashboardTab}
          announcementText={announcementText}
          onUpdateAnnouncement={(text) => setAnnouncementText(text)}
          onAddProduct={(newProd) => setProductList([newProd, ...productList])}
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
      ) : currentView === 'public_profile' && publicProfileName ? (
        <PublicUserProfilePage
          sellerName={publicProfileName}
          userAds={productList.slice(0, 3)} // Show some ads from the store as a demo
          onBack={() => setCurrentView('store')}
          onViewProduct={(p) => setSelectedDetailProduct(p)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          userAvatarIndex={userAvatarIndex}
        />
      ) : currentView === 'reviews' ? (
        <ReviewsPage sellerName={selectedSellerForReviews} />
      ) : selectedDetailProduct ? (
        <ProductDetailPage
          product={selectedDetailProduct}
          onBack={() => setSelectedDetailProduct(null)}
          onAddToCart={(p, qty) => handleAddToCart(p, qty)}
          onSelectProduct={(p) => setSelectedDetailProduct(p)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          relatedProducts={getRelatedProducts(selectedDetailProduct, productList)}
          userAvatarIndex={userAvatarIndex}
          onAvatarChange={handleAvatarChange}
          onShowReviews={(sellerName) => {
            setPublicProfileName(sellerName || 'Alexandru B.');
            setCurrentView('public_profile');
          }}
          onHomeClick={() => {
            setSelectedCategory('Toate');
            setSelectedDetailProduct(null);
          }}
          onCategoryClick={(cat) => {
            setSelectedCategory(cat);
            setSelectedDetailProduct(null);
          }}
        />
      ) : (searchQuery || selectedCategory !== 'Toate') ? (
        <SearchResultsView
          products={displayedProducts}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          selectedCategory={selectedCategory}
          onSelectCategory={(val) => {
            setSelectedCategory(val);
            setVisibleCount(20);
          }}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          maxPrice={maxPrice}
          onSetMaxPrice={setMaxPrice}
          transactionType={transactionType}
          onSetTransactionType={setTransactionType}
          selectedFuel={selectedFuel}
          onSelectFuel={setSelectedFuel}
          selectedBody={selectedBody}
          onSelectBody={setSelectedBody}
          selectedTransmission={selectedTransmission}
          onSelectTransmission={setSelectedTransmission}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          viewMode={viewMode}
          onToggleViewMode={handleSetViewMode}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onQuickView={(p) => setSelectedDetailProduct(p)}
          onGoToProfile={(sellerName) => {
            setPublicProfileName(sellerName);
            setCurrentView('public_profile');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
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
            <div className={`product-grid ${viewMode === 'pro' ? 'pro-mode' : ''} ${viewMode === 'list' ? 'list-mode' : ''}`}>
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onQuickView={(p) => setSelectedDetailProduct(p)}
                  isFavorite={favorites.some((f) => f.id === product.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onGoToProfile={(sellerName) => {
                    setPublicProfileName(sellerName);
                    setCurrentView('public_profile');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
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
              {filteredProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={`rec-${product.id}`}
                  product={product}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  isFavorite={favorites.some((f) => f.id === product.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onGoToProfile={(sellerName) => {
                    setPublicProfileName(sellerName);
                    setCurrentView('public_profile');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
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
        onSearchSubmit={(q) => setSearchQuery(q)}
        onSearchCategorySubmit={(q, cat) => {
          setSearchQuery(q);
          setSelectedCategory(cat);
        }}
        products={productList}
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

      {/* Floating Scroll to Top Button */}
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          border: '1px solid #E2E8F0',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          zIndex: 900,
          transition: 'all 0.2s ease'
        }}
        title="Mergi sus"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        }}
      >
        <ArrowUp size={24} color="#0F172A" />
      </button>

    </div>
  );
};
