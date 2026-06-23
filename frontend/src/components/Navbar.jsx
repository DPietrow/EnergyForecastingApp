import { Link } from "react-router-dom";

export default function Navbar({
  darkMode
}) {
  const theme = darkMode
  ? {
      background: "#1e293b",
      text: "#f8fafc",
      border: "#475569"
    }
  : {
      background: "#ffffff",
      text: "#111827",
      border: "#e2e8f0"
    };
  return (
    <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background:
            theme.background,
          padding: "16px 32px",
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,.2)",
          borderBottom:
            `1px solid ${theme.border}`
    }}
    >
      <Link
        to="/"
        style={{
          color: theme.text,
          textDecoration: "none",
          fontWeight: 600
        }}
      >
        Project Overview
      </Link>

      <Link
        to="/forecast"
        style={{
          color: theme.text,
          textDecoration: "none",
          fontWeight: 600
        }}
      >
        Forecast Dashboard
      </Link>
    </nav>
  );
}