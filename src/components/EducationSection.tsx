import { useState } from 'react';
import { BookOpen, CheckCircle2, Sparkles, Send, ShieldCheck, Compass, HeartHandshake, Layers } from 'lucide-react';
import { THREADOR_BRAND } from '../data/threadorBrand';
import { saveCourseEnrolmentLead, generateWhatsAppLink } from '../services/leadService';
import type { CourseEnrolmentLead } from '../types';

interface EducationSectionProps {
  isFullPage?: boolean;
}

export function EducationSection({ isFullPage = false }: EducationSectionProps) {
  const [selectedGradeTab, setSelectedGradeTab] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    grade: 'grades-4-6' as CourseEnrolmentLead['grade'],
    phone: '',
    email: '',
    batch: 'weekend' as CourseEnrolmentLead['batch'],
    referralSource: ''
  });
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.childName || !formData.phone || !formData.email) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }

    setErrorMsg('');
    saveCourseEnrolmentLead(formData);
    setFormSubmitted(true);
  };

  return (
    <section className={`education-section ${isFullPage ? 'page-view' : ''}`} id="learn-education">
      {/* 1. Header & Brand Philosophy */}
      <div className="education-intro-container">
        <div className="section-badge-row">
          <span className="eyebrow">PART V — THE EDUCATIONAL EXPERIENCE</span>
          <span className="brand-pill">FASHION EDUCATION ROOTED IN INDIA</span>
        </div>
        <h2 className="education-main-headline">
          What if every child grew up knowing the <i>story</i> behind what they wear?
        </h2>
        <p className="education-manifesto-sub">
          The Threador connects children with Indian textiles, indigenous materials, artisanal crafts,
          making processes, circular fashion industries, and contemporary design thinking.
        </p>
      </div>

      {/* 2. The Five Foundations (Culture, Material, Making, Industry, Creation) */}
      <div className="foundations-container">
        <div className="foundations-header">
          <span className="sub-tag">THE FIVE FOUNDATIONS</span>
          <h3>An unbroken bridge from soil to contemporary runway</h3>
        </div>

        <div className="foundations-grid">
          {THREADOR_BRAND.foundations.map((item) => (
            <div key={item.num} className="foundation-card">
              <span className="foundation-num">{item.num}</span>
              <h4 className="foundation-title">{item.title}</h4>
              <p className="foundation-tagline">{item.tag}</p>
              <p className="foundation-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. The 3 Grade Categories (Discover, Explore, Create) */}
      <div className="curriculum-container">
        <div className="curriculum-header">
          <div className="curriculum-title-wrap">
            <span className="sub-tag">STRUCTURED GRADE PROGRESSION</span>
            <h3>From Sensory Touch to Creative Autonomy</h3>
          </div>

          <div className="grade-tab-buttons">
            {THREADOR_BRAND.curriculum.map((curr, idx) => (
              <button
                key={curr.stage}
                type="button"
                className={`grade-tab-btn ${selectedGradeTab === idx ? 'active' : ''}`}
                onClick={() => setSelectedGradeTab(idx)}
              >
                <span className="tab-stage">{curr.stage}</span>
                <span className="tab-grade">{curr.grades}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Stage Detailed Card */}
        {(() => {
          const activeStage = THREADOR_BRAND.curriculum[selectedGradeTab];
          return (
            <div className="curriculum-detail-card">
              <div className="stage-card-meta">
                <span className="stage-code-pill">{activeStage.code}</span>
                <span className="stage-grade-label">{activeStage.grades}</span>
              </div>
              <h4 className="stage-headline">{activeStage.headline}</h4>
              <p className="stage-focus"><strong>Focus Area:</strong> {activeStage.focus}</p>

              <div className="stage-modules-grid">
                <div className="modules-col">
                  <h5>Hands-on Curriculum Modules:</h5>
                  <ul>
                    {activeStage.modules.map((mod, i) => (
                      <li key={i}>
                        <CheckCircle2 size={14} className="list-check-icon" />
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="stage-outcome-box">
                  <div className="outcome-tag">
                    <Sparkles size={14} />
                    <span>MILESTONE OUTCOME</span>
                  </div>
                  <p>{activeStage.outcome}</p>
                  <a
                    href="#enrolment-form"
                    className="outcome-enrol-link"
                    onClick={() => {
                      const el = document.getElementById('enrolment-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Enrol for {activeStage.grades} →
                  </a>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* 4. Tangible Learning Outcomes */}
      <div className="learning-outcomes-container">
        <div className="outcomes-header">
          <span className="sub-tag">MEASURABLE IMPACT</span>
          <h3>What Children Take Home</h3>
        </div>
        <div className="outcomes-grid">
          {THREADOR_BRAND.outcomes.map((out, i) => (
            <div key={i} className="outcome-item">
              <div className="outcome-icon-wrap">
                {i === 0 && <Compass size={18} />}
                {i === 1 && <Layers size={18} />}
                {i === 2 && <ShieldCheck size={18} />}
                {i === 3 && <BookOpen size={18} />}
                {i === 4 && <Sparkles size={18} />}
                {i === 5 && <HeartHandshake size={18} />}
              </div>
              <h4>{out.title}</h4>
              <p>{out.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Course Enrolment Form */}
      <div className="enrolment-form-section" id="enrolment-form">
        <div className="form-wrapper-box">
          <div className="form-header-area">
            <span className="form-badge">ADMISSIONS OPEN FOR UPCOMING BATCHES</span>
            <h3>Course Enrolment & Parent Enquiry</h3>
            <p>
              Register your interest for weekend or after-school batches.
              Our program director will contact you with batch schedules and studio orientation details.
            </p>
          </div>

          {formSubmitted ? (
            <div className="form-success-box" role="status">
              <CheckCircle2 size={36} className="success-icon" />
              <h4>Enrolment Request Registered</h4>
              <p>
                Thank you, <strong>{formData.parentName}</strong>. We have registered{' '}
                <strong>{formData.childName}</strong> for the {formData.grade.toUpperCase()} cohort.
                Our team will reach out to you at {formData.phone} shortly.
              </p>
              <div className="success-actions">
                <button
                  type="button"
                  className="reset-form-btn"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      parentName: '',
                      childName: '',
                      grade: 'grades-4-6',
                      phone: '',
                      email: '',
                      batch: 'weekend',
                      referralSource: ''
                    });
                  }}
                >
                  Register Another Student
                </button>
                <a
                  href={generateWhatsAppLink('course', formData.grade)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-quick-btn"
                >
                  Chat with Program Director on WhatsApp →
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="threador-form">
              {errorMsg && <div className="form-error-alert">{errorMsg}</div>}

              <div className="form-row two-cols">
                <div className="form-field">
                  <label htmlFor="parentName">Parent / Guardian Full Name *</label>
                  <input
                    type="text"
                    id="parentName"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="childName">Child's Name *</label>
                  <input
                    type="text"
                    id="childName"
                    required
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    placeholder="e.g. Aarav Sharma"
                  />
                </div>
              </div>

              <div className="form-row three-cols">
                <div className="form-field">
                  <label htmlFor="grade">Child's Grade Category *</label>
                  <select
                    id="grade"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value as CourseEnrolmentLead['grade'] })}
                  >
                    <option value="grades-1-3">Grades 1–3 (Discover)</option>
                    <option value="grades-4-6">Grades 4–6 (Explore)</option>
                    <option value="grades-7-8">Grades 7–8 (Create)</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="batch">Preferred Batch Schedule *</label>
                  <select
                    id="batch"
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value as CourseEnrolmentLead['batch'] })}
                  >
                    <option value="weekend">Weekend Studio Sessions</option>
                    <option value="after-school">After-School Weekday Cohort</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="phone">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="form-row two-cols">
                <div className="form-field">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="priya.sharma@example.com"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="referralSource">How did you hear about The Threador?</label>
                  <input
                    type="text"
                    id="referralSource"
                    value={formData.referralSource}
                    onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                    placeholder="School circular, recommendation, Instagram, etc."
                  />
                </div>
              </div>

              <div className="form-footer-bar">
                <p className="privacy-guarantee-note">
                  <ShieldCheck size={13} className="shield-icon" />
                  Your child’s privacy is sacred. Information is processed strictly for enrolment and studio communication.
                </p>

                <button type="submit" className="form-submit-btn">
                  <span>SUBMIT ENROLMENT INQUIRY</span>
                  <Send size={14} />
                </button>
              </div>

              <div className="founder-notice-pill">
                <strong>Transparent Note:</strong> Course durations, fee schedules, and academic credentials
                are published following official founder approval for each academic term.
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

