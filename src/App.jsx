import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Video, 
  Play, 
  Layers, 
  Box, 
  Mail, 
  Instagram, 
  Linkedin, 
  ChevronRight, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Eye, 
  MessageSquare, 
  Sparkles, 
  Smartphone, 
  Monitor, 
  Check, 
  X, 
  ExternalLink
} from 'lucide-react';

// --- SISTEMA DE TRADUÇÃO ---
const translations = {
  pt: {
    nav: { home: "Início", expertise: "Expertise", services: "Serviços", contact: "Contato" },
    hero: { 
      subtitle: "Motion Designer & Senior Video Editor", 
      title1: "ALTO", title2: "PADRÃO", title3: "EM CADA", title4: "ENTREGA",
      desc: "+7 anos entregando projetos com consistência e alto padrão.",
      btnProjects: "Ver Trabalhos", btnQuote: "Orçamento Rápido"
    },
    stats: { projects: "Projetos Editados", years: "Anos de Exp.", views: "Views Geradas", coherence: "Coerência Visual" },
    marquee: { title: "TRABALHOS EM DESTAQUE", subtitle: "O carrossel é infinito. Arraste para explorar ou clique para reproduzir instantaneamente." },
    services: { 
      title: "O QUE FAÇO", 
      subtitle: "Você grava, envia-me, edito e entrego pronto para a publicação",
      vTitle: "Vídeos Verticais", vDesc: "Shorts, Tiktok, Criativos, Reels, VSLs",
      hTitle: "Vídeos Horizontais", hDesc: "Youtube, VSLs, Criativos",
      items: [
        "Cortes estratégicos",
        "Legendas dinâmicas legíveis",
        "Motion (Efeitos, animações, vida ao projeto)",
        "Sound design",
        "Correção de cor",
        "Inserções de imagens e vídeos full hd"
      ],
      btn: "Solicitar Orçamento"
    },
    tools: { 
      title: "Fluxo & Ferramentas", 
      subtitle: "Tecnologia avançada aplicada para garantir qualidade e rapidez na entrega.",
      ae: "Especialista em Motion Graphics e VFX complexos.",
      pr: "Domínio total em edição geral e organização de fluxos de alta procura.",
      ps: "Criação de assets e elementos visuais para composição.",
      fr: "Gestão de alterações e feedback para um processo ágil.",
      aiTitle: "Ferramentas de IA",
      aiDesc: "Estratégias de IA para maior produtividade."
    },
    philosophy: {
      title: "MINHA FILOSOFIA",
      subtitle: "Entrega de nível sénior focada em métricas e estética impecável.",
      q: { title: "QUALIDADE", desc: "Foco em qualidade máxima, valorizando cada detalhe para elevar o cliente e sua marca.", b1: "Excelência Visual", b2: "Valorização da Marca", b3: "Cuidado nos Detalhes" },
      c: { title: "COERÊNCIA", desc: "Respeito total à identidade visual da marca e consistência narrativa do início ao fim.", b1: "Alinhamento de Marca", b2: "Storytelling Visual", b3: "Design Systems" },
      a: { title: "AGILIDADE", desc: "Fluxo de trabalho otimizado para entregas rápidas sem comprometer a excelência do projeto.", b1: "Entrega em Alta Velocidade", b2: "Organização Profissional", b3: "Iteração Rápida" }
    },
    contact: { title1: "Vamos elevar o seu", title2: "conteúdo", desc: "Interessado em transformar as suas ideias em vídeos que prendem a atenção? Entre em contacto e vamos começar a produção.", btn: "Solicitar Orçamento" },
    footer: { senior: "MOTION & VÍDEO SÉNIOR" }
  },
  en: {
    nav: { home: "Home", expertise: "Expertise", services: "Services", contact: "Contact" },
    hero: { 
      subtitle: "Motion Designer & Senior Video Editor", 
      title1: "HIGH", title2: "STANDARD", title3: "IN EVERY", title4: "DELIVERY",
      desc: "+7 years delivering projects with consistency and high standard.",
      btnProjects: "View Works", btnQuote: "Quick Quote"
    },
    stats: { projects: "Projects Edited", years: "Years of Exp.", views: "Views Generated", coherence: "Visual Coherence" },
    marquee: { title: "FEATURED WORKS", subtitle: "The carousel is infinite. Drag to explore or click to play instantly." },
    services: { 
      title: "WHAT I DO", 
      subtitle: "You record, send it to me, I edit and deliver it ready for posting",
      vTitle: "Vertical Videos", vDesc: "Shorts, Tiktok, Creatives, Reels, VSLs",
      hTitle: "Horizontal Videos", hDesc: "Youtube, VSLs, Creatives",
      items: [
        "Strategic cuts",
        "Dynamic readable captions",
        "Motion (Effects, animations, life to the project)",
        "Sound design",
        "Color correction",
        "Full HD image and video inserts"
      ],
      btn: "Request Quote"
    },
    tools: { 
      title: "Workflow & Tools", 
      subtitle: "Advanced technology applied to ensure quality and speed in delivery.",
      ae: "Specialist in Motion Graphics and complex VFX.",
      pr: "Total mastery in general editing and workflow organization.",
      ps: "Creation of assets and visual elements for composition.",
      fr: "Management of changes and feedback for an agile process.",
      aiTitle: "AI Tools",
      aiDesc: "AI strategies for higher productivity."
    },
    philosophy: {
      title: "MY PHILOSOPHY",
      subtitle: "Senior level delivery focused on metrics and impeccable aesthetics.",
      q: { title: "QUALITY", desc: "Focus on maximum quality, valuing every detail to elevate the client and their brand.", b1: "Visual Excellence", b2: "Brand Valuation", b3: "Care for Details" },
      c: { title: "COHERENCE", desc: "Total respect for the brand's visual identity and narrative consistency from start to finish.", b1: "Brand Alignment", b2: "Visual Storytelling", b3: "Design Systems" },
      a: { title: "AGILITY", desc: "Workflow optimized for fast deliveries without compromising project excellence.", b1: "High-Speed Delivery", b2: "Pro Organization", b3: "Quick Iteration" }
    },
    contact: { title1: "Let's elevate your", title2: "content", desc: "Interested in turning your ideas into videos that grab attention? Contact me and let's start production.", btn: "Request Quote" },
    footer: { senior: "SENIOR MOTION & VIDEO" }
  }
};

