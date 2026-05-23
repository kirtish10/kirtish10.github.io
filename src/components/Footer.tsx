import React, { useState, useEffect } from 'react';

export const Footer: React.FC = () => {
  const [showTelemetry, setShowTelemetry] = useState(false);
  const [latency, setLatency] = useState(14);
  const [cpu, setCpu] = useState(0.02);

  // Animate mock live telemetry fields every few seconds to look realistic!
  useEffect(() => {
    if (!showTelemetry) return;

    const interval = setInterval(() => {
      setLatency(prev => Math.max(8, Math.min(22, +(prev + (Math.random() * 4 - 2)).toFixed(0))));
      setCpu(prev => Math.max(0.01, Math.min(0.08, +(prev + (Math.random() * 0.02 - 0.01)).toFixed(3))));
    }, 2000);

    return () => clearInterval(interval);
  }, [showTelemetry]);

  return (
    <footer className="w-full py-12 bg-background border-t border-glass-stroke mt-section-gap relative z-10 select-none">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-gutter max-w-container-max mx-auto gap-gutter">
        <div className="text-on-surface-variant font-headline-md text-headline-md font-bold tracking-tighter">
          Kirtish B.
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <div className="font-label-caps text-label-caps text-on-surface-variant text-center">
            © {new Date().getFullYear()} Neural Expressive. Built for the future.
          </div>
          
          {/* Mock Interactive Telemetry Toggle */}
          <button 
            onClick={() => setShowTelemetry(!showTelemetry)}
            className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider font-mono text-accent-lime hover:underline cursor-pointer active:scale-95 bg-surface-container-low/60 px-3 py-1 rounded-full border border-glass-stroke mt-1 transition-all"
          >
            <span className={`w-1.5 h-1.5 rounded-full bg-accent-lime ${showTelemetry ? 'animate-ping' : ''}`} />
            {showTelemetry ? 'Hide Live Server Telemetry' : 'Show Live Server Telemetry'}
          </button>
        </div>
        
        <div className="flex gap-8">
          <a 
            className="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-label-caps" 
            href="https://github.com/kirtish10" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a 
            className="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-label-caps" 
            href="https://linkedin.com/in/kirtishbarmecha" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Simulated Server Telemetry Dashboard panel */}
      {showTelemetry && (
        <div className="max-w-2xl mx-auto mt-8 p-6 glass rounded-2xl border border-glass-stroke mx-margin-mobile font-mono text-xs text-primary-fixed space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-glass-stroke pb-2 text-[10px] uppercase text-accent-lime font-bold">
            <span>Portfolio Server Live Diagnostics</span>
            <span>Status: Operational (HTTP/3)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-surface-container/60 p-3 rounded-lg border border-glass-stroke">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold">Gateway Latency</p>
              <p className="text-sm font-bold text-accent-lime mt-1">{latency}ms</p>
            </div>
            <div className="bg-surface-container/60 p-3 rounded-lg border border-glass-stroke">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold">CPU Load (JVM)</p>
              <p className="text-sm font-bold text-on-surface mt-1">{cpu}%</p>
            </div>
            <div className="bg-surface-container/60 p-3 rounded-lg border border-glass-stroke">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold">Memory In-Use</p>
              <p className="text-sm font-bold text-on-surface mt-1">38.2%</p>
            </div>
            <div className="bg-surface-container/60 p-3 rounded-lg border border-glass-stroke">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold">HikariPool Size</p>
              <p className="text-sm font-bold text-secondary-fixed mt-1">24 ACTIVE</p>
            </div>
          </div>
          <p className="text-[9px] text-on-surface-variant text-center leading-relaxed">
            * This panel aggregates live telemetry simulated in React lifecycle threads, reflecting enterprise architectural health.
          </p>
        </div>
      )}
    </footer>
  );
};

export default Footer;
