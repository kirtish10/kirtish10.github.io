import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import type { ProjectData, ArchNode } from '../data/projectsData';
import useScrollReveal from '../hooks/useScrollReveal';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [hoveredNode, setHoveredNode] = useState<ArchNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useScrollReveal();

  useEffect(() => {
    const matched = projectsData.find((p) => p.id === id);
    if (matched) {
      setProject(matched);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-on-surface font-mono">
        <span className="material-symbols-outlined text-error text-6xl animate-bounce">error</span>
        <h1 className="text-2xl font-bold mt-6">Case Study Profile Not Found</h1>
        <p className="text-on-surface-variant mt-2 text-sm">Verify the project parameter or return home.</p>
        <Link to="/" className="mt-8 bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-bold active:scale-95 transition-all">
          Go Back Home
        </Link>
      </div>
    );
  }

  // Dynamically calculate node positions in a nice horizontal flow grid layout
  // Lanes: External (x=100) -> Frontend (x=300) -> Backend (x=500) -> Database (x=700)
  const computeNodePositions = (nodes: ArchNode[]) => {
    const positions: { [key: string]: { x: number; y: number } } = {};
    const typeCounts: { [key: string]: number } = { external: 0, frontend: 0, backend: 0, database: 0 };
    const typeInstances: { [key: string]: number } = { external: 0, frontend: 0, backend: 0, database: 0 };

    // First pass: Count items in each lane
    nodes.forEach(node => {
      typeCounts[node.type] = (typeCounts[node.type] || 0) + 1;
    });

    // Second pass: Compute coordinates
    nodes.forEach(node => {
      let x = 100;
      if (node.type === 'frontend') x = 280;
      else if (node.type === 'backend') x = 500;
      else if (node.type === 'database') x = 720;

      const totalInLane = typeCounts[node.type];
      const instanceIndex = typeInstances[node.type];
      
      // Distribute vertically centered within a 450px canvas
      const laneHeight = 360;
      const spacing = totalInLane > 1 ? laneHeight / (totalInLane - 1) : 0;
      const y = totalInLane > 1 
        ? 60 + instanceIndex * spacing 
        : 220; // single nodes centered vertically

      positions[node.id] = { x, y };
      typeInstances[node.type]++;
    });

    return positions;
  };

  const nodePositions = computeNodePositions(project.architectureNodes);

  const handleNodeMouseEnter = (node: ArchNode, e: React.MouseEvent) => {
    setHoveredNode(node);
    
    // Position tooltip relative to the SVG container coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (rect && parentRect) {
      setTooltipPos({
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top - 80
      });
    }
  };

  const getNodeColor = (type: ArchNode['type']) => {
    switch (type) {
      case 'external': return 'stroke-outline fill-surface-container-high/90 text-on-surface-variant';
      case 'frontend': return 'stroke-primary-container fill-surface-container/95 text-primary-fixed-dim';
      case 'backend': return 'stroke-secondary-fixed fill-surface-container/95 text-secondary-fixed';
      case 'database': return 'stroke-accent-lime fill-surface-container/95 text-accent-lime';
      default: return 'stroke-outline fill-surface-container';
    }
  };

  return (
    <div className="pt-24 min-h-screen pb-32">
      {/* Blurred Hero Background Banner */}
      <div className="relative h-[360px] md:h-[480px] w-full overflow-hidden select-none">
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-xl scale-110 brightness-[0.25]"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Banner Front Content */}
        <div className="relative z-10 h-full max-w-container-max mx-auto px-margin-mobile md:px-gutter flex flex-col justify-end pb-12">
          <div className="space-y-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold font-label-caps text-primary hover:underline"
            >
              <span className="material-symbols-outlined select-none text-sm">arrow_back</span>
              Back to Selected Works
            </Link>
            
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-on-surface leading-none">
              {project.title}
            </h1>
            
            <p className="font-body-lg text-body-lg text-secondary-fixed max-w-3xl leading-relaxed">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {project.technologies.map(tech => (
                <span key={tech} className="bg-surface-container-high/70 backdrop-blur-md border border-glass-stroke px-4 py-1 rounded-full text-xs font-bold text-primary-fixed">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Grid Content */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Metadata & Core Highlights */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass p-6 rounded-2xl border border-glass-stroke space-y-6">
            <h3 className="font-label-caps text-xs uppercase tracking-widest text-on-surface-variant font-bold border-b border-glass-stroke pb-3 select-none">
              Project Parameters
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider font-mono">My Role</p>
                <p className="text-sm font-semibold text-on-surface mt-1">{project.role}</p>
              </div>
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider font-mono">Timeline</p>
                <p className="text-sm font-semibold text-on-surface mt-1">{project.timeline}</p>
              </div>
            </div>
            
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-surface-container-high hover:bg-surface-container-highest border border-glass-stroke text-on-surface font-bold py-3 rounded-xl active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined select-none text-base">code</span> 
                Inspect Code Repository
              </a>
            )}
          </div>

          {/* Dynamic Metrics Cards */}
          <div className="glass p-6 rounded-2xl border border-glass-stroke space-y-6">
            <h3 className="font-label-caps text-xs uppercase tracking-widest text-on-surface-variant font-bold border-b border-glass-stroke pb-3 select-none">
              Key Engineering Impact Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="bg-surface-container-lowest/80 p-4 rounded-xl border border-glass-stroke text-center">
                  <p className="text-2xl font-bold text-accent-lime">{metric.value}</p>
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold mt-1 font-mono tracking-wider">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Case Study Narrative */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Challenge & Solution */}
          <div className="space-y-8">
            <div className="space-y-3 reveal">
              <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-error select-none">warning</span> 
                The Core Engineering Challenge
              </h2>
              <p className="text-on-surface-variant leading-relaxed text-body-md select-text">
                {project.challenge}
              </p>
            </div>

            <div className="space-y-3 reveal">
              <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-accent-lime select-none">lightbulb</span> 
                The Architectural Solution
              </h2>
              <p className="text-on-surface-variant leading-relaxed text-body-md select-text">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Dynamic Interactive System Architecture Section */}
          <div className="space-y-6 reveal border-t border-glass-stroke pt-12">
            <div className="select-none">
              <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary select-none">hub</span> 
                System Architecture Topology
              </h2>
              <p className="text-on-surface-variant mt-1 text-sm">
                Hover over active nodes to inspect connection parameters, data flow mechanisms, and hardware logic details.
              </p>
            </div>

            {/* Interactive SVG Diagram Box */}
            <div className="glass rounded-2xl border border-glass-stroke p-4 bg-surface-container-lowest/40 relative overflow-hidden">
              <svg 
                viewBox="0 0 820 440" 
                className="w-full h-auto max-h-[380px] select-none font-mono"
              >
                {/* SVG Definitions for marker arrows and glow filters */}
                <defs>
                  <marker 
                    id="arrow" 
                    viewBox="0 0 10 10" 
                    refX="25" 
                    refY="5" 
                    markerWidth="6" 
                    markerHeight="6" 
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#8c90a1" />
                  </marker>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Grid Overlay for Cybernetic Aesthetic */}
                <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Draw Edges / Arrows */}
                {project.architectureEdges.map((edge, idx) => {
                  const fromPos = nodePositions[edge.from];
                  const toPos = nodePositions[edge.to];
                  if (!fromPos || !toPos) return null;

                  return (
                    <g key={`edge-${idx}`}>
                      <line
                        x1={fromPos.x}
                        y1={fromPos.y}
                        x2={toPos.x}
                        y2={toPos.y}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                      />
                      {/* Interactive glowing overlay line when from/to nodes are hovered */}
                      {(hoveredNode?.id === edge.from || hoveredNode?.id === edge.to) && (
                        <line
                          x1={fromPos.x}
                          y1={fromPos.y}
                          x2={toPos.x}
                          y2={toPos.y}
                          stroke="#5f8bff"
                          strokeWidth="3"
                          opacity="0.6"
                          filter="url(#glow)"
                          className="transition-all duration-300"
                        />
                      )}
                    </g>
                  );
                })}

                {/* Draw Nodes */}
                {project.architectureNodes.map((node) => {
                  const pos = nodePositions[node.id];
                  if (!pos) return null;
                  const isHovered = hoveredNode?.id === node.id;

                  return (
                    <g 
                      key={node.id}
                      transform={`translate(${pos.x}, ${pos.y})`}
                      className="cursor-pointer group"
                      onMouseEnter={(e) => handleNodeMouseEnter(node, e)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      {/* Outer Glow Halo on Hover */}
                      <circle
                        r="32"
                        className={`transition-all duration-300 fill-transparent stroke-2 opacity-0 group-hover:opacity-100 ${
                          node.type === 'frontend' ? 'stroke-primary' :
                          node.type === 'backend' ? 'stroke-secondary' :
                          node.type === 'database' ? 'stroke-accent-lime' : 'stroke-outline'
                        }`}
                        filter="url(#glow)"
                      />

                      {/* Glass Node Body */}
                      <rect
                        x="-60"
                        y="-25"
                        width="120"
                        height="50"
                        rx="10"
                        strokeWidth="1.5"
                        className={`transition-all duration-300 ${getNodeColor(node.type)} ${
                          isHovered ? 'stroke-[2px]' : 'opacity-85'
                        }`}
                      />

                      {/* Node Label Text */}
                      <text
                        y="4"
                        textAnchor="middle"
                        className={`text-[9px] font-bold select-none transition-all duration-300 pointer-events-none fill-on-surface`}
                      >
                        {node.label.length > 20 ? node.label.slice(0, 18) + '..' : node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Absolutely Positioned Node Detail Tooltip inside SVG parent box */}
              {hoveredNode && (
                <div 
                  className="absolute p-4 glass rounded-xl border border-glass-stroke max-w-[280px] pointer-events-none transition-all duration-300 shadow-2xl z-40 bg-surface-container/95 animate-fade-in"
                  style={{
                    left: `${Math.max(16, Math.min(window.innerWidth - 300, tooltipPos.x - 140))}px`,
                    top: `${tooltipPos.y}px`
                  }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent-lime font-mono">
                    {hoveredNode.type} Node Info
                  </p>
                  <p className="text-xs font-bold text-on-surface mt-1">{hoveredNode.label}</p>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed mt-2 select-text">{hoveredNode.details}</p>
                </div>
              )}
            </div>
            
            <p className="text-xs text-on-surface-variant leading-relaxed">
              <strong>System Flow Diagram Overview:</strong> {project.architectureNotes}
            </p>
          </div>

          {/* Key Engineering Outcomes & Accomplishments */}
          <div className="space-y-6 reveal border-t border-glass-stroke pt-12">
            <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container select-none">done_all</span> 
              Core Outcomes & Achievements
            </h2>
            <ul className="space-y-4 select-text">
              {project.outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-3 text-on-surface-variant text-body-md leading-relaxed">
                  <span className="material-symbols-outlined text-accent-lime text-base leading-none select-none mt-1">check_circle</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;
