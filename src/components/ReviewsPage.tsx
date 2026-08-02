import React, { useState } from 'react';
import { Star, ChevronDown, CheckCircle } from 'lucide-react';
import { WriteReviewModal } from './WriteReviewModal';
import { AVATARS } from './AvatarSelectionModal';

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

const MOCK_PLATFORM_REVIEWS = [
  { id: 101, product: "Platforma Pi", rating: 5, date: '04/15/2026', author: 'Elena G.', verified: true, title: 'Super experiență', content: 'Am postat mașina la vânzare și a doua zi m-a sunat cineva. E mult mai ieftin ca pe OLX și ai vizibilitate mare. Recomand Pi!' },
  { id: 102, product: "Platforma Pi", rating: 5, date: '04/10/2026', author: 'Marius Stan', verified: true, title: 'Excelent pentru imobiliare', content: 'E nouă, dar deja văd o groază de anunțuri imobiliare bune. Interfața e genială și fără zeci de reclame invazive.' },
  { id: 103, product: "Platforma Pi", rating: 5, date: '04/02/2026', author: 'Ioana R.', verified: true, title: 'Adio Publi24', content: 'Am lăsat Publi24 pentru voi. Prețurile de promovare sunt super decente și chiar funcționează. Mult noroc!' },
  { id: 104, product: "Platforma Pi", rating: 5, date: '03/28/2026', author: 'Andrei Popescu', verified: false, title: 'Rapid și eficient', content: 'Platforma e super intuitivă, am pus un anunț cu apartamentul spre închiriere în fix 2 minute.' },
  { id: 105, product: "Platforma Pi", rating: 5, date: '03/25/2026', author: 'Maria D.', verified: true, title: 'Cea mai bună alternativă', content: 'Cea mai bună alternativă apărută până acum. Taxele sunt mult mai mici și suportul răspunde imediat.' },
  { id: 106, product: "Platforma Pi", rating: 4, date: '03/20/2026', author: 'Alexandru V.', verified: false, title: '', content: 'Aplicație curată, merge brici. Am vândut niște mobilă rapid.' },
  { id: 107, product: "Platforma Pi", rating: 4, date: '03/15/2026', author: 'Cristina M.', verified: true, title: 'Început promițător', content: 'Mai aveți de lucrat un pic la filtrele pentru mașini (lipsesc câteva modele mai vechi), dar per total e super ok și mult mai ieftină.' },
  { id: 108, product: "Platforma Pi", rating: 5, date: '03/10/2026', author: 'Radu Ionescu', verified: true, title: 'Concurență reală!', content: 'Excelentă inițiativă! Eram sătui de monopol. Felicitări, platforma se mișcă impecabil.' },
  { id: 109, product: "Platforma Pi", rating: 5, date: '03/05/2026', author: 'Simona B.', verified: false, title: 'Promovare ieftină', content: 'Promovarea unui anunț costă la jumătate față de competiție, iar rezultatele sunt aceleași. Bravo!' },
  { id: 110, product: "Platforma Pi", rating: 5, date: '02/28/2026', author: 'George C.', verified: true, title: 'Recomand!', content: 'Mă bucur că a apărut o concurență reală în România pentru site-urile de anunțuri. Mult succes!' },
  { id: 111, product: "Platforma Pi", rating: 5, date: '02/20/2026', author: 'Alina F.', verified: true, title: 'Chiriași găsiți rapid', content: 'Am găsit chiriași pentru garsonieră în doar câteva zile, fără să cheltui o avere pe promovare.' },
  { id: 112, product: "Platforma Pi", rating: 5, date: '02/15/2026', author: 'Sorin A.', verified: false, title: 'Design modern', content: 'Design modern și fresh, nu te pierzi prin zeci de meniuri complicate. OLX are de învățat.' },
  { id: 113, product: "Platforma Pi", rating: 5, date: '02/10/2026', author: 'Dana T.', verified: true, title: '', content: 'Mă bucur că se pot adăuga multe poze la anunț fără costuri ascunse. 5 stele!' },
  { id: 114, product: "Platforma Pi", rating: 4, date: '02/05/2026', author: 'Bogdan N.', verified: true, title: 'Mai ieftin', content: 'Am cumpărat o mașină listată aici. Vânzătorul mi-a zis că a ales Pi pentru că era mai ieftin să dea anunțul.' },
  { id: 115, product: "Platforma Pi", rating: 4, date: '01/28/2026', author: 'Mihaela P.', verified: false, title: '', content: 'Mai trebuie strânsă comunitatea, unele categorii au puține anunțuri momentan, dar e de înțeles fiind platformă nouă.' },
  { id: 116, product: "Platforma Pi", rating: 5, date: '01/20/2026', author: 'Vlad D.', verified: true, title: 'Fără probleme', content: 'Sistemul de mesagerie din platformă e excelent și nu se blochează absolut deloc.' },
  { id: 117, product: "Platforma Pi", rating: 5, date: '01/15/2026', author: 'Oana S.', verified: true, title: 'Foarte mulțumită', content: 'Mult mai ieftin decât Publi24. Am promovat un anunț cu prestări servicii și m-au sunat deja 3 clienți azi.' },
  { id: 118, product: "Platforma Pi", rating: 5, date: '01/10/2026', author: 'Cosmin R.', verified: false, title: 'Clean', content: 'În sfârșit o platformă unde nu trebuie să dai click pe 5 reclame ca să vezi un număr de telefon.' },
  { id: 119, product: "Platforma Pi", rating: 5, date: '01/05/2026', author: 'Ana Maria', verified: true, title: 'Cel mai tare site', content: 'Văd că se dezvoltă frumos. Merge perfect din browser și de pe mobil. Felicitări dezvoltatorilor!' },
  { id: 120, product: "Platforma Pi", rating: 5, date: '12/28/2025', author: 'Iulian G.', verified: true, title: 'Perfect', content: 'Nota 10 echipei. Ați adus o gură de aer proaspăt în piața de anunțuri din Ro!' }
];

export const ReviewsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'produse' | 'magazin'>('produse');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayedReviews = activeTab === 'produse' ? MOCK_REVIEWS : MOCK_PLATFORM_REVIEWS;

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
              Recenzii Utilizatori (2179)
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
              Recenzii Platforma Pi (47)
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
          {displayedReviews.map((review, index) => (
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
              {activeTab === 'produse' && (
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
                  despre <span style={{ color: '#FEA742', textDecoration: 'underline', cursor: 'pointer' }}>{review.product}</span>
                </div>
              )}
              
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
