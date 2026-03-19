"use client";

import React, { useState } from "react";
import { TransitionLink } from "../components/TransitionLink";
import MenuOverlay from "../components/MenuOverlay";

/* ── Assets ─────────────────────────────────────────────────────── */
const imgArrowns = "https://www.figma.com/api/mcp/asset/7f1e3006-7a72-4bd7-b87a-03c77aa8e70f";

/* ── Sub-components ─────────────────────────────────────────────── */
function MenuButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center pl-6 pr-2 py-2 cursor-pointer transition-all duration-300"
      style={{
        gap: hovered ? "16px" : "24px",
        background: hovered ? "rgba(36,42,47,0.16)" : "transparent",
        borderRadius: hovered ? "16px" : "0px",
      }}
    >
      <span className="font-['Agrandir'] font-light text-[#242a2f] text-lg tracking-[0.72px] whitespace-nowrap">
        Menu
      </span>
      <div
        className="flex items-center justify-center rounded-xl size-10 transition-all duration-300"
        style={{
          background: hovered ? "transparent" : "rgba(36,42,47,0.08)",
          gap: hovered ? "0px" : "3px",
        }}
      >
        <div
          className="bg-[#242a2f] rounded-xl size-1 transition-all duration-300"
          style={{ opacity: hovered ? 0 : 1, width: hovered ? "0px" : "4px" }}
        />
        <div
          className="bg-[#242a2f] h-1 rounded-xl transition-all duration-300"
          style={{ width: hovered ? "17px" : "10px" }}
        />
      </div>
    </button>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[#242a2f] mb-6"
      style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: "28px" }}
    >
      {children}
    </h2>
  );
}

function ExperienceItem({
  company,
  period,
  role,
  description,
}: {
  company: string;
  period: string;
  role: string;
  description: React.ReactNode;
}) {
  return (
    <div className="curriculo-experience-item mb-10">
      <p className="curriculo-experience-company" style={{ fontFamily: "'Agrandir'", fontWeight: 700, fontSize: "22px", color: "#242a2f" }}>
        {company} — {period}
      </p>
      <p className="curriculo-experience-role mt-1" style={{ fontFamily: "'Agrandir Narrow', Arial, sans-serif", fontSize: "19px", color: "#242a2f" }}>
        {role}
      </p>
      <p className="curriculo-experience-description mt-2" style={{ fontFamily: "'Agrandir Narrow', Arial, sans-serif", fontSize: "16px", color: "rgba(36,42,47,0.72)", lineHeight: "26px" }}>
        {description}
      </p>
    </div>
  );
}

