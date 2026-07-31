import React, { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Upload,
  CheckCircle2,
  Building2,
  Car,
  Briefcase,
  Smartphone,
  Bed,
  Heart,
  Tag,
  Sparkles,
  Wrench,
  Shirt,
  Dog,
  PawPrint,
  Armchair,
  Home,
  Dumbbell,
  Baby,
  Plane,
  Gamepad2,
  Calendar,
  Gauge,
  Fuel,
  Sliders,
  MapPin,
  Phone
} from 'lucide-react';
import { Product } from '../data/products';
import { uploadImageFile } from '../lib/storage';

interface PublishListingPageProps {
  onBackToStore: () => void;
  onPublishProduct: (product: Product) => void;
}

const CATEGORIES_GRID = [
  { id: 'Imobiliare', label: 'Imobiliare', icon: <Home size={28} color="#475569" />, isNew: true },
  { id: 'Auto', label: 'Auto & Moto', icon: <Car size={28} color="#475569" /> },
  { id: 'Locuri de muncă', label: 'Locuri de muncă', icon: <Briefcase size={28} color="#475569" /> },
  { id: 'Matrimoniale', label: 'Matrimoniale', icon: <Heart size={28} color="#475569" /> },
  { id: 'Servicii', label: 'Servicii', icon: <Wrench size={28} color="#475569" /> },
  { id: 'Electronice', label: 'Electronice', icon: <Smartphone size={28} color="#475569" /> },
  { id: 'Modă', label: 'Modă', icon: <Shirt size={28} color="#475569" /> },
  { id: 'Animale', label: 'Animale', icon: <PawPrint size={28} color="#475569" /> },
  { id: 'Casă & Grădină', label: 'Casă & Grădină', icon: <Armchair size={28} color="#475569" /> },
  { id: 'Sport', label: 'Sport', icon: <Dumbbell size={28} color="#475569" /> },
  { id: 'Copii', label: 'Copii', icon: <Baby size={28} color="#475569" /> },
  { id: 'Turism', label: 'Turism', icon: <Plane size={28} color="#475569" /> },
  { id: 'Gaming', label: 'Gaming', icon: <Gamepad2 size={28} color="#475569" /> }
];

