"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function Sponsors() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("sponzorstvi");
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
      id="sponzorstvi"
      className="py-20 bg-black/30 backdrop-blur-sm relative"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Sponzoři
        </h2>

        <div
          className={`bg-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 mb-12 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h3 className="text-2xl font-bold text-purple-400 mb-6 text-center">
            Staňte se partnerem legendární bitcoinové akce
          </h3>

          <p className="text-gray-300 mb-4 max-w-3xl mx-auto text-center">
            Zapojte se do diskuse s pokročilými uživateli vašich služeb a produktů, získejte cennou zpětnou vazbu a posuňte svůj business dál. 7. ročník ChainCampu není jen největší bitcoinová akce v Česku a na Slovensku – je to jedinečné místo, kde můžete oslovit zkušené bitcoinery a proměnit je ve své ambasadory, přispěvatele nebo dokonce nové kolegy.
          </p>

          <div className="text-center mt-8">
            <Link
              href="mailto:info@chaincamp.cz"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg font-medium transition-colors inline-block"
            >
              Stát se partnerem
            </Link>
          </div>
        </div>

        <div
          className={`transition-all duration-1000 transform delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h3 className="text-2xl font-bold text-purple-400 mb-6 text-center">
            Napsali o nás
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MediaMention
              source="Bitcoinvkapse.cz"
              title="Jaký byl ChainCamp 2023"
              link="https://bitcoinvkapse.cz/chaincamp-2023/"
            />

            <MediaMention
              source="Moravskoslezský Deník"
              title="Z Ostravy se stala kryptobašta. Na největší ChainCamp v ČR dorazily stovky lidí"
              link="https://moravskoslezsky.denik.cz/zpravy_region/ostrava-bitcoinova-konference-chaincamp2023.html"
            />

            <MediaMention
              source="Alza.cz"
              title="Někteří neváhali jet stovky kilometrů, aby se stali součástí historie!"
              link="https://www.alza.cz/chaincamp-2024-reportaz"
            />

            <MediaMention
              source="Bitcoinvkapse.cz"
              title="Jaký byl ChainCamp 2022"
              link="https://bitcoinvkapse.cz/jaky-byl-chaincamp-2022/"
            />

            <MediaMention
              source="Roklen24.cz"
              title="Česko je kryptoměnovou velmocí. Lidé by měli do tohoto světa vkročit bezpečně tou správnou nohou"
              link="https://roklen24.cz/cesko-je-kryptomenovou-velmoci-lide-by-meli-do-tohoto-sveta-vkrocit-bezpecne-tou-spravnou-nohou/"
            />

            <MediaMention
              source="Polar.cz"
              title="V Ostravě proběhla největší krypto konference v Česku"
              link="https://polar.cz/zpravy/moravskoslezsky-kraj/cely-ms-kraj/11000027587/v-ostrave-probehla-nejvetsi-krypto-konference-v-cesku-o-druhy-rocnik-chaincampu-byl-obrovsky-zajem"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MediaMention({
  source,
  title,
  link
}: {
  source: string;
  title: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:bg-purple-800/30 transition-colors block"
    >
      <p className="text-purple-400 font-medium mb-2">{source}</p>
      <h4 className="text-white text-lg">{title}</h4>
    </a>
  );
}
