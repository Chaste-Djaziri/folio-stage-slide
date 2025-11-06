import { useEffect, useRef, useState } from "react";
import { MenuOverlay } from "@/components/MenuOverlay";
import { HeroSection, Project } from "@/components/HeroSection";
import { HorizontalShowcase } from "@/components/HorizontalShowcase";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import project4 from "@/assets/project4.jpg";
import project5 from "@/assets/project5.jpg";

const projects: Project[] = [
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      const { deltaY } = event;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;

      const nextScroll = container.scrollLeft + deltaY;

      if (nextScroll <= 0) {
        container.scrollLeft = 0;
        return;
      }

      if (nextScroll >= maxScroll) {
        container.scrollLeft = maxScroll;
        return;
      }

      container.scrollLeft = nextScroll;
      event.preventDefault();
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartRef.current === null) return;
      const currentY = event.touches[0]?.clientY ?? touchStartRef.current;
      const deltaY = touchStartRef.current - currentY;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;

      const nextScroll = container.scrollLeft + deltaY;

      container.scrollLeft = Math.min(
        Math.max(nextScroll, 0),
        maxScroll,
      );
      event.preventDefault();
      touchStartRef.current = currentY;
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <div
        ref={containerRef}
        className="no-scrollbar flex h-screen w-screen overflow-x-auto overflow-y-hidden"
      >
        <div className="flex h-screen w-screen flex-shrink-0">
          <HeroSection
            projects={projects}
            onOpenMenu={() => setMenuOpen(true)}
          />
        </div>
        <div className="flex h-screen w-screen flex-shrink-0">
          <HorizontalShowcase onOpenMenu={() => setMenuOpen(true)} />
        </div>
      </div>
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};

export default Index;
