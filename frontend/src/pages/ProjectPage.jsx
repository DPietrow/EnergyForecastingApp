import React, { useEffect, useState } from "react";
import ProfileSidebar from "../components/ProfileSidebar";
import Navbar from "../components/Navbar";

import ArchitectureDiagram from "../components/ArchitectureDiagram";
import Heatmap from "../components/Heatmap";

export default function ProjectPage({
  darkMode,
  setDarkMode
}) {
  const [results, setResults] = useState(null);

  const theme = darkMode
    ? {
        background: "#0f172a",
        card: "#1e293b",
        text: "#f8fafc",
        heading: "#ffffff",
        subtext: "#cbd5e1",
        tag: "#334155",
        cardBorder: "#475569"
      }
    : {
        background: "#f8fafc",
        card: "#ffffff",
        text: "#111827",
        heading: "#0f172a",
        subtext: "#475569",
        tag: "#f1f5f9",
        cardBorder: "#e2e8f0"
      };
    useEffect(() => {
    document.body.style.background =
    theme.background;
    }, [theme.background]);

  const sectionStyle = {
    background: theme.card,
    color: theme.text,
    padding: "40px",
    borderRadius: "20px",
    marginBottom: "60px",
    boxShadow: "0 4px 12px rgba(0,0,0,.08)"
  };

  const modelCardStyle = {
    padding: "24px",
    borderRadius: "16px",
    background: darkMode ? "#334155" : "#f8fafc",
    border: `1px solid ${theme.cardBorder}`
  };

  const titleStyle = {
    textAlign: "center",
    color: theme.heading,
    marginBottom: "30px",
    fontWeight: 700
  };

  useEffect(() => {
    fetch("http://localhost:5000/project/results")
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, []);

  if (!results) {
    return <div>Loading...</div>;
  }

  return (
     <div
    style={{
      background: theme.background,
      minHeight: "100vh"
    }}
  >
    <div className="page-layout">
     <ProfileSidebar
    darkMode={darkMode}
    setDarkMode={setDarkMode}
    theme={theme}
  />
      <div className="main-content"
      style={{
          color: theme.text
        }}
      
      >
         <Navbar darkMode={darkMode} />
        {/* Hero */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "70px"
          }}
        >
          <h1
            style={{
              color: theme.heading,
              fontSize: "44px",
              fontWeight: 800
            }}
          >
            Electrical Load Forecasting System
          </h1>

          <p
            style={{
              maxWidth: "900px",
              margin: "25px auto",
              fontSize: "18px",
              lineHeight: "1.8",
              color: theme.subtext
            }}
          >
            Comparison of Naive, Random Forest,
            XGBoost, LSTM, and GRU forecasting
            models across PJM electrical load data.
            The final solution was deployed through a
            Flask API and React dashboard capable of
            generating future energy demand forecasts.
          </p>
        </div>

        {/* Project Metrics */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: "20px",
            marginBottom: "60px"
          }}
        >
          {[
            ["Models Tested", "5"],
            ["Regions", "2"],
            ["Forecast Horizons", "4"],
            ["Winning Model", "XGBoost"]
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                background: theme.card,
                borderRadius: "16px",
                padding: "24px",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,.08)"
              }}
            >
              <h2
                style={{
                  color: theme.heading,
                  margin: 0
                }}
              >
                {value}
              </h2>

              <p
                style={{
                  color: theme.subtext,
                  marginTop: "10px"
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Architecture */}

        <div style={sectionStyle}>
          <h2 style={titleStyle}>Architecture</h2>

          <ArchitectureDiagram />
        </div>

        {/* Features */}

        <div style={sectionStyle}>
          <h2 style={titleStyle}>
            Feature Engineering
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px"
            }}
          >
            {[
              "Lag 1 Hour",
              "Lag 24 Hours",
              "Lag 168 Hours",
              "Rolling Mean 24",
              "Rolling Mean 168",
              "Rolling Std 24",
              "Hour of Day",
              "Day of Week",
              "Month",
              "Weekend Flag"
            ].map((feature) => (
              <div
                key={feature}
                style={{
                  padding: "10px 18px",
                  borderRadius: "999px",
                  background: theme.tag,
                  color: theme.text,
                  fontWeight: 600
                }}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Models */}

        <div style={sectionStyle}>
          <h2 style={titleStyle}>
            Models Evaluated
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "20px"
            }}
          >
            {[
              [
                "Naive Baseline",
                "Uses the most recent observed value as the prediction."
              ],
              [
                "Random Forest",
                "Ensemble decision tree model trained on engineered lag and calendar features."
              ],
              [
                "XGBoost",
                "Gradient boosted trees that delivered the strongest overall forecasting performance."
              ],
              [
                "LSTM",
                "Recurrent neural network designed to capture long-term temporal patterns."
              ],
              [
                "GRU",
                "Lightweight recurrent architecture that achieved the best PJME hourly score."
              ]
            ].map(([title, text]) => (
              <div
                key={title}
                style={modelCardStyle}
              >
                <h3
                  style={{
                    color: theme.heading
                  }}
                >
                  {title}
                </h3>

                <p
                  style={{
                    color: theme.text,
                    lineHeight: 1.7
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Winner Table */}

        <div style={sectionStyle}>
          <h2 style={titleStyle}>
            Winner Table
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <table
              style={{
                minWidth: "700px",
                borderCollapse: "collapse",
                color: theme.text
              }}
            >
              <thead>
                <tr>
                  <th style={{ padding: "14px" }}>Region</th>
                  <th style={{ padding: "14px" }}>Horizon</th>
                  <th style={{ padding: "14px" }}>Winner</th>
                  <th style={{ padding: "14px" }}>R²</th>
                </tr>
              </thead>

              <tbody>
                {results.winner_table.map(
                  (row, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: "14px" }}>
                        {row.region}
                      </td>

                      <td style={{ padding: "14px" }}>
                        {row.horizon}
                      </td>

                      <td style={{ padding: "14px" }}>
                        {row.model}
                      </td>

                      <td style={{ padding: "14px" }}>
                        {row.r2.toFixed(4)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Heatmap */}

        <div style={sectionStyle}>
          <h2 style={titleStyle}>
            Model Comparison Heatmap
          </h2>

          <Heatmap data={results.full_results} 
            darkMode={darkMode}
          />
        </div>

        {/* Conclusions */}

        <div style={sectionStyle}>
          <h2 style={titleStyle}>
            Conclusions
          </h2>

          <p
            style={{
              lineHeight: 1.9,
              fontSize: "17px"
            }}
          >
            {results.summary.conclusion}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              marginTop: "30px",
              flexWrap: "wrap"
            }}
          >
            <div>
              <strong>
                XGBoost Wins:
              </strong>{" "}
              {results.summary.xgboost_wins}
            </div>

            <div>
              <strong>
                GRU Wins:
              </strong>{" "}
              {results.summary.gru_wins}
            </div>

            <div>
              <strong>
                Production Model:
              </strong>{" "}
              {results.summary.best_model}
            </div>
          </div>
        </div>
    </div>
    </div>
    </div>
  );
}