"use client";

import { useEffect, useState } from "react";

export function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("o-konferenci");
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
      id="o-konferenci"
      className="py-20 bg-black/30 backdrop-blur-sm relative"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          O konferenci
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div
            className={`bg-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 transition-all duration-1000 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h3 className="text-2xl font-bold text-purple-400 mb-4">
              CC26: NEXT BLOCK
            </h3>
            <p className="text-gray-300 mb-4">
              Buďte u toho! <strong>7. ročník legendární bitcoinové akce</strong> přináší ještě víc – špičkové spíkry, praktické workshopy a nezaměnitelnou atmosféru české a slovenské BTC komunity.
            </p>
            <p className="text-gray-300">
              Připojte se k největší bitcoinové konferenci v regionu a buďte součástí revoluce, která mění svět financí.
            </p>
          </div>

          <div
            className={`bg-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 transition-all duration-1000 transform delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h3 className="text-2xl font-bold text-purple-400 mb-4">
              Workshopy pro všechny!
            </h3>
            <p className="text-gray-300 mb-4">
              Workshopy byly vždy klíčovou součástí ChainCampu a letos tomu nebude jinak. Čtyři sály na VŠB nabídnou <strong>dostatek prostoru pro všechny</strong>, kteří chtějí získat nové dovednosti, prohloubit své znalosti a ponořit se hlouběji do bitcoinové nory.
            </p>
            <p className="text-gray-300">
              Od začátečníků až po pokročilé, každý si najde workshop podle své úrovně a zájmu.
            </p>
          </div>
        </div>

        <div
          className={`mt-16 bg-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 transition-all duration-1000 transform delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h3 className="text-2xl font-bold text-purple-400 mb-6 text-center">
            Na ChainCampu už přednášeli
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <SpeakerBubble name="Marek „Slush" Palatinus" />
            <SpeakerBubble name="Jakub „Kicom" Vejmola" />
            <SpeakerBubble name="Josef Tětek" />
            <SpeakerBubble name="Alex Pilař" />
            <SpeakerBubble name="Dušan Matuška" />
            <SpeakerBubble name="Lea Petrášová" />
            <SpeakerBubble name="Kristian Csepcsar" />
            <SpeakerBubble name="Juraj Bednár" />
            <SpeakerBubble name="Dominik Stroukal" />
            <SpeakerBubble name="Pavol „Stick" Rusnák" />
            <SpeakerBubble name="Ondřej „Bratříček" Tesárek" />
            <SpeakerBubble name="...a 100+ dalších" />
          </div>
        </div>

        <div
          className={`mt-16 transition-all duration-1000 transform delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h3 className="text-2xl font-bold text-purple-400 mb-6 text-center">
            Řekli o konferenci
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Testimonial
              quote="Nejlepší bitcoin akce CZ/SK scény. Právě proto jsme v Braiins hrdým partnerem už od prvního ročníku."
              author="Kristian Csepcsar, Braiins"
            />
            <Testimonial
              quote="Až se po týhle akci probudíte, budete mít pocit, že jste se vrátili z budoucnosti. A bude to pravda."
              author="Dominik Stroukal"
            />
            <Testimonial
              quote="Dotáhnout tolik Pražáků do Ostravy? To nedokáže jen tak někdo."
              author="Daniel Steigerwald"
            />
            <Testimonial
              quote="Masový orange-pilling ako sa patrí –⁠ pre mnohých ľudí počiatok ich nového života."
              author="Juraj Bednár"
            />
            <Testimonial
              quote="Tak jako si sportovci rádi zasoutěží na domácím hřišti, tak mám i já pocit, že ChainCamp je moje domácí pódium. A to nejsem Ostravák."
              author="Jakub „Kicom" Vejmola"
            />
            <Testimonial
              quote="Chaincamp je v mnoha ohledech lepší než lecjaká zahraniční konference. Davy bitcoinerů, krásné prostředí, perfektní organizace, žádný bullshit."
              author="Josef Tětek"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SpeakerBubble({ name }: { name: string }) {
  return (
    <div className="bg-purple-800/30 backdrop-blur-sm p-4 rounded-full border border-purple-500/30 text-center">
      <p className="text-white text-sm">{name}</p>
    </div>
  );
}

function Testimonial({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
      <p className="text-gray-300 italic mb-4">„{quote}"</p>
      <p className="text-purple-400 font-medium">**{author}**</p>
    </div>
  );
}