function EducationItem({ title, institution }: { title: string; institution: string }) {
  return (
    <div className="curriculo-education-item mb-6">
      <p className="curriculo-education-title" style={{ fontFamily: "'Agrandir'", fontWeight: 700, fontSize: "19px", color: "#242a2f", lineHeight: "1.3" }}>
        {title}
      </p>
      <p className="curriculo-education-institution mt-1" style={{ fontFamily: "'Agrandir Narrow', Arial, sans-serif", fontSize: "16px", color: "#242a2f" }}>
        {institution}
      </p>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function CurriculoPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [backHovered, setBackHovered] = useState(false);
return (
    <>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="curriculo-page min-h-screen bg-white overflow-x-hidden">

        {/* ── Nav ──────────────────────────────────────────────────── */}
        <nav className="curriculo-nav flex items-center justify-between pt-12 px-6 sm:px-12 lg:px-[200px]">
          <TransitionLink
            href="/sobre"
            className="curriculo-nav-back flex items-center pl-2 pr-6 py-2 cursor-pointer transition-all duration-300"
            style={{
              gap: backHovered ? "16px" : "24px",
              background: backHovered ? "rgba(36,42,47,0.16)" : "transparent",
              borderRadius: backHovered ? "16px" : "0px",
            }}
            onMouseEnter={() => setBackHovered(true)}
            onMouseLeave={() => setBackHovered(false)}
          >
            <div
              className="curriculo-nav-back-icon flex items-center justify-center rounded-xl size-10 transition-all duration-300"
              style={{ background: backHovered ? "transparent" : "rgba(36,42,47,0.08)" }}
            >
              <img
                src={imgArrowns}
                alt=""
                style={{ width: "40px", height: "40px", objectFit: "contain", display: "block", transform: "rotate(-90deg)" }}
              />
            </div>
            <span className="curriculo-nav-back-label font-['Agrandir'] font-light text-[#242a2f] text-lg tracking-[0.72px] whitespace-nowrap">
              Voltar
            </span>
          </TransitionLink>

          <div className="curriculo-nav-right flex items-center gap-4">
            <MenuButton onClick={() => setMenuOpen(true)} />
          </div>
        </nav>

        {/* ── Content ──────────────────────────────────────────────── */}
        <div className="curriculo-content px-6 sm:px-12 lg:px-[272px] pb-24">

          {/* ── Header ───────────────────────────────────────────── */}
          <div className="curriculo-header flex flex-col lg:flex-row lg:items-start lg:justify-between mt-16 lg:mt-[87px] pb-8">
            <div className="curriculo-header-name">
              <h1 style={{ fontFamily: "'Agrandir'", fontWeight: 800, fontSize: "40px", color: "#242a2f", lineHeight: 1.1 }}>
                Paulo Santos
              </h1>
              <p className="mt-1" style={{ fontFamily: "'Agrandir'", fontWeight: 300, fontSize: "24px", color: "#242a2f", letterSpacing: "0.5px" }}>
                Designer Specialist
              </p>
            </div>
            <div className="curriculo-header-contact mt-4 lg:mt-3 text-left lg:text-right" style={{ fontFamily: "'Agrandir Narrow', Arial, sans-serif", fontSize: "16px" }}>
              <a href="mailto:omelhoremaildopaulo@gmail.com" className="block text-[#242a2f] hover:underline">
                omelhoremaildopaulo<span className="underline">@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/paulosans/" target="_blank" rel="noopener noreferrer" className="block underline text-[#242a2f] mt-1">
                linkedin.com/in/paulosans
              </a>
            </div>
          </div>

          {/* ── Bio banner ───────────────────────────────────────── */}
          <div
            className="curriculo-bio flex items-center gap-4 px-8 py-4 mb-12 rounded-[16px]"
            style={{ background: "rgba(0,0,0,0.04)" }}
          >
            <span style={{ fontSize: "24px" }}>👋</span>
            <p style={{ fontFamily: "'Agrandir Narrow', Arial, sans-serif", fontSize: "16px", color: "#242a2f" }}>
              Designer especializado em produtos digitais, com experiência em Design Systems.
            </p>
          </div>

          {/* ── Two-column layout ────────────────────────────────── */}
          <div className="curriculo-columns flex flex-col lg:flex-row lg:gap-[100px]">

            {/* ── Left — Experiência ────────────────────────────── */}
            <div className="curriculo-experience lg:w-[486px] shrink-0">
              <SectionTitle>Experiência</SectionTitle>

              <ExperienceItem
                company="Mercadolivre"
                period="2025 / Atualmente"
                role="Product Designer Specialist"
                description="Atuando como Product Designer Especialista no time de Shipping, responsável pelas plataformas que organizam e estruturam as métricas de desempenho dos vendedores."
              />
              <ExperienceItem
                company="BRQ"
                period="2025 / 2025"
                role="Lead Product Designer"
                description="Atuando como Designer de Produto Especialista na Visa, com foco em descoberta de oportunidades, prototipação e validação com usuários."
              />
              <ExperienceItem
                company="Itaú"
                period="2022 / 2024"
                role="Product Designer / OPS"
                description={
                  <>
                    Atuando como designer de produto no time CORE do iDS, o Design System do{" "}
                    <a className="underline" href="https://www.instagram.com/itaudesignteam/" target="_blank" rel="noopener noreferrer">@itaudesignteam</a>.
                  </>
                }
              />
              <ExperienceItem
                company="Warren"
                period="2021 / 2022"
                role="Senior product designer"
                description={
                  <>
                    Atuando no time de banking da{" "}
                    <a className="underline" href="https://www.instagram.com/warrenbrasil/" target="_blank" rel="noopener noreferrer">@warren</a>
                    , mapeando jornadas, realizando pesquisas, testes com usuários, prototipando e validando interfaces.
                  </>
                }
              />
              <ExperienceItem
                company="Descomplica"
                period="2020 / 2021"
                role="Senior product designer"
                description={
                  <>
                    Atuando no time da faculdade{" "}
                    <a className="underline" href="https://www.instagram.com/design.descomplica/" target="_blank" rel="noopener noreferrer">@descomplica</a>{" "}
                    descobrindo, testando e desenhando interfaces para melhorar a experiência dos usuários.
                  </>
                }
              />
              <ExperienceItem
                company="99LAB"
                period="2018 / 2020"
                role="Senior product designer"
                description={
                  <>
                    Atuando em produtos na área educacional e jurídica no{" "}
                    <a className="underline" href="https://www.linkedin.com/company/bonsaeoficial" target="_blank" rel="noopener noreferrer">@bonsae</a>
                    , realizando pesquisas, testes com usuários, prototipando e validando interfaces.
                  </>
                }
              />
              <ExperienceItem
                company="R2 Digital"
                period="2017 / 2019"
                role="Senior UI Designer"
                description="Atuando no time de marketing criando interfaces para sites e sistemas dos mais diversos segmentos."
              />
              <ExperienceItem
                company="AlfamaWeb"
                period="2014 / 2017"
                role="UI Designer junior → Product Designer Pleno"
                description={
                  <>
                    Inicialmente atuando no time de criação de sites e campanhas digitais como UI designer e depois como Product designer no{" "}
                    <a className="underline" href="https://www.linkedin.com/company/cvcrm/" target="_blank" rel="noopener noreferrer">@cvcrm</a>
                    , um produto de gestão comercial para construtoras e loteadoras.
                  </>
                }
              />
              <ExperienceItem
                company="Prime Rs"
                period="2013 / 2014"
                role="Diretor de arte"
                description="Atuando no time de criação como direção de arte para o digital do Grupo Caixa Seguros."
              />
              <ExperienceItem
                company="IPTI"
                period="2013"
                role="UI Designer junior"
                description="Atuando do time de criação de interfaces para sistemas de gerenciamento educacional."
              />
              <ExperienceItem
                company="Agência P"
                period="2012 / 2013"
                role="Diretor de arte"
                description="Atuando no time de criação de campanhas publicitárias para o offline e o online."
              />
              <ExperienceItem
                company="Swapi"
                period="2012"
                role="Web designer"
                description="Atuando na criação e manutenção de sites."
              />
              <ExperienceItem
                company="JG Logistica"
                period="2010 / 2012"
                role="Web designer"
                description="Atuando na criação e manutenção das frentes digitais para uma logística de calçados."
              />
            </div>

            {/* ── Right — Educação + extras ─────────────────────── */}
            <div className="curriculo-right flex-1 mt-12 lg:mt-0">

              {/* Educação */}
              <SectionTitle>Educação</SectionTitle>
              <EducationItem title="Pós-graduação em User Experience Design and Beyond" institution="PUCRS — 2023" />
              <EducationItem title="Bacharel em Design gráfico" institution="Universidade Tiradentes — 2020" />
              <EducationItem title="Make Design Systems People Want to Use" institution="Design System University — 2023" />
              <EducationItem title="Design system specialist" institution="Meiuca — 2021" />
              <EducationItem title="Design system boost" institution="Pixelcastbr — 2020" />
              <EducationItem title="Ux Metrics" institution="PunkMetrics — 2020" />
              <EducationItem title="Product design" institution="Design circuit — 2019" />
              <EducationItem title="UX Strategy & Usability" institution="Alura — 2016 / Domestika — 2019" />
              <EducationItem title="Design de interfaces" institution="UI Lab — 2018 / Udemy — 2018" />
              <EducationItem title="Figma — Criando interfaces do zero até o protótipo final" institution="Cursae — 2020" />

              {/* Ferramentas */}
              <div className="curriculo-tools mt-12">
                <SectionTitle>Ferramentas</SectionTitle>
                <div className="curriculo-tools-grid grid grid-cols-2 gap-x-8">
                  {[
                    ["Figma", "Hotjar"],
                    ["Principle", "UsabilityHub"],
                    ["Sketch App", "Miro"],
                    ["Protopie", "UserTesting"],
                    ["Dovetail", "Maze"],
                  ].map(([left, right], i) => (
                    <React.Fragment key={i}>
                      <p style={{ fontFamily: "'Agrandir Narrow', Arial, sans-serif", fontSize: "19px", color: "#242a2f", lineHeight: "2" }}>{left}</p>
                      <p style={{ fontFamily: "'Agrandir Narrow', Arial, sans-serif", fontSize: "19px", color: "#242a2f", lineHeight: "2" }}>{right}</p>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Habilidades */}
              <div className="curriculo-skills mt-12">
                <SectionTitle>Habilidades</SectionTitle>
                <div className="curriculo-skills-grid grid grid-cols-2 gap-x-8">
                  {[
                    ["User interface", "Surveys"],
                    ["User experience", "Journey map"],
                    ["Interaction design", "Personas"],
                    ["Wireframes", "User flows"],
                    ["Agile", "Usability testing"],
                  ].map(([left, right], i) => (
                    <React.Fragment key={i}>
                      <p style={{ fontFamily: "'Agrandir Narrow', Arial, sans-serif", fontSize: "19px", color: "#242a2f", lineHeight: "2" }}>{left}</p>
                      <p style={{ fontFamily: "'Agrandir Narrow', Arial, sans-serif", fontSize: "19px", color: "#242a2f", lineHeight: "2" }}>{right}</p>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Idiomas */}
              <div className="curriculo-languages mt-12">
                <SectionTitle>Idiomas</SectionTitle>
                {[
                  ["Português", "nativo"],
                  ["Inglês", "Intermediário"],
                  ["Espanhol", "Iniciante"],
                ].map(([lang, level]) => (
                  <div key={lang} className="curriculo-language-item mb-3">
                    <p style={{ fontFamily: "'Agrandir Narrow', Arial, sans-serif", fontSize: "19px", color: "#242a2f" }}>{lang}</p>
                    <p style={{ fontFamily: "'Agrandir Narrow', Arial, sans-serif", fontSize: "17px", color: "rgba(36,42,47,0.72)" }}>({level})</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
