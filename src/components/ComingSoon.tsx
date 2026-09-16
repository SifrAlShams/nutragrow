'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Building2, ArrowRight, Sparkles, Leaf, Shield, CheckCircle } from 'lucide-react';

/* ─── floating particle system ─── */
function FloatingParticle({ delay, duration, x, y, size }: {
  delay: number; duration: number; x: number; y: number; size: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: `radial-gradient(circle, rgba(74,222,128,0.4) 0%, rgba(74,222,128,0) 70%)`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, -10, 0],
        opacity: [0, 0.8, 0],
        scale: [0.5, 1.2, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/* ─── animated counter digit ─── */
function CounterDigit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-lg shadow-black/20">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tabular-nums"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>
        {/* glow under digit */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 rounded-full bg-emerald-400/30 blur-sm" />
      </div>
      <span className="mt-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/40 font-medium">
        {label}
      </span>
    </div>
  );
}

/* ─── main component ─── */
export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  /* countdown — launches ~30 days from now */
  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 30);

    const tick = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) return;

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* parallax mouse tracking */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 4000);
      setEmail('');
    }
  };

  /* particle config */
  const particles = Array.from({ length: 20 }, (_, i) => ({
    delay: i * 0.7,
    duration: 5 + Math.random() * 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 12,
  }));

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: '#060d08' }}
    >
      {/* ── background image with parallax ── */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          x: (mousePos.x - 0.5) * -20,
          y: (mousePos.y - 0.5) * -20,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.15 }}
      >
        <img
          src="/images/coming-soon-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-50 scale-110"
        />
      </motion.div>

      {/* ── dark overlay gradient ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#060d08]/70 via-[#060d08]/40 to-[#060d08]/90" />

      {/* ── radial glow ── */}
      <motion.div
        className="absolute z-[1] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
        }}
        animate={{
          left: `calc(${mousePos.x * 100}% - 300px)`,
          top: `calc(${mousePos.y * 100}% - 300px)`,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
      />

      {/* ── particles ── */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
      </div>

      {/* ── grid pattern overlay ── */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ════════════ CONTENT ════════════ */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center">

        {/* ── logo ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-8 sm:mb-10"
        >
          <motion.img
            src="/images/fbd919a7-6db3-4d29-b469-7798f845eeb4-removebg-preview.png"
            alt="Nutra Grow — Wellness for Life"
            className="h-24 sm:h-32 md:h-40 w-auto drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* ── pill badge ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-medium tracking-wide">
            <Sparkles size={14} className="animate-pulse" />
            Something Beautiful is Brewing
          </span>
        </motion.div>

        {/* ── heading ── */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="block text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white">
            Coming
          </span>
          <span
            className="block text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent mt-1"
            style={{
              backgroundImage: 'linear-gradient(135deg, #4ade80 0%, #22c55e 40%, #a3e635 100%)',
            }}
          >
            Soon
          </span>
        </motion.h1>

        {/* ── subtitle ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-white/50 text-base sm:text-lg md:text-xl text-center max-w-xl mb-10 sm:mb-12 leading-relaxed"
        >
          Premium Hair &amp; Skin Support supplements — formulated for women who radiate health and confidence.
        </motion.p>

        {/* ── countdown ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-14"
        >
          <CounterDigit value={timeLeft.days} label="Days" />
          <div className="flex flex-col justify-center text-white/20 text-2xl font-light">:</div>
          <CounterDigit value={timeLeft.hours} label="Hours" />
          <div className="flex flex-col justify-center text-white/20 text-2xl font-light">:</div>
          <CounterDigit value={timeLeft.minutes} label="Minutes" />
          <div className="flex flex-col justify-center text-white/20 text-2xl font-light">:</div>
          <CounterDigit value={timeLeft.seconds} label="Seconds" />
        </motion.div>

        {/* ── email form ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="w-full max-w-md mb-12 sm:mb-14"
        >
          <p className="text-white/40 text-sm text-center mb-4 tracking-wide">
            Get notified when we launch
          </p>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
              >
                <CheckCircle className="text-emerald-400" size={20} />
                <span className="text-emerald-300 font-medium">Thank you! We&apos;ll keep you posted.</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleEmailSubmit}
                className="relative flex items-center"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-l-2xl bg-white/[0.06] border border-white/10 border-r-0 text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.08] transition-all text-sm sm:text-base"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 sm:px-7 py-4 rounded-r-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-sm sm:text-base flex items-center gap-2 hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-900/30 whitespace-nowrap"
                >
                  Notify Me
                  <ArrowRight size={16} />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── teaser features ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-2xl mb-14"
        >
          {[
            { icon: Leaf, title: 'Natural Ingredients', desc: 'Premium, science-backed formulas' },
            { icon: Shield, title: 'GMP Certified', desc: 'Manufactured to the highest standards' },
            { icon: Sparkles, title: 'Made in USA', desc: 'Quality you can trust' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, borderColor: 'rgba(74,222,128,0.2)' }}
              className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                <item.icon size={20} className="text-emerald-400" />
              </div>
              <h3 className="text-white/80 font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-white/30 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── glowing leaf accent ── */}
        <motion.div
          className="absolute right-0 bottom-20 w-32 h-32 sm:w-48 sm:h-48 opacity-20 pointer-events-none z-[3]"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="/images/glowing-leaf.jpg" alt="" className="w-full h-full object-contain" />
        </motion.div>

        {/* ── footer / contact ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center space-y-3"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/25 text-xs">
            <div className="flex items-center gap-2">
              <Building2 size={14} />
              <span>Parsa and Parsa LLC</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>Newark, DE 19713</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <a
                href="mailto:Nutragrowsupplements@gmail.com"
                className="hover:text-emerald-400/60 transition-colors"
              >
                Nutragrowsupplements@gmail.com
              </a>
            </div>
          </div>

          <p className="text-white/15 text-[10px] tracking-wider">
            &copy; {new Date().getFullYear()} Nutra Grow. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
