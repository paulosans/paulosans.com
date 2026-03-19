"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TransitionLink } from "../components/TransitionLink";
import MenuOverlay from "../components/MenuOverlay";

/* ── Assets (from Figma frame 11:545, 1600×890 canvas) ──────────── */
// Mountains
const imgV9 = "https://www.figma.com/api/mcp/asset/d71a7ce7-dec1-4e96-9b4a-223a6c30546a";
const imgV8 = "https://www.figma.com/api/mcp/asset/f3a7e03e-5ab6-4513-95cb-bc02dcaa8101";
const imgV7 = "https://www.figma.com/api/mcp/asset/ca2af8aa-7fa9-43d4-a50d-9def84ddda09";
const imgV6 = "https://www.figma.com/api/mcp/asset/dea0a9aa-d40a-448d-ae1e-791c809e56cb";
const imgV5 = "https://www.figma.com/api/mcp/asset/6637f4a0-f251-4d94-9a3c-43104382c399";
const imgV4 = "https://www.figma.com/api/mcp/asset/decf6324-9c81-485b-8e99-16ea04275b1c";
const imgV2 = "https://www.figma.com/api/mcp/asset/a482f26d-21b5-4c66-b6d5-927a91507782";
const imgV3 = "https://www.figma.com/api/mcp/asset/e3c6debb-1f66-459c-8237-6f4f1c2a159b";

// Flag A – Atuações Anteriores 2014-2018
const imgFlagImg  = "https://www.figma.com/api/mcp/asset/0bae5691-274a-4ce3-84d3-b7b4e51349fe";
const imgPoleA    = "https://www.figma.com/api/mcp/asset/570706e3-b25e-4aeb-b3bf-9ff78265a79a";

// Flag B – Descomplica 2020-2021
const imgBadgeB   = "https://www.figma.com/api/mcp/asset/2de860b5-5dac-416a-8b35-5e3f0527ce45";
const imgDotB     = "https://www.figma.com/api/mcp/asset/8d7a4b6d-e500-422f-a7a8-6339852d7b5e";
const imgPoleB    = "https://www.figma.com/api/mcp/asset/0cae536f-1da0-429d-b0a7-a8eee106d31a";

// Flag C – Warren 2021-2022
const imgBadgeC   = "https://www.figma.com/api/mcp/asset/0bab212e-07f8-448d-b6c1-6d02a9782014";
const imgDotC     = "https://www.figma.com/api/mcp/asset/17ceba66-7226-43a6-8904-ca51a49ba034";
const imgPoleC    = "https://www.figma.com/api/mcp/asset/afc5c437-609f-49d5-9943-8229d5125904";

// Flag D – Itaú 2022-2024
const imgBadgeD   = "https://www.figma.com/api/mcp/asset/93f61bd0-f631-4ef2-8490-e21b459025ca";
const imgDotD     = "https://www.figma.com/api/mcp/asset/60ef6d9c-ba01-4928-bb43-7f4cad92e295";
const imgPoleD    = "https://www.figma.com/api/mcp/asset/edff2439-7437-4bb4-8650-d2c7a6f668cd";

const imgArrowns  = "https://www.figma.com/api/mcp/asset/dbd5aaad-2d39-47c6-9ae5-d7b0e2883607";

/* ── Pole: grows downward from 0 to full height ─────────────────── */
function Pole({ src, left, top, height, visible }: { src: string; left: number; top: number; height: number; visible: boolean }) {
  return (
    <motion.div
      style={{ position: "absolute", left, top, width: 0, overflow: "visible" }}
      initial={{ height: 0 }}
      animate={{ height: visible ? height : 0 }}
      transition={{ type: "spring", stiffness: 160, damping: 22 }}
    >
      <div style={{ position: "absolute", inset: "0 -1px" }}>
        <img src={src} alt="" style={{ display: "block", width: "100%", height: "100%" }} />
      </div>
    </motion.div>
  );
}

