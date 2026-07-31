import React, { useState } from 'react';
import {
  X,
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
  CheckCircle
} from 'lucide-react';
import { Product } from '../data/products';

interface AutoDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  favorites?: Product[];
  onToggleFavorite?: (product: Product) => void;
}

export const AutoDetailModal: React.FC<AutoDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  favorites = [],
  onToggleFavorite,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showPhone, setShowPhone] = useState(false);

  if (!product) return null;

  const isFavorite = favorites.some((p) => p.id === product.id);

  // Mock car spec defaults if not present
  const isAuto = product.category === 'Auto' || product.title.toLowerCase().includes('polo') || product.title.toLowerCase().includes('bmw');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          maxWidth: '860px',
          width: '100%',
          maxHeight: '90vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 10000
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 20,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <X size={20} color="#0F172A" />
        </button>

        {/* Scrollable Container */}
        <div style={{ overflowY: 'auto', flex: 1, padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '440px' }}>
            
            {/* Left Column: Image & Badges */}
            <div style={{ position: 'relative', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <img
                src={product.image}
                alt={product.title}
                style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
              />

              {/* Discount Tag */}
              {product.discountPercentage && (
                <div
                  style={{
                    position: 'absolute',
                    top: '32px',
                    left: '32px',
                    backgroundColor: 'var(--pink-accent)',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '13px',
                    padding: '4px 12px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(229, 91, 134, 0.3)'
                  }}
                >
                  -{product.discountPercentage}%
                </div>
              )}

              {/* Verified Auto Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '32px',
                  left: '32px',
                  backgroundColor: '#FFFFFF',
                  color: '#059669',
                  fontWeight: 800,
                  fontSize: '12px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
                }}
              >
                <ShieldCheck size={16} color="#059669" />
                VERIFICAT PINPIN AUTO
              </div>
            </div>

            {/* Right Column: Vehicle Details */}
            <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Category & Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--pink-accent)' }}>
                    {product.category}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => onToggleFavorite && onToggleFavorite(product)}
                      style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      <Heart size={18} color={isFavorite ? '#E55B86' : '#64748B'} fill={isFavorite ? '#E55B86' : 'none'} />
                    </button>
                    <button
                      style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      <Share2 size={18} color="#64748B" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0', lineHeight: 1.2 }}>
                  {product.title}
                </h2>

                {/* Published Date */}
                {product.createdAt && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '13px', fontWeight: 600, marginBottom: '20px' }}>
                    <Calendar size={14} />
                    Publicat pe {new Date(product.createdAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                )}

                {/* Price Box */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '28px', fontWeight: 800, color: '#E55B86' }}>
                    {product.price} €
                  </span>
                  {product.originalPrice && (
                    <span style={{ fontSize: '16px', color: '#94A3B8', textDecoration: 'line-through', fontWeight: 600 }}>
                      {product.originalPrice} €
                    </span>
                  )}
                </div>

                {/* Car Key Specifications Grid */}
                {isAuto && (
                  <div style={{ marginBottom: '24px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                      SPECIFICAȚII TEHNICE
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#F8FAFC', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                        <Calendar size={18} color="#0284C7" />
                        <div>
                          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700 }}>AN FABRICAȚIE</div>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>2014</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#F8FAFC', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                        <Gauge size={18} color="#059669" />
                        <div>
                          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700 }}>RULAJ (KM)</div>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>145.000 km</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#F8FAFC', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                        <Fuel size={18} color="#EA580C" />
                        <div>
                          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700 }}>COMBUSTIBIL</div>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Benzină</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#F8FAFC', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                        <Sliders size={18} color="#7C3AED" />
                        <div>
                          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700 }}>CUTIE VITEZE</div>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Manuală</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    DESCRIERE ANUNȚ
                  </span>
                  <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                    {product.description || 'Vehicul verificat tehnic în stare excelentă, întreținut periodic. Carte de service completă.'}
                  </p>
                </div>
              </div>

              {/* Seller Contact & Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                {/* Seller Info */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#FEF08A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#0F172A' }}>
                      <User size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                        Alex M. <CheckCircle size={14} color="#059669" style={{ display: 'inline', verticalAlign: 'middle' }} />
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} /> Oradea, Bihor
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '4px 8px', borderRadius: '6px' }}>
                    ★ 4.9 (48 recenzii)
                  </span>
                </div>

                {/* Contact Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    onClick={() => setShowPhone(!showPhone)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '1.5px solid #059669',
                      backgroundColor: showPhone ? '#ECFDF5' : '#059669',
                      color: showPhone ? '#059669' : '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Phone size={16} />
                    {showPhone ? '0745 123 456' : 'SUNĂ VÂNZĂTOR'}
                  </button>

                  <button
                    onClick={() => onAddToCart(product, 1)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: '#FEA742',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(254, 167, 66, 0.3)'
                    }}
                  >
                    <ShoppingBag size={16} />
                    ADAUGĂ ÎN COȘ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
