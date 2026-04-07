"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TransitionLink } from "../../components/TransitionLink";
import MenuOverlay from "../../components/MenuOverlay";

const BRAND = "#00cd8e";

/* ── Back button ─────────────────────────────────────────────────── */
function BackButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <TransitionLink
      href="/cases"
      className="flex items-center cursor-pointer transition-all duration-300"
      style={{
        gap: hovered ? "12px" : "16px",
        background: "transparent",
        borderRadius: "12px",
        padding: "6px 20px 6px 6px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
          background: "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.3s",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M15 6l-6 6 6 6" stroke="#242a2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px" }}>
        Voltar
      </span>
    </TransitionLink>
  );
}

/* ── Menu button ─────────────────────────────────────────────────── */
function MenuButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center cursor-pointer transition-all duration-300"
      style={{
        gap: hovered ? "12px" : "16px",
        background: hovered ? "rgba(36,42,47,0.08)" : "transparent",
        borderRadius: "12px",
        padding: "6px 6px 6px 20px",
      }}
    >
      <span style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px" }}>
        Menu
      </span>
      <div
        className="flex items-center justify-center rounded-xl size-10"
        style={{ background: hovered ? "transparent" : "rgba(36,42,47,0.08)", gap: 3 }}
      >
        <div style={{ background: "#242a2f", borderRadius: 12, width: 4, height: 4 }} />
        <div style={{ background: "#242a2f", height: 4, borderRadius: 12, width: 10 }} />
      </div>
    </button>
  );
}

/* ── D-symbol icon (Descomplica logo) ────────────────────────────── */
function DSymbol() {
  return (
    <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
      {/* badge shape */}
      <div style={{ position: "absolute", top: "5.78%", right: "3.72%", bottom: "0", left: "2.08%" }}>
        <img src="/figma-assets/descomplica-d-badge.svg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
      </div>
      {/* d letter */}
      <div style={{ position: "absolute", top: "0", right: "23.23%", bottom: "19.75%", left: "22.2%" }}>
        <img src="/figma-assets/descomplica-d-letter.svg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
      </div>
    </div>
  );
}

