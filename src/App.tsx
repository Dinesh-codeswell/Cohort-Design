import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useSpring, type Variants, useInView, animate } from 'framer-motion';
import Lenis from 'lenis';
import {
  Plus, ShieldCheck, Menu, X, Play,
  Star, FileText, Briefcase, GraduationCap, Globe, Target, Layout, Users, Search, Grid, PenTool, ChevronRight, Trophy
} from 'lucide-react';

interface Mentor {
  id: number;
  name: string;
  firm: string;
  role: string;
  years: number;
  bio: string;
  image: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  outcome: string;
  image: string;
}

interface WeekModule {
  week: number;
  title: string;
  topics: string[];
  description: string;
  deliverables: string[];
}

interface FAQItem {
  question: string;
  answer: string;
}

const MENTORS: Mentor[] = [
  {
    id: 1,
    name: "ALEXANDER VANCE",
    firm: "McKINSEY & CO",
    role: "Former Associate Partner",
    years: 12,
    bio: "Lead for European Industrial Strategy.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    name: "ELENA RODRIGUEZ",
    firm: "BOSTON CONSULTING GROUP",
    role: "Project Leader",
    years: 9,
    bio: "Specializing in Consumer Tech and market entry logic.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2a04?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    name: "JULIAN THORNE",
    firm: "BAIN & COMPANY",
    role: "Senior Consultant",
    years: 7,
    bio: "Private Equity Due Diligence expert.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    name: "SARAH JENKINS",
    firm: "EX-DELOITTE S&O",
    role: "Strategy Specialist",
    years: 8,
    bio: "Lead for cross-border M&A strategy.",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=600"
  }
];

const MODULES: WeekModule[] = [
  {
    week: 1,
    title: "Structural Architecture",
    description: "Master the fundamental cognitive tools used by senior consultants to deconstruct chaos and ambiguity into solvable structures.",
    topics: ["The MECE Principle Applied", "Issue Tree Construction", "Hypothesis Development"],
    deliverables: ["Framework Application Map", "Initial Case Playbook"]
  },
  {
    week: 2,
    title: "Quantitative Precision",
    description: "Transcend basic guesstimates. Build robust models that withstand partner-level pressure and sensitivity analysis.",
    topics: ["Market Sizing Mastery", "FERMI Logic Systems", "Sensitivity Analysis"],
    deliverables: ["Dynamic Market Model", "FERMI Analysis Sheet"]
  },
  {
    week: 3,
    title: "Narrative Strategy",
    description: "The art of executive communication. Learn to synthesize complex data into compelling C-suite narratives.",
    topics: ["The Pyramid Principle", "Ghost Decking Architecture", "Storyboarding for C-Suite"],
    deliverables: ["Executive Ghost Deck", "Storyline Architecture"]
  },
  {
    week: 4,
    title: "Interrogative Excellence",
    description: "Navigating live case environments under extreme time constraints. Calibrating logic for digital assessments.",
    topics: ["BCG Potential Test Logic", "McKinsey Digital Assessment", "Pressure-Testing Constraints"],
    deliverables: ["Assessment Strategy Log", "Live Drill Scorecard"]
  },
  {
    week: 5,
    title: "Case Simulation Phase",
    description: "Full-duration live mock sessions with real-time calibration and feedback loops from MBB mentors.",
    topics: ["Profitability Deep Dives", "Market Entry Nuances", "Private Equity Cases"],
    deliverables: ["Final Performance Audit", "Placement Readiness Kit"]
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "David Chen",
    role: "Incoming Associate",
    company: "McKinsey",
    quote: "The structural thinking I learned wasn't just for the interview. I used these exact issue trees in my first week on the job to solve a supply chain crisis.",
    outcome: "Offer: McKinsey (London)",
    image: "https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "Amara Okoro",
    role: "Senior Consultant",
    company: "Bain",
    quote: "Working with Elena and Julian gave me the 'insider' perspective that books simply can't provide. It's the difference between knowing the theory and living the culture.",
    outcome: "Offer: Bain & Company (NYC)",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Engagement Manager",
    company: "BCG",
    quote: "I thought I knew case interviews until I went through the Simulation Phase here. The level of quantitative rigor is on par with actual partner-level reviews.",
    outcome: "Offer: BCG (Chicago)",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    name: "Sophie Laurent",
    role: "Strategic Consultant",
    company: "Deloitte",
    quote: "The personalized feedback loops here are unparalleled. My mentor caught structural flaws in my thinking that 3 months of self-study couldn't identify.",
    outcome: "Offer: Deloitte (Paris)",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400"
  }
];

