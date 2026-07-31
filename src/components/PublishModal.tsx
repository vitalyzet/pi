import React, { useState } from 'react';
import {
  X,
  Upload,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  Building2,
  Car,
  Briefcase,
  Smartphone,
  Bed,
  Heart,
  Tag,
  Check,
  Image as ImageIcon
} from 'lucide-react';
import { Product } from '../data/products';
import { uploadImageFile } from '../lib/storage';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishProduct: (product: Product) => void;
  onOpenAutoPublish?: () => void;
}

const CATEGORIES_LIST = [
  { id: 'Auto', label: 'Auto & Moto', icon: <Car size={22} color="#FFF" />, badgeBg: '#EF4444' },
  { id: 'Imobiliare', label: 'Imobiliare', icon: <Building2 size={22} color="#FFF" />, badgeBg: '#059669' },
  { id: 'Locuri de muncă', label: 'Locuri de muncă', icon: <Briefcase size={22} color="#FFF" />, badgeBg: '#0D9488' },
  { id: 'Electronice', label: 'Electronice', icon: <Smartphone size={22} color="#FFF" />, badgeBg: '#8B5CF6' },
  { id: 'Cazare', label: 'Cazare', icon: <Bed size={22} color="#FFF" />, badgeBg: '#F59E0B' },
  { id: 'Matrimoniale', label: 'Matrimoniale', icon: <Heart size={22} color="#FFF" />, badgeBg: '#F43F5E' },
  { id: 'Pinuri', label: 'Pinuri & Accesorii', icon: <Tag size={22} color="#FFF" />, badgeBg: '#F8D247' },
  { id: 'Mystery', label: 'Mystery & Surprize', icon: <Sparkles size={22} color="#FFF" />, badgeBg: '#3B82F6' }
];

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  onPublishProduct,
  onOpenAutoPublish,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState('Auto');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [condition, setCondition] = useState('Nou');
  const [city, setCity] = useState('București');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState('/images/coches.png');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!title || !price) {
        alert('Te rugăm să completezi titlul și prețul anunțului.');
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    setIsUploading(true);
    let uploadedImageUrl = imagePreview;
    if (imageFile) {
      uploadedImageUrl = await uploadImageFile(imageFile);
    }

    const numericPrice = parseFloat(price);
    const numericOriginalPrice = originalPrice ? parseFloat(originalPrice) : numericPrice * 1.25;
    const discount = Math.round(((numericOriginalPrice - numericPrice) / numericOriginalPrice) * 100);

    const newProduct: Product = {
      id: `custom-${Date.now()}`,
      title,
      price: numericPrice,
      originalPrice: Math.round(numericOriginalPrice),
      discountPercentage: discount > 0 ? discount : undefined,
      badges: discount > 0 ? [`${discount}%`] : ['NOU'],
      image: uploadedImageUrl,
      category,
      feeling: 'Cute',
      design: 'Special',
      color: 'Multicolor',
      description: description || `Anunț publicat în ${city}. Contact: ${phone || 'Nespecificat'}`
    };

    onPublishProduct(newProduct);
    setIsUploading(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // Reset form
      setCurrentStep(1);
      setTitle('');
      setPrice('');
      setOriginalPrice('');
      setDescription('');
      setPhone('');
      setImageFile(null);
    }, 1800);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          maxWidth: '680px',
          width: '100%',
          borderRadius: '24px',
          padding: 0,
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          opacity: 1,
          boxShadow: '0 25px 60px rgba(15, 23, 42, 0.18)',
          border: '1.5px solid #F1F5F9',
          position: 'relative',
          zIndex: 100000
        }}
      >
        {/* Header */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px 28px', borderBottom: '1px solid #F1F5F9', position: 'relative' }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} color="#64748B" />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', backgroundColor: '#FFFDF0', color: '#0F172A', padding: '4px 12px', borderRadius: '20px', border: '1px solid var(--primary-yellow)' }}>
              PUBLICARE ANUNȚ
            </span>
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.5px' }}>
            {currentStep === 1 && 'Pasul 1: Alege Categoria'}
            {currentStep === 2 && 'Pasul 2: Detaliile Anunțului'}
            {currentStep === 3 && 'Pasul 3: Poze & Confirmare'}
          </h2>

          {/* Stepper Progress Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '18px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: currentStep >= 1 ? '#E55B86' : '#F1F5F9', color: currentStep >= 1 ? '#FFF' : '#64748B', fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                1
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: currentStep >= 1 ? '#0F172A' : '#94A3B8' }}>Categorie</span>
            </div>

            <div style={{ width: '30px', height: '2px', background: currentStep >= 2 ? '#E55B86' : '#F1F5F9' }} />

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: currentStep >= 2 ? '#E55B86' : '#F1F5F9', color: currentStep >= 2 ? '#FFF' : '#64748B', fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                2
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: currentStep >= 2 ? '#0F172A' : '#94A3B8' }}>Detalii</span>
            </div>

            <div style={{ width: '30px', height: '2px', background: currentStep >= 3 ? '#E55B86' : '#F1F5F9' }} />

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: currentStep >= 3 ? '#E55B86' : '#F1F5F9', color: currentStep >= 3 ? '#FFF' : '#64748B', fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                3
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: currentStep >= 3 ? '#0F172A' : '#94A3B8' }}>Publicare</span>
          </div>
        </div>

        {/* Modal Form Body */}
        <div style={{ padding: '28px', maxHeight: '72vh', overflowY: 'auto', backgroundColor: '#FFFFFF' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <CheckCircle2 size={64} color="#10B981" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                Anunțul A Fost Publicat Cu Succes! 🚀
              </h3>
              <p style={{ color: '#64748B', fontSize: '14px' }}>
                Anunțul tău din categoria <strong>{category}</strong> este acum vizibil în magazin.
              </p>
            </div>
          ) : (
            <>
              {/* STEP 1: CATEGORY SELECTOR */}
              {currentStep === 1 && (
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
                    Selectează Categoria În Care Vrei Să Publici:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                    {CATEGORIES_LIST.map((cat) => {
                      const isSelected = category === cat.id;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => {
                            setCategory(cat.id);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            borderRadius: '16px',
                            border: isSelected ? '2px solid #E55B86' : '1.5px solid #CBD5E1',
                            backgroundColor: isSelected ? '#FFF0F5' : '#FFFFFF',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: isSelected ? '0 4px 14px rgba(229, 91, 134, 0.18)' : 'none'
                          }}
                        >
                          <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: cat.badgeBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {cat.icon}
                          </div>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', flex: 1 }}>
                            {cat.label}
                          </span>
                          {isSelected && <Check size={20} color="#E55B86" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: LISTING DETAILS */}
              {currentStep === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* Title */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      TITLU ANUNȚ *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ex: Pin Metalic Vintage BMW / Garsonieră Ultracentrală"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                    />
                  </div>

                  {/* Price & Original Price */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        PREȚ (€) *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="45"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        PREȚ VECHI (OPȚIONAL)
                      </label>
                      <input
                        type="number"
                        placeholder="60"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Condition & Location */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        STARE PRODUS
                      </label>
                      <select
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                      >
                        <option value="Nou">Nou (Sigilat)</option>
                        <option value="Ca nou">Ca Nou</option>
                        <option value="Folosit">Folosit în stare bună</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        ORAȘ / JUDEȚ
                      </label>
                      <input
                        type="text"
                        placeholder="București / Cluj / Timișoara"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      NUMĂR TELEFON CONTACT
                    </label>
                    <input
                      type="tel"
                      placeholder="07xx xxx xxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      DESCRIERE DETALIATĂ
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Oferă mai multe detalii despre produsul sau serviciul oferit..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 500, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none', resize: 'vertical' }}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: MEDIA UPLOAD & LIVE PREVIEW */}
              {currentStep === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Upload Drop Zone */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                      ADAUGĂ IMAGINI PENTRU ANUNȚ
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ width: '100px', height: '100px', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', backgroundColor: '#F8FAFC', flexShrink: 0 }}>
                        <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <label style={{ flex: 1, height: '100px', border: '2px dashed #CBD5E1', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: '#F8FAFC' }}>
                        <Upload size={24} color="#64748B" />
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginTop: '6px' }}>
                          Alege Foto Din Calculator
                        </span>
                        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>

                  {/* Summary & Live Card Preview */}
                  <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      REZUMAT ANUNȚ
                    </span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                      <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                          {title || 'Titlu Anunț'}
                        </h4>
                        <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
                          {category} • {city}
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#E55B86' }}>
                          {price || '0'} €
                        </div>
                        {originalPrice && (
                          <div style={{ fontSize: '12px', textDecoration: 'line-through', color: '#94A3B8' }}>
                            {originalPrice} €
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '12px 20px',
                      borderRadius: '12px',
                      border: '1.5px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronLeft size={18} /> înapoi
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: 'var(--primary-yellow)',
                      fontSize: '14px',
                      fontWeight: 800,
                      color: '#0F172A',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(248, 210, 71, 0.4)'
                    }}
                  >
                    Înainte <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    style={{
                      padding: '14px 28px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: '#FEA742',
                      fontSize: '14px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      letterSpacing: '0.5px'
                    }}
                  >
                    PUBLICĂ ANUNȚUL
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);
};
