import { BookOpen, Drama, ShieldCheck } from 'lucide-react';

export function AboutUsSection() {
  return (
    <div className="page-view-wrapper about-us-page">
      {/* 1. Page Header */}
      <div className="page-hero-header">
        <span className="eyebrow">PAGE 02 — INSTITUTIONAL PROVENANCE</span>
        <h1 className="page-main-title">
          Fashion education<br />
          rooted in <i>India.</i>
        </h1>
        <p className="page-lead-para">
          “What if every child grew up knowing the story behind what they wear?”
        </p>
      </div>

      {/* 2. Brand Vision & Manifesto */}
      <div className="about-manifesto-block">
        <div className="manifesto-sidebar">
          <span className="manifesto-badge">FOUNDING PRINCIPLE</span>
          <p className="manifesto-creed">
            The land.<br />
            The material.<br />
            The maker.<br />
            The culture.<br />
            The industry.
          </p>
        </div>

        <div className="manifesto-body-text">
          <p>
            Clothing is not simply fabric stitched together; it is an unbroken living archive of human civilization,
            agricultural stewardship, indigenous chemistry, and mathematical geometry. Yet today, children grow up
            surrounded by disposable fast fashion, alienated from the hands that spin, dye, and construct their garments.
          </p>
          <p>
            <strong>THE THREADOR</strong> was founded to bridge this fundamental cultural chasm. We place Indian textile
            knowledge, indigenous fiber science, and stage dramaturgy directly into the hands of young learners,
            fostering critical design thinking, material literacy, and lifelong respect for artisanal mastery.
          </p>
        </div>
      </div>

      {/* 3. Founder Story & Philosophy */}
      <div className="founder-story-section">
        <div className="founder-header">
          <span className="sub-tag">THE GENESIS</span>
          <h3>A Dialogue Between Heritage and Contemporary Runways</h3>
        </div>

        <div className="founder-story-card">
          <div className="founder-portrait-frame">
            <div className="portrait-visual-glow" />
            <div className="portrait-caption">
              <span>FOUNDER & CREATIVE DIRECTOR</span>
              <span>ATELIER FORME / THE THREADOR</span>
            </div>
          </div>

          <div className="founder-quote-column">
            <blockquote>
              “When a child feels the difference between handspun Desi cotton and petrochemical polyester,
              or observes the natural indigo vat ferment, they do not just learn about clothing — they awaken
              to the ecology of the planet and the dignity of the artisan.”
            </blockquote>
            <p className="founder-bio-text">
              Born from over a decade of immersive engagement with master handloom weavers in Varanasi,
              block-printers in Bagru, and theater costume directors across India, The Threador unites
              two complementary disciplines: <strong>structured fashion education for schools</strong> and an
              <strong>uncompromising costume atelier for stage productions</strong>.
            </p>
            <div className="founder-approval-notice">
              <ShieldCheck size={14} className="notice-icon" />
              <span>
                Detailed academic credentials, publications, and master artisan alliances are published
                in our seasonal institutional curriculum dossier.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. The Two Pillars */}
      <div className="two-pillars-showcase">
        <div className="pillar-column learn-pillar">
          <div className="pillar-header-tag">
            <BookOpen size={16} />
            <span>PILLAR 01: LEARN</span>
          </div>
          <h4>Fashion Education in Schools</h4>
          <p>
            Structured grade-progressive learning connecting classrooms with India's rich craft geography,
            sustainable textiles, 3D pattern cutting, and circular economy principles.
          </p>
          <ul className="pillar-bullets">
            <li>Tactile sensory workshops for primary grades (1–3)</li>
            <li>Weaving mechanics and natural dye chemistry for middle school (4–6)</li>
            <li>Portfolio construction and wearable design for secondary grades (7–8)</li>
          </ul>
        </div>

        <div className="pillar-column create-pillar">
          <div className="pillar-header-tag">
            <Drama size={16} />
            <span>PILLAR 02: CREATE</span>
          </div>
          <h4>Stage Costume Atelier</h4>
          <p>
            Full-scale theatrical production design for school Annual Days, national competitions,
            dance academies, and historic cultural spectacles.
          </p>
          <ul className="pillar-bullets">
            <li>Original theatrical theme conceptualization and research</li>
            <li>Costumes engineered for stage lighting and kinetic flow</li>
            <li>Integrated choreography, voiceover, and soundtrack curation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
