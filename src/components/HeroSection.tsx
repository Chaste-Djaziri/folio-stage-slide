import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";

export interface Project {
  id: number;
  year: string;
  category: string;
  title: string;
  image: string;
  bgImage: string;
}

interface HeroSectionProps {
  projects: Project[];
  onOpenMenu: () => void;
}

export const HeroSection = ({ projects, onOpenMenu }: HeroSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const totalProjects = projects.length;
  const normalizedIndex =
    totalProjects > 0 ? activeIndex % totalProjects : 0;

  const activeProject =
    totalProjects > 0 ? projects[normalizedIndex] : undefined;

  const visibleProjects = useMemo(() => {
    if (totalProjects <= 1) return [];

    const nextIndex = (normalizedIndex + 1) % totalProjects;
    const loopedArray = [];

    for (let i = 0; i < totalProjects - 1; i += 1) {
      const index = (nextIndex + i) % totalProjects;
      loopedArray.push({ ...projects[index], originalIndex: index });
    }

    return loopedArray;
  }, [normalizedIndex, projects, totalProjects]);

  const handleCardClick = (originalIndex: number) => {
    setActiveIndex(originalIndex);
  };

  const handlePrevious = () => {
    if (totalProjects === 0) return;
    setActiveIndex((prev) => (prev === 0 ? totalProjects - 1 : prev - 1));
  };

  const handleNext = () => {
    if (totalProjects === 0) return;
    setActiveIndex((prev) =>
      prev === totalProjects - 1 ? 0 : prev + 1,
    );
  };

  if (!activeProject) {
    return null;
  }

  return (
    <section className="relative h-full w-full flex-shrink-0 overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <img
          src={activeProject.bgImage}
          alt="background"
          className="h-full w-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-8 md:px-8">
        <h1 className="text-4xl font-bold text-white">Liko.</h1>
        <button
          onClick={onOpenMenu}
          className="group flex items-center gap-3"
        >
          <div className="flex flex-col gap-2">
            <span className="block h-0.5 w-12 bg-white transition-all group-hover:w-16" />
            <span className="block h-0.5 w-12 bg-white transition-all group-hover:w-16" />
          </div>
          <span className="text-sm font-light text-white">Menu</span>
        </button>
      </header>

      <div className="absolute bottom-40 left-8 z-20 max-w-[300px] md:bottom-56 md:left-[10%] md:max-w-[30%]">
        <div className="mb-6 flex items-center gap-3">
          <ChevronLeft className="text-white" size={28} />
          <span className="text-lg font-light uppercase tracking-wider text-white">
            {activeProject.year}
          </span>
        </div>

        <div className="space-y-3">
          <p className="text-base font-light uppercase tracking-widest text-white">
            {activeProject.category}
          </p>
          <h2 className="text-5xl font-bold leading-none tracking-tight text-white md:text-7xl">
            {activeProject.title.split(" ")[0]}
          </h2>
          <h2 className="text-5xl font-bold leading-none tracking-tight text-white md:text-7xl">
            {activeProject.title.split(" ").slice(1).join(" ")}
          </h2>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-56 left-[35%] right-0 z-20">
        <div
          key={activeIndex}
          className="pointer-events-none flex gap-6 px-8 animate-card-switch"
        >
          {visibleProjects.map((project) => (
            <ProjectCard
              key={`${project.id}-${project.originalIndex}`}
              year={project.year}
              category={project.category}
              title={project.title}
              image={project.image}
              onClick={() => handleCardClick(project.originalIndex)}
              isActive={false}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-32 left-[35%] right-[5%] z-30 hidden items-center md:flex">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex flex-1 items-center">
          <div className="mx-6 h-px w-full bg-white/30" />
        </div>

        <div className="flex items-end gap-2 text-white">
          <span className="leading-none text-6xl font-bold">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-sm uppercase tracking-[0.3em] text-white/50">
            / {String(totalProjects).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-4 z-30 flex items-center gap-2 md:hidden">
        <button
          onClick={handlePrevious}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="absolute bottom-8 right-4 z-30 md:hidden">
        <span className="text-4xl font-bold text-white">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
};
