"use client";

import { useEffect, useState } from "react";

export function Speakers() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("speakeri");
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
      id="speakeri"
      className="py-20 relative"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Speakeři
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Speaker
            name="Jakub „Kicom" Vejmola"
            role="Bitcoinovej kanál"
            bio="Popularizuje bitcoin a vyvrací mýty. Bitcoinovej kanál na YouTube znají všichni. Propojil v něm znalosti videa, grafického designu a nadšení pro IT technologie."
            delay={0}
            isVisible={isVisible}
          />

          <Speaker
            name="Ondřej „Bratříček" Tesárek"
            role="Youtuber & komentátor"
            bio="Ondřej Tesárek, známý pod přezdívkou Bratříček, je český internetový komentátor a youtuber. Bývalý bitcoin skeptik, který se stal jeho fanouškem."
            delay={200}
            isVisible={isVisible}
          />

          <Speaker
            name="Radim Kozub"
            role="Blockchain Legal"
            bio="Advokát a spoluzakladatel Blockchain Legal, advokátní kanceláře orientované na kryptoměny. Právu v této oblasti se věnuje od roku 2015."
            delay={400}
            isVisible={isVisible}
          />

          <Speaker
            name="Jan Kohout"
            role="Kryptoplebs"
            bio="Autor podcastu Kryptoplebs, fyzioterapeut a obhájce svobody. Zajímá se o peníze z pohledu filosofie, psychologie a historie. Ostatním pomáhá bitcoin pochopit a používat."
            delay={600}
            isVisible={isVisible}
          />

          <Speaker
            name="Jan Marvan"
            role="Hacking Lives"
            bio="Honza je globální občan, který žije v několika jurisdikcích. Fascinuje ho opsec, Plán B a testování života v Latinské Americe. K Bitcoinu ho přivedla potřeba plné kontroly nad financemi."
            delay={800}
            isVisible={isVisible}
          />

          <Speaker
            name="Marek „Slush" Palatinus"
            role="Zakladatel SatoshiLabs"
            bio="Průkopník bitcoinu v Česku, zakladatel prvního těžebního poolu a společnosti SatoshiLabs, která stojí za hardwarovou peněženkou Trezor."
            delay={1000}
            isVisible={isVisible}
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300 mb-4">
            A mnoho dalších špičkových řečníků z bitcoinové komunity!
          </p>
          <p className="text-purple-400">
            Kompletní seznam speakerů bude postupně zveřejňován.
          </p>
        </div>
      </div>
    </div>
  );
}

function Speaker({
  name,
  role,
  bio,
  delay,
  isVisible
}: {
  name: string;
  role: string;
  bio: string;
  delay: number;
  isVisible: boolean;
}) {
  return (
    <div
      className={`bg-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 transition-all duration-1000 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-20 h-20 bg-purple-700/50 rounded-full mb-4 mx-auto flex items-center justify-center">
        <span className="text-2xl text-white">{name.charAt(0)}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-1 text-center">{name}</h3>
      <p className="text-purple-400 text-sm mb-4 text-center">{role}</p>
      <p className="text-gray-300 text-sm">{bio}</p>

      <div className="mt-4 flex justify-center space-x-3">
        <SocialIcon type="twitter" />
        <SocialIcon type="youtube" />
        <SocialIcon type="linkedin" />
        <SocialIcon type="web" />
      </div>
    </div>
  );
}

function SocialIcon({ type }: { type: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-purple-800/50 flex items-center justify-center hover:bg-purple-700/50 transition-colors cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-white"
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
    </div>
  );
}
