import React from 'react';
import { Smile, Lock, Sparkles, Gift } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section">
      <h2 className="section-heading">De ce sunt așa minunate?</h2>
      <div className="features-grid">
        {/* Feature 1 */}
        <div className="feature-card">
          <div className="feature-icon-wrapper" style={{ color: '#1796A4' }}>
            <Smile size={48} />
          </div>
          <h3 className="feature-title">Te exprimă pe tine!</h3>
          <p className="feature-desc">
            Alege dintre sutele modele pentru a exprima exact ce simți și cum ești cu adevărat!
          </p>
        </div>

        {/* Feature 2 */}
        <div className="feature-card">
          <div className="feature-icon-wrapper" style={{ color: '#E55B86' }}>
            <Lock size={44} />
          </div>
          <h3 className="feature-title">Rezistente și sigure</h3>
          <p className="feature-desc">
            Sunt făcute din metal și vin cu fluturaș de prindere ca să nu le pierzi!
          </p>
        </div>

        {/* Feature 3 */}
        <div className="feature-card">
          <div className="feature-icon-wrapper" style={{ color: '#4ECDC4' }}>
            <Sparkles size={44} />
          </div>
          <h3 className="feature-title">Design creativ și adorabil</h3>
          <p className="feature-desc">
            Cele mai trăznite idei combinate cu cele mai vii culori. Sigur o să-ți placă!
          </p>
        </div>

        {/* Feature 4 */}
        <div className="feature-card">
          <div className="feature-icon-wrapper" style={{ color: '#F8D247' }}>
            <Gift size={44} />
          </div>
          <h3 className="feature-title">Cadoul perfect</h3>
          <p className="feature-desc">
            Arată-i că știi ce iubește, alegându-i un pin care o reprezintă. Își va aminti de tine zilnic.
          </p>
        </div>
      </div>
    </section>
  );
};
