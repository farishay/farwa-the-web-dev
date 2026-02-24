import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Palette,
  Sparkles,
  Zap,
  Layout,
  Menu,
  X,
  ArrowUpRight,
  Star,
} from "lucide-react";

const ButterflyIcon = ({ color = "#244a0b", size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 100 60">
    <ellipse cx="28" cy="20" rx="26" ry="17" fill={color} opacity="0.95" />
    <ellipse cx="24" cy="40" rx="20" ry="13" fill={color} opacity="0.75" />
    <ellipse cx="72" cy="20" rx="26" ry="17" fill={color} opacity="0.95" />
    <ellipse cx="76" cy="40" rx="20" ry="13" fill={color} opacity="0.75" />
    <ellipse cx="30" cy="21" rx="12" ry="7" fill="#3a7a1a" opacity="0.45" />
    <ellipse cx="70" cy="21" rx="12" ry="7" fill="#3a7a1a" opacity="0.45" />
    <ellipse cx="50" cy="30" rx="4" ry="17" fill="#001403" />
    <circle cx="50" cy="13" r="4" fill="#001403" />
    <line x1="47" y1="11" x2="40" y2="4" stroke="#001403" strokeWidth="2" />
    <line x1="53" y1="11" x2="60" y2="4" stroke="#001403" strokeWidth="2" />
  </svg>
);

const skills = [
  { name: "HTML / CSS", pct: 95, icon: Code2 },
  { name: "JavaScript", pct: 90, icon: Sparkles },
  { name: "React.js", pct: 88, icon: Zap },
  { name: "UI/UX Design", pct: 92, icon: Palette },
  { name: "Figma", pct: 87, icon: Layout },
  { name: "Responsive Design", pct: 93, icon: Code2 },
];

const projects = [
  {
    image: "/images/p1.jpeg",
    title: "AIMailPro - Email Marketing Platform",
    desc: "Advanced email marketing automation with drag-and-drop builder, analytics dashboard.",
    tech: ["GSAP", "React"],
    link: "https://ai-mail-pro.netlify.app/",
  },
  {
    image: "/images/p2.jpeg",
    title: "Netflix-Themed Portfolio",
    desc: "Cinematic portfolio website with Netflix-inspired UI, smooth transitions, and interactive hover effects with 3D effects.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://client-portfolio-zeta-ivory.vercel.app/",
  },
  {
    image: "/images/p5.png",
    title: "Resume Forge - Interactive Resume Builder",
    desc: "Create stunning resumes in minutes with customizable templates, live preview, and one-click export.",
    tech: ["React", "jsPDF", "HTML2Canvas", "CSS"],
    link: "https://resume-forge-v2.netlify.app/",
  },
  {
    image: "/images/p4.png",
    title: "Chat App with Coffee Theme",
    desc: "Cozy coffee-themed chat application with real-time messaging, emoji reactions, and warm aesthetic design.",
    tech: ["HTML", "CSS", "JavaScript", "Firebase", "Tailwind"],
    link: "https://chat-app-mu-nine-69.vercel.app/",
  },
  {
    image: "/images/p3.png",
    title: "Japnese Makeup Store",
    desc: "Cozy coffee-themed chat application with real-time messaging, emoji reactions, and warm aesthetic design.",
    tech: ["React", "GSAP", "Tailwind CSS", "Flowbite"],
    link: "https://makeup-web-hazel.vercel.app/",
  },
];

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "CEO – DigitalHub",
    text: "Farwa delivered an outstanding website. Her attention to detail and creativity is unmatched!",
  },
  {
    name: "Ali Hassan",
    role: "Founder – TechStudio",
    text: "Absolutely professional work. The UI she designed feels alive and converts really well.",
  },
  {
    name: "Zara Malik",
    role: "Creative Director",
    text: "Working with Farwa was a joy. Every pixel was crafted with purpose and elegance.",
  },
];

