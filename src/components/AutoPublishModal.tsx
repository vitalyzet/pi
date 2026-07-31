import React, { useState } from 'react';
import {
  X,
  Upload,
  Car,
  Calendar,
  Gauge,
  Fuel,
  Sliders,
  CheckCircle2,
  MapPin,
  Phone,
  Euro
} from 'lucide-react';
import { Product } from '../data/products';
import { uploadImageFile } from '../lib/storage';

interface AutoPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishProduct: (product: Product) => void;
}

const CAR_BRANDS = [
  'Volkswagen', 'BMW', 'Audi', 'Mercedes-Benz', 'Ford',
  'Dacia', 'Toyota', 'Renault', 'Skoda', 'Opel', 'Hyundai'
];

export const AutoPublishModal: React.FC<AutoPublishModalProps> = ({
  isOpen,
  onClose,
  onPublishProduct,
}) => {
  const [brand, setBrand] = useState('Volkswagen');
  const [modelName, setModelName] = useState('');
  const [year, setYear] = useState('2016');
  const [mileage, setMileage] = useState('');
  const [fuel, setFuel] = useState('Diesel');
  const [gearbox, setGearbox] = useState('Manuală');
  const [engineSize, setEngineSize] = useState('1598');
  const [power, setPower] = useState('110');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [city, setCity] = useState('București');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState('/images/c1.png');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelName || !price) return;

    let uploadedImageUrl = imagePreview;
    if (imageFile) {
      uploadedImageUrl = await uploadImageFile(imageFile);
    }

    const title = `${brand} ${modelName}`;
    const numericPrice = parseFloat(price);
    const numericOriginalPrice = originalPrice ? parseFloat(originalPrice) : numericPrice * 1.15;
    const discount = Math.round(((numericOriginalPrice - numericPrice) / numericOriginalPrice) * 100);

    const newProduct: Product = {
      id: `auto-${Date.now()}`,
      title,
      price: numericPrice,
      originalPrice: Math.round(numericOriginalPrice),
      discountPercentage: discount > 0 ? discount : undefined,
      badges: ['AUTO', discount > 0 ? `${discount}%` : 'VERIFICAT'],
      image: uploadedImageUrl,
      category: 'Auto',
      feeling: 'Work',
      design: 'Special',
      color: 'Negru',
      description: description || `${brand} ${modelName}, an ${year}, ${mileage || '145.000'} km, motor ${fuel}, cutie ${gearbox}. Oraș: ${city}.`
    };

    onPublishProduct(newProduct);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // Reset
      setModelName('');
      setPrice('');
      setOriginalPrice('');
      setDescription('');
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
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          maxWidth: '720px',
          width: '100%',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          opacity: 1,
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
          position: 'relative',
          zIndex: 10000
        }}
      >
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', padding: '24px 28px', color: '#FFFFFF', position: 'relative' }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.15)',
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
            <X size={20} color="#FFFFFF" />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <Car size={24} color="var(--primary-yellow)" />
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--primary-yellow)' }}>
              PUBLICĂ ANUNȚ AUTO
            </span>
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>
            Adaugă Mașina Ta Pe PinPin Auto
          </h2>
        </div>

        {/* Content Form Body */}
        <div style={{ padding: '28px', maxHeight: '76vh', overflowY: 'auto', backgroundColor: '#FFFFFF' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <CheckCircle2 size={64} color="#10B981" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                Anunțul Auto A Fost Publicat! 🚗
              </h3>
              <p style={{ color: '#64748B', fontSize: '14px' }}>
                Mașina ta <strong>{brand} {modelName}</strong> este acum disponibilă în secțiunea Auto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Image Upload Zone */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                  FOTOGRAFII VEHICUL
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '110px', height: '100px', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', backgroundColor: '#F8FAFC', flexShrink: 0 }}>
                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <label style={{ flex: 1, height: '100px', border: '2px dashed #CBD5E1', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: '#F8FAFC' }}>
                    <Upload size={24} color="#64748B" />
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginTop: '6px' }}>
                      Încarcă Imagine Cu Mașina
                    </span>
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              {/* Brand & Model */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    MARCĂ AUTO *
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                  >
                    {CAR_BRANDS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    MODEL *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Polo 1.2 TSI / Golf 7 / Serie 3"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Year & Mileage */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    <Calendar size={15} color="#0284C7" /> AN FABRICAȚIE
                  </label>
                  <input
                    type="number"
                    placeholder="2016"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    <Gauge size={15} color="#059669" /> RULAJ (KM)
                  </label>
                  <input
                    type="number"
                    placeholder="145000"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Fuel & Gearbox */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    <Fuel size={15} color="#EA580C" /> COMBUSTIBIL
                  </label>
                  <select
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                  >
                    <option value="Benzină">Benzină</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hibrid">Hibrid</option>
                    <option value="Electric">Electric</option>
                    <option value="GPL">GPL</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    <Sliders size={15} color="#7C3AED" /> CUTIE DE VITEZE
                  </label>
                  <select
                    value={gearbox}
                    onChange={(e) => setGearbox(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                  >
                    <option value="Manuală">Manuală</option>
                    <option value="Automată">Automată</option>
                  </select>
                </div>
              </div>

              {/* Engine size & Power */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    CAPACITATE CILINDRICĂ (CM³)
                  </label>
                  <input
                    type="number"
                    placeholder="1598"
                    value={engineSize}
                    onChange={(e) => setEngineSize(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    PUTERE (CP)
                  </label>
                  <input
                    type="number"
                    placeholder="110"
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Price & Location */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    PREȚ (LEI / €) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="3000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    <MapPin size={15} color="#059669" /> ORAȘ
                  </label>
                  <input
                    type="text"
                    placeholder="București / Oradea / Cluj"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 600, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  DESCRIERE VEHICUL (OPȚIONAL)
                </label>
                <textarea
                  rows={3}
                  placeholder="Scrie detalii despre stare, dotări, istoric de service..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '14px', fontWeight: 500, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none', resize: 'vertical' }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#0F172A',
                  color: 'var(--primary-yellow)',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '16px',
                  fontSize: '15px',
                  fontWeight: 800,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(15, 23, 42, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px'
                }}
              >
                <Car size={20} />
                PUBLICĂ ANUNȚUL AUTO ACUM
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
