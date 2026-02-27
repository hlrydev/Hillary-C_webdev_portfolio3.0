"use client";

import Link from "next/link";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";

const CONTACTS = [
  {
    label: "EMAIL",
    value: "hillarycn003@gmail.com",
    href: "mailto:hillarycn003@gmail.com",
    desc: "get in touch",
  },
  {
    label: "GITHUB",
    value: "hlrydev",
    href: "https://github.com/hlrydev",
    desc: "see my work",
  },
  {
    label: "LINKEDIN",
    value: "Hillary C.",
    href: "https://www.linkedin.com/in/hillary-c-b7152624b/",
    desc: "connect with me",
  },
];

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

function ContactCard({ label, value, href, desc, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? "_self" : "_blank"}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.3rem",
        padding: "clamp(1rem, 4vw, 1.5rem) clamp(1rem, 5vw, 2rem)",
        borderRadius: "4px",
        textDecoration: "none",
        background: hovered
          ? "rgba(162, 76, 97, 0.2)"
          : "rgba(65, 21, 40, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: `1px solid ${hovered ? "rgba(226, 169, 192, 0.5)" : "rgba(226, 169, 192, 0.15)"}`,
        boxShadow: hovered ? "0 0 24px rgba(162, 76, 97, 0.2)" : "none",
        transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
        opacity: 0,
        animation: "fadeUp 0.5s ease forwards",
        animationDelay: `${0.2 + index * 0.15}s`,
        width: "100%",
        maxWidth: "520px",
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-vt323), monospace",
          fontSize: "0.85rem",
          color: "#A24C61",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>

      <span
        style={{
          fontFamily: "var(--font-press-start), monospace",
          fontSize: "clamp(0.55rem, 2.5vw, 1rem)",
          color: "#E2A9C0",
          textShadow: hovered
            ? "0 0 10px #E2A9C0, 0 0 30px #A24C61"
            : "0 0 6px rgba(226, 169, 192, 0.4)",
          transition: "text-shadow 0.2s",
          wordBreak: "break-all", // prevents email overflow
        }}
      >
        {value}
      </span>

      <span
        style={{
          fontFamily: "var(--font-vt323), monospace",
          fontSize: "1rem",
          color: "#E1C9D5",
          opacity: 0.5,
          letterSpacing: "0.1em",
          marginTop: "0.2rem",
        }}
      >
        {desc}
      </span>
    </a>
  );
}

export default function Contact() {
  const headerDisplay = useGlitchText("CONTACT", 100);

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
          padding: "clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem)",
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

        {/* languages section */}
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
          <p
            style={{
              fontFamily: "var(--font-vt323), monospace",
              fontSize: "1.2rem",
              color: "#E1C9D5",
              opacity: 0.7,
              letterSpacing: "0.1em",
              textAlign: "center",
            }}
          >
            Languages: English (Native) & Spanish (Fluent)
          </p>

          <div
            style={{
              width: "100%",
              height: "1px",
              background:
                "linear-gradient(to right, rgba(226, 169, 192, 0.3), rgba(226, 169, 192, 0.05))",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            alignItems: "center",
          }}
        >
          {CONTACTS.map((contact, i) => (
            <ContactCard key={contact.label} {...contact} index={i} />
          ))}
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
