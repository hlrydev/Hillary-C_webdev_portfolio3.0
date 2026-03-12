"use client";

const NAV_LINKS = [
  { label: "home", href: "/" },
  { label: "projects", href: "/projects" },
  { label: "social mgmt", href: "/creative" },
  { label: "contact", href: "/contact" },
];

export default function Nav() {
  return (
    <>
      <nav
        style={{
          position: "fixed",
          zIndex: 10,
        }}
        className="site-nav"
      >
        {NAV_LINKS.map(({ label, href }, index) => (
          <a
            key={label}
            href={href}
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

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Desktop: top-right row */
        .site-nav {
          top: 2rem;
          right: 2.5rem;
          display: flex;
          gap: 1rem;
        }

        /* Mobile: centered bottom bar */
        @media (max-width: 540px) {
          .site-nav {
            top: auto;
            right: auto;
            bottom: 1.25rem;
            left: 50%;
            transform: translateX(-50%);
            gap: 0.6rem;
          }
        }
      `}</style>
    </>
  );
}