export default function Portfolio() {
  const [stage, setStage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [visible, setVisible] = useState({});
  const [skillsOn, setSkillsOn] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const sRefs = {
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    testimonials: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    // stage 0: show spinner, stage 1: spinner fills up, stage 2: welcome text, stage 3: portfolio
    const t1 = setTimeout(() => setStage(1), 2500);
    const t2 = setTimeout(() => setStage(2), 4000);
    const t3 = setTimeout(() => setStage(3), 5500);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) =>
            e.isIntersecting &&
            setVisible((p) => ({ ...p, [e.target.id]: true })),
        ),
      { threshold: 0.15 },
    );
    Object.values(sRefs).forEach((r) => r.current && obs.observe(r.current));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (visible.skills) setSkillsOn(true);
  }, [visible.skills]);

  useEffect(() => {
    const t = setInterval(
      () => setActiveTestimonial((p) => (p + 1) % testimonials.length),
      4000,
    );
    return () => clearInterval(t);
  }, []);

  const enterHover = (txt) => setCursorText(txt);
  const leaveHover = () => setCursorText("");

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        fontFamily: "'Segoe UI',sans-serif",
        overflowX: "hidden",
        cursor: "none",
      }}
    >
      {/* CURSOR */}
      <div
        style={{
          position: "fixed",
          left: mouse.x,
          top: mouse.y,
          zIndex: 99999,
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: cursorText ? 76 : 18,
            height: cursorText ? 76 : 18,
            borderRadius: "50%",
            border: "2px solid #244a0b",
            background: cursorText
              ? "rgba(36,74,11,0.15)"
              : "rgba(36,74,11,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
        >
          {cursorText && (
            <span
              style={{
                fontSize: 9,
                color: "#3a7a1a",
                fontWeight: 700,
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              {cursorText}
            </span>
          )}
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#244a0b",
          }}
        />
      </div>

      {/* INTRO ANIMATION */}
      {stage < 3 && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background:
              "linear-gradient(135deg,#001403 0%,#000 60%,#0a1f03 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* Twinkling particles */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                borderRadius: "50%",
                width: 2 + Math.random() * 3,
                height: 2 + Math.random() * 3,
                background: "#244a0b",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.5,
                animation: `twinkle ${1.5 + Math.random() * 2}s ${Math.random() * 2}s infinite`,
              }}
            />
          ))}

          {/* Stage 0-1: Photo with Spinning Loading Ring */}
          {stage <= 1 && (
            <div
              style={{
                position: "relative",
                width: 320,
                height: 320,
                animation: "fadeIn 0.8s ease-out",
              }}
            >
              {/* Spinning Loader Ring */}
              <svg
                style={{
                  position: "absolute",
                  inset: -10,
                  width: 340,
                  height: 340,
                  transform: "rotate(-90deg)",
                  animation: "spin 2.5s linear infinite",
                }}
              >
                <circle
                  cx="170"
                  cy="170"
                  r="155"
                  fill="none"
                  stroke="#011f01"
                  strokeWidth="8"
                />
                <circle
                  cx="170"
                  cy="170"
                  r="155"
                  fill="none"
                  stroke="url(#greenGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="974"
                  strokeDashoffset={stage === 0 ? "974" : "200"}
                  style={{ transition: "stroke-dashoffset 2.5s ease-out" }}
                />
                <defs>
                  <linearGradient
                    id="greenGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#244a0b" />
                    <stop offset="50%" stopColor="#3a7a1a" />
                    <stop offset="100%" stopColor="#5aad1a" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Photo */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "6px solid #244a0b",
                  boxShadow:
                    "0 0 60px rgba(36,74,11,0.8), 0 0 120px rgba(36,74,11,0.4)",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <img
                  src="/images/me1.jpeg"
                  alt="Farwa"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, rgba(36,74,11,0.2), transparent)",
                  }}
                />
              </div>

              {/* Center Pulse */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: 340,
                  height: 340,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(36,74,11,0.4) 0%, transparent 70%)",
                  animation: "pulse 2s ease-in-out infinite",
                  zIndex: 1,
                }}
              />

              {/* Loading Text */}
              <div
                style={{
                  position: "absolute",
                  bottom: -60,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    color: "#3a7a1a",
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: 2,
                    whiteSpace: "nowrap",
                  }}
                >
                   PORTFOLIO LOADING
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 8,
                        height: 8,
                        background: "#244a0b",
                        borderRadius: "50%",
                        animation: `dotBounce 0.6s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Stage 2: Welcome Text */}
          {stage === 2 && (
            <div
              style={{
                textAlign: "center",
                animation: "popIn 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards",
              }}
            >
              <h1
                style={{
                  fontSize: "clamp(56px,11vw,120px)",
                  fontWeight: 900,
                  letterSpacing: 6,
                  background: "linear-gradient(135deg,#244a0b,#3a7a1a,#244a0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: 20,
                }}
              >
                WELCOME
              </h1>
              <p
                style={{
                  fontSize: "clamp(18px,3.5vw,42px)",
                  color: "#3a7a1a",
                  fontWeight: 300,
                  letterSpacing: 12,
                }}
              >
                TO MY WORLD
              </p>
            </div>
          )}
        </div>
      )}

      {/* PORTFOLIO */}
      <div
        style={{
          opacity: stage >= 3 ? 1 : 0,
          transform: stage >= 3 ? "translateY(0)" : "translateY(40px)",
          transition: "all 1.2s ease",
        }}
      >
        {/* NAV */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1000,
            background: "rgba(0,0,0,0.88)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(36,74,11,0.25)",
            padding: "18px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              background: "linear-gradient(135deg,#244a0b,#3a7a1a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            FARWA TARIQ
          </span>

          {/* Desktop */}
          <div style={{ display: "flex", gap: 36 }}>
            {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onMouseEnter={(e) => {
                  e.target.style.color = "#3a7a1a";
                  enterHover(item);
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#aaa";
                  leaveHover();
                }}
                style={{
                  color: "#aaa",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 15,
                  transition: "color 0.3s",
                  cursor: "none",
                }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              display: "none",
              background: "rgba(36,74,11,0.15)",
              border: "1px solid rgba(36,74,11,0.4)",
              borderRadius: 8,
              padding: "8px 10px",
              cursor: "pointer",
              color: "#3a7a1a",
            }}
            className="ham-btn"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div
            style={{
              position: "fixed",
              top: 68,
              left: 0,
              right: 0,
              zIndex: 999,
              background: "rgba(0,8,0,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(36,74,11,0.3)",
            }}
          >
            {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={(e) => (e.target.style.color = "#3a7a1a")}
                onMouseLeave={(e) => (e.target.style.color = "#ccc")}
                style={{
                  display: "block",
                  padding: "14px 32px",
                  color: "#ccc",
                  textDecoration: "none",
                  fontWeight: 600,
                  borderBottom: "1px solid rgba(36,74,11,0.1)",
                  transition: "color 0.2s",
                  cursor: "none",
                }}
              >
                {item}
              </a>
            ))}
          </div>
        )}

        {/* HERO */}
        <section
          id="home"
          style={{
            minHeight: "100vh",
            padding: "130px 60px 80px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
            background: "linear-gradient(135deg,#001403 0%,#000 65%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.08,
              backgroundImage:
                "linear-gradient(#244a0b 1px,transparent 1px),linear-gradient(90deg,#244a0b 1px,transparent 1px)",
              backgroundSize: "55px 55px",
            }}
          />

          {/* Photo */}
          <div
            style={{ position: "relative", zIndex: 2 }}
            onMouseEnter={() => enterHover("VIEW")}
            onMouseLeave={leaveHover}
          >
            <div
              style={{
                position: "absolute",
                inset: -20,
                background:
                  "linear-gradient(135deg,rgba(36,74,11,0.45),transparent)",
                borderRadius: 32,
                filter: "blur(35px)",
              }}
            />
            <div
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03) rotate(-1deg)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1) rotate(0deg)")
              }
              style={{
                position: "relative",
                borderRadius: 28,
                overflow: "hidden",
                border: "3px solid rgba(36,74,11,0.5)",
                boxShadow: "0 30px 80px rgba(36,74,11,0.4)",
                transition: "transform 0.5s",
              }}
            >
              <img
                src="/images/me2.jpeg"
                alt="Farwa"
                style={{ width: "100%", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top,rgba(0,20,3,0.9) 0%,transparent 50%)",
                }}
              />
              <div style={{ position: "absolute", bottom: 28, left: 28 }}>
                <h3
                  style={{
                    fontSize: 28,
                    color: "#3a7a1a",
                    fontWeight: 900,
                    marginBottom: 6,
                  }}
                >
                  Farwa Tariq
                </h3>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15 }}>
                  Web Developer & UI/UX Designer
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <p
              style={{
                color: "#244a0b",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: 5,
                marginBottom: 20,
              }}
            >
              ✦ CREATIVE DEVELOPER
            </p>
            <h1
              style={{
                fontSize: "clamp(36px,5vw,64px)",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: 22,
              }}
            >
              Crafting Digital
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#244a0b,#3a7a1a,#5aad1a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Experiences
              </span>
              <br />
              That Inspire.
            </h1>
            <p
              style={{
                fontSize: 17,
                color: "#888",
                lineHeight: 1.8,
                marginBottom: 32,
                maxWidth: 480,
              }}
            >
              Transforming ideas into elegant, functional, and user-centered
              digital solutions. Specializing in modern web development and
              intuitive UI/UX.
            </p>

            <div style={{ display: "flex", gap: 32, marginBottom: 32 }}>
              {[
                ["20+", "Projects"],
                ["2+", "Years Exp."],
                ["100%", "Client Love"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div
                    style={{ fontSize: 26, fontWeight: 900, color: "#3a7a1a" }}
                  >
                    {n}
                  </div>
                  <div style={{ fontSize: 12, color: "#555" }}>{l}</div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                marginBottom: 28,
              }}
            >
              <a
                href="#projects"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  enterHover("GO");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  leaveHover();
                }}
                style={{
                  background: "linear-gradient(135deg,#244a0b,#001403)",
                  color: "#fff",
                  padding: "15px 34px",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 8px 28px rgba(36,74,11,0.55)",
                  transition: "all 0.3s",
                  cursor: "none",
                }}
              >
                View Projects <ArrowUpRight size={18} />
              </a>
              <a
                href="#contact"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(36,74,11,0.1)";
                  enterHover("HI!");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  leaveHover();
                }}
                style={{
                  border: "2px solid #244a0b",
                  color: "#3a7a1a",
                  padding: "15px 34px",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                  transition: "all 0.3s",
                  cursor: "none",
                }}
              >
                Let's Connect
              </a>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              {[ { Icon: Github, label: "GIT", href: "https://github.com/farishay" },
    { Icon: Linkedin, label: "IN", href: "https://www.linkedin.com/in/farwa-tariq-3b9540234/" },
    { Icon: Mail, label: "MAIL", href: "mailto:farwa.tariq2434@gmail.com" },
  ].map(({ Icon, label, href }, i) => (
                <a
                  key={i}
                   href={href}
                        target="_blank"
                  
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#244a0b";
                    e.currentTarget.style.background = "rgba(36,74,11,0.12)";
                    enterHover(["GIT", "IN", "MAIL"][i]);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(36,74,11,0.35)";
                    e.currentTarget.style.background = "transparent";
                    leaveHover();
                  }}
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    border: "2px solid rgba(36,74,11,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "none",
                    transition: "all 0.3s",
                  }}
                >
                  <Icon size={19} color="#244a0b" />
                  
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          ref={sRefs.about}
          style={{
            minHeight: "100vh",
            padding: "100px 60px",
            background: "linear-gradient(180deg,#000,rgba(0,20,3,0.2),#000)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              color: "#244a0b",
              fontWeight: 700,
              letterSpacing: 5,
              fontSize: 13,
              marginBottom: 14,
              opacity: visible.about ? 1 : 0,
              transform: visible.about ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s",
            }}
          >
            ✦ WHO I AM
          </p>
          <h2
            style={{
              fontSize: "clamp(36px,6vw,62px)",
              fontWeight: 900,
              textAlign: "center",
              marginBottom: 70,
              background: "linear-gradient(135deg,#244a0b,#3a7a1a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: visible.about ? 1 : 0,
              transform: visible.about ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s 0.1s",
            }}
          >
            About Me
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: 1300,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                opacity: visible.about ? 1 : 0,
                transform: visible.about
                  ? "translateX(0)"
                  : "translateX(-40px)",
                transition: "all 0.8s 0.15s",
              }}
              onMouseEnter={() => enterHover("👋")}
              onMouseLeave={leaveHover}
            >
              <div
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.04) rotate(1deg)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                style={{
                  borderRadius: 24,
                  overflow: "hidden",
                  border: "2px solid rgba(36,74,11,0.3)",
                  boxShadow: "0 25px 70px rgba(36,74,11,0.3)",
                  transition: "transform 0.5s",
                }}
              >
                <img
                  className="me3"
                  src="/images/me3.jpeg"
                  alt="Farwa"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div
              className="about-section"
              style={{
                opacity: visible.about ? 1 : 0,
                transform: visible.about ? "translateX(0)" : "translateX(40px)",
                transition: "all 0.8s 0.3s",
              }}
            >
              <p
                style={{
                  fontSize: 19,
                  color: "#ccc",
                  lineHeight: 1.9,
                  marginBottom: 18,
                }}
              >
                I'm a{" "}
                <span style={{ color: "#3a7a1a", fontWeight: 700 }}>
                  passionate web developer & UI/UX designer
                </span>{" "}
                dedicated to crafting digital experiences that feel alive.
              </p>
              <p
                style={{
                  fontSize: 19,
                  color: "#ccc",
                  lineHeight: 1.9,
                  marginBottom: 32,
                }}
              >
                With deep knowledge of modern frameworks and design systems, I
                turn creative visions into{" "}
                <span style={{ color: "#3a7a1a", fontWeight: 700 }}>
                  pixel-perfect, high-performing websites
                </span>
                .
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                {[
                  {
                    icon: Code2,
                    title: "Clean Code",
                    desc: "Maintainable & efficient",
                  },
                  {
                    icon: Palette,
                    title: "Beautiful UI",
                    desc: "User-centered aesthetics",
                  },
                  {
                    icon: Zap,
                    title: "Performance",
                    desc: "Lightning-fast sites",
                  },
                  {
                    icon: Sparkles,
                    title: "Innovation",
                    desc: "Cutting-edge solutions",
                  },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <div
                    key={i}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#244a0b";
                      e.currentTarget.style.transform = "translateY(-6px)";
                      enterHover(title);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(36,74,11,0.25)";
                      e.currentTarget.style.transform = "translateY(0)";
                      leaveHover();
                    }}
                    style={{
                      background:
                        "linear-gradient(135deg,rgba(36,74,11,0.12),rgba(0,0,0,0.5))",
                      border: "1px solid rgba(36,74,11,0.25)",
                      padding: 20,
                      borderRadius: 14,
                      transition: "all 0.3s",
                      cursor: "none",
                    }}
                  >
                    <Icon
                      size={25}
                      color="#244a0b"
                      style={{ marginBottom: 10 }}
                    />
                    <h3
                      style={{
                        fontSize: 16,
                        marginBottom: 4,
                        fontWeight: 700,
                      }}
                    >
                      {title}
                    </h3>
                    <p style={{ color: "#666", fontSize: 13 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          ref={sRefs.skills}
          style={{ padding: "100px 60px", background: "#000" }}
        >
          <p
            style={{
              textAlign: "center",
              color: "#244a0b",
              fontWeight: 700,
              letterSpacing: 5,
              fontSize: 13,
              marginBottom: 14,
              opacity: visible.skills ? 1 : 0,
              transform: visible.skills ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s",
            }}
          >
            ✦ WHAT I KNOW
          </p>
          <h2
            style={{
              fontSize: "clamp(36px,6vw,62px)",
              fontWeight: 900,
              textAlign: "center",
              marginBottom: 70,
              background: "linear-gradient(135deg,#244a0b,#3a7a1a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: visible.skills ? 1 : 0,
              transform: visible.skills ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s 0.1s",
            }}
          >
            Skills & Expertise
          </h2>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            {skills.map(({ name, pct, icon: Icon }, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 34,
                  opacity: visible.skills ? 1 : 0,
                  transform: visible.skills
                    ? "translateX(0)"
                    : "translateX(-60px)",
                  transition: `all 0.7s ease ${i * 100}ms`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        background: "linear-gradient(135deg,#244a0b,#001403)",
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 16px rgba(36,74,11,0.5)",
                      }}
                    >
                      <Icon size={22} color="#fff" />
                    </div>
                    <span style={{ fontSize: 21, fontWeight: 700 }}>
                      {name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 19,
                      fontWeight: 900,
                      color: "#244a0b",
                    }}
                  >
                    {pct}%
                  </span>
                </div>
                <div
                  style={{
                    height: 15,
                    background: "#111",
                    borderRadius: 8,
                    overflow: "hidden",
                    border: "1px solid rgba(36,74,11,0.2)",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 8,
                      background:
                        "linear-gradient(90deg,#001403,#244a0b,#3a7a1a)",
                      width: skillsOn ? `${pct}%` : "0%",
                      transition: `width 1.5s ease ${i * 130}ms`,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)",
                        animation: "shimmer 2.5s infinite",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          ref={sRefs.projects}
          style={{
            padding: "100px 60px",
            background:
              "linear-gradient(135deg,rgba(0,20,3,0.1) 0%,#000 50%,rgba(0,20,3,0.08) 100%)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              color: "#244a0b",
              fontWeight: 700,
              letterSpacing: 5,
              fontSize: 13,
              marginBottom: 14,
              opacity: visible.projects ? 1 : 0,
              transform: visible.projects
                ? "translateY(0)"
                : "translateY(20px)",
              transition: "all 0.7s",
            }}
          >
            ✦ SELECTED WORK
          </p>
          <h2
            style={{
              fontSize: "clamp(36px,6vw,62px)",
              fontWeight: 900,
              textAlign: "center",
              marginBottom: 70,
              background: "linear-gradient(135deg,#244a0b,#3a7a1a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: visible.projects ? 1 : 0,
              transform: visible.projects
                ? "translateY(0)"
                : "translateY(20px)",
              transition: "all 0.7s 0.1s",
            }}
          >
            Featured Projects
          </h2>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div
                key={i}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#244a0b";
                  e.currentTarget.style.transform =
                    "scale(1.03) translateY(-4px)";
                  enterHover("OPEN");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(36,74,11,0.25)";
                  e.currentTarget.style.transform = "scale(1) translateY(0)";
                  leaveHover();
                }}
                style={{
                  background:
                    "linear-gradient(135deg,rgba(0,20,3,0.4),rgba(0,0,0,0.8))",
                  border: "1px solid rgba(36,74,11,0.25)",
                  borderRadius: 22,
                  overflow: "hidden",
                  transition: "all 0.4s",
                  cursor: "none",
                  opacity: visible.projects ? 1 : 0,
                  transform: visible.projects
                    ? "translateY(0)"
                    : "translateY(60px)",
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <div
                  style={{
                    height: 220,
                    background:
                      i % 2 === 0
                        ? "linear-gradient(135deg,#244a0b 0%,#001403 100%)"
                        : "linear-gradient(135deg,#001403 0%,#244a0b 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 75,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      opacity: 0.5,
                      animation: "floatY 3s ease-in-out infinite",
                    }}
                  >
                    <ButterflyIcon color="#3a7a1a" size={28} />
                  </div>
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ padding: 28 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 21,
                        color: "#3a7a1a",
                        fontWeight: 900,
                      }}
                    >
                      {p.title}
                    </h3>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ cursor: "pointer", display: "flex" }}
                    >
                      <ArrowUpRight size={20} color="#244a0b" />
                    </a>
                  </div>
                  <p
                    style={{
                      color: "#888",
                      marginBottom: 16,
                      lineHeight: 1.6,
                      fontSize: 14,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {p.tech.map((t, j) => (
                      <span
                        key={j}
                        style={{
                          background: "rgba(36,74,11,0.18)",
                          border: "1px solid rgba(36,74,11,0.3)",
                          padding: "4px 12px",
                          borderRadius: 20,
                          fontSize: 12,
                          color: "#3a7a1a",
                          fontWeight: 600,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS - COMMENTED OUT
        <section
          id="testimonials"
          ref={sRefs.testimonials}
          style={{ padding: "100px 60px", background: "#000" }}
        >
          <p
            style={{
              textAlign: "center",
              color: "#244a0b",
              fontWeight: 700,
              letterSpacing: 5,
              fontSize: 13,
              marginBottom: 14,
              opacity: visible.testimonials ? 1 : 0,
              transform: visible.testimonials
                ? "translateY(0)"
                : "translateY(20px)",
              transition: "all 0.7s",
            }}
          >
            ✦ WHAT PEOPLE SAY
          </p>
          <h2
            style={{
              fontSize: "clamp(36px,6vw,62px)",
              fontWeight: 900,
              textAlign: "center",
              marginBottom: 60,
              background: "linear-gradient(135deg,#244a0b,#3a7a1a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: visible.testimonials ? 1 : 0,
              transform: visible.testimonials
                ? "translateY(0)"
                : "translateY(20px)",
              transition: "all 0.7s 0.1s",
            }}
          >
            Testimonials
          </h2>
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              opacity: visible.testimonials ? 1 : 0,
              transform: visible.testimonials
                ? "translateY(0)"
                : "translateY(30px)",
              transition: "all 0.8s 0.2s",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg,rgba(36,74,11,0.1),rgba(0,0,0,0.7))",
                border: "1px solid rgba(36,74,11,0.3)",
                borderRadius: 28,
                padding: "48px 56px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 4,
                  marginBottom: 22,
                }}
              >
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} size={20} color="#244a0b" fill="#244a0b" />
                  ))}
              </div>
              <p
                style={{
                  fontSize: 19,
                  color: "#ccc",
                  lineHeight: 1.8,
                  marginBottom: 28,
                  fontStyle: "italic",
                }}
              >
                "{testimonials[activeTestimonial].text}"
              </p>
              <p style={{ fontWeight: 900, color: "#3a7a1a", fontSize: 17 }}>
                {testimonials[activeTestimonial].name}
              </p>
              <p style={{ color: "#555", fontSize: 13, marginTop: 4 }}>
                {testimonials[activeTestimonial].role}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 10,
                marginTop: 22,
              }}
            >
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: i === activeTestimonial ? 26 : 10,
                    height: 10,
                    borderRadius: 5,
                    background:
                      i === activeTestimonial
                        ? "#244a0b"
                        : "rgba(36,74,11,0.3)",
                    transition: "all 0.4s",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
        </section>
        END TESTIMONIALS */}

        {/* CONTACT */}
        <section
          id="contact"
          ref={sRefs.contact}
          style={{ padding: "100px 60px" }}
        >
          <p
            style={{
              textAlign: "center",
              color: "#244a0b",
              fontWeight: 700,
              letterSpacing: 5,
              fontSize: 13,
              marginBottom: 14,
              opacity: visible.contact ? 1 : 0,
              transform: visible.contact ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s",
            }}
          >
            ✦ GET IN TOUCH
          </p>
          <h2
            style={{
              fontSize: "clamp(36px,6vw,62px)",
              fontWeight: 900,
              textAlign: "center",
              marginBottom: 55,
              background: "linear-gradient(135deg,#244a0b,#3a7a1a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: visible.contact ? 1 : 0,
              transform: visible.contact ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s 0.1s",
            }}
          >
            Let's Create Together
          </h2>
          <div
            style={{
              maxWidth: 840,
              margin: "0 auto",
              opacity: visible.contact ? 1 : 0,
              transform: visible.contact ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s 0.15s",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg,rgba(36,74,11,0.1),rgba(0,0,0,0.7))",
                border: "1px solid rgba(36,74,11,0.25)",
                borderRadius: 28,
                padding: "55px 46px",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  fontSize: 19,
                  color: "#aaa",
                  marginBottom: 46,
                  lineHeight: 1.8,
                }}
              >
                Ready to bring your vision to life? Let's build something
                extraordinary together.
              </p>
              <div className="contact-grid">
                {[
                  {
                    icon: Mail,
                    label: "Email Me",
                    href: "mailto:farwa.tariq2434@gmail.com",
                  },
                  {
                    icon: Github,
                    label: "GitHub",
                    href: "https://github.com/farishay",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/farwa-tariq-3b9540234/",
                  },
                ].map(({ icon: Icon, label, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#244a0b";
                      e.currentTarget.style.transform =
                        "scale(1.06) translateY(-4px)";
                      enterHover(label);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(36,74,11,0.25)";
                      e.currentTarget.style.transform =
                        "scale(1) translateY(0)";
                      leaveHover();
                    }}
                    style={{
                      background:
                        "linear-gradient(135deg,rgba(36,74,11,0.1),rgba(0,0,0,0.5))",
                      border: "2px solid rgba(36,74,11,0.25)",
                      borderRadius: 20,
                      padding: "36px 20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 14,
                      textDecoration: "none",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 15,
                      transition: "all 0.3s",
                      cursor: "none",
                      opacity: visible.contact ? 1 : 0,
                      transform: visible.contact
                        ? "translateY(0)"
                        : "translateY(30px)",
                      transitionDelay: `${350 + i * 100}ms`,
                    }}
                  >
                    <Icon size={32} color="#244a0b" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            textAlign: "center",
            padding: "36px 24px",
            borderTop: "1px solid rgba(36,74,11,0.25)",
            background: "linear-gradient(to bottom,#000,#001403)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 14,
            }}
          >
            <ButterflyIcon color="#244a0b" size={30} />
          </div>
          <p style={{ color: "#444", marginBottom: 8 }}>
            © 2026 Farwa Tariq — All rights reserved.
          </p>
          <p
            style={{
              color: "#244a0b",
              fontWeight: 700,
              letterSpacing: 3,
              fontSize: 13,
            }}
          >
            DESIGNING · DEVELOPING · INSPIRING
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes dotBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes spin { 0%{transform:rotate(-90deg)} 100%{transform:rotate(270deg)} }
        @keyframes pulse { 0%,100%{opacity:0.4;transform:translate(-50%,-50%) scale(1)} 50%{opacity:0.7;transform:translate(-50%,-50%) scale(1.1)} }
        @keyframes fadeIn { 0%{opacity:0;transform:scale(0.8)} 100%{opacity:1;transform:scale(1)} }
        @keyframes popIn { 0%{opacity:0;transform:scale(0.3)} 100%{opacity:1;transform:scale(1)} }
        @keyframes twinkle { 0%,100%{opacity:0.2} 50%{opacity:0.9} }
        .ham-btn { display: none !important; }
        @media (max-width: 768px) {
          nav > div:nth-child(2) { display: none !important; }
          .ham-btn { display: flex !important; align-items: center; justify-content: center; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
          section[style*="grid-template-columns"] { display: flex !important; flex-direction: column !important; }
          nav { padding: 16px 20px !important; }
        }
      `}</style>
    </div>
  );
}
