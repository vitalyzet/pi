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
  // Available Categories
  { id: 'Imobiliare', label: 'Imobiliare', icon: <Home size={22} color="#475569" />, isNew: true },
  { id: 'Auto', label: 'Auto & Moto', icon: <Car size={22} color="#475569" /> },
  { id: 'Locuri de muncă', label: 'Locuri de muncă', icon: <Briefcase size={22} color="#475569" /> },
  { id: 'Matrimoniale', label: 'Matrimoniale', icon: <Heart size={22} color="#F43F5E" />, isPro: true },
  { id: 'Servicii', label: 'Servicii', icon: <Wrench size={22} color="#475569" /> },
  { id: 'Electronice', label: 'Electronice', icon: <Smartphone size={22} color="#475569" /> },
  { id: 'Modă', label: 'Modă', icon: <Shirt size={22} color="#475569" /> },
  { id: 'Animale', label: 'Animale', icon: <PawPrint size={22} color="#475569" /> },
  { id: 'Turism', label: 'Turism', icon: <Plane size={22} color="#475569" /> },

  // Disabled Categories at the very end
  { id: 'Casă & Grădină', label: 'Casă & Grădină', icon: <Armchair size={22} color="#94A3B8" />, isDisabled: true },
  { id: 'Sport', label: 'Sport', icon: <Dumbbell size={22} color="#94A3B8" />, isDisabled: true },
  { id: 'Copii', label: 'Copii', icon: <Baby size={22} color="#94A3B8" />, isDisabled: true },
  { id: 'Gaming', label: 'Gaming', icon: <Gamepad2 size={22} color="#94A3B8" />, isDisabled: true }
];

