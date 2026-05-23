import React from 'react';

interface SkillBarProps {
  name: string;
  percent: number;
  percentageText: string;
  subtitle: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percent, percentageText, subtitle }) => {
  return (
    <div className="glass p-6 rounded-2xl space-y-4 hover:bg-surface-container-high transition-all interactive-element border border-glass-stroke">
      <div className="flex justify-between items-center select-none">
        <span className="font-bold text-on-surface">{name}</span>
        <span className="text-primary-fixed-dim text-sm font-semibold">{percentageText}</span>
      </div>
      
      <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden relative">
        <div 
          className="h-full bg-gradient-to-r from-primary-fixed-dim to-secondary-fixed relative shimmer-bar rounded-full" 
          style={{ width: `${percent}%` }}
        />
      </div>
      
      <p className="text-xs text-on-surface-variant font-medium">{subtitle}</p>
    </div>
  );
};

export const Skills: React.FC = () => {
  return (
    <section className="section-gap bg-surface-container-low/30 py-24 reveal" id="skills">
      <div className="px-margin-mobile md:px-gutter max-w-container-max mx-auto">
        <div className="text-center mb-16 select-none">
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Core Stack</h2>
          <p className="text-on-surface-variant mt-2">Proficiency validated by 4.5+ years of production-level engineering.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <SkillBar 
            name="Java 8/11/17"
            percent={95}
            percentageText="95%"
            subtitle="Spring Boot, Data JPA, Security, Java 21"
          />
          <SkillBar 
            name="React / Redux"
            percent={90}
            percentageText="90%"
            subtitle="TypeScript, Hooks, Context API, Toolkit"
          />
          <SkillBar 
            name="DevOps & Cloud"
            percent={85}
            percentageText="85%"
            subtitle="AWS, Docker, Jenkins Pipelines"
          />
          <SkillBar 
            name="Architecture"
            percent={88}
            percentageText="88%"
            subtitle="Microservices, REST API Gates, Kafka Brokers"
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
