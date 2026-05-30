import { useState, FormEvent } from 'react';
import { 
  Scale, Shield, Activity, FileText, Briefcase, Phone, MessageSquare, 
  Clock, Award, CheckCircle2, ChevronRight, Star, ThumbsUp, MapPin, 
  Mail, Search, FileUp, Video, Calendar, BookOpen, AlertCircle, Copy, Check 
} from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';
import BookingCalendar from './components/BookingCalendar';
import AdminPanel from './components/AdminPanel';

import { PRACTICE_AREAS, CASE_RESULTS, TESTIMONIALS, BLOG_POSTS } from './data';
import { ActiveTab, Lead, Booking, BlogPost } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ActiveTab>('home');
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [evaluationModalOpen, setEvaluationModalOpen] = useState(false);
  
  // Evaluation Modal Form State
  const [evalName, setEvalName] = useState('');
  const [evalPhone, setEvalPhone] = useState('');
  const [evalCategory, setEvalCategory] = useState('Personal Injury');
  const [evalDesc, setEvalDesc] = useState('');
  const [evalSubmitted, setEvalSubmitted] = useState(false);
  
  // Video Testimonial Upload Simulation State
  const [testiName, setTestiName] = useState('');
  const [testiEmail, setTestiEmail] = useState('');
  const [uploadProgress, setUploadProgress] = useState(-1); // -1: inactive, 0-100: values
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // Video Bio Playback Simulation State
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoTimeLeft, setVideoTimeLeft] = useState(60);

  // Active Reading Blog Post State
  const [activeReadPost, setActiveReadPost] = useState<BlogPost | null>(null);

  // FAQ Search Filter
  const [faqSearch, setFaqSearch] = useState('');

  const triggerDataRefresh = () => {
    setLastUpdated(Date.now());
  };

  const handleLeadCapture = (lead: Lead) => {
    // Lead captured inside components will trigger update in Admin Panel
    triggerDataRefresh();
  };

  const handleBookingCreated = (booking: Booking) => {
    triggerDataRefresh();
  };

  const handleEvaluationSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!evalName.trim() || !evalPhone.trim() || !evalDesc.trim()) return;

    const hours = new Date().getHours();
    const isAfterHours = hours >= 18 || hours < 8;

    const evalLead: Lead = {
      id: `eval-lead-${Date.now()}`,
      name: evalName.trim(),
      phone: evalPhone.trim(),
      description: `[Modal Free Evaluation - Category: ${evalCategory}] ${evalDesc.trim()}`,
      submittedAt: new Date().toLocaleString(),
      isAfterHours,
      status: 'New'
    };

    // Store in LocalStorage
    try {
      const existingLeads: Lead[] = JSON.parse(localStorage.getItem('denis_leads') || '[]');
      existingLeads.unshift(evalLead);
      localStorage.setItem('denis_leads', JSON.stringify(existingLeads));
    } catch (err) {
      console.error(err);
    }

    handleLeadCapture(evalLead);
    setEvalSubmitted(true);

    setTimeout(() => {
      setEvaluationModalOpen(false);
      setEvalSubmitted(false);
      setEvalName('');
      setEvalPhone('');
      setEvalCategory('Personal Injury');
      setEvalDesc('');
    }, 4000);
  };

  const startVideoUploadSimulation = (e: FormEvent) => {
    e.preventDefault();
    if (!testiName.trim() || !testiEmail.trim()) return;

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setUploadSuccess(true);
          return 100;
        }
        return p + 20;
      });
    }, 400);
  };

  const copyVoucherCode = () => {
    navigator.clipboard.writeText('DENISKAKEETO50K');
    setCopiedCoupon(true);
    setTimeout(() => {
      setCopiedCoupon(false);
    }, 3000);
  };

  const toggleVideoBio = () => {
    if (!videoPlaying) {
      setVideoPlaying(true);
      setVideoTimeLeft(60);
      const timer = setInterval(() => {
        setVideoTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timer);
            setVideoPlaying(false);
            return 60;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      setVideoPlaying(false);
    }
  };

  const formatVideoTime = (sec: number) => {
    return `0:${sec < 10 ? '0' : ''}${sec}`;
  };

  // Helper mapping string to Lucide icons
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Scale': return <Scale className="h-6 w-6 text-gold shrink-0" />;
      case 'Shield': return <Shield className="h-6 w-6 text-gold shrink-0" />;
      case 'Activity': return <Activity className="h-6 w-6 text-gold shrink-0" />;
      case 'FileText': return <FileText className="h-6 w-6 text-gold shrink-0" />;
      case 'Briefcase': return <Briefcase className="h-6 w-6 text-gold shrink-0" />;
      default: return <Scale className="h-6 w-6 text-gold shrink-0" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/20 text-gray-800 antialiased font-sans pb-[64px] lg:pb-0">
      
      {/* Primary Header Component */}
      <Header 
        currentTab={currentTab} 
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setActiveReadPost(null);
        }} 
        onRequestEvaluation={() => setEvaluationModalOpen(true)}
      />

      {/* Main Body Routing Area */}
      <main className="flex-1">

        {/* ==============================================
             1. HOME VIEW
           ============================================== */}
        {currentTab === 'home' && (
          <div className="space-y-20 animate-fadeIn">
            
            {/* ABOVE THE FOLD (3-7 Sec Test) */}
            <section id="above-the-fold" className="bg-navy border-b border-gray-100/10 text-white py-16 lg:py-24 px-6 sm:px-12 relative overflow-hidden">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                <div className="lg:col-span-7 space-y-8">
                  {/* Highlight editorial bar */}
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-12 bg-gold"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gold">Kampala's Highest Rated Legal Advocates</span>
                  </div>
                  
                  <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                    Fighting for Justice in <span className="text-gold">Kampala.</span><br />
                    No Fee Unless We Win.
                  </h1>
                  
                  <p className="text-gray-300 text-sm sm:text-md leading-relaxed max-w-xl font-normal">
                    Trusted family status disputes, accident injury claims, and aggressive criminal defence advocates. We fight with integrity to restore your hope and secure financial settlements. Free 15-minute case evaluation.
                  </p>

                  {/* Trust Badge Grid - Editorial style with vertical rules */}
                  <div className="grid grid-cols-3 gap-0 pt-6 border-t border-navy-light/40 max-w-lg divide-x divide-navy-light/50">
                    <div className="pr-4">
                      <span className="block text-white font-serif text-xl sm:text-2xl font-bold">10+ Years</span>
                      <span className="block text-[9px] uppercase text-gold font-bold tracking-widest mt-1">Trial Experience</span>
                    </div>
                    <div className="px-4">
                      <span className="block text-white font-serif text-xl sm:text-2xl font-bold">AV</span>
                      <span className="block text-[9px] uppercase text-gold font-bold tracking-widest mt-1">Preeminent</span>
                    </div>
                    <div className="pl-4">
                      <span className="block text-white font-serif text-xl sm:text-2xl font-bold">Rising Star</span>
                      <span className="block text-[9px] uppercase text-gold font-bold tracking-widest mt-1">Best of 2026</span>
                    </div>
                  </div>

                  {/* Immediate Multi-CTAs - Sharp Corners */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 flex-wrap">
                    <a 
                      href="tel:+256704378426" 
                      className="py-4 px-8 bg-gold hover:bg-gold-dark text-navy font-bold uppercase tracking-widest text-xs rounded-none transition-all flex items-center justify-center gap-2 shrink-0"
                    >
                      <Phone className="h-4 w-4 shrink-0" />
                      CALL NOW +256 704 378
                    </a>
                    <button 
                      onClick={() => setEvaluationModalOpen(true)}
                      className="py-4 px-8 border-2 border-white text-white hover:bg-white hover:text-navy font-bold uppercase tracking-widest text-xs rounded-none transition-all"
                    >
                      Free Case Evaluation
                    </button>
                  </div>
                </div>

                {/* Quick Above Fold Conversion Box - Crisp Editorial Border */}
                <div className="lg:col-span-5 bg-white text-navy p-6 sm:p-8 rounded-none border border-gray-200 shadow-2xl space-y-5">
                  <h3 className="font-serif text-xl font-bold tracking-tight text-navy">
                    Need Urgent Legal Defense?
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-normal">
                    Don’t let police custody deadlines expire or insurance adjusters pressure you. Submit your detail immediately. A qualified Kampala advocate will respond in 60 minutes.
                  </p>

                  <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-none text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 border border-emerald-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                    <span>Advocates Active on Duty This Hour</span>
                  </div>

                  <form onSubmit={handleEvaluationSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="fold-name" className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Your Full Name</label>
                      <input 
                        id="fold-name" 
                        type="text" 
                        placeholder="e.g. Kenneth Ssewankambo"
                        value={evalName}
                        onChange={(e) => setEvalName(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold shadow-sm font-medium"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="fold-phone" className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">WhatsApp / Contact Phone</label>
                      <input 
                        id="fold-phone" 
                        type="tel" 
                        placeholder="e.g. +256 704 ..."
                        value={evalPhone}
                        onChange={(e) => setEvalPhone(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold shadow-sm font-medium"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="fold-desc" className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Briefly Describe Your Issue</label>
                      <textarea 
                        id="fold-desc" 
                        rows={2} 
                        placeholder="Describe custody disputes, accident injuries or charges..."
                        value={evalDesc}
                        onChange={(e) => setEvalDesc(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold shadow-sm resize-none font-medium"
                        required
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-3.5 bg-navy hover:bg-navy-light text-white font-bold text-xs uppercase tracking-widest rounded-none transition-colors"
                    >
                      Get Urgent Evaluation
                    </button>
                  </form>
                </div>
              </div>
            </section>

            {/* THREE CORE PRACTICE ICONS (Family, Injury, Criminal) */}
            <section id="key-practices" className="max-w-7xl mx-auto px-6 sm:px-12">
              <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
                <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] block">Practice Specialties</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight">
                  High-Impact Counsel When You Need It Most
                </h2>
                <div className="h-[2px] w-12 bg-gold mx-auto my-3"></div>
                <p className="text-gray-650 text-sm max-w-md mx-auto leading-relaxed">
                  We maintain dedicated trial representation divisions led by senior advocates to handle family, traffic injury, and police bond disputes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 1. Family Law Card */}
                <div 
                  onClick={() => { setCurrentTab('family-law'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="bg-white p-6 sm:p-8 rounded-none border border-gray-200 hover:border-gold transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="bg-navy p-3 rounded-none inline-block text-gold transition-transform">
                      <Scale className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-navy group-hover:text-gold transition-colors">
                      Family Law & Custody
                    </h3>
                    <p className="text-gray-650 text-xs sm:text-sm leading-relaxed">
                      Child custody schedules, school support enforcement, division of land and properties, and fast uncontested divorces starting flat at UGX 1.5M.
                    </p>
                  </div>
                  <span className="text-gold font-bold text-xs flex items-center gap-1 mt-6 group-hover:translate-x-1.5 transition-transform uppercase tracking-widest text-[10px]">
                    Learn Family Procedure →
                  </span>
                </div>

                {/* 2. Personal Injury Card */}
                <div 
                  onClick={() => { setCurrentTab('personal-injury'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="bg-white p-6 sm:p-8 rounded-none border border-gray-200 hover:border-gold transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="bg-navy p-3 rounded-none inline-block text-gold transition-transform">
                      <Activity className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-navy group-hover:text-gold transition-colors">
                      Personal Injury Claims
                    </h3>
                    <p className="text-gray-650 text-xs sm:text-sm leading-relaxed">
                      No Fee unless we win. We recover maximum medical bills and trauma compensation for commercial truck collision and boda boda accident victims.
                    </p>
                  </div>
                  <span className="text-gold font-bold text-xs flex items-center gap-1 mt-6 group-hover:translate-x-1.5 transition-transform uppercase tracking-widest text-[10px]">
                    Learn Injury Claims →
                  </span>
                </div>

                {/* 3. Criminal Defense Card */}
                <div 
                  onClick={() => { setCurrentTab('criminal-defense'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="bg-white p-6 sm:p-8 rounded-none border border-gray-200 hover:border-gold transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="bg-navy p-3 rounded-none inline-block text-gold transition-transform">
                      <Shield className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-navy group-hover:text-gold transition-colors">
                      Criminal Defense Representation
                    </h3>
                    <p className="text-gray-650 text-xs sm:text-sm leading-relaxed">
                      Immediate response. Secure Kampala police bond, file court bail motions, and defend theft or commercial fraud accusations in Magistrate trials.
                    </p>
                  </div>
                  <span className="text-gold font-bold text-xs flex items-center gap-1 mt-6 group-hover:translate-x-1.5 transition-transform uppercase tracking-widest text-[10px]">
                    Learn Defense Options →
                  </span>
                </div>
              </div>
            </section>

            {/* TRUST & AUTHORITY HIGHLIGHT */}
            <section id="trust-excerpt" className="bg-gray-50 py-16 px-6 sm:px-12 border-y border-gray-100">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-4">
                  {/* Decorative modern photo placeholder with SVG */}
                  <div className="bg-navy border-l-4 border-gold shadow-2xl rounded-none overflow-hidden aspect-4/3 flex flex-col justify-between p-6 sm:p-8 relative min-h-[300px]">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Scale className="h-48 w-48 text-white" />
                    </div>
                    <div className="bg-gold text-navy text-[10px] uppercase font-bold tracking-widest py-1 px-3 rounded-none self-start border border-navy shadow z-10">
                      Primary Advocate Photo
                    </div>
                    <div className="z-10 space-y-2">
                      <h4 className="font-serif text-2xl font-bold text-white">Denis Kakeeto</h4>
                      <p className="text-gold text-xs uppercase font-bold tracking-widest">Founder & Principal Solicitor, LLB, LDC</p>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-white text-xs ml-1">(4.9 out of 160+ Local Reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] block">Trust & Authority Profile</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight">
                    Compassionate Representation Backed by 10+ Years Sincere Advocacy
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal">
                    Denis Kakeeto is a respected litigation attorney who believes the legal profession exists to serve real folks in pain, not wealthy corporate conglomerates. Having representation rights across all magistrates and the High Court of Uganda, Denis and team cut through legalese to focus purely on practical solutions.
                  </p>
                  
                  <div className="bg-white border-l-4 border-gold p-4 border border-gray-200 rounded-none space-y-2 text-xs sm:text-sm text-gray-700 shadow-sm">
                    <p className="italic font-serif">
                      "I founded this firm because too many Kampala citizens get pushed around by insurance conglomerates or delayed in state custodial holds because they can't access prompt, premium defense representation."
                    </p>
                    <span className="block font-bold text-navy uppercase tracking-widest text-[10px]">— Denis Kakeeto, Principal</span>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button 
                      onClick={() => { setCurrentTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="py-3 px-6 bg-navy hover:bg-navy-light text-white text-xs font-bold uppercase tracking-widest rounded-none transition-colors"
                    >
                      Read Denis' Bio
                    </button>
                    <button 
                      onClick={() => { setCurrentTab('case-results'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="py-3 px-6 border-2 border-navy text-navy hover:bg-navy hover:text-white text-xs font-bold uppercase tracking-widest rounded-none transition-all"
                    >
                      View Case Wins
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* INTERACTIVE CALENDLY SCHEDULING UNIT */}
            <section id="homepage-scheduler" className="max-w-7xl mx-auto px-6 sm:px-12">
              <div className="text-center space-y-4 max-w-2xl mx-auto mb-10">
                <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] block">Lock In Your Strategy Call</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                  No Consultation Fees. Secure Your Slot.
                </h2>
                <div className="h-[2px] w-12 bg-gold mx-auto my-3"></div>
                <p className="text-gray-650 text-sm font-normal">
                  Review calendar availability, choose a custom morning or afternoon slot, and speak to our legal experts without setting foot outdoors.
                </p>
              </div>

              <BookingCalendar onBookingCreated={handleBookingCreated} />
            </section>

            {/* RECENT CASE SHIELD */}
            <section id="homepage-results" className="bg-navy py-16 px-6 sm:px-12 text-white border-y border-gray-100/10">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-navy-light/40 pb-8">
                  <div className="space-y-3">
                    <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] block">Airtight Proof of Success</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                      Recent UGX Settlement Victories
                    </h2>
                    <p className="text-gray-300 text-xs sm:text-sm max-w-xl font-normal">
                      We secure results for real people. Explore verified wins representing motorcycle collision survivors and families seeking custody support.
                    </p>
                  </div>
                  <button 
                    onClick={() => { setCurrentTab('case-results'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="py-3.5 px-6 bg-gold hover:bg-gold-dark text-navy font-bold text-xs uppercase tracking-widest rounded-none shrink-0 transition-all font-sans"
                  >
                    Explore Complete Dossier
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CASE_RESULTS.slice(0, 4).map((res, index) => (
                    <div key={index} className="bg-navy-light/10 p-6 rounded-none border border-navy-light/50 flex flex-col justify-between space-y-4 hover:border-gold transition-colors">
                      <div className="space-y-3">
                        <span className="text-gold text-[9px] uppercase tracking-widest font-bold block">
                          {res.practiceArea} • Initials {res.clientInitials}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-white line-clamp-2 leading-snug">
                          {res.title}
                        </h4>
                        <p className="text-gray-450 text-xs font-normal leading-relaxed line-clamp-3">
                          {res.detail}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-navy-light/40 text-left">
                        <span className="block text-[8px] uppercase tracking-widest text-gray-400 font-bold">Compensation Recovery</span>
                        <span className="block text-gold text-base font-bold font-mono tracking-tight mt-0.5">{res.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==============================================
             2. ABOUT VIEW
           ============================================== */}
        {currentTab === 'about' && (
          <div className="py-16 px-6 sm:px-12 max-w-7xl mx-auto space-y-16 animate-fadeIn font-sans">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-12 xl:col-span-5 lg:col-span-5 space-y-6 font-sans">
                {/* Profile Placeholder Card */}
                <div className="bg-navy rounded-none p-6 sm:p-8 border-l-4 border-gold shadow-2xl space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Award className="h-44 w-44 text-white" />
                  </div>
                  
                  <div className="bg-gold text-navy text-[9px] uppercase font-bold tracking-widest py-1 px-3 rounded-none inline-block">
                    Denis Kakeeto Advocates Team Profile
                  </div>

                  <div className="space-y-1 z-10 relative">
                    <h3 className="font-serif text-2xl font-bold text-white">Denis Kakeeto</h3>
                    <p className="text-gold text-xs uppercase tracking-widest leading-loose font-bold">
                      Principal Advocate & Mediator<br />
                      Member of Uganda Law Society (ULS)
                    </p>
                  </div>

                  {/* Fact check list */}
                  <div className="space-y-3 z-10 relative text-xs text-gray-200 pt-4 border-t border-navy-light/60">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-gold shrink-0" />
                      <span>Bachelor of Laws (LLB) — Makerere University</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-gold shrink-0" />
                      <span>Postgraduate Diploma — Law Development Centre (LDC)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-gold shrink-0" />
                      <span>10+ Years trial litigating Kampala courtrooms</span>
                    </div>
                  </div>

                </div>

                <div className="bg-white p-6 rounded-none border border-gray-200 shadow-sm space-y-2.5">
                  <h4 className="font-serif text-sm font-bold text-navy uppercase tracking-wider">
                    Outside the Legal Courtroom
                  </h4>
                  <p className="text-xs text-gray-650 leading-relaxed font-normal">
                    When not in court defending human rights or child support parameters, Denis Coaches youth rugby teams in Kampala. "Coaching rugby translating field discipline. In court, just like rugby, you need precise strategy, teamwork, and strong defensive coordination to secure deep victories."
                  </p>
                </div>
              </div>

              <div className="lg:col-span-12 xl:col-span-7 lg:col-span-7 space-y-6 text-sm">
                <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] block">About Our Founder</span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight">
                  Tough on Court Opponents. Compassionate to People.
                </h1>
                
                <p className="text-gray-655 leading-relaxed text-sm font-normal">
                  Denis Kakeeto Advocates was established over a decade ago in Central Kampala with a core, uncompromising mission: offering premium, robust courtroom defense to regular families and accident victims who feel pushed around by bureaucratic machinery or powerful corporations.
                </p>

                <p className="text-gray-655 leading-relaxed text-sm font-normal">
                  Unlike corporate attorneys who hide behind layers of legal secretaries and expensive hourly bills, Denis believes in strict accessibility. When you work with our team, you receive direct phone access, plain-English evaluations, and clear flat pricing arrays structured upfront.
                </p>

                <div className="p-4 bg-gray-50 rounded-none border-l-4 border-gold border border-gray-150 space-y-2">
                  <h4 className="font-bold text-navy text-xs sm:text-sm uppercase tracking-wider">Attorney Sincerity Promise:</h4>
                  <p className="text-gray-655 text-xs leading-relaxed font-normal">
                    "We promise you No-Legalese explanations. We write our advice at standard grade 8 comprehension levels so we communicate with sincere accuracy. When we manage your custody structures or seek your boda boda pain compensations, we guide you step-by-step."
                  </p>
                </div>

                {/* 60-Second Video Bio Placeholder */}
                <div className="space-y-3 pt-4">
                  <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-navy">
                    📽️ Play 60-Sec "Why I Practice Law" Video Bio
                  </h4>
                  <p className="text-[11px] text-gray-500 font-normal font-sans">
                    Watch our short introduction video showing Denis’ passion for Kampala justice and advocacy parameters.
                  </p>
                  
                  {videoPlaying ? (
                    <div className="bg-navy p-6 rounded-none border border-gold/40 text-center space-y-3 animate-fadeIn mb-2">
                      <div className="flex justify-between items-center text-[10px] text-gray-300 font-mono">
                        <span className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                          Denis' Bio Narrative Active
                        </span>
                        <span>Time remaining: {formatVideoTime(videoTimeLeft)}</span>
                      </div>
                      
                      {/* Interactive audio/visual display */}
                      <div className="py-2 space-y-3 max-w-md mx-auto">
                        <div className="h-1 bg-gray-750 rounded-none overflow-hidden">
                          <div 
                            className="bg-gold h-full transition-all duration-1000" 
                            style={{ width: `${((60 - videoTimeLeft) / 60) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs italic text-gold font-serif leading-relaxed px-4 text-center">
                          "...I see too many good people arrive in police cells without basic procedural bail rights. Under the constitution, every citizen is innocent. We exist to make that shield real in courtrooms..."
                        </p>
                      </div>

                      <button
                        onClick={toggleVideoBio}
                        className="py-1 px-4 bg-slate-800 hover:bg-slate-705 text-[10px] text-white rounded-none cursor-pointer uppercase tracking-widest"
                      >
                        Stop Playback
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={toggleVideoBio}
                      className="bg-navy hover:bg-navy-light p-8 rounded-none border border-navy/20 flex flex-col items-center justify-center text-center text-white cursor-pointer relative group transition-all min-h-[160px]"
                    >
                      <div className="bg-gold text-navy p-3 rounded-none group-hover:scale-105 transition-transform shadow">
                        <Video className="h-6 w-6" />
                      </div>
                      <span className="font-bold text-xs text-white tracking-widest uppercase mt-4 block font-sans">Play 60-Sec bio narrative</span>
                      <span className="text-[10px] text-gray-400 block mt-1">Saves bandwidth. Dynamic transcript simulation included.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-none border border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-150">
              <div className="py-2">
                <span className="block text-3xl font-bold font-serif text-navy">10+</span>
                <span className="block text-[10px] font-bold uppercase text-gray-400 tracking-wider mt-1">Years Client Care</span>
              </div>
              <div className="py-2">
                <span className="block text-3xl font-bold font-serif text-navy">UGX 1.2B+</span>
                <span className="block text-[10px] font-bold uppercase text-gray-400 tracking-wider mt-1">Damages Collected</span>
              </div>
              <div className="py-2">
                <span className="block text-3xl font-bold font-serif text-navy">430+</span>
                <span className="block text-[10px] font-bold uppercase text-gray-400 tracking-wider mt-1">Families Mediated</span>
              </div>
              <div className="py-2 font-sans border-none">
                <span className="block text-3xl font-bold font-serif text-navy">100%</span>
                <span className="block text-[10px] font-bold uppercase text-gray-400 tracking-wider mt-1">Pricing Integrity</span>
              </div>
            </div>

            {/* AVAILABLE ADVOCATES & PARTNERS */}
            <div className="space-y-8 pt-8">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] block">Our Legal Brains</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy">Available Advocates & Counsel</h3>
                <p className="text-gray-655 text-xs sm:text-sm font-normal">
                  Meet our fully credentialed, litigation-ready team. Each of our advocates holds active memberships with the Uganda Law Society and is qualified to handle your cases.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Denis Kakeeto",
                    role: "Founder & Principal Advocate",
                    qualifications: [
                      "LLB (Hons) — Makerere University",
                      "Postgraduate Dip. in Legal Practice (LDC)",
                      "Member of Uganda Law Society (ULS)"
                    ],
                    specialty: "Criminal Defense, Trial Litigation & Civil Claims",
                    experience: "10+ Years trial litigating Kampala courtrooms",
                    contactEmail: "denis_kakeeto@yahoo.com"
                  },
                  {
                    name: "Nantumbwe Shamilah",
                    role: "Senior Associate Attorney",
                    qualifications: [
                      "LLB (Hons) — Makerere University",
                      "Postgraduate Dip. in Legal Practice (LDC)",
                      "Advocate of the High Court of Uganda"
                    ],
                    specialty: "Family Law, Child Custody & Mediation",
                    experience: "7+ Years representing families in Kampala",
                    contactEmail: "shamilah_nantumbwe@deniskakeeto.com"
                  },
                  {
                    name: "Mugisha Arthur",
                    role: "Partner & Pre-Trial Director",
                    qualifications: [
                      "LLB (Hons) — Makerere University",
                      "Postgraduate Dip. in Legal Practice (LDC)",
                      "Certificate in Trial Advocacy & Human Rights"
                    ],
                    specialty: "Constitutional Petitions, Police Bond & Urgent Bail",
                    experience: "9+ Years of procedural trial litigation",
                    contactEmail: "arthur_mugisha@deniskakeeto.com"
                  },
                  {
                    name: "Acero Diana",
                    role: "Senior Counsel",
                    qualifications: [
                      "LLB (Hons) — Uganda Christian University (UCU)",
                      "Postgraduate Dip. in Legal Practice (LDC)",
                      "Advocate of the High Court of Uganda"
                    ],
                    specialty: "Personal Injury, Motor Compensation & Land Deals",
                    experience: "6+ Years negotiating insurance settlements",
                    contactEmail: "diana_acero@deniskakeeto.com"
                  },
                  {
                    name: "Kasozi Raymond",
                    role: "Estate Administration Lead",
                    qualifications: [
                      "LLB (Hons) — Makerere University",
                      "Postgraduate Dip. in Legal Practice (LDC)"
                    ],
                    specialty: "Wills, Succession Planning & Probate Registries",
                    experience: "4+ Years in succession planning",
                    contactEmail: "raymond_kasozi@deniskakeeto.com"
                  }
                ].map((attorney, i) => (
                  <div key={i} className="bg-white border border-gray-200 shadow-sm rounded-none overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                    {/* Banner Header Style (Solid color block containing the name and role with NO images) */}
                    <div className="bg-navy p-5 text-white border-b border-gold flex flex-col justify-between min-h-[110px]">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-base font-bold text-white tracking-wide">{attorney.name}</h4>
                        <span className="bg-gold text-navy text-[8px] font-black uppercase px-2 py-0.5 tracking-wider shrink-0">
                          {attorney.name === "Denis Kakeeto" ? "FOUNDER" : "ADVOCATE"}
                        </span>
                      </div>
                      <p className="text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mt-1">{attorney.role}</p>
                    </div>

                    {/* Details Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div>
                          <span className="block text-[8px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">Specialization</span>
                          <p className="text-navy text-xs font-bold leading-relaxed">{attorney.specialty}</p>
                        </div>
                        <div>
                          <span className="block text-[8px] uppercase font-bold text-gray-400 tracking-wider mb-1">Credentials</span>
                          <ul className="space-y-1 text-[11px] text-gray-655">
                            {attorney.qualifications.map((q, idx) => (
                              <li key={idx} className="flex items-start gap-1 font-normal leading-relaxed">
                                <span className="text-gold mt-1 shrink-0">▪</span> {q}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-[10px] mt-4">
                        <span className="text-gray-500 font-medium font-sans">🕒 {attorney.experience}</span>
                        <a href={`mailto:${attorney.contactEmail}`} className="text-navy hover:text-gold font-bold underline transition-colors font-serif">
                          Message
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ==============================================
             3. PRACTICE AREAS MAIN OVERVIEW & DETAILED VIEWS
           ============================================== */}
        {[
          'practice-areas',
          'family-law',
          'criminal-defense',
          'personal-injury',
          'estate-planning',
          'business-law'
        ].includes(currentTab) && (
          <div className="py-16 px-6 sm:px-12 max-w-7xl mx-auto space-y-16 animate-fadeIn font-sans">
            
            {/* Top Navigation Row */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 justify-center md:justify-start">
              <button
                onClick={() => setCurrentTab('practice-areas')}
                className={`py-2 px-5 rounded-none text-[10px] font-bold uppercase tracking-widest transition-colors border ${
                  currentTab === 'practice-areas' ? 'bg-navy text-gold border-navy' : 'bg-white text-gray-600 hover:bg-gray-55 border-gray-200'
                }`}
              >
                All Practices Overview
              </button>
              {PRACTICE_AREAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentTab(p.id)}
                  className={`py-2 px-5 rounded-none text-[10px] font-bold uppercase tracking-widest transition-colors border ${
                    currentTab === p.id ? 'bg-gold text-navy border-gold' : 'bg-white text-gray-600 hover:bg-gray-55 border-gray-200'
                  }`}
                >
                  {p.title.split(' & ')[0]}
                </button>
              ))}
            </div>

            {/* A. If viewing All Practices Page */}
            {currentTab === 'practice-areas' && (
              <div className="space-y-12 animate-fadeIn">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] block">Complete Portfolio</span>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight">
                    Professional Advocacy Profiles Designed to Protect You
                  </h1>
                  <div className="h-[2px] w-12 bg-gold mx-auto my-3"></div>
                  <p className="text-gray-655 text-sm font-normal">
                    Review specific specialties, transparent FLAT pricing plans, common problems we address, and interactive custom FAQ booklets.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PRACTICE_AREAS.map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => setCurrentTab(p.id)}
                      className="bg-white p-7 rounded-none border border-gray-200 hover:border-gold transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                    >
                      <div className="space-y-4">
                        <div className="bg-navy p-3 rounded-none text-gold inline-flex items-center justify-center">
                          {getIconComponent(p.icon)}
                        </div>
                        <h3 className="font-serif text-xl font-bold text-navy group-hover:text-gold transition-colors">
                          {p.title}
                        </h3>
                        <p className="text-gray-650 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
                          {p.longDesc}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-gray-200 mt-6 flex justify-between items-center text-xs">
                        <span className="text-gold font-bold uppercase tracking-widest text-[10px]">
                          View Detail & Pricing
                        </span>
                        <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] font-mono">Flat rate options</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* B. Specific Practice Detail View */}
            {PRACTICE_AREAS.map((p) => {
              if (currentTab !== p.id) return null;

              return (
                <div key={p.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-fadeIn text-sm font-sans">
                  
                  {/* Left Column: Details & Narrative */}
                  <div className="lg:col-span-8 space-y-8">
                    <div className="space-y-4 font-sans">
                      <div className="bg-navy p-3 rounded-none inline-flex items-center text-gold">
                        {getIconComponent(p.icon)}
                      </div>
                      <span className="block text-gold text-xs font-bold uppercase tracking-widest">
                        Practice Profile Details
                      </span>
                      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight">
                        {p.title} Advocacy & Consultation
                      </h1>
                      <p className="text-gray-655 leading-relaxed text-sm sm:text-base font-normal">
                        {p.longDesc}
                      </p>
                    </div>

                    {/* Problem List */}
                    <div className="bg-white p-6 sm:p-8 rounded-none border border-gray-200 shadow-none space-y-4">
                      <h3 className="font-serif text-lg font-bold text-navy flex items-center gap-2.5">
                        <AlertCircle className="h-5 w-5 text-rose-500" />
                        Common Issues We Address In Kampala
                      </h3>
                      <div className="space-y-3.5 text-gray-700 text-xs sm:text-sm font-normal">
                        {p.commonProblems.map((problem, i) => (
                          <div key={i} className="flex gap-3 items-start">
                            <span className="h-2 w-2 bg-rose-500 rounded-none shrink-0 mt-1.5"></span>
                            <span>{problem}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3 Step Action Method */}
                    <div className="space-y-4">
                      <h3 className="font-serif text-lg font-bold text-navy uppercase tracking-wider text-xs">
                        Our Transparent 3-Step Process
                      </h3>
                      <p className="text-xs text-gray-400 font-normal">
                        We avoid unneeded delays. These 3 steps get your legal files actively formatted for victory:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {p.steps.map((stepDesc, idx) => (
                          <div key={idx} className="bg-white p-6 rounded-none border border-gray-200 shadow-none space-y-3 relative overflow-hidden">
                            <span className="absolute -top-4 -right-2 text-gold/10 font-bold text-6xl select-none leading-none z-0">
                              0{idx + 1}
                            </span>
                            <div className="h-8 w-8 bg-gold text-navy rounded-none font-bold text-xs flex items-center justify-center relative z-10">
                              Step {idx + 1}
                            </div>
                            <h4 className="font-bold font-serif text-sm text-navy relative z-10 leading-snug">
                              {idx === 0 ? 'Initial Connection' : idx === 1 ? 'Analyze Documents' : 'Formulate Battle Route'}
                            </h4>
                            <p className="text-xs text-gray-650 leading-relaxed font-normal relative z-10">
                              {stepDesc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing Integrity section */}
                    <div className="bg-gray-50 p-6 rounded-none border-l-4 border-gold space-y-3 border border-gray-200 border-l-gold">
                      <h3 className="font-serif text-sm font-bold text-navy uppercase tracking-widest">
                        🛡️ Sincere Pricing & Retainer Integrity
                      </h3>
                      <p className="text-gray-750 leading-relaxed font-semibold text-xs sm:text-sm">
                        {p.pricingHonesty}
                      </p>
                      <div className="text-[10px] text-gray-400 font-normal">
                        * All initial 15-minute consultations and document routing reviews remain 100% free of charge. No payment required until retainer documents authorize file initiation.
                      </div>
                    </div>

                    {/* Integrated FAQ booklet block */}
                    <div className="space-y-4 pt-4">
                      <h3 className="font-serif text-lg font-bold text-navy">
                        Practice Specific Frequently Asked Questions
                      </h3>
                      <div className="space-y-3">
                        {p.faqs.map((f, i) => (
                          <div key={i} className="bg-white p-6 rounded-none border border-gray-200 space-y-2">
                            <h4 className="font-serif text-xs sm:text-sm font-bold text-navy">
                              Q: {f.question}
                            </h4>
                            <p className="text-xs text-gray-650 leading-relaxed font-normal">
                              Q1: {f.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Mini Lead Capture Sidebar Sticky */}
                  <div className="lg:col-span-4 bg-navy text-white p-7 rounded-none border-t-4 border-gold space-y-5 lg:sticky lg:top-8">
                    <h3 className="font-serif text-lg font-bold text-white tracking-tight">
                      Free Case Evaluation
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed font-normal">
                      Don't delay. Have Denis Kakeeto's advocates review your legal documents. We will respond within 1 hour.
                    </p>
                    
                    <form onSubmit={handleEvaluationSubmit} className="space-y-4">
                      <div className="space-y-1">
                        <label htmlFor="p-name" className="text-[9px] text-gray-400 font-bold uppercase tracking-widest block">Your Full Name</label>
                        <input 
                          id="p-name" 
                          type="text" 
                          placeholder="e.g. Sarah Nakato"
                          value={evalName}
                          onChange={(e) => setEvalName(e.target.value)}
                          className="w-full text-xs px-3 py-2.5 bg-navy-light/20 border border-navy-light/60 rounded-none text-white placeholder-gray-400 focus:outline-none focus:border-gold font-normal"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="p-phone" className="text-[9px] text-gray-400 font-bold uppercase tracking-widest block">WhatsApp / Phone</label>
                        <input 
                          id="p-phone" 
                          type="tel" 
                          placeholder="e.g. +256 704 ..."
                          value={evalPhone}
                          onChange={(e) => setEvalPhone(e.target.value)}
                          className="w-full text-xs px-3 py-2.5 bg-navy-light/20 border border-navy-light/60 rounded-none text-white placeholder-gray-400 focus:outline-none focus:border-gold font-normal"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="p-desc" className="text-[9px] text-gray-400 font-bold uppercase tracking-widest block">Description of dispute</label>
                        <textarea 
                          id="p-desc" 
                          rows={3} 
                          placeholder="Describe your legal needs..."
                          value={evalDesc}
                          onChange={(e) => setEvalDesc(e.target.value)}
                          className="w-full text-xs px-3 py-2.5 bg-navy-light/20 border border-navy-light/60 rounded-none text-white placeholder-gray-400 focus:outline-none focus:border-gold resize-none font-normal"
                          required
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="w-full py-3.5 bg-gold hover:bg-gold-dark text-navy font-bold text-xs uppercase tracking-widest rounded-none shadow-sm transition-all duration-300"
                      >
                        Submit Case To Denis
                      </button>
                    </form>

                    <div className="pt-4 border-t border-navy-light/40 text-center">
                      <span className="block text-[10px] text-gray-400 uppercase tracking-wider">Prefer direct call setup?</span>
                      <a href="tel:+256704378426" className="font-bold text-gold text-xs hover:underline mt-1 block">
                        📞 +256 704 378 426
                      </a>
                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* ==============================================
             4. CASE RESULTS VIEW
           ============================================== */}
        {currentTab === 'case-results' && (
          <div className="py-16 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 animate-fadeIn font-sans">
            
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] block">Verified Wins</span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight font-heading">
                Case Results & Compensation Dossier
              </h1>
              <div className="h-[2px] w-12 bg-gold mx-auto my-3"></div>
              <p className="text-gray-650 text-sm font-normal">
                We maintain active litigation transparency. Review certified wins with anonymised client initials and settlement amounts registered in High Courts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              {CASE_RESULTS.map((res, i) => (
                <div key={i} className="bg-white p-6 sm:p-8 rounded-none border border-gray-200 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center flex-wrap gap-2 pb-3 border-b border-gray-150">
                      <span className="bg-navy/10 text-navy px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-wider">
                        {res.practiceArea}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        Client: {res.clientInitials}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-navy leading-tight">
                      {res.title}
                    </h3>
                    
                    <p className="text-gray-650 text-xs sm:text-sm leading-relaxed font-normal">
                      {res.detail}
                    </p>
                  </div>

                  <div className="p-4 bg-navy text-white rounded-none flex items-center justify-between border-l-4 border-gold">
                    <div>
                      <span className="block text-[8px] uppercase tracking-widest text-gray-300">Net Recovery Payload</span>
                      <span className="block text-gold text-lg font-bold font-mono tracking-tight mt-0.5">
                        {res.amount}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase tracking-widest text-[9px]">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" />
                      <span>Certified win</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA panel */}
            <div className="bg-navy text-white p-8 rounded-none text-center space-y-5 max-w-4xl mx-auto border-t-4 border-gold border border-navy-light/20">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Were You Injured or Wrongfully Accused?
              </h3>
              <p className="text-xs text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal">
                Every file is analyzed with customized strategic blueprints. Under our No Fee Unless We Win guarantee, personal injury cases do not pay regular hourly retainers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <button 
                  onClick={() => setEvaluationModalOpen(true)}
                  className="py-3 px-6 bg-gold text-navy font-bold text-xs uppercase tracking-widest rounded-none hover:bg-gold-dark transition-all"
                >
                  Analyze My Case Free
                </button>
                <a 
                  href="tel:+256704378426" 
                  className="py-3 px-6 border border-white text-white hover:bg-white hover:text-navy font-bold text-xs uppercase tracking-widest rounded-none transition-all text-center"
                >
                  Call Lawyer 24/7
                </a>
              </div>
            </div>

          </div>
        )}

        {/* ==============================================
             5. TESTIMONIALS VIEW
           ============================================== */}
        {currentTab === 'testimonials' && (
          <div className="py-16 px-6 sm:px-12 max-w-7xl mx-auto space-y-16 animate-fadeIn font-sans">
            
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] block">Client Advocacy Feedback</span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight">
                What Kampala Families & Business Owners Say
              </h1>
              <div className="h-[2px] w-12 bg-gold mx-auto my-3"></div>
              <p className="text-gray-655 text-sm font-normal">
                Hear directly from individuals who faced child custody limits, police arrest holds, or severe vehicle collisions. Sincere text and video verification indices included.
              </p>
            </div>

            {/* Testimonial Quote Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testi, idx) => (
                <div key={idx} className="bg-white p-7 rounded-none border border-gray-200 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-gold" />
                      ))}
                    </div>
                    <p className="text-gray-655 text-xs sm:text-sm italic leading-relaxed font-normal">
                      "{testi.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-150">
                    <div className="h-9 w-9 bg-navy text-gold font-bold flex items-center justify-center text-xs shrink-0 rounded-none">
                      {testi.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-navy text-xs sm:text-sm leading-tight font-serif">{testi.name}</h4>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">{testi.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* VIDEO TESTIMONIAL CAMPAIGN (UGX 50k Voucher) */}
            <section className="bg-navy text-white rounded-none border border-gold p-6 sm:p-10 max-w-4xl mx-auto space-y-6">
              <div className="text-center space-y-2.5">
                <span className="bg-gold/10 text-gold border border-gold/30 text-[9px] font-bold uppercase tracking-widest py-1 px-3.5 rounded-none inline-block">
                  Limited Campaign Block
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                  Submit Your Video Testimonial & Get a UGX 50,000 Voucher
                </h3>
                <p className="text-xs text-gray-300 max-w-xl mx-auto leading-relaxed font-normal">
                  Help other people in Kampala find trusted, sincere advocates! Record a short phone clip describing our case speed or mediation victory, upload it below, and receive a UGX 50,000 shop voucher instantly.
                </p>
              </div>

              {uploadSuccess ? (
                <div className="bg-emerald-950/20 border border-emerald-500/30 p-6 sm:p-8 rounded-none text-center space-y-4 animate-slideIn">
                  <div className="h-10 w-10 bg-emerald-900/40 rounded-none flex items-center justify-center mx-auto border border-emerald-500">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white">Testimonial Film Logged Successfully!</h4>
                  <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed font-normal">
                    Thank you {testiName}. Your 60-second evaluation was securely processed. Below is your redeemable UGX 50,000 Kampala voucher code:
                  </p>

                  <div className="bg-slate-950 border border-gold p-4 rounded-none flex items-center justify-between max-w-sm mx-auto">
                    <span className="font-mono text-gold text-xs font-bold tracking-widest uppercase">
                      DENISSAYS50KThanks
                    </span>
                    <button
                      onClick={copyVoucherCode}
                      className="text-[10px] py-1.5 px-3 bg-gold hover:bg-gold-dark text-navy font-bold rounded-none flex items-center gap-1.5 transition-colors uppercase tracking-widest"
                    >
                      {copiedCoupon ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy voucher
                        </>
                      )}
                    </button>
                  </div>
                  <span className="block text-[9px] text-gray-400 uppercase tracking-widest">Our support coordinators will also confirm an SMS link to your phone numbers.</span>
                </div>
              ) : (
                <form onSubmit={startVideoUploadSimulation} className="bg-navy-light/10 p-5 rounded-none border border-navy-light/30 space-y-4 max-w-2xl mx-auto">
                  {uploadProgress >= 0 && (
                    <div className="space-y-2 animate-fadeIn py-4 text-center">
                      <span className="text-[10px] font-bold text-gold uppercase tracking-widest block">Uploading Testimonial Package...</span>
                      <div className="w-full bg-slate-800 h-1.5 rounded-none max-w-md mx-auto overflow-hidden border border-slate-700">
                        <div 
                          className="bg-gold h-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono block">{uploadProgress}% complete</span>
                    </div>
                  )}

                  {uploadProgress === -1 && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
                        <div className="space-y-1">
                          <label htmlFor="testi-name" className="text-[9px] uppercase font-bold text-gray-400 tracking-widest block">Your Full Name</label>
                          <input 
                            id="testi-name"
                            type="text" 
                            placeholder="Sarah Nakato"
                            value={testiName}
                            onChange={(e) => setTestiName(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 bg-navy border border-navy-light rounded-none text-white focus:outline-none focus:border-gold font-normal"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="testi-email" className="text-[9px] uppercase font-bold text-gray-400 tracking-widest block">Your Email Address</label>
                          <input 
                            id="testi-email"
                            type="email" 
                            placeholder="sarah@gmail.com"
                            value={testiEmail}
                            onChange={(e) => setTestiEmail(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 bg-navy border border-navy-light rounded-none text-white focus:outline-none focus:border-gold font-normal"
                            required
                          />
                        </div>
                      </div>

                      <div className="border border-dashed border-navy-light/85 hover:border-gold p-6 rounded-none text-center space-y-2 cursor-pointer transition-colors bg-navy-light/5">
                        <FileUp className="h-7 w-7 text-gold mx-auto" />
                        <h4 className="font-bold text-xs text-white uppercase tracking-wider">Drag and drop video here or click to browse</h4>
                        <span className="text-[9px] text-gray-400 block uppercase tracking-wide">Supports standard phone video formats (.mp4, .mov, up to 150MB)</span>
                        <input 
                          type="file" 
                          id="raw-video-file" 
                          accept="video/*"
                          className="hidden" 
                          onChange={() => setUploadProgress(0)}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-gold hover:bg-gold-dark text-navy font-bold text-xs uppercase tracking-widest rounded-none"
                      >
                        Initiate Film Upload & Claim 50k Voucher
                      </button>
                    </>
                  )}
                </form>
              )}
            </section>

          </div>
        )}

        {/* ==============================================
             6. FAQ VIEW
           ============================================== */}
        {currentTab === 'faq' && (
          <div className="py-16 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 animate-fadeIn font-sans">
            
            <div className="text-center space-y-4 max-w-2xl mx-auto font-sans">
              <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] block">Legal Directory Knowledge</span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight">
                Frequently Asked Questions Index
              </h1>
              <div className="h-[2px] w-12 bg-gold mx-auto my-3"></div>
              <p className="text-gray-655 text-sm font-normal">
                Search or browse answers to critical Kampala divorce parameters, child custody Welfare principles, police bond holds, and traffic accident computations.
              </p>
            </div>

            {/* Live FAQ search bar */}
            <div className="max-w-md mx-auto relative font-sans">
              <input
                type="text"
                placeholder="Search FAQs (e.g. divorce, child custody, arrest, cost...)"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-none focus:outline-none focus:border-gold shadow-none text-xs sm:text-sm font-normal placeholder-gray-400"
              />
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            </div>

            {/* Displaying Search Match Lists */}
            <div className="max-w-4xl mx-auto space-y-8 text-sm font-sans">
              {PRACTICE_AREAS.map((p) => {
                const filteredFaqs = p.faqs.filter(
                  f => f.question.toLowerCase().includes(faqSearch.toLowerCase()) || 
                       f.answer.toLowerCase().includes(faqSearch.toLowerCase())
                );

                if (filteredFaqs.length === 0) return null;

                return (
                  <div key={p.id} className="space-y-4">
                    <h3 className="font-serif text-xs sm:text-sm font-bold uppercase tracking-widest text-gold border-b border-gray-200 pb-2 flex items-center gap-2.5">
                      <span className="text-navy">{getIconComponent(p.icon)}</span>
                      {p.title} FAQs
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {filteredFaqs.map((f, i) => (
                        <div key={i} className="bg-white p-6 rounded-none border border-gray-200 space-y-2">
                          <h4 className="font-serif text-xs sm:text-sm font-bold text-navy leading-tight">
                            Q: {f.question}
                          </h4>
                          <p className="text-xs text-gray-650 leading-relaxed font-normal">
                            {f.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ==============================================
             7. BLOG LOG VIEW
           ============================================== */}
        {currentTab === 'blog' && (
          <div className="py-16 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 animate-fadeIn font-sans">
            
            {activeReadPost ? (
              /* Specific Article Reader Dashboard */
              <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn text-sm">
                <button
                  onClick={() => setActiveReadPost(null)}
                  className="text-navy font-bold text-xs flex items-center gap-1.5 hover:text-gold transition-colors uppercase tracking-widest cursor-pointer"
                >
                  ← Back to Insights List
                </button>

                <div className="space-y-3.5">
                  <span className="bg-navy/10 text-navy px-3 py-1 rounded-none text-[9px] font-bold uppercase tracking-wider">
                    {activeReadPost.category}
                  </span>
                  <h1 className="font-serif text-2.5xl sm:text-4xl font-bold text-navy leading-tight tracking-tight">
                    {activeReadPost.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                    <span>Written by: <strong>{activeReadPost.author}</strong></span>
                    <span>•</span>
                    <span>Published: <strong>{activeReadPost.publishDate}</strong></span>
                    <span>•</span>
                    <span>Read Time: <strong>{activeReadPost.readTime}</strong></span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 text-gray-700 leading-relaxed space-y-5 text-sm whitespace-pre-line font-normal markdown-body">
                  {activeReadPost.content}
                </div>

                <div className="bg-gray-50 p-6 rounded-none border-l-4 border-gold border border-gray-200 space-y-4 mt-8">
                  <h4 className="font-serif text-sm font-bold text-navy uppercase tracking-wider">
                    Need Advice on This Specific Legal Matter?
                  </h4>
                  <p className="text-xs text-gray-650 font-normal">
                    Advocate Denis Kakeeto and defense consultants can analyze coordinates relating to this article immediately.
                  </p>
                  <button
                    onClick={() => setEvaluationModalOpen(true)}
                    className="py-2.5 px-5 bg-navy hover:bg-navy-light text-white font-bold text-xs rounded-none shadow-none transition-all uppercase tracking-widest"
                  >
                    Discuss Case free
                  </button>
                </div>
              </div>
            ) : (
              /* Main Directory Grid */
              <div className="space-y-12">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] block font-medium">Legal Insights</span>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight">
                    Advocacy Insights & Case Preparation Guides
                  </h1>
                  <div className="h-[2px] w-12 bg-gold mx-auto my-3"></div>
                  <p className="text-gray-655 text-sm font-normal">
                    Read plain-English, grade 8 reading-level write-ups compiled by Denis Kakeeto to prepare families and traffic accident casualties in Kampala.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                  {BLOG_POSTS.map((post) => (
                    <article 
                      key={post.id}
                      onClick={() => { setActiveReadPost(post); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="bg-white p-6 rounded-none border border-gray-200 hover:border-gold transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase border-b border-gray-150 pb-2">
                          <span className="tracking-wide">{post.category}</span>
                          <span className="font-mono">{post.readTime}</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-navy group-hover:text-gold transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-gray-655 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-gray-200 mt-6 flex justify-between items-center text-xs text-gold font-bold uppercase tracking-widest text-[10px]">
                        <span>Read Full Guide →</span>
                        <span className="text-gray-400 text-[10px] lowercase font-normal">{post.publishDate}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ==============================================
             8. CONTACT VIEW
           ============================================== */}
        {currentTab === 'contact' && (
          <div className="py-16 px-6 sm:px-12 max-w-7xl mx-auto space-y-16 animate-fadeIn text-sm font-sans">
            
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] block font-medium">Reach Our Office</span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight">
                Secure Kampala Consultation
              </h1>
              <div className="h-[2px] w-12 bg-gold mx-auto my-3"></div>
              <p className="text-gray-655 text-xs sm:text-sm font-normal">
                Connect directly with Denis Kakeeto's advocates at Plot 822/46, Rubaga Road. Schedule or submit your file index below.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Side Info & Map */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-7 bg-navy text-white rounded-none border-t-4 border-gold space-y-4">
                  <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                    Primary Office Details
                  </h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-gray-300 font-normal">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <span>
                        Plot 822/46, Rubaga Road<br />
                        Eli Complex, Opposite National Red Cross<br />
                        P.O. Box 35125, Kampala, Uganda
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1">
                        <a href="tel:+256704378426" className="hover:text-gold font-bold transition-colors">
                          +256 704 378 426
                        </a>
                        <a href="tel:+256772378426" className="hover:text-gold font-bold transition-colors">
                          +256 772 378 426
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gold shrink-0" />
                      <a href="mailto:denis_kakeeto@yahoo.com" className="hover:text-gold transition-colors">
                        denis_kakeeto@yahoo.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* SVG Beautiful Representation of Kampala Map */}
                <div className="bg-white border border-gray-200 rounded-none p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-navy uppercase tracking-wider font-serif">🏢 Eli Complex Chambers Layout</span>
                    <span className="text-gold font-bold font-mono text-[10px]">Rubaga Road, Plot 822/46</span>
                  </div>
                  
                  {/* Map SVG */}
                  <div className="bg-slate-100 rounded-none aspect-16/10 flex items-center justify-center p-4 relative overflow-hidden select-none border border-gray-150">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0A2540_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    
                    {/* Visual road grid representation */}
                    <div className="w-full h-1 bg-slate-300 absolute top-1/2 -translate-y-1/2"></div>
                    <div className="w-full transform rotate-30 h-1 bg-slate-300 absolute top-1/2 -translate-y-1/2 text-left"></div>
                    <span className="text-[10px] text-gray-400 font-mono tracking-widest absolute top-[43%] left-4 font-normal">RUBAGA ROAD</span>

                    <div className="bg-navy border border-gold py-2.5 px-4 rounded-none shadow-none text-center text-white z-10 space-y-1 cursor-pointer hover:bg-navy-light transition-colors">
                      <span className="block text-[10px] text-gold font-bold uppercase tracking-widest">Denis Kakeeto Advocates</span>
                      <span className="block text-[8px] text-gray-300 font-semibold uppercase">Eli Complex opposite Red Cross</span>
                    </div>

                    <div className="absolute top-4 right-4 text-[9px] bg-white border border-gray-200 rounded-none px-1.5 py-0.5 text-navy font-mono">
                      📍 GPS: 0.3060° N, 32.5595° E
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Instant Calendar System */}
              <div className="lg:col-span-7 space-y-6">
                <BookingCalendar onBookingCreated={handleBookingCreated} />
              </div>

            </div>

          </div>
        )}

      </main>

      {/* FLOATING ACTION TOOL (Contact & Phone selector) */}
      <div id="floating-contact-panel" className="fixed bottom-20 lg:bottom-6 left-6 z-40 flex flex-col gap-2 font-sans">
        <a 
          href="tel:+256704378426" 
          className="bg-navy hover:bg-navy-light text-white font-bold text-xs p-3.5 rounded-none border border-gold hover:border-white shadow-none flex items-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Phone className="h-4 w-4 text-gold" />
          <span className="hidden sm:inline uppercase tracking-widest text-[10px]">24/7 Hotline</span>
        </a>
      </div>

      {/* PERSISTENT MOBILE STICKY BOTTOM NAVIGATION BAR */}
      <div 
        id="mobile-navigation-bar" 
        className="block lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy/95 border-t border-gold/30 shadow-[0_-4px_16px_rgba(0,0,0,0.3)] backdrop-blur-md"
      >
        <div className="grid grid-cols-4 h-[64px]">
          {/* Item 1: Home */}
          <button
            onClick={() => {
              setCurrentTab('home');
              setActiveReadPost(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
              currentTab === 'home' ? 'text-gold' : 'text-gray-300 hover:text-white'
            }`}
          >
            <BookOpen className="h-5 w-5" />
            <span className="text-[9px] uppercase font-bold tracking-wider">Home</span>
          </button>

          {/* Item 2: Specialties */}
          <button
            onClick={() => {
              setCurrentTab('practice-areas');
              setActiveReadPost(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
              [
                'practice-areas',
                'family-law',
                'criminal-defense',
                'personal-injury',
                'estate-planning',
                'business-law'
              ].includes(currentTab)
                ? 'text-gold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Scale className="h-5 w-5" />
            <span className="text-[9px] uppercase font-bold tracking-wider">Specialties</span>
          </button>

          {/* Item 3: Free Consult Scheduler */}
          <button
            onClick={() => {
              setCurrentTab('contact');
              setActiveReadPost(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
              currentTab === 'contact' ? 'text-gold' : 'text-gray-300 hover:text-white'
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-[9px] uppercase font-bold tracking-wider">Consult</span>
          </button>

          {/* Item 4: Instant Phone call */}
          <a
            href="tel:+256704378426"
            className="flex flex-col items-center justify-center gap-1 text-gold hover:text-gold-light transition-colors cursor-pointer bg-navy-light/40 border-l border-gold/15"
          >
            <Phone className="h-5 w-5 animate-bounce" />
            <span className="text-[9px] uppercase font-mono font-black tracking-widest text-[#D4AF37]">Call Denis</span>
          </a>
        </div>
      </div>

      {/* Simulated Live Chat Bot Sticky Widget */}
      <LiveChat onLeadCapture={handleLeadCapture} />

      {/* Live Admin CRM Tracker for Testing Verification */}
      <AdminPanel lastUpdated={lastUpdated} />

      {/* Primary Modal: Free Evaluation Popup */}
      {evaluationModalOpen && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all animate-fadeIn font-sans">
          <div className="bg-white text-navy w-full max-w-lg p-6 sm:p-8 rounded-none shadow-none relative border-t-4 border-gold border border-gray-200 space-y-5 animate-slideIn">
            
            <button
              onClick={() => setEvaluationModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-navy transition-colors font-mono text-sm p-1 cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>

            {evalSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="h-12 w-12 bg-emerald-50 rounded-none flex items-center justify-center mx-auto border border-emerald-500 shadow-none">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-serif text-xl font-bold">Evaluation Registered!</h3>
                <p className="text-xs text-gray-650 max-w-sm mx-auto leading-relaxed font-normal">
                  Your legal file was captured successfully. Advocate Denis Kakeeto and support mediation directors are cross-referencing files. Expect our response within 60 minutes.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1.5 text-center sm:text-left">
                  <h3 className="font-serif text-xl font-bold tracking-tight text-navy">
                    Free Legal Strategy Consultation
                  </h3>
                  <p className="text-xs text-gray-650 leading-relaxed font-normal">
                    Provide name, WhatsApp/Phone contact and select your area profile below. Secure lawyer analysis without hidden costs.
                  </p>
                </div>

                <form onSubmit={handleEvaluationSubmit} className="space-y-4 text-xs text-navy font-bold text-left">
                  
                  <div className="space-y-1 bg-white">
                    <label htmlFor="modal-name" className="block text-gray-500 text-[9px] uppercase tracking-wider">Your Full Name</label>
                    <input 
                      id="modal-name"
                      type="text" 
                      placeholder="e.g. Kenneth Ssewankambo"
                      value={evalName}
                      onChange={(e) => setEvalName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-200 bg-white rounded-none focus:outline-none focus:border-gold font-normal"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 bg-white">
                      <label htmlFor="modal-phone" className="block text-gray-500 text-[9px] uppercase tracking-wider font-bold">WhatsApp/Phone</label>
                      <input 
                        id="modal-phone"
                        type="tel" 
                        placeholder="e.g. +256 704 ..."
                        value={evalPhone}
                        onChange={(e) => setEvalPhone(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 border border-gray-200 bg-white rounded-none focus:outline-none focus:border-gold font-normal"
                        required
                      />
                    </div>
                    <div className="space-y-1 bg-white">
                      <label htmlFor="modal-cat" className="block text-gray-500 text-[9px] uppercase tracking-wider font-bold">Specialty Focus</label>
                      <select 
                        id="modal-cat"
                        value={evalCategory}
                        onChange={(e) => setEvalCategory(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 border border-gray-200 bg-white rounded-none focus:outline-none focus:border-gold font-normal"
                      >
                        <option value="Personal Injury Claims">Personal Injury Claims</option>
                        <option value="Family Law / divorce">Family Law / Divorce</option>
                        <option value="Criminal Defence / Bond">Criminal Defence / Bond</option>
                        <option value="Wills & Estate writing">Wills & Estate Writing</option>
                        <option value="Business & Land Registry">Business & Land Registry</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1 bg-white">
                    <label htmlFor="modal-desc" className="block text-gray-500 text-[9px] uppercase tracking-wider font-bold">Dispute Description</label>
                    <textarea 
                      id="modal-desc"
                      rows={3} 
                      placeholder="What is the legal issue or charges faced?"
                      value={evalDesc}
                      onChange={(e) => setEvalDesc(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-200 bg-white rounded-none focus:outline-none focus:border-gold resize-none font-normal"
                      required
                    />
                  </div>

                  <div className="p-3 bg-gold/5 rounded-none text-[10px] text-navy font-mono border border-gold/25 uppercase tracking-wide">
                    ⏱️ After-Hours SLA: Submitted after 6 PM? We call back within 1 hour!
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-navy hover:bg-navy-light text-white font-bold text-xs uppercase tracking-widest rounded-none shadow-none transition-colors border border-navy hover:border-gold"
                  >
                    Submit Details to Denis
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      )}

      {/* Core Footer Element */}
      <Footer 
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setActiveReadPost(null);
        }} 
        onLeadSubmitted={handleLeadCapture}
      />

    </div>
  );
}
