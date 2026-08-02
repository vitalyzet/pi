import React, { useState } from 'react';
import { Star, ChevronDown, CheckCircle } from 'lucide-react';
import { WriteReviewModal } from './WriteReviewModal';

const MOCK_REVIEWS = [
  {
    id: 1,
    product: "Pin Metalic Sorry I'm Late",
    rating: 5,
    date: '03/31/2026',
    author: 'Daniela Jurmoni',
    verified: true,
    title: 'Sunteti niste scumpi :D',
    content: 'Sunteti f. draguti ca mi-ati scris si un biletel, de mana si ca ati verificat de cate ori am comandat de la voi. :D\nSuper cute! Imi plac f. mult pin-urile voastre!'
  },
  {
    id: 2,
    product: "Pin Metalic Daisy Duck",
    rating: 5,
    date: '03/20/2026',
    author: 'Diana Tarjan',
    verified: true,
    title: '',
    content: 'Multumita'
  },
  {
    id: 3,
    product: "Pin Metalic Sorry I'm Late",
    rating: 5,
    date: '03/11/2026',
    author: 'Cristian Ciocan',
    verified: true,
    title: '',
    content: 'foarte frumoase'
  },
  {
    id: 4,
    product: "Pin Metalic Movie Quotes",
    rating: 4,
    date: '03/05/2026',
    author: 'Andrei Stoica',
    verified: true,
    title: 'Super faine produsele, calitate si seriozitate la livrare',
    content: 'Foarte faine si ceva mai inedit pentru martisor, dar si in rest pentru alte ocazii.'
  },
  {
    id: 5,
    product: "Pin Metalic Kitty Love",
    rating: 5,
    date: '03/07/2026',
    author: 'Adrian Ilie',
    verified: true,
    title: 'Pin Metalic Kitty Love',
    content: ''
  },
  {
    id: 6,
    product: "Pin Metalic Sarcastic Bunny",
    rating: 5,
    date: '03/06/2026',
    author: 'Larisa Rusu',
    verified: true,
    title: 'Superbe',
    content: 'Foarte dragute pin-urile, recomand'
  },
  {
    id: 7,
    product: "Pin Metalic Friends Couch",
    rating: 5,
    date: '03/04/2026',
    author: 'Veronica',
    verified: true,
    title: '',
    content: 'Super calitative și drăguțe'
  },
  {
    id: 8,
    product: "Pin Metalic Radioactive",
    rating: 5,
    date: '03/04/2026',
    author: 'NICOLAE CONSTANTIN',
    verified: true,
    title: 'Pin Metalic Radioactive',
    content: ''
  },
  {
    id: 9,
    product: "Pin Metalic Coffee & Chill",
    rating: 5,
    date: '03/04/2026',
    author: 'Alexandra S.',
    verified: true,
    title: 'Martie',
    content: 'Foarte frumoase.'
  },
  {
    id: 10,
    product: "Pin Metalic Dr. Duck",
    rating: 5,
    date: '03/04/2026',
    author: 'Sabina Radu',
    verified: true,
    title: 'Le ador ❤️',
    content: 'PS: daca ați face si mai multe pe tema medicala, poate chiar microbiologie (sunt medic microbiolog) as fi cea mai incantata ✨'
  },
  {
    id: 11,
    product: "Pin Metalic Caffeine Boost",
    rating: 5,
    date: '03/03/2026',
    author: 'Mihai George Mardare',
    verified: true,
    title: 'Pin Metalic Caffeine Boost',
    content: ''
  }
];

