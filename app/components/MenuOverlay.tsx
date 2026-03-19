"use client";

import { useEffect, useState } from "react";
import { TransitionLink } from "./TransitionLink";
import { usePathname } from "next/navigation";

/* ── Assets ──────────────────────────────────────────────────────── */
const imgBgHome       = "https://www.figma.com/api/mcp/asset/abe5ab66-8e82-4769-a1c1-0440d2ed350b";
const imgBgAbout      = "https://www.figma.com/api/mcp/asset/b22f77d9-22b9-45e8-a34e-cb4db7f78ea7";
const imgBgPlayground = "https://www.figma.com/api/mcp/asset/67da85b2-5e12-40a5-8913-020618a3b104";
const imgLinkedIn     = "https://www.figma.com/api/mcp/asset/eb5765fb-a046-42c7-b916-37c642988f1c";
const imgDribbble     = "https://www.figma.com/api/mcp/asset/d3bcac0b-0c83-45b4-9070-c943404a4420";
const imgGithub       = "https://www.figma.com/api/mcp/asset/0703f59a-386e-4681-b823-de89c6777c4c";
const imgOtherA       = "https://www.figma.com/api/mcp/asset/154a9072-12cb-407d-8a56-4e2ab90eed47";
const imgOtherB       = "https://www.figma.com/api/mcp/asset/c9cc2616-c75e-41f9-aaf3-808c6e2e8579";
const imgGlobe        = "https://www.figma.com/api/mcp/asset/5f31e925-6555-409e-85ab-7da89f7fc466";
const imgChevron      = "https://www.figma.com/api/mcp/asset/e6d15848-31f8-42ac-9b6e-b91ac7c0e840";

/* ── Types & static data ─────────────────────────────────────────── */
type PageKey = "home" | "cases" | "about" | "playground";

type BgEntry =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

const BG_MAP: Record<PageKey, BgEntry> = {
  home:        { type: "image", src: imgBgHome },
  cases:       { type: "video", src: "/bg-cases.mp4" },
  about:       { type: "image", src: imgBgAbout },
  playground:  { type: "image", src: imgBgPlayground },
};

type LeftContent = {
  headline: string;
  subtitle: string;
  headlineMaxW: number; // px — from Figma
  subtitleMaxW: number; // px — from Figma
};

const LEFT_CONTENT: Record<PageKey, LeftContent | null> = {
  home:       null,
  cases:      { headline: "Experiência Aplicada",  headlineMaxW: 537, subtitle: "Soluções criativas para desafios reais",                                                                                    subtitleMaxW: 537 },
  about:      { headline: "Um resumo da minha",     headlineMaxW: 530, subtitle: "Minha jornada e visão de design",                                                                                          subtitleMaxW: 530 },
  playground: { headline: "O meu playground é",    headlineMaxW: 506, subtitle: "Espaço de experimentação contínua, onde pratico e aprendo novas abordagens em design de produto.", subtitleMaxW: 879 },
};

const NAV: { label: string; href: string; key: PageKey | "blog"; disabled?: boolean }[] = [
  { label: "Ínicio",      href: "/",            key: "home" },
  { label: "Cases",       href: "/cases",        key: "cases" },
  { label: "Sobre",       href: "/sobre",        key: "about" },
  { label: "Blog",        href: "/blog",         key: "blog",        disabled: true },
  { label: "Playground",  href: "/playground",   key: "playground" },
];

