"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      id="uvod"
      className="min-h-screen flex items-center justify-center relative pt-20 pb-10"
    >
      <div
        className={`container mx-auto px-4 text-center transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="mb-6 inline-block">
          <span className="text-white bg-purple-600 px-4 py-1 rounded-full text-sm font-medium">
            20. - 21. září 2026
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="text-purple-500">Chain</span>Camp 2026
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          7. ročník legendární akce bitcoinové komunity
        </p>
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Aula VŠB, Ostrava - Poruba
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#vstupenky"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors"
          >
            Chci vstupenku!
          </Link>
          <Link
            href="#o-konferenci"
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors"
          >
            Více informací
          </Link>
        </div>

        <div className="mt-16 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mx-auto text-purple-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
