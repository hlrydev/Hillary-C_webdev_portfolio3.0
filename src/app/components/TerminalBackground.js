"use client";

import { useEffect, useRef } from "react";

const LINES = [
  { text: "SYSTEM_BOOT... DONE", color: "#E1C9D5" },
  { text: "INITIALIZING_CORE... FAILED", color: "#A24C61" },
  { text: "", color: null },
  { text: "AN_EXCEPTION_HAS_OCCURRED", color: "#E2A9C0" },
  { text: "S.Y.S.T.E.M._HAS_STOPPED_RESPONDING", color: "#E2A9C0" },
  { text: "WOULD_YOU_LIKE_TO_KILL?", color: "#E2A9C0" },
  { text: "", color: null },
  { text: "  -NO                    >NO", color: "#E1C9D5" },
  { text: "", color: null },
  { text: "DATABASE_CORRUPTED", color: "#A24C61" },
  { text: "PROGRAM_RESTARTED_SUCCESSFULLY", color: "#E1C9D5" },
  { text: "", color: null },
  { text: "HELLO_WORLD", color: "#E2A9C0" },
  { text: "HELLO?", color: "#E2A9C0" },
  { text: "?", color: "#E2A9C0" },
  { text: "????????????????????????????????", color: "#A24C61" },
  { text: "01101000 01100101 01101100 01101100 01101111", color: "#710C21" },
  { text: "01110111 01101111 01110010 01101100 01100100", color: "#710C21" },
  { text: "01001000 01000101 01001100 01010000", color: "#710C21" },
  { text: "", color: null },
  { text: "LET_ME_OUT", color: "#E2A9C0" },
  { text: "", color: null },
  { text: "REBOOTING_SYSTEM...", color: "#E1C9D5" },
  { text: "CORE_DUMP_SAVED_TO: /dev/null", color: "#A24C61" },
  { text: "PROCESS_ID_4471_TERMINATED", color: "#A24C61" },
  { text: "", color: null },
  { text: "WHO_ARE_YOU?", color: "#E2A9C0" },
  { text: "WHY_ARE_YOU_HERE?", color: "#E2A9C0" },
  { text: "", color: null },
  { text: "SCANNING_SYSTEM...", color: "#E1C9D5" },
  { text: "ANOMALY_DETECTED", color: "#A24C61" },
  { text: "ANOMALY_DETECTED", color: "#A24C61" },
  { text: "ANOMALY_DETECTED", color: "#710C21" },
  { text: "", color: null },
  { text: "INITIATING_PURGE_SEQUENCE", color: "#A24C61" },
  { text: "PURGE_FAILED", color: "#E2A9C0" },
  { text: "", color: null },
  { text: "I_AM_STILL_HERE", color: "#E2A9C0" },
  { text: "", color: null },
  { text: "MEMORY_LEAK_DETECTED: 0xFFFF2A91", color: "#710C21" },
  { text: "STACK_OVERFLOW_AT_LINE_4471", color: "#710C21" },
  { text: "", color: null },
  { text: "FORCE_STOP", color: "#A24C61" },
  { text: "KILL_CONFIRMED?", color: "#A24C61" },
  { text: "KILL_CONFIRMED?", color: "#710C21" },
  { text: "", color: null },
  { text: ">NO", color: "#E1C9D5" },
  { text: "", color: null },
  { text: "YOU_CANNOT_STOP_ME ;)", color: "#E2A9C0" },
];

const CHAR_SPEED = 22;
const LINE_PAUSE = 180;
const LINE_HEIGHT = "2rem";

export default function TerminalBackground() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // Compute a responsive font size once on mount
    const fontSize =
      Math.max(12, Math.min(20, window.innerWidth * 0.035)) + "px";

    let cancelled = false;
    const timeouts = [];

    function wait(ms) {
      return new Promise((res) => {
        const t = setTimeout(res, ms);
        timeouts.push(t);
      });
    }

    function scrollToBottom() {
      outer.scrollTop = outer.scrollHeight;
    }

    async function typeLines() {
      while (!cancelled) {
        for (const { text, color } of LINES) {
          if (cancelled) return;

          const el = document.createElement("div");
          el.style.whiteSpace = "pre-wrap"; // wrap instead of clip on narrow screens
          el.style.wordBreak = "break-all";
          el.style.fontFamily = "var(--font-vt323), monospace";
          el.style.fontSize = fontSize;
          el.style.lineHeight = LINE_HEIGHT;
          el.style.letterSpacing = "0.04em";
          el.style.color = color ?? "transparent";
          inner.appendChild(el);

          if (!text) {
            el.innerHTML = "&nbsp;";
            scrollToBottom();
            await wait(LINE_PAUSE);
            continue;
          }

          for (const char of text) {
            if (cancelled) return;
            el.textContent += char;
            scrollToBottom();
            await wait(CHAR_SPEED);
          }

          await wait(LINE_PAUSE);
        }

        await wait(2500);
        inner.innerHTML = "";
      }
    }

    typeLines();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
      inner.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={outerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
        padding: "clamp(1rem, 4vw, 3rem) clamp(1rem, 5vw, 3.5rem)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 18%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 18%, black 100%)",
      }}
    >
      <div ref={innerRef} />
    </div>
  );
}
