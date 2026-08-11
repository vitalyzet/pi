import React from 'react';
import { Product } from '../data/products';
import { Heart, MapPin, Star, Clock, BedDouble, Maximize2, Layers, Hammer, Bath, Camera, Phone } from 'lucide-react';
import { AVATARS } from './AvatarSelectionModal';
import { formatPrice } from '../lib/format';

const getSellerAvatar = (product: Product) => {
  const hash = product.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATARS[hash % AVATARS.length];
};

interface ProductCardProps {
  product: Product;
  viewMode?: 'classic' | 'pro' | 'list';
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (product: Product) => void;
  onGoToProfile?: (sellerName: string) => void;
}

const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'Acum câteva secunde';
  if (minutes < 60) return `Acum ${minutes} min`;
  if (hours < 24) return `Acum ${hours} ore`;
  if (days === 1) return `Ieri`;
  return `Acum ${days} zile`;
};

// Auto date formatting (e.g., "3 iun. 2026")
const formatDateAuto = (dateStr: string) => {
  const date = new Date(dateStr);
  const months = ['ian.', 'feb.', 'mar.', 'apr.', 'mai', 'iun.', 'iul.', 'aug.', 'sep.', 'oct.', 'nov.', 'dec.'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = 'classic',
  onAddToCart,
  onQuickView,
  isFavorite = false,
  onToggleFavorite,
  onGoToProfile,
}) => {
  const isAuto = product.category === 'Auto' || product.category === 'Auto & Moto' || product.category === 'Vehicule';
  const isTurism = product.category === 'Turism' || product.category === 'Cazare';
  const isModa = product.category === 'Modă';
  const isJob = product.category === 'Locuri de muncă' || product.category === 'Servicii';
  const isImobiliare = product.category === 'Imobiliare';

  const isSale = product.title.toLowerCase().includes('vânzare') || product.feeling === 'Vânzare';
  const isSeeking = product.feeling === 'Caut de muncă' || product.title.toLowerCase().includes('caut');

  if (viewMode === 'list') {
    return (
      <div className="product-card auto-card-list" onClick={() => onQuickView(product)}>
        <div className="auto-list-image-wrapper">
          <img src={product.image} alt={product.title} className="auto-list-image" loading="lazy" />
          <div className="auto-list-camera-badge">
            <Camera size={14} /> {product.images ? product.images.length + 1 : 9}
          </div>
          <button 
            className={`auto-list-favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(product);
            }}
          >
            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          {product.discountPercentage && (
            <div className="auto-list-promo-badge">Fereastra de afișare</div>
          )}
        </div>
        
        <div className="auto-list-details">
          <div className="auto-list-header">
            {(isImobiliare || isJob) && (
              <div className={`job-badge ${isImobiliare ? (isSale ? 'seeking' : 'offering') : (isSeeking ? 'seeking' : 'offering')}`} style={{ marginBottom: '8px', display: 'inline-block' }}>
                {isImobiliare ? (isSale ? 'VÂNZARE' : 'ÎNCHIRIERE') : (isSeeking ? 'Loc de muncă căutat' : 'Se caută muncitor')}
              </div>
            )}
            <h3 className="auto-list-title">{product.title}</h3>
            <div className="auto-list-price">{formatPrice(product.price)} {isModa ? 'lei' : '€'}</div>
            <div className="auto-list-location">{product.location || 'Niscemi ( CL )'}</div>
          </div>
          
          <div className="auto-list-specs">
            {isAuto 
              ? `Folosit • ${product.specs?.year || '05/2021'} • ${product.specs?.mileage || '90.000'} km • Hibrid ușor pe benzină • Manual • Euro 6`
              : `${product.category} • ${product.createdAt ? timeAgo(product.createdAt) : 'Nou'}`
            }
          </div>
          
          <div className="auto-list-footer">
            <div className="auto-list-dealer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img 
                src={getSellerAvatar(product)} 
                alt="Seller Avatar" 
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #E2E8F0' }} 
              />
              <span className="dealer-badge">{isAuto ? 'Revânzător' : 'Vânzător'}</span> 
              <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 500 }}>{product.seller?.name || (isAuto ? 'mg-motors.it' : 'Privat')}</span>
            </div>
            <button 
              className="auto-list-phone"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone size={16} /> Afișați numărul
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'pro') {
    return (
      <div
        onClick={() => onQuickView(product)}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.2s',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{ position: 'relative' }}>
          <img src={product.image} alt={product.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
          
          <div 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(product);
            }}
            style={{ position: 'absolute', top: '12px', right: '12px', background: '#FFFFFF', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer' }}
          >
            <Heart size={18} fill={isFavorite ? '#E55B86' : 'none'} color={isFavorite ? '#E55B86' : '#64748B'} />
          </div>
        </div>
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#0F172A', fontWeight: 700, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.title}
          </h4>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#E55B86', marginBottom: '8px' }}>
            {formatPrice(product.price)} {isModa ? 'lei' : '€'}
          </div>
          
          {isAuto && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '6px',
              fontSize: '11px',
              color: '#64748B',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              <span>{product.specs?.gearbox || 'Manuală'}</span>
              <span style={{ color: '#CBD5E1' }}>•</span>
              <span>{product.specs?.mileage ? `${product.specs.mileage} km` : '153.694 km'}</span>
              <span style={{ color: '#CBD5E1' }}>•</span>
              <span>{product.specs?.fuel || 'Benzină'}</span>
            </div>
          )}

          <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: 'auto' }}>
            <MapPin size={12} /> {product.location || 'București'}
          </div>
        </div>
      </div>
    );
  }


  if (isImobiliare) {
    // Determine mock attributes if not provided. In a real app these would be on `product`.
    const surface = product.specs?.length || (isSale ? '92 mp' : '45 mp');
    const rooms = product.specs?.modelSize || '2 dormitoare';
    const floor = product.specs?.collection || 'Primul';
    const year = product.specs?.style || '1993';
    const baths = product.specs?.bathrooms || '1 baie';

    return (
      <div className="product-card imobiliare-card" onClick={() => onQuickView(product)}>
        <div className="imobiliare-image-wrapper">
          <img src={product.image} alt={product.title} className="imobiliare-image" loading="lazy" />
        </div>
        
        <div className="imobiliare-details">
          <div className={`job-badge ${isSale ? 'seeking' : 'offering'}`}>{isSale ? 'VÂNZARE' : 'ÎNCHIRIERE'}</div>
          <h3 className="imobiliare-title">{product.title}</h3>
          
          <div className="imobiliare-price">
            {product.price.toLocaleString('ro-RO')} €
          </div>
          
          <div className="imobiliare-attributes">
            <div className="imobiliare-attr">
              <BedDouble size={16} />
              <span>{rooms}</span>
            </div>
            <div className="imobiliare-attr">
              <Bath size={16} />
              <span>{baths}</span>
            </div>
            <div className="imobiliare-attr">
              <Maximize2 size={16} />
              <span>{surface}</span>
            </div>
            <div className="imobiliare-attr">
              <Layers size={16} />
              <span>{floor}</span>
            </div>
            <div className="imobiliare-attr">
              <Hammer size={16} />
              <span>{year}</span>
            </div>
          </div>
          
          <div className="imobiliare-footer">
            <div className="imobiliare-footer-left">
              <div className="imobiliare-footer-item">
                <MapPin size={12} /> {product.location || 'București - Ilfov'}
              </div>
              <div className="imobiliare-footer-item">
                <Clock size={12} /> {product.createdAt ? timeAgo(product.createdAt) : 'Acum 24 de minute'}
              </div>
            </div>
            <div className="imobiliare-footer-right">
              <div 
                className="seller-avatar-container"
                style={{ marginRight: '8px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  onGoToProfile?.(product.seller?.name || 'Alexandru B.');
                }}
                title="Vezi profilul utilizatorului"
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={getSellerAvatar(product)} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.35)' }} />
                </div>
                <span className="seller-name">
                  {product.seller?.name || 'Alexandru B.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isJob) {
    // Determine badge type based on feeling/status or a generic rule. 
    // Usually "Caut loc de muncă" -> Loc de muncă căutat (blue). "Ofer loc de muncă" -> Se caută muncitor (red).
    // Let's use a simple fallback if no feeling is provided.
    const badgeClass = isSeeking ? 'seeking' : 'offering';
    const badgeText = isSeeking ? 'Loc de muncă căutat' : 'Se caută muncitor';

    return (
      <div className="product-card job-card" onClick={() => onQuickView(product)}>
        <div className="job-image-wrapper">
          <img src={product.image} alt={product.title} className="job-image" loading="lazy" />
        </div>
        
        <div className="job-details">
          <div className={`job-badge ${badgeClass}`}>{badgeText}</div>
          <h3 className="job-title">{product.title}</h3>
          
          {product.price > 0 && (
            <div className="job-price">
              {product.price.toLocaleString('ro-RO')} € {product.price === 800 ? 'până la 1.800 € / lunar' : ''}
            </div>
          )}
          
          <div className="job-subtitle">
            {product.design || product.category}
          </div>
          
          <div className="job-footer">
            <div className="job-footer-left">
              <div className="job-footer-item">
                <MapPin size={12} /> {product.location || 'București'}
              </div>
              <div className="job-footer-item">
                <Clock size={12} /> {product.createdAt ? timeAgo(product.createdAt) : 'Acum 31 de minute'}
              </div>
            </div>
            <div 
              className="seller-avatar-container"
              onClick={(e) => {
                e.stopPropagation();
                onGoToProfile?.(product.seller?.name || 'Alexandru B.');
              }}
              title="Vezi profilul utilizatorului"
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={getSellerAvatar(product)} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.35)' }} />
              </div>
              <span className="seller-name">
                {product.seller?.name || 'Alexandru B.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isModa && viewMode === 'classic') {
    return (
      <div className="product-card moda-card-classic" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.title}
          className="moda-classic-image"
          loading="lazy"
        />
        <div className="moda-classic-details">
          <h3 className="moda-classic-title">{product.title}</h3>
          
          <div className="moda-price-container">
            {product.originalPrice && (
              <span className="moda-original-price">
                {formatPrice(product.originalPrice)}<span className="moda-superscript">,00</span> lei
              </span>
            )}
            <span className="moda-current-price">
              {formatPrice(product.price)}<span className="moda-superscript">,00</span> lei
            </span>
          </div>

          <div className="ad-star-rating small" style={{ '--rating': 4, '--rating-decimal': 0.8 } as any}></div>
        </div>
      </div>
    );
  }

  if (isTurism) {
    return (
      <div className="product-card turism-card" onClick={() => onQuickView(product)}>
        <div className="card-image-wrapper">
          {product.discountPercentage ? (
            <div className="turism-badge discount">{product.discountPercentage}%</div>
          ) : (
            <div className="turism-badge">OFERTA</div>
          )}
          <img src={product.image} alt={product.title} className="card-image" loading="lazy" />
        </div>
        
        <div className="turism-details">
          <div className="turism-title">{product.title}</div>
          <div className="turism-rating">
            <Star fill="#94A3B8" color="#94A3B8" size={12} /> 4.7 (89)
          </div>
          
          <div className="turism-tags">
            <span className="turism-tag">Cazare</span>
            <span className="turism-tag">2 pers.</span>
          </div>

          <div className="turism-footer">
            <div className="turism-price">
              {formatPrice(product.price)} € <span className="turism-price-suffix">/ noapte</span>
            </div>
            <div className="turism-location">
              <MapPin size={13} /> {product.location || 'București'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAuto) {
    return (
      <div className="product-card auto-card-new" onClick={() => onQuickView(product)}>
        <div className="auto-new-image-wrapper">
          <img src={product.image} alt={product.title} className="auto-new-image" loading="lazy" />
          <div 
            className="auto-new-avatar-badge"
            onClick={(e) => {
              e.stopPropagation();
              onGoToProfile?.('Alexandru B.');
            }}
            title="Vezi profilul vânzătorului"
            style={{ cursor: 'pointer' }}
          >
            <img src={getSellerAvatar(product)} alt="Seller Avatar" />
          </div>
        </div>
        
        <div className="auto-new-details">
          <h3 className="auto-new-title">{product.title}</h3>
          <div className="auto-new-price">{product.price.toLocaleString('ro-RO')} €</div>
          
          <div className="auto-new-specs">
            {product.specs?.modelSize || product.specs?.year || '2018'} • {product.specs?.mileage || '150.000'} km
          </div>
          
          <div className="auto-new-footer">
            <div className="auto-new-footer-item">
              <MapPin size={14} /> {product.location || 'Bucuresti, Sectorul 1'}
            </div>
            <div className="auto-new-footer-item">
              <Clock size={14} /> {product.createdAt ? timeAgo(product.createdAt) : 'Acum 5 luni'}
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="product-card" onClick={() => onQuickView(product)}>
      <div className="card-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="card-image"
          loading="lazy"
        />

        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="card-badges">
            {product.badges.map((badge, idx) => (
              <span
                key={idx}
                className={`badge-tag ${badge === 'HOT PICK' ? 'hot' : 'pink'}`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Favorite Button */}
        <button 
          className="favorite-icon-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(product);
          }}
        >
          <Heart size={20} strokeWidth={2.5} fill={isFavorite ? "#E63946" : "none"} color={isFavorite ? "#E63946" : "currentColor"} />
        </button>

        {/* Add to Cart Hover Button */}
        <button
          className="add-to-cart-hover-btn"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product, e);
          }}
        >
          ADAUGĂ ÎN COȘ
        </button>
      </div>

      <div className="card-details">
        <h3 className="product-title">{product.title}</h3>
        
        <div className="price-container">
          {product.originalPrice && (
            <span className="original-price">{formatPrice(product.originalPrice)} €</span>
          )}
          <span className="discounted-price">{formatPrice(product.price)} €</span>
        </div>
        {(product.createdAt || product.location) && (
          <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            {product.createdAt && <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>}
            {product.createdAt ? timeAgo(product.createdAt) : ''}
            {product.createdAt && product.location ? ' • ' : ''}
            {product.location ? product.location : ''}
          </div>
        )}
      </div>
    </div>
  );
};
