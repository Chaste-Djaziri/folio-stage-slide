import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MenuOverlay } from "@/components/MenuOverlay";
import { ProjectCard } from "@/components/ProjectCard";
import heroImage from "@/assets/hero-fashion.jpg";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import project4 from "@/assets/project4.jpg";
import project5 from "@/assets/project5.jpg";

const projects = [
  {
    id: 1,
    year: "2021",
    category: "DIGITAL DESIGN",
    title: "Zon Robinson",
    image: project1,
    bgImage: project1,
  },
  {
    id: 2,
    year: "2024",
    category: "DIGITAL DESIGN",
    title: "Fashion Sentence",
    image: project2,
    bgImage: project2,
  },
  {
    id: 3,
    year: "2022",
    category: "DIGITAL DESIGN",
    title: "Chania Tourism",
    image: project3,
    bgImage: project3,
  },
  {
    id: 4,
    year: "2021",
    category: "DIGITAL DESIGN",
    title: "Kiteboard action",
    image: project4,
    bgImage: project4,
  },
  {
    id: 5,
    year: "2024",
    category: "DIGITAL DESIGN",
    title: "Urban Style",
    image: project5,
    bgImage: project5,
  },
  {
    id: 6,
    year: "2023",
    category: "DIGITAL DESIGN",
    title: "Creative Vision",
    image: project1,
    bgImage: project1,
  },
  {
    id: 7,
    year: "2022",
    category: "DIGITAL DESIGN",
    title: "Modern Art",
    image: project2,
    bgImage: project2,
  },
  {
    id: 8,
    year: "2024",
    category: "DIGITAL DESIGN",
    title: "Ocean Breeze",
    image: project3,
    bgImage: project3,
  },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = projects[activeIndex];

  // Create a looped array starting from the next card after active
  const getLoopedProjects = () => {
    const nextIndex = (activeIndex + 1) % projects.length;
    const loopedArray = [];
    
    for (let i = 0; i < projects.length - 1; i++) {
      const index = (nextIndex + i) % projects.length;
      loopedArray.push({ ...projects[index], originalIndex: index });
    }
    
    return loopedArray;
  };

  const visibleProjects = getLoopedProjects();

  const handleCardClick = (originalIndex: number) => {
    setActiveIndex(originalIndex);
  };

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src={activeProject.bgImage}
          alt="background"
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-4 md:px-8 py-8">
        <h1 className="text-4xl font-bold text-white">Liko.</h1>
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-3 group"
        >
          <div className="flex flex-col gap-2">
            <span className="block w-12 h-0.5 bg-white transition-all group-hover:w-16" />
            <span className="block w-12 h-0.5 bg-white transition-all group-hover:w-16" />
          </div>
          <span className="text-white text-sm font-light">Menu</span>
        </button>
      </header>

      {/* Project Info - Positioned next to cards */}
      <div className="fixed bottom-24 left-4 md:left-8 z-20 max-w-[300px] md:max-w-[30%]">
        <div className="flex items-center gap-2 mb-4">
          <ChevronLeft className="text-white" size={24} />
          <span className="text-white text-sm uppercase tracking-wider">
            {activeProject.year}
          </span>
        </div>
        
        <div className="space-y-2">
          <p className="text-white text-sm uppercase tracking-widest font-light">
            {activeProject.category}
          </p>
          <h2 className="text-white text-4xl md:text-6xl font-bold leading-none tracking-tight">
            {activeProject.title.split(" ")[0]}
          </h2>
          <h2 className="text-white text-4xl md:text-6xl font-bold leading-none tracking-tight">
            {activeProject.title.split(" ").slice(1).join(" ")}
          </h2>
        </div>
      </div>

      {/* Cards Carousel - Hidden on mobile, visible on desktop starting at 35% */}
      <div className="hidden md:block fixed bottom-24 left-[35%] right-0 z-20">
        <div className="flex gap-6 px-8 overflow-hidden pointer-events-none">
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

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-4 md:left-8 z-30 flex items-center gap-6">
        <button
          onClick={handlePrevious}
          className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex items-center gap-4">
          <div className="w-32 h-px bg-white/30" />
          <span className="text-white text-4xl md:text-6xl font-bold">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
        </div>

        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Menu Overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};

export default Index;
