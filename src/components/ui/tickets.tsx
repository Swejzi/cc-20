"use client";

import { useEffect, useState } from "react";

export function Tickets() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("vstupenky");
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="vstupenky"
      className="py-20 bg-black/30 backdrop-blur-sm relative"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Vstupenky
        </h2>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <TicketCard
              title="Early Bird"
              price="1 490 Kč"
              features={[
                "Vstup na všechny přednášky",
                "Přístup k workshopům",
                "Občerstvení a nápoje",
                "Konferenční materiály",
                "Afterparty"
              ]}
              highlight="Omezený počet vstupenek"
              available={false}
              isVisible={isVisible}
              delay={0}
            />

            <TicketCard
              title="Standard"
              price="2 490 Kč"
              features={[
                "Vstup na všechny přednášky",
                "Přístup k workshopům",
                "Občerstvení a nápoje",
                "Konferenční materiály",
                "Afterparty",
                "Tričko konference"
              ]}
              highlight="Nejpopulárnější volba"
              available={true}
              isVisible={isVisible}
              delay={200}
              recommended={true}
            />

            <TicketCard
              title="VIP"
              price="4 990 Kč"
              features={[
                "Vstup na všechny přednášky",
                "Prioritní přístup k workshopům",
                "Premium občerstvení a nápoje",
                "Konferenční materiály",
                "Afterparty",
                "Tričko konference",
                "Exkluzivní večeře se speakery",
                "Speciální VIP dárky"
              ]}
              highlight="Limitovaná edice"
              available={true}
              isVisible={isVisible}
              delay={400}
            />
          </div>

          <div
            className={`mt-12 text-center transition-all duration-1000 transform delay-600 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-gray-300 mb-4">
              Všechny ceny jsou včetně DPH. Vstupenky jsou přenosné a nevratné.
            </p>
            <p className="text-purple-400">
              Pro skupinové objednávky (5+ vstupenek) nás kontaktujte na <a href="mailto:info@chaincamp.cz" className="underline hover:text-purple-300">info@chaincamp.cz</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TicketCard({
  title,
  price,
  features,
  highlight,
  available,
  isVisible,
  delay,
  recommended = false
}: {
  title: string;
  price: string;
  features: string[];
  highlight: string;
  available: boolean;
  isVisible: boolean;
  delay: number;
  recommended?: boolean;
}) {
  return (
    <div
      className={`bg-purple-900/20 backdrop-blur-sm rounded-xl border ${
        recommended ? 'border-purple-500' : 'border-purple-500/20'
      } overflow-hidden transition-all duration-1000 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${recommended ? 'relative z-10 md:-mt-4 md:mb-4' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {recommended && (
        <div className="bg-purple-600 text-white text-center py-1 text-sm font-medium">
          Doporučujeme
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 text-center">{title}</h3>
        <p className="text-purple-400 text-sm mb-4 text-center">{highlight}</p>

        <div className="text-center mb-6">
          <span className="text-3xl font-bold text-white">{price}</span>
        </div>

        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className={`w-full py-3 rounded-full text-center font-medium transition-colors ${
            available
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!available}
        >
          {available ? "Koupit vstupenku" : "Vyprodáno"}
        </button>
      </div>
    </div>
  );
}
