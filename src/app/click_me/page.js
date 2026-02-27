"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const PROMPT = "user@ubuntu:~$ ";

const SCARY_COMMANDS = [
  { cmd: "sudo apt purge --auto-remove *", delay: 0 },
  { cmd: "Reading package lists... Done", delay: 600 },
  { cmd: "Building dependency tree... Done", delay: 1100 },
  { cmd: "The following packages will be REMOVED:", delay: 1600 },
  {
    cmd: "  linux-image-6.5.0-generic linux-headers* grub* systemd*",
    delay: 2000,
  },
  { cmd: "  python3* libssl* libc6* bash coreutils util-linux*", delay: 2300 },
  { cmd: "  xorg* network-manager* firmware-* udev*", delay: 2600 },
  { cmd: "  ... and 2,847 more packages", delay: 2900 },
  {
    cmd: "0 upgraded, 0 newly installed, 2847 to remove, 0 not upgraded.",
    delay: 3400,
  },
  { cmd: "Need to get 0 B/4.21 GB of archives.", delay: 3800 },
  {
    cmd: "After this operation, 12.4 GB disk space will be freed.",
    delay: 4200,
  },
  { cmd: "", delay: 4600 },
  { cmd: "Removing bash (5.2.15-2ubuntu1) ...", delay: 4800 },
  { cmd: "Removing coreutils (9.1-1ubuntu2) ...", delay: 5200 },
  { cmd: "Removing libc6:amd64 (2.38-1ubuntu6) ...", delay: 5600 },
  { cmd: "Removing linux-image-6.5.0-45-generic ...", delay: 6000 },
  { cmd: "Removing grub-efi-amd64 ...", delay: 6400 },
  { cmd: "Removing systemd (255.4-1ubuntu8) ...", delay: 6800 },
  {
    cmd: "dpkg: warning: removing systemd, ignoring dependency failures",
    delay: 7200,
  },
  { cmd: "Removing network-manager ...", delay: 7600 },
  { cmd: "Removing xorg (1:7.7+23ubuntu2) ...", delay: 8000 },
  { cmd: "Removing firmware-linux-free ...", delay: 8300 },
  { cmd: "", delay: 8600 },
  { cmd: "████████████████████████ 100%", delay: 8800, isProgress: true },
  { cmd: "", delay: 9200 },
  { cmd: "WARNING: /bin/sh has been removed.", delay: 9400, isWarn: true },
  {
    cmd: "WARNING: Core system libraries purged. OS integrity compromised.",
    delay: 9900,
    isWarn: true,
  },
  {
    cmd: "WARNING: Cannot execute further commands — shell destroyed.",
    delay: 10400,
    isWarn: true,
  },
  { cmd: "", delay: 10900 },
  { cmd: "lol. gotcha. your OS is fine :)", delay: 11400, isJoke: true },
  {
    cmd: "don't run random commands from strangers on the internet tho",
    delay: 12000,
    isJoke: true,
  },
];

const NOPE_RESPONSES = [
  null, // first refusal — no extra message, just re-prompt
  "This is not optional.",
  "I'm going to need a Y.",
  "Please. I'm begging you.",
  "...seriously?",
  "ok you know what fine we're doing this anyway",
];

