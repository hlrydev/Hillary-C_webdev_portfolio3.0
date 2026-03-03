"use client";

import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PROJECTS } from "./projectsData";

function useGlitchText(finalText, startDelay = 0) {
  const [display, setDisplay] = useState("");
  const GLITCH_CHARS = "!@#$%^&*[]{}|<>?/\\~`";

  useEffect(() => {
    let timeout;
    let interval;

    timeout = setTimeout(() => {
      let iterations = 0;
      const maxIterations = finalText.length * 3;

      interval = setInterval(() => {
        setDisplay(
          finalText
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < iterations / 3) return finalText[i];
              return GLITCH_CHARS[
                Math.floor(Math.random() * GLITCH_CHARS.length)
              ];
            })
            .join(""),
        );
        iterations++;
        if (iterations >= maxIterations) {
          clearInterval(interval);
          setDisplay(finalText);
        }
      }, 30);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [finalText, startDelay]);

  return display;
}

function ProjectCard({
  slug,
  title,
  description,
  skills,
  github,
  website,
  index,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1.5rem",
        borderRadius: "4px",
        background: hovered
          ? "rgba(162, 76, 97, 0.15)"
          : "rgba(65, 21, 40, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: `1px solid ${hovered ? "rgba(226, 169, 192, 0.45)" : "rgba(226, 169, 192, 0.12)"}`,
        boxShadow: hovered ? "0 0 30px rgba(162, 76, 97, 0.15)" : "none",
        transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
        opacity: 0,
        animation: "fadeUp 0.5s ease forwards",
        animationDelay: `${0.1 + index * 0.1}s`,
      }}
    >
      {/* title */}
      <h2
        style={{
          fontFamily: "var(--font-press-start), monospace",
          fontSize: "clamp(0.6rem, 2.5vw, 0.9rem)",
          color: "#E2A9C0",
          textShadow: hovered
            ? "0 0 10px #E2A9C0, 0 0 30px #A24C61"
            : "0 0 6px rgba(226, 169, 192, 0.3)",
          margin: 0,
          transition: "text-shadow 0.2s",
        }}
      >
        {title}
      </h2>

      {/* description */}
      <p
        style={{
          fontFamily: "var(--font-vt323), monospace",
          fontSize: "1.05rem",
          color: "#E1C9D5",
          opacity: 0.7,
          margin: 0,
          lineHeight: 1.6,
          letterSpacing: "0.04em",
        }}
      >
        {description}
      </p>

      {/* skill pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {skills.map((skill) => (
          <span
            key={skill}
            style={{
              fontFamily: "var(--font-vt323), monospace",
              fontSize: "0.9rem",
              color: "#A24C61",
              background: "rgba(162, 76, 97, 0.15)",
              border: "1px solid rgba(162, 76, 97, 0.35)",
              padding: "0.15rem 0.65rem",
              borderRadius: "999px",
              letterSpacing: "0.08em",
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* links row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          alignItems: "center",
          marginTop: "0.25rem",
        }}
      >
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-vt323), monospace",
              fontSize: "1rem",
              color: "#E1C9D5",
              textDecoration: "none",
              letterSpacing: "0.08em",
              opacity: 0.6,
              transition: "opacity 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = 1;
              e.currentTarget.style.color = "#E2A9C0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = 0.6;
              e.currentTarget.style.color = "#E1C9D5";
            }}
          >
            ↗ GITHUB
          </a>
        )}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-vt323), monospace",
              fontSize: "1rem",
              color: "#E1C9D5",
              textDecoration: "none",
              letterSpacing: "0.08em",
              opacity: 0.6,
              transition: "opacity 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = 1;
              e.currentTarget.style.color = "#E2A9C0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = 0.6;
              e.currentTarget.style.color = "#E1C9D5";
            }}
          >
            ↗ LIVE SITE
          </a>
        )}

        <Link
          href={`/projects/${slug}`}
          style={{
            fontFamily: "var(--font-vt323), monospace",
            fontSize: "1rem",
            color: "#E2A9C0",
            textDecoration: "none",
            letterSpacing: "0.08em",
            marginLeft: "auto",
            opacity: 0.8,
            transition: "opacity 0.2s, text-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = 1;
            e.currentTarget.style.textShadow = "0 0 8px #E2A9C0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = 0.8;
            e.currentTarget.style.textShadow = "none";
          }}
        >
          READ MORE →
        </Link>
      </div>
    </div>
  );
}

export default function Projects() {
  const headerDisplay = useGlitchText("PROJECTS", 100);

  return (
    <>
      <Nav />

      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding:
            "clamp(4rem, 10vw, 6rem) clamp(1rem, 4vw, 3rem) clamp(3rem, 8vw, 4rem)",
          background: "rgba(65, 21, 40, 0.75)",
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(1px)",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-vt323), monospace",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            color: "#E2A9C0",
            textShadow: "0 0 20px #E2A9C0, 0 0 60px #A24C61",
            letterSpacing: "0.3em",
            marginBottom: "3rem",
            opacity: 0,
            animation: "fadeUp 0.5s ease forwards",
            animationDelay: "0.1s",
          }}
        >
          {headerDisplay}
        </h1>

        {/* skills section */}
        <div
          style={{
            maxWidth: "1100px",
            width: "100%",
            marginBottom: "2.5rem",
            opacity: 0,
            animation: "fadeUp 0.5s ease forwards",
            animationDelay: "0.2s",
          }}
        >
          {/* web dev skills */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: "1rem",
                color: "#E1C9D5",
                opacity: 0.6,
                letterSpacing: "0.08em",
                marginBottom: "0.5rem",
                textAlign: "center",
              }}
            >
              Web Design/Development Skills:
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                justifyContent: "center",
              }}
            >
              {[
                "HTML & CSS",
                "JavaScript",
                "Next.js",
                "Python",
                "Git",
                "WordPress",
                "Elementor",
                "Brizy",
                "Canva",
              ].map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontFamily: "var(--font-vt323), monospace",
                    fontSize: "1rem",
                    color: "#E1C9D5",
                    padding: "0.15rem 0.65rem",
                    borderRadius: "999px",
                    letterSpacing: "0.08em",
                    background: "rgba(162, 76, 97, 0.15)",
                    border: "1px solid rgba(162, 76, 97, 0.35)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* social media skills */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: "1rem",
                color: "#E1C9D5",
                opacity: 0.6,
                letterSpacing: "0.08em",
                marginBottom: "0.5rem",
                textAlign: "center",
              }}
            >
              Social Media Management Skills:
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                justifyContent: "center",
              }}
            >
              {[
                "SEO",
                "Google Ads",
                "Meta Business Suite (Facebook/Instagram Ads)",
              ].map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontFamily: "var(--font-vt323), monospace",
                    fontSize: "1rem",
                    color: "#E1C9D5",
                    padding: "0.15rem 0.65rem",
                    borderRadius: "999px",
                    letterSpacing: "0.08em",
                    background: "rgba(162, 76, 97, 0.15)",
                    border: "1px solid rgba(162, 76, 97, 0.35)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* divider */}
          <div
            style={{
              width: "100%",
              height: "1px",
              background:
                "linear-gradient(to right, rgba(226, 169, 192, 0.3), rgba(226, 169, 192, 0.05))",
            }}
          />
        </div>

        {/* project cards grid — 2 cols on desktop, 1 col on mobile */}
        <div
          className="projects-grid"
          style={{ maxWidth: "1100px", width: "100%" }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} {...project} index={i} />
          ))}
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .projects-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }

          @media (max-width: 640px) {
            .projects-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </main>
    </>
  );
}
