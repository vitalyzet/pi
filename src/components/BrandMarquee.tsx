import React from 'react';

interface Brand {
  name: string;
  logo: string;
}

const BRANDS: Brand[] = [
  { name: 'BMW', logo: '/images/bmw-light.webp' },
  { name: 'Mercedes-Benz', logo: '/images/mercedes-light.webp' },
  { name: 'Audi', logo: '/images/audi-light.webp' },
  { name: 'Volkswagen', logo: '/images/vw-light.webp' },
  { name: 'Porsche', logo: '/images/porsche-light.webp' },
  { name: 'Ferrari', logo: '/images/ferrari-light.webp' },
  { name: 'Lamborghini', logo: '/images/lamborghini-light.webp' },
  { name: 'Tesla', logo: '/images/tesla-light.webp' },
  { name: 'Toyota', logo: '/images/toyota-light.webp' },
  { name: 'Ford', logo: '/images/ford-light.webp' },
  { name: 'Dacia', logo: '/images/dacia-light.webp' },
  { name: 'Volvo', logo: '/images/volvo-light.webp' },
  { name: 'Jaguar', logo: '/images/jaguar-light.webp' },
  { name: 'Lexus', logo: '/images/lexus-light.webp' }
];

interface BrandMarqueeProps {
  onSelectBrand?: (brand: string) => void;
}

export const BrandMarquee: React.FC<BrandMarqueeProps> = ({ onSelectBrand }) => {
  // Duplicate to guarantee infinite seamless loop
  const doubleBrands = [...BRANDS, ...BRANDS];

  return (
    <section className="brand-marquee-section">
      <div className="brand-marquee-wrapper">
        <div className="brand-marquee-track">
          {doubleBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="brand-marquee-card"
              onClick={() => onSelectBrand && onSelectBrand(brand.name)}
            >
              <img src={brand.logo} alt={brand.name} className="brand-marquee-logo" />
              <span className="brand-marquee-name">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