export const PublishListingPage: React.FC<PublishListingPageProps> = ({
  onBackToStore,
  onPublishProduct
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('Auto');

  // Form Fields
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [condition, setCondition] = useState('Nou');
  const [city, setCity] = useState('București');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState('/images/coches.png');
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Auto Specific Fields
  const [brand, setBrand] = useState('Volkswagen');
  const [modelName, setModelName] = useState('');
  const [year, setYear] = useState('2016');
  const [mileage, setMileage] = useState('145000');
  const [fuel, setFuel] = useState('Diesel');
  const [gearbox, setGearbox] = useState('Manuală');

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'Auto') {
      setImagePreview('/images/c1.png');
    }
    setCurrentStep(2);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = selectedCategory === 'Auto' ? (title || `${brand} ${modelName || 'Polo'}`) : title;
    if (!finalTitle || !price) {
      alert('Te rugăm să completezi titlul și prețul anunțului.');
      return;
    }

    setIsSubmitting(true);
    let uploadedImageUrl = imagePreview;
    if (imageFile) {
      uploadedImageUrl = await uploadImageFile(imageFile);
    }

    const numericPrice = parseFloat(price);
    const numericOriginalPrice = originalPrice ? parseFloat(originalPrice) : numericPrice * 1.2;
    const discount = Math.round(((numericOriginalPrice - numericPrice) / numericOriginalPrice) * 100);

    const newProduct: Product = {
      id: `pub-${Date.now()}`,
      title: finalTitle,
      price: numericPrice,
      originalPrice: Math.round(numericOriginalPrice),
      discountPercentage: discount > 0 ? discount : undefined,
      badges: selectedCategory === 'Auto' ? ['AUTO', 'VERIFICAT'] : (discount > 0 ? [`${discount}%`] : ['NOU']),
      image: uploadedImageUrl,
      category: selectedCategory,
      feeling: 'Work',
      design: 'Special',
      color: 'Multicolor',
      description: description || `Anunț publicat în ${city}. Contact: ${phone || 'Nespecificat'}`
    };

    onPublishProduct(newProduct);
    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      onBackToStore();
    }, 1800);
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Top Fixed Navigation Header */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '16px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <button
          onClick={onBackToStore}
          style={{
            background: '#F1F5F9',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Închide"
        >
          <X size={20} color="#475569" />
        </button>

        <h1 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
          Creează anunț
        </h1>

        <div style={{ width: '40px' }} />
      </div>

      {/* Main Form Container */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 20px' }}>
        {isSuccess ? (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '60px 20px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0' }}>
            <CheckCircle2 size={72} color="#10B981" style={{ margin: '0 auto 20px auto' }} />
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
              Anunțul Tău A Fost Publicat Cu Succes! 🚀
            </h2>
            <p style={{ color: '#64748B', fontSize: '16px' }}>
              Anunțul tău din categoria <strong>{selectedCategory}</strong> este acum disponibil în magazin.
            </p>
          </div>
        ) : (
          <>
            {/* STEP 1: CATEGORY SELECTION GRID (Matching Reference Screenshot) */}
            {currentStep === 1 && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                  <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                    Alege categoria
                  </h2>
                  <p style={{ fontSize: '15px', color: '#64748B', margin: 0, fontWeight: 500 }}>
                    Selectează categoria potrivită pentru anunțul tău
                  </p>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '20px'
                  }}
                >
                  {CATEGORIES_GRID.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat.id)}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '24px',
                        padding: '24px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                        border: '1.5px solid #F1F5F9',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(15, 23, 42, 0.08)';
                        e.currentTarget.style.borderColor = '#CBD5E1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.04)';
                        e.currentTarget.style.borderColor = '#F1F5F9';
                      }}
                    >
                      {/* Squircle Icon Box */}
                      <div
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '20px',
                          backgroundColor: '#FFFFFF',
                          border: '1.5px solid #F1F5F9',
                          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative'
                        }}
                      >
                        {cat.icon}

                        {/* Green "Nou" Badge */}
                        {cat.isNew && (
                          <span
                            style={{
                              position: 'absolute',
                              top: '-6px',
                              right: '-8px',
                              backgroundColor: '#10B981',
                              color: '#FFFFFF',
                              fontSize: '10px',
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: '10px',
                              boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)'
                            }}
                          >
                            Nou
                          </span>
                        )}
                      </div>

                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155', textAlign: 'center' }}>
                        {cat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: LISTING DETAILS */}
            {currentStep === 2 && (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '36px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#0F172A', backgroundColor: '#FFFDF0', padding: '4px 12px', borderRadius: '20px', border: '1px solid var(--primary-yellow)' }}>
                      CATEGORIE: {selectedCategory}
                    </span>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginTop: '8px', margin: 0 }}>
                      Completează detaliile anunțului
                    </h2>
                  </div>

                  <button
                    onClick={() => setCurrentStep(1)}
                    style={{ background: 'none', border: 'none', color: '#E55B86', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
                  >
                    Schimbă Categoria
                  </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(3); }} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  {/* AUTO SPECIAL FIELDS */}
                  {selectedCategory === 'Auto' && (
                    <div style={{ backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        SPECIFICAȚII TEHNICE AUTO
                      </span>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>MARCĂ</label>
                          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>MODEL</label>
                          <input type="text" value={modelName} placeholder="ex: Serie 3 M Sport" onChange={(e) => setModelName(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF' }} />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>AN FABRICAȚIE</label>
                          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>RULAJ (KM)</label>
                          <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>CUTIE VITEZE</label>
                          <select value={gearbox} onChange={(e) => setGearbox(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF' }}>
                            <option value="Manuală">Manuală</option>
                            <option value="Automată">Automată</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STANDARD FIELDS */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      TITLU ANUNȚ *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ex: BMW Serie 3 M Sport / Garsonieră Ultracentrală"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1.5px solid #CBD5E1', fontSize: '15px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        PREȚ (LEI / €) *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="18500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1.5px solid #CBD5E1', fontSize: '15px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        PREȚ VECHI (OPȚIONAL)
                      </label>
                      <input
                        type="number"
                        placeholder="21000"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1.5px solid #CBD5E1', fontSize: '15px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        ORAȘ / LOCAȚIE
                      </label>
                      <input
                        type="text"
                        placeholder="București / Oradea / Cluj"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1.5px solid #CBD5E1', fontSize: '15px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        NUMĂR TELEFON
                      </label>
                      <input
                        type="tel"
                        placeholder="07xx xxx xxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1.5px solid #CBD5E1', fontSize: '15px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      DESCRIERE DETALIATĂ
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Oferă mai multe detalii despre produs sau servicii..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1.5px solid #CBD5E1', fontSize: '15px', fontWeight: 500, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      style={{ padding: '12px 24px', borderRadius: '12px', border: '1.5px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '14px', fontWeight: 700, color: '#475569', cursor: 'pointer' }}
                    >
                      ← Înapoi la Categorii
                    </button>

                    <button
                      type="submit"
                      style={{ padding: '14px 32px', borderRadius: '30px', border: 'none', backgroundColor: 'var(--primary-yellow)', fontSize: '15px', fontWeight: 800, color: '#0F172A', cursor: 'pointer', boxShadow: '0 4px 14px rgba(248, 210, 71, 0.4)' }}
                    >
                      Înainte la Poze →
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 3: MEDIA & FINAL SUBMIT */}
            {currentStep === 3 && (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '36px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '20px' }}>
                  Încarcă Fotografii & Confirmă
                </h2>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '28px' }}>
                  <div style={{ width: '140px', height: '140px', borderRadius: '16px', overflow: 'hidden', border: '1.5px solid #E2E8F0', flexShrink: 0 }}>
                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <label style={{ flex: 1, border: '2px dashed #CBD5E1', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: '#F8FAFC', padding: '20px' }}>
                    <Upload size={32} color="#E55B86" />
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '10px' }}>
                      Selectează poze de pe calculator
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                      Format PNG, JPG până la 10MB (Salvare automată în Cloud)
                    </span>
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                  </label>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '28px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    PREVIZUALIZARE ANUNȚ
                  </span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                        {title || `${brand} ${modelName}`}
                      </h3>
                      <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 600 }}>
                        {selectedCategory} • {city}
                      </span>
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#E55B86' }}>
                      {price || '0'} Lei
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    style={{ padding: '12px 24px', borderRadius: '12px', border: '1.5px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '14px', fontWeight: 700, color: '#475569', cursor: 'cursor' }}
                  >
                    ← Pasul Anterior
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    style={{ padding: '16px 36px', borderRadius: '30px', border: 'none', backgroundColor: 'var(--primary-yellow)', fontSize: '16px', fontWeight: 800, color: '#0F172A', cursor: 'pointer', boxShadow: '0 8px 20px rgba(248, 210, 71, 0.4)' }}
                  >
                    {isSubmitting ? 'Se publică...' : 'PUBLICĂ ANUNȚUL'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
