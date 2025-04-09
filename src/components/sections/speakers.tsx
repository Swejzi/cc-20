"use client";

import { useState } from "react";

interface Speaker {
  id: number;
  name: string;
  role: string;
  company: string;
  bio: string;
  image: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

const SPEAKERS: Speaker[] = [
  {
    id: 1,
    name: "Marek Palatinus",
    role: "CEO & Founder",
    company: "Trezor",
    bio: "Marek 'Slush' Palatinus je zakladatelem společnosti SatoshiLabs a tvůrcem prvního hardwarového bitcoinového trezoru na světě. Je také tvůrcem prvního těžebního poolu na světě - Slush Pool.",
    image: "/speakers/marek-palatinus.jpg",
    twitter: "https://twitter.com/pavolrusnak",
    linkedin: "https://www.linkedin.com/in/marekpalatinus/",
    website: "https://trezor.io"
  },
  {
    id: 2,
    name: "Jakub Vejmola",
    role: "Bitcoin Influencer",
    company: "Kicom",
    bio: "Jakub 'Kicom' Vejmola je český bitcoiner, influencer a autor knihy 'Bitcoin: Odluka peněz od státu'. Provozuje populární YouTube kanál o bitcoinu a kryptoměnách.",
    image: "/speakers/jakub-vejmola.jpg",
    twitter: "https://twitter.com/kicomcz",
    website: "https://kicom.cz"
  },
  {
    id: 3,
    name: "Josef Tětek",
    role: "Bitcoin Analyst",
    company: "Trezor",
    bio: "Josef Tětek je bitcoinový analytik a autor. Píše o bitcoinu, ekonomii a svobodě. Pracuje jako bitcoinový analytik pro SatoshiLabs, výrobce hardwarové peněženky Trezor.",
    image: "/speakers/josef-tetek.jpg",
    twitter: "https://twitter.com/joseftetek",
    linkedin: "https://www.linkedin.com/in/joseftetek/"
  },
  {
    id: 4,
    name: "Dušan Matuška",
    role: "Founder",
    company: "Paralelní Polis Košice",
    bio: "Dušan Matuška je zakladatelem Paralelní Polis Košice a bitcoinovým nadšencem. Věnuje se vzdělávání v oblasti kryptoměn a decentralizovaných technologií.",
    image: "/speakers/dusan-matuska.jpg",
    twitter: "https://twitter.com/dusan_matuska"
  },
  {
    id: 5,
    name: "Lea Petrášová",
    role: "Marketing Manager",
    company: "Braiins",
    bio: "Lea Petrášová pracuje jako marketingová manažerka ve společnosti Braiins, která vyvíjí firmware pro ASIC minery a provozuje těžební pool Slush Pool.",
    image: "/speakers/lea-petrasova.jpg",
    twitter: "https://twitter.com/leapetrasova",
    linkedin: "https://www.linkedin.com/in/lea-petrasova/"
  },
  {
    id: 6,
    name: "Jan Čapek",
    role: "CEO",
    company: "Braiins",
    bio: "Jan Čapek je spoluzakladatelem a CEO společnosti Braiins, která stojí za nejstarším bitcoinovým mining poolem Slush Pool a firmwarem Braiins OS+.",
    image: "/speakers/jan-capek.jpg",
    twitter: "https://twitter.com/janbraiins",
    linkedin: "https://www.linkedin.com/in/jan-capek-8454687/"
  },
  {
    id: 7,
    name: "Pavol Rusnak",
    role: "CTO",
    company: "SatoshiLabs",
    bio: "Pavol 'Stick' Rusnak je spoluzakladatelem společnosti SatoshiLabs a hlavním technickým ředitelem. Podílel se na vývoji hardwarové peněženky Trezor.",
    image: "/speakers/pavol-rusnak.jpg",
    twitter: "https://twitter.com/pavolrusnak",
    website: "https://rusnak.io"
  },
  {
    id: 8,
    name: "Karel Fillner",
    role: "CEO",
    company: "Simple Coin",
    bio: "Karel Fillner je zakladatelem a CEO společnosti Simple Coin, která provozuje síť bitcoinových bankomatů a směnárnu kryptoměn.",
    image: "/speakers/karel-fillner.jpg",
    twitter: "https://twitter.com/karelfillner",
    linkedin: "https://www.linkedin.com/in/karel-fillner/"
  }
];

export function Speakers() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  return (
    <section id="speakers" className="py-20 bg-gradient-to-b from-black/0 to-purple-900/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-purple-500">Speakeři</span> konference
          </h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Na ChainCampu vystoupí přední odborníci z bitcoinové komunity. Přijďte si poslechnout jejich přednášky a získat cenné informace a zkušenosti.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {SPEAKERS.map((speaker) => (
            <div 
              key={speaker.id}
              className="bg-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
              onClick={() => setSelectedSpeaker(speaker)}
            >
              <div className="h-64 bg-purple-800/50 relative">
                {/* Placeholder for speaker image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="h-24 w-24 text-purple-300/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{speaker.name}</h3>
                  <p className="text-purple-300">{speaker.role}</p>
                  <p className="text-gray-400 text-sm">{speaker.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* "More speakers coming soon" card */}
        <div className="mt-12 bg-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Další speakeři budou oznámeni brzy</h3>
          <p className="text-gray-300 mb-6">
            Sledujte naše sociální sítě a přihlaste se k odběru newsletteru, abyste byli informováni o nových přednášejících.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition-colors">
            Přihlásit se k odběru novinek
          </button>
        </div>
      </div>
      
      {/* Speaker Detail Modal */}
      {selectedSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setSelectedSpeaker(null)}>
          <div 
            className="bg-purple-900/90 backdrop-blur-lg rounded-xl border border-purple-500/30 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedSpeaker.name}</h3>
                <p className="text-purple-300">{selectedSpeaker.role} at {selectedSpeaker.company}</p>
              </div>
              <button 
                onClick={() => setSelectedSpeaker(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="bg-purple-800/50 rounded-lg h-48 flex items-center justify-center">
                  <svg className="h-24 w-24 text-purple-300/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <div className="flex justify-center space-x-4 mt-4">
                  {selectedSpeaker.twitter && (
                    <a 
                      href={selectedSpeaker.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )}
                  
                  {selectedSpeaker.linkedin && (
                    <a 
                      href={selectedSpeaker.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                  
                  {selectedSpeaker.website && (
                    <a 
                      href={selectedSpeaker.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Bio</h4>
                <p className="text-gray-300 mb-6">{selectedSpeaker.bio}</p>
                
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Témata přednášek</h4>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Bitcoin a jeho budoucnost</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Bezpečnost a soukromí v kryptosvětě</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Inovace v bitcoinovém ekosystému</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
