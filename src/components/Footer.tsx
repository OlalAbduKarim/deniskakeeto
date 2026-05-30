import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Scale, Shield, CheckCircle2, Lock } from 'lucide-react';
import { ActiveTab, Lead } from '../types';

interface FooterProps {
  onTabChange: (tab: ActiveTab) => void;
  onLeadSubmitted: (lead: Lead) => void;
}

export default function Footer({ onTabChange, onLeadSubmitted }: FooterProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMess, setErrorMess] = useState('');

  const currentYear = new Date().getFullYear();

  const handleQuickSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !description.trim()) {
      setErrorMess('Please provide details in all three fields to request evaluation.');
      return;
    }
    
    setErrorMess('');
    const hours = new Date().getHours();
    const isAfterHours = hours >= 18 || hours < 8; // After 6 PM or before 8 AM

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      description: description.trim(),
      submittedAt: new Date().toLocaleString(),
      isAfterHours,
      status: 'New'
    };

    // Store in LocalStorage
    try {
      const existingLeads: Lead[] = JSON.parse(localStorage.getItem('denis_leads') || '[]');
      existingLeads.unshift(newLead);
      localStorage.setItem('denis_leads', JSON.stringify(existingLeads));
    } catch (e) {
      console.error(e);
    }

    onLeadSubmitted(newLead);
    setSubmitted(true);
    setName('');
    setPhone('');
    setDescription('');

    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  const footerLinks: { label: string; tab: ActiveTab }[] = [
    { label: 'Family Law & Child Custody', tab: 'family-law' },
    { label: 'Criminal Defense & Police Bond', tab: 'criminal-defense' },
    { label: 'Personal Injury Negligence', tab: 'personal-injury' },
    { label: 'Will Writing & Estate Planning', tab: 'estate-planning' },
    { label: 'Business & Land Registrations', tab: 'business-law' },
  ];

  return (
    <footer id="footer-lead-capture" className="bg-navy text-white pt-16 pb-8 border-t border-gray-100/10 font-sans">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Module A: Brand Authority & Physical Office */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-gold w-10 h-10 shrink-0 flex items-center justify-center font-serif text-white font-bold text-xl rounded-none">
              K
            </div>
            <div className="flex flex-col leading-tight">
              <span className="block font-serif text-xl font-bold uppercase tracking-tight text-white">
                Denis Kakeeto
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-gold font-medium">
                Advocates & Solicitors
              </span>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm leading-relaxed font-normal">
            Leading advocacy firm in Kampala, Uganda. We fight relentlessly to safeguard your freedoms, family stability, and compensation claims. Built on speed, rigorous research, and client-first transparency.
          </p>

          <div className="space-y-4 text-sm text-gray-300 pt-2">
            <div className="flex items-start gap-4">
              <MapPin className="h-4.5 w-4.5 text-gold shrink-0 mt-0.5" />
              <span className="leading-relaxed font-normal">
                Plot 822/46, Rubaga Road<br />
                Eli Complex, Opposite National Red Cross<br />
                P.O. Box 35125, Kampala, Uganda
              </span>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-4.5 w-4.5 text-gold shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <a href="tel:+256704378426" className="hover:text-gold transition-colors font-semibold">
                  +256 704 378 426
                </a>
                <a href="tel:+256772378426" className="hover:text-gold transition-colors font-semibold">
                  +256 772 378 426
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-4.5 w-4.5 text-gold shrink-0" />
              <a href="mailto:denis_kakeeto@yahoo.com" className="hover:text-gold transition-colors font-normal">
                denis_kakeeto@yahoo.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-navy-light/45 rounded-none border border-navy-light/30 text-[11px] text-gray-400 max-w-sm">
            <Lock className="h-3.5 w-3.5 text-gold shrink-0" />
            <span>🔒 SSL Encrypted Portal. All inquiries are covered by attorney-client privilege.</span>
          </div>
        </div>

        {/* Module B: Custom Quick Lead Form (High Conversion) */}
        <div className="lg:col-span-5 bg-navy-light/30 p-6 rounded-none border border-navy-light/40 space-y-5">
          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-gold" />
            Get a Free Consultation Now
          </h3>
          <p className="text-xs text-gray-300 font-normal">
            No obligation. No legal jargon. Simply provide your name, phone number, and brief issue description. We'll handle the rest.
          </p>

          <div className="p-3 bg-gold/10 border border-gold/20 rounded-none text-xs text-gold flex flex-col gap-0.5 font-sans font-medium">
            <span className="font-bold">⚡ OUR AFTER-HOURS PROMISE:</span>
            <span>Submitted after 6 PM? We call you back within 60 minutes!</span>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-none text-center space-y-3 animate-slideIn">
              <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">Inquiry Received Successfully!</h4>
              <p className="text-xs text-gray-300">
                Denis Kakeeto Advocates has logged your request. A lawyer is reviewing your statement right now. Expect our call shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleQuickSubmit} className="space-y-4">
              {errorMess && (
                <div className="text-xs p-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-none font-medium">
                  {errorMess}
                </div>
              )}
              
              <div>
                <label htmlFor="footer-name" className="sr-only">Your Full Name</label>
                <input
                  id="footer-name"
                  type="text"
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-4 py-2.5 bg-navy border border-navy-light/60 rounded-none text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors font-medium"
                  required
                />
              </div>

              <div>
                <label htmlFor="footer-phone" className="sr-only">Your Phone (WhatsApp/Mobile)</label>
                <input
                  id="footer-phone"
                  type="tel"
                  placeholder="Phone Number (e.g. +256 ...)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-4 py-2.5 bg-navy border border-navy-light/60 rounded-none text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors font-medium"
                  required
                />
              </div>

              <div>
                <label htmlFor="footer-desc" className="sr-only">Brief description of legal problem</label>
                <textarea
                  id="footer-desc"
                  rows={3}
                  placeholder="Describe your legal issue (e.g. custody, injury, bond context...)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs px-4 py-2.5 bg-navy border border-navy-light/60 rounded-none text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors resize-none font-medium"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gold hover:bg-gold-dark text-navy font-bold text-xs uppercase rounded-none transition-all tracking-widest"
              >
                Request Free Case Review
              </button>
            </form>
          )}
        </div>

        {/* Module C: Navigation Links */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-gold mb-4">
              Our Area Profiles
            </h4>
            <div className="flex flex-col space-y-3 text-sm">
              {footerLinks.map((link) => (
                <button
                  key={link.tab}
                  onClick={() => {
                    onTabChange(link.tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left text-gray-300 hover:text-gold transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-gold mb-4">
              Knowledge Hub
            </h4>
            <div className="flex flex-col space-y-3 text-sm">
              <button 
                onClick={() => { onTabChange('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className="text-left text-gray-300 hover:text-gold transition-colors"
              >
                Legal Blog & Insights
              </button>
              <button 
                onClick={() => { onTabChange('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className="text-left text-gray-300 hover:text-gold transition-colors"
              >
                Frequently Asked Questions
              </button>
              <button 
                onClick={() => { onTabChange('case-results'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className="text-left text-gray-300 hover:text-gold transition-colors"
              >
                Recent UGX Case Wins
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* SSL/Security Advices & Quick Setup guides */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-navy-light/50 text-center text-xs text-gray-400 space-y-4">
        <div className="flex flex-wrap justify-center items-center gap-4 text-gray-500 font-medium">
          <span>🔒 SSL & HTTPS Ready Configured</span>
          <span>•</span>
          <span>💼 LegalService Schema JSON-LD Loaded</span>
          <span>•</span>
          <span>⚡ Mobile Optimized & AMP Compatible</span>
        </div>
        <p className="max-w-3xl mx-auto leading-relaxed">
          Disclaimer: The information provided on this website is for educational and advocacy marketing purposes only, and does not constitute formal legal contract until a written retainer has been fully authorized and signed by both parties.
        </p>
        <p>
          &copy; {currentYear} Denis Kakeeto Advocates & Solicitors. All rights Reserved. Designed by Elite Legal Marketing Strategists.
        </p>
      </div>
    </footer>
  );
}
