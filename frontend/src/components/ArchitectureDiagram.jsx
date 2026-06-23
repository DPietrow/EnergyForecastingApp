import React from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

const nodes = [
  {
    id: "1",
    position: { x: 0, y: 100 },
    data: { label: "Raw PJM Data" },
    type: "input"
  },
  {
    id: "2",
    position: { x: 250, y: 100 },
    data: { label: "Feature Engineering" }
  },
  {
    id: "3",
    position: { x: 500, y: 100 },
    data: { label: "Model Training" }
  },
  {
    id: "4",
    position: { x: 750, y: 100 },
    data: { label: "Model Evaluation" }
  },
  {
    id: "5",
    position: { x: 1000, y: 100 },
    data: { label: "Best Model Selection" }
  },
  {
    id: "6",
    position: { x: 1250, y: 100 },
    data: { label: "XGBoost Deployment" }
  },
  {
    id: "7",
    position: { x: 1500, y: 100 },
    data: { label: "Flask API" }
  },
  {
    id: "8",
    position: { x: 1750, y: 100 },
    data: { label: "React Dashboard" }
  }
];

const edges = [
  { id: "e1", source: "1", target: "2" },
  { id: "e2", source: "2", target: "3" },
  { id: "e3", source: "3", target: "4" },
  { id: "e4", source: "4", target: "5" },
  { id: "e5", source: "5", target: "6" },
  { id: "e6", source: "6", target: "7" },
  { id: "e7", source: "7", target: "8" }
];

export default function ArchitectureDiagram() {
  return (
    <div style={{ height: 300 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      />
    </div>
  );
}