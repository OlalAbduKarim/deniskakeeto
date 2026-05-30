export type ActiveTab = 
  | 'home' 
  | 'about' 
  | 'practice-areas' 
  | 'family-law'
  | 'criminal-defense'
  | 'personal-injury'
  | 'estate-planning'
  | 'business-law'
  | 'case-results'
  | 'testimonials'
  | 'faq'
  | 'blog'
  | 'contact';

export interface PracticeArea {
  id: ActiveTab;
  title: string;
  icon: string;
  shortDesc: string;
  longDesc: string;
  commonProblems: string[];
  steps: string[];
  pricingHonesty: string;
  faqs: { question: string; answer: string; }[];
}

export interface CaseResult {
  title: string;
  clientInitials: string;
  amount: string;
  practiceArea: string;
  detail: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishDate: string;
  author: string;
  readTime: string;
  category: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  description: string;
  submittedAt: string;
  practiceAreaInterest?: string;
  isAfterHours: boolean;
  status: 'New' | 'Called' | 'Archived';
}

export interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  selectedDate: string;
  selectedTime: string;
  practiceArea: string;
  bookedAt: string;
}