/* ── Language switcher ───────────────────────────────────────────── */
function LanguageSwitcher() {
  const [open, setOpen]           = useState(false);
  const [lang, setLang]           = useState<"PT" | "EN">("PT");
  const [btnHovered, setBtnHovered] = useState(false);
  const isDark = open || btnHovered;

  // close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [open]);

  return (
    <div className="relative" style={{ width: "131px" }} onClick={(e) => e.stopPropagation()}>
      {/* Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        className="flex items-center justify-between h-[40px] w-full px-[16px] rounded-[12px] border transition-all duration-200"
        style={{
          gap: "24px",
          background:   isDark ? "#242a2f" : "white",
          borderColor:  isDark ? "#242a2f" : "rgba(36,42,47,0.16)",
        }}
      >
        <div className="flex gap-[8px] items-center">
          <div className="relative size-[20px] shrink-0">
            <img
              src={imgGlobe}
              alt=""
              className="absolute inset-0 size-full transition-all duration-200"
              style={{ filter: isDark ? "brightness(0) invert(1)" : "none" }}
            />
          </div>
          <span
            className="font-['Agrandir'] font-extrabold text-[12px] tracking-[4px] uppercase transition-colors duration-200"
            style={{ color: isDark ? "white" : "#242a2f" }}
          >
            {lang}
          </span>
        </div>
        <div
          className="shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(-90deg)" : "rotate(90deg)" }}
        >
          <img
            src={imgChevron}
            alt=""
            style={{
              width: "8px",
              height: "16px",
              display: "block",
              filter: isDark ? "brightness(0) invert(1)" : "none",
              transition: "filter 0.2s ease",
            }}
          />
        </div>
      </button>

      {/* Dropdown */}
      <div
        className="absolute left-0 bg-white border border-[rgba(36,42,47,0.16)] rounded-[12px] overflow-hidden"
        style={{
          top: "44px",
          width: "131px",
          opacity:       open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform:     open ? "translateY(0)" : "translateY(-6px)",
          transition:    "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        <div className="p-[4px] flex flex-col gap-[4px]">
          {(["EN", "PT"] as const).map((l) => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              className="h-[40px] rounded-[12px] flex items-center justify-center w-full transition-all duration-200"
              style={{
                background: lang === l ? "#242a2f" : "rgba(36,42,47,0.08)",
                color:      lang === l ? "white"   : "#242a2f",
              }}
            >
              <span
                className="text-[12px] tracking-[4px] uppercase"
                style={{ fontFamily: "'Agrandir'", fontWeight: lang === l ? 800 : 300 }}
              >
                {l}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Close icon (X) ─────────────────────────────────────────────── */
function CloseButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute right-[32px] top-[65px] size-10 bg-[#242a2f] rounded-xl flex items-center justify-center cursor-pointer z-10 transition-colors duration-200"
      style={{ background: hovered ? "rgba(36,42,47,0.72)" : "#242a2f" }}
      aria-label="Fechar menu"
    >
      <div
        className="relative size-[18px]"
        style={{
          transform:  hovered ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center rotate-45">
          <div className="bg-white h-[2px] w-4 rounded-full" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center -rotate-45">
          <div className="bg-white h-[2px] w-4 rounded-full" />
        </div>
      </div>
    </button>
  );
}

/* ── Main overlay ─────────────────────────────────────────────────── */
export default function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname   = usePathname();
  const [hovered, setHovered] = useState<PageKey | null>(null);

  const activePage: PageKey =
    pathname === "/"                      ? "home"
    : pathname.startsWith("/cases")       ? "cases"
    : pathname.startsWith("/sobre")       ? "about"
    : pathname.startsWith("/playground")  ? "playground"
    : "home";

  // When hovering a nav item preview that page's content; fall back to active
  const displayPage: PageKey = hovered ?? activePage;

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[200] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* ── Backgrounds (crossfade per page) ─────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ opacity: open ? 1 : 0, transition: "opacity 0.5s ease" }}
        onClick={onClose}
      >
        {(Object.entries(BG_MAP) as [PageKey, BgEntry][]).map(([key, bg]) =>
          bg.type === "video" ? (
            <video
              key={key}
              src={bg.src}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 size-full object-cover"
              style={{
                opacity:    displayPage === key ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            />
          ) : (
            <img
              key={key}
              src={bg.src}
              alt=""
              className="absolute inset-0 size-full object-cover"
              style={{
                opacity:    displayPage === key ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            />
          )
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[rgba(36,42,47,0.72)]" />

        {/* Left text content — per page, crossfade */}
        {(Object.entries(LEFT_CONTENT) as [PageKey, LeftContent | null][]).map(
          ([key, content]) =>
            content ? (
              <div
                key={key}
                className="absolute hidden sm:block pointer-events-none"
                style={{
                  left:       "129px",
                  top:        "157px",
                  /* cap at panel left edge (1174px) minus left offset */
                  maxWidth:   "calc(min(100vw, 1174px) - 129px - 32px)",
                  opacity:    displayPage === key ? 1 : 0,
                  transform:  displayPage === key ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 0.45s ease, transform 0.45s ease",
                }}
              >
                <p
                  className="text-white text-[36px] tracking-[1px] leading-tight"
                  style={{
                    fontFamily: "'Agrandir'",
                    fontWeight: 800,
                    maxWidth:   `${content.headlineMaxW}px`,
                  }}
                >
                  {content.headline}
                </p>
                <p
                  className="text-white text-[36px] tracking-[1px] leading-snug mt-1"
                  style={{
                    fontFamily: "'Agrandir'",
                    fontWeight: 300,
                    maxWidth:   `${content.subtitleMaxW}px`,
                  }}
                >
                  {content.subtitle}
                </p>
              </div>
            ) : null
        )}
      </div>

      {/* ── Language switcher (top-left of background area) ─────── */}
      <div
        className="absolute hidden sm:block z-10"
        style={{
          left:          "129px",
          top:           "85px",
          opacity:       open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition:    "opacity 0.4s ease 0.2s",
        }}
      >
        <LanguageSwitcher />
      </div>

      {/* ── White panel ──────────────────────────────────────────── */}
      <div
        className="absolute top-0 right-0 h-full bg-white dark:bg-[#111318] rounded-bl-[32px] rounded-tl-[32px] flex flex-col w-full sm:w-[426px]"
        style={{
          transform:  open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Close button */}
        <CloseButton onClick={onClose} />

        {/* Nav items */}
        <nav
          className="mt-[74px] ml-[32px] sm:ml-[56px] flex flex-col gap-6"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV.map((item, i) => {
            const isActive  = item.key === activePage;
            const isPageKey = item.key !== "blog";
            return (
              <TransitionLink
                key={item.href}
                href={item.disabled ? "#" : item.href}
                onClick={item.disabled ? (e) => e.preventDefault() : onClose}
                onMouseEnter={() => {
                  if (isPageKey && !item.disabled)
                    setHovered(item.key as PageKey);
                }}
                className={`self-start flex items-center px-6 rounded-[16px] transition-colors duration-200 select-none
                  ${item.disabled
                    ? "pointer-events-none"
                    : "hover:bg-[rgba(36,42,47,0.06)] active:bg-[rgba(36,42,47,0.12)]"}
                  ${isActive ? "bg-[rgba(36,42,47,0.24)] pb-1 pt-3" : "py-2"}`}
                style={{
                  opacity:    open ? 1 : 0,
                  transform:  open ? "translateX(0)" : "translateX(24px)",
                  transition: `opacity 0.4s ease ${0.08 + i * 0.06}s, transform 0.4s ease ${0.08 + i * 0.06}s`,
                }}
              >
                <span
                  className="font-['Agrandir_Wide'] font-light text-[32px] whitespace-nowrap leading-none"
                  style={{ color: item.disabled ? "#E3E3E4" : "rgba(36,42,47,0.8)" }}
                >
                  {item.label}
                </span>
              </TransitionLink>
            );
          })}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom sections */}
        <div
          className="ml-[32px] sm:ml-[80px] pb-8 sm:pb-[80px] flex flex-col gap-[48px]"
          style={{
            opacity:    open ? 1 : 0,
            transition: "opacity 0.4s ease 0.42s",
          }}
        >
          {/* Outras coisas */}
          <div className="flex flex-col gap-3">
            <span className="font-['Agrandir'] text-[rgba(36,42,47,0.48)] dark:text-[rgba(240,237,232,0.48)] text-base">
              Outras coisas
            </span>
            <div className="flex gap-6 items-center">
              <img alt="" src={imgOtherA} style={{ width: "25px", height: "24px" }} />
              <a
                href="https://maps.app.goo.gl/xe3ZxwtSUUu8yezcA"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 transition-opacity duration-200"
              >
                <img alt="Brasil" src={imgOtherB} style={{ width: "30px", height: "24px" }} />
              </a>
              <span className="font-['Agrandir_Wide'] font-light text-[#242a2f] dark:text-[#f0ede8] text-[22px]">
                +12y
              </span>
            </div>
          </div>

          {/* Redes sociais */}
          <div className="flex flex-col gap-3">
            <span className="font-['Agrandir'] text-[rgba(36,42,47,0.48)] dark:text-[rgba(240,237,232,0.48)] text-base">
              Redes sociais
            </span>
            <div className="flex gap-8 items-center">
              <a href="https://www.linkedin.com/in/paulosans/" target="_blank" rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 transition-opacity duration-200">
                <img alt="LinkedIn" src={imgLinkedIn} className="size-6" />
              </a>
              <a href="https://dribbble.com/paulosans" target="_blank" rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 transition-opacity duration-200">
                <img alt="Dribbble" src={imgDribbble} className="size-6" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 transition-opacity duration-200">
                <img alt="GitHub" src={imgGithub} className="size-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