// --- COMPONENTES AUXILIARES ---

const Reveal = ({ children, delay = 0, width = "w-full" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(ref.current);
      }
    }, { threshold: 0.15 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${width} transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const endValue = parseInt(end);
    const timer = setInterval(() => {
      start += Math.ceil(endValue / (duration / 10));
      if (start >= endValue) { setCount(endValue); clearInterval(timer); }
      else { setCount(start); }
    }, 10);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onHoverStart = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('.group') ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onHoverStart);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onHoverStart);
    };
  }, [isVisible]);

  if (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)) return null;

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-[#1F6FFF] rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${isClicking ? 0.5 : 1})`,
          opacity: isVisible ? 1 : 0
        }}
      />
      <div 
        className={`fixed top-0 left-0 rounded-full border border-[#1F6FFF]/40 pointer-events-none z-[9998] transition-all duration-300 ease-out
          ${isHovering ? 'w-16 h-16 bg-[#1F6FFF]/10 border-[#1F6FFF]/20' : 'w-8 h-8 bg-transparent'}`}
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovering ? '0 0 20px rgba(31,111,255,0.15)' : 'none'
        }}
      />
    </>
  );
};

// --- COMPONENTE PRINCIPAL ---

const App = () => {
  const [lang, setLang] = useState('pt');
  const [scrolled, setScrolled] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftInitial, setScrollLeftInitial] = useState(0);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang && browserLang.startsWith('pt')) setLang('pt');
    else setLang('en');
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseClips = useMemo(() => {
    const list = [
      { id: 'kraken1', youtubeId: "fDPjpksx614", title: "KRAKEN" },
      { id: 'kraken2', youtubeId: "qCIUzOX0oJE", title: "KRAKEN" },
      { id: 'ousy1', youtubeId: "kJc0046xYyo", title: "OUSY" },
      { id: 'ousy2', youtubeId: "4LbKnOoGruY", title: "OUSY" },
      { id: 'humanitarian', youtubeId: "GD_XRAZEd5E", title: "HUMANITARIAN" },
      { id: 'avant-garde', youtubeId: "G_FKGGW6ujw", title: "AVANT GARDE" },
      { id: 'obranding1', youtubeId: "vtfNTH9MawM", title: "OBRANDING" },
      { id: 'obranding2', youtubeId: "pA9yrnfwH50", title: "OBRANDING" },
      { id: 'v1', youtubeId: "elCPx5T6AVE", title: "EDU TOLEDO" },
      { id: 'v2', youtubeId: "vfTjNidmq7g", title: "EDU TOLEDO" },
      { id: 'v3', youtubeId: "zsKMR9hswjY", title: "EDU TOLEDO" },
      { id: 'v4', youtubeId: "78OIoWQg9Q8", title: "EDU TOLEDO" },
      { id: 'v5', youtubeId: "LyQCGRoMfYw", title: "EDU TOLEDO" },
      { id: 'v6', youtubeId: "I3Sw5aAatc4", title: "EDU TOLEDO" },
      { id: 'v7', youtubeId: "_Yx7T9qdGH4", title: "OBRANDING" },
      { id: 'v8', youtubeId: "g2rg-fIaGsk", title: "PHIBO" },
      { id: 'v9', youtubeId: "WYmY7ecSPC4", title: "ZENIT" },
      { id: 'v10', youtubeId: "RMAyYqN-cPM", title: "OBRANDING" },
      { id: 'v11', youtubeId: "F5TUPtFBkUo", title: "OBRANDING" },
      { id: 'v12', youtubeId: "FQqXCOBAwAM", title: "GRÁFICA MAMUTE" },
    ];
    return [...list].sort(() => Math.random() - 0.5);
  }, []);

  const clips = useMemo(() => [...baseClips, ...baseClips, ...baseClips], [baseClips]);

  useEffect(() => {
    if (marqueeRef.current) {
      const scrollWidth = marqueeRef.current.scrollWidth;
      marqueeRef.current.scrollLeft = scrollWidth / 3;
    }
  }, []);

  const t = translations[lang];
  const bulletPoint = <div className="w-1.5 h-1.5 bg-[#1F6FFF] rounded-full mt-1.5 flex-shrink-0" />;
  const contactLinks = { email: "higorpedrosaa@gmail.com", instagram: "https://www.instagram.com/igoor.motion/", linkedin: "https://www.linkedin.com/in/higorpedrosa1/" };

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setIsDragging(false);
    setStartX(e.pageX);
    setScrollLeftInitial(marqueeRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown || playingId) return;

    const x = e.pageX;
    const walk = (x - startX);

    if (Math.abs(walk) > 10) {
      setIsDragging(true);
      const container = marqueeRef.current;
      const newScrollLeft = scrollLeftInitial - (walk * 1.5);
      
      const totalWidth = container.scrollWidth;
      const sectionWidth = totalWidth / 3;

      if (newScrollLeft <= 0) {
        container.scrollLeft = sectionWidth;
        setStartX(e.pageX);
        setScrollLeftInitial(sectionWidth);
      } else if (newScrollLeft >= sectionWidth * 2) {
        container.scrollLeft = sectionWidth;
        setStartX(e.pageX);
        setScrollLeftInitial(sectionWidth);
      } else {
        container.scrollLeft = newScrollLeft;
      }
    }
  };

  const handleClipClick = (uniqueKey, e) => {
    if (isDragging) return;
    
    const element = e.currentTarget;
    const container = marqueeRef.current;
    
    setPlayingId(uniqueKey);

    setTimeout(() => {
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-body selection:bg-[#1F6FFF] selection:text-white overflow-x-hidden text-not-italic relative custom-cursor-area">
      
      <CustomCursor />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 bg-grid"></div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 px-4 md:px-6 py-4 flex flex-wrap justify-between items-center animate-nav-in ${scrolled ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2 text-white">
          <div className="w-8 h-8 bg-[#1F6FFF] rounded flex items-center justify-center transition-transform hover:rotate-12 cursor-pointer">
            <span className="text-white text-sm font-black">IP</span>
          </div>
          <span className="hidden sm:block uppercase tracking-widest text-sm font-bold font-display text-not-italic">IGOR PEDROSA</span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden lg:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
            <a href="#home" className="hover:text-[#1F6FFF] transition-all hover:scale-105">{t.nav.home}</a>
            <a href="#work" className="hover:text-[#1F6FFF] transition-all hover:scale-105">Portfolio</a>
            <a href="#expertise" className="hover:text-[#1F6FFF] transition-all hover:scale-105">{t.nav.expertise}</a>
            <a href="#services" className="hover:text-[#1F6FFF] transition-all hover:scale-105">{t.nav.services}</a>
            <a href="#contact" className="hover:text-[#1F6FFF] transition-all hover:scale-110 underline decoration-[#1F6FFF]/30 underline-offset-4">{t.nav.contact}</a>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border-l border-neutral-800 pl-4 md:pl-6">
            <button onClick={() => setLang('pt')} className={`transition-all hover:scale-110 ${lang === 'pt' ? 'text-[#1F6FFF]' : 'text-neutral-500 hover:text-white'}`}>PT</button>
            <span className="text-neutral-800">|</span>
            <button onClick={() => setLang('en')} className={`transition-all hover:scale-110 ${lang === 'en' ? 'text-[#1F6FFF]' : 'text-neutral-500 hover:text-white'}`}>EN</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 px-6">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#1F6FFF] rounded-full blur-[100px] md:blur-[140px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-neutral-100 rounded-full blur-[100px] md:blur-[140px]"></div>
        </div>

        <div className="container mx-auto z-10 text-center">
          <Reveal delay={200}><h2 className="text-[#1F6FFF] font-mono mb-4 md:mb-6 tracking-[0.2em] md:tracking-[0.4em] uppercase text-[10px] md:text-xs font-bold">{t.hero.subtitle}</h2></Reveal>
          <Reveal delay={400}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.1] text-white font-display text-not-italic uppercase">
              <span className="inline-block">{t.hero.title1}</span>{' '}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-[#1F6FFF]">{t.hero.title2}</span><br className="hidden md:block"/>
              <span className="inline-block">{t.hero.title3}</span>{' '}
              <span className="inline-block text-[#1F6FFF]">{t.hero.title4}</span>.
            </h1>
          </Reveal>
          <Reveal delay={600}>
            <p className="max-w-2xl mx-auto text-neutral-400 text-sm sm:text-base md:text-lg mb-10 font-light leading-relaxed">
              {t.hero.desc}
            </p>
          </Reveal>
          <Reveal delay={800}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 md:px-0">
              <a href="#work" className="bg-[#1F6FFF] text-white px-8 md:px-10 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(31,111,255,0.2)] uppercase tracking-wider text-[10px] md:text-xs text-center group">
                {t.hero.btnProjects} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="border border-neutral-700 px-8 md:px-10 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 hover:border-neutral-500 transition-all text-white transform hover:scale-105 active:scale-95 uppercase tracking-wider text-[10px] md:text-xs text-center">
                {t.hero.btnQuote} <Zap size={16} className="text-[#1F6FFF]" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-16 md:py-20 border-y border-neutral-900 bg-neutral-950/50 backdrop-blur-sm text-not-italic">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {Object.entries(t.stats).map(([key, label], idx) => {
            const ends = ["1000", "7", "15", "100"];
            const suffixes = ["+", "+", "M+", "%"];
            return (
              <Reveal key={key} delay={idx * 150}>
                <div className="transition-transform duration-500 hover:scale-110">
                  <div className="text-3xl md:text-5xl font-black mb-2 text-white font-display">
                    <CountUp end={ends[idx]} suffix={suffixes[idx]} />
                  </div>
                  <div className="text-neutral-500 text-[9px] md:text-[10px] uppercase tracking-widest font-bold">{label}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* TRABALHOS EM DESTAQUE */}
      <section id="work" className="relative z-10 py-24 md:py-32 bg-transparent overflow-hidden text-not-italic">
        <div className="container mx-auto px-6 text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase text-white font-display tracking-tight">{t.marquee.title}</h2>
              <div className="w-16 h-1 bg-[#1F6FFF] mx-auto mb-6 shadow-[0_0_15px_rgba(31,111,255,0.4)]"></div>
              <p className="text-neutral-500 font-light text-sm md:text-base font-body max-w-xl mx-auto">{t.marquee.subtitle}</p>
            </Reveal>
        </div>
        
        <Reveal delay={300}>
          <div 
            ref={marqueeRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`relative marquee-container w-full overflow-x-auto no-scrollbar mask-edges cursor-grab active:cursor-grabbing py-4 select-none
              ${playingId ? 'pause-animation' : ''}`}
          >
            <div className={`flex gap-6 md:gap-10 items-center whitespace-nowrap w-max
              ${!isDragging && !playingId ? 'animate-marquee-infinite' : ''}`}>
              {clips.map((clip, index) => {
                const uniqueKey = `${clip.id}-${index}`;
                const isPlaying = playingId === uniqueKey;

                return (
                  <div 
                    key={uniqueKey} 
                    data-key={uniqueKey}
                    onClick={(e) => !isPlaying && handleClipClick(uniqueKey, e)}
                    className={`relative flex-shrink-0 w-56 md:w-72 aspect-[9/16] rounded-[2.5rem] overflow-hidden border transition-all duration-500 group
                      ${isPlaying ? 'border-[#1F6FFF] scale-105 ring-4 ring-[#1F6FFF]/20 z-20 shadow-2xl' : 'border-neutral-800 bg-neutral-900 hover:border-[#1F6FFF]/50 hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(31,111,255,0.15)]'}`}
                  >
                    {isPlaying ? (
                      <div className="w-full h-full relative bg-black">
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${clip.youtubeId}?autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0&controls=1&enablejsapi=1`}
                          title={clip.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setPlayingId(null); }}
                          className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-[#1F6FFF] transition-all hover:scale-110"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <img 
                          src={`https://img.youtube.com/vi/${clip.youtubeId}/maxresdefault.jpg`} 
                          alt={clip.title} 
                          className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" 
                          onError={(e) => e.target.src = `https://img.youtube.com/vi/${clip.youtubeId}/0.jpg`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                        <div className="absolute bottom-8 left-8 right-8 text-left transition-transform duration-500 group-hover:translate-y-[-10px]">
                          <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-tight font-display">{clip.title}</h3>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="w-14 h-14 bg-[#1F6FFF] text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(31,111,255,0.4)] scale-75 group-hover:scale-100 transition-transform">
                            <Play fill="currentColor" size={24} />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="relative z-10 py-20 md:py-24 bg-neutral-950/40 backdrop-blur-sm text-not-italic">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-black mb-4 uppercase text-white font-display">{t.tools.title}</h2><p className="text-neutral-500 max-w-xl mx-auto font-light text-sm md:text-base font-body">{t.tools.subtitle}</p></div>
          </Reveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 text-left">
            {['After Effects', 'Premiere Pro', 'Photoshop', 'Frame.io'].map((tool, idx) => {
              const icons = [Layers, Video, Box, MessageSquare];
              const ToolIcon = icons[idx];
              const descs = [t.tools.ae, t.tools.pr, t.tools.ps, t.tools.fr];
              const floatDelays = ["0s", "0.5s", "1s", "1.5s"];
              
              return (
                <Reveal key={tool} delay={idx * 100}>
                  <div 
                    className="bg-neutral-900/40 p-8 md:p-10 h-full rounded-[2rem] md:rounded-[2.5rem] border border-neutral-800 transition-all duration-500 group shadow-sm hover:border-[#1F6FFF]/50 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(31,111,255,0.1)] animate-float"
                    style={{ animationDelay: floatDelays[idx] }}
                  >
                    <div className="w-12 h-12 bg-neutral-950 text-[#1F6FFF] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#1F6FFF] group-hover:text-white transition-all group-hover:scale-110 group-hover:rotate-6"><ToolIcon size={22} /></div>
                    <h3 className="text-lg font-bold mb-2 uppercase text-white font-display transition-colors group-hover:text-[#1F6FFF]">{tool}</h3>
                    <p className="text-neutral-500 text-sm font-light leading-relaxed font-body">{descs[idx]}</p>
                  </div>
                </Reveal>
              );
            })}
            
            <Reveal delay={400} width="lg:col-span-2">
              <div 
                className="bg-neutral-900/40 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-neutral-800 group transition-all duration-500 shadow-sm hover:border-[#1F6FFF]/50 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(31,111,255,0.1)] text-left animate-float"
                style={{ animationDelay: "2s" }}
              >
                <div className="w-12 h-12 bg-neutral-950 text-[#1F6FFF] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#1F6FFF] group-hover:text-white transition-all group-hover:scale-110 group-hover:-rotate-3"><Sparkles size={22} /></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div><h3 className="text-lg font-bold mb-2 uppercase text-white font-display transition-colors group-hover:text-[#1F6FFF]">{t.tools.aiTitle}</h3><p className="text-neutral-500 text-sm font-light max-w-sm font-body">{t.tools.aiDesc}</p></div>
                  <div className="flex flex-wrap gap-3 font-display">
                    {['NanoBanana', 'Veo3', 'Seedance', 'Kling'].map((tool) => (<span key={tool} className="px-4 py-1.5 bg-neutral-950 border border-neutral-800 rounded-full text-[10px] font-mono text-neutral-300 uppercase tracking-widest font-bold hover:bg-[#1F6FFF] hover:text-white hover:border-[#1F6FFF] transition-all hover:scale-110">{tool}</span>))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-20 md:py-24 bg-neutral-900/10 backdrop-blur-sm text-not-italic">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase text-white font-display">{t.services.title}</h2>
              <p className="text-neutral-500 font-light text-sm md:text-base tracking-wide max-w-xl mx-auto font-body">{t.services.subtitle}</p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[ 
              { icon: Smartphone, title: t.services.vTitle, desc: t.services.vDesc },
              { icon: Monitor, title: t.services.hTitle, desc: t.services.hDesc }
            ].map((s, i) => (
              <Reveal key={i} delay={i * 200}>
                <div className="bg-neutral-900/50 p-8 md:p-10 h-full rounded-[2rem] md:rounded-[2.5rem] border border-neutral-800 flex flex-col shadow-xl text-left hover:border-[#1F6FFF]/40 transition-all duration-500 transform hover:scale-[1.03]">
                  <div className="flex items-center gap-4 mb-8 md:mb-10 group">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-neutral-950 rounded-2xl flex items-center justify-center text-[#1F6FFF] border border-neutral-800 transition-transform group-hover:scale-110 group-hover:rotate-3"><s.icon size={24} /></div>
                    <div><h3 className="text-xl md:text-2xl font-black text-white uppercase font-display">{s.title}</h3><p className="text-[#1F6FFF] text-[10px] md:text-xs font-bold uppercase tracking-wider font-display">{s.desc}</p></div>
                  </div>
                  <ul className="space-y-4 md:space-y-5 mb-10 md:mb-12 flex-grow">
                    {t.services.items.map((item, idx) => (<li key={idx} className="flex items-start gap-3 md:gap-4 text-xs md:text-sm text-neutral-300 font-light font-body transition-colors hover:text-white"><Check size={18} className="text-[#1F6FFF] flex-shrink-0 mt-0.5" />{item}</li>))}
                  </ul>
                  <a href="#contact" className="w-full bg-[#1F6FFF] text-white py-4 rounded-full font-black uppercase text-[10px] md:text-xs text-center tracking-widest hover:bg-white hover:text-black transition-all font-display shadow-md transform hover:scale-105 active:scale-95">Solicitar Orçamento</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="relative z-10 py-20 md:py-24 bg-neutral-900/20 border-y border-neutral-900 backdrop-blur-sm text-not-italic">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-16 md:mb-20 text-center md:text-left"><h2 className="text-3xl md:text-4xl font-black mb-4 uppercase text-white font-display">{t.philosophy.title.split(' ')[0]} <span className="text-[#1F6FFF]">{t.philosophy.title.split(' ')[1]}</span></h2><p className="text-neutral-500 max-w-xl font-light text-sm md:text-base leading-relaxed font-body">{t.philosophy.subtitle}</p></div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {['q', 'c', 'a'].map((k, idx) => (
              <Reveal key={k} delay={idx * 150}>
                <div className="bg-neutral-950 p-8 md:p-12 h-full rounded-[2rem] md:rounded-[2.5rem] border border-neutral-800 hover:border-[#1F6FFF]/30 transition-all duration-500 shadow-2xl group text-left transform hover:scale-[1.03] hover:-translate-y-2">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-neutral-900 rounded-2xl flex items-center justify-center mb-8 md:mb-10 border border-neutral-800 group-hover:bg-[#1F6FFF] group-hover:text-white transition-all group-hover:scale-110 group-hover:rotate-6">{k === 'q' ? <ShieldCheck className="text-[#1F6FFF] group-hover:text-black" size={28} /> : k === 'c' ? <Eye className="text-[#1F6FFF] group-hover:text-black" size={28} /> : <Clock className="text-[#1F6FFF] group-hover:text-black" size={28} />}</div>
                  <h3 className="text-xl md:text-2xl font-black mb-4 md:mb-6 uppercase text-white tracking-widest font-display transition-colors group-hover:text-[#1F6FFF]">{t.philosophy[k].title}</h3>
                  <p className="text-neutral-500 text-sm font-light mb-6 md:mb-8 leading-relaxed font-body">{t.philosophy[k].desc}</p>
                  <ul className="space-y-4 font-display"><li className="flex items-start gap-4 text-xs font-mono text-neutral-300 font-bold tracking-wider">{bulletPoint} {t.philosophy[k].b1}</li><li className="flex items-start gap-4 text-xs font-mono text-neutral-300 font-bold tracking-wider">{bulletPoint} {t.philosophy[k].b2}</li><li className="flex items-start gap-4 text-xs font-mono text-neutral-300 font-bold tracking-wider">{bulletPoint} {t.philosophy[k].b3}</li></ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contact" className="relative z-10 py-24 md:py-32 bg-transparent text-not-italic">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="max-w-4xl mx-auto bg-neutral-900 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-20 border border-neutral-800 relative overflow-hidden group shadow-2xl transition-all duration-700 hover:border-[#1F6FFF]/30 hover:scale-[1.01]">
               <div className="absolute -top-10 -right-10 w-48 md:w-64 h-48 md:h-64 bg-[#1F6FFF]/5 rounded-full blur-3xl group-hover:bg-[#1F6FFF]/10 transition-all duration-700"></div>
              <div className="relative z-10 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter uppercase text-white leading-tight font-display transition-transform duration-500 group-hover:translate-x-2">{t.contact.title1}<br/><span className="text-[#1F6FFF]">{t.contact.title2}</span>?</h2>
                <p className="text-neutral-400 text-base md:text-lg mb-10 md:mb-12 max-w-lg font-light leading-relaxed font-body">{t.contact.desc}</p>
                <div className="flex flex-col gap-8 md:gap-10 font-display">
                  <a href={`mailto:${contactLinks.email}`} className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 text-base sm:text-xl md:text-3xl font-black hover:text-[#1F6FFF] transition-all group w-fit transform hover:scale-105 active:scale-95 origin-left">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-neutral-800 rounded-full flex items-center justify-center group-hover:bg-[#1F6FFF] group-hover:text-black transition-all transform group-hover:rotate-12 shadow-lg"><Mail size={20} /></div>
                    <span className="break-all sm:break-normal">{contactLinks.email}</span>
                  </a>
                  <div className="flex justify-center md:justify-start gap-6">
                    <a href={contactLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-[#1F6FFF] hover:text-white transition-all transform hover:-translate-y-2 hover:scale-125 shadow-xl active:scale-95"><Instagram size={20} /></a>
                    <a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-[#1F6FFF] hover:text-white transition-all transform hover:-translate-y-2 hover:scale-125 shadow-xl active:scale-95"><Linkedin size={20} /></a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 md:py-16 border-t border-neutral-900 bg-neutral-950/80 backdrop-blur-sm text-neutral-600 text-not-italic font-display">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-white">
          <div className="flex items-center gap-2 group cursor-pointer transition-transform hover:scale-110"><div className="w-4 h-4 bg-[#1F6FFF] rounded-sm transition-transform group-hover:rotate-45" />IGOR <span className="text-[#1F6FFF]">PEDROSA</span></div>
          <div className="text-center">© {new Date().getFullYear()} — {t.footer.senior}</div>
          <div className="flex gap-8 font-bold tracking-widest">
            <a href={contactLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#1F6FFF] transition-all hover:scale-125">Instagram</a>
            <a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#1F6FFF] transition-all hover:scale-125">LinkedIn</a>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@700;900&family=Inter:wght@300;400;500;700&display=swap');
        
        @keyframes navIn { from { opacity: 0; transform: translateY(-100%); } to { opacity: 1; transform: translateY(0); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33333333%); } }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-marquee-infinite { 
          animation: marquee 60s linear infinite; 
        }

        /* Removido o pause no hover para manter o dinamismo */

        /* Mantemos a trava de animação APENAS quando um vídeo está aberto para que o usuário possa assistir */
        .pause-animation .animate-marquee-infinite {
           animation-play-state: paused !important;
        }

        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        
        .animate-nav-in { animation: navIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .text-not-italic { font-style: normal !important; }
        .font-display { font-family: 'DM Sans', sans-serif !important; }
        .font-body { font-family: 'Inter', sans-serif !important; }
        
        html { scroll-behavior: smooth; font-family: 'Inter', sans-serif; background-color: #0a0a0a; }

        .bg-grid {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, #ffffff08 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff08 1px, transparent 1px);
          mask-image: radial-gradient(circle at center, black, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at center, black, transparent 80%);
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .cursor-grabbing { cursor: grabbing !important; }

        @media (hover: hover) and (pointer: fine) {
          .custom-cursor-area, .custom-cursor-area a, .custom-cursor-area button { cursor: none !important; }
        }
      `}</style>
    </div>
  );
};

export default App;