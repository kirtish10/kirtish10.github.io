import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../data/projectsData';

interface TerminalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LogLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export const TerminalOverlay: React.FC<TerminalOverlayProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<LogLine[]>([
    { text: 'DevPortfolio CLI [Version 1.0.0]', type: 'success' },
    { text: 'Type "help" to see available terminal command sequences.', type: 'output' },
    { text: '', type: 'output' }
  ]);
  const [matrixMode, setMatrixMode] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Scroll to bottom on history change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Canvas Matrix Digital Rain Effect
  useEffect(() => {
    if (!matrixMode || !isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const katakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabet = katakana.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(17, 19, 27, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ccff00'; // accent lime glow
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [matrixMode, isOpen]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const commandText = inputVal.trim();
    if (!commandText) return;

    const parts = commandText.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newHistory = [...history, { text: `kirtish@portfolio ~$ ${commandText}`, type: 'input' as const }];

    switch (cmd) {
      case 'help':
        newHistory.push(
          { text: 'Available commands:', type: 'success' },
          { text: '  about      - Display background details about Kirtish Barmecha', type: 'output' },
          { text: '  projects   - Show key works and navigate to case studies', type: 'output' },
          { text: '  skills     - List technical proficiencies', type: 'output' },
          { text: '  matrix     - Start the system terminal matrix code stream', type: 'output' },
          { text: '  clear      - Clear the console logs', type: 'output' },
          { text: '  exit       - Close the console dashboard overlay', type: 'output' }
        );
        break;

      case 'about':
        newHistory.push(
          { text: '--- KIRTISH BARMECHA | Senior Full Stack Architect ---', type: 'success' },
          { text: 'Professional trajectory spanning 4.5+ years developing highly robust', type: 'output' },
          { text: 'microservices and interactive front-ends for leaders like Barclays & Amdocs.', type: 'output' },
          { text: 'Expertise: Java Spring Boot (v8-21), React/TypeScript, AWS, and spatial routing.', type: 'output' }
        );
        break;

      case 'skills':
        newHistory.push(
          { text: '--- CORE PROFICIENCIES ---', type: 'success' },
          { text: '  • Java Development   : Spring Boot, JPA, Data, Security (Java 8/11/17/21)', type: 'output' },
          { text: '  • Front-End Stack    : React, Redux Toolkit, TypeScript, Next.js, CSS Grid', type: 'output' },
          { text: '  • Cloud & Pipelines : AWS, Docker, Jenkins CI/CD pipelines', type: 'output' },
          { text: '  • System Topology    : Microservices, REST API gates, Kafka Brokers', type: 'output' }
        );
        break;

      case 'projects':
        if (args.length === 0) {
          newHistory.push(
            { text: '--- SELECTED PORTFOLIO WORKS ---', type: 'success' },
            ...projectsData.map(p => ({
              text: `  • ${p.id.padEnd(24)} : ${p.title} (${p.technologies.slice(0, 3).join(', ')})`,
              type: 'output' as const
            })),
            { text: '  To view case study, type: "projects open <id>" (e.g. "projects open utm-drone-system")', type: 'output' }
          );
        } else if (args[0] === 'open' && args[1]) {
          const matched = projectsData.find(p => p.id === args[1]);
          if (matched) {
            newHistory.push({ text: `Redirecting to case study for ${matched.title}...`, type: 'success' });
            setTimeout(() => {
              navigate(`/project/${matched.id}`);
              onClose();
            }, 1000);
          } else {
            newHistory.push({ text: `Project id "${args[1]}" not found. Type "projects" to view available IDs.`, type: 'error' });
          }
        } else {
          newHistory.push({ text: 'Invalid arguments. Usage: "projects" or "projects open [id]"', type: 'error' });
        }
        break;

      case 'matrix':
        setMatrixMode(true);
        newHistory.push({ text: 'Starting Matrix digital code stream. Click console panel to exit matrix.', type: 'success' });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        break;

      default:
        newHistory.push({ text: `Command "${cmd}" not recognized. Type "help" for guidelines.`, type: 'error' });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-surface-dim/80 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="w-full max-w-3xl glass rounded-2xl overflow-hidden shadow-2xl relative flex flex-col border border-glass-stroke"
        onClick={() => { if (matrixMode) setMatrixMode(false); }}
      >
        {/* Terminal Header */}
        <div className="bg-surface-container/90 px-6 py-4 flex justify-between items-center border-b border-glass-stroke select-none">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-fixed-dim">terminal</span>
            <span className="font-mono text-sm font-bold text-on-surface">Kirtish_Barmecha@CoreAPI: ~</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-error cursor-pointer active:scale-75 transition-all" onClick={onClose} title="Close Console" />
            <div className="w-3 h-3 rounded-full bg-tertiary-container cursor-pointer" onClick={() => setHistory([])} title="Clear Log" />
            <div className="w-3 h-3 rounded-full bg-accent-lime cursor-pointer" onClick={() => setMatrixMode(!matrixMode)} title="Toggle Matrix" />
          </div>
        </div>

        {/* Terminal Content Screen */}
        <div className="h-[400px] p-6 font-mono text-sm overflow-y-auto relative bg-surface-container-lowest" ref={scrollRef}>
          {matrixMode ? (
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-pointer z-10" />
          ) : (
            <div className="space-y-2 select-text">
              {history.map((line, idx) => (
                <div 
                  key={idx} 
                  className={`leading-relaxed whitespace-pre-wrap ${
                    line.type === 'input' ? 'text-primary' :
                    line.type === 'success' ? 'text-accent-lime' :
                    line.type === 'error' ? 'text-error font-bold' : 'text-primary-fixed'
                  }`}
                >
                  {line.text}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Terminal Input Bar */}
        {!matrixMode && (
          <form onSubmit={handleCommand} className="bg-surface-container px-6 py-4 flex items-center gap-3 border-t border-glass-stroke">
            <span className="font-mono text-sm font-bold text-accent-lime select-none">~$</span>
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-on-surface focus:ring-0 focus:border-none w-full"
              placeholder='Type a command (e.g. "help", "projects")...'
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button 
              type="submit" 
              className="font-mono text-xs uppercase bg-primary-container text-on-primary-container px-4 py-2 rounded font-bold hover:shadow-[0_0_10px_rgba(95,139,255,0.3)] transition-all"
            >
              EXECUTE
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TerminalOverlay;
