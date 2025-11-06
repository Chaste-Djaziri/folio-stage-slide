import { X } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [isClosing, setIsClosing] = useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 500);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:flex-row flex-col">
      {/* Left section - 60% on desktop, full width on mobile - Navigation */}
      <div className={`md:w-[60%] w-full bg-[#f5f5f5] ${isClosing ? "animate-slide-up" : "animate-slide-down"} flex flex-col justify-center px-8 md:px-16`}>
        <div className="absolute top-8 left-8 md:left-8">
          <h1 className="text-4xl font-bold text-foreground">Liko.</h1>
        </div>

        <button
          onClick={handleClose}
          className="md:hidden absolute top-8 right-8 hover:rotate-90 transition-transform duration-300 text-gray-900"
        >
          <X size={32} />
        </button>

        <nav className="space-y-4 md:space-y-6">
          {menuItems.map((item) => (
            <a
              key={item.number}
              href={item.href}
              className="flex items-center gap-4 md:gap-6 group"
            >
              <span className="text-sm text-gray-500">{item.number}</span>
              <span className="text-4xl md:text-7xl font-bold tracking-tight transition-all group-hover:translate-x-4 text-gray-900">
                {item.label}
              </span>
              <span className="text-2xl md:text-4xl text-gray-500 opacity-0 group-hover:opacity-100 transition-all">
                +
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* Right section - 40% on desktop, hidden on mobile - Contact & Social */}
      <div className={`hidden md:flex md:w-[40%] bg-gray-900 text-white ${isClosing ? "animate-slide-down" : "animate-slide-up"} flex-col justify-between py-16 px-12`}>
        <button
          onClick={handleClose}
          className="self-end hover:rotate-90 transition-transform duration-300 text-white"
        >
          <X size={32} />
        </button>

        <div className="space-y-16">
          <div className="space-y-4 text-right">
            <p className="text-xl text-white">+61404093 954</p>
            <p className="text-xl text-white">hello contact@diego.com</p>
            <p className="text-sm text-gray-400 mt-6">
              If in doubt. reach out.
            </p>
          </div>

          <div className="space-y-4 text-right">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-xl text-white hover:text-gray-400 transition-colors"
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
