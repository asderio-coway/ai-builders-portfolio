import { motion, useSpring, useScroll, useTransform, AnimatePresence, LayoutGroup } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Menu, X, ArrowUpRight, CheckCircle2, Layout, Zap, Smartphone, BookOpen, Globe, MessageSquare, Search, Copy, Check, Mail } from "lucide-react";
import { CATEGORIES, MEMBERS, PROJECTS, Project, Member } from "./data";
import { SLIDE_STYLES, StyleItem } from "./styleData";

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

// --- Components ---

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .hover-trigger')) setIsHovering(true);
      else setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 w-6 h-6 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      animate={{ 
        x: pos.x - 12, 
        y: pos.y - 12,
        scale: isHovering ? 2.5 : 1,
      }}
      transition={{ type: "spring", damping: 25, stiffness: 250, mass: 0.5 }}
    />
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => setIsScrolled(latest > 50));
  }, [scrollY]);

  const navItems = [
    { name: 'Member', id: 'members' },
    { name: 'Assets', id: 'work' },
    { name: 'Curriculum', id: 'curriculum' },
    { name: 'Request', id: 'contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 py-4 flex justify-between items-center ${isScrolled ? 'bg-black/40 backdrop-blur-xl border-b border-white/10' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <div className="flex flex-col text-white">
            <span className="font-black tracking-tighter text-lg uppercase leading-none">AI Builders</span>
            <span className="text-[8px] uppercase tracking-[0.3em] font-bold opacity-50">Intelligence Hub</span>
          </div>
        </div>
        
        <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-black text-white">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="relative group transition-colors hover:text-blue-400">
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <button 
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
        >
          <div className="w-6 h-[2px] bg-white group-hover:w-8 transition-all" />
          <div className="w-8 h-[2px] bg-white" />
          <div className="w-4 h-[2px] bg-white group-hover:w-8 transition-all" />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-black/80 z-[200] flex flex-col p-12"
          >
            <button onClick={() => setIsOpen(false)} className="self-end text-white p-4 hover:scale-110 transition-transform">
              <X size={40} />
            </button>
            <div className="flex-1 flex flex-col justify-center gap-8 max-w-4xl mx-auto w-full">
              {navItems.map((item, i) => (
                <motion.a 
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className="text-6xl md:text-9xl font-black text-white hover:text-blue-500 transition-colors tracking-tighter flex items-center gap-6 group"
                >
                  <span className="text-2xl font-mono text-white/20 group-hover:text-blue-500/40">0{i+1}</span>
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMouse({
        x: (e.clientX / innerWidth - 0.5) * 2,
        y: (e.clientY / innerHeight - 0.5) * 2
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const springX = useSpring(mouse.x * 20, { damping: 20, stiffness: 100 });
  const springY = useSpring(mouse.y * -20, { damping: 20, stiffness: 100 });

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      {/* Background Neural Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e40af_0%,transparent_50%)]" />
        <div className="grid h-full w-full grid-cols-12 gap-px bg-white/5">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="aspect-square border-r border-b border-white/5" />
          ))}
        </div>
      </div>

      <motion.div 
        style={{ rotateX: springY, rotateY: springX, perspective: 1000 }}
        className="relative z-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] uppercase font-black tracking-[0.3em] mb-8 inline-block">
            Coway Future Intelligence
          </span>
          <h1 className="text-[12vw] font-black leading-none tracking-tighter text-white uppercase drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            AI BUILDERS
          </h1>
          <p className="text-lg md:text-2xl font-medium text-white/60 mt-6 max-w-2xl mx-auto tracking-tight">
            Building the next generation of Coway with 
            <span className="text-white italic"> 9 Architects of Intelligence.</span>
          </p>
        </motion.div>

        <div className="mt-12 flex justify-center gap-6">
          <a href="#work" className="px-8 py-4 bg-blue-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 hover:scale-105 transition-all shadow-xl shadow-blue-500/40">
            View Assets
          </a>
          <button className="px-8 py-4 bg-white/10 text-white font-black uppercase tracking-widest rounded-xl hover:bg-white/20 backdrop-blur-md transition-all border border-white/10">
            Learn More
          </button>
        </div>
      </motion.div>

      {/* Floating UI Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/4 right-[15%] hidden lg:block p-6 glass border border-white/10 rounded-2xl shadow-2xl text-white"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Efficiency Bot</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-32 bg-white/20 rounded-full" />
          <div className="h-2 w-24 bg-white/10 rounded-full" />
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-1/4 left-[15%] hidden lg:block p-6 glass border border-white/10 rounded-2xl shadow-2xl text-white"
      >
        <div className="flex items-center gap-3 mb-4">
          <Smartphone size={16} className="text-blue-400" />
          <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">IoCare+ AI</span>
        </div>
        <span className="text-xl font-black text-white">85% Match</span>
      </motion.div>
    </section>
  );
};

const MemberCard = ({ member }: { member: Member }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative h-[450px] bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover-trigger"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-600/20 transition-colors duration-500" />
      
      <div className="absolute top-8 left-8 z-20">
        <span className="px-3 py-1 bg-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full text-white">
          {member.role}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-white">
        <h4 className="text-3xl font-black tracking-tighter mb-1 uppercase text-white">
          {member.name}
        </h4>
        <p className="text-sm text-blue-400 font-bold mb-4 uppercase tracking-wider">{member.specialty}</p>
        
        <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="w-full h-px bg-white/10 my-4" />
          <p className="text-xs text-white/50 leading-relaxed uppercase tracking-widest">
            {member.team}
          </p>
        </div>
      </div>

      <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px] group-hover:bg-blue-500/40 transition-all" />
    </motion.div>
  );
};

// --- NotebookLM Guide Component ---
const NotebookLMGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("전체");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showSlides, setShowSlides] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<string | null>(null);

  const filterTags = ["전체", "모던", "레트로", "3D", "교육", "비즈니스", "아트"];

  const pipelineSteps = [
    { id: "01", title: "Deep Research", desc: "Web/Drive 실시간 검색 및 정보 수집", icon: <Search size={20} /> },
    { id: "02", title: "Source Ingestion", desc: "멀티 소스(PDF, URL, Audio) 데이터 정제 및 업로드", icon: <Layout size={20} /> },
    { id: "03", title: "Agentic Analysis", desc: "핵심 질문 자동 생성 및 심층 분석 수행", icon: <MessageSquare size={20} /> },
    { id: "04", title: "Asset Generation", desc: "음성 브리핑(Audio) & 슬라이드(Styles) 생성", icon: <Zap size={20} /> },
    { id: "05", title: "Local Sync", desc: "결과물 로컬 저장 및 공유 링크 생성", icon: <Globe size={20} /> }
  ];

  const cliCommands = [
    { cmd: "nlm research start \"AI builders trend\"", comment: "# 리서치 시작" },
    { cmd: "nlm source add [ID] --url [URL] --wait", comment: "# 자료 취합 및 대기" },
    { cmd: "nlm query [ID] \"핵심 인사이트 정리\"", comment: "# AI 심층 분석" },
    { cmd: "nlm studio create --type audio", comment: "# 음성 개요 생성" },
    { cmd: "nlm studio create --type slides --style bento", comment: "# 보고서 슬라이드 생성" }
  ];

  const setupSteps = [
    { 
      title: "Common Setup", 
      icon: <Zap size={16} />,
      steps: [
        { label: "Install via uv", cmd: "uv tool install notebooklm-mcp-cli" },
        { label: "Auto Configuration", cmd: "nlm setup" }
      ]
    },
    { 
      title: "Cursor / Claude", 
      icon: <BookOpen size={16} />,
      desc: "IDE의 MCP Settings에 서버 등록",
      steps: [
        { label: "Server Path", cmd: "notebooklm-mcp" },
        { label: "Auth Login", cmd: "nlm login" }
      ]
    },
    { 
      title: "Gemini CLI", 
      icon: <MessageSquare size={16} />,
      desc: "터미널 에이전트에 스킬 추가",
      steps: [
        { label: "Register Skill", cmd: "gemini mcp add nlm nlm" }
      ]
    }
  ];

  const filteredStyles = SLIDE_STYLES.filter(style => {
    const matchesSearch = style.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "전체" || style.category.includes(activeFilter) || style.title.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full space-y-24">
      {/* Agent Workflow Section */}
      <section className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 md:pt-12">
          <div className="lg:col-span-2 glass p-10 rounded-[40px] relative overflow-hidden">
            <div className="relative z-10 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                <span className="text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase">Active AI Skill</span>
              </div>
              <h3 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">NotebookLM<br/>Automation Agent</h3>
              <p className="text-white/60 text-xl max-w-2xl leading-relaxed font-medium">
                "리서치부터 최종 보고서까지." <br/>
                복잡한 수동 작업을 제거하고 AI 에이전트가 모든 프로세스를 주도하는 차세대 업무 자동화 스킬입니다.
              </p>
            </div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]" />
          </div>
          
          {/* CLI Console */}
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 font-mono text-xs overflow-hidden shadow-2xl relative group">
            <div className="flex gap-2 mb-6 border-b border-white/5 pb-4 text-white">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="ml-2 text-[10px] opacity-20 uppercase tracking-widest font-black">Skill Console</span>
            </div>
            <div className="space-y-4">
              {cliCommands.map((c, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-blue-400 opacity-40 italic">{c.comment}</div>
                  <div className="flex gap-3 text-white/80">
                    <span className="text-blue-500 font-black">$</span>
                    <span className="break-all">{c.cmd}</span>
                  </div>
                </div>
              ))}
              <motion.div 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-4 bg-blue-500 inline-block align-middle ml-1"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Pipeline Visualization */}
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 hidden lg:block" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10 text-white">
            {pipelineSteps.map((step, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={step.id} 
                className="glass p-8 rounded-[32px] border border-white/5 text-center space-y-4 hover:border-blue-500/30 transition-all group cursor-default"
              >
                <div className="w-14 h-14 bg-blue-600/10 text-blue-400 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                  {step.icon}
                </div>
                <div>
                  <span className="text-[10px] font-black text-blue-500/40 uppercase tracking-widest block mb-1">{step.id}</span>
                  <h5 className="font-black text-white text-sm uppercase tracking-tight group-hover:text-blue-400 transition-colors">{step.title}</h5>
                </div>
                <p className="text-[10px] opacity-40 leading-relaxed group-hover:opacity-60 transition-colors">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration & Setup Section */}
      <section className="space-y-12 border-t border-white/5 pt-12">
        <div className="flex justify-between items-end">
          <div className="text-white">
            <span className="text-blue-500 font-mono text-sm uppercase tracking-[0.3em] mb-4 block">Deployment & IDEs</span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              IDE <br /> INTEGRATION
            </h2>
          </div>
          <button 
            onClick={() => setShowSlides(!showSlides)}
            className="px-8 py-4 glass border border-blue-500/30 text-blue-400 font-black uppercase tracking-widest rounded-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center gap-3"
          >
            {showSlides ? "Close Preview" : "자세히 보기 (Slides)"}
            <BookOpen size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {setupSteps.map((group, i) => (
            <div key={i} className="glass p-8 rounded-[32px] border border-white/5 space-y-6 text-white">
              <div className="flex items-center gap-3 text-blue-400">
                {group.icon}
                <h5 className="font-black uppercase tracking-widest text-sm">{group.title}</h5>
              </div>
              {group.desc && <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold">{group.desc}</p>}
              <div className="space-y-4">
                {group.steps.map((s, j) => (
                  <div key={j} className="space-y-2">
                    <span className="text-[10px] opacity-30 font-bold uppercase">{s.label}</span>
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 font-mono text-[10px] opacity-70 break-all">
                      {s.cmd}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Slide Preview Section */}
        <AnimatePresence>
          {showSlides && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-12">
                {[
                  asset("assets/slides/slide_01.png"),
                  asset("assets/slides/slide_01.png"),
                  asset("assets/slides/slide_01.png"),
                  asset("assets/slides/slide_01.png"),
                  asset("assets/slides/slide_01.png"),
                  asset("assets/slides/slide_01.png")
                ].map((src, i) => (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    key={i} 
                    onClick={() => setSelectedSlide(src)}
                    className="aspect-video rounded-2xl overflow-hidden border border-white/10 glass group cursor-zoom-in relative"
                  >
                    <img 
                      src={src}
                      alt={`Slide ${i+1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors flex items-center justify-center">
                       <Search className="text-white opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100" size={32} />
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-center text-white">
                <p className="text-sm text-blue-400 font-bold uppercase tracking-widest">
                  이미지를 클릭하면 큰 화면으로 미리볼 수 있습니다.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slide Lightbox */}
        <AnimatePresence>
          {selectedSlide && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-20 bg-black/95 backdrop-blur-3xl"
              onClick={() => setSelectedSlide(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-6xl w-full h-auto aspect-video"
              >
                <img src={selectedSlide} alt="Slide Fullscreen" className="w-full h-full object-contain rounded-3xl border border-white/10 shadow-2xl" />
                <button className="absolute -top-16 right-0 text-white/60 hover:text-white transition-colors flex items-center gap-2 font-black uppercase text-xs tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                  Close <X size={20} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Style Library Section */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-t border-white/5 pt-12">
          <div className="text-white">
            <span className="text-blue-500 font-mono text-sm uppercase tracking-[0.3em] mb-4 block">Intelligence Assets</span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              STYLE <br /> LIBRARY
            </h2>
            <p className="opacity-40 text-sm mt-4 uppercase tracking-widest font-bold">
              에이전트가 보고서 성격에 맞춰 자동 선택하는 49가지 프리미엄 스타일 큐레이션
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-4 p-2 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10">
            {filterTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${
                  activeFilter === (tag === "전체" ? "all" : tag) ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6 sticky top-0 z-30 pt-6 bg-zinc-950/95 backdrop-blur-2xl -mx-8 px-8 border-b border-white/5 pb-8">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
            <input 
              type="text" 
              placeholder="스타일 라이브러리 검색... (예: 벤토, 사이버, 클레이)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 pb-24">
          {filteredStyles.map((style) => (
            <motion.article 
              layout
              key={style.num}
              className="glass rounded-[40px] overflow-hidden border border-white/10 hover:border-white/20 transition-all group"
            >
              <div className="flex flex-col">
                <div className="p-10 pb-6">
                  <div className="flex items-center gap-6 mb-8 text-white">
                    <span className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-lg shrink-0 shadow-lg shadow-blue-500/20">
                      {style.num < 10 ? `0${style.num}` : style.num}
                    </span>
                    <h4 className="text-3xl font-black tracking-tight uppercase truncate">{style.title}</h4>
                  </div>
                  
                  <div className="p-6 bg-black/40 rounded-3xl border border-white/5 relative group/prompt text-white">
                    <span className="text-[10px] uppercase text-blue-500 font-black tracking-widest block mb-3">Agent Prompt Configuration</span>
                    <code className="text-sm text-white/80 block leading-relaxed font-mono break-words pr-12">
                      {style.prompt}
                    </code>
                    <button 
                      onClick={() => handleCopy(style.prompt, style.num)}
                      className="absolute top-6 right-6 p-3 bg-white/5 rounded-xl hover:bg-blue-600 transition-all text-white shadow-xl"
                    >
                      {copiedId === style.num ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="px-10 pb-12 max-w-6xl mx-auto w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {style.images.map((img, i) => (
                      <div 
                        key={i} 
                        onClick={() => handleCopy(style.prompt, style.num)}
                        className="relative aspect-[16/10] rounded-[28px] overflow-hidden cursor-pointer group/img border border-white/10 shadow-xl bg-white/5"
                      >
                        <div className="absolute inset-0 bg-blue-600/0 group-hover/img:bg-blue-600/20 transition-all z-10 flex items-center justify-center">
                          <div className="bg-black/60 backdrop-blur-md p-3 rounded-full opacity-0 group-hover/img:opacity-100 transition-all scale-50 group-hover/img:scale-100">
                            <Copy className="text-white" size={28} />
                          </div>
                        </div>
                        <img
                          src={asset(img)}
                          alt={style.title}
                          className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover/img:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- WQA Dashboard Component ---
const WQADashboard = () => {
  const weeks = [
    { week: "Week 1", title: "요구사항 정리", goal: "시스템이 무엇을 보여줘야 하는지 정리", output: "운영 목표 1장, 대상 메일 라벨 기준" },
    { week: "Week 2", title: "데이터 구조 설계", goal: "메일 내용을 어떤 표 구조로 저장할지 정리", output: "Google Sheets 컬럼 정의서, 상태/단계 표준 목록" },
    { week: "Week 3", title: "메일 수집 자동화", goal: "Gmail 메일을 자동으로 읽을 수 있게 만들기", output: "메일 라벨 운영 규칙, 자동 실행 설정" },
    { week: "Week 4", title: "분류 및 적재", goal: "AI 분류 로직 연결 및 시트 저장", output: "AI 분류 알고리즘, 시트 적재 스크립트" },
    { week: "Week 5", title: "대시보드 화면 개발", goal: "저장된 데이터를 보기 쉽게 시각화", output: "KPI 카드, 프로젝트 목록 화면" },
    { week: "Week 6", title: "서버 배포", goal: "외부에서도 접속 가능한 URL 구축", output: "GitHub Repo, Cloud Worker 배포" },
    { week: "Week 7", title: "테스트와 안정화", goal: "실제 운영 데이터로 무결성 검증", output: "테스트 결과표, 오류 수정 내역" },
    { week: "Week 8", title: "운영 전환", goal: "팀원 교육 및 실제 업무 적용", output: "사용자 가이드, 운영 매뉴얼" },
  ];

  return (
    <div className="w-full space-y-16 pt-8 md:pt-12">
      {/* Hero Section with Image */}
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <span className="text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4 block">Real-time Monitoring</span>
            <h3 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">WQA 인증현황<br/>모니터링 대시보드</h3>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl">
              담당자가 주고받은 수천 통의 이메일을 AI가 실시간으로 분석하여, 현재 인증 진행 상태를 한눈에 볼 수 있는 자동화 게시판으로 전환합니다.
            </p>
            <div className="mt-10 flex gap-4">
              <a href="https://coway-wqa-monitor-dashboard.asderio.workers.dev/" target="_blank" className="px-8 py-4 bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-blue-500 transition-all flex items-center gap-3">
                Live Demo <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "현황 파악 속도", value: "10x", desc: "기존 수동 확인 대비" },
              { label: "정보 누락률", value: "0%", desc: "AI 자동 아카이빙" },
              { label: "운영 효율", value: "300%", desc: "보고 자료 자동화" },
              { label: "커뮤니케이션", value: "Real-time", desc: "실시간 대시보드" }
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/5 text-white">
                <span className="block text-3xl font-black">{stat.value}</span>
                <span className="text-[10px] uppercase text-blue-500 font-black tracking-widest mt-1 block">{stat.label}</span>
                <p className="text-[10px] text-white/30 mt-2">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Preview Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[16/9] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10 group"
        >
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000" 
            alt="WQA Dashboard Preview" 
            className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
        </motion.div>
      </div>

      {/* System Concept */}
      <section className="space-y-8 text-white">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <h4 className="text-sm font-black tracking-[0.2em] opacity-40 uppercase">How it works</h4>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "01", icon: <Mail />, title: "Gmail", desc: "편지가 들어오는 우체통 (WQA 이메일 수신)" },
            { step: "02", icon: <Zap />, title: "AI Agent", desc: "우체통을 확인하고 내용을 분석하는 비서" },
            { step: "03", icon: <Layout />, title: "Google Sheets", desc: "분석된 결과를 일목요연하게 정리하는 노트" },
            { step: "04", icon: <Globe />, title: "Dashboard", desc: "정리 노트를 어디서든 볼 수 있는 디지털 게시판" }
          ].map((item, i) => (
            <div key={i} className="p-8 glass rounded-[32px] border border-white/5 text-center space-y-4">
              <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto">
                {item.icon}
              </div>
              <h5 className="font-black tracking-tight">{item.title}</h5>
              <p className="text-xs opacity-40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="space-y-12">
        <div className="text-white">
          <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em] mb-4 block">Deployment Roadmap</span>
          <h3 className="text-4xl font-black uppercase tracking-tighter">8-Week Execution Plan</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
          {weeks.map((w, i) => (
            <div key={i} className="group p-8 bg-white/5 rounded-[32px] border border-white/5 hover:border-blue-500/30 transition-all">
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black text-white/40 uppercase tracking-widest">{w.week}</span>
                <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-white/20 group-hover:text-blue-500 group-hover:border-blue-500/50 transition-colors">0{i+1}</span>
              </div>
              <h5 className="text-xl font-black mb-2 uppercase tracking-tight">{w.title}</h5>
              <p className="text-sm opacity-60 mb-4">{w.goal}</p>
              <div className="pt-4 border-t border-white/5">
                <span className="text-[10px] uppercase font-bold text-blue-500 tracking-widest block mb-1">Deliverables</span>
                <p className="text-xs opacity-40">{w.output}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conclusion */}
      <div className="p-12 bg-blue-600 rounded-[40px] text-center space-y-6 text-white">
        <h4 className="text-2xl font-black uppercase tracking-tight">Ready for Stability</h4>
        <p className="opacity-80 max-w-2xl mx-auto leading-relaxed">
          이 프로젝트는 메일 확인 시간을 획기적으로 줄여줄 뿐만 아니라, 중요한 인증 지연 건을 조기에 발견하여 사업 리스크를 최소화합니다.
          현재 1단계 구조로 안정적인 운영을 시작할 준비가 되었습니다.
        </p>
      </div>
    </div>
  );
};

// --- Codepop Detail ---
const CodepopDetail = () => {
  return (
    <div className="w-full space-y-16 pt-8 md:pt-12">
      {/* Hero */}
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase">macOS Developer Tool · Open Source · Free</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/40 uppercase tracking-widest">✏️ 홍민재</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/40 uppercase tracking-widest">🏠 본사 AI Builders</span>
            </div>
            <h3 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight mt-4">드래그하고<br/>이해하라.</h3>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl">
              AI로 코드를 빠르게 만드는 시대지만, 정작 <em className="text-white/80 not-italic font-bold">모르는 코드를 읽고 이해하는 일</em>은 여전히 번거롭습니다. 코드를 선택하고 ⌘⇧E를 누르는 순간, AI가 요약·핵심·라인별 해설을 팝업으로 띄웁니다. 브라우저·VS Code·터미널·Slack 어디서나, 컨텍스트 스위칭 없이.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="https://github.com/oxm55522/codepop" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-blue-500 transition-all flex items-center gap-3">
                GitHub <ArrowUpRight size={18} />
              </a>
              <a href="https://github.com/oxm55522/codepop/releases/latest" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-all border border-white/10 flex items-center gap-3">
                DMG 다운로드 <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {([
              { label: "운영 비용", value: "$0", desc: "Gemini 무료 티어" },
              { label: "API 한도", value: "1500/일", desc: "무제한 캐시 히트" },
              { label: "동작 환경", value: "Any App", desc: "시스템 전역 단축키" },
              { label: "개발 방식", value: "AI First", desc: "Claude Code로 완성" },
            ] as const).map((stat, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/5 text-white">
                <span className="block text-3xl font-black">{stat.value}</span>
                <span className="text-[10px] uppercase text-blue-500 font-black tracking-widest mt-1 block">{stat.label}</span>
                <p className="text-[10px] text-white/30 mt-2">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10 bg-zinc-900 flex flex-col items-center justify-center p-8 md:p-16 gap-6"
        >
          <img
            src={asset('assets/codepop_screenshot.png')}
            alt="Codepop 팝업 스크린샷"
            className="max-w-md w-full rounded-2xl shadow-2xl border border-white/10"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800'; }}
          />
          <div className="flex items-center gap-3 text-white/30 text-xs font-mono uppercase tracking-widest">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            코드 드래그 → ⌘⇧E → 팝업 즉시 출현
          </div>
        </motion.div>
      </div>

      {/* Before / After */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <h4 className="text-sm font-black tracking-[0.2em] text-white/40 uppercase">Before / After</h4>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[32px] border border-red-500/20 bg-red-500/5 space-y-5 text-white"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-red-500/20 text-red-400 rounded-xl flex items-center justify-center text-xs font-black">✗</span>
              <span className="text-[10px] uppercase font-black tracking-[0.3em] text-red-400">Before</span>
            </div>
            <h5 className="text-xl font-black">흐름이 끊기는 코드 읽기</h5>
            <div className="space-y-3">
              {[
                "부분 코드를 이해하려면 복사 → 챗봇 탭 전환 → 붙여넣기 → 다시 복귀",
                "매번 컨텍스트를 잃고 다시 읽어야 하는 반복 작업",
                "비개발자에겐 코드 자체가 벽 — 읽어도 무슨 의미인지 막막함",
                "IDE 밖(슬랙·브라우저·PDF)의 코드는 분석 도구가 없음",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-white/50">
                  <span className="text-red-400 mt-0.5 shrink-0">—</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[32px] border border-green-500/20 bg-green-500/5 space-y-5 text-white"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center text-xs font-black">✓</span>
              <span className="text-[10px] uppercase font-black tracking-[0.3em] text-green-400">After</span>
            </div>
            <h5 className="text-xl font-black">맥락 이탈 제로, 즉시 이해</h5>
            <div className="space-y-3">
              {[
                "어떤 앱에서든 코드 선택 + ⌘⇧E 한 번으로 그 자리에서 즉시 설명",
                "요약·핵심 포인트·라인별 해설을 커서 옆 팝업으로 확인",
                "비개발자도 코드를 이해 가능 — 한국어·영어 전환 지원",
                "동일 코드 재선택 시 캐시 응답 → 속도 무한대, API 비용 $0",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-white/50">
                  <span className="text-green-400 mt-0.5 shrink-0">+</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="space-y-8 text-white">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <h4 className="text-sm font-black tracking-[0.2em] opacity-40 uppercase">How it works</h4>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {([
            { step: "01", icon: <Search size={20} />, title: "어디서나 드래그", desc: "브라우저·IDE·Slack·PDF 등 텍스트가 있는 곳이면 어디서나 코드를 드래그 선택합니다." },
            { step: "02", icon: <Zap size={20} />, title: "⌘⇧E 단축키", desc: "시스템 전역 단축키 하나. 앱 전환 없이, 탭 이동 없이. 지금 보고 있는 화면에서 바로 실행됩니다." },
            { step: "03", icon: <MessageSquare size={20} />, title: "AI 팝업 즉시 출현", desc: "요약 · 핵심 포인트 · 우려 사항 · 라인별 해설이 커서 옆 팝업으로 즉시 표시됩니다." },
          ] as const).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 glass rounded-[32px] border border-white/5 text-center space-y-4 hover:border-blue-500/30 transition-all group"
            >
              <div className="w-14 h-14 bg-blue-600/10 text-blue-400 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-blue-600 group-hover:text-white transition-all">
                {item.icon}
              </div>
              <span className="text-[10px] font-black text-blue-500/40 uppercase tracking-widest block">{item.step}</span>
              <h5 className="font-black tracking-tight text-lg">{item.title}</h5>
              <p className="text-xs opacity-40 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Development Journey */}
      <section className="space-y-8 border-t border-white/5 pt-12">
        <div className="text-white">
          <span className="text-blue-500 font-mono text-sm uppercase tracking-[0.3em] mb-4 block">Build Process</span>
          <h3 className="text-4xl font-black uppercase tracking-tighter">개발 여정</h3>
          <p className="text-white/40 text-sm mt-2 uppercase tracking-widest font-bold">Claude Code와의 대화만으로 — 기획부터 배포까지</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
          {([
            {
              phase: "Phase 1",
              title: "컨셉 프로토타입",
              tool: "Hammerspoon",
              desc: "Lua 스크립트 기반 Hammerspoon으로 '단축키 → 선택 텍스트 → AI 팝업' 개념 자체가 동작하는지 먼저 검증했습니다.",
              highlight: "아이디어 → 동작하는 프로토타입을 가장 빠르게",
              color: "blue",
            },
            {
              phase: "Phase 2",
              title: "Tauri 앱으로 전환",
              tool: "Rust + Tauri v2",
              desc: "\"누구나 받아서 바로 쓰게 만들자\"는 목표로 네이티브 macOS 앱으로 전환. 단축키 캡처 → 선택 텍스트 읽기 → 팝업 → Gemini 연동을 단계별 구현했습니다.",
              highlight: "프로토타입 검증 후 확장 — 순서가 핵심",
              color: "indigo",
            },
            {
              phase: "Phase 3",
              title: "직접 써보며 개선",
              tool: "Dog-fooding",
              desc: "실제로 매일 쓰면서 개선: 설정창(API 키·모델·단축키), 시스템 트레이 아이콘, 시스템 언어 자동 감지, SHA256 캐시로 반복 호출 제거, 여러 버그 수정.",
              highlight: "쓰면서 발견한 불편함을 그날 바로 해결",
              color: "violet",
            },
            {
              phase: "Phase 4",
              title: "패키징 & 배포",
              tool: "DMG · GitHub Release",
              desc: "앱 아이콘 디자인, README 작성, DMG 빌드 자동화, GitHub Releases를 통한 공개 배포까지 완성. MIT 오픈소스.",
              highlight: "기획부터 배포까지 — Claude Code와 며칠 만에 완성",
              color: "blue",
            },
          ] as const).map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group p-8 bg-white/5 rounded-[32px] border border-white/5 hover:border-blue-500/30 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-600/10 text-blue-400 rounded-full text-[10px] font-black tracking-widest uppercase">{phase.phase}</span>
                <span className="px-3 py-1 bg-white/5 text-white/30 rounded-full text-[10px] font-mono">{phase.tool}</span>
              </div>
              <h5 className="text-xl font-black uppercase tracking-tight">{phase.title}</h5>
              <p className="text-sm text-white/50 leading-relaxed">{phase.desc}</p>
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-blue-400 font-bold leading-relaxed">{phase.highlight}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Output Preview */}
      <section className="space-y-8">
        <div className="text-white">
          <span className="text-blue-500 font-mono text-sm uppercase tracking-[0.3em] mb-4 block">AI Output Structure</span>
          <h3 className="text-4xl font-black uppercase tracking-tighter">팝업 응답 구조</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([
            {
              badge: 'SUMMARY',
              title: '요약',
              content: 'SHA256 해시 기반 캐시 조회 함수. 선택된 코드의 해시를 계산하여 로컬 캐시와 대조하고, 히트 시 API 호출 없이 즉시 결과를 반환합니다.',
            },
            {
              badge: 'KEY POINTS',
              title: '핵심 포인트',
              content: '• 동일 코드 재선택 → API 호출 없이 즉시 응답\n• ~/.codepop/cache/ 로컬 저장\n• Gemini 2.5 Flash Lite 기본 (비용 $0)\n• 한국어·영어 원터치 전환',
            },
            {
              badge: 'LINE-BY-LINE',
              title: '라인별 해설',
              content: 'L1 — SHA256 해시 계산 (코드 → 고유 ID)\nL4 — 로컬 캐시 파일 경로 생성\nL7 — 캐시 히트 여부 판단\nL11 — 신규 분석 결과를 캐시에 저장',
            },
          ] as const).map((item, i) => (
            <div key={i} className="glass p-8 rounded-[32px] border border-white/10 text-white space-y-4">
              <span className="text-[10px] font-black text-blue-500 tracking-widest uppercase">{item.badge}</span>
              <h5 className="font-black text-lg">{item.title}</h5>
              <p className="text-sm text-white/50 leading-relaxed whitespace-pre-line font-mono">{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips & Cautions */}
      <section className="space-y-6 border-t border-white/5 pt-12">
        <div className="text-white">
          <span className="text-blue-500 font-mono text-sm uppercase tracking-[0.3em] mb-4 block">Lessons Learned</span>
          <h3 className="text-4xl font-black uppercase tracking-tighter">활용 팁 & 주의사항</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-[32px] border border-green-500/20 bg-green-500/5 space-y-5 text-white">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center text-sm">✅</span>
              <h5 className="font-black text-lg">효과적이었던 것</h5>
            </div>
            <div className="space-y-4">
              {([
                { title: "작게 쪼개고 매번 검증", desc: "\"Phase 0부터\" 식으로 단계를 나눠 직접 써보고 피드백 → 품질이 크게 올라감. 한 번에 크게 만들지 않는 것이 핵심." },
                { title: "AI에게 롤을 주기", desc: "\"macOS 네이티브 앱 전문가\"처럼 맥락을 잡아주면 Claude Code가 훨씬 더 정확한 코드를 생성했습니다." },
                { title: "직접 쓰면서 개선", desc: "매일 실제로 사용하면 불편함이 명확하게 보입니다. 그것을 즉시 이슈로 만들어 수정하는 사이클이 가장 빨랐습니다." },
              ] as const).map((tip, i) => (
                <div key={i} className="space-y-1">
                  <span className="font-black text-sm text-green-300">{tip.title}</span>
                  <p className="text-xs text-white/40 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 rounded-[32px] border border-amber-500/20 bg-amber-500/5 space-y-5 text-white">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center text-sm">⚠️</span>
              <h5 className="font-black text-lg">이렇게 하면 안 돼요</h5>
            </div>
            <div className="space-y-4">
              {([
                { title: "API 키 노출 절대 금지", desc: "Gemini API 키·토큰은 저장소에 절대 포함시키면 안 됩니다. .gitignore 설정 필수, 노출 즉시 폐기 후 재발급." },
                { title: "한 번에 너무 큰 단계 건너뛰기", desc: "동작 확인 없이 다음 단계로 넘어가면 버그 원인 추적이 어려워집니다. 반드시 작동하는 상태를 기준점으로." },
                { title: "AI 생성 코드 무검증 실행", desc: "특히 시스템 권한·파일 접근 코드는 반드시 내용을 확인 후 실행. 보안에 민감한 코드는 직접 리뷰 필수." },
              ] as const).map((tip, i) => (
                <div key={i} className="space-y-1">
                  <span className="font-black text-sm text-amber-300">{tip.title}</span>
                  <p className="text-xs text-white/40 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-8 border-t border-white/5 pt-12">
        <div className="text-white">
          <span className="text-blue-500 font-mono text-sm uppercase tracking-[0.3em] mb-4 block">Technology</span>
          <h3 className="text-4xl font-black uppercase tracking-tighter">Tech Stack</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
          {([
            { name: 'Rust', pct: '46%', desc: '코어 로직 · 시스템 이벤트 · SHA256 캐싱', gradient: 'from-orange-600 to-red-700' },
            { name: 'HTML / JS', pct: '54%', desc: '팝업 UI · 라인 참조 · 언어 토글', gradient: 'from-blue-600 to-cyan-600' },
            { name: 'Tauri', pct: 'Framework', desc: '웹뷰 + 네이티브 브리지', gradient: 'from-yellow-600 to-amber-600' },
            { name: 'Gemini 2.5', pct: 'AI Engine', desc: 'Flash Lite / Flash / Pro 선택형', gradient: 'from-green-600 to-emerald-600' },
          ] as const).map((tech, i) => (
            <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-3">
              <div className={`h-1 rounded-full bg-gradient-to-r ${tech.gradient}`} />
              <div>
                <span className="font-black text-lg">{tech.name}</span>
                <span className="block text-[10px] text-blue-500 font-black tracking-widest mt-1">{tech.pct}</span>
              </div>
              <p className="text-[10px] text-white/30 leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Install */}
      <section className="space-y-8 border-t border-white/5 pt-12">
        <div className="text-white">
          <span className="text-blue-500 font-mono text-sm uppercase tracking-[0.3em] mb-4 block">Quick Start</span>
          <h3 className="text-4xl font-black uppercase tracking-tighter">설치 3단계</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
          {([
            { step: '01', title: 'DMG 설치', cmd: 'Codepop_0.1.0_aarch64.dmg', desc: 'Releases 페이지에서 다운로드 후 Applications 폴더로 드래그. Apple Silicon(M1+) 전용.' },
            { step: '02', title: 'API 키 발급', cmd: 'aistudio.google.com/apikey', desc: 'Google AI Studio에서 무료 Gemini API 키 발급. 카드 등록 불필요. 1500 req/day 무료.' },
            { step: '03', title: '권한 허용 후 사용', cmd: '⌘⇧E 로 즉시 사용', desc: '앱 실행 후 시스템 환경설정 → 손쉬운 사용 권한 허용. 이후 어디서나 단축키 하나로 동작.' },
          ] as const).map((s, i) => (
            <div key={i} className="p-8 bg-white/5 rounded-[32px] border border-white/5 space-y-4">
              <span className="text-4xl font-black opacity-10">{s.step}</span>
              <h5 className="font-black uppercase tracking-tight">{s.title}</h5>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 font-mono text-[11px] text-white/60 break-all">{s.cmd}</div>
              <p className="text-xs opacity-40 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="p-12 bg-blue-600 rounded-[40px] text-center space-y-6 text-white">
        <h4 className="text-2xl font-black uppercase tracking-tight">Built entirely with Claude Code</h4>
        <p className="opacity-80 max-w-2xl mx-auto leading-relaxed">
          기획부터 구현·배포까지 AI 코딩 에이전트(Claude Code)와의 대화만으로 완성된 실제 macOS 앱입니다. MIT 라이선스 오픈소스로 누구나 사용·기여할 수 있습니다.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="https://github.com/oxm55522/codepop" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-blue-600 font-black uppercase tracking-widest rounded-2xl hover:bg-blue-50 transition-all flex items-center gap-3">
            GitHub 바로가기 <ArrowUpRight size={18} />
          </a>
          <a href="https://github.com/oxm55522/codepop/releases/latest" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-all border border-white/20 flex items-center gap-3">
            최신 릴리즈 다운로드 <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

// --- Smarthome Newsletter Detail ---
const SmarthomeNewsletterDetail = () => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyPrompt = (text: string, idx: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  };

  const prompts = [
    {
      label: '기사 요약 프롬프트',
      text: `다음 스마트홈 관련 기사를 분석하고, 아래 형식의 JSON으로 반환해줘.
- title_ko: 독자가 바로 이해할 수 있는 한국어 제목 (50자 이내)
- summary_ko: 핵심 내용을 2~3문장으로 요약. 숫자·데이터 포함. 코웨이 IoT 기획 담당자 관점에서 업계 시사점까지.
- category: ai-routine | ecosystem | wellness | standard-regulation | business-model | energy 중 하나
- image_query: Unsplash 검색에 쓸 영문 키워드 3~5단어`,
    },
    {
      label: '3줄 요약(Glance) 생성',
      text: `이번 호의 기사 6건을 바탕으로 독자에게 전달할 핵심 메시지 3가지를 한국어로 작성해줘.
각 문장은 50자 이내로, 구체적인 숫자나 사실 근거를 포함할 것.
배경 지식이 없는 독자도 이해할 수 있도록 산업 용어는 괄호 안에 간단히 설명을 추가해줘.`,
    },
    {
      label: '이슈 타이틀 생성',
      text: `아래 기사 요약들을 읽고, 이번 호 뉴스레터의 제목을 만들어줘.
조건: 40자 이내, 가장 임팩트 있는 트렌드 2가지를 연결, 숫자 또는 구체적 사례 포함.
예시: "아마존 AI 스피커가 무료로 풀리고, 집 안 기기 연결 범위가 보안·카메라까지 넓어졌다"`,
    },
  ];

  const steps = [
    {
      phase: 'Step 1',
      title: 'RSS 수집',
      tool: 'discover.mjs',
      desc: '100여 개의 스마트홈·테크 미디어 RSS 피드를 자동 크롤링. 게재일 기준으로 필터링하고 중복 URL을 제거해 이번 호에 담을 후보 기사 풀을 구성한다.',
      highlight: '피드 100+ · 중복 자동 제거 · 발행일 기준 필터',
    },
    {
      phase: 'Step 2',
      title: 'AI 요약 & 분류',
      tool: 'summarize.mjs (Claude API)',
      desc: '후보 기사 각각을 Claude에 전달해 한국어 제목·2문장 요약·카테고리를 생성. 코웨이 IoT 기획 담당자 관점에서 업계 시사점을 포함하는 프롬프트로 단순 번역을 넘어 인사이트를 추출한다.',
      highlight: '6건 선별 → 제목·요약·카테고리·Glance 자동 생성',
    },
    {
      phase: 'Step 3',
      title: '이미지 자동 매칭',
      tool: 'fetch-images.mjs (Unsplash API)',
      desc: '각 기사의 og:image를 1차 시도, 없으면 Unsplash API로 image_query 검색, 그것도 실패하면 그라데이션 폴백. 저작권 크레딧을 JSON에 자동 기록한다.',
      highlight: '3단계 폴백 · 저작권 크레딧 자동 기록 · Demo 50 req/h 무료',
    },
    {
      phase: 'Step 4',
      title: 'HTML 렌더링',
      tool: 'render.mjs (Tailwind CSS)',
      desc: '계절별 컬러 테마(봄·여름·가을·겨울)와 A/B Variant를 지원하는 템플릿으로 이슈 상세 페이지와 아카이브 인덱스를 동시 생성. 데이터만 바꾸면 항상 동일한 출력이 나오는 결정론적 파이프라인.',
      highlight: '계절 테마 자동 적용 · 이슈 페이지 + 인덱스 동시 생성',
    },
    {
      phase: 'Step 5',
      title: 'GitHub Pages 배포',
      tool: 'publish-pages.sh',
      desc: 'dist/ 폴더를 gh-pages 브랜치에 force-push하여 즉시 배포. 서버·도메인·CDN 비용 전혀 없이 전 세계에 서비스된다.',
      highlight: '운영비 $0 · 배포 후 약 1분 내 반영',
    },
  ];

  const issues = [
    { no: 5, title: 'AI 홈 에이전트 전쟁, Matter 2.0 초안 공개', date: '2026-06-09' },
    { no: 4, title: '아마존 AI 스피커 무료화, Matter 1.5 카메라 지원', date: '2026-06-02' },
    { no: 3, title: 'Gemini on-device, Thread 5G 병합', date: '2026-04-23' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-24 pt-8 md:pt-12 pb-24 text-white">

      {/* Hero */}
      <div className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '5호', label: '발행 완료' },
            { val: '100%', label: '무인 파이프라인' },
            { val: '$0', label: '운영 비용' },
            { val: '5분', label: '주간 브리핑' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-white/5 rounded-3xl border border-white/5 text-center space-y-1"
            >
              <div className="text-3xl font-black text-blue-500">{s.val}</div>
              <div className="text-xs opacity-40 uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>
        <p className="text-lg opacity-60 leading-relaxed max-w-3xl">
          RSS 수집 → Claude 요약 → Unsplash 이미지 매칭 → HTML 렌더링 → GitHub Pages 배포까지, 사람 손이 닿지 않는 완전 자동 뉴스레터. 스마트홈 업계 동향을 코웨이 IoT 기획 관점으로 매주 정리한다.
        </p>
      </div>

      {/* Before / After */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <h4 className="text-sm font-black tracking-[0.2em] text-white/40 uppercase">Before / After</h4>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-red-500/5 border border-red-500/20 rounded-[32px] space-y-4"
          >
            <span className="text-xs font-black uppercase tracking-[0.3em] text-red-400">Before</span>
            <h4 className="text-xl font-black">수동 트렌드 탐색</h4>
            <ul className="space-y-3 text-sm opacity-60">
              {[
                '매주 수십 개 뉴스 사이트를 일일이 방문',
                '기사 요약·번역 수동 작업 (2시간+/주)',
                '코웨이 관점의 시사점 도출 별도 작업',
                '공유 문서 정리 및 배포에 추가 시간 소요',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✕</span>{t}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-green-500/5 border border-green-500/20 rounded-[32px] space-y-4"
          >
            <span className="text-xs font-black uppercase tracking-[0.3em] text-green-400">After</span>
            <h4 className="text-xl font-black">AI 자동 퍼블리싱</h4>
            <ul className="space-y-3 text-sm opacity-60">
              {[
                '명령어 하나로 수집~배포 전 과정 완료',
                'Claude가 코웨이 관점 인사이트 자동 생성',
                'Unsplash 이미지 저작권 크레딧까지 자동 처리',
                'GitHub Pages에 즉시 발행, 공유 URL 한 줄',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>{t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="space-y-8">
        <div>
          <span className="text-blue-500 font-mono text-sm uppercase tracking-[0.3em] mb-4 block">Pipeline</span>
          <h3 className="text-4xl font-black uppercase tracking-tighter">자동화 파이프라인</h3>
        </div>
        <div className="space-y-4">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-8 bg-white/5 rounded-[32px] border border-white/5 hover:border-blue-500/30 transition-all grid md:grid-cols-[120px_1fr_auto] gap-6 items-start"
            >
              <div className="space-y-1">
                <span className="text-xs font-black text-blue-500 uppercase tracking-widest">{s.phase}</span>
                <h5 className="font-black uppercase tracking-tight">{s.title}</h5>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-black/40 rounded-lg border border-white/5 font-mono text-[11px] text-white/50 inline-block">{s.tool}</div>
                <p className="text-sm opacity-50 leading-relaxed">{s.desc}</p>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-[11px] text-blue-400 font-black max-w-[200px] text-right">{s.highlight}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Prompts */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <h4 className="text-sm font-black tracking-[0.2em] text-white/40 uppercase">AI Prompts</h4>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <div className="space-y-4">
          {prompts.map((p, i) => (
            <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-[24px] space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest text-blue-400">{p.label}</span>
                <button
                  onClick={() => copyPrompt(p.text, i)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  {copiedIdx === i ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <pre className="text-[12px] opacity-50 leading-relaxed whitespace-pre-wrap font-mono">{p.text}</pre>
            </div>
          ))}
        </div>
      </section>

      {/* Published Issues */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <h4 className="text-sm font-black tracking-[0.2em] text-white/40 uppercase">Published Issues</h4>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <div className="grid gap-4">
          {issues.map((iss, i) => (
            <motion.a
              key={i}
              href={`https://asderio-coway.github.io/coway-smarthome-trend/issues/${iss.date}.html`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-[24px] hover:border-blue-500/30 hover:bg-white/8 transition-all group"
            >
              <div className="flex items-center gap-6">
                <span className="text-4xl font-black text-blue-500/30 font-mono">{String(iss.no).padStart(2, '0')}</span>
                <div>
                  <p className="font-black text-sm">{iss.title}</p>
                  <p className="text-xs opacity-40 mt-1">{iss.date.replace(/-/g, '.')}</p>
                </div>
              </div>
              <ArrowUpRight size={18} className="opacity-30 group-hover:opacity-80 transition-opacity text-blue-400" />
            </motion.a>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="grid md:grid-cols-2 gap-4">
        <div className="p-6 bg-white/5 border border-green-500/20 rounded-[24px] space-y-3">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-green-400">운영 팁</span>
          <ul className="space-y-2 text-sm opacity-60">
            {[
              'Unsplash Demo 키: 50 req/h 무료, 배포 전 충분',
              'CARDNEWS_VARIANT=b 환경변수로 A/B 테스트 가능',
              'discover.mjs 후 수동으로 JSON 편집 가능 — 완전 자동과 수동 혼용 지원',
            ].map((t, i) => <li key={i} className="flex gap-2"><span className="text-green-400">✓</span>{t}</li>)}
          </ul>
        </div>
        <div className="p-6 bg-white/5 border border-amber-500/20 rounded-[24px] space-y-3">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-400">주의사항</span>
          <ul className="space-y-2 text-sm opacity-60">
            {[
              '기사 수는 정확히 6건 (run.mjs 게이트 하드코딩)',
              'Claude API 키는 .env에만 저장, 커밋 금지',
              'RSS 피드 URL 변경 시 discover.mjs SOURCE 배열 업데이트 필요',
            ].map((t, i) => <li key={i} className="flex gap-2"><span className="text-amber-400">!</span>{t}</li>)}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <div className="p-12 bg-blue-600 rounded-[40px] text-center space-y-6 text-white">
        <h4 className="text-2xl font-black uppercase tracking-tight">스마트홈 트렌드 뉴스레터 구독</h4>
        <p className="opacity-80 max-w-2xl mx-auto leading-relaxed">
          매주 스마트홈 업계의 핵심 동향 6건을 코웨이 IoT 기획 관점으로 요약·큐레이션합니다. AI가 수집하고, 사람이 활용합니다.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="https://asderio-coway.github.io/coway-smarthome-trend/" target="_blank" rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-blue-600 font-black uppercase tracking-widest rounded-2xl hover:bg-blue-50 transition-all flex items-center gap-3">
            뉴스레터 보기 <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      {/* Credit */}
      <div className="text-center space-y-2">
        <p className="text-sm opacity-40">Built by</p>
        <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 rounded-2xl border border-white/5 text-white">
          <span>🗞️ 김태현</span>
          <span className="opacity-40">·</span>
          <span className="opacity-60">IoT기획팀 / AI 전략</span>
        </div>
      </div>
    </div>
  );
};

// --- Figma Translator Detail ---
const FigmaTranslatorDetail = () => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyPrompt = (text: string, idx: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  };

  const prompts = [
    {
      label: '다국어 번역 요청',
      text: '아래 UI 텍스트를 한국어 원문 의도를 최대한 살려서 영어, 일본어, 중국어(간체), 중국어(번체), 독일어, 프랑스어, 스페인어, 포르투갈어, 아랍어로 번역해줘. 앱 UI에 들어가는 짧은 문구야. JSON 배열로 반환해줘.',
    },
    {
      label: '용어집 기반 일관성 검수',
      text: '아래 번역 결과를 용어집과 비교해서 불일치하는 항목만 골라줘. 변경이 필요한 이유와 수정 제안을 같이 작성해줘.',
    },
    {
      label: 'UI 길이 오버 감지',
      text: '아래 번역 텍스트 중에서 원문보다 30% 이상 길어진 항목을 찾아줘. 각 항목마다 원문 길이, 번역 길이, 비율, 단축 대안을 표로 정리해줘.',
    },
    {
      label: '플러그인 코드 구조 설계',
      text: 'Figma 플러그인에서 선택된 텍스트 레이어를 순회하고 Claude API를 호출해서 번역 결과를 각 레이어에 쓰는 코드를 작성해줘. TypeScript 기반으로 작성하고, 오류 처리와 API 타임아웃도 포함해줘.',
    },
    {
      label: '아랍어 RTL 레이아웃 검증',
      text: '아랍어 번역 결과를 적용할 때 Figma에서 텍스트 방향(RTL)이 올바르게 설정되었는지 확인하는 방법과, 자동으로 RTL을 감지해서 레이아웃을 조정하는 플러그인 코드를 작성해줘.',
    },
  ];

  const steps = [
    {
      phase: 'Phase 1',
      title: '문제 정의',
      tool: 'Claude 기획 협업',
      desc: '9개 언어 번역 요청 시 매번 외부 번역 툴을 오가며 복붙하는 과정에서 누락·오역이 빈번히 발생. Figma 내에서 모든 과정을 완결하는 방안을 Claude와 함께 설계했다.',
      highlight: '외부 툴 전환 횟수: 하루 평균 40회 → 목표 0회',
    },
    {
      phase: 'Phase 2',
      title: 'Claude API 연동',
      tool: 'TypeScript + Figma Plugin API',
      desc: '선택된 텍스트 레이어를 일괄 수집하고 Claude API에 9개 언어 번역을 요청하는 파이프라인 구축. 비동기 병렬 처리로 번역 속도를 최적화했다.',
      highlight: '레이어 100개 기준 번역 완료: 약 8초',
    },
    {
      phase: 'Phase 3',
      title: '용어집 & 일관성 관리',
      tool: 'JSON Glossary + Claude 검수',
      desc: '제품별 핵심 용어(필터, 루틴, IoT 등)를 JSON 용어집으로 관리하고, 번역 후 Claude가 용어집과의 불일치를 자동 감지해 수정 제안을 생성한다.',
      highlight: '용어 불일치 자동 검출율: 97%',
    },
    {
      phase: 'Phase 4',
      title: 'UI 레이아웃 검증',
      tool: 'Figma Plugin API + 텍스트 측정',
      desc: '번역 텍스트를 레이어에 적용한 뒤 원문 대비 30% 이상 길어지거나 박스를 벗어나는 항목을 자동 감지. 문제 레이어에 경고 마커를 삽입한다.',
      highlight: '오버플로 감지 자동화 → 수동 QA 공수 70% 절감',
    },
    {
      phase: 'Phase 5',
      title: '배포 & 아카이빙',
      tool: 'Figma + 스크린샷 자동 캡처',
      desc: '번역 전·후 프레임을 나란히 놓고 스크린샷을 캡처해 비교 뷰를 자동 생성. 결과물을 Google Drive에 업로드하는 워크플로로 마무리.',
      highlight: '비교 문서 생성 시간: 수동 30분 → 자동 1분',
    },
  ];

  return (
    <div className="w-full space-y-16 pt-8 md:pt-12">

      {/* Hero */}
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <span className="text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4 block">Figma Plugin · Localization · AI-Powered</span>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black text-white/40 uppercase tracking-widest">✏️ 최한나</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black text-white/40 uppercase tracking-widest">IoT앱개발팀</span>
            </div>
            <h3 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">번역하고,<br/>검증하고,<br/>완성하라.</h3>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl">
              9개 언어 번역부터 UI 오버플로 감지, 용어집 검수까지 — Figma 플러그인 하나로 전 과정을 완결한 로컬라이제이션 파이프라인.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '지원 언어', value: '9개', desc: 'EN·JP·ZH·DE·FR·ES·PT·AR·KO' },
              { label: '사이클 단축', value: '80%', desc: '번역~검증 총 소요시간' },
              { label: '용어 불일치 감지', value: '97%', desc: '자동 Glossary 검수' },
              { label: '외주 번역 비용', value: '$0', desc: 'Claude API 인소싱' },
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/5 text-white">
                <span className="block text-3xl font-black">{stat.value}</span>
                <span className="text-[10px] uppercase text-blue-500 font-black tracking-widest mt-1 block">{stat.label}</span>
                <p className="text-[10px] text-white/30 mt-2">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Before / After */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <h4 className="text-sm font-black tracking-[0.2em] text-white/40 uppercase">Before / After</h4>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[32px] border border-red-500/20 bg-red-500/5 space-y-5 text-white"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-red-500/20 text-red-400 rounded-xl flex items-center justify-center text-xs font-black">✗</span>
              <span className="text-[10px] uppercase font-black tracking-[0.3em] text-red-400">Before</span>
            </div>
            <h5 className="text-xl font-black">툴을 전전하는 번역 작업</h5>
            <div className="space-y-3">
              {[
                '외부 번역 툴 → Figma 복붙 → 재검토 반복 (하루 40+ 전환)',
                '용어 불일치를 수동으로 찾아야 해서 누락 빈번',
                '텍스트 오버플로 QA를 사람이 직접 각 언어별로 확인',
                '아랍어 RTL 레이아웃 깨짐을 디자이너가 수동 교정',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-white/50">
                  <span className="text-red-400 mt-0.5 shrink-0">—</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[32px] border border-green-500/20 bg-green-500/5 space-y-5 text-white"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center text-xs font-black">✓</span>
              <span className="text-[10px] uppercase font-black tracking-[0.3em] text-green-400">After</span>
            </div>
            <h5 className="text-xl font-black">Figma 내에서 원클릭 완결</h5>
            <div className="space-y-3">
              {[
                'Figma에서 레이어 선택 → 번역 실행 → 완료까지 원클릭',
                '용어집 JSON 기반 불일치 자동 감지 및 수정 제안',
                '텍스트 오버플로 자동 마킹 — QA 공수 70% 절감',
                'RTL 언어(아랍어) 자동 감지 및 레이아웃 플래그 처리',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-white/50">
                  <span className="text-green-400 mt-0.5 shrink-0">+</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5-Step 구현 여정 */}
      <section className="space-y-8 border-t border-white/5 pt-12">
        <div className="text-white">
          <span className="text-blue-500 font-mono text-sm uppercase tracking-[0.3em] mb-4 block">Build Process</span>
          <h3 className="text-4xl font-black uppercase tracking-tighter">구현 여정</h3>
          <p className="text-white/40 text-sm mt-2 uppercase tracking-widest font-bold">Claude Code와의 대화만으로 — 기획부터 배포까지</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
          {steps.map((step, i) => (
            <div key={i} className="group p-8 bg-white/5 rounded-[32px] border border-white/5 hover:border-blue-500/30 transition-all">
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black text-white/40 uppercase tracking-widest">{step.phase}</span>
                <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-white/20 group-hover:text-blue-500 group-hover:border-blue-500/50 transition-colors">0{i + 1}</span>
              </div>
              <h5 className="text-xl font-black mb-2 uppercase tracking-tight">{step.title}</h5>
              <p className="text-sm opacity-60 mb-4">{step.desc}</p>
              <div className="pt-4 border-t border-white/5">
                <span className="text-[10px] uppercase font-bold text-blue-500 tracking-widest block mb-1">Deliverable</span>
                <p className="text-xs opacity-40">{step.highlight}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI 프롬프트 */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <h4 className="text-sm font-black tracking-[0.2em] text-white/40 uppercase">AI Prompts Used</h4>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <div className="space-y-4 text-white">
          {prompts.map((p, idx) => (
            <div key={idx} className="group p-6 bg-white/5 rounded-[32px] border border-white/5 hover:border-blue-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest">{p.label}</span>
                <button
                  onClick={() => copyPrompt(p.text, idx)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  {copiedIdx === idx ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  {copiedIdx === idx ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-white/40 text-sm leading-relaxed font-mono bg-black/20 rounded-2xl p-4">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips & Cautions */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <h4 className="text-sm font-black tracking-[0.2em] text-white/40 uppercase">Tips & Cautions</h4>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
          <div className="p-8 bg-white/5 rounded-[32px] border border-green-500/20 space-y-6">
            <span className="text-green-400 text-[10px] font-black uppercase tracking-widest block">효과적이었던 것</span>
            <div className="space-y-5">
              {[
                { title: '레이어 이름 규칙을 먼저 정해라', desc: '번역 대상 레이어와 UI 고정 텍스트를 이름 prefix로 구분하면 플러그인 로직이 단순해진다.' },
                { title: 'JSON 용어집을 산출물 1순위로 만들어라', desc: '용어집 없이 번역 먼저 진행하면 나중에 일일이 수정해야 한다. 용어집이 모든 번역의 기준이 된다.' },
                { title: '언어별 테스트는 아랍어(RTL)부터', desc: '가장 레이아웃 충격이 큰 언어를 먼저 검증하면 다른 언어는 상대적으로 쉽게 해결된다.' },
                { title: 'Claude에게 번역+검수를 한 번에 요청', desc: '번역과 용어집 대조를 하나의 프롬프트로 묶으면 API 호출 수를 절반으로 줄일 수 있다.' },
              ].map((t, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-white font-black text-sm">{t.title}</div>
                  <div className="text-white/40 text-xs leading-relaxed">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 bg-white/5 rounded-[32px] border border-amber-500/20 space-y-6">
            <span className="text-amber-400 text-[10px] font-black uppercase tracking-widest block">이렇게 하면 안 돼요</span>
            <div className="space-y-5">
              {[
                { title: '전체 레이어 한 번에 번역 요청', desc: '레이어 수가 많을수록 API 응답 시간이 길어지고 타임아웃 위험이 높다. 50개씩 배치 처리하는 것이 안전하다.' },
                { title: '원문 레이어를 덮어쓰기', desc: '번역 결과를 원본에 직접 쓰면 롤백이 불가능하다. 항상 원본 레이어를 보존하고 번역 전용 레이어를 별도로 생성해야 한다.' },
                { title: '용어집 없이 배포', desc: '번역마다 용어가 달라지면 UX 일관성이 깨진다. 작더라도 용어집 관리는 첫날부터 시작해야 한다.' },
                { title: 'RTL 검증을 마지막에 몰아서', desc: '아랍어 등 RTL 언어의 레이아웃 문제를 후반에 발견하면 전체 컴포넌트를 재설계해야 할 수 있다.' },
              ].map((t, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-white font-black text-sm">{t.title}</div>
                  <div className="text-white/40 text-xs leading-relaxed">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo 영상 */}
      <section className="space-y-8">
        <div className="text-white">
          <span className="text-blue-500 font-mono text-sm uppercase tracking-[0.3em] mb-4 block">Demo</span>
          <h3 className="text-4xl font-black uppercase tracking-tighter">실제 동작 화면</h3>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative aspect-video rounded-[40px] overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10"
        >
          <iframe
            src="https://drive.google.com/file/d/1DbEWNos5wGBBUdB5PQxh9EtGLBb6c0cE/preview"
            className="w-full h-full"
            allow="autoplay"
            title="Figma Translator Demo"
          />
        </motion.div>
        <p className="text-white/30 text-xs text-center">텍스트 레이어 선택 → 번역 실행 → UI 검증까지 실제 Figma 플러그인 동작 화면</p>
      </section>

      {/* CTA */}
      <div className="p-12 bg-blue-600 rounded-[40px] text-center space-y-6 text-white">
        <h4 className="text-2xl font-black uppercase tracking-tight">Built with Claude Code</h4>
        <p className="opacity-80 max-w-2xl mx-auto leading-relaxed">
          기획 아이디어부터 Figma 플러그인 구현·배포까지 Claude Code와의 대화만으로 완성한 실제 업무 도구입니다. 9개 언어, 1개 플러그인, 외주비 $0.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <div className="px-8 py-4 bg-white/10 text-white font-black uppercase tracking-widest rounded-2xl border border-white/20 flex items-center gap-3">
            <span>✏️ 최한나</span>
            <span className="opacity-40">·</span>
            <span className="opacity-60">IoT앱개발팀</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectDetailModal = ({ project, onClose }: { project: Project | null, onClose: () => void }) => {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={onClose} />
      
      <motion.div 
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-7xl h-full max-h-[90vh] bg-zinc-950 border border-white/10 rounded-[40px] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-50 px-8 py-6 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 flex justify-between items-center shrink-0 text-white">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">
              {project.category}
            </span>
            <h2 className="text-xl font-black tracking-tighter uppercase">{project.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-8 md:px-12 pb-8 md:pb-12">
          {project.id === 'p6' ? (
            <NotebookLMGuide />
          ) : project.id === 'p7' ? (
            <WQADashboard />
          ) : project.id === 'p8' ? (
            <CodepopDetail />
          ) : project.id === 'p9' ? (
            <FigmaTranslatorDetail />
          ) : project.id === 'p10' ? (
            <SmarthomeNewsletterDetail />
          ) : (
            <div className="max-w-4xl mx-auto space-y-12 pt-8 md:pt-12 pb-24 text-white">
              <div className="aspect-video w-full rounded-[32px] overflow-hidden bg-white/5 border border-white/10">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8">
                  <section>
                    <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">Overview</h3>
                    <p className="opacity-60 text-lg leading-relaxed">{project.description}</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Key Features</h3>
                    <ul className="space-y-3">
                      {project.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-3 opacity-80">
                          <CheckCircle2 size={18} className="text-blue-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
                
                <div className="space-y-8">
                  <div className="p-6 bg-blue-600 rounded-3xl shadow-xl shadow-blue-500/20">
                    <span className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-2 block text-white">Key Impact</span>
                    <p className="text-2xl font-black leading-tight text-white">{project.impact}</p>
                  </div>
                  
                  <div className="p-6 glass rounded-3xl border border-white/10">
                    <span className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-4 block">Contributors</span>
                    <div className="flex flex-wrap gap-2">
                      {project.members.map(mid => {
                        const member = MEMBERS.find(m => m.id === mid);
                        return member ? (
                          <div key={mid} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold opacity-80 border border-white/5">
                            {member.name}
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectGrid = ({ onProjectClick }: { onProjectClick: (p: Project) => void }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredProjects = activeCategory === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="work" className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-blue-500 font-mono text-sm uppercase tracking-[0.3em] mb-4 block">Strategic Assets</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">
              THE <br /> DELIVERABLES
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-4 p-2 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id === "전체" ? "all" : cat.id)}
                className={`px-4 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${
                  activeCategory === (cat.id === "전체" ? "all" : cat.id)
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  onClick={() => onProjectClick(project)}
                  className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden cursor-pointer"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="p-8 text-white">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-3xl font-black tracking-tighter uppercase">{project.title}</h3>
                      <ArrowUpRight className="text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                    <p className="opacity-60 text-sm leading-relaxed mb-6 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between py-4 border-t border-white/10">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-blue-500 tracking-[0.2em]">Impact</span>
                        <span className="text-xs font-black">{project.impact}</span>
                      </div>
                      <Link
                        to={`/work/${project.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
                      >
                        전용 페이지 <ArrowUpRight size={10} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-black text-white pt-32 pb-12 px-6 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
          <div>
            <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter leading-none uppercase mb-12">
              BUILD WITH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-600">US.</span>
            </h2>
            <p className="text-xl opacity-40 max-w-md leading-relaxed mb-12 uppercase tracking-tight">
              AI Builders는 단순한 기술 도입을 넘어, 코웨이의 업무 문화를 재정의하고 있습니다. 협업 의뢰는 언제나 환영입니다.
            </p>
            <button className="px-12 py-6 bg-blue-600 text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-blue-500 hover:scale-105 transition-all shadow-2xl shadow-blue-500/40 flex items-center gap-4 group">
              Start Collaboration
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-12 border-l border-white/10 pl-12">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30 mb-8">Directories</h4>
              <ul className="space-y-4 font-black text-sm uppercase tracking-widest">
                <li><a href="#members" className="hover:text-blue-400">Members</a></li>
                <li><a href="#work" className="hover:text-blue-400">Strategic Assets</a></li>
                <li><a href="#curriculum" className="hover:text-blue-400">12W Curriculum</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30 mb-8">Contact</h4>
              <p className="text-sm font-black uppercase tracking-widest leading-loose text-white">
                Coway IoT Planning Team <br />
                Seoul, South Korea
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-blue-500" />
            </div>
            <span className="font-black text-sm uppercase tracking-widest">AI Builders © 2026</span>
          </div>
          <div className="flex gap-8 text-[10px] font-black opacity-30 uppercase tracking-[0.3em]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[150px] -mr-[25vw] -mb-[25vw]" />
    </footer>
  );
};

// --- Work Detail Page (standalone route) ---
const WorkDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-8">
        <p className="text-white/40 text-xl uppercase tracking-widest">Project not found</p>
        <Link to="/" className="px-8 py-4 bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-blue-500 transition-all">
          ← Back to Hub
        </Link>
      </div>
    );
  }

  const renderDetail = () => {
    if (project.id === 'p6') return <NotebookLMGuide />;
    if (project.id === 'p7') return <WQADashboard />;
    if (project.id === 'p8') return <CodepopDetail />;
    if (project.id === 'p9') return <FigmaTranslatorDetail />;
    if (project.id === 'p10') return <SmarthomeNewsletterDetail />;
    return (
      <div className="max-w-4xl mx-auto space-y-12 pt-8 md:pt-12 pb-24 text-white">
        <div className="aspect-video w-full rounded-[32px] overflow-hidden bg-white/5 border border-white/10">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">Overview</h3>
              <p className="opacity-60 text-lg leading-relaxed">{project.description}</p>
            </section>
            <section>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Key Features</h3>
              <ul className="space-y-3">
                {project.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-3 opacity-80">
                    <CheckCircle2 size={18} className="text-blue-500" />
                    {detail}
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="space-y-8">
            <div className="p-6 bg-blue-600 rounded-3xl shadow-xl shadow-blue-500/20">
              <span className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-2 block text-white">Key Impact</span>
              <p className="text-2xl font-black leading-tight text-white">{project.impact}</p>
            </div>
            <div className="p-6 glass rounded-3xl border border-white/10">
              <span className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-4 block">Contributors</span>
              <div className="flex flex-wrap gap-2">
                {project.members.map(mid => {
                  const member = MEMBERS.find(m => m.id === mid);
                  return member ? (
                    <div key={mid} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold opacity-80 border border-white/5">
                      {member.name}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white antialiased selection:bg-blue-500 selection:text-white">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise2">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise2)" />
        </svg>
      </div>

      {/* Top Bar */}
      <div className="sticky top-0 z-50 px-6 md:px-12 py-5 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs uppercase tracking-[0.3em] font-black group"
          >
            <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            AI Builders Hub
          </Link>
          <span className="text-white/10">/</span>
          <span className="px-3 py-1 bg-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">
            {project.category}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              Live <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative px-6 md:px-12 pt-12 pb-8 max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-8 flex-wrap">
          <div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none text-white mb-4">
              {project.title}
            </h1>
            <p className="text-white/40 text-lg max-w-2xl leading-relaxed">{project.description}</p>
          </div>
          <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-3xl shrink-0">
            <span className="text-[10px] uppercase font-black tracking-widest text-blue-400 block mb-2">Impact</span>
            <p className="text-white font-black text-xl max-w-xs">{project.impact}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        {renderDetail()}
      </div>

      {/* Footer nav */}
      <div className="border-t border-white/5 px-6 md:px-12 py-12 max-w-7xl mx-auto flex items-center justify-between gap-6 flex-wrap">
        <Link
          to="/"
          className="flex items-center gap-3 text-white/40 hover:text-white transition-colors font-black uppercase tracking-widest text-sm group"
        >
          <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          All Projects
        </Link>
        <div className="flex gap-3">
          {PROJECTS.filter(p => p.id !== project.id).slice(0, 3).map(p => (
            <Link
              key={p.id}
              to={`/work/${p.id}`}
              className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all"
            >
              {p.title.split(' ').slice(0, 2).join(' ')}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---
const MainPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-blue-500 selection:text-white">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <CustomCursor />
      <Navbar />

      <main>
        <Hero />

        {/* Members Section */}
        <section id="members" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-blue-500 font-mono text-sm uppercase tracking-[0.3em] mb-4 block">Our Architects</span>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">
                THE NINETY <br /> PERCENTILE.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {MEMBERS.map(member => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>

        <ProjectGrid onProjectClick={handleProjectClick} />

        {/* Curriculum Section */}
        <section id="curriculum" className="py-32 px-6 bg-white/5 border-y border-white/5 text-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-blue-500 font-mono text-sm uppercase tracking-[0.3em] mb-4 block">Learning Journey</span>
              <h2 className="text-6xl font-black tracking-tighter uppercase mb-8 text-white">
                12 WEEKS OF <br /> EVOLUTION.
              </h2>
              <p className="text-lg opacity-50 uppercase tracking-tight max-w-md leading-relaxed">
                우리는 매주 목요일 점심, AI의 한계를 시험하고 실제 비즈니스 문제를 해결하기 위한 기술을 연마합니다.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "AI Foundations & LLM Logic",
                "Advanced Prompt Engineering",
                "RAG & External Tool Integration",
                "Multi-Agent System Design",
                "Strategic Deliverables Deployment"
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-colors group text-white">
                  <span className="text-4xl font-black opacity-10 group-hover:text-blue-500 transition-colors">0{i+1}</span>
                  <span className="font-bold uppercase tracking-widest text-white">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/work/:id" element={<WorkDetailPage />} />
    </Routes>
  );
}
