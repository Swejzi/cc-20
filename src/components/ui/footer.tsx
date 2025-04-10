"use client";

import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your newsletter service
    console.log("Email submitted:", email);
    setIsSubmitted(true);
    setEmail("");

    // Reset the submitted state after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <footer className="py-16 bg-black/40 backdrop-blur-md relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="col-span-full lg:col-span-1">
            <div className="mb-6">
              <span className="text-2xl font-bold text-white next-block-heading">
                <span className="text-[#530b6e]">CHAIN</span><span className="text-[#30ff97]">CAMP</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              7. ročník legendární akce bitcoinové komunity
            </p>
            <p className="text-gray-300 mb-6">
              20. - 21. září 2026<br />
              Aula VŠB, Ostrava - Poruba
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Kontaktujte nás</h3>
            <a
              href="mailto:info@chaincamp.cz"
              className="text-[#530b6e] hover:text-[#30ff97] transition-colors"
            >
              info@chaincamp.cz
            </a>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Chceš vědět o všem jako první?</h3>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tvůj e-mail"
                className="bg-black border border-[#530b6e] rounded-none px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#530b6e]/50 w-full"
                required
              />
              <button
                type="submit"
                className="bg-[#530b6e] hover:bg-[#3d0852] text-[#30ff97] px-4 py-2 rounded-none border border-[#30ff97] transition-colors"
              >
                {isSubmitted ? "✓" : "→"}
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Na sockách Ti nic neuteče, sleduj!</h3>
            <div className="flex space-x-4">
              <SocialLink type="twitter" href="https://x.com/ChainCampCZ" />
              <SocialLink type="youtube" href="https://www.youtube.com/@ChainCamp" />
              <SocialLink type="nostr" href="https://primal.net/p/npub1fc6nyvwm8y3enmy26rekaer8p5q8xhy9ujx06sdngk7d7k2258qs52zyq0" />
              <SocialLink type="instagram" href="https://www.instagram.com/chaincamp.cz/" />
              <SocialLink type="facebook" href="https://www.facebook.com/chaincampcz" />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#530b6e]/30 text-center text-gray-500 text-sm">
          <p>ChainCamp © 2026 | ChainCamp s.r.o. | IČ: 224 87 859</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="/obchodni-podminky" className="hover:text-[#30ff97] transition-colors">
              Obchodní podmínky
            </Link>
            <Link href="/ochrana-soukromi" className="hover:text-[#30ff97] transition-colors">
              Ochrana soukromí
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ type, href }: { type: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 next-block-border-purple bg-black flex items-center justify-center hover:border-[#30ff97] transition-colors"
      title={type.charAt(0).toUpperCase() + type.slice(1)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
        />
      </svg>
    </a>
  );
}
