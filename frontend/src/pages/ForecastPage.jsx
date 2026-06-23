import { useState, useEffect } from "react";
import ProfileSidebar from "../components/ProfileSidebar";
import Navbar from "../components/Navbar";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function ForecastPage({
  darkMode,
  setDarkMode
}) {
  const [region, setRegion] = useState("PJME");
  const [horizon, setHorizon] = useState("hourly");
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateButton = {
  padding: "16px 32px",
  borderRadius: "12px",
  border: "none",
  background: darkMode
    ? "#f8fafc"
    : "#111827",
  color: darkMode
    ? "#111827"
    : "#f8fafc",
  fontSize: "17px",
  fontWeight: "600",
  cursor: "pointer"
};

    const theme = darkMode
    ? {
        background: "#0f172a",
        card: "#1e293b",
        cardAlt: "#334155",
        text: "#f8fafc",
        heading: "#ffffff",
        subtext: "#cbd5e1",
        tag: "#334155",
        border: "#475569",
        cardBorder: "#475569"
      }
    : {
        background: "#f8fafc",
        card: "#ffffff",
        cardAlt: "#f8fafc",
        text: "#111827",
        heading: "#0f172a",
        subtext: "#475569",
        border: "#e2e8f0",
        tag: "#f1f5f9",
        cardBorder: "#e2e8f0"
      };
  useEffect(() => {
  document.body.style.background =
    theme.background;
}, [theme.background]);

  async function generateForecast() {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/forecast`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            region,
            horizon
          })
        }
      );

      const data =
  await response.json();

if (
  !data ||
  !Array.isArray(data.timestamps) ||
  !Array.isArray(data.forecasts)
) {
  throw new Error(
    "Invalid forecast response"
  );
}

setForecast(data);

    } catch (error) {
      console.error(error);
      alert(
        "Failed to generate forecast."
      );
    } finally {
      setLoading(false);
    }
  }
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  const year =
    date.getFullYear();

  let hours =
    date.getHours();

  const minutes = String(
    date.getMinutes()
  ).padStart(2, "0");

  const ampm =
    hours >= 12 ? "PM" : "AM";

  hours = hours % 12;

  if (hours === 0) {
    hours = 12;
  }

  return `${month}-${day}-${year} ${String(
    hours
  ).padStart(2, "0")}:${minutes} ${ampm}`;
}

  const chartData = forecast
    ? forecast.timestamps.map(
        (timestamp, idx) => ({
          timestamp:
            formatTimestamp(timestamp),
          forecast:
            forecast.forecasts[idx]
        })
      )
    : [];

  const peakLoad = forecast
    ? Math.max(
        ...forecast.forecasts
      ).toFixed(0)
    : "-";

  const minLoad = forecast
    ? Math.min(
        ...forecast.forecasts
      ).toFixed(0)
    : "-";

  const avgLoad = forecast
    ? (
        forecast.forecasts.reduce(
          (a, b) => a + b,
          0
        ) /
        forecast.forecasts.length
      ).toFixed(0)
    : "-";

  const modelR2 = {
    PJME: {
      hourly: 0.995653,
      daily: 0.859622,
      weekly: 0.652178,
      monthly: 0.641024
    },
    PJMW: {
      hourly: 0.994088,
      daily: 0.840224,
      weekly: 0.599860,
      monthly: 0.580417
    }
  };

  const r2 =
    modelR2[region][horizon];

  const peakIndex = forecast
    ? forecast.forecasts.indexOf(
        Math.max(
          ...forecast.forecasts
        )
      )
    : 0;

  const peakTimestamp =
    forecast
      ? forecast.timestamps[
          peakIndex
        ]
      : "";

  const percentIncrease =
    forecast
      ? (
          ((Number(
            peakLoad
          ) -
            Number(
              minLoad
            )) /
            Number(
              minLoad
            )) *
          100
        ).toFixed(1)
      : 0;

  const cumulativeData =
    forecast
      ? forecast.forecasts.map(
          (value, idx) => ({
            timestamp:
              formatTimestamp(
                forecast.timestamps[idx]
              ),

            cumulative:
              forecast.forecasts
                .slice(
                  0,
                  idx + 1
                )
                .reduce(
                  (
                    a,
                    b
                  ) =>
                    a + b,
                  0
                )
          })
        )
      : [];

  function downloadCSV() {
    if (!forecast) return;

    const rows =
      forecast.timestamps.map(
        (ts, idx) =>
          `${ts},${forecast.forecasts[idx]}`
      );

    const csv =
      "timestamp,forecast\n" +
      rows.join("\n");

    const blob =
      new Blob(
        [csv],
        {
          type:
            "text/csv"
        }
      );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      `${region}_${horizon}_forecast.csv`;

    link.click();
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
    <div
    style={{
      maxWidth: "1300px",
      margin: "0 auto",
      padding: "40px"
    }}
  >
      {/* HERO */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "50px"
        }}
      >
        <h1
          style={{
            ...pageTitleStyle,
            color: theme.heading
          }}
        >
          Forecast Dashboard
        </h1>

        <p
          style={{
            maxWidth: "850px",
            margin: "0 auto",
            color: theme.subtext,
            lineHeight: "1.7",
            fontSize: "18px"
          }}
        >
          Generate electrical
          load forecasts using
          the production
          XGBoost models
          selected during
          experimentation and
          evaluation across
          PJM regions.
        </p>
      </div>

      {/* CONFIGURATION */}

      <div
        style={{
          ...sectionStyle, 
          background: theme.card,
          color: theme.text}}
      >
        <h2
          style={{
        ...sectionTitle,
        color: theme.text
          }}
        >
          Forecast Configuration
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent:
              "center",
            gap: "25px",
            flexWrap: "wrap"
          }}
        >
          <select
            value={region}
            onChange={(e) =>
              setRegion(
                e.target.value
              )
            }
            style={selectStyle}
          >
            <option value="PJME">
              PJME
            </option>

            <option value="PJMW">
              PJMW
            </option>
          </select>

          <select
            value={horizon}
            onChange={(e) =>
              setHorizon(
                e.target.value
              )
            }
            style={selectStyle}
          >
            <option value="hourly">
              Hourly
            </option>

            <option value="daily">
              Daily
            </option>

            <option value="weekly">
              Weekly
            </option>

            <option value="monthly">
              Monthly
            </option>
          </select>

          <button
            onClick={
              generateForecast
            }
            style={
              generateButton
            }
          >
            Generate Forecast
          </button>
        </div>
      </div>

      {loading && (
        <h2
          style={{
            textAlign:
              "center",
            color:
              theme.subtext
          }}
        >
          Generating
          Forecast...
        </h2>
      )}

      {forecast && (
        <>
          {/* DETAILS */}

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
              Forecast Details
            </h2>

            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(220px,1fr))",
                gap: "20px"
              }}
            >
              <div
                style={{
                ...detailCard,
                  background: theme.card
                }}
              >
                <h4>
                  Model
                </h4>
                <p>
                  XGBoost
                </p>
              </div>

              <div
               style={{
                ...detailCard,
                background: theme.card
                }}
              >
                <h4>
                  Region
                </h4>
                <p>
                  {
                    region
                  }
                </p>
              </div>

              <div
               style={{
                ...detailCard,
                background: theme.card
                }}
              >
                <h4>
                  Horizon
                </h4>
                <p>
                  {
                    horizon
                  }
                </p>
              </div>

              <div
                style={{
                ...detailCard,
                background: theme.card
              }}
              >
                <h4>
                  Forecast
                  Periods
                </h4>
                <p>
                  {
                    forecast
                      .forecasts
                      .length
                  }
                </p>
              </div>

              <div
                style={{
                ...detailCard,
                background: theme.card
                }}
              >
                <h4>
                  Training
                  R²
                </h4>
                <p>
                  {r2.toFixed(
                    4
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* KPI CARDS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "20px",
              marginBottom:
                "40px"
            }}
          >
            <div
              style={{
                ...sectionStyle,
                  background: theme.card,
                  color: theme.text,
                  textAlign:
                    "center"
              }}
            >
              <h3>
                Peak Load
              </h3>

              <h2
  style={{
    fontSize: "42px",
    fontWeight: 800,
    color: theme.text
  }}
>
                {
                  peakLoad
                }
              </h2>
            </div>

            <div
              style={{
                ...sectionStyle,
                  background: theme.card,
                  color: theme.text,
                  textAlign:
                    "center"
              }}
            >
              <h3>
                Average
                Load
              </h3>

              <h2
  style={{
    fontSize: "42px",
    fontWeight: 800,
    color: theme.text
  }}
>
                {
                  avgLoad
                }
              </h2>
            </div>

            <div
              style={{
                ...sectionStyle,
                  background: theme.card,
                  color: theme.text,
                  textAlign:
                    "center"
              }}
            >
              <h3>
                Minimum
                Load
              </h3>

              <h2
  style={{
    fontSize: "42px",
    fontWeight: 800,
    color: theme.text
  }}
>
                {
                  minLoad
                }
              </h2>
            </div>
          </div>

          {/* SUMMARY */}

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
              Forecast Summary
            </h2>
            <div 
            style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(180px,1fr))",
                gap: "20px"
            }}
            >
  <h2 
      style={{
        ...sectionTitle,
        color: theme.text,
        marginTop: "40px"
      }}
        >
    Forecast Insights
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(180px,1fr))",
      gap: "20px"
    }}
  >
    <div 
    style={{
      ...detailCard,
      background: theme.card
    }}>
      <h4>
        Peak Demand Period
      </h4>

      <p>{formatTimestamp(peakTimestamp)}</p>
    </div>

    <div 
    style={{
      ...detailCard,
      background: theme.card
    }}
    >
      <h4>
        Load Variability
      </h4>

      <p>
        {percentIncrease}%
      </p>
    </div>

    <div 
    style={{
      ...detailCard,
      background: theme.card
    }}
    >
      <h4>
        Production Model
      </h4>

      <p>XGBoost</p>
    </div>
  </div>
</div>

            <p
              style={{
                color:
                  theme.subtext,
                fontSize:
                  "17px",
                lineHeight:
                  "1.9"
              }}
            >
              Peak demand is
              expected around{" "}
              <strong>
                {
                  formatTimestamp(peakTimestamp)
                }
              </strong>{" "}
              with an
              estimated load
              of{" "}
              <strong>
                {
                  peakLoad
                }
              </strong>
              . Average load
              across the
              forecast
              horizon is{" "}
              <strong>
                {
                  avgLoad
                }
              </strong>
              . Forecasted
              demand
              increases by{" "}
              <strong>
                {
                  percentIncrease
                }
                %
              </strong>{" "}
              from minimum
              to peak,
              indicating
              expected load
              variability
              throughout
              the selected
              period.
            </p>
          </div>

          {/* MAIN CHART */}

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
              Forecast
              Visualization
            </h2>

            <div
              style={{
                height:
                  "550px"
              }}
            >
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={
                    chartData
                  }
                >
                  <CartesianGrid
  stroke={theme.border}
/>

<XAxis
  dataKey="timestamp"
  tickFormatter={(value) =>
    value.split(" T ")[0]
  }
  stroke={theme.subtext}
/>

<YAxis
  stroke={theme.subtext}
/>

                  <Tooltip />

                  <Line
  type="monotone"
  dataKey="forecast"
  stroke="#2563eb"
  strokeWidth={4}
  dot={false}
/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CUMULATIVE */}

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
              Cumulative
              Energy Demand
            </h2>

            <div
              style={{
                height:
                  "500px"
              }}
            >
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={
                    cumulativeData
                  }
                >
                  <CartesianGrid />

                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) =>
                    value.split(" T ")[0]
                    }
                    stroke={theme.subtext}
                  />

                  <YAxis 
                    stroke={theme.subtext}
                    width={80}
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="cumulative"
                    stroke="#16a34a"
                    strokeWidth={4}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
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
    Forecast Results
  </h2>

  <div
    style={{
      maxHeight: "400px",
      overflowY: "auto"
    }}
  >
    <table
      style={{
        width: "100%",
        borderCollapse:
          "collapse"
      }}
    >
      <thead>
        <tr>
          <th 
          style={{
            padding: "12px",
            borderBottom: `1px solid ${theme.border}`,
            textAlign: "center"
            }}
          >
            Timestamp</th>
          <th 
          style={{
            padding: "12px",
            borderBottom: `1px solid ${theme.border}`,
            textAlign: "center"
          }}
          >Forecast</th>
        </tr>
      </thead>

      <tbody>
        {chartData.map(
          (row, idx) => (
            <tr key={idx}>
              <td 
              style={{
                padding: "10px",
                borderBottom: `1px solid ${theme.border}`,
                textAlign: "center"
                }}
              >
                {
                  row.timestamp
                }
              </td>

              <td
              style={{
                padding: "10px",
                borderBottom: `1px solid ${theme.border}`,
                textAlign: "center"
                }}
              >
                {row.forecast.toFixed(
                  0
                )}
              </td>
            </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
          

          {/* DOWNLOAD */}

          <div
            style={{
              textAlign:
                "center",
              marginTop:
                "35px"
            }}
          >
            <button
              onClick={
                downloadCSV
              }
              style={
                downloadButton
              }
            >
              Download
              Forecast CSV
            </button>
          </div>
        </>
      )}
    </div>
    </div>
    </div>
    </div>
  );
}

const sectionStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "18px",
  marginBottom: "35px",
  boxShadow:
    "0 4px 12px rgba(0,0,0,.08)"
};

const sectionTitle = {
  textAlign: "center",
  marginBottom: "25px"
};

const selectStyle = {
  padding: "16px 24px",
  fontSize: "17px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  minWidth: "220px",
  cursor: "pointer"
};

const generateButton = {
  padding: "16px 32px",
  borderRadius: "12px",
  border: "none",
  fontSize: "17px",
  fontWeight: "600",
  cursor: "pointer"
};

const downloadButton = {
  padding: "16px 32px",
  borderRadius: "12px",
  border: "none",
  fontSize: "17px",
  fontWeight: "600",
  cursor: "pointer"
};

const cardStyle = {
  padding: "30px",
  borderRadius: "18px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,.08)"
};

const pageTitleStyle = {
  fontSize: "clamp(2rem, 4vw, 3rem)",
  fontWeight: 700,
  marginBottom: "20px"
};

const detailCard = {
    borderRadius: "18px",
    padding: "20px",
    minWidth: 0,
    overflowWrap: "break-word",
    boxSizing: "border-box"
  };