/* ── InfoBlock ───────────────────────────────────────────────────── */
function InfoBlock({ left, top, align, year, company, sub }: {
  left: number; top: number; align: "left" | "right";
  year: string; company: string; sub: React.ReactNode;
}) {
  return (
    <div style={{ position: "absolute", left, top, width: 232, textAlign: align }}>
      <p style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px", lineHeight: "normal" }}>
        {year}
      </p>
      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
        <p style={{ fontFamily: "'Agrandir'", fontWeight: 700, fontSize: 20, color: "#242a2f", lineHeight: "normal" }}>
          {company}
        </p>
        <div style={{ fontFamily: "'Agrandir Narrow', Arial, sans-serif", fontSize: 16, color: "#616569", letterSpacing: "0.64px", lineHeight: "24px" }}>
          {sub}
        </div>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function AtuacoesPage() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [backHovered, setBackHovered] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  const [step, setStep]           = useState(0);
  const [scale, setScale]         = useState(1);
  const [offsetX, setOffsetX]     = useState(0);
  const [offsetY, setOffsetY]     = useState(0);

  // Sequential flag reveal
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 2400),
      setTimeout(() => setStep(3), 4000),
      setTimeout(() => setStep(4), 5600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Scale the 1600×890 canvas to cover the viewport
  useEffect(() => {
    const update = () => {
      const s = Math.max(window.innerWidth / 1600, window.innerHeight / 890);
      setScale(s);
      setOffsetX((window.innerWidth - 1600 * s) / 2);
      setOffsetY((window.innerHeight - 890 * s) / 2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const ease06 = { duration: 0.6, ease: "easeInOut" as const };

  return (
    <>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div style={{ position: "fixed", inset: 0, overflow: "hidden", background: "white" }}>
        {/* ── 1600×890 Figma scene, scaled to fill viewport ────────── */}
        <div
          style={{
            position: "absolute",
            width: 1600,
            height: 890,
            transformOrigin: "0 0",
            transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
          }}
        >

          {/* ── Mountain layers (exact Figma px positions) ───────────── */}
          <div style={{ position: "absolute", left: 812, top: 521, width: 797, height: 316 }}>
            <img src={imgV9} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          </div>
          <div style={{ position: "absolute", left: -11.64, top: 422, width: 1485.975, height: 470.898 }}>
            <img src={imgV8} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          </div>
          <div style={{ position: "absolute", left: 179.81, top: 510.8, width: 408.701, height: 242.384, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ transform: "rotate(-2.38deg)", flexShrink: 0 }}>
              <div style={{ position: "relative", width: 399.671, height: 226 }}>
                <img src={imgV7} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", right: 0, top: 560, width: 1672, height: 339 }}>
            <img src={imgV6} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          </div>
          <div style={{ position: "absolute", right: -51, top: 601, width: 1652, height: 305 }}>
            <img src={imgV5} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          </div>
          <div style={{ position: "absolute", bottom: 0.42, left: 238.91, width: 1282.712, height: 193.466 }}>
            <img src={imgV4} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          </div>
          <div style={{ position: "absolute", left: -1.32, top: 693.52, width: 380.78, height: 197.243 }}>
            <img src={imgV2} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          </div>
          <div style={{ position: "absolute", bottom: 0.3, right: 0.15, width: 877.853, height: 156.704 }}>
            <img src={imgV3} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          </div>

          {/* ── Flag A – Atuações Anteriores 2014-2018 ────────────────── */}
          <motion.div
            style={{ position: "absolute", left: 124, top: 209, width: 265, height: 395 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? (step >= 2 ? 0.4 : 1) : 0 }}
            transition={ease06}
          >
            {/* Info block – right-aligned, ends 69px from wrapper right edge */}
            <div style={{ position: "absolute", right: 69, top: 15, width: 232, textAlign: "right" }}>
              <p style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px", lineHeight: "normal" }}>
                2014 - 2018
              </p>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                <p style={{ fontFamily: "'Agrandir'", fontWeight: 700, fontSize: 16, color: "#242a2f", lineHeight: "normal", width: "100%" }}>
                  Atuação Anteriores
                </p>
                <p style={{ fontFamily: "'Agrandir Narrow', Arial, sans-serif", fontSize: 16, color: "#616569", letterSpacing: "0.64px", lineHeight: "24px", width: "100%" }}>
                  Product Design em Startups, PMEs e Consultoria de produto.
                </p>
                <p style={{ fontFamily: "'Agrandir'", fontWeight: 700, fontSize: 16, color: "#242a2f", lineHeight: "24px", width: "100%" }}>
                  Primeiro contato com DS
                </p>
              </div>
            </div>

            {/* Waving flag (thin silhouette) – left: 205, top: 0, opacity 0.4 at rest */}
            <div style={{ position: "absolute", left: 205, top: 0, width: 20, height: 45, overflow: "hidden", opacity: 0.4 }}>
              <img src={imgFlagImg} alt="" style={{ position: "absolute", height: "133.06%", left: "2%", top: 0, width: "299.38%", maxWidth: "none" }} />
            </div>

            {/* Colored flag (rounded) */}
            <div style={{ position: "absolute", left: 221, top: 9, width: 44, height: 36, borderRadius: 5, overflow: "hidden" }}>
              <img src={imgFlagImg} alt="" style={{ position: "absolute", height: "166.32%", left: "-35.45%", top: "-25%", width: "136.08%", maxWidth: "none" }} />
            </div>

            {/* Pole A */}
            <Pole src={imgPoleA} left={220} top={45} height={350} visible={step >= 1} />
          </motion.div>

          {/* ── Flag B – Descomplica 2020-2021 ───────────────────────── */}
          <motion.div
            style={{ position: "absolute", inset: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 2 ? 1 : 0 }}
            transition={ease06}
          >
            {/* Badge */}
            <div style={{ position: "absolute", left: 515, top: 304, width: 45, height: 44 }}>
              <img src={imgBadgeB} alt="Descomplica" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            </div>
            {/* Dot */}
            <div style={{ position: "absolute", left: 578, top: 323, width: 8, height: 8 }}>
              <img src={imgDotB} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            </div>
            {/* Pole */}
            <Pole src={imgPoleB} left={582} top={339} height={233} visible={step >= 2} />
            {/* Info */}
            <InfoBlock
              left={606} top={316}
              align="left"
              year="2020 - 2021"
              company="Descomplica"
              sub={<><span style={{ color: "#242a2f" }}>Design System</span>, Product Design, Service design</>}
            />
          </motion.div>

          {/* ── Flag C – Warren 2021-2022 ─────────────────────────────── */}
          <motion.div
            style={{ position: "absolute", inset: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 3 ? 1 : 0 }}
            transition={ease06}
          >
            {/* Badge – right: 693 → left: 1600-693-37.286 ≈ 869.7 */}
            <div style={{ position: "absolute", left: 869.7, top: 262, width: 37.286, height: 36 }}>
              <img src={imgBadgeC} alt="Warren" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            </div>
            {/* Dot */}
            <div style={{ position: "absolute", left: 922, top: 275, width: 8, height: 8 }}>
              <img src={imgDotC} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            </div>
            {/* Pole */}
            <Pole src={imgPoleC} left={926} top={291} height={231} visible={step >= 3} />
            {/* Info */}
            <InfoBlock
              left={950} top={268}
              align="left"
              year="2021 - 2022"
              company="Warren"
              sub={<><span style={{ color: "#242a2f" }}>Product design</span>,{"\n UX Writing, Design System"}</>}
            />
          </motion.div>

          {/* ── Flag D – Itaú 2022-2024 ───────────────────────────────── */}
          <motion.div
            style={{ position: "absolute", inset: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 4 ? 1 : 0 }}
            transition={ease06}
          >
            {/* Badge */}
            <div style={{ position: "absolute", left: 1204, top: 376, width: 47, height: 48, overflow: "hidden" }}>
              <img src={imgBadgeD} alt="Itaú" style={{ position: "absolute", height: "111.17%", left: "-48.57%", top: "-5.59%", width: "196.5%", maxWidth: "none" }} />
            </div>
            {/* Dot */}
            <div style={{ position: "absolute", left: 1267, top: 395, width: 8, height: 8 }}>
              <img src={imgDotD} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            </div>
            {/* Pole */}
            <Pole src={imgPoleD} left={1271} top={411} height={286} visible={step >= 4} />
            {/* Info */}
            <InfoBlock
              left={1295} top={388}
              align="left"
              year="2022 - 2024"
              company="Itaú"
              sub={<><span style={{ color: "#242a2f" }}>Design System</span>, Design Ops, Service design</>}
            />
          </motion.div>

          {/* ── Navigation (exact Figma positions) ───────────────────── */}
          {/* Back – left: 200, top: 54 */}
          <TransitionLink
            href="/sobre"
            style={{
              position: "absolute", left: 200, top: 54,
              display: "flex", alignItems: "center", gap: backHovered ? 16 : 24,
              paddingLeft: 8, paddingRight: 24, paddingTop: 8, paddingBottom: 8,
              cursor: "pointer",
              background: backHovered ? "rgba(36,42,47,0.16)" : "transparent",
              borderRadius: backHovered ? 16 : 0,
              transition: "gap 300ms, background 300ms, border-radius 300ms",
            }}
            onMouseEnter={() => setBackHovered(true)}
            onMouseLeave={() => setBackHovered(false)}
          >
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 12, width: 40, height: 40,
              background: backHovered ? "transparent" : "rgba(36,42,47,0.08)",
              transition: "background 300ms",
              flexShrink: 0,
            }}>
              <img src={imgArrowns} alt="" style={{ width: 40, height: 40, objectFit: "contain", display: "block", transform: "rotate(-90deg)" }} />
            </div>
            <span style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px", whiteSpace: "nowrap" }}>
              Voltar
            </span>
          </TransitionLink>

          {/* Cases – left: 1010, top: 65.5 */}
          <TransitionLink
            href="/cases"
            style={{
              position: "absolute", left: 1010, top: 65.5,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 8, cursor: "pointer",
            }}
          >
            <span style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px", whiteSpace: "nowrap" }}>
              Cases
            </span>
          </TransitionLink>

          {/* Sobre (active) – left: 1131, top: 65.5 */}
          <div style={{
            position: "absolute", left: 1131, top: 65.5,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 8, background: "white", borderRadius: 8,
          }}>
            <span style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px", whiteSpace: "nowrap" }}>
              Sobre
            </span>
          </div>

          {/* Menu – left: 1242, top: 57 */}
          <button
            onClick={() => setMenuOpen(true)}
            onMouseEnter={() => setMenuHovered(true)}
            onMouseLeave={() => setMenuHovered(false)}
            style={{
              position: "absolute", left: 1242, top: 57,
              display: "flex", alignItems: "center", justifyContent: "center",
              paddingLeft: 24, paddingRight: 8, paddingTop: 8, paddingBottom: 8,
              gap: menuHovered ? 16 : 24,
              cursor: "pointer",
              background: menuHovered ? "rgba(36,42,47,0.16)" : "transparent",
              borderRadius: menuHovered ? 16 : 0,
              border: "none",
              transition: "gap 300ms, background 300ms, border-radius 300ms",
            }}
          >
            <span style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: 18, color: "#242a2f", letterSpacing: "0.72px", whiteSpace: "nowrap" }}>
              Menu
            </span>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 12, width: 40, height: 40,
              background: menuHovered ? "transparent" : "rgba(36,42,47,0.08)",
              gap: menuHovered ? 0 : 3,
              transition: "background 300ms, gap 300ms",
            }}>
              <div style={{
                background: "#242a2f", borderRadius: 12, width: 4, height: 4,
                opacity: menuHovered ? 0 : 1,
                transition: "opacity 300ms, width 300ms",
              }} />
              <div style={{
                background: "#242a2f", height: 4, borderRadius: 12,
                width: menuHovered ? 17 : 10,
                transition: "width 300ms",
              }} />
            </div>
          </button>

        </div>
      </div>
    </>
  );
}
