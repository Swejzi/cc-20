"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-purple-500/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">
                <span className="text-purple-500">Chain</span>Camp
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-gray-300 hover:text-purple-400 transition-colors">
              O konferenci
            </Link>
            <Link href="#speakers" className="text-gray-300 hover:text-purple-400 transition-colors">
              Speakeři
            </Link>
            <Link href="#schedule" className="text-gray-300 hover:text-purple-400 transition-colors">
              Program
            </Link>
            <Link href="#sponsors" className="text-gray-300 hover:text-purple-400 transition-colors">
              Sponzoři
            </Link>
            <Link href="#venue" className="text-gray-300 hover:text-purple-400 transition-colors">
              Místo
            </Link>
            <Link href="#faq" className="text-gray-300 hover:text-purple-400 transition-colors">
              FAQ
            </Link>
            <Link 
              href="#tickets" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors"
            >
              Vstupenky
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg border-b border-purple-500/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="#about" 
              className="block px-3 py-2 text-gray-300 hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              O konferenci
            </Link>
            <Link 
              href="#speakers" 
              className="block px-3 py-2 text-gray-300 hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Speakeři
            </Link>
            <Link 
              href="#schedule" 
              className="block px-3 py-2 text-gray-300 hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Program
            </Link>
            <Link 
              href="#sponsors" 
              className="block px-3 py-2 text-gray-300 hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sponzoři
            </Link>
            <Link 
              href="#venue" 
              className="block px-3 py-2 text-gray-300 hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Místo
            </Link>
            <Link 
              href="#faq" 
              className="block px-3 py-2 text-gray-300 hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              href="#tickets" 
              className="block px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors text-center mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Vstupenky
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