/* ── Award badge (Brasil Design Award) ───────────────────────────── */
function AwardBadge() {
  return (
    // total width = 11 (left wing) + 93 (badge) + 11 (right wing) = 115
    <a
      href="https://www.instagram.com/p/CIrAzxgpeED/?img_index=6"
      target="_blank"
      rel="noopener noreferrer"
      style={{ position: "relative", display: "block", width: 115, height: 187, flexShrink: 0 }}
    >
      {/* left triangle wing */}
      <img src="/figma-assets/descomplica-award-left.svg" alt="" style={{ position: "absolute", top: 0, left: 0, width: 11, height: 31 }} />
      {/* right triangle wing (mirrored) */}
      <img src="/figma-assets/descomplica-award-right.svg" alt="" style={{ position: "absolute", top: 0, right: 0, width: 11, height: 31, transform: "rotate(180deg) scaleY(-1)" }} />
      {/* orange body */}
      <div style={{ position: "absolute", top: 0, left: 11, width: 93, height: 158, background: "#f96330" }} />
      {/* award image */}
      <div style={{ position: "absolute", top: 5, left: 27, width: 61, height: 110, overflow: "hidden" }}>
        <img
          src="/figma-assets/descomplica-award-img.png"
          alt=""
          style={{ position: "absolute", height: "123.37%", left: "-25.87%", top: "-13.05%", width: "151.75%", maxWidth: "none" }}
        />
      </div>
      {/* Bronze label */}
      <p style={{ position: "absolute", top: 106, left: 29, fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 12, color: "white", lineHeight: "50px", letterSpacing: "0.06px" }}>
        Bronze
      </p>
      {/* Year */}
      <p style={{ position: "absolute", top: 119, left: 29, fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 8, color: "white", lineHeight: "50px", letterSpacing: "2px" }}>
        2020
      </p>
      {/* bottom ribbon */}
      <img
        src="/figma-assets/descomplica-award-ribbon.svg"
        alt=""
        style={{ position: "absolute", bottom: 0, left: 11, width: 93, height: 29 }}
      />
    </a>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function DescomplicaCasePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-h-screen bg-white overflow-x-hidden">

        {/* ── Nav ──────────────────────────────────────────────────── */}
        <nav className="flex items-center justify-between pt-[54px] px-6 sm:px-12 lg:px-[200px] pb-2">
          <BackButton />
          <div className="flex items-center gap-8">
            <div className="px-2 py-2 rounded-[8px] bg-[rgba(36,42,47,0.08)]">
              <span style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px" }}>Cases</span>
            </div>
            <TransitionLink href="/sobre" className="px-2 py-2 group">
              <span style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px" }} className="transition-opacity group-hover:opacity-60">
                Sobre
              </span>
            </TransitionLink>
            <MenuButton onClick={() => setMenuOpen(true)} />
          </div>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div className="mt-8 px-6 sm:px-12 lg:px-[200px]">
          <div
            style={{
              height: "clamp(220px, 41.2vw, 624px)",
              borderRadius: "clamp(24px,2.6vw,40px)",
              border: "1px solid rgba(36,42,47,0.16)",
              background: BRAND,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src="/figma-assets/descomplica-hero-overlay.svg"
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* ── Info row ─────────────────────────────────────────────── */}
        <div className="mt-8 px-6 sm:px-12 lg:px-[200px] flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-4">
            <DSymbol />
            <div>
              <p style={{ fontFamily: "'Agrandir Wide'", fontWeight: 300, fontSize: "clamp(16px,1.6vw,24px)", color: "#242a2f", letterSpacing: "1px", lineHeight: 1.3 }}>
                Conexões e Oportunidades Profissionais
              </p>
              <p style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: "clamp(18px,1.9vw,28px)", color: "#242a2f", letterSpacing: "1px" }}>
                na LMS do Descomplica
              </p>
            </div>
          </div>
          <AwardBadge />
        </div>

        {/* ── Content section ──────────────────────────────────────── */}
        <div className="mt-16 px-6 sm:px-12 lg:px-[200px] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 pb-16 relative">

          {/* Left: mockup + green blob */}
          <div
            className="flex-shrink-0 relative self-center lg:self-auto"
            style={{
              width: "clamp(216px, 30.9vw, 469px)",
              height: "clamp(200px, 27.5vw, 417px)",
            }}
          >
            {/* green blob background — centered behind mockup, rotated as in Figma */}
            <img
              src="/figma-assets/descomplica-logo-bg.svg"
              alt=""
              style={{
                position: "absolute",
                width: "clamp(180px, 23.7vw, 360px)",
                height: "clamp(180px, 23.7vw, 360px)",
                left: "-8%",
                top: "10%",
                zIndex: 0,
                transform: "rotate(180deg) scaleY(-1)",
              }}
            />
            {/* phone+tablet mockup */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 1 }}>
              <img
                src="/figma-assets/descomplica-mockup.png"
                alt="Descomplica app mockup"
                style={{
                  position: "absolute",
                  height: "139.33%",
                  left: "-30.73%",
                  top: "-24.94%",
                  width: "165.08%",
                  maxWidth: "none",
                }}
              />
            </div>
          </div>

          {/* Right: text content */}
          <div className="flex-1 min-w-0 lg:pl-12 flex flex-col" style={{ maxWidth: 688 }}>

            <h2 style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: "clamp(28px,2.6vw,40px)", color: "#242a2f", lineHeight: "1.25", letterSpacing: "0.2px" }}>
              Colaboração no aprendizado e carreira
            </h2>

            <p className="mt-[26px]" style={{ fontFamily: "'Agrandir Narrow'", fontSize: "clamp(17px,1.4vw,21px)", color: "#616569", lineHeight: "33px" }}>
              Atuando como{" "}
              <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>designer de produto no time do Descomplica</strong>
              , focando em melhorar a experiência do usuário por meio de interfaces intuitivas. Contribuí para o aprimoramento da usabilidade e engajamento de um produto educacional de sucesso no Brasil.
            </p>

            {/* Green metric box */}
            <div
              className="flex items-center gap-4 rounded-[16px] mt-8"
              style={{ background: "rgba(0,128,0,0.04)", padding: "8px 32px" }}
            >
              <img src="/figma-assets/descomplica-auto-graph.svg" alt="" style={{ width: 32, height: 32, flexShrink: 0 }} />
              <p style={{ fontFamily: "'Agrandir Narrow'", fontSize: "clamp(16px,1.3vw,20px)", color: "#616569", lineHeight: "32px" }}>
                Essa iniciativa resultou{" "}
                <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>em um aumento de 70% no WAU</strong>
                {" "}e{" "}
                <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>75 pontos no NPS</strong>
                {" "}da graduação.
              </p>
            </div>

            {/* Entregáveis + Time */}
            <div className="flex flex-wrap gap-16 mt-10">
              <div style={{ minWidth: 220 }}>
                <p style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 24, color: "#242a2f", marginBottom: 8 }}>
                  Entregáveis
                </p>
                <p style={{ fontFamily: "'Agrandir'", fontSize: 18, color: "#616569", lineHeight: "32px" }}>
                  Research • Design System<br />• Ui Design • Ux design
                </p>
              </div>

              <div style={{ minWidth: 200 }}>
                <p style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 24, color: "#242a2f", marginBottom: 8 }}>
                  Time
                </p>
                <p style={{ fontFamily: "'Agrandir'", fontSize: 18, color: "#616569", lineHeight: "32px" }}>
                  Time:{" "}
                  <strong style={{ fontFamily: "'Agrandir'", fontWeight: 700, color: "#242a2f" }}>3 UXD, 2 PM, 6 devs, 1 QA</strong>
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {/* Frame 14 — avatar stack 80×29 */}
                  <div style={{ position: "relative", width: 80, height: 29, flexShrink: 0 }}>
                    {/* border ring slot 3 (rightmost) */}
                    <div style={{ position: "absolute", left: 54, top: 2, width: 24, height: 24 }}>
                      <div style={{ position: "absolute", inset: "-8.33%" }}>
                        <img src="/figma-assets/descomplica-ellipse57.svg" alt="" style={{ display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                      </div>
                    </div>
                    {/* male memoji 1 */}
                    <div style={{ position: "absolute", left: 52, top: 1, width: 28, height: 28 }}>
                      <img src="/figma-assets/descomplica-memoji-male1.png" alt="" style={{ position: "absolute", inset: 0, maxWidth: "none", objectFit: "cover", width: "100%", height: "100%", pointerEvents: "none" }} />
                    </div>
                    {/* border ring slot 2 */}
                    <div style={{ position: "absolute", left: 36, top: 2, width: 24, height: 24 }}>
                      <div style={{ position: "absolute", inset: "-8.33%" }}>
                        <img src="/figma-assets/descomplica-ellipse57.svg" alt="" style={{ display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                      </div>
                    </div>
                    {/* angela memoji */}
                    <div style={{ position: "absolute", left: 34, top: 0, width: 28, height: 28 }}>
                      <img src="/figma-assets/descomplica-memoji-angela.png" alt="" style={{ position: "absolute", inset: 0, maxWidth: "none", objectFit: "cover", width: "100%", height: "100%", pointerEvents: "none" }} />
                    </div>
                    {/* border ring slot 1 */}
                    <div style={{ position: "absolute", left: 18, top: 2, width: 24, height: 24 }}>
                      <div style={{ position: "absolute", inset: "-8.33%" }}>
                        <img src="/figma-assets/descomplica-ellipse57.svg" alt="" style={{ display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                      </div>
                    </div>
                    {/* male memoji 2 */}
                    <div style={{ position: "absolute", left: 16, top: 1, width: 28, height: 28 }}>
                      <img src="/figma-assets/descomplica-memoji-male2.png" alt="" style={{ position: "absolute", inset: 0, maxWidth: "none", objectFit: "cover", width: "100%", height: "100%", pointerEvents: "none" }} />
                    </div>
                    {/* Ellipse 53 — leftmost placeholder (no memoji) */}
                    <div style={{ position: "absolute", left: 0, top: 2, width: 24, height: 24 }}>
                      <div style={{ position: "absolute", inset: "-8.33%" }}>
                        <img src="/figma-assets/descomplica-ellipse53.png" alt="" style={{ display: "block", maxWidth: "none", width: "100%", height: "100%" }} />
                      </div>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Agrandir'", fontSize: 18, color: "#616569", lineHeight: "32px", whiteSpace: "nowrap" }}>
                    Atuando com 2 designers
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right chevron — desktop only */}
          <div className="hidden lg:flex items-center absolute" style={{ right: 0, top: "50%", transform: "translateY(-50%)" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M13 8l8 8-8 8" stroke="#242a2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
            </svg>
          </div>
        </div>

      </div>
    </>
  );
}