const FAQS: FAQItem[] = [
  {
    question: "How selective is the admission process?",
    answer: "We focus on high-potential candidates. Each application is reviewed for logical aptitude and career trajectory. We maintain a strict seat limit of 40 to ensure direct mentor access."
  },
  {
    question: "Are the sessions recorded?",
    answer: "Yes, all live sessions are recorded and transcribed. However, participation in the live case debriefs is where 80% of the value is realized."
  },
  {
    question: "Do you offer interview guarantees?",
    answer: "While we don't guarantee offers, 88% of our candidates secure interviews at MBB or Big 4 firms. Our focus is on the architecture of your thinking, which firms find undeniable."
  }
];

const FADE_IN: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const STAGGER_CONTAINER: Variants = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const LINE_REVEAL: Variants = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "Curriculum", href: "#curriculum" },
    { name: "Mentors", href: "#mentors" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-200 ${isScrolled ? "bg-white/90 backdrop-blur-md border-b border-slate-200/60" : "bg-transparent"}`}>
      <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-black tracking-tighter text-navy uppercase">BeyondCareer</span>
        </div>
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">{item.name}</a>
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <a href="#pricing" className="px-5 py-2.5 bg-navy text-white hover:bg-indigo-700 font-bold text-[11px] uppercase tracking-widest transition-all rounded-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">Enroll Now</a>
        </div>
        <button className="lg:hidden p-2 text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-6">
            <span className="text-lg font-black tracking-tighter text-white uppercase">BeyondCareer</span>
            <p className="text-sm text-slate-400 font-medium tracking-tight">Precision-engineered for strategic minds.</p>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-12">
            {["Quick Links", "Resources", "Connect"].map(title => (
              <div key={title}>
                <h3 className="font-bold text-[11px] mb-6 uppercase tracking-widest text-slate-400">{title}</h3>
                <ul className="space-y-4">
                  {["Home", "FAQ", "Community", "Privacy"].map(link => <li key={link} className="text-slate-500 text-xs font-medium cursor-pointer hover:text-white transition-colors">{link}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20 h-px w-full bg-white/5" />
        <div className="mt-8 text-[11px] font-bold uppercase tracking-widest text-slate-600">Copyright © {new Date().getFullYear()} Beyond Career Pvt Ltd.</div>
      </div>
    </footer>
  );
};

const ModuleAccordion = ({ mod }: { mod: WeekModule }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `module-content-${mod.week}`;
  return (
    <div className={`relative mb-4`}>
       <div className={`bg-white border transition-all duration-200 overflow-hidden ${isOpen ? 'border-indigo-200 shadow-soft' : 'border-slate-200/60 hover:border-slate-300'}`}>
         <button 
           onClick={() => setIsOpen(!isOpen)}
           aria-expanded={isOpen}
           aria-controls={contentId}
           className="w-full p-8 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-inset"
         >
           <div className="flex items-center gap-6">
             <div className={
               isOpen 
                 ? "w-12 h-12 flex items-center justify-center font-bold text-sm transition-all bg-indigo-600 text-white" 
                 : "w-12 h-12 flex items-center justify-center font-bold text-sm transition-all bg-slate-50 text-slate-400"
             }>
               <span className="font-mono text-[11px]">W{mod.week}</span>
             </div>
             <div>
               <p className={`font-mono text-[10px] uppercase tracking-wider mb-1 ${isOpen ? 'text-navy' : 'text-slate-400'}`}>Week {mod.week}</p>
               <h3 className="text-lg font-bold uppercase tracking-tight text-navy">{mod.title}</h3>
             </div>
           </div>
           
           <div className={`w-10 h-10 border flex items-center justify-center transition-all ${isOpen ? 'bg-navy border-navy rotate-45' : 'bg-white border-slate-200'}`}>
             <Plus className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-slate-400'}`} aria-hidden="true" />
           </div>
         </button>

         <AnimatePresence>
           {isOpen && (
             <motion.div
               id={contentId}
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: 'auto', opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               transition={{ duration: 0.2 }}
             >
               <div className="px-8 pb-8 pt-0">
                 <div className="h-px w-full bg-slate-100 mb-6" />
                 <p className="text-sm text-slate-600 font-medium mb-6 leading-relaxed max-w-2xl">
                   {mod.description}
                 </p>
                 <div className="flex flex-wrap gap-2">
                   {mod.topics.map((topic, i) => (
                     <div key={i} className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border border-slate-200/60 flex items-center gap-2">
                       {topic}
                     </div>
                   ))}
                 </div>
               </div>
             </motion.div>
           )}
         </AnimatePresence>
       </div>
    </div>
  );
};

