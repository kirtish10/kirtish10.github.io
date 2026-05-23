import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';

interface ProjectsProps {
  onSelectTech?: (tech: string | null) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectTech }) => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  // Dynamically collect all unique technologies across projects to populate filters
  const allTechs = ['ALL', ...Array.from(new Set(projectsData.flatMap(p => p.technologies)))];

  const handleFilterClick = (tech: string) => {
    setActiveFilter(tech);
    if (onSelectTech) {
      onSelectTech(tech === 'ALL' ? null : tech);
    }
  };

  const filteredProjects = activeFilter === 'ALL' 
    ? projectsData 
    : projectsData.filter(p => p.technologies.includes(activeFilter));

  // We assign grid layouts matching your high-fidelity prototype
  const getGridSpan = (id: string) => {
    switch (id) {
      case 'health-tracking-vest':
        return 'md:col-span-8';
      case 'utm-drone-system':
        return 'md:col-span-4';
      case 'smart-attendance':
        return 'md:col-span-12';
      default:
        return 'md:col-span-6';
    }
  };

  return (
    <section className="section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto reveal animate-fade-in" id="projects">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 select-none">
        <div>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Selected Works</h2>
          <p className="text-on-surface-variant mt-1">Architectures designed for enterprise scale and precision.</p>
        </div>

        {/* Dynamic Interactive Filter Badges */}
        <div className="flex flex-wrap gap-2 max-w-xl">
          {allTechs.map((tech) => (
            <button
              key={tech}
              onClick={() => handleFilterClick(tech)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold font-label-caps tracking-wider transition-all active:scale-95 cursor-pointer ${
                activeFilter === tech 
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_12px_rgba(95,139,255,0.4)]' 
                  : 'glass text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Dynamic Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {filteredProjects.map((project) => {
          const span = getGridSpan(project.id);
          
          if (project.id === 'health-tracking-vest') {
            return (
              <div 
                key={project.id}
                className={`${span} group relative overflow-hidden rounded-3xl glowing-card p-1 interactive-element project-card border border-glass-stroke`}
              >
                <div className="h-[400px] w-full relative rounded-[22px] overflow-hidden">
                  <img 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    src={project.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent z-10" />
                  <div className="absolute bottom-8 left-8 right-8 z-20">
                    <div className="flex gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="bg-secondary-container/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-secondary-fixed">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-headline-md text-on-surface text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-on-surface-variant max-w-xl text-sm line-clamp-2">{project.tagline}</p>
                    <Link 
                      to={`/project/${project.id}`}
                      className="inline-flex items-center gap-2 mt-4 text-primary-fixed-dim hover:text-primary transition-colors font-bold text-sm"
                    >
                      Case Study 
                      <span className="material-symbols-outlined select-none text-base">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          } else if (project.id === 'utm-drone-system') {
            return (
              <div 
                key={project.id}
                className={`${span} group glowing-card rounded-3xl p-8 flex flex-col justify-between transition-all interactive-element project-card border border-glass-stroke`}
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed-dim/20 flex items-center justify-center text-primary-fixed-dim mb-6">
                    <span className="material-symbols-outlined select-none">flight_takeoff</span>
                  </div>
                  <h3 className="font-headline-md text-on-surface text-xl font-bold mb-4">{project.title}</h3>
                  <p className="text-on-surface-variant text-sm mb-6">{project.tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full glass text-[10px] uppercase tracking-wider text-on-surface-variant font-label-caps">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <Link 
                  to={`/project/${project.id}`}
                  className="mt-8 flex items-center gap-2 text-primary-fixed-dim group-hover:gap-4 transition-all relative z-10 font-bold"
                >
                  Case Study 
                  <span className="material-symbols-outlined select-none text-base">arrow_forward</span>
                </Link>
              </div>
            );
          } else {
            // Smart India Hackathon Project Layout
            return (
              <div 
                key={project.id}
                className={`${span} glowing-card rounded-3xl p-8 flex flex-col md:flex-row items-center gap-12 group interactive-element project-card border border-glass-stroke`}
              >
                <div className="md:w-1/2 w-full relative z-10 overflow-hidden rounded-2xl">
                  <img 
                    alt={project.title} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700 rounded-2xl" 
                    src={project.image}
                  />
                </div>
                <div className="md:w-1/2 w-full relative z-10">
                  <span className="text-accent-lime text-label-caps font-bold">Smart India Hackathon Winner</span>
                  <h3 className="font-headline-md text-on-surface text-2xl font-bold mt-2 mb-4">{project.title}</h3>
                  <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">{project.tagline} {project.description.slice(0, 80)}...</p>
                  <div className="flex gap-4 items-center mb-6">
                    <span className="material-symbols-outlined text-primary-fixed-dim select-none" title="Verified Security">verified</span>
                    <span className="material-symbols-outlined text-primary-fixed-dim select-none" title="Biometric AI Face Engine">face</span>
                    <div className="flex flex-wrap gap-1.5 ml-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded glass text-[9px] uppercase tracking-wider text-on-surface-variant font-label-caps">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link 
                    to={`/project/${project.id}`}
                    className="inline-flex items-center gap-2 text-primary-fixed-dim group-hover:gap-4 transition-all font-bold"
                  >
                    Case Study 
                    <span className="material-symbols-outlined select-none text-base">arrow_forward</span>
                  </Link>
                </div>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};

export default Projects;
