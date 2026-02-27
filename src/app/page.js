"use client";

import { useEffect, useState } from "react";

const GLITCH_CHARS = "!@#$%^&*[]{}|<>?/\\~`";

function useGlitchText(finalText, startDelay = 400) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

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
          setDone(true);
        }
      }, 30);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [finalText, startDelay]);

  return { display, done };
}

export default function Home() {
  const { display: nameDisplay, done: nameDone } = useGlitchText(
    "HILLARY",
    600,
  );
  const { display: roleDisplay } = useGlitchText(
    "web dev / designer & social media manager",
    nameDone ? 200 : 99999,
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        padding: "1rem",
      }}
    >
      {/* nav — stacks vertically on mobile, row on larger screens */}
      <nav
        style={{
          position: "absolute",
          bottom: "2rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.75rem",
          width: "100%",
          padding: "0 1rem",
          boxSizing: "border-box",
        }}
      >
        {[
          { label: "projects", href: "/projects" },
          { label: "contact", href: "/contact" },
          { label: "click me :)", href: "/click_me", className: "hide-mobile" },
        ].map(({ label, href, className }, index) => (
          <a
            key={label}
            href={href}
            className={className || ""}
            style={{
              fontFamily: "var(--font-vt323), monospace",
              fontSize: "clamp(1rem, 3.5vw, 1.3rem)",
              color: "#E2A9C0",
              letterSpacing: "0.1em",
              textDecoration: "none",
              textTransform: "uppercase",
              background: "rgba(65, 21, 40, 0.85)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(226, 169, 192, 0.4)",
              padding: "0.4rem 1rem",
              borderRadius: "3px",
              textShadow: "0 0 8px rgba(226, 169, 192, 0.5)",
              opacity: 0,
              animation: "fadeIn 0.6s ease forwards",
              animationDelay: `${index * 0.15}s`,
              transition:
                "background 0.2s, border-color 0.2s, text-shadow 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(162, 76, 97, 0.5)";
              e.currentTarget.style.borderColor = "rgba(226, 169, 192, 0.7)";
              e.currentTarget.style.textShadow =
                "0 0 12px rgba(226, 169, 192, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(65, 21, 40, 0.85)";
              e.currentTarget.style.borderColor = "rgba(226, 169, 192, 0.4)";
              e.currentTarget.style.textShadow =
                "0 0 8px rgba(226, 169, 192, 0.5)";
            }}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* main content */}
      <div
        style={{
          padding: "clamp(1.5rem, 5vw, 3rem) clamp(1rem, 5vw, 4rem)",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          maxWidth: "100%",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-press-start), monospace",
            fontSize: "clamp(2rem, 12vw, 5rem)",
            color: "#E2A9C0",
            textShadow: `
              0 0 10px #E2A9C0,
              0 0 30px #E2A9C0,
              0 0 60px #A24C61,
              0 0 100px #A24C61
            `,
            letterSpacing: "0.05em",
            lineHeight: 1.2,
            margin: 0,
            wordBreak: "break-word",
          }}
        >
          {nameDisplay}
        </h1>

        {nameDone && (
          <p
            style={{
              fontFamily: "var(--font-vt323), monospace",
              fontSize: "clamp(1rem, 4vw, 1.4rem)",
              color: "#E1C9D5",
              opacity: 0.75,
              margin: 0,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              maxWidth: "90vw",
              lineHeight: 1.4,
            }}
          >
            {roleDisplay}
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "1em",
                background: "#E2A9C0",
                marginLeft: "4px",
                verticalAlign: "middle",
                animation: "blink 1s step-end infinite",
              }}
            />
          </p>
        )}
      </div>

      <style>{`
        .hide-mobile {
        display: none;
        }

        @media (min-width: 768px) {
        .hide-mobile {
          display: inline-block;
          }
        }
  
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 360px) {
          nav a {
            font-size: 0.9rem !important;
            padding: 0.35rem 0.75rem !important;
          }
        }
      `}</style>
    </main>
  );
}