const FAQAccordion = ({ item, isOpen, onClick, index }: { item: FAQItem, isOpen: boolean, onClick: () => void, index: number }) => {
  const contentId = `faq-content-${index}`;
  return (
    <div className={`relative mb-4`}>
       <div className={`bg-white border transition-all duration-200 overflow-hidden ${isOpen ? 'border-indigo-200 shadow-soft' : 'border-slate-200/60 hover:border-slate-300'}`}>
         <button 
           onClick={onClick}
           aria-expanded={isOpen}
           aria-controls={contentId}
           className="w-full p-6 md:p-8 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-inset"
         >
           <span className={`font-bold text-sm uppercase tracking-tight transition-colors ${isOpen ? 'text-indigo-600' : 'text-navy group-hover:text-indigo-500'}`}>
             {item.question}
           </span>
           
           <div className={`w-8 h-8 md:w-10 md:h-10 border flex items-center justify-center transition-all ${isOpen ? 'bg-navy border-navy rotate-45' : 'bg-white border-slate-200'}`}>
             <Plus className={`w-3 h-3 md:w-4 md:h-4 ${isOpen ? 'text-white' : 'text-slate-400'}`} aria-hidden="true" />
           </div>
         </button>

         <AnimatePresence>
           {isOpen && (
             <motion.div
               id={contentId}
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: 'auto', opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               transition={{ duration: 0.2 }}
             >
               <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                 <div className="h-px w-full bg-slate-100 mb-6" />
                 <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-2xl">
                   {item.answer}
                 </p>
               </div>
             </motion.div>
           )}
         </AnimatePresence>
       </div>
    </div>
  );
};

