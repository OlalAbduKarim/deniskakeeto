import { useState } from 'react';
import { Scale, Shield, Activity, Phone, MessageSquare, Clock, Menu, X, Users, MessageCircle } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  currentTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onRequestEvaluation: () => void;
}

export default function Header({ currentTab, onTabChange, onRequestEvaluation }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPracticeDropdown, setShowPracticeDropdown] = useState(false);

  const navigationItems: { label: string; tab: ActiveTab }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'About Denis', tab: 'about' },
    { label: 'Case Wins', tab: 'case-results' },
    { label: 'What Clients Say', tab: 'testimonials' },
    { label: 'FAQs', tab: 'faq' },
    { label: 'Legal Insights', tab: 'blog' },
    { label: 'Contact Us', tab: 'contact' },
  ];

  const subPracticeAreas: { label: string; tab: ActiveTab; icon: any }[] = [
    { label: 'Family Law & Custody', tab: 'family-law', icon: Scale },
    { label: 'Criminal Defense', tab: 'criminal-defense', icon: Shield },
    { label: 'Personal Injury', tab: 'personal-injury', icon: Activity },
    { label: 'Estate Planning & Wills', tab: 'estate-planning', icon: Clock },
    { label: 'Business & Land Law', tab: 'business-law', icon: Users },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    onTabChange(tab);
    setIsOpen(false);
    setShowPracticeDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isPracticeActive = [
    'practice-areas',
    'family-law',
    'criminal-defense',
    'personal-injury',
    'estate-planning',
    'business-law',
  ].includes(currentTab);

  return (
    <header className="w-full z-50 transition-all duration-300 font-sans">
      {/* 1. Hot Conversion Sticky Top Bar */}
      <div id="sticky-topbar" className="bg-navy border-b border-navy-light/40 py-2 px-8 text-[11px] text-white tracking-wider uppercase font-semibold">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-gray-300">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Call 24/7 Hotline
            </span>
            <span className="text-navy-light font-bold">|</span>
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3 text-gold" />
              <a href="tel:+256704378426" className="hover:text-gold transition-colors font-semibold text-white">
                +256 704 378 426
              </a>
              <span className="text-navy-light font-bold">/</span>
              <a href="tel:+256772378426" className="hover:text-gold transition-colors font-semibold text-white">
                +256 772 378 426
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-200">
            <span className="flex items-center gap-1 text-gold">
              <Clock className="h-3 w-3" />
              Response Guarantee: 1 Hour Call Back
            </span>
            <span className="hidden md:inline font-bold text-navy-light">|</span>
            <button 
              onClick={() => handleNavClick('contact')} 
              className="hidden md:flex items-center gap-1 hover:text-gold transition-colors underline decoration-gold underline-offset-4"
            >
              <MessageCircle className="h-3 w-3 text-gold" />
              Free Consultation Scheduling
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav id="main-navigation" className="bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 px-8 sticky top-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand/Logo Layout */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="bg-gold w-10 h-10 shrink-0 flex items-center justify-center font-serif text-white font-bold text-xl rounded-none transition-transform group-hover:scale-105">
              K
            </div>
            <div className="flex flex-col leading-tight">
              <span className="block font-serif text-lg sm:text-xl font-bold text-navy tracking-tight">
                Denis Kakeeto
              </span>
              <span className="block text-[9px] uppercase tracking-[0.2em] text-navy/60 font-medium">
                Advocates & Legal Advisors
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Direct Home Link */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                currentTab === 'home' ? 'text-gold' : 'text-navy hover:text-gold'
              }`}
            >
              Home
            </button>

            {/* Hover/Dropdown Practice Areas */}
            <div className="relative">
              <button
                onClick={() => setShowPracticeDropdown(!showPracticeDropdown)}
                onMouseEnter={() => setShowPracticeDropdown(true)}
                className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1 ${
                  isPracticeActive ? 'text-gold' : 'text-navy hover:text-gold'
                }`}
              >
                Practice Areas
                <span className="text-[10px] transform transition-transform duration-200">▼</span>
              </button>

              {showPracticeDropdown && (
                <div 
                  className="absolute left-0 top-full mt-1 w-64 bg-white shadow-xl border border-gray-100 py-2 divide-y divide-gray-50 text-left animate-fadeIn z-50 rounded-none"
                  onMouseLeave={() => setShowPracticeDropdown(false)}
                >
                  <button
                    onClick={() => handleNavClick('practice-areas')}
                    className="w-full text-left px-4 py-2 text-[10px] font-bold text-navy hover:bg-gold/10 hover:text-gold transition-colors block uppercase tracking-wider"
                  >
                    All Practice Overview
                  </button>
                  {subPracticeAreas.map((area) => (
                    <button
                      key={area.tab}
                      onClick={() => handleNavClick(area.tab)}
                      className={`w-full text-left px-4 py-3 text-xs uppercase tracking-wide transition-colors flex items-center gap-3 ${
                        currentTab === area.tab ? 'text-gold font-bold bg-gray-50' : 'text-gray-700 hover:bg-gray-50 hover:text-navy'
                      }`}
                    >
                      <area.icon className="h-4 w-4 text-gold shrink-0" />
                      {area.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Other Direct Links */}
            {navigationItems.slice(1).map((item) => (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  currentTab === item.tab ? 'text-gold' : 'text-navy hover:text-gold'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Core Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              href="tel:+256704378426" 
              className="px-4 py-2.5 border-2 border-navy text-navy font-bold text-[11px] uppercase tracking-wider rounded-none hover:bg-navy hover:text-white transition-all flex items-center gap-1.5"
            >
              <Phone className="h-3.5 w-3.5 text-gold" />
              +256 704 378 426
            </a>
            <button 
              onClick={onRequestEvaluation}
              className="px-5 py-2.5 bg-navy hover:bg-navy-light text-white font-bold text-xs uppercase tracking-widest rounded-none transition-all"
            >
              Free Evaluation
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex items-center gap-3 lg:hidden">
            <a 
              href="tel:+256704378426" 
              className="bg-navy text-gold p-2.5 rounded-none border border-navy hover:bg-gold hover:text-navy transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
              title="Call Advocate Now"
            >
              <Phone className="h-5 w-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy p-2.5 hover:text-gold focus:outline-none flex items-center justify-center min-w-[44px] min-h-[44px]"
              id="mobile-menu-burger"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Over Navigation Drawer with Blur Backdrop */}
        {isOpen && (
          <>
            {/* Elegant glassmorphism dark backdrop */}
            <div 
              className="lg:hidden fixed inset-0 z-40 bg-navy/75 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Slide-over deep navy container */}
            <div className="lg:hidden fixed inset-y-0 right-0 z-50 w-[300px] max-w-[90vw] bg-navy border-l border-gold/30 shadow-2xl flex flex-col justify-between overflow-y-auto animate-fadeIn font-sans">
              
              {/* Drawer Top Header section */}
              <div className="p-6 border-b border-navy-light/60">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-gold w-8 h-8 flex items-center justify-center font-serif text-white font-bold text-base rounded-none">
                      K
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="block font-serif text-sm font-bold text-white tracking-tight">
                        Denis Kakeeto
                      </span>
                      <span className="block text-[8px] uppercase tracking-[0.15em] text-gray-300 font-medium">
                        Advocates & Counsel
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-300 hover:text-gold hover:bg-navy-light rounded-none transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Navigation Links */}
              <div className="flex-1 py-4 px-6 space-y-2">
                {/* Home navigation target */}
                <button
                  onClick={() => handleNavClick('home')}
                  className={`w-full text-left py-3 px-3.5 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border-l-2 transition-all ${
                    currentTab === 'home' ? 'bg-navy-light/50 text-gold border-gold' : 'text-gray-200 hover:bg-navy-light/30 hover:text-white border-transparent'
                  } min-h-[44px]`}
                >
                  <span>Home Main Page</span>
                  <Scale className="h-3.5 w-3.5 opacity-60 text-gold shrink-0" />
                </button>

                {/* Collapsible Practice Specialties Accordion */}
                <div className="space-y-1">
                  <button
                    onClick={() => setShowPracticeDropdown(!showPracticeDropdown)}
                    className={`w-full text-left py-3 px-3.5 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border-l-2 transition-all ${
                      [
                        'practice-areas',
                        'family-law',
                        'criminal-defense',
                        'personal-injury',
                        'estate-planning',
                        'business-law'
                      ].includes(currentTab)
                        ? 'bg-navy-light/50 text-gold border-gold'
                        : 'text-gray-200 hover:bg-navy-light/30 hover:text-white border-transparent'
                    } min-h-[44px]`}
                  >
                    <span>Practice Specialties</span>
                    <span className={`text-[10px] text-gold transform transition-transform duration-300 ${showPracticeDropdown ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {/* Nested expanded specialties links */}
                  {showPracticeDropdown && (
                    <div className="pl-4 pr-1 py-2 space-y-1 bg-navy-light/20 border-l border-gold/20 animate-fadeIn divide-y divide-navy-light/40">
                      <button
                        onClick={() => handleNavClick('practice-areas')}
                        className="w-full text-left py-2.5 px-3.5 text-[10px] font-bold uppercase text-gray-300 hover:text-gold tracking-widest min-h-[44px]"
                      >
                        → View Practice Overview
                      </button>
                      {subPracticeAreas.map((area) => (
                        <button
                          key={area.tab}
                          onClick={() => handleNavClick(area.tab)}
                          className={`w-full text-left py-3 px-3.5 text-[11px] uppercase tracking-wider flex items-center gap-2.5 transition-colors ${
                            currentTab === area.tab ? 'text-gold font-black bg-navy-light/40' : 'text-gray-300 hover:text-white'
                          } min-h-[44px]`}
                        >
                          <area.icon className="h-3.5 w-3.5 text-gold shrink-0" />
                          <span>{area.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Main Direct Options */}
                {[
                  { label: 'About Principal Denis', tab: 'about' },
                  { label: 'Successful Case Wins', tab: 'case-results' },
                  { label: 'Client Testimonials', tab: 'testimonials' },
                  { label: 'FAQs & legal rules', tab: 'faq' },
                  { label: 'Legal Insights & Blog', tab: 'blog' },
                  { label: 'Real Case Submission', tab: 'contact' },
                ].map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => handleNavClick(item.tab as ActiveTab)}
                    className={`w-full text-left py-3 px-3.5 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border-l-2 transition-all ${
                      currentTab === item.tab ? 'bg-navy-light/50 text-gold border-gold' : 'text-gray-200 hover:bg-navy-light/30 hover:text-white border-transparent'
                    } min-h-[44px]`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Drawer Conversion Footer section */}
              <div className="p-6 border-t border-navy-light/60 bg-navy-light/30 space-y-4">
                <div className="space-y-1.5 text-center">
                  <span className="block text-[8px] text-gray-400 uppercase tracking-widest font-bold">Kampala Priority Hotline</span>
                  <a 
                    href="tel:+256704378426" 
                    className="block text-gold hover:text-gold-light text-sm font-bold tracking-wider font-mono hover:underline min-h-[44px] flex items-center justify-center"
                  >
                    📞 +256 704 378 426
                  </a>
                  <a 
                    href="tel:+256772378426" 
                    className="block text-gold hover:text-gold-light text-sm font-bold tracking-wider font-mono hover:underline min-h-[44px] flex items-center justify-center"
                  >
                    📞 +256 772 378 426
                  </a>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      onRequestEvaluation();
                    }}
                    className="w-full text-center py-3 bg-gold hover:bg-gold-dark text-navy font-bold text-xs uppercase tracking-widest rounded-none shadow-sm cursor-pointer min-h-[44px]"
                  >
                    Free Evaluation
                  </button>
                </div>
              </div>

            </div>
          </>
        )}
      </nav>
    </header>
  );
}
