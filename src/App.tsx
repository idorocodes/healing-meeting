import { useState, useEffect } from "react";
import {
  MapPin, Calendar, Clock, UserCheck, Phone,
  CheckCircle, ArrowRight, Loader2,
  MessageCircle, Sparkles
} from "lucide-react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw_2NJ36DERek63Nkp2IO0bSlmbs39X3SeiM-ZxnQO5HOcfRd55pANgGdkTSKyPGdkGsw/exec";
const WHATSAPP_LINK = "https://chat.whatsapp.com/CpOGM7534xYGvXRSyfKH1i";
const STORAGE_KEY = "haz_registered_may2026";

type FormState = {
  name: string;
  phone: string;
};

export default function App() {
  // ── 1. Correct State Initialization (Avoids Cascading Renders) ──
  const [form, setForm] = useState<FormState>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    }
    return { name: "", phone: "" };
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success">(() => {
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) {
      return "success";
    }
    return "idle";
  });

  const [error, setError] = useState("");
  

  const isReturningUser = typeof window !== "undefined" && !!localStorage.getItem(STORAGE_KEY);

  // ── 2. Effects ──
  useEffect(() => {
    document.title = "Eternal Life — Healing Meeting";
  }, []);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setStatus("loading");
    
    try {
      const q = new URLSearchParams({
        name: form.name.trim(),
        phone: form.phone.trim(),
        timestamp: new Date().toISOString(),
      });
      
      // Submit to Google Sheets
      await fetch(`${GOOGLE_SCRIPT_URL}?${q}`, { method: "GET", mode: "no-cors" });
      
      // Save locally
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
      
      setStatus("success");

      // Small timeout ensures the "Success" UI renders before we try to scroll to it
      setTimeout(() => {
        document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      setStatus("idle");
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-indigo-100">
      
   
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-base sm:text-lg tracking-tight uppercase">
            Holy Armies of <span className="text-indigo-600">Zion</span>
          </span>
          <a href="#register" className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-colors">
            Attend Meeting
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-16 pb-14 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" /> 16th May, 2026
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1] mb-6">
            Speak <span className="text-indigo-600">Life.</span>{" "}
            <br className="hidden sm:block" />
            Stay <span className="italic font-serif font-normal text-slate-400">Restored.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
            A divine encounter designed to connect, comfort, and protect you.
            Registration is the first step to your miracle.
          </p>
          <a href="#register" className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
            Register for Free
          </a>
        </div>
      </section>

      {/* ── Details Bar ── */}
      <div className="border-t border-b border-slate-100 bg-slate-50/50 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-slate-200">
          {[
            { icon: <MapPin className="w-5 h-5 text-indigo-500" />, label: "Venue", value: "Voice of the Cross, Oye Ekiti" },
            { icon: <Calendar className="w-5 h-5 text-indigo-500" />, label: "Date", value: "Saturday, May 16, 2026" },
            { icon: <Clock className="w-5 h-5 text-indigo-500" />, label: "Time", value: "4:00 PM Prompt" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 sm:justify-center sm:px-8">
              <div className="w-9 h-9 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0">{item.icon}</div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{item.label}</p>
                <p className="text-sm font-semibold text-slate-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Registration Area ── */}
      <section id="register" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xl shadow-slate-100/50 transition-all">
            {status === "success" ? (
              /* Success Content */
              <div className="text-center space-y-6 animate-in">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-50/50">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2">
                    {isReturningUser ? "Welcome Back!" : "You're Registered!"}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    God bless you, <span className="text-indigo-600 font-bold">{form.name}</span>.
                    <br />
                    Join our community group below for the event link and updates.
                  </p>
                </div>
                <a 
                  href={WHATSAPP_LINK} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-between w-full bg-green-600 text-white px-5 py-4 rounded-xl hover:bg-green-700 transition-all active:scale-95 shadow-lg shadow-green-100"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span className="font-bold text-sm">Join WhatsApp Group</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ) : (
              /* Form Content */
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Join the Gathering</h2>
                  <p className="text-slate-500 text-sm">Complete your registration to continue</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <div className="relative">
                      <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        name="name" 
                        type="text" 
                        disabled={status === "loading"}
                        placeholder="Your full name" 
                        value={form.name} 
                        onChange={change} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 focus:bg-white outline-none transition-all disabled:opacity-50" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        name="phone" 
                        type="tel" 
                        disabled={status === "loading"}
                        placeholder="+234 ..." 
                        value={form.phone} 
                        onChange={change} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 focus:bg-white outline-none transition-all disabled:opacity-50" 
                      />
                    </div>
                  </div>
                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100 animate-pulse">
                      {error}
                    </div>
                  )}
                  <button 
                    onClick={submit} 
                    disabled={status === "loading"} 
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-indigo-600 active:scale-[0.98] disabled:bg-slate-400 transition-all flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Register Now <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <footer className="text-center mt-12 space-y-4">
            <p className="text-slate-400 text-sm font-serif italic max-w-xs mx-auto">"Jesus said to her, I am the resurrection and the life."</p>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">— John 11:25</p>
            <div className="h-px w-10 bg-slate-100 mx-auto mt-4" />
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Holy Armies of Zion © 2026</p>
          </footer>
        </div>
      </section>

      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}