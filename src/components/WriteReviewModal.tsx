import React, { useState } from 'react';
import { X, Star, Upload } from 'lucide-react';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: any) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Vă rugăm să acordați o notă.');
      return;
    }
    onSubmit({ rating, title, content, displayName, email });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '40px 20px',
      overflowY: 'auto'
    }}>
      <div style={{
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: '800px',
        padding: '40px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px', right: '20px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#666'
          }}
        >
          <X size={28} />
        </button>

        <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#2b2b2b', marginBottom: '30px' }}>
          Scrie o recenzie
        </h2>

        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Rating */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '16px', color: '#444' }}>Evaluare</label>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                >
                  <Star 
                    size={32} 
                    fill={(hoverRating || rating) >= star ? '#FEA742' : 'transparent'} 
                    color="#FEA742" 
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '16px', color: '#444' }}>Titlul Recenziei</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Dă recenziei tale un titlu"
              style={{
                width: '100%',
                padding: '14px',
                border: '1px solid #FEA742',
                borderRadius: '2px',
                fontSize: '15px',
                outline: 'none'
              }}
            />
          </div>

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '16px', color: '#444' }}>Conținutul recenziei</label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Începe să scrii aici..."
              rows={6}
              style={{
                width: '100%',
                padding: '14px',
                border: '1px solid #EBEBEB',
                borderRadius: '2px',
                fontSize: '15px',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Photo / Video upload mock */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '16px', color: '#444' }}>Poză/Video (opțional)</label>
            <div style={{
              width: '120px', height: '120px',
              border: '1px solid #EBEBEB',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#888'
            }}>
              <Upload size={40} strokeWidth={2} />
            </div>
          </div>

          {/* Name & Email */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
            <label style={{ fontSize: '16px', color: '#444' }}>Nume de afișare (afișat public ca John Smith ⌄)</label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Nume de afișare"
              style={{
                width: '100%',
                padding: '14px',
                border: '1px solid #EBEBEB',
                borderRadius: '2px',
                fontSize: '15px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '16px', color: '#444' }}>Adresă de email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Adresa ta de email"
              style={{
                width: '100%',
                padding: '14px',
                border: '1px solid #EBEBEB',
                borderRadius: '2px',
                fontSize: '15px',
                outline: 'none'
              }}
            />
          </div>

          {/* Disclaimer */}
          <p style={{ textAlign: 'center', color: '#444', fontSize: '15px', lineHeight: '1.6', marginTop: '20px' }}>
            Cum folosim datele tale: Te vom contacta doar în legătură cu recenzia pe care<br/>
            ai lăsat-o, și doar dacă este necesar. Prin trimiterea recenziei tale, ești de<br/>
            acord cu <a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>termenii</a>, <a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>politica de confidențialitate</a> și <a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>politica de conținut</a><br/>
            Judge.me.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 30px',
                border: '2px solid #FEA742',
                background: 'transparent',
                color: '#FEA742',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '2px'
              }}
            >
              Anulează recenzia
            </button>
            <button
              type="submit"
              style={{
                padding: '12px 30px',
                border: '2px solid #FEA742',
                background: '#FEA742',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '2px'
              }}
            >
              Trimite Recenzia
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
