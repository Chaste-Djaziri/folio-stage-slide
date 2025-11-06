import { useMemo, useState } from "react";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import project4 from "@/assets/project4.jpg";
import project5 from "@/assets/project5.jpg";

const showcaseItems = [
  {
    id: "digital-thinker",
    number: "01",
    title: "Digital Thinker",
    image: project1,
  },
  {
    id: "magazine-cover",
    number: "02",
    title: "Magazine Cover",
    image: project2,
  },
  {
    id: "twin-tigers",
    number: "03",
    title: "Twin Tigers",
    image: project3,
  },
  {
    id: "squarespace-brand",
    number: "04",
    title: "Squarespace Brand",
    image: project4,
  },
  {
    id: "markus",
    number: "05",
    title: "Markus Erikkson",
    image: project5,
  },
  {
    id: "twin-tigers-06",
    number: "06",
    title: "Twin Tigers",
    image: project2,
  },
];

export const HorizontalShowcase = () => {
  const [hoveredId, setHoveredId] = useState(showcaseItems[0].id);

  const activeItem = useMemo(() => {
    return (
      showcaseItems.find((item) => item.id === hoveredId) ??
      showcaseItems[0]
    );
  }, [hoveredId]);

  return (
    <section className="relative flex h-full w-full flex-shrink-0 bg-white text-neutral-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,#f8f8f8,transparent_55%)]" />
      <aside className="hidden w-20 flex-col items-center justify-between bg-neutral-900 py-12 text-white md:flex">
        <div className="[writing-mode:vertical-rl] rotate-180 text-2xl font-semibold">
          Liko.
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="block h-0.5 w-8 bg-white" />
          <span className="block h-0.5 w-8 bg-white" />
        </div>
        <button className="rounded-full border border-white/40 px-3 py-2 text-xs uppercase tracking-[0.4em] transition-colors hover:bg-white hover:text-neutral-900">
          <span className="block rotate-180 [writing-mode:vertical-rl]">
            Let&apos;s Talk
          </span>
        </button>
      </aside>

      <div className="relative flex flex-1 items-center justify-center px-8 py-16 md:px-20">
        <div
          className="relative flex h-full w-full items-stretch gap-8 md:gap-12"
          onMouseLeave={() => setHoveredId(showcaseItems[0].id)}
        >
          <div className="flex w-[220px] min-w-[200px] flex-col justify-between border-l border-neutral-200 pl-10">
            <span className="text-6xl font-light text-neutral-400">*</span>
            <div>
              <h3 className="text-3xl font-semibold">
                Unique &amp; Creative Studio
              </h3>
              <p className="mt-4 max-w-[220px] text-sm text-neutral-500">
                The list is far from exhaustive—we all have our own
                predictions and predilections.
              </p>
              <button className="mt-8 rounded-full border border-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition-colors hover:bg-neutral-900 hover:text-white">
                View More
              </button>
            </div>
          </div>

          <div className="relative flex flex-1 items-center justify-between overflow-hidden">
            <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <div
                key={activeItem.id}
                className="h-48 w-48 overflow-hidden rounded-full border border-neutral-200 shadow-lg transition-all duration-500 ease-out md:h-64 md:w-64"
              >
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="mt-6 text-lg font-semibold uppercase tracking-[0.6em] text-neutral-300">
                {activeItem.title}
              </span>
            </div>

            <div className="flex h-full w-full justify-evenly">
              {showcaseItems.map((item) => {
                const isActive = item.id === hoveredId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setHoveredId(item.id)}
                    onFocus={() => setHoveredId(item.id)}
                    className={`relative flex h-full flex-col items-center justify-center border-l border-neutral-200 px-4 transition-all duration-300 ease-out focus:outline-none md:px-6 ${
                      isActive ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    <span className="mb-6 text-[10px] uppercase tracking-[0.5em] text-neutral-500">
                      {item.number}
                    </span>
                    <span
                      className={`text-4xl font-bold uppercase tracking-tight text-neutral-900 md:text-5xl [writing-mode:vertical-rl] [text-orientation:mixed] ${
                        isActive ? "" : "text-neutral-400"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
