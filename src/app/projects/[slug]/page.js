"use client";

import { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { PROJECTS } from "../projectsData";
import Image from "next/image";
import { use } from "react";

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

export default function ProjectPage({ params }) {
  const { slug } = use(params);
  const project = PROJECTS.find((p) => p.slug === slug);
  const titleDisplay = useGlitchText(
    project ? project.title.toUpperCase() : "",
    200,
  );

  if (!project) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(65, 21, 40, 0.75)",
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(1px)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-vt323), monospace",
            color: "#E2A9C0",
            fontSize: "1.5rem",
            letterSpacing: "0.2em",
          }}
        >
          PROJECT_NOT_FOUND
        </p>
      </main>
    );
  }

  return (
    <>
      <Nav />

      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "clamp(4rem, 12vw, 8rem) clamp(1rem, 4vw, 2rem) 4rem",
          background: "rgba(65, 21, 40, 0.75)",
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(1px)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "780px",
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          {/* title */}
          <h1
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontSize: "clamp(1rem, 4vw, 2.2rem)",
              color: "#E2A9C0",
              textShadow: `
                0 0 10px #E2A9C0,
                0 0 30px #E2A9C0,
                0 0 60px #A24C61
              `,
              letterSpacing: "0.05em",
              lineHeight: 1.4,
              margin: 0,
              opacity: 0,
              animation: "fadeUp 0.5s ease forwards",
              animationDelay: "0.1s",
            }}
          >
            {titleDisplay}
          </h1>

          {/* skill pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem",
              opacity: 0,
              animation: "fadeUp 0.5s ease forwards",
              animationDelay: "0.2s",
            }}
          >
            {project.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  fontFamily: "var(--font-vt323), monospace",
                  fontSize: "1rem",
                  color: "#A24C61",
                  background: "rgba(162, 76, 97, 0.15)",
                  border: "1px solid rgba(162, 76, 97, 0.35)",
                  padding: "0.15rem 0.75rem",
                  borderRadius: "999px",
                  letterSpacing: "0.08em",
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* divider */}
          <div
            style={{
              width: "100%",
              height: "1px",
              background:
                "linear-gradient(to right, rgba(226, 169, 192, 0.3), rgba(226, 169, 192, 0.05))",
              opacity: 0,
              animation: "fadeUp 0.5s ease forwards",
              animationDelay: "0.25s",
            }}
          />

          {/* full description */}
          <div
            style={{
              opacity: 0,
              animation: "fadeUp 0.5s ease forwards",
              animationDelay: "0.3s",
            }}
          >
            {project.fullDescription.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-vt323), monospace",
                  fontSize: "clamp(1rem, 3vw, 1.15rem)",
                  color: "#E1C9D5",
                  opacity: 0.85,
                  lineHeight: 1.8,
                  letterSpacing: "0.04em",
                  marginBottom: "1.2rem",
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* images */}
          {project.images && project.images.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                opacity: 0,
                animation: "fadeUp 0.5s ease forwards",
                animationDelay: "0.35s",
              }}
            >
              {project.images.map((src, i) => (
                <div
                  key={i}
                  style={{
                    width: "100%",
                    borderRadius: "4px",
                    overflow: "hidden",
                    border: "1px solid rgba(226, 169, 192, 0.15)",
                  }}
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    width={780}
                    height={440}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* links */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              opacity: 0,
              animation: "fadeUp 0.5s ease forwards",
              animationDelay: "0.4s",
            }}
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-vt323), monospace",
                  fontSize: "1.1rem",
                  color: "#E2A9C0",
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                  background: "rgba(65, 21, 40, 0.85)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(226, 169, 192, 0.4)",
                  padding: "0.4rem 1.2rem",
                  borderRadius: "3px",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(162, 76, 97, 0.35)";
                  e.currentTarget.style.borderColor =
                    "rgba(226, 169, 192, 0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(65, 21, 40, 0.85)";
                  e.currentTarget.style.borderColor =
                    "rgba(226, 169, 192, 0.4)";
                }}
              >
                ↗ GITHUB
              </a>
            )}
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-vt323), monospace",
                  fontSize: "1.1rem",
                  color: "#E2A9C0",
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                  background: "rgba(65, 21, 40, 0.85)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(226, 169, 192, 0.4)",
                  padding: "0.4rem 1.2rem",
                  borderRadius: "3px",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(162, 76, 97, 0.35)";
                  e.currentTarget.style.borderColor =
                    "rgba(226, 169, 192, 0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(65, 21, 40, 0.85)";
                  e.currentTarget.style.borderColor =
                    "rgba(226, 169, 192, 0.4)";
                }}
              >
                ↗ LIVE SITE
              </a>
            )}
          </div>
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </main>
    </>
  );
}
