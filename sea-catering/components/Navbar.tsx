"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavLink = {
  name: string;
  href: string;
};

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Menu / Meal Plans", href: "/menu" },
    { name: "Subscription", href: "/subscription" },
    { name: "Contact Us", href: "/#contact" },
  ];

  return (
    <nav className="w-full p-6 flex justify-between items-center bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <h1 className="text-2xl font-bold text-white">
        <Link href="/">
          SEA<span className="text-cyan-400">Catering</span>
        </Link>
      </h1>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive ? "text-cyan-400" : "text-gray-300 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 p-6 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
