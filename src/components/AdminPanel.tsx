import { useState, useEffect } from 'react';
import { ShieldAlert, Users, Calendar, Trash2, Check, RefreshCw, Star } from 'lucide-react';
import { Lead, Booking } from '../types';

interface AdminPanelProps {
  lastUpdated: number;
}

export default function AdminPanel({ lastUpdated }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'bookings'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const seedLeads: Lead[] = [
    {
      id: 'seed-1',
      name: 'Justus Tumusiime',
      phone: '+256 772 984532',
      description: 'Need urgent representation at Kira Road Police for a family member arrested on property dispute. Require immediate police bond.',
      submittedAt: '5/30/2026, 8:14 AM',
      isAfterHours: false,
      status: 'New'
    },
    {
      id: 'seed-2',
      name: 'Annet Nabakooza',
      phone: '+256 751 228912',
      description: 'Simple uncontested divorce planning. We have 2 children, agreed on tuition, how do we file parent scheduling without expensive magistrate fees?',
      submittedAt: '5/29/2026, 6:45 PM',
      isAfterHours: true,
      status: 'Called'
    },
    {
      id: 'seed-3',
      name: 'Kenneth Ssewankambo',
      phone: '+256 703 115421',
      description: 'Accident injury on Entebbe Road. Hit by commercial oil tanker, broken femur. Hospital fees total UGX 8M, driver insurer claims fault belongs to boda rider.',
      submittedAt: '5/29/2026, 2:10 PM',
      isAfterHours: false,
      status: 'New'
    }
  ];

  const seedBookings: Booking[] = [
    {
      id: 'seed-b1',
      clientName: 'Diana Atwine',
      clientPhone: '+256 774 159852',
      clientEmail: 'diana.atwine@gmail.com',
      selectedDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      selectedTime: '10:00 AM',
      practiceArea: 'family-law',
      bookedAt: '5/29/2026, 11:30 AM'
    },
    {
      id: 'seed-b2',
      clientName: 'Robert Kabushenga',
      clientPhone: '+256 752 456789',
      clientEmail: 'robert@kabushengallc.com',
      selectedDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      selectedTime: '02:00 PM',
      practiceArea: 'business-law',
      bookedAt: '5/29/2026, 4:15 PM'
    }
  ];

  const loadData = () => {
    try {
      // Load Leads
      const storedLeads = localStorage.getItem('denis_leads');
      if (storedLeads) {
        setLeads(JSON.parse(storedLeads));
      } else {
        localStorage.setItem('denis_leads', JSON.stringify(seedLeads));
        setLeads(seedLeads);
      }

      // Load Bookings
      const storedBookings = localStorage.getItem('denis_bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      } else {
        localStorage.setItem('denis_bookings', JSON.stringify(seedBookings));
        setBookings(seedBookings);
      }
    } catch (e) {
      console.error('Error reading localStorage in Admin Panel:', e);
    }
  };

  useEffect(() => {
    loadData();
  }, [lastUpdated]);

  const toggleStatus = (id: string) => {
    const updated = leads.map(lead => {
      if (lead.id === id) {
        return { ...lead, status: lead.status === 'New' ? 'Called' : lead.status === 'Called' ? 'Archived' : 'New' as any };
      }
      return lead;
    });
    localStorage.setItem('denis_leads', JSON.stringify(updated));
    setLeads(updated);
  };

  const removeLead = (id: string) => {
    const updated = leads.filter(lead => lead.id !== id);
    localStorage.setItem('denis_leads', JSON.stringify(updated));
    setLeads(updated);
  };

  const removeBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    localStorage.setItem('denis_bookings', JSON.stringify(updated));
    setBookings(updated);
  };

  const clearAll = () => {
    if (confirm('Are you sure you want to revert to original demo seeds and wipe current storage?')) {
      localStorage.removeItem('denis_leads');
      localStorage.removeItem('denis_bookings');
      loadData();
    }
  };

  return (
    <div id="admin-analytics-dashboard" className="w-full bg-slate-900 text-slate-100 py-4 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gold text-slate-900 p-2 rounded-lg">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <span className="block font-heading text-sm font-black text-white uppercase tracking-wider">
                Denis Kakeeto Admin Desk
              </span>
              <span className="block text-[11px] text-slate-400">
                Live Lead capturing & Booking tracker (Built in for testing & verification)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-gold border border-slate-700 transition-colors cursor-pointer"
            >
              {isOpen ? 'Close Live Panel' : 'Inspect Received Leads & Bookings (' + (leads.length + bookings.length) + ')'}
            </button>
            {isOpen && (
              <button
                onClick={clearAll}
                className="p-1 px-2.5 bg-rose-950 hover:bg-rose-900 text-[10px] rounded text-rose-300 font-bold transition-colors"
                title="Wipe demo files"
              >
                Reset Seeds
              </button>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="mt-6 border-t border-slate-800 pt-6 animate-fadeIn space-y-4">
            {/* Header subtabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('leads')}
                className={`flex items-center gap-2 py-1.5 px-4 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'leads' ? 'bg-gold text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <Users className="h-4 w-4" />
                Contact Inquiries ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`flex items-center gap-2 py-1.5 px-4 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'bookings' ? 'bg-gold text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <Calendar className="h-4 w-4" />
                Calendly Bookings ({bookings.length})
              </button>
            </div>

            {/* Inquiries List */}
            {activeTab === 'leads' ? (
              <div className="overflow-x-auto rounded-xl border border-slate-850">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-300 border-b border-slate-800">
                      <th className="p-3 font-semibold">Client Name</th>
                      <th className="p-3 font-semibold">Phone Contact</th>
                      <th className="p-3 font-semibold">Problem Narrative</th>
                      <th className="p-3 font-semibold">Submitted Time</th>
                      <th className="p-3 font-semibold">After-6PM?</th>
                      <th className="p-3 font-semibold">CRM Status</th>
                      <th className="p-3 font-semibold text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-550">
                          No leads submitted in this browser session. Type in any footer form or Chatbot to log them!
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-850/50 transition-colors">
                          <td className="p-3 font-bold text-white">{lead.name}</td>
                          <td className="p-3 text-gold font-mono">{lead.phone}</td>
                          <td className="p-3 text-slate-300 max-w-sm leading-relaxed">{lead.description}</td>
                          <td className="p-3 text-slate-400">{lead.submittedAt}</td>
                          <td className="p-3">
                            {lead.isAfterHours ? (
                              <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                                Yes ⚡ 1-Hr SLA
                              </span>
                            ) : (
                              <span className="text-slate-500">Regular</span>
                            )}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => toggleStatus(lead.id)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                                lead.status === 'New'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                  : lead.status === 'Called'
                                  ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                  : 'bg-slate-800 text-slate-500 border-slate-700'
                              }`}
                              title="Click to cycle status"
                            >
                              {lead.status}
                            </button>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => removeLead(lead.id)}
                              className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Bookings List */
              <div className="overflow-x-auto rounded-xl border border-slate-850">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-300 border-b border-slate-800">
                      <th className="p-3 font-semibold">Visitor Name</th>
                      <th className="p-3 font-semibold">Phone & Email</th>
                      <th className="p-3 font-semibold">Specialty Profile</th>
                      <th className="p-3 font-semibold">Booked Consultation Window</th>
                      <th className="p-3 font-semibold">Logged Date</th>
                      <th className="p-3 font-semibold text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-550">
                          No active Calendly slots reserved. Choose a slot in any scheduling widget!
                        </td>
                      </tr>
                    ) : (
                      bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-850/50 transition-colors">
                          <td className="p-3 font-bold text-white">{b.clientName}</td>
                          <td className="p-3 text-slate-300 space-y-0.5">
                            <div className="text-gold font-mono">{b.clientPhone}</div>
                            <div className="text-slate-400 text-[10px]">{b.clientEmail}</div>
                          </td>
                          <td className="p-3">
                            <span className="bg-slate-800 text-gray-300 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
                              {b.practiceArea.replace('-', ' ')}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-emerald-400">{b.selectedTime}</div>
                            <div className="text-slate-400 text-[10px]">Date: {b.selectedDate} (EAT)</div>
                          </td>
                          <td className="p-3 text-slate-400">{b.bookedAt}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => removeBooking(b.id)}
                              className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
            <div className="p-3 bg-slate-950 rounded-lg text-[10px] text-slate-400 flex items-center gap-2">
              <Star className="h-3.5 w-3.5 text-gold shrink-0 animate-spin" />
              <span>Conversion mechanics testbed is fully synchronous. All footer block submissions, quick case audits, and chatbot inputs will register instantly above!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