const Counter = ({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1], // ease-out-quint
      onUpdate(value) {
        node.textContent = Math.round(value).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [from, to, inView, duration]);

  return <span ref={nodeRef} />;
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeWeek, setActiveWeek] = useState(0);
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
  
  const curriculumRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: curriculumRef,
    offset: ["start start", "end end"]
  });

  const rawActiveIndex = useTransform(scrollYProgress, [0, 1], [0, MODULES.length - 1]);
  const smoothedIndex = useSpring(rawActiveIndex, { stiffness: 200, damping: 40 });

  useMotionValueEvent(smoothedIndex, "change", (latest) => {
    setActiveWeek(Math.round(latest));
  });

  const filteredFaqs = FAQS.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-navy font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Header />

      {/* 1. HERO - High Precision Technical */}
      <section id="hero" className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={STAGGER_CONTAINER}
          className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
        >
          
          <div className="flex-1 text-center lg:text-left w-full">
            <motion.div variants={FADE_IN} className="inline-flex items-center gap-2 px-3 py-1 mb-8 bg-indigo-50/50 border border-indigo-100 rounded-sm max-w-full overflow-hidden">
              <div className="flex -space-x-1.5 shrink-0">
                {[MENTORS[0], MENTORS[1], MENTORS[2]].map((m, i) => (
                  <img key={i} src={m.image} className="w-5 h-5 rounded-full border border-indigo-50 object-cover" alt="Mentor" />
                ))}
              </div>
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-indigo-700 font-bold truncate"><Counter to={600} duration={1.5} />+ Strategy Leaders Joined</span>
            </motion.div>

            <motion.h1 variants={FADE_IN} className="text-display-lg font-black text-navy tracking-tighter leading-[0.85] mb-6 md:mb-8 uppercase">
              Master<br />
              Strategic<br />
              Logic
            </motion.h1>

            <motion.p variants={FADE_IN} className="text-base md:text-lg font-medium text-slate-500 mb-8 md:mb-10 prose-measure leading-relaxed text-balance mx-auto lg:mx-0">
              A 5-week high-performance intensive designed to decode the internal logic of MBB strategy firms.
            </motion.p>

            <motion.div variants={FADE_IN} className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 w-full sm:w-auto">
              <a href="#pricing" className="w-full sm:w-auto px-8 py-4 bg-navy text-white font-bold uppercase tracking-widest text-[11px] rounded-sm shadow-soft hover:bg-indigo-700 transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
                Apply Now
              </a>
              <a href="#" className="w-full sm:w-auto px-8 py-4 border border-slate-200 text-navy font-bold uppercase tracking-widest text-[11px] rounded-sm hover:bg-indigo-50/50 transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
                Syllabus
              </a>
            </motion.div>
          </div>

          {/* Right: Clean Grid Visual */}
          <div className="flex-1 w-full grid grid-cols-2 gap-2 sm:gap-4 h-[300px] sm:h-[400px] md:h-[500px]">
             {[
               "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
               "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
               "https://images.unsplash.com/photo-1570126618953-d437176e8c79?auto=format&fit=crop&q=80&w=600",
               "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600"
             ].map((img, i) => (
               <motion.div 
                 key={i} 
                 variants={FADE_IN}
                 className={`rounded-sm overflow-hidden border border-slate-200/60 shadow-sm bg-navy ${i % 2 === 1 ? 'translate-y-4 sm:translate-y-8' : ''}`}
               >
                 <img src={img} className="w-full h-full object-cover mix-blend-luminosity opacity-70 hover:opacity-90 transition-opacity duration-500" alt="Consulting" />
               </motion.div>
             ))}
          </div>
        </motion.div>
      </section>

      {/* 2. LOGOS - Minimal Marquee */}
      <section className="py-8 md:py-12 bg-white border-y border-slate-200/60">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-[1200px] mx-auto px-6 text-center mb-4 md:mb-6"
        >
          <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-slate-400">Trusted by alumni at</p>
        </motion.div>
        <div className="w-full overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-12 md:gap-20 whitespace-nowrap"
          >
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-12 md:gap-20 pr-12 md:pr-20">
                {['McKINSEY', 'BCG', 'BAIN', 'DELOITTE', 'PWC', 'KPMG'].map((firm, i) => (
                  <span key={i} className="font-mono text-[10px] md:text-xs font-bold tracking-[0.3em] text-slate-300 uppercase">
                    {firm}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. WHO THIS IS FOR - Clean Grid */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER_CONTAINER}
            className="mb-16"
          >
            <motion.span variants={FADE_IN} className="mono-label block mb-2">Programme</motion.span>
            <motion.h2 variants={FADE_IN} className="text-3xl font-black uppercase tracking-tight text-navy">Who This Is For</motion.h2>
          </motion.div>
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER_CONTAINER}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { title: "Founders & CEOs", desc: "Scale business operations & refine commercial logic to drive exponential growth." },
              { title: "Product Managers", desc: "Drive technical products with clear commercial outcomes and executive alignment." },
              { title: "Senior Leaders", desc: "Transition from operational management to strategic advisory and C-suite influence." }
            ].map((aud, i) => (
              <motion.div key={i} variants={FADE_IN} className="p-8 border border-slate-200/60 rounded-sm hover:border-indigo-200 transition-all group">
                <h3 className="text-xl font-black uppercase text-navy mb-4 tracking-tight group-hover:text-black transition-colors">{aud.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed prose-measure">{aud.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. CORE PILLARS - Technical Grid */}
      <section id="learn" className="py-24 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={STAGGER_CONTAINER}
            className="mb-16"
          >
            <motion.span variants={FADE_IN} className="mono-label block mb-2">Core Pillars</motion.span>
            <motion.h2 variants={FADE_IN} className="text-3xl font-black uppercase tracking-tight text-navy">What You'll Learn</motion.h2>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={STAGGER_CONTAINER}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200"
          >
            {[
              { pillar: "01", title: "Structural Logic", desc: "Deconstruct business problems into clean issue trees." },
              { pillar: "02", title: "Advanced Synthesis", desc: "Convert data into persuasive C-suite narratives." },
              { pillar: "03", title: "Quantitative Rigor", desc: "Build anti-fragile models that survive partner reviews." },
              { pillar: "04", title: "Strategic Heuristics", desc: "Internalize 40+ mental models used by MBB firms." },
              { pillar: "05", title: "Executive Presence", desc: "Train in high-stakes communication and soft skills." },
              { pillar: "06", title: "Career Strategy", desc: "Elite networking and negotiation tactics." }
            ].map((item, i) => (
              <motion.div key={i} variants={FADE_IN} className="bg-white p-10 hover:bg-indigo-50/50 transition-colors">
                <span className="font-mono text-[11px] font-bold text-indigo-500 mb-4 block">PILLAR {item.pillar}</span>
                <h4 className="text-lg font-black uppercase tracking-tight text-navy mb-3">{item.title}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed prose-measure">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. THE EXPERIENCE - High-Density Logic */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={STAGGER_CONTAINER}
            className="mb-10 md:mb-16"
          >
            <motion.span variants={FADE_IN} className="mono-label block mb-2">Format</motion.span>
            <motion.h2 variants={FADE_IN} className="text-2xl md:text-3xl font-black uppercase tracking-tight text-navy">The Experience</motion.h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              variants={STAGGER_CONTAINER}
              className="space-y-8 md:space-y-12"
            >
              {[
                { title: "Live Case Simulations", desc: "Experience the pressure of real-world strategy casing. Our simulations are live debriefs with MBB-standard rigor." },
                { title: "Peer Debriefs", desc: "Learn by observing and critiquing your cohort members in real-time." },
                { title: "Mentor Feedback", desc: "Direct, unfiltered calibration from veterans who have been in the room." }
              ].map((item, i) => (
                <motion.div key={i} variants={FADE_IN} className="flex gap-6 md:gap-8">
                  <div className="w-10 h-10 border border-slate-200 flex items-center justify-center font-mono text-[11px] shrink-0">0{i+1}</div>
                  <div>
                    <h3 className="text-lg md:text-xl font-black uppercase text-navy mb-2 md:mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed prose-measure">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-sm overflow-hidden border border-slate-200 shadow-soft aspect-video mt-8 lg:mt-0"
            >
               <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200" loading="lazy" className="w-full h-full object-cover grayscale" alt="Experience" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. CURRICULUM - Systematic Roadmap */}
      <section id="curriculum" ref={curriculumRef} className="h-[250vh] md:h-[400vh] bg-white relative z-0 isolate border-t border-slate-200/60">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
          <div className="max-w-[1150px] mx-auto px-6 w-full relative z-10">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={STAGGER_CONTAINER}
              className="mb-8 md:mb-12 pt-16 md:pt-0"
            >
              <motion.span variants={FADE_IN} className="mono-label block mb-2">Roadmap</motion.span>
              <motion.h2 variants={FADE_IN} className="text-3xl md:text-display-sm font-black uppercase tracking-tight text-navy">The Mastery Roadmap</motion.h2>
            </motion.div>
            
            <div className="grid lg:grid-cols-3 gap-6 md:gap-10 h-[60vh] md:h-auto overflow-y-auto md:overflow-visible pb-10 md:pb-0">
              <div className="space-y-1 hidden md:block">
                {MODULES.map((mod, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (curriculumRef.current) {
                        const sectionHeight = curriculumRef.current.offsetHeight;
                        const scrollStart = curriculumRef.current.offsetTop;
                        const targetScroll = scrollStart + (i / (MODULES.length - 1)) * (sectionHeight - window.innerHeight);
                        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                      }
                    }}
                    className={`w-full p-6 text-left border transition-all flex items-center justify-between group ${activeWeek === i ? 'bg-navy border-navy text-white shadow-md' : 'bg-white border-slate-200/60 text-slate-400 hover:border-slate-300'}`}
                  >
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] uppercase tracking-wider mb-1 opacity-60">Week 0{mod.week}</span>
                      <span className="text-[12px] font-bold uppercase tracking-tight">{mod.title}</span>
                    </div>
                    <ChevronRight size={16} className={activeWeek === i ? 'opacity-100' : 'opacity-0'} />
                  </button>
                ))}
              </div>

              {/* Mobile Week Selector */}
              <div className="flex md:hidden overflow-x-auto snap-x pb-4 -mx-6 px-6 gap-3 shrink-0">
                {MODULES.map((mod, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (curriculumRef.current) {
                        const sectionHeight = curriculumRef.current.offsetHeight;
                        const scrollStart = curriculumRef.current.offsetTop;
                        const targetScroll = scrollStart + (i / (MODULES.length - 1)) * (sectionHeight - window.innerHeight);
                        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                      }
                    }}
                    className={`shrink-0 p-4 min-w-[200px] snap-center text-left border transition-all flex flex-col justify-between group ${activeWeek === i ? 'bg-navy border-navy text-white shadow-md' : 'bg-white border-slate-200/60 text-slate-400'}`}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wider mb-1 opacity-60">W{mod.week}</span>
                    <span className="text-[11px] font-bold uppercase tracking-tight line-clamp-1">{mod.title}</span>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeWeek}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-slate-50 border border-slate-200 p-6 md:p-12 rounded-sm min-h-[300px] md:min-h-[420px] flex flex-col"
                  >
                    <div className="mb-6 md:mb-8">
                      <h3 className="text-2xl md:text-4xl font-black text-navy mb-3 md:mb-4 uppercase tracking-tighter">
                        {MODULES[activeWeek].title}
                      </h3>
                      <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed prose-measure">
                        {MODULES[activeWeek].description}
                      </p>
                    </div>

                    <div className="mt-auto grid sm:grid-cols-2 gap-6 md:gap-10 pt-6 md:pt-8 border-t border-slate-200">
                      <div>
                        <span className="mono-label block mb-3 md:mb-4">Key Deliverables</span>
                        <div className="space-y-2 md:space-y-3">
                          {MODULES[activeWeek].deliverables.map((del, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                              <span className="text-[10px] md:text-[11px] font-bold text-navy uppercase tracking-tight">{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="mono-label block mb-3 md:mb-4">Core Topics</span>
                        <ul className="space-y-2 md:space-y-3">
                          {MODULES[activeWeek].topics.map((topic, idx) => (
                            <li key={idx} className="text-[11px] md:text-xs text-slate-500 font-medium tracking-tight flex items-start gap-2">
                              <span className="text-indigo-300 select-none">•</span> {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MENTORS - Professional Index */}
      <section id="mentors" className="py-20 md:py-32 bg-white border-t border-slate-200/60">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={STAGGER_CONTAINER}
            className="mb-12 md:mb-20"
          >
            <motion.span variants={FADE_IN} className="mono-label block mb-2">Faculty</motion.span>
            <motion.h2 variants={FADE_IN} className="text-3xl md:text-display-sm font-black uppercase tracking-tighter text-navy leading-none">The Faculty</motion.h2>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={STAGGER_CONTAINER}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6"
          >
            {MENTORS.map((mentor, i) => (
              <motion.div key={i} variants={FADE_IN} className="group cursor-pointer">
                <div className="aspect-[4/5] rounded-sm overflow-hidden border border-slate-200 mb-4 md:mb-6 relative">
                  <img src={mentor.image} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={mentor.name} />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4">
                    <span className="bg-indigo-600 text-white font-mono text-[9px] md:text-[10px] px-2 py-1 uppercase tracking-widest">{mentor.firm}</span>
                  </div>
                </div>
                <h4 className="text-base md:text-sm font-black uppercase text-navy tracking-tight mb-1">{mentor.name}</h4>
                <p className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest">{mentor.role}</p>
                <div className="w-4 h-px bg-indigo-500 mt-3 md:mt-4 group-hover:w-full transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. TESTIMONIALS - High-Contrast Marquee */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200/60 overflow-hidden">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={STAGGER_CONTAINER}
          className="max-w-[1200px] mx-auto px-6 mb-10 md:mb-16 text-center"
        >
          <motion.span variants={FADE_IN} className="mono-label block mb-2">Alumni Stories</motion.span>
          <motion.h2 variants={FADE_IN} className="text-2xl md:text-3xl font-black uppercase tracking-tight text-navy">Placement Outcomes</motion.h2>
        </motion.div>
        
        <div className="relative">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 md:gap-6"
          >
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex gap-4 md:gap-6 pr-4 md:pr-6">
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="w-[300px] md:w-[450px] bg-white border border-slate-200 p-6 md:p-10 rounded-sm shrink-0 hover:border-indigo-200 hover:shadow-soft transition-all duration-300">
                    <p className="text-sm md:text-base text-navy font-medium mb-8 md:mb-10 leading-relaxed italic">"{t.quote}"</p>
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-slate-100 shrink-0">
                        <img src={t.image} loading="lazy" alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-navy uppercase text-[9px] md:text-[10px] tracking-widest">{t.name}</h4>
                        <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-indigo-600">{t.outcome}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 10. CERTIFICATION - Clean Document Style */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              variants={STAGGER_CONTAINER}
            >
               <motion.span variants={FADE_IN} className="mono-label block mb-2">Certification</motion.span>
               <motion.h2 variants={FADE_IN} className="text-3xl md:text-4xl font-black text-navy uppercase tracking-tighter mb-4 md:mb-6 leading-tight">
                 Industry-standard <br/>validation
               </motion.h2>
               <motion.p variants={FADE_IN} className="text-sm md:text-base text-slate-500 font-medium prose-measure leading-relaxed mb-8 md:mb-10">
                 Recognized by global strategy firms as a marker of structural thinking and logical excellence.
               </motion.p>
               <motion.div variants={FADE_IN} className="grid grid-cols-2 gap-6 md:gap-8">
                 {[
                   { title: "Expert Faculty", icon: <Trophy size={16} /> },
                   { title: "Alumni Network", icon: <Star size={16} /> },
                   { title: "Registry Badge", icon: <ShieldCheck size={16} /> },
                   { title: "Skill-based", icon: <Layout size={16} /> }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col gap-2 md:gap-3">
                     <div className="text-indigo-600">{item.icon}</div>
                     <h4 className="text-[10px] md:text-[12px] font-black uppercase text-navy tracking-widest">{item.title}</h4>
                   </div>
                 ))}
               </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="bg-slate-50 border border-slate-200 p-4 md:p-8 rounded-sm shadow-soft"
            >
              <div className="bg-white border border-slate-200 p-8 md:p-12 aspect-[1.4/1] flex flex-col items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-8 h-8 md:w-12 md:h-12 border-t border-l border-slate-300" />
                <div className="absolute bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 border-b border-r border-slate-300" />
                
                <span className="mono-label text-center">BeyondCareer Strategy Floor</span>
                <div className="text-center mt-4">
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-navy mb-1">Certificate</h3>
                  <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Of Completion</p>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-slate-400 mb-2 md:mb-4">Presented to</p>
                  <h4 className="text-lg md:text-2xl font-bold uppercase tracking-tight text-navy">[Candidate Name]</h4>
                </div>

                <div className="w-full flex justify-between items-end mt-8">
                   <div className="w-16 md:w-24 h-px bg-slate-200" />
                   <div className="w-8 h-8 md:w-10 md:h-10 border border-slate-200 flex items-center justify-center shrink-0">
                     <ShieldCheck size={14} className="text-slate-300 md:w-4 md:h-4" />
                   </div>
                   <div className="w-16 md:w-24 h-px bg-slate-200" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 11. PRICING - Technical Tier */}
      <section id="pricing" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-[1000px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border border-slate-200 shadow-soft overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-[360px] p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/50">
                <span className="mono-label block mb-4">Full Access</span>
                <div className="text-5xl md:text-6xl font-black text-navy tracking-tighter mb-2 uppercase tabular-nums">₹<Counter to={12000} duration={1.2} /></div>
                <p className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8 md:mb-10">One-time payment</p>
                <a href="#" className="w-full py-4 bg-navy text-white text-[11px] font-bold uppercase tracking-widest text-center block hover:bg-indigo-700 hover:shadow-soft transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">Enroll Now</a>
              </div>
              <div className="flex-1 p-8 md:p-12">
                <span className="mono-label block mb-6 md:mb-8">Curriculum Payload</span>
                <div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-4">
                  {[
                    "6 Week Intensive Roadmap",
                    "Live Case Debriefs",
                    "MBB Mentor Calibration",
                    "Lifetime Alumni Network",
                    "300+ Solved Strategy Cases",
                    "MBB Digital Assessment Prep",
                    "Verified Registry Badge",
                    "Resume & Cover Letter Kit"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1 h-1 bg-indigo-500 shrink-0" />
                      <span className="text-[11px] md:text-[12px] font-bold text-navy uppercase tracking-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 12. FAQ - Minimal List */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={STAGGER_CONTAINER}
            className="mb-10 md:mb-16"
          >
            <motion.span variants={FADE_IN} className="mono-label block mb-2">FAQ</motion.span>
            <motion.h2 variants={FADE_IN} className="text-2xl md:text-3xl font-black uppercase tracking-tight text-navy">Common Questions</motion.h2>
          </motion.div>
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={STAGGER_CONTAINER}
            className="space-y-4"
          >
            {filteredFaqs.map((item, j) => (
              <motion.div key={j} variants={FADE_IN}>
                <FAQAccordion
                  item={item}
                  index={j}
                  isOpen={activeFaq === j}
                  onClick={() => setActiveFaq(activeFaq === j ? null : j)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 13. FINAL CTA */}
      <section className="py-20 md:py-32 bg-navy text-white text-center relative overflow-hidden px-6">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={STAGGER_CONTAINER}
          className="max-w-[800px] mx-auto"
        >
          <motion.h2 variants={FADE_IN} className="text-3xl md:text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-tight">Apply to the<br/><span className="text-white opacity-90">Strategy Floor</span></motion.h2>
          <motion.p variants={FADE_IN} className="text-white/60 text-xs md:text-sm font-medium mb-10 md:mb-12 prose-measure mx-auto leading-relaxed">Strictly limited to 40 candidates per cohort. Applications reviewed within 48 hours.</motion.p>
          <motion.a 
            variants={FADE_IN} 
            href="#pricing" 
            className="inline-block w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white text-navy font-black uppercase tracking-widest text-[10px] md:text-[11px] hover:bg-indigo-100 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Secure Your Spot
          </motion.a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

