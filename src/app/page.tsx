// src/app/page.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X, ArrowUp, Sun, Moon } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState('');
  const [showCalendly, setShowCalendly] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
  
    const saved = localStorage.getItem('vyvabrill-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = saved === 'dark' || (!saved && prefersDark);
    setIsDark(initialDark);
    if (initialDark) document.documentElement.classList.add('dark');
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vyvabrill-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vyvabrill-theme', 'light');
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleLeadCapture = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email!');
      return;
    }

    // SAVE TO GOOGLE SHEETS
    try {
      await fetch('https://script.google.com/macros/s/AKfycbzxYFjboovAOU0JwbzS_cpvo_mekEchSu4Ze7dKj-RqZISpHRk7IVq7q72ajxZe-SD5/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (e) {}

    setShowCalendly(true);

    // OPEN CALENDLY POPUP INSTANTLY
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: 'https://calendly.com/vyvabrill/30min'
      });
    } else {
      // Fallback: redirect if popup blocked
      window.open('https://calendly.com/vyvabrill/30min', '_blank');
    }
  };

  return (
    <>
      <head>
        <link rel="icon" href="/favicon.png" sizes="64x64" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <title>Vyvabrill - Digital Growth Agency</title>
        {/* Calendly Widget Script */}
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <script src="https://assets.calendly.com/assets/external/widget.js" async />
      </head>

      {/* HEADER WITH TOGGLE */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image
              src="/Logo.png"
              alt="Vyvabrill Logo"
              width={580}
              height={580}
              className="w-50 h-50 md:w-58 md:h-58 rounded-full object-contain drop-shadow-lg"
            />

          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollTo('home')} className="font-medium text-vyva-white hover:text-vyva-gold transition">Home</button>
            <button onClick={() => scrollTo('about')} className="font-medium text-vyva-white hover:text-vyva-gold transition">About</button>
            
            <div className="relative group">
              <button className="font-medium text-vyva-white hover:text-vyva-gold flex items-center gap-1 transition">
                Services <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-vyva-white dark:bg-vyva-black rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                {[
                  'Website Design', 'Sales Funnel', 'Newsletter', 
                  'Sales Copy', 'Ads Management', 'Figma Design', 'Memecoin Website'
                ].map((s, i) => (
                  <button 
                    key={s} 
                    className="block w-full text-left px-6 py-3 text-vyva-black dark:text-vyva-white hover:bg-gradient-to-r hover:from-vyva-blue hover:to-vyva-gold hover:text-vyva-white transition-all first:rounded-t-2xl last:rounded-b-2xl"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => scrollTo('book')} className="bg-vyva-gold text-vyva-black font-bold px-6 py-2 rounded-full hover:scale-105 transition shadow-lg">
              Book a Session
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-vyva-white/20 backdrop-blur-sm hover:bg-vyva-gold/30 transition"
            >
              {isDark ? <Sun className="w-5 h-5 text-vyva-gold" /> : <Moon className="w-5 h-5 text-vyva-white" />}
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-vyva-white/20 backdrop-blur-sm"
            >
              {isDark ? <Sun className="w-5 h-5 text-vyva-gold" /> : <Moon className="w-5 h-5 text-vyva-white" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-vyva-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-vyva-white dark:bg-vyva-black/95 backdrop-blur-md border-t">
            <div className="container mx-auto px-6 py-4 space-y-3">
              <button onClick={() => scrollTo('home')} className="block w-full text-left font-medium text-vyva-black dark:text-vyva-white">Home</button>
              <button onClick={() => scrollTo('about')} className="block w-full text-left font-medium text-vyva-black dark:text-vyva-white">About</button>
              <div className="space-y-2">
                <p className="font-medium text-vyva-black dark:text-vyva-white">Services</p>
                {['Website Design', 'Sales Funnel', 'Newsletter', 'Sales Copy', 'Ads Management', 'Figma Design', 'Memecoin Website'].map((s) => (
                  <button key={s} className="block w-full text-left text-sm text-vyva-black/70 dark:text-vyva-white/70 pl-4 hover:text-vyva-blue">{s}</button>
                ))}
              </div>
              <button onClick={() => scrollTo('book')} className="w-full bg-vyva-gold text-vyva-black font-bold py-3 rounded-full">
                Book a Session
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-vyva-blue via-[#0260e0] to-vyva-gold pt-20">
        <div className="absolute inset-0 bg-vyva-black/20" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-vyva-white tracking-tighter mb-6 drop-shadow-2xl">
            VYVABRILL
          </h1>
          <p className="text-xl md:text-2xl text-vyva-white/90 font-medium mb-10 max-w-2xl mx-auto">
            We build high-converting landing pages, sales funnels & newsletters that grow your revenue.
          </p>
          <button
            onClick={() => scrollTo('book')}
            className="inline-block bg-vyva-gold text-vyva-black font-bold text-lg px-10 py-5 rounded-full hover:scale-105 transition-transform duration-200 shadow-xl"
          >
            Book a Free Strategy Call
          </button>
        </motion.div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-vyva-white" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-vyva-white dark:bg-vyva-black">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-5xl md:text-6xl font-bold text-vyva-blue mb-8">
            We Don’t Guess. We Grow.
          </motion.h2>
          <p className="text-xl text-vyva-black/70 dark:text-vyva-white/70 max-w-3xl mx-auto leading-relaxed">
            From viral landing pages to automated funnels and newsletters that convert 
            we use data, design, and psychology to turn visitors into customers.
          </p>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-24 px-6 bg-vyva-gray/30 dark:bg-vyva-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-vyva-blue rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-vyva-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-vyva-blue">Vision</h3>
              </div>
              <p className="text-lg text-vyva-black/70 dark:text-vyva-white/70 leading-relaxed pl-20">
                To become a leading creative growth partner that helps brands connect deeply, grow sustainably, and build experiences that inspire lasting trust and recognition.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-vyva-gold rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-vyva-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-vyva-blue">Mission</h3>
              </div>
              <p className="text-lg text-vyva-black/70 dark:text-vyva-white/70 leading-relaxed pl-20">
                To craft meaningful brand identities, build strong digital experiences, and drive intentional growth through creativity, strategy, and storytelling, empowering businesses to shine brilliantly in a digital-first world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="py-24 px-6 bg-vyva-gray/20 dark:bg-vyva-black/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-vyva-blue mb-16">Selected Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              { title: "GlowSkin", result: "+340% ROAS", color: "from-purple-500 to-pink-500" },
              { title: "CoachFlow", result: "12K subs in 30 days", color: "from-green-500 to-teal-500" },
              { title: "ShopPulse", result: "1 in 4 converted", color: "from-orange-500 to-red-500" },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.2 }} 
                className="group relative overflow-hidden rounded-3xl bg-vyva-white dark:bg-vyva-black shadow-lg h-full"
              >
                <div className="aspect-video relative">
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-80`} />
                  <div className="bg-vyva-gray/30 dark:bg-vyva-white/10 border-2 border-dashed rounded-xl w-full h-full" />
                  <div className="absolute bottom-6 left-6 text-vyva-white z-20">
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <p className="text-vyva-gold font-medium">{item.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT LOVE */}
      <section className="py-24 px-6 bg-vyva-white dark:bg-vyva-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-vyva-blue mb-16">Client Love</h2>
          <div className="space-y-12">
            {[
              { text: "Vyvabrill 3x’d our revenue in 60 days. The funnel is pure magic.", name: "Sarah K.", role: "Founder, GlowSkin" },
              { text: "Best decision we made. Newsletter open rate went from 12% to 58%.", name: "Mike R.", role: "CEO, CoachFlow" },
              { text: "Our memecoin site went viral in 48 hours. Insane growth!", name: "Alex T.", role: "Crypto Founder" },
              { text: "The sales copy converted 42% of cold traffic. Unreal.", name: "Lisa M.", role: "E-com Owner" },
            ].map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} className="bg-gradient-to-r from-vyva-blue/5 to-vyva-gold/10 dark:from-vyva-blue/20 dark:to-vyva-gold/20 p-8 rounded-3xl border-l-4 border-vyva-gold">
                <p className="text-xl italic text-vyva-black/80 dark:text-vyva-white/80 mb-4">“{r.text}”</p>
                <p className="font-bold text-vyva-blue">{r.name} <span className="font-normal text-vyva-black/60 dark:text-vyva-white/60">— {r.role}</span></p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK */}
      <section id="book" className="py-24 px-6 bg-gradient-to-b from-vyva-blue to-[#0230c0] text-vyva-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">Let’s Grow Your Business</h2>
          <p className="text-xl mb-6 opacity-90">Free 30-min strategy call. No pitch. Just results.</p>

          {!showCalendly ? (
            <div className="max-w-md mx-auto space-y-4">
              <input
                type="email"
                placeholder="Enter your email to book"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-vyva-black text-lg bg-vyva-white"
              />
              <button
                onClick={handleLeadCapture}
                className="w-full bg-vyva-gold text-vyva-black font-bold text-xl py-4 rounded-full hover:scale-105 transition-all shadow-2xl"
              >
                Continue to Booking
              </button>
            </div>
          ) : (
            <p className="text-lg font-bold text-vyva-gold">Calendly is open! Pick your time</p>
          )}

          <p className="mt-8 text-lg">Or email: <strong>hi@vyvabrill.com</strong></p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-vyva-black dark:bg-vyva-black text-vyva-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg">© 2025 Vyvabrill. All rights reserved.</p>
          {showBackToTop && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-6 inline-flex items-center gap-2 bg-vyva-gold text-vyva-black font-bold px-6 py-3 rounded-full hover:scale-105 transition"
            >
              <ArrowUp className="w-5 h-5" /> Back to Top
            </button>
          )}
        </div>
      </footer>
    </>
  );
}