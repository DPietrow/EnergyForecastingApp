import React from "react";

const getColor = (value) => {
  if (value > 0.95) return "#0f766e";
  if (value > 0.85) return "#14b8a6";
  if (value > 0.70) return "#5eead4";
  if (value > 0.50) return "#99f6e4";
  if (value > 0) return "#ccfbf1";
  return "#fecaca";
};

export default function Heatmap({
  data,
  darkMode
}) {
  const models = [
    "GRU",
    "LSTM",
    "Naive",
    "RandomForest",
    "XGBoost"
  ];

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse"
      }}
    >
      <thead>
        <tr>
          <th>Region</th>
          <th>Horizon</th>

          {models.map((m) => (
            <th key={m}>{m}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            <td>{row.region}</td>
            <td>{row.horizon}</td>

            {models.map((m) => (
              <td
                key={m}
                style={{
                  backgroundColor: getColor(row[m]),
                  textAlign: "center",
                  padding: 10,
                  color: darkMode
                    ? "black"
                    : "#111827"
                }}
              >
                {row[m].toFixed(3)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}