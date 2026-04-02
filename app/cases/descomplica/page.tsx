"use client";

import { useState } from "react";
import { TransitionLink } from "../../components/TransitionLink";
import MenuOverlay from "../../components/MenuOverlay";

const BRAND_COLOR = "#00E887";

export default function DescomplicaCasePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [backHovered, setBackHovered] = useState(false);

  return (
    <>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-h-screen bg-white overflow-x-hidden">

        {/* ── Nav ─────────────────────────────────────────────── */}
        <nav className="flex items-center justify-between pt-12 px-6 sm:px-12 lg:px-[200px]">
          <TransitionLink
            href="/cases"
            className="flex items-center pl-2 pr-6 py-2 cursor-pointer transition-all duration-300"
            style={{
              gap: backHovered ? "16px" : "24px",
              background: backHovered ? "rgba(36,42,47,0.16)" : "transparent",
              borderRadius: backHovered ? "16px" : "0px",
            }}
            onMouseEnter={() => setBackHovered(true)}
            onMouseLeave={() => setBackHovered(false)}
          >
            <div
              className="flex items-center justify-center rounded-xl size-10 transition-all duration-300"
              style={{ background: backHovered ? "transparent" : "rgba(36,42,47,0.08)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="#242a2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px", whiteSpace: "nowrap" }}>
              Voltar
            </span>
          </TransitionLink>

          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center justify-center pl-6 pr-2 py-2 cursor-pointer"
            style={{ gap: 24 }}
          >
            <span style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px" }}>Menu</span>
            <div className="flex items-center justify-center rounded-xl size-10" style={{ background: "rgba(36,42,47,0.08)", gap: 3 }}>
              <div style={{ background: "#242a2f", borderRadius: 12, width: 4, height: 4 }} />
              <div style={{ background: "#242a2f", height: 4, borderRadius: 12, width: 10 }} />
            </div>
          </button>
        </nav>

        {/* ── Hero ────────────────────────────────────────────── */}
        <div className="px-6 sm:px-12 lg:px-[200px] mt-16 lg:mt-[80px]">

          <div className="flex items-center gap-4 mb-8">
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: BRAND_COLOR }} />
            <span style={{ fontFamily: "'Agrandir Narrow'", fontSize: 14, color: "rgba(36,42,47,0.56)", letterSpacing: "2px", textTransform: "uppercase" }}>
              Aprendizado & Carreira
            </span>
          </div>

          <h1 style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: "clamp(40px, 7vw, 108px)", color: "#242a2f", lineHeight: 0.9, letterSpacing: "-2px" }}>
            Descomplica
          </h1>

          <p style={{ fontFamily: "'Agrandir Narrow'", fontSize: 24, color: "rgba(36,42,47,0.56)", marginTop: 24, lineHeight: "36px", maxWidth: 560 }}>
            Colaboração no aprendizado e carreira
          </p>

          <div style={{ width: "100%", height: 1, background: "rgba(36,42,47,0.1)", marginTop: 64, marginBottom: 64 }} />

          <div
            className="flex items-center justify-center rounded-[24px] mt-8"
            style={{ height: 480, background: `${BRAND_COLOR}18` }}
          >
            <p style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 22, color: "#242a2f", letterSpacing: "0.5px" }}>
              Em breve
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
