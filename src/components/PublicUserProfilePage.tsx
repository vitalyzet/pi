import React, { useState } from 'react';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { ArrowLeft, ShieldCheck, Star, Calendar, CheckCircle } from 'lucide-react';
import { AVATARS } from './AvatarSelectionModal';
import { generateSellerReviews } from './ReviewsPage';

interface PublicUserProfilePageProps {
  sellerName: string;
  userAds: Product[];
  onBack: () => void;
  onViewProduct: (product: Product) => void;
  favorites: Product[];
  onToggleFavorite: (product: Product) => void;
  userAvatarIndex?: number;
}

export const PublicUserProfilePage: React.FC<PublicUserProfilePageProps> = ({
  sellerName,
  userAds,
  onBack,
  onViewProduct,
  favorites,
  onToggleFavorite,
  userAvatarIndex = 0
}) => {
  const [activeTab, setActiveTab] = useState<'anunturi' | 'recenzii'>('anunturi');
  const reviews = generateSellerReviews(sellerName);

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Header Area */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #EBEBEB', padding: '32px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <button 
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#64748B', fontSize: '14px', fontWeight: 600, cursor: 'pointer', marginBottom: '24px' }}
          >
            <ArrowLeft size={16} /> Înapoi
          </button>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#FCD34D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#0F172A', fontSize: '32px', overflow: 'hidden' }}>
              {AVATARS[userAvatarIndex] === 'initials' ? (
                'AB'
              ) : (
                <img src={AVATARS[userAvatarIndex]} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>
            
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>
                {sellerName}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '14px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <ShieldCheck size={16} color="#059669" /> Cont Verificat
                </div>
                <div style={{ fontSize: '14px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={16} /> Pe platformă din Ian 2026
                </div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '4px 10px', borderRadius: '8px' }}>
                  ★ 4.9 Vânzător Top
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '32px auto 0 auto', padding: '0 24px' }}>
        
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #EBEBEB', marginBottom: '32px' }}>
          <button 
            onClick={() => setActiveTab('anunturi')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '16px', fontWeight: activeTab === 'anunturi' ? 700 : 500,
              color: activeTab === 'anunturi' ? '#0F172A' : '#64748B',
              padding: '0 0 12px 0',
              borderBottom: activeTab === 'anunturi' ? '3px solid #FEA742' : '3px solid transparent'
            }}
          >
            Anunțuri Active ({userAds.length})
          </button>
          <button 
            onClick={() => setActiveTab('recenzii')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '16px', fontWeight: activeTab === 'recenzii' ? 700 : 500,
              color: activeTab === 'recenzii' ? '#0F172A' : '#64748B',
              padding: '0 0 12px 0',
              borderBottom: activeTab === 'recenzii' ? '3px solid #FEA742' : '3px solid transparent'
            }}
          >
            Recenzii ({reviews.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'anunturi' && (
          <div className="product-grid">
            {userAds.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => {}}
                onQuickView={() => onViewProduct(product)}
                isFavorite={favorites.some((f) => f.id === product.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
            {userAds.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#64748B' }}>
                Acest utilizator nu are niciun anunț activ momentan.
              </div>
            )}
          </div>
        )}

        {activeTab === 'recenzii' && (
          <div style={{ columnCount: 3, columnGap: '24px', width: '100%' }}>
            {reviews.map((review, index) => (
              <div key={review.id} style={{
                backgroundColor: '#fff',
                border: '1px solid #EBEBEB',
                borderRadius: '4px',
                padding: '24px',
                marginBottom: '24px',
                breakInside: 'avoid',
                display: 'inline-block',
                width: '100%'
              }}>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
                  despre <span style={{ color: '#FEA742', textDecoration: 'underline', cursor: 'pointer' }}>{sellerName}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "#F8D247" : "transparent"} color="#F8D247" />
                    ))}
                  </div>
                  <span style={{ fontSize: '11px', color: '#999' }}>{review.date}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    <img src={AVATARS[index % AVATARS.length]} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {review.verified && (
                      <div style={{ position: 'absolute', bottom: '0', right: '0', backgroundColor: '#fff', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translate(25%, 25%)' }}>
                        <CheckCircle size={12} color="#FEA742" fill="#FEA742" style={{ color: '#fff' }} />
                      </div>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#222' }}>{review.author}</div>
                    {review.verified && (
                      <div style={{ fontSize: '11px', color: '#fff', backgroundColor: '#FEA742', padding: '2px 6px', borderRadius: '2px', display: 'inline-block', marginTop: '2px', fontWeight: 600 }}>Verificat</div>
                    )}
                  </div>
                </div>

                {review.title && (
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#222', marginBottom: '8px' }}>
                    {review.title}
                  </div>
                )}
                {review.content && (
                  <div style={{ fontSize: '14px', color: '#444', lineHeight: 1.5 }}>
                    {review.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