export const ReviewsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'produse' | 'magazin'>('produse');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Header Area */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #EBEBEB', padding: '40px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, textAlign: 'center', marginBottom: '40px', color: '#222' }}>
            Recenzii
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '40px' }}>
            
            {/* Overall Rating */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: '1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={20} fill="#F8D247" color="#F8D247" />
                ))}
                <span style={{ fontSize: '15px', color: '#FEA742', fontWeight: 600, marginLeft: '8px', textDecoration: 'underline' }}>
                  4.94 din 5
                </span>
              </div>
              <span style={{ fontSize: '14px', color: '#666' }}>
                Bazată pe 2226 recenzii
              </span>
            </div>

            {/* Rating Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: '1', minWidth: '250px', borderLeft: '1px solid #EEE', borderRight: '1px solid #EEE', padding: '0 40px' }}>
              {[
                { stars: 5, count: 2133, percent: 95 },
                { stars: 4, count: 65, percent: 15 },
                { stars: 3, count: 18, percent: 5 },
                { stars: 2, count: 2, percent: 1 },
                { stars: 1, count: 8, percent: 2 }
              ].map(row => (
                <div key={row.stars} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '2px', width: '80px', justifyContent: 'flex-end' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < row.stars ? "#F8D247" : "transparent"} color="#F8D247" strokeWidth={2} />
                    ))}
                  </div>
                  <div style={{ flex: 1, height: '14px', backgroundColor: '#F0F0F0', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${row.percent}%`, height: '100%', backgroundColor: '#FEA742' }}></div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#666', width: '30px' }}>{row.count}</span>
                </div>
              ))}
            </div>

            {/* Write Review Button */}
            <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
              <button 
                onClick={() => setIsModalOpen(true)}
                style={{
                  backgroundColor: '#FEA742',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 24px',
                  fontSize: '16px',
                  fontWeight: 600,
                  borderRadius: '2px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(254, 167, 66, 0.2)'
                }}
              >
                Scrie o recenzie<br/>magazinului
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '40px auto 0 auto', padding: '0 24px' }}>
        
        {/* Tabs & Sort */}
        <div style={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #EBEBEB', padding: '16px 24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #F0F0F0', paddingBottom: '16px', marginBottom: '16px' }}>
            <button 
              onClick={() => setActiveTab('produse')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '15px', fontWeight: activeTab === 'produse' ? 600 : 400,
                color: activeTab === 'produse' ? '#FEA742' : '#666',
                padding: '8px 16px',
                backgroundColor: activeTab === 'produse' ? '#FFF9F0' : 'transparent',
                borderRadius: '4px'
              }}
            >
              Recenzii Produse (2179)
            </button>
            <button 
              onClick={() => setActiveTab('magazin')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '15px', fontWeight: activeTab === 'magazin' ? 600 : 400,
                color: activeTab === 'magazin' ? '#FEA742' : '#666',
                padding: '8px 16px',
                backgroundColor: activeTab === 'magazin' ? '#FFF9F0' : 'transparent',
                borderRadius: '4px'
              }}
            >
              Recenzii Magazin (47)
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', width: 'fit-content' }}>
            <span style={{ fontSize: '14px', color: '#444' }}>Cele mai recente</span>
            <ChevronDown size={16} color="#FEA742" />
          </div>
        </div>

        {/* Masonry Grid of Reviews */}
        <div style={{
          columnCount: 3,
          columnGap: '24px',
          width: '100%'
        }}>
          {MOCK_REVIEWS.map(review => (
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
                despre <span style={{ color: '#FEA742', textDecoration: 'underline', cursor: 'pointer' }}>{review.product}</span>
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
                <div style={{ width: '36px', height: '36px', backgroundColor: '#F5F5F5', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FEA742', position: 'relative' }}>
                  {/* Mock user avatar icon */}
                  <div style={{ width: '16px', height: '16px', border: '2px solid #FEA742', borderRadius: '50%', position: 'absolute', top: '4px' }}></div>
                  <div style={{ width: '24px', height: '12px', border: '2px solid #FEA742', borderRadius: '12px 12px 0 0', borderBottom: 'none', position: 'absolute', bottom: '4px' }}></div>
                  <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', backgroundColor: '#fff', borderRadius: '50%' }}>
                    <CheckCircle size={14} color="#FEA742" fill="#FEA742" style={{ color: '#fff' }} />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#222' }}>{review.author}</div>
                  <div style={{ fontSize: '11px', color: '#fff', backgroundColor: '#FEA742', padding: '2px 6px', borderRadius: '2px', display: 'inline-block', marginTop: '2px', fontWeight: 600 }}>Verificat</div>
                </div>
              </div>

              {review.title && (
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#222', marginBottom: '8px' }}>
                  {review.title}
                </div>
              )}
              {review.content && (
                <div style={{ fontSize: '14px', color: '#444', lineHeight: '1.5' }}>
                  {review.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <WriteReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={(review) => {
          console.log('Submitted review:', review);
          setIsModalOpen(false);
          // In a real app we would add it to the list here or show a success toast
          alert('Recenzia a fost trimisă cu succes!');
        }} 
      />
    </div>
  );
};