export const PublishListingPage: React.FC<PublishListingPageProps> = ({
  onBackToStore,
  onPublishProduct
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('Auto');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

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
  const [year, setYear] = useState('2012');
  const [mileage, setMileage] = useState('153694');
  const [fuel, setFuel] = useState('Gasolina');
  const [gearbox, setGearbox] = useState('Manuală');
  const [caroserie, setCaroserie] = useState('Sedan');

  // Imobiliare Specific Fields
  const [propType, setPropType] = useState('Apartament');
  const [operation, setOperation] = useState('Vânzare');
  const [rooms, setRooms] = useState('2');
  const [area, setArea] = useState('65');

  // Locuri de muncă Specific Fields
  const [jobDomain, setJobDomain] = useState('IT & Software');
  const [contractType, setContractType] = useState('Full-time');
  const [salary, setSalary] = useState('4500');

  // Matrimoniale (PRO) Specific Fields
  const [age, setAge] = useState('28');
  const [gender, setGender] = useState('Femeie');
  const [relationshipType, setRelationshipType] = useState('Relație serioasă');

  // Servicii Specific Fields
  const [serviceType, setServiceType] = useState('Construcții & Amenajări');
  const [rateType, setRateType] = useState('Pe oră');

  // Electronice Specific Fields
  const [subCategory, setSubCategory] = useState('Telefoane');
  const [electronicBrand, setElectronicBrand] = useState('Apple');

  // Modă Specific Fields
  const [genderSection, setGenderSection] = useState('Femei');
  const [clothingSize, setClothingSize] = useState('M');

  // Animale Specific Fields
  const [animalType, setAnimalType] = useState('Câini');
  const [breed, setBreed] = useState('Beagle');

  // Turism Specific Fields
  const [accommodationType, setAccommodationType] = useState('Pensiune');
  const [guestsCount, setGuestsCount] = useState('2');

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
      badges: selectedCategory === 'Auto' ? ['AUTO', 'VERIFICAT'] : (selectedCategory === 'Matrimoniale' ? ['PRO', 'VERIFICAT'] : (discount > 0 ? [`${discount}%`] : ['NOU'])),
      image: uploadedImageUrl,
      images: [
        uploadedImageUrl,
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80',
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80'
      ],
      category: selectedCategory,
      feeling: 'Work',
      design: 'Special',
      color: 'Multicolor',
      description: description || `Anunț publicat în ${city}. Contact: ${phone || 'Nespecificat'}`,
      specs: (() => {
        switch (selectedCategory) {
          case 'Auto':
            return {
              year: year || '2012',
              mileage: mileage ? parseInt(mileage).toLocaleString('ro-RO') : '153.694',
              fuel: fuel || 'Gasolina',
              gearbox: gearbox || 'Manuală',
              caroserie: caroserie || 'Sedan',
              brand: brand || 'Volkswagen',
              modelName: modelName || 'Polo'
            };
          case 'Imobiliare':
            return {
              propType: propType || 'Apartament',
              operation: operation || 'Vânzare',
              rooms: rooms || '2',
              area: area ? `${area} m²` : '65 m²'
            };
          case 'Locuri de muncă':
            return {
              jobDomain: jobDomain || 'IT & Software',
              contractType: contractType || 'Full-time',
              salary: salary ? `${salary} €` : '4.500 €'
            };
          case 'Matrimoniale':
            return {
              age: age || '28 ani',
              gender: gender || 'Femeie',
              relationshipType: relationshipType || 'Relație serioasă'
            };
          case 'Servicii':
            return {
              serviceType: serviceType || 'Construcții & Amenajări',
              rateType: rateType || 'Pe oră'
            };
          case 'Electronice':
            return {
              subCategory: subCategory || 'Telefoane',
              electronicBrand: electronicBrand || 'Apple'
            };
          case 'Modă':
            return {
              genderSection: genderSection || 'Femei',
              clothingSize: clothingSize || 'M'
            };
          case 'Animale':
            return {
              animalType: animalType || 'Câini',
              breed: breed || 'Beagle'
            };
          case 'Turism':
            return {
              accommodationType: accommodationType || 'Pensiune',
              guestsCount: guestsCount || '2 persoane'
            };
          default:
            return undefined;
        }
      })()
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
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '14px'
                  }}
                >
                  {CATEGORIES_GRID.map((cat) => {
                    const isHovered = !cat.isDisabled && hoveredCategory === cat.id;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => {
                          if (!cat.isDisabled) {
                            handleSelectCategory(cat.id);
                          }
                        }}
                        onMouseEnter={() => {
                          if (!cat.isDisabled) setHoveredCategory(cat.id);
                        }}
                        onMouseLeave={() => setHoveredCategory(null)}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '18px',
                          padding: '16px 12px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          cursor: cat.isDisabled ? 'not-allowed' : 'pointer',
                          opacity: cat.isDisabled ? 0.55 : 1,
                          boxShadow: isHovered ? '0 10px 22px rgba(248, 210, 71, 0.25)' : '0 2px 6px rgba(15, 23, 42, 0.03)',
                          border: isHovered ? '1.5px solid var(--primary-yellow)' : '1.5px solid #F1F5F9',
                          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                          position: 'relative'
                        }}
                      >
                        {/* Compact Squircle Icon Box */}
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '14px',
                            backgroundColor: isHovered ? 'var(--primary-yellow)' : '#FFFFFF',
                            border: isHovered ? '1.5px solid var(--primary-yellow)' : '1.5px solid #F1F5F9',
                            boxShadow: isHovered ? '0 4px 12px rgba(248, 210, 71, 0.5)' : '0 2px 8px rgba(15, 23, 42, 0.04)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            transition: 'all 0.25s ease'
                          }}
                        >
                          {React.cloneElement(cat.icon, {
                            color: cat.isDisabled ? '#94A3B8' : (isHovered ? '#0F172A' : '#475569')
                          })}

                          {/* Green "Nou" Badge */}
                          {cat.isNew && (
                            <span
                              style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-6px',
                                backgroundColor: '#10B981',
                                color: '#FFFFFF',
                                fontSize: '9px',
                                fontWeight: 800,
                                padding: '1px 6px',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)'
                              }}
                            >
                              Nou
                            </span>
                          )}

                          {/* Yellow "PRO" Badge */}
                          {cat.isPro && (
                            <span
                              style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-6px',
                                backgroundColor: 'var(--primary-yellow)',
                                color: '#0F172A',
                                fontSize: '9px',
                                fontWeight: 800,
                                padding: '1px 6px',
                                borderRadius: '8px',
                                boxShadow: '0 2px 6px rgba(248, 210, 71, 0.4)'
                              }}
                            >
                              PRO
                            </span>
                          )}

                          {/* Gray "Indisponibil" Badge */}
                          {cat.isDisabled && (
                            <span
                              style={{
                                position: 'absolute',
                                top: '-6px',
                                right: '-12px',
                                backgroundColor: '#E2E8F0',
                                color: '#64748B',
                                fontSize: '8px',
                                fontWeight: 800,
                                padding: '1px 5px',
                                borderRadius: '6px',
                                letterSpacing: '0.2px',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              Indisponibil
                            </span>
                          )}
                        </div>

                        <span style={{ fontSize: '12px', fontWeight: isHovered ? 800 : 600, color: cat.isDisabled ? '#94A3B8' : (isHovered ? '#0F172A' : '#475569'), textAlign: 'center', lineHeight: '1.3', transition: 'color 0.2s ease' }}>
                          {cat.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: LISTING DETAILS */}
            {currentStep === 2 && (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '28px', padding: '48px', border: '1.5px solid #E2E8F0', boxShadow: '0 12px 35px rgba(15, 23, 42, 0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', paddingBottom: '20px', borderBottom: '1.5px solid #F1F5F9' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', color: '#0F172A', backgroundColor: '#FFFDF0', padding: '6px 16px', borderRadius: '24px', border: '1.5px solid var(--primary-yellow)' }}>
                      CATEGORIE: {selectedCategory}
                    </span>
                    <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', marginTop: '12px', margin: 0, letterSpacing: '-0.5px' }}>
                      Completează detaliile anunțului
                    </h2>
                  </div>

                  <button
                    onClick={() => setCurrentStep(1)}
                    style={{ background: 'none', border: 'none', color: '#E55B86', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}
                  >
                    Schimbă Categoria
                  </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(3); }} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {/* AUTO SPECIAL FIELDS */}
                  {selectedCategory === 'Auto' && (
                    <div style={{ backgroundColor: '#F8FAFC', padding: '28px', borderRadius: '20px', border: '1.5px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: '#64748B', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                        SPECIFICAȚII TEHNICE AUTO
                      </span>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: 800, color: '#1E293B', marginBottom: '8px', letterSpacing: '0.3px' }}>MARCĂ</label>
                          <input type="text" value={brand} placeholder="ex: Volkswagen" onChange={(e) => setBrand(e.target.value)} style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '16px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: 800, color: '#1E293B', marginBottom: '8px', letterSpacing: '0.3px' }}>MODEL</label>
                          <input type="text" value={modelName} placeholder="ex: Polo / Golf" onChange={(e) => setModelName(e.target.value)} style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '16px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: 800, color: '#1E293B', marginBottom: '8px', letterSpacing: '0.3px' }}>CAROSERIE *</label>
                          <select value={caroserie} onChange={(e) => setCaroserie(e.target.value)} style={{ width: '100%', padding: '16px 14px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '15px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV / Off-Road</option>
                            <option value="Hatchback">Hatchback</option>
                            <option value="Break">Break / Kombi</option>
                            <option value="Cabrio">Cabrio / Roadster</option>
                            <option value="Coupe">Coupe</option>
                            <option value="Monovolum">Monovolum / Minivan</option>
                            <option value="Pickup">Pick-Up</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>AN FABRICAȚIE</label>
                          <input type="number" value={year} placeholder="2012" onChange={(e) => setYear(e.target.value)} style={{ width: '100%', padding: '16px 16px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '16px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>RULAJ (KM)</label>
                          <input type="number" value={mileage} placeholder="153694" onChange={(e) => setMileage(e.target.value)} style={{ width: '100%', padding: '16px 16px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '16px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>COMBUSTIBIL</label>
                          <select value={fuel} onChange={(e) => setFuel(e.target.value)} style={{ width: '100%', padding: '16px 14px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '15px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}>
                            <option value="Gasolina">Gasolina</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Hibrid">Hibrid</option>
                            <option value="Electric">Electric</option>
                            <option value="GPL">GPL</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>CUTIE VITEZE</label>
                          <select value={gearbox} onChange={(e) => setGearbox(e.target.value)} style={{ width: '100%', padding: '16px 14px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '15px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}>
                            <option value="Manuală">Manuală</option>
                            <option value="Automată">Automată</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* IMOBILIARE SPECIAL FIELDS */}
                  {selectedCategory === 'Imobiliare' && (
                    <div style={{ backgroundColor: '#F8FAFC', padding: '28px', borderRadius: '20px', border: '1.5px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: '#059669', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                        DETALII PROPRIETATE IMOBILIARĂ
                      </span>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>TIP IMOBIL</label>
                          <select value={propType} onChange={(e) => setPropType(e.target.value)} style={{ width: '100%', padding: '16px 14px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '15px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}>
                            <option value="Apartament">Apartament</option>
                            <option value="Casă">Casă / Vilă</option>
                            <option value="Teren">Teren</option>
                            <option value="Spațiu comercial">Spațiu comercial</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>OPERAȚIUNE</label>
                          <select value={operation} onChange={(e) => setOperation(e.target.value)} style={{ width: '100%', padding: '16px 14px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '15px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}>
                            <option value="Vânzare">Vânzare</option>
                            <option value="Închiriere">Închiriere</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>CAMERE</label>
                          <input type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} style={{ width: '100%', padding: '16px 16px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '16px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>SUPRAFAȚĂ (M²)</label>
                          <input type="number" value={area} placeholder="65" onChange={(e) => setArea(e.target.value)} style={{ width: '100%', padding: '16px 16px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '16px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* LOCURI DE MUNCĂ SPECIAL FIELDS */}
                  {selectedCategory === 'Locuri de muncă' && (
                    <div style={{ backgroundColor: '#F8FAFC', padding: '28px', borderRadius: '20px', border: '1.5px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: '#0D9488', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                        DETALII LOC DE MUNCĂ
                      </span>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '18px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>DOMENIU ACTIVITATE</label>
                          <select value={jobDomain} onChange={(e) => setJobDomain(e.target.value)} style={{ width: '100%', padding: '16px 14px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '15px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}>
                            <option value="IT & Software">IT & Software</option>
                            <option value="Vânzări & Comercial">Vânzări & Comercial</option>
                            <option value="Construcții">Construcții</option>
                            <option value="HORECA">HORECA</option>
                            <option value="Transport & Logistică">Transport & Logistică</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>TIP CONTRACT</label>
                          <select value={contractType} onChange={(e) => setContractType(e.target.value)} style={{ width: '100%', padding: '16px 14px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '15px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Proiect / Freelance">Proiect / Freelance</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>SALARIU ESTIMAT (€)</label>
                          <input type="number" value={salary} placeholder="4500" onChange={(e) => setSalary(e.target.value)} style={{ width: '100%', padding: '16px 16px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '16px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* MATRIMONIALE (PRO) SPECIAL FIELDS */}
                  {selectedCategory === 'Matrimoniale' && (
                    <div style={{ backgroundColor: '#FFF1F2', padding: '28px', borderRadius: '20px', border: '2px solid #F43F5E', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: '#F43F5E', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                        CĂUTARE MATRIMONIALĂ PRO 👑
                      </span>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '18px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>VÂRSTĂ</label>
                          <input type="number" value={age} placeholder="28" onChange={(e) => setAge(e.target.value)} style={{ width: '100%', padding: '16px 16px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '16px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>GEN</label>
                          <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ width: '100%', padding: '16px 14px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '15px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}>
                            <option value="Femeie">Femeie</option>
                            <option value="Bărbat">Bărbat</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>SCOP RELAȚIE</label>
                          <select value={relationshipType} onChange={(e) => setRelationshipType(e.target.value)} style={{ width: '100%', padding: '16px 14px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '15px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}>
                            <option value="Relație serioasă">Relație serioasă</option>
                            <option value="Prietenie & Socializare">Prietenie & Socializare</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SERVICII SPECIAL FIELDS */}
                  {selectedCategory === 'Servicii' && (
                    <div style={{ backgroundColor: '#F8FAFC', padding: '28px', borderRadius: '20px', border: '1.5px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: '#6366F1', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                        DETALII SERVICIU PROFESIONAL
                      </span>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>TIP SERVICIU</label>
                          <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} style={{ width: '100%', padding: '16px 14px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '15px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}>
                            <option value="Construcții & Amenajări">Construcții & Amenajări</option>
                            <option value="Transport & Mutații">Transport & Mutații</option>
                            <option value="Reparații Auto">Reparații Auto</option>
                            <option value="Curățenie">Curățenie</option>
                            <option value="Evenimente">Evenimente</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>MOD TARIF</label>
                          <select value={rateType} onChange={(e) => setRateType(e.target.value)} style={{ width: '100%', padding: '16px 14px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '15px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}>
                            <option value="Pe oră">Pe oră</option>
                            <option value="Pe lucrare / proiect">Pe lucrare / proiect</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ELECTRONICE SPECIAL FIELDS */}
                  {selectedCategory === 'Electronice' && (
                    <div style={{ backgroundColor: '#F8FAFC', padding: '28px', borderRadius: '20px', border: '1.5px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: '#8B5CF6', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                        DETALII PRODUS ELECTRONIC
                      </span>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>SUBCATEGORIE</label>
                          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} style={{ width: '100%', padding: '16px 14px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '15px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}>
                            <option value="Telefoane">Telefoane</option>
                            <option value="Laptop-uri & PC">Laptop-uri & PC</option>
                            <option value="TV & Audio">TV & Audio</option>
                            <option value="Console & Jocuri">Console & Jocuri</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>BRAND / PRODUCĂTOR</label>
                          <input type="text" value={electronicBrand} placeholder="ex: Apple / Samsung" onChange={(e) => setElectronicBrand(e.target.value)} style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '16px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* MODĂ SPECIAL FIELDS */}
                  {selectedCategory === 'Modă' && (
                    <div style={{ backgroundColor: '#F8FAFC', padding: '28px', borderRadius: '20px', border: '1.5px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: '#EC4899', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                        DETALII ARTICOL MODĂ
                      </span>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>SECȚIUNE</label>
                          <select value={genderSection} onChange={(e) => setGenderSection(e.target.value)} style={{ width: '100%', padding: '16px 14px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '15px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}>
                            <option value="Femei">Femei</option>
                            <option value="Bărbați">Bărbați</option>
                            <option value="Unisex">Unisex</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>MĂRIME</label>
                          <input type="text" value={clothingSize} placeholder="ex: S, M, L, 40, 42" onChange={(e) => setClothingSize(e.target.value)} style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '16px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ANIMALE SPECIAL FIELDS */}
                  {selectedCategory === 'Animale' && (
                    <div style={{ backgroundColor: '#F8FAFC', padding: '28px', borderRadius: '20px', border: '1.5px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: '#D97706', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                        DETALII ANIMALE DE COMPANIE
                      </span>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>TIP ANIMAL</label>
                          <select value={animalType} onChange={(e) => setAnimalType(e.target.value)} style={{ width: '100%', padding: '16px 14px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '15px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}>
                            <option value="Câini">Câini</option>
                            <option value="Pisici">Pisici</option>
                            <option value="Păsări">Păsări</option>
                            <option value="Accesorii">Accesorii & Hrană</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>RASĂ / BREED</label>
                          <input type="text" value={breed} placeholder="ex: Beagle / Labrador" onChange={(e) => setBreed(e.target.value)} style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '16px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TURISM SPECIAL FIELDS */}
                  {selectedCategory === 'Turism' && (
                    <div style={{ backgroundColor: '#F8FAFC', padding: '28px', borderRadius: '20px', border: '1.5px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: '#0284C7', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                        DETALII CAZARE & TURISM
                      </span>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>TIP CAZARE</label>
                          <select value={accommodationType} onChange={(e) => setAccommodationType(e.target.value)} style={{ width: '100%', padding: '16px 14px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '15px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}>
                            <option value="Pensiune">Pensiune</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Cabană">Cabană</option>
                            <option value="Garsonieră regim hotelier">Garsonieră regim hotelier</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>CAPACITATE (PERSOANE)</label>
                          <input type="number" value={guestsCount} placeholder="2" onChange={(e) => setGuestsCount(e.target.value)} style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '2px solid #CBD5E1', fontSize: '16px', fontWeight: 700, color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STANDARD INPUTS */}
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
                        PREȚ (€) *
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

                  {/* ONLY DESCRIERE ANUNȚ ENLARGED AS REQUESTED */}
                  <div style={{ marginTop: '8px' }}>
                    <label style={{ display: 'block', fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                      Descriere anunț
                    </label>
                    <textarea
                      rows={7}
                      placeholder={
                        selectedCategory === 'Auto'
                          ? 'Descrie mașina ta... (istoric service, defecte optice, piese schimbate)'
                          : selectedCategory === 'Imobiliare'
                          ? 'Descrie proprietatea ta... (compartimentare, îmbunătățiri, facilități, zonă)'
                          : selectedCategory === 'Locuri de muncă'
                          ? 'Descrie postul oferit... (cerințe, responsabilități, beneficii)'
                          : 'Descrie anunțul tău... (stare produs, garanție, detalii tehnice)'
                      }
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      style={{
                        width: '100%',
                        minHeight: '220px',
                        padding: '24px 28px',
                        borderRadius: '22px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '1.6',
                        color: '#0F172A',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        resize: 'vertical',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #F1F5F9' }}>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      style={{ padding: '14px 26px', borderRadius: '14px', border: '1.5px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '14px', fontWeight: 700, color: '#475569', cursor: 'pointer' }}
                    >
                      ← Înapoi la Categorii
                    </button>

                    <button
                      type="submit"
                      style={{ padding: '16px 40px', borderRadius: '30px', border: 'none', backgroundColor: 'var(--primary-yellow)', fontSize: '16px', fontWeight: 800, color: '#0F172A', cursor: 'pointer', boxShadow: '0 6px 18px rgba(248, 210, 71, 0.45)' }}
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
                      {price || '0'} €
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
