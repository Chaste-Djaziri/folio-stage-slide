import { X } from "lucide-react";
import { useEffect } from "react";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { number: "01", label: "HOME", href: "/" },
  { number: "02", label: "PAGES", href: "/pages" },
  { number: "03", label: "PORTFOLIO", href: "/portfolio" },
  { number: "04", label: "BLOG", href: "/blog" },
  { number: "05", label: "CONTACT", href: "/contact" },
];

const socialLinks = [
  { label: "Dribbble", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Linkedin", href: "#" },
  { label: "Behance", href: "#" },
];

export const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Left section - 60% - Navigation */}
      <div className="w-[60%] bg-[#f5f5f5] animate-slide-down flex flex-col justify-center px-16">
        <div className="absolute top-8 left-8">
          <h1 className="text-4xl font-bold">Liko.</h1>
        </div>
        
        <nav className="space-y-6">
          {menuItems.map((item) => (
            <a
              key={item.number}
              href={item.href}
              className="flex items-center gap-6 group"
            >
              <span className="text-sm text-muted-foreground">{item.number}</span>
              <span className="text-7xl font-bold tracking-tight transition-all group-hover:translate-x-4">
                {item.label}
              </span>
              <span className="text-4xl text-muted-foreground opacity-0 group-hover:opacity-100 transition-all">
                +
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* Right section - 40% - Contact & Social */}
      <div className="w-[40%] bg-background text-foreground animate-slide-up flex flex-col justify-between py-16 px-12">
        <button
          onClick={onClose}
          className="self-end hover:rotate-90 transition-transform duration-300"
        >
          <X size={32} />
        </button>

        <div className="space-y-16">
          <div className="space-y-4 text-right">
            <p className="text-xl">+61404093 954</p>
            <p className="text-xl">hello contact@diego.com</p>
            <p className="text-sm text-muted-foreground mt-6">
              If in doubt. reach out.
            </p>
          </div>

          <div className="space-y-4 text-right">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-xl hover:text-muted-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
