import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.contact-card',
      { scale: 0.95, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.75)',
        scrollTrigger: {
          trigger: '.contact-card',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('processing');

    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <section ref={containerRef} className="section-gap px-margin-mobile md:px-gutter max-w-4xl mx-auto pb-32" id="contact">
      <div className="glass rounded-[2rem] p-8 md:p-16 relative overflow-hidden interactive-element border border-glass-stroke contact-card opacity-0">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-glow-violet blur-[80px] opacity-20 pointer-events-none" />
        
        <div className="text-center mb-12 select-none">
          <h2 className="font-display-lg text-display-lg-mobile md:text-headline-md font-bold text-on-surface mb-4">
            Let's build the future together.
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto text-sm leading-relaxed">
            Whether you're looking for a lead developer or just want to talk tech architecture, my inbox is always open.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-label-caps text-on-surface-variant ml-2 block font-bold text-xs uppercase tracking-wider">
                Name
              </label>
              <input 
                required
                type="text" 
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === 'processing'}
                className="w-full bg-surface-container-low border border-glass-stroke rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary-fixed-dim focus:border-transparent outline-none text-on-surface transition-all font-body-md"
              />
            </div>
            <div className="space-y-2">
              <label className="text-label-caps text-on-surface-variant ml-2 block font-bold text-xs uppercase tracking-wider">
                Email
              </label>
              <input 
                required
                type="email" 
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'processing'}
                className="w-full bg-surface-container-low border border-glass-stroke rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary-fixed-dim focus:border-transparent outline-none text-on-surface transition-all font-body-md"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-label-caps text-on-surface-variant ml-2 block font-bold text-xs uppercase tracking-wider">
              Project Message
            </label>
            <textarea 
              required
              rows={4}
              placeholder="Tell me about your vision..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === 'processing'}
              className="w-full bg-surface-container-low border border-glass-stroke rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary-fixed-dim focus:border-transparent outline-none text-on-surface transition-all font-body-md resize-none"
            />
          </div>

          <Magnetic>
            <button 
              type="submit" 
              disabled={status === 'processing'}
              className={`w-full font-bold py-5 rounded-xl active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer ${
                status === 'success' 
                  ? 'bg-accent-lime text-on-tertiary shadow-[0_0_30px_rgba(204,255,0,0.4)]'
                  : 'bg-primary-fixed text-on-primary-fixed hover:shadow-[0_0_30px_rgba(95,139,255,0.4)]'
              }`}
            >
              {status === 'idle' && (
                <>
                  <span className="material-symbols-outlined select-none text-xl leading-none">send</span> 
                  Dispatch Message
                </>
              )}
              {status === 'processing' && (
                <>
                  <span className="material-symbols-outlined animate-spin select-none text-xl leading-none">refresh</span> 
                  Processing...
                </>
              )}
              {status === 'success' && (
                <>
                  <span className="material-symbols-outlined select-none text-xl leading-none">check_circle</span> 
                  Message Dispatched successfully!
                </>
              )}
            </button>
          </Magnetic>
        </form>

        <div className="mt-16 pt-8 border-t border-glass-stroke flex flex-wrap justify-center gap-8 font-mono text-sm select-all">
          <a className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="mailto:kirtishbarmecha@gmail.com">
            <span className="material-symbols-outlined select-none text-base">mail</span> 
            kirtishbarmecha@gmail.com
          </a>
          <a className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="tel:+919340898883">
            <span className="material-symbols-outlined select-none text-base">call</span> 
            +91-9340898883
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
