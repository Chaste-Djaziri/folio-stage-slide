interface ProjectCardProps {
  year: string;
  category: string;
  title: string;
  image: string;
  onClick: () => void;
  isActive: boolean;
}

export const ProjectCard = ({
  year,
  category,
  title,
  image,
  onClick,
  isActive,
}: ProjectCardProps) => {
  return (
    <div
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 flex-shrink-0 w-64 h-80 hover:scale-105 pointer-events-auto"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      <div className="absolute top-4 left-4">
        <span className="text-white text-sm font-light">{year}</span>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-white text-xs font-light uppercase tracking-wider mb-2">
          {category}
        </p>
        <h3 className="text-white text-2xl font-bold leading-tight">
          {title}
        </h3>
      </div>
    </div>
  );
};
