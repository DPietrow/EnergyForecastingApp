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
    fetch(`${import.meta.env.VITE_API_URL}/project/results`)
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
            style={pageTitleStyle}
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
        <div
          style={{
            ...sectionStyle,
            background: theme.card,
            color: theme.text
          }}
        >
          <h2
            style={{
              ...sectionTitle,
              color: theme.text
            }}
          >
            Business Problem
          </h2>
          
          <p
            style={{
              lineHeight: 1.8,
              color: theme.subtext
            }}
          >
            Electrical utilities must continuously balance power generation with
            customer demand. Overestimating demand can result in unnecessary
            generation costs and underutilized resources, while underestimating
            demand can create reliability risks, increase energy market purchases,
            and place additional strain on grid operations during peak periods.
          </p>
          
          <p
            style={{
              lineHeight: 1.8,
              color: theme.subtext
            }}
          >
            Accurate load forecasting is therefore critical for generation planning,
            resource allocation, maintenance scheduling, and participation in
            wholesale energy markets. Forecast accuracy becomes increasingly
            challenging as planning horizons extend from hourly operational
            decisions to weekly and monthly resource planning.
          </p>
          
          <p
            style={{
              lineHeight: 1.8,
              color: theme.subtext
            }}
          >
            This project evaluates multiple forecasting approaches—including Naive
            Baseline, Random Forest, XGBoost, LSTM, and GRU models—across several
            forecasting horizons to identify the most effective production-ready
            solution. The objective is to improve forecast accuracy while balancing
            model performance, training cost, and operational scalability.
          </p>
          
          <p
            style={{
              lineHeight: 1.8,
              color: theme.subtext
            }}
          >
            The resulting system provides utility planners with reliable demand
            forecasts and demonstrates how machine learning can support
            data-driven decision making in modern energy operations.
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
        <div
          style={{
            overflowX: "auto",
            width: "100%",
            fontSize: "clamp(12px, 2vw, 16px)"
          }}
        >
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
        </div>

        {/* Heatmap */}
        <div
          style={{
            overflowX: "auto",
            fontSize: "clamp(12px, 2vw, 16px)"
          }}
        >
        <div style={sectionStyle}>
          <h2 style={titleStyle}>
            Model Comparison Heatmap
          </h2>

          <Heatmap data={results.full_results} 
            darkMode={darkMode}
          />
        </div>
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

const pageTitleStyle = {
  fontSize: "clamp(2rem, 4vw, 3rem)",
  fontWeight: 700,
  color: theme.heading,
  marginBottom: "20px"
};