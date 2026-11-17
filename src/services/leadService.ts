import type { AnnualDayLead, CourseEnrolmentLead, GeneralInquiryLead } from '../types';

const ANNUAL_LEADS_KEY = 'threador_leads_annual_day';
const COURSE_LEADS_KEY = 'threador_leads_courses';
const GENERAL_LEADS_KEY = 'threador_leads_general';

// Verified Business Contact details (configured with placeholders where founder verification is pending)
export const BUSINESS_CONFIG = {
  phone: '+919876543210',
  displayPhone: '+91 98765 43210',
  email: 'connect@thethreador.com',
  location: 'Atelier & Studio, Mumbai / New Delhi, India (Verified address on enrolment)',
  whatsappNumber: '919876543210'
};

export function saveAnnualDayLead(lead: Omit<AnnualDayLead, 'id' | 'timestamp' | 'status'>): AnnualDayLead {
  const newLead: AnnualDayLead = {
    ...lead,
    id: `AD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    status: 'new'
  };

  try {
    const existing: AnnualDayLead[] = JSON.parse(localStorage.getItem(ANNUAL_LEADS_KEY) || '[]');
    existing.unshift(newLead);
    localStorage.setItem(ANNUAL_LEADS_KEY, JSON.stringify(existing));
  } catch (err) {
    console.warn('LocalStorage unavailable for lead storage', err);
  }

  return newLead;
}

export function saveCourseEnrolmentLead(lead: Omit<CourseEnrolmentLead, 'id' | 'timestamp' | 'status'>): CourseEnrolmentLead {
  const newLead: CourseEnrolmentLead = {
    ...lead,
    id: `CE-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    status: 'new'
  };

  try {
    const existing: CourseEnrolmentLead[] = JSON.parse(localStorage.getItem(COURSE_LEADS_KEY) || '[]');
    existing.unshift(newLead);
    localStorage.setItem(COURSE_LEADS_KEY, JSON.stringify(existing));
  } catch (err) {
    console.warn('LocalStorage unavailable for course lead storage', err);
  }

  return newLead;
}

export function saveGeneralInquiry(lead: Omit<GeneralInquiryLead, 'id' | 'timestamp' | 'status'>): GeneralInquiryLead {
  const newLead: GeneralInquiryLead = {
    ...lead,
    id: `GI-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    status: 'new'
  };

  try {
    const existing: GeneralInquiryLead[] = JSON.parse(localStorage.getItem(GENERAL_LEADS_KEY) || '[]');
    existing.unshift(newLead);
    localStorage.setItem(GENERAL_LEADS_KEY, JSON.stringify(existing));
  } catch (err) {
    console.warn('LocalStorage unavailable for general inquiry storage', err);
  }

  return newLead;
}

export function getStoredLeadsCount(): { annualDay: number; courses: number; general: number; total: number } {
  try {
    const annual: AnnualDayLead[] = JSON.parse(localStorage.getItem(ANNUAL_LEADS_KEY) || '[]');
    const courses: CourseEnrolmentLead[] = JSON.parse(localStorage.getItem(COURSE_LEADS_KEY) || '[]');
    const general: GeneralInquiryLead[] = JSON.parse(localStorage.getItem(GENERAL_LEADS_KEY) || '[]');
    return {
      annualDay: annual.length,
      courses: courses.length,
      general: general.length,
      total: annual.length + courses.length + general.length
    };
  } catch {
    return { annualDay: 0, courses: 0, general: 0, total: 0 };
  }
}

export function getAllStoredLeads() {
  try {
    const annual: AnnualDayLead[] = JSON.parse(localStorage.getItem(ANNUAL_LEADS_KEY) || '[]');
    const courses: CourseEnrolmentLead[] = JSON.parse(localStorage.getItem(COURSE_LEADS_KEY) || '[]');
    const general: GeneralInquiryLead[] = JSON.parse(localStorage.getItem(GENERAL_LEADS_KEY) || '[]');
    return { annual, courses, general };
  } catch {
    return { annual: [], courses: [], general: [] };
  }
}

export function clearAllStoredLeads(): void {
  try {
    localStorage.removeItem(ANNUAL_LEADS_KEY);
    localStorage.removeItem(COURSE_LEADS_KEY);
    localStorage.removeItem(GENERAL_LEADS_KEY);
  } catch (err) {
    console.warn('Could not clear local storage', err);
  }
}

export function generateWhatsAppLink(type: 'school' | 'course' | 'general', context?: string): string {
  let message = '';
  if (type === 'school') {
    message = `Hello The Threador Team, I am reaching out on behalf of our school regarding costume atelier design for our upcoming Annual Day / event. Could you share more information?`;
  } else if (type === 'course') {
    message = `Hello The Threador Team, I am a parent interested in enrolling my child in the Fashion Education Certification Course (${context || 'Grades 1–8'}). Please share batch schedules and details.`;
  } else {
    message = `Hello The Threador Team, I would like to learn more about The Threador's fashion education and costume atelier.`;
  }

  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

