import React, { useState, useEffect } from 'react';
import Magnetic from './Magnetic';

const codeSnippet = `@RestController
@RequestMapping("/api/v1/insurance")
public class LifeServiceController {

    @Autowired
    private MicroserviceRegistry registry;

    @PostMapping("/revamp")
    public ResponseEntity<Schema> optimize() {
        return registry.orchestrate(
            new OptimizationConfig()
                .setConcurrency(500000)
                .setFramework(Framework.REACT)
                .build()
        );
    }
}`;

export const Hero: React.FC = () => {
  const [typedCode, setTypedCode] = useState('');

  useEffect(() => {
    let index = 0;
    let currentText = '';
    let intervalId: number;

    const type = () => {
      if (index < codeSnippet.length) {
        currentText += codeSnippet.charAt(index);
        setTypedCode(currentText);
        index++;
        intervalId = window.setTimeout(type, 20);
      } else {
        intervalId = window.setTimeout(() => {
          setTypedCode('');
          currentText = '';
          index = 0;
          type();
        }, 5000);
      }
    };

    type();

    return () => {
      clearTimeout(intervalId);
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="px-margin-mobile md:px-gutter max-w-container-max mx-auto min-h-[819px] flex flex-col md:flex-row items-center gap-16 pt-32" 
      id="about"
    >
      <div className="flex-1 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass text-secondary-fixed text-label-caps select-none">
          <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
          Available for New Opportunities
        </div>
        
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight font-bold">
          Engineering <span className="text-primary-fixed-dim">high-performance</span> digital ecosystems.
        </h1>
        
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          I'm Kirtish Barmecha, a Senior Full Stack Developer specializing in Java Spring Boot and React. With 4.5+ years of experience, I build resilient microservices and immersive front-end architectures that drive innovation.
        </p>
        
        <div className="flex gap-4 pt-4">
          <Magnetic>
            <a 
              className="bg-primary-fixed text-on-primary-fixed px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(95,139,255,0.4)] transition-all active:scale-95 interactive-element" 
              href="#projects"
              onClick={(e) => handleScrollTo(e, 'projects')}
            >
              View Projects 
              <span className="material-symbols-outlined select-none text-base">arrow_forward</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a 
              className="glass px-8 py-4 rounded-xl font-bold hover:bg-surface-container-high transition-all active:scale-95 interactive-element" 
              href="#contact"
              onClick={(e) => handleScrollTo(e, 'contact')}
            >
              Get In Touch
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Code Snippet Card */}
      <div className="flex-1 w-full max-w-xl">
        <div className="glass p-6 rounded-2xl relative overflow-hidden group interactive-element border border-glass-stroke">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-fixed-dim via-secondary-fixed to-transparent opacity-50" />
          <div className="flex items-center gap-2 mb-4 select-none">
            <div className="w-3 h-3 rounded-full bg-error" />
            <div className="w-3 h-3 rounded-full bg-tertiary-container" />
            <div className="w-3 h-3 rounded-full bg-accent-lime" />
            <span className="ml-4 text-label-caps text-on-surface-variant opacity-60 font-mono text-xs">
              BarclaysArchitecture.java
            </span>
          </div>
          <div className="h-[280px] overflow-hidden">
            <pre className="font-mono text-sm text-primary-fixed leading-relaxed">
              <code className="text-primary-fixed" id="typewriter-code">
                {typedCode}
              </code>
            </pre>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-glow-cyan blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
