"use client";

import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CREATIVE_WORK } from "./creativeData";

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

function CreativeCard({ client, platform, description, stats, images, index }) {
  const [hovered, setHovered] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1.75rem 2rem",
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
        animationDelay: `${0.1 + index * 0.08}s`,
      }}
    >
      {/* image carousel */}
      {images && images.length > 0 && (
        <div
          style={{
            width: "100%",
            borderRadius: "3px",
            overflow: "hidden",
            border: "1px solid rgba(226, 169, 192, 0.1)",
            position: "relative",
            aspectRatio: "4/5", // instagram portrait ratio
          }}
        >
          <Image
            src={images[activeImage]}
            alt={client}
            fill
            style={{ objectFit: "contain" }} // contain instead of cover so nothing gets cropped
          />
          {images.length > 1 && (
            <div
              style={{
                position: "absolute",
                bottom: "0.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "0.5rem",
                zIndex: 2,
              }}
            >
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation(); // fix: prevent event from bubbling up
                    setActiveImage(i);
                  }}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    background:
                      i === activeImage
                        ? "#E2A9C0"
                        : "rgba(226, 169, 192, 0.35)",
                    padding: 0,
                    transition: "background 0.2s",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* platform */}
      <span
        style={{
          fontFamily: "var(--font-vt323), monospace",
          fontSize: "0.85rem",
          color: "#A24C61",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        {platform}
      </span>

      {/* client */}
      <h2
        style={{
          fontFamily: "var(--font-press-start), monospace",
          fontSize: "clamp(0.55rem, 1.2vw, 0.8rem)",
          color: "#E2A9C0",
          textShadow: hovered
            ? "0 0 10px #E2A9C0, 0 0 30px #A24C61"
            : "0 0 6px rgba(226, 169, 192, 0.3)",
          margin: 0,
          transition: "text-shadow 0.2s",
          lineHeight: 1.5,
        }}
      >
        {client}
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

      {/* stats */}
      {stats && (
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {stats.map((stat) => (
            <span
              key={stat}
              style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: "1rem",
                color: "#E2A9C0",
                background: "rgba(226, 169, 192, 0.08)",
                border: "1px solid rgba(226, 169, 192, 0.25)",
                padding: "0.15rem 0.75rem",
                borderRadius: "999px",
                letterSpacing: "0.08em",
              }}
            >
              ↑ {stat}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Creative() {
  const headerDisplay = useGlitchText("SOCIAL MEDIA MGMT", 100);

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

          <div className="creative-grid">
            {CREATIVE_WORK.map((item, i) => (
              <CreativeCard key={item.id} {...item} index={i} />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .creative-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
          @media (max-width: 640px) {
            .creative-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </main>
    </>
  );
}
