import { Scissors, Sparkles, Shield, Compass } from 'lucide-react';

export function CraftsmanshipStory() {
  return (
    <section className="craftsmanship-narrative-section" id="craftsmanship">
      <div className="craft-container">
        <div className="craft-eyebrow-wrap">
          <span className="eyebrow">03 — THE ARTISAN MANIFESTO</span>
          <span className="craft-coord">45° 45′ N, 4° 50′ E — RUE VIVIENNE & LYON</span>
        </div>

        <h2 className="craft-main-title">
          The hands, the materials,<br />
          the <i>thought</i> and the care.
        </h2>

        <p className="craft-manifesto-lead">
          We reject the industrial illusion of speed. In our ateliers, a garment does not begin
          with a production quota, but with a dialogue between raw earth and human patience.
        </p>

        {/* 4 Pillars of Craftsmanship */}
        <div className="craft-pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon">
              <Scissors size={18} />
            </div>
            <span className="pillar-num">01 / DISCIPLINE</span>
            <h3 className="pillar-title">True 45° Bias Cutting</h3>
            <p className="pillar-text">
              Cutting on the geometric diagonal grants woven silk natural three-dimensional elasticity.
              The dress drapes like liquid light, moving naturally with the body without synthetic elastane.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <Sparkles size={18} />
            </div>
            <span className="pillar-num">02 / EMBELLISHMENT</span>
            <h3 className="pillar-title">Graduated Pearl Cabochons</h3>
            <p className="pillar-text">
              Natural river pearls hand-sorted across three calibrated diameters. Each pearl is anchored
              with triple-pass waxed silk filum to prevent fabric fatigue and catch studio light.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <Shield size={18} />
            </div>
            <span className="pillar-num">03 / STRUCTURE</span>
            <h3 className="pillar-title">Internal Floating Canvas</h3>
            <p className="pillar-text">
              Chest pieces and waist foundations constructed from natural horsehair and linen canvas.
              Over time, body heat contours the canvas to the wearer's unique posture, ensuring enduring longevity.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <Compass size={18} />
            </div>
            <span className="pillar-num">04 / ORIGIN</span>
            <h3 className="pillar-title">Single-Origin Mulberry Silk</h3>
            <p className="pillar-text">
              Ethically harvested mulberry silk spun in Como, woven on vintage wooden shuttle looms in Lyon,
              and sculpted in our Paris atelier. Unbroken provenance recorded in every garment dossier.
            </p>
          </div>
        </div>

        {/* Editorial Quote Banner */}
        <div className="craft-quote-banner">
          <blockquote>
            “When you wear a garment crafted with true intention, you carry the time,
            the breath, and the spirit of every artisan who touched it.”
          </blockquote>
          <cite>— Head Pattern Maker, Atelier Forme</cite>
        </div>
      </div>
    </section>
  );
}

