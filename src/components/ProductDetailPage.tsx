import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  ShoppingBag,
  Calendar,
  Gauge,
  Fuel,
  Sliders,
  ShieldCheck,
  MapPin,
  User,
  Heart,
  Share2,
  CheckCircle,
  Truck,
  RotateCcw,
  Sparkles,
  Flag,
  Clock,
  Settings,
  Car
} from 'lucide-react';
import { Product } from '../data/products';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  relatedProducts: Product[];
  favorites?: Product[];
  onToggleFavorite?: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onSelectProduct,
  relatedProducts,
  favorites = [],
  onToggleFavorite,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showPhone, setShowPhone] = useState(false);
  const [activeImage, setActiveImage] = useState(product.image);

  useEffect(() => {
    setActiveImage(product.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.image, product.id]);

  const isFavorite = favorites.some((p) => p.id === product.id);
  const allImages = Array.from(new Set([product.image, ...(product.images || [])]));

  const isAuto = product.category === 'Auto' || product.title.toLowerCase().includes('polo') || product.title.toLowerCase().includes('bmw');
  const isModa = product.category === 'Modă';

  return (
    <div className="product-detail-page-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 24px 60px 24px' }}>
      {/* Breadcrumb & Back Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#F1F5F9',
            border: '1px solid #CBD5E1',
            borderRadius: '12px',
            padding: '10px 18px',
            fontSize: '14px',
            fontWeight: 800,
            color: '#0F172A',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowLeft size={18} /> Înapoi la Magazin
        </button>

        <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
          <span>Acasă</span> &gt; <span style={{ color: '#0F172A', fontWeight: 700 }}>{product.category}</span> &gt; <span>{product.title}</span>
        </div>
      </div>

      {/* Main Internal Product Detail Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '32px',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
          marginBottom: '50px'
        }}
      >
        {/* Left Column: Gallery & Badges */}
        <div>
          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <img
              src={activeImage}
              alt={product.title}
              style={{ width: '100%', height: '480px', objectFit: 'cover' }}
            />

            {/* Discount Tag */}
            {product.discountPercentage && (
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  backgroundColor: 'var(--pink-accent)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '14px',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(229, 91, 134, 0.3)'
                }}
              >
                -{product.discountPercentage}%
              </div>
            )}

            {/* Verified Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                backgroundColor: '#FFFFFF',
                color: '#059669',
                fontWeight: 800,
                fontSize: '12px',
                padding: '8px 16px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
              }}
            >
              <ShieldCheck size={18} color="#059669" />
              ANUNȚ VERIFICAT PINPIN
            </div>
          </div>
          
          {/* Thumbnails Gallery */}
          {allImages.length > 1 && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
              {allImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.title} - Foto ${idx + 1}`}
                  onClick={() => setActiveImage(img)}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    border: activeImage === img ? '3px solid var(--primary-yellow)' : '1px solid #E2E8F0',
                    opacity: activeImage === img ? 1 : 0.6,
                    transition: 'all 0.2s',
                    flexShrink: 0
                  }}
                />
              ))}
            </div>
          )}

          {/* Description (Moved here) */}
          <div style={{ marginTop: '32px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
              DESCRIERE DETALIATĂ
            </span>
            <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
              {product.description || 'Anunț verificat pe platforma PinPin. Produs păstrat în condiții excelente, livrat rapid oriunde în țară cu posibilitate de verificare.'}
            </p>
          </div>

          {isModa && (
            /* Moda Specifications Grid */
            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { label: 'MATERIE', value: product.specs?.material || '100% Poliester' },
                { label: 'TIP', value: product.specs?.type || 'Dantelă' },
                { label: 'DETALII', value: product.specs?.details || 'Bretele' },
                { label: 'LUNGIME', value: product.specs?.length || 'Scurți' },
                { label: 'STIL', value: product.specs?.style || 'Sport - elegant' },
                { label: 'CULOARE', value: product.specs?.color || 'Alb, Negru' },
                { label: 'DIMENSIUNEA FOTOGRAFIEI MODELULUI', value: product.specs?.modelSize || 'XS' },
                { label: 'COLECȚIE', value: product.specs?.collection || 'COLECȚIA PRIMAVARA/ VARA 2026' },
              ].map((row, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                  <div style={{ backgroundColor: '#F0F0F0', padding: '16px 20px', fontSize: '14px', fontWeight: 400, color: '#333333', fontFamily: '"Times New Roman", Times, serif' }}>
                    {row.label}
                  </div>
                  <div style={{ backgroundColor: '#F4F4F4', padding: '16px 20px', fontSize: '15px', fontWeight: 400, color: '#333333', fontFamily: '"Times New Roman", Times, serif' }}>
                    {row.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Title, Specs & Purchase Card */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {isModa ? (
            /* Moda Specific Right Column */
            <div style={{ padding: '0 20px' }}>
              {/* Title */}
              <h1 style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {product.title}
              </h1>
              
              {/* Price */}
              <div style={{ marginBottom: '4px' }}>
                <span style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A' }}>
                  {product.price} lei
                </span>
              </div>
              <div style={{ fontSize: '13px', color: '#94A3B8', fontFamily: '"Times New Roman", Times, serif', marginBottom: '32px' }}>
                cu TVA
              </div>

              {/* Code */}
              <div style={{ fontSize: '15px', color: '#334155', fontFamily: '"Times New Roman", Times, serif', marginBottom: '24px' }}>
                Code: {product.id || '2610825'}
              </div>

              {/* Collection */}
              <div style={{ fontSize: '15px', color: '#334155', fontFamily: '"Times New Roman", Times, serif', marginBottom: '32px', textTransform: 'uppercase' }}>
                {product.specs?.collection || 'COLECȚIA PRIMĂVARĂ/VARĂ 2026'}
              </div>

              {/* Size Selector */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontFamily: '"Times New Roman", Times, serif', color: '#334155' }}>
                <span style={{ fontSize: '14px', textTransform: 'uppercase' }}>MĂRIME</span>
                <div style={{ position: 'relative' }}>
                  <select 
                    defaultValue={product.specs?.modelSize || "S"}
                    style={{ 
                      appearance: 'none', 
                      background: 'transparent', 
                      border: 'none', 
                      fontSize: '14px', 
                      textTransform: 'uppercase', 
                      fontFamily: '"Times New Roman", Times, serif', 
                      color: '#334155', 
                      paddingRight: '24px', 
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                  <span style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', fontSize: '10px', pointerEvents: 'none', color: '#334155' }}>▼</span>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', marginBottom: '24px' }} />

              {/* Add to Cart Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CBD5E1', padding: '12px 16px', gap: '24px', width: 'fit-content' }}>
                  <span style={{ cursor: 'pointer', color: '#94A3B8' }} onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</span>
                  <span style={{ fontSize: '15px', color: '#0F172A', minWidth: '12px', textAlign: 'center' }}>{quantity}</span>
                  <span style={{ cursor: 'pointer', color: '#94A3B8' }} onClick={() => setQuantity(quantity + 1)}>+</span>
                </div>
                
                <button
                  onClick={() => onAddToCart(product, quantity)}
                  style={{
                    flex: 1,
                    backgroundColor: '#263238',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '16px 24px',
                    fontSize: '13px',
                    fontFamily: '"Times New Roman", Times, serif',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  ADAUGA IN C...
                </button>

                <button 
                  onClick={() => onToggleFavorite && onToggleFavorite(product)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <Heart size={24} color={isFavorite ? '#E55B86' : '#94A3B8'} fill={isFavorite ? '#E55B86' : '#94A3B8'} />
                </button>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', marginBottom: '24px' }} />
            </div>
          ) : (
            /* Standard / Auto Right Column */
            <>
              <div>
            {/* Category Tag & Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  backgroundColor: '#FFFDF0',
                  color: '#0F172A',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: '1px solid var(--primary-yellow)'
                }}
              >
                {product.category}
              </span>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => onToggleFavorite && onToggleFavorite(product)}
                  style={{
                    background: '#F1F5F9',
                    border: 'none',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Heart size={20} color={isFavorite ? '#E55B86' : '#64748B'} fill={isFavorite ? '#E55B86' : 'none'} />
                </button>
                <button
                  style={{
                    background: '#F1F5F9',
                    border: 'none',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Share2 size={20} color="#64748B" />
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0', lineHeight: 1.25 }}>
              {product.title}
            </h1>

            {/* Published Date & Location */}
            {(product.createdAt || product.location) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#64748B', fontSize: '14px', fontWeight: 600, marginBottom: '24px' }}>
                {product.createdAt && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={16} />
                    Publicat pe {new Date(product.createdAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                )}
                {product.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={16} />
                    {product.location}
                  </div>
                )}
              </div>
            )}

            {/* Pricing Section */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '24px' }}>
              <span style={{ fontSize: '36px', fontWeight: 800, color: '#E55B86' }}>
                {product.price} €
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '20px', color: '#94A3B8', textDecoration: 'line-through', fontWeight: 600 }}>
                  {product.originalPrice} €
                </span>
              )}
            </div>

            {/* Automotive Specifications Grid (Matching Image 2 Layout) */}
            {isAuto ? (
              <div
                style={{
                  marginBottom: '28px',
                  backgroundColor: '#F8FAFC',
                  padding: '24px',
                  borderRadius: '20px',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '24px 16px'
                  }}
                >
                  {/* 1. Kilometraje */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ color: '#EA580C', flexShrink: 0, marginTop: '2px' }}>
                      <Flag size={24} color="#EA580C" />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginBottom: '2px' }}>
                        Kilometraje / Rulaj
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                        {product.specs?.mileage ? `${product.specs.mileage} km` : '153.694 km'}
                      </div>
                    </div>
                  </div>

                  {/* 2. Combustibil */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ color: '#EA580C', flexShrink: 0, marginTop: '2px' }}>
                      <Clock size={24} color="#EA580C" />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginBottom: '2px' }}>
                        Combustibil
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                        {product.specs?.fuel || 'Gasolina'}
                      </div>
                    </div>
                  </div>

                  {/* 3. Transmisión */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ color: '#EA580C', flexShrink: 0, marginTop: '2px' }}>
                      <Settings size={24} color="#EA580C" />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginBottom: '2px' }}>
                        Transmisión / Cutie
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                        {product.specs?.gearbox || 'Manuală'}
                      </div>
                    </div>
                  </div>

                  {/* 4. Primer registro / An */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ color: '#EA580C', flexShrink: 0, marginTop: '2px' }}>
                      <Calendar size={24} color="#EA580C" />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginBottom: '2px' }}>
                        Primer registro / An
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                        {product.specs?.year || '2012'}
                      </div>
                    </div>
                  </div>

                  {/* 5. Propietarios / Marcă */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ color: '#EA580C', flexShrink: 0, marginTop: '2px' }}>
                      <User size={24} color="#EA580C" />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginBottom: '2px' }}>
                        Marcă
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                        {product.specs?.brand || 'Volkswagen'}
                      </div>
                    </div>
                  </div>

                  {/* 6. Caroserie */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ color: '#EA580C', flexShrink: 0, marginTop: '2px' }}>
                      <Car size={24} color="#EA580C" />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginBottom: '2px' }}>
                        Caroserie
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                        {product.specs?.caroserie || 'Sedan'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Standard Product Features */
              <div style={{ display: 'flex', gap: '20px', marginBottom: '28px', backgroundColor: '#F8FAFC', padding: '16px 20px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Truck size={20} color="#059669" />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Livrare Rapidă Easybox</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <RotateCcw size={20} color="#0284C7" />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Retur Gratuit 14 Zile</span>
                </div>
              </div>
            )}

          </div>
          </>
        )}

          {/* Bottom Seller Card & Contact Buttons */}
          <div style={{ backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '20px', border: '1px solid #E2E8F0', marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#FEF08A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#0F172A' }}>
                  <User size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                    Alex M. <CheckCircle size={15} color="#059669" style={{ display: 'inline', verticalAlign: 'middle' }} />
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} /> București / Oradea
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '12px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '6px 12px', borderRadius: '8px' }}>
                ★ 4.9 Vânzător Top
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                onClick={() => setShowPhone(!showPhone)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px',
                  borderRadius: '14px',
                  border: '1.5px solid #059669',
                  backgroundColor: showPhone ? '#ECFDF5' : '#059669',
                  color: showPhone ? '#059669' : '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Phone size={18} />
                {showPhone ? '0745 123 456' : 'SUNĂ VÂNZĂTOR'}
              </button>

              <button
                onClick={() => onAddToCart(product, quantity)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px',
                  borderRadius: '14px',
                  border: 'none',
                  backgroundColor: '#FEA742',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 6px 16px rgba(254, 167, 66, 0.35)'
                }}
              >
                <ShoppingBag size={18} />
                ADAUGĂ ÎN COȘ
              </button>
            </div>
          </div>
    </div>
  </div>

      {/* Related / Similar Products Carousel */}
      {relatedProducts.length > 0 && (
        <section>
          <div style={{ marginBottom: '20px' }}>
            <h3 className="line-heading" style={{ margin: 0, fontSize: '16px' }}>
              ANUNȚURI SIMILARE RECOMANDATE
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {relatedProducts.slice(0, 4).map((relProduct) => (
              <div
                key={relProduct.id}
                onClick={() => onSelectProduct(relProduct)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid #E2E8F0',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
                }}
              >
                <img src={relProduct.image} alt={relProduct.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--pink-accent)', textTransform: 'uppercase' }}>
                    {relProduct.category}
                  </span>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '4px 0 8px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {relProduct.title}
                  </h4>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#E55B86' }}>
                    {relProduct.price} €
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
