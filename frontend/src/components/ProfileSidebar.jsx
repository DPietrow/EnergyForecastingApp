import React from "react";

export default function ProfileSidebar({
  darkMode,
  setDarkMode,
  theme
}) {
  return (
    <div
      className="sidebar"
        style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        }}
    >
      <button
        onClick={() =>
          setDarkMode(!darkMode)
        }
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: "16px",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "700",
          background: darkMode
            ? "#f8fafc"
            : "#111827",
          color: darkMode
            ? "#111827"
            : "#f8fafc",
          boxShadow:
            "0 4px 12px rgba(0,0,0,.15)"
        }}
      >
        {darkMode
          ? "☀️ Light Mode"
          : "🌙 Dark Mode"}
      </button>

      <div
        style={{
          background: theme.card,
          borderRadius: "20px",
          padding: "20px",
          textAlign: "center",
          boxShadow:
            "0 4px 12px rgba(0,0,0,.08)"
        }}
      >
        <img
          src="/portrait2.jpg"
          alt="David Pietrow"
          style={{
            width: "180px",
            height: "240px",
            borderRadius: "12px",
            objectFit: "cover",
            marginBottom: "20px"
          }}
        />

        <h2
          style={{
            color: theme.heading,
            marginBottom: "8px"
          }}
        >
          David Pietrow
        </h2>

        <p
          style={{
            color: theme.subtext,
            margin: 0
          }}
        >
          Enterprise Architect
        </p>
      </div>

      <div
        style={{
          background: theme.card,
          textAlign: "center",
          borderRadius: "20px",
          padding: "20px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,.08)"
        }}
      >
        <h3
          style={{
            color: theme.heading,
            marginBottom: "12px"
          }}
        >
          About Me
        </h3>

        <p
          style={{
            color: theme.subtext,
            lineHeight: "1.7"
          }}
        >
          I’m currently an Enterprise
          Architect exploring new
          opportunities, ideally in a
          technical delivery AI/ML role
          such as a Forward Deployment
          Engineer or Solution Architect.

          If my work here interests
          you and you have a related
          opening, please feel free
          to reach out.
        </p>
      </div>

      <a
          href="https://github.com/DPietrow/EnergyForecastingApp"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#60a5fa",
            textDecoration: "none",
            fontWeight: 600,
            textAlign: "center"
          }}
        >
          GitHub
      </a>

        <a
          href="https://www.linkedin.com/in/david-pietrow/"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#60a5fa",
            textDecoration: "none",
            fontWeight: 600,
            textAlign: "center"
          }}
        >
          LinkedIn
      </a>
    </div>
  );
}