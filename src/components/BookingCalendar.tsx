import { useState, FormEvent } from 'react';
import { Calendar, Clock, Contact, CheckCircle2, Video, Globe2, AlertCircle } from 'lucide-react';
import { Booking } from '../types';

interface BookingCalendarProps {
  onBookingCreated: (booking: Booking) => void;
}

export default function BookingCalendar({ onBookingCreated }: BookingCalendarProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [practiceArea, setPracticeArea] = useState('family-law');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errorMess, setErrorMess] = useState('');
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);

  // Generate next 7 weekdays starting from today
  const getNextAvailableDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 10; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const dayOfWeek = nextDate.getDay();
      
      // Filter out Sundays for professional work
      if (dayOfWeek !== 0) {
        days.push({
          rawDate: nextDate.toISOString().split('T')[0],
          formattedName: nextDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          dayName: nextDate.toLocaleDateString('en-US', { weekday: 'long' })
        });
      }
      if (days.length >= 6) break;
    }
    return days;
  };

  const availableDays = getNextAvailableDays();

  const availableSlots = [
    '09:00 AM', '10:00 AM', '11:15 AM', '02:00 PM', '03:15 PM', '04:30 PM', '05:45 PM'
  ];

  const handleNextStep = () => {
    if (!selectedDate) {
      setErrorMess('Please select a consultation date.');
      return;
    }
    if (!selectedTime) {
      setErrorMess('Please select a preferred 15-minute time slot.');
      return;
    }
    setErrorMess('');
    setStep(2);
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setErrorMess('Please provide your name, phone, and email to lock in this call slot.');
      return;
    }

    const booking: Booking = {
      id: `booking-${Date.now()}`,
      clientName: name.trim(),
      clientPhone: phone.trim(),
      clientEmail: email.trim(),
      selectedDate,
      selectedTime,
      practiceArea,
      bookedAt: new Date().toLocaleString()
    };

    // Store in LocalStorage
    try {
      const existingBookings: Booking[] = JSON.parse(localStorage.getItem('denis_bookings') || '[]');
      existingBookings.unshift(booking);
      localStorage.setItem('denis_bookings', JSON.stringify(existingBookings));
    } catch (e) {
      console.error(e);
    }

    onBookingCreated(booking);
    setLastBooking(booking);
    setBookingCompleted(true);
  };

  const getDayFormatted = (dateStr: string) => {
    const d = availableDays.find(day => day.rawDate === dateStr);
    return d ? `${d.formattedName} (${d.dayName})` : dateStr;
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setPracticeArea('family-law');
    setName('');
    setPhone('');
    setEmail('');
    setErrorMess('');
    setBookingCompleted(false);
    setLastBooking(null);
  };

  return (
    <div id="booking-widget" className="bg-white rounded-none border border-gray-200 overflow-hidden w-full max-w-4xl mx-auto flex flex-col md:flex-row min-h-[480px]">
      
      {/* Visual Sidebar */}
      <div className="bg-navy p-6 md:p-8 text-white md:w-80 flex flex-col justify-between border-b border-gold md:border-b-0 md:border-r border-gold">
        <div className="space-y-4">
          <div className="inline-block bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-none border border-gold/20">
            Free Case Consult
          </div>
          <h3 className="font-serif text-xl md:text-2xl font-bold tracking-tight leading-tight">
            Schedule 15-Min Strategy Call
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed font-normal">
            Choose a date and slot to connect directly with Denis Kakeeto's senior advisors. We will discuss your documents, outline structural strategy, and define potential legal routes.
          </p>
        </div>

        <div className="space-y-4 pt-6 border-t border-navy-light/40 text-[11px] text-gray-300">
          <div className="flex items-center gap-3">
            <Video className="h-4 w-4 text-gold shrink-0" />
            <span>Voice Call or Google Meet</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-gold shrink-0" />
            <span>15 Minutes Standard Duration</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe2 className="h-4 w-4 text-gold shrink-0" />
            <span>Kampala Time (EAT, UTC+3)</span>
          </div>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between bg-white">
        {bookingCompleted && lastBooking ? (
          <div className="text-center py-8 px-4 space-y-6 animate-fadeIn">
            <div className="h-16 w-16 bg-emerald-50 rounded-none flex items-center justify-center mx-auto border border-emerald-500 shadow-md">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            
            <div className="space-y-2">
              <h4 className="font-serif text-lg md:text-xl font-bold text-navy">
                Legal Consultation Confirmed!
              </h4>
              <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                Excellent, {lastBooking.clientName}. Your call has been successfully secured in Advocate Denis Kakeeto’s calendar. A secure calendar invite has been sent to your email.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-none border border-gray-200 text-left max-w-sm mx-auto space-y-2.5 text-xs text-navy">
              <div><strong>Client Name:</strong> {lastBooking.clientName}</div>
              <div><strong>Date Selected:</strong> {getDayFormatted(lastBooking.selectedDate)}</div>
              <div><strong>Time Window:</strong> {lastBooking.selectedTime} (EAT)</div>
              <div><strong>Interests:</strong> {lastBooking.practiceArea.toUpperCase().replace('-', ' ')}</div>
              <div><strong>Priority Phone:</strong> {lastBooking.clientPhone}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto pt-4">
              <button
                onClick={() => alert('An confirmation calendar (ICS) structure has been added. We will also coordinate a reminder SMS 15-minutes before.')}
                className="flex-1 py-3 bg-navy text-white text-xs font-bold rounded-none border border-navy hover:bg-navy-light transition-colors uppercase tracking-widest"
              >
                📅 Add to Calendar
              </button>
              <button
                onClick={resetForm}
                className="flex-1 py-3 bg-gray-150 text-gray-800 text-xs font-bold rounded-none hover:bg-gray-200 transition-colors uppercase tracking-widest border border-gray-200"
              >
                Book Another Call
              </button>
            </div>
          </div>
        ) : (
          <>
            {errorMess && (
              <div className="mb-4 text-xs p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-none flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-300 shrink-0" />
                <span>{errorMess}</span>
              </div>
            )}

            {step === 1 ? (
              <div className="space-y-6 flex-1">
                {/* 1. Pick Specialty */}
                <div className="space-y-2">
                  <label htmlFor="booking-specialty" className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Step 1: Select Practice Area Profile
                  </label>
                  <select
                    id="booking-specialty"
                    value={practiceArea}
                    onChange={(e) => setPracticeArea(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-200 rounded-none focus:outline-none focus:border-gold shadow-sm font-semibold"
                  >
                    <option value="family-law">Family Law & custody (Starts UGX 1.5M)</option>
                    <option value="criminal-defense">Criminal Defence & police bond (Starts UGX 2.5M)</option>
                    <option value="personal-injury">Personal Injury collisions (No Win, No Fee)</option>
                    <option value="estate-planning">Will Writing & Trusts (Starts UGX 1.0M)</option>
                    <option value="business-law">Business Registry & Land title (Starts UGX 600k)</option>
                  </select>
                </div>

                {/* 2. Choose Date */}
                <div className="space-y-2">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Step 2: Choose Date (next 6 business days)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableDays.map((day) => (
                      <button
                        key={day.rawDate}
                        type="button"
                        onClick={() => setSelectedDate(day.rawDate)}
                        className={`py-2 px-1 rounded-none border text-center transition-all ${
                          selectedDate === day.rawDate
                            ? 'bg-navy border-navy text-white font-bold ring-1 ring-gold shadow-sm'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gold'
                        }`}
                      >
                        <span className="block text-xs font-bold">{day.formattedName}</span>
                        <span className={`block text-[9px] uppercase mt-0.5 ${selectedDate === day.rawDate ? 'text-gold' : 'text-gray-400'}`}>
                          {day.dayName.slice(0, 3)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Choose Time */}
                <div className="space-y-2">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Step 3: Choose Time Segment (Kampala EAT Time)
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {availableSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-1 text-xs rounded-none border text-center transition-all ${
                          selectedTime === time
                            ? 'bg-navy border-navy text-white font-bold ring-1 ring-gold'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gold'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="py-3 px-6 bg-navy text-white hover:bg-navy-light text-xs font-bold rounded-none transition-colors uppercase tracking-widest"
                  >
                    Select Contact Details →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 flex-1">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Step 4: Provide Contact Coordinates
                </span>

                {/* Resume selection details */}
                <div className="bg-gray-50 p-3 rounded-none border border-gray-200 text-[10px] text-gray-600 flex justify-between font-bold uppercase tracking-wider">
                  <div>📅 {getDayFormatted(selectedDate)}</div>
                  <div>⏰ {selectedTime} EAT</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="booking-name" className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Full Name</label>
                    <input
                      id="booking-name"
                      type="text"
                      placeholder="e.g. Sarah Nakato"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-gray-200 rounded-none focus:outline-none focus:border-gold font-medium"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="booking-phone" className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">WhatsApp / Contact</label>
                    <input
                      id="booking-phone"
                      type="tel"
                      placeholder="e.g. +256 772 968 262"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-gray-200 rounded-none focus:outline-none focus:border-gold font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="booking-email" className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                  <input
                    id="booking-email"
                    type="email"
                    placeholder="e.g. sarah@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-gray-200 rounded-none focus:outline-none focus:border-gold font-medium"
                    required
                  />
                </div>

                <div className="p-3 bg-gray-50 rounded-none text-[11px] text-gray-650 flex gap-2.5 border border-gray-150">
                  <Contact className="h-4.5 w-4.5 text-gold shrink-0" />
                  <span>Advocate Denis Kakeeto and Senior Partners will prepare documentation based on your selected practice profile before the call.</span>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-none transition-colors border border-gray-200 uppercase tracking-widest"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="py-3 px-6 bg-gold hover:bg-gold-dark text-navy text-xs font-bold uppercase rounded-none transition-all tracking-widest"
                  >
                    Confirm Booking Now
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>

    </div>
  );
}
