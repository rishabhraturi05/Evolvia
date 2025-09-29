"use client";
import React, { useMemo } from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
const nodeWidth = 220;
const nodeHeight = 70;

const getLayoutedElements = (nodes, edges, direction = "LR") => {
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = "left";
    node.sourcePosition = "right";
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};

// 🎓 Career data nodes
const rawNodes = [
  { id: "10th", data: { label: "After 10th (Science)" }, position: { x: 0, y: 0 } },
  { id: "12th", data: { label: "After 12th (Science)" }, position: { x: 0, y: 0 } },

  // After 10th branches
  { id: "iti", data: { label: "ITI Trades (Fitter, Electrician...)" }, position: { x: 0, y: 0 } },
  { id: "paramedical", data: { label: "Paramedical Diplomas (MLT, GNM, ANM)" }, position: { x: 0, y: 0 } },
  { id: "poly", data: { label: "Polytechnic Diplomas" }, position: { x: 0, y: 0 } },

  // After 12th branches
  { id: "pcb", data: { label: "PCB / PCMB → Medical & Life Sciences" }, position: { x: 0, y: 0 } },
  { id: "pcm", data: { label: "PCM → Engineering & IT" }, position: { x: 0, y: 0 } },
  { id: "govt", data: { label: "Competitive Exams & Govt Careers" }, position: { x: 0, y: 0 } },

  // PCB details
  { id: "mbbs", data: { label: "MBBS, BDS, BAMS, BHMS" }, position: { x: 0, y: 0 } },
  { id: "bscagri", data: { label: "B.Sc Agriculture, Biotech, Microbiology" }, position: { x: 0, y: 0 } },
  { id: "researchpcb", data: { label: "M.Sc, Ph.D., Research Careers" }, position: { x: 0, y: 0 } },

  // PCM details
  { id: "be", data: { label: "B.E. / B.Tech, B.Arch" }, position: { x: 0, y: 0 } },
  { id: "cs", data: { label: "B.Sc CS, BCA, Data Science" }, position: { x: 0, y: 0 } },
  { id: "mtech", data: { label: "M.Tech, MCA, Pilot CPL, Armed Forces" }, position: { x: 0, y: 0 } },

  // Govt details
  { id: "ies", data: { label: "Engineering Services (IES)" }, position: { x: 0, y: 0 } },
  { id: "ias", data: { label: "Civil Services (IAS, MPSC)" }, position: { x: 0, y: 0 } },
  { id: "railway", data: { label: "Railways, Defense, Pilot" }, position: { x: 0, y: 0 } },
];

const rawEdges = [
  // Root connections
  { id: "e1", source: "10th", target: "iti" },
  { id: "e2", source: "10th", target: "paramedical" },
  { id: "e3", source: "10th", target: "poly" },

  { id: "e4", source: "12th", target: "pcb" },
  { id: "e5", source: "12th", target: "pcm" },
  { id: "e6", source: "12th", target: "govt" },

  // PCB
  { id: "e7", source: "pcb", target: "mbbs" },
  { id: "e8", source: "pcb", target: "bscagri" },
  { id: "e9", source: "pcb", target: "researchpcb" },

  // PCM
  { id: "e10", source: "pcm", target: "be" },
  { id: "e11", source: "pcm", target: "cs" },
  { id: "e12", source: "pcm", target: "mtech" },

  // Govt
  { id: "e13", source: "govt", target: "ies" },
  { id: "e14", source: "govt", target: "ias" },
  { id: "e15", source: "govt", target: "railway" },
];

export default function CareerFlowchart() {
  const { nodes, edges } = useMemo(
    () => getLayoutedElements(rawNodes, rawEdges, "LR"), // LR = Left-to-Right flow
    []
  );

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        attributionPosition="top-right"
      >
        <Background gap={12} size={1} color="#aaa" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
