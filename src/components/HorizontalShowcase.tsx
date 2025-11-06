import { useMemo, useRef, useState } from "react";
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

interface HorizontalShowcaseProps {
  onOpenMenu: () => void;
}

export const HorizontalShowcase = ({
  onOpenMenu,
}: HorizontalShowcaseProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [previewLeft, setPreviewLeft] = useState<number | null>(null);
  const [previewTop, setPreviewTop] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const columnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeItem = useMemo(() => {
    if (!hoveredId) return null;
    return showcaseItems.find((item) => item.id === hoveredId) ?? null;
  }, [hoveredId]);

  const positionPreview = (id: string) => {
    const column = columnRefs.current[id];
    const track = trackRef.current;
    if (!column || !track) return;

    const columnRect = column.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const relativeLeft =
      columnRect.left - trackRect.left + columnRect.width / 2;
    const relativeTop =
      columnRect.top -
      trackRect.top +
      columnRect.height * 0.28;

    setPreviewLeft(relativeLeft);
    setPreviewTop(relativeTop);
  };

  const handleEnter = (id: string) => {
    positionPreview(id);
    setHoveredId(id);
  };

  const handleLeave = () => {
    setHoveredId(null);
    setPreviewLeft(null);
  };

  return (
    <section className="relative flex h-full w-full flex-shrink-0 bg-white text-neutral-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,#f7f7f7,transparent_60%)]" />
      <aside className="hidden w-24 flex-shrink-0 flex-col items-center justify-between bg-[#1e1e1e] py-12 text-white md:flex">
        <div className="[writing-mode:vertical-rl] rotate-180 text-2xl font-semibold tracking-[0.6em]">
          Liko.
        </div>
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white/10 px-3 py-4 transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Open menu"
        >
          <span className="block h-0.5 w-8 rounded bg-white" />
          <span className="block h-0.5 w-8 rounded bg-white" />
        </button>
        <button className="rounded-[5px] border border-white/60 bg-white px-4 py-3 text-[10px] font-bold uppercase tracking-[0.6em] text-black transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          <span className="block rotate-180 [writing-mode:vertical-rl]">
            Let&apos;s Talk
          </span>
        </button>
      </aside>

      <div
        ref={trackRef}
        className="relative flex flex-1 items-center justify-center px-8 py-16 md:px-20"
      >
        <div
          className="relative flex h-full w-full items-stretch gap-10 md:gap-16"
          onMouseLeave={handleLeave}
        >
          <div className="flex w-[240px] min-w-[220px] flex-col justify-between border-l border-neutral-200 pl-10">
            <span className="text-6xl font-light text-neutral-400">*</span>
            <div>
              <h3 className="text-3xl font-semibold uppercase">
                Unique &amp; Creative Studio
              </h3>
              <p className="mt-4 max-w-[230px] text-sm text-neutral-500">
                The list is far from exhaustive—we all have our own predictions
                and predilections.
              </p>
              <button className="mt-10 w-fit rounded-full border border-neutral-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] transition-colors hover:bg-neutral-900 hover:text-white">
                View More
              </button>
            </div>
          </div>

          <div className="relative flex flex-1 items-stretch justify-between">
            <div
              className="pointer-events-none absolute flex flex-col items-center transition-all duration-500 ease-out"
              style={{
                left:
                  previewLeft !== null ? `${previewLeft}px` : "50%",
                top:
                  previewTop !== null
                    ? `${previewTop}px`
                    : "40%",
                opacity: activeItem ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${activeItem ? 1 : 0.85})`,
              }}
            >
              {activeItem && (
                <>
                  <div className="h-56 w-56 overflow-hidden rounded-full border border-neutral-200 shadow-xl transition-all duration-500 ease-out md:h-64 md:w-64">
                    <img
                      src={activeItem.image}
                      alt={activeItem.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="mt-8 text-base font-semibold uppercase tracking-[0.6em] text-neutral-300">
                    {activeItem.title}
                  </span>
                </>
              )}
            </div>

            <div className="flex h-full w-full justify-evenly">
              {showcaseItems.map((item) => {
                const isActive = item.id === hoveredId;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      columnRefs.current[item.id] = el;
                    }}
                    type="button"
                    onMouseEnter={() => handleEnter(item.id)}
                    onFocus={() => handleEnter(item.id)}
                    className={`relative flex h-full flex-col items-center justify-center border-l border-neutral-200 px-6 transition-all duration-300 ease-out focus:outline-none ${
                      isActive ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    <span className="mb-6 text-[10px] uppercase tracking-[0.5em] text-neutral-400">
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
