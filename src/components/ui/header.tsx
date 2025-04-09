"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-white">
            <span className="text-purple-500">Chain</span>Camp
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#o-konferenci">O konferenci</NavLink>
          <NavLink href="#speakeri">Speakeři</NavLink>
          <NavLink href="#sponzorstvi">Sponzorství</NavLink>
          <NavLink href="#caste-dotazy">FAQ</NavLink>
          <Link
            href="#vstupenky"
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition-colors"
          >
            Vstupenky
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLink
              href="#o-konferenci"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              O konferenci
            </NavLink>
            <NavLink
              href="#speakeri"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Speakeři
            </NavLink>
            <NavLink
              href="#sponzorstvi"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sponzorství
            </NavLink>
            <NavLink
              href="#caste-dotazy"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </NavLink>
            <Link
              href="#vstupenky"
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition-colors text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Vstupenky
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className="text-white hover:text-purple-400 transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