export default function ClickMe() {
  const [lines, setLines] = useState([
    { text: "sudo apt purge --auto-remove *", type: "cmd" },
    { text: "[sudo] password for user: ········", type: "output" },
    { text: "Reading package lists... Done", type: "output" },
    { text: "Building dependency tree... Done", type: "output" },
    { text: "The following packages will be REMOVED:", type: "output" },
    {
      text: "  linux-image-6.5.0-generic linux-headers* grub* bash coreutils libc6*",
      type: "output",
    },
    { text: "  ... and 2,847 additional packages", type: "output" },
    { text: "0 upgraded, 0 newly installed, 2847 to remove.", type: "output" },
    {
      text: "After this operation, 12.4 GB disk space will be freed.",
      type: "output",
    },
  ]);

  const [phase, setPhase] = useState("prompt"); // prompt | running | done
  const [inputVal, setInputVal] = useState("");
  const [nopesCount, setNopesCount] = useState(0);
  const [promptLine, setPromptLine] = useState(
    "Do you want to continue? [Y/n]",
  );
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (phase === "prompt") inputRef.current?.focus();
  }, [phase, promptLine]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, phase]);

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }

  function handleKey(e) {
    if (e.key !== "Enter") return;
    const val = inputVal.trim().toLowerCase();
    setInputVal("");

    if (val === "y" || nopesCount >= NOPE_RESPONSES.length - 1) {
      // commit — echo the input then run
      setLines((l) => [
        ...l,
        {
          text: `${promptLine} ${val === "y" ? "Y" : "y (forced)"}`,
          type: "output",
        },
        { text: "", type: "output" },
      ]);
      setPhase("running");
      runCommands();
    } else if (val === "n") {
      const msg = NOPE_RESPONSES[nopesCount + 1];
      setLines((l) => [
        ...l,
        { text: `${promptLine} n`, type: "output" },
        ...(msg ? [{ text: msg, type: "warn" }] : []),
      ]);
      setNopesCount((c) => c + 1);
      triggerShake();
    } else {
      setLines((l) => [
        ...l,
        { text: `${promptLine} ${inputVal}`, type: "output" },
        {
          text: `bash: ${inputVal || "(empty)"}: Please just type Y or n.`,
          type: "warn",
        },
      ]);
      triggerShake();
    }
  }

  function runCommands() {
    SCARY_COMMANDS.forEach(({ cmd, delay, isWarn, isJoke, isProgress }) => {
      setTimeout(() => {
        setLines((l) => [
          ...l,
          {
            text: cmd,
            type: isJoke
              ? "joke"
              : isWarn
                ? "warn"
                : isProgress
                  ? "progress"
                  : "output",
          },
        ]);
        if (isJoke && cmd.includes("gotcha")) {
          setPhase("done");
        }
      }, delay);
    });
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        fontFamily: "var(--font-vt323), monospace",
        background: "rgba(65, 21, 40, 0.75)",
        backdropFilter: "blur(1px)",
        WebkitBackdropFilter: "blur(1px)",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* terminal window */}
      <div
        style={{
          width: "100%",
          maxWidth: "780px",
          background: "rgba(10, 4, 8, 0.97)",
          border: "1px solid rgba(226, 169, 192, 0.25)",
          borderRadius: "6px",
          boxShadow:
            "0 0 40px rgba(162, 76, 97, 0.3), 0 0 80px rgba(65, 21, 40, 0.5)",
          overflow: "hidden",
          animation: shake ? "shake 0.4s ease" : "none",
        }}
      >
        {/* title bar */}
        <div
          style={{
            background: "rgba(162, 76, 97, 0.2)",
            borderBottom: "1px solid rgba(226, 169, 192, 0.15)",
            padding: "0.5rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Link href="/" style={{ display: "inline-block", lineHeight: 0 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#ff5f57",
                display: "inline-block",
                cursor: "pointer",
              }}
            />
          </Link>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#febc2e",
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#28c840",
              display: "inline-block",
            }}
          />
          <span
            style={{
              marginLeft: "auto",
              fontSize: "0.95rem",
              color: "rgba(226,169,192,0.5)",
              letterSpacing: "0.1em",
            }}
          >
            user@ubuntu: ~
          </span>
        </div>

        {/* terminal body */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            maxHeight: "70vh",
            overflowY: "auto",
            fontSize: "clamp(0.85rem, 2vw, 1rem)",
            lineHeight: 1.6,
            letterSpacing: "0.03em",
          }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                color:
                  line.type === "warn"
                    ? "#ff6b8a"
                    : line.type === "joke"
                      ? "#7dffb3"
                      : line.type === "progress"
                        ? "#E2A9C0"
                        : line.type === "cmd"
                          ? "#E2A9C0"
                          : "rgba(225, 201, 213, 0.8)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
                fontWeight: line.type === "warn" ? "bold" : "normal",
              }}
            >
              {line.type === "cmd" ? (
                <>
                  <span style={{ color: "#A24C61" }}>{PROMPT}</span>
                  {line.text}
                </>
              ) : (
                line.text
              )}
            </div>
          ))}

          {/* prompt input */}
          {phase === "prompt" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "0.25rem",
                color: "#E2A9C0",
              }}
            >
              <span
                style={{
                  color: "rgba(226,169,192,0.7)",
                  marginRight: "0.5rem",
                }}
              >
                {promptLine}&nbsp;
              </span>
              <input
                ref={inputRef}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="off"
                spellCheck={false}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#E2A9C0",
                  fontFamily: "var(--font-vt323), monospace",
                  fontSize: "inherit",
                  letterSpacing: "0.05em",
                  caretColor: "#E2A9C0",
                  width: "4ch",
                }}
              />
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1em",
                  background: "#E2A9C0",
                  verticalAlign: "middle",
                  animation: "blink 1s step-end infinite",
                }}
              />
            </div>
          )}

          {/* after running, show a new prompt that does nothing */}
          {phase === "done" && (
            <div style={{ marginTop: "1rem", color: "#A24C61" }}>
              <span>{PROMPT}</span>
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1em",
                  background: "#A24C61",
                  verticalAlign: "middle",
                  animation: "blink 1s step-end infinite",
                }}
              />
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes shake {
          0%   { transform: translateX(0); }
          15%  { transform: translateX(-8px); }
          30%  { transform: translateX(8px); }
          45%  { transform: translateX(-6px); }
          60%  { transform: translateX(6px); }
          75%  { transform: translateX(-3px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </main>
  );
}
