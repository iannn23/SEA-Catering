'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { type Session } from "next-auth";
import { SignOutButton } from "./SignOutButton";

type NavLink = {
  name: string;
  href: string;
};

export default function NavbarClient({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Subscription", href: "/subscription" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="w-full p-6 flex justify-between items-center bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/SEA-Catering logo.png"
          alt="SEA Catering Logo"
          width={40}
          height={40}
          className="h-10 w-10"
        />
        <span className="text-2xl font-bold text-white">
          SEA<span className="text-cyan-400">Catering</span>
        </span>
      </Link>

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
        <div className="flex items-center gap-4 pl-4 ml-4 border-l border-gray-700">
          {session?.user ? (
            <>
              <span className="text-white text-sm">Hi, {session.user.name?.split(' ')[0]}</span>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white">Login</Link>
              <Link href="/register" className="bg-cyan-500 text-white py-2 px-3 rounded-md hover:bg-cyan-600 text-sm font-medium">Register</Link>
            </>
          )}
        </div>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2 rounded-md hover:bg-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 p-6 flex flex-col gap-4 border-t border-gray-800">
          {links.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white text-lg">
              {link.name}
            </Link>
          ))}
          <div className="border-t border-gray-700 pt-4 mt-2 flex flex-col gap-4">
            {session?.user ? (
              <div className="flex items-center justify-between">
                <span className="text-white">Hi, {session.user.name}</span>
                <SignOutButton />
              </div>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-cyan-500 text-white text-center py-2 px-4 rounded-md">Login</Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-center border border-gray-600 py-2 px-4 rounded-md">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}