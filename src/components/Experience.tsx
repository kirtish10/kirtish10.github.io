import React from 'react';

interface RoleProps {
  timeline: string;
  title: string;
  company: string;
  points: string[];
  align: 'left' | 'right';
  badgeColor: string;
}

const RoleCard: React.FC<RoleProps> = ({ timeline, title, company, points, align, badgeColor }) => {
  return (
    <div className={`relative flex flex-col md:flex-row items-center gap-8 group ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
      <div className={`md:w-1/2 w-full ${align === 'left' ? 'md:text-right text-left' : 'md:text-left text-left'}`}>
        <div className="glowing-card p-6 rounded-2xl transition-all interactive-element experience-card border border-glass-stroke">
          <span className={`text-label-caps font-bold ${badgeColor}`}>{timeline}</span>
          <h3 className="font-headline-md text-body-lg font-bold mt-2 text-on-surface">{title}</h3>
          <p className="text-on-surface-variant font-medium mt-1">{company}</p>
          <ul className={`text-on-surface-variant mt-4 text-sm space-y-2 text-left ${align === 'left' ? 'md:text-right' : 'md:text-left'}`}>
            {points.map((pt, idx) => (
              <li key={idx}>• {pt}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="absolute left-[-8px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary-fixed shadow-[0_0_10px_rgba(95,139,255,0.8)] z-10 hidden md:block" />
      <div className="md:w-1/2 w-full" />
    </div>
  );
};

export const Experience: React.FC = () => {
  return (
    <section className="section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto reveal" id="experience">
      <div className="text-center mb-16 select-none">
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Professional Trajectory</h2>
        <p className="text-on-surface-variant mt-2">Scaling impact across global fintech and telecom leaders.</p>
      </div>
      
      <div className="relative max-w-4xl mx-auto space-y-12">
        {/* Central Timeline Vertical Spine */}
        <div className="absolute left-0 md:left-1/2 top-0 h-full w-[1px] bg-glass-stroke md:-translate-x-1/2 hidden md:block" />
        
        {/* Role 1 */}
        <RoleCard 
          timeline="Jan 2025 – Present"
          title="Senior Associate Consultant"
          company="Infosys | Barclays Life Insurance"
          badgeColor="text-primary-fixed-dim"
          align="left"
          points={[
            "Leading front-end revamp for core customer journeys using React/Redux.",
            "Optimizing backend microservices with Java Spring Boot (Java 21)."
          ]}
        />

        {/* Role 2 */}
        <RoleCard 
          timeline="July 2021 – Jan 2025"
          title="System Analyst"
          company="Amdocs"
          badgeColor="text-secondary-fixed"
          align="right"
          points={[
            "Designed high-traffic apps supporting 500k+ monthly users.",
            "Reduced data discrepancies by 15% through protocol optimization.",
            "Built Python automation tools reducing 8hr tasks to 30mins."
          ]}
        />
      </div>
    </section>
  );
};

export default Experience;
