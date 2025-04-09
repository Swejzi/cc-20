"use client";

import { useState } from "react";

interface ScheduleItem {
  id: number;
  time: string;
  title: string;
  speaker: string;
  description: string;
  track: string;
  day: 1 | 2;
}

const SCHEDULE_ITEMS: ScheduleItem[] = [
  // Day 1
  {
    id: 1,
    time: "9:00 - 10:00",
    title: "Registrace a ranní káva",
    speaker: "",
    description: "Registrace účastníků, networking a ranní káva.",
    track: "Všechny",
    day: 1
  },
  {
    id: 2,
    time: "10:00 - 10:30",
    title: "Zahájení konference",
    speaker: "Organizační tým",
    description: "Oficiální zahájení konference, představení programu a organizačního týmu.",
    track: "Hlavní sál",
    day: 1
  },
  {
    id: 3,
    time: "10:30 - 11:30",
    title: "Bitcoin v roce 2026: Kam jsme se posunuli a co nás čeká",
    speaker: "Marek Palatinus",
    description: "Keynote přednáška o aktuálním stavu bitcoinu a jeho budoucnosti.",
    track: "Hlavní sál",
    day: 1
  },
  {
    id: 4,
    time: "11:30 - 12:30",
    title: "Lightning Network: Škálování bitcoinu pro masové použití",
    speaker: "Josef Tětek",
    description: "Přednáška o Lightning Network a jeho roli v škálování bitcoinu pro každodenní použití.",
    track: "Hlavní sál",
    day: 1
  },
  {
    id: 5,
    time: "12:30 - 13:30",
    title: "Oběd a networking",
    speaker: "",
    description: "Přestávka na oběd a networking s ostatními účastníky.",
    track: "Všechny",
    day: 1
  },
  {
    id: 6,
    time: "13:30 - 14:30",
    title: "Bitcoin mining: Současné trendy a budoucí vývoj",
    speaker: "Jan Čapek",
    description: "Přednáška o aktuálních trendech v těžbě bitcoinu a budoucím vývoji.",
    track: "Hlavní sál",
    day: 1
  },
  {
    id: 7,
    time: "13:30 - 14:30",
    title: "Workshop: Jak začít s bitcoinem - průvodce pro začátečníky",
    speaker: "Jakub Vejmola",
    description: "Praktický workshop pro začátečníky, kteří chtějí začít používat bitcoin.",
    track: "Workshop sál",
    day: 1
  },
  {
    id: 8,
    time: "14:30 - 15:30",
    title: "Bezpečnost bitcoinových peněženek",
    speaker: "Pavol Rusnak",
    description: "Přednáška o bezpečnosti bitcoinových peněženek a ochraně vašich kryptoměn.",
    track: "Hlavní sál",
    day: 1
  },
  {
    id: 9,
    time: "14:30 - 15:30",
    title: "Workshop: Nastavení a používání Lightning Network",
    speaker: "Karel Fillner",
    description: "Praktický workshop o nastavení a používání Lightning Network pro rychlé a levné bitcoinové transakce.",
    track: "Workshop sál",
    day: 1
  },
  {
    id: 10,
    time: "15:30 - 16:00",
    title: "Coffee break",
    speaker: "",
    description: "Přestávka na kávu a networking.",
    track: "Všechny",
    day: 1
  },
  {
    id: 11,
    time: "16:00 - 17:00",
    title: "Panelová diskuze: Budoucnost bitcoinu v České republice a na Slovensku",
    speaker: "Marek Palatinus, Josef Tětek, Jakub Vejmola, Dušan Matuška",
    description: "Panelová diskuze o budoucnosti bitcoinu v České republice a na Slovensku.",
    track: "Hlavní sál",
    day: 1
  },
  {
    id: 12,
    time: "17:00 - 18:00",
    title: "Bitcoin a regulace: Aktuální stav a výhled do budoucna",
    speaker: "Lea Petrášová",
    description: "Přednáška o aktuálním stavu regulace bitcoinu a kryptoměn a výhledu do budoucna.",
    track: "Hlavní sál",
    day: 1
  },
  {
    id: 13,
    time: "18:00 - 19:00",
    title: "Networking a občerstvení",
    speaker: "",
    description: "Neformální networking a občerstvení.",
    track: "Všechny",
    day: 1
  },
  {
    id: 14,
    time: "19:00 - 22:00",
    title: "Afterparty",
    speaker: "",
    description: "Afterparty pro všechny účastníky konference.",
    track: "Všechny",
    day: 1
  },
  
  // Day 2
  {
    id: 15,
    time: "9:00 - 10:00",
    title: "Registrace a ranní káva",
    speaker: "",
    description: "Registrace účastníků, networking a ranní káva.",
    track: "Všechny",
    day: 2
  },
  {
    id: 16,
    time: "10:00 - 11:00",
    title: "Bitcoin jako součást investičního portfolia",
    speaker: "Josef Tětek",
    description: "Přednáška o bitcoinu jako součásti investičního portfolia a jeho roli v diverzifikaci investic.",
    track: "Hlavní sál",
    day: 2
  },
  {
    id: 17,
    time: "10:00 - 11:00",
    title: "Workshop: Nastavení vlastního Bitcoin nodu",
    speaker: "Dušan Matuška",
    description: "Praktický workshop o nastavení a provozování vlastního Bitcoin nodu.",
    track: "Workshop sál",
    day: 2
  },
  {
    id: 18,
    time: "11:00 - 12:00",
    title: "Bitcoin a energetika: Mýty a fakta",
    speaker: "Jan Čapek",
    description: "Přednáška o vztahu bitcoinu a energetiky, vyvrácení mýtů a představení faktů.",
    track: "Hlavní sál",
    day: 2
  },
  {
    id: 19,
    time: "11:00 - 12:00",
    title: "Workshop: Multisig peněženky a jejich využití",
    speaker: "Pavol Rusnak",
    description: "Praktický workshop o multisig peněženkách a jejich využití pro zvýšení bezpečnosti.",
    track: "Workshop sál",
    day: 2
  },
  {
    id: 20,
    time: "12:00 - 13:00",
    title: "Oběd a networking",
    speaker: "",
    description: "Přestávka na oběd a networking s ostatními účastníky.",
    track: "Všechny",
    day: 2
  },
  {
    id: 21,
    time: "13:00 - 14:00",
    title: "Bitcoin a soukromí: Jak zůstat anonymní",
    speaker: "Jakub Vejmola",
    description: "Přednáška o soukromí při používání bitcoinu a technikách pro zachování anonymity.",
    track: "Hlavní sál",
    day: 2
  },
  {
    id: 22,
    time: "13:00 - 14:00",
    title: "Workshop: Obchodování s bitcoinem - základy a strategie",
    speaker: "Karel Fillner",
    description: "Praktický workshop o základech a strategiích obchodování s bitcoinem.",
    track: "Workshop sál",
    day: 2
  },
  {
    id: 23,
    time: "14:00 - 15:00",
    title: "Bitcoin a DeFi: Možnosti a rizika",
    speaker: "Lea Petrášová",
    description: "Přednáška o vztahu bitcoinu a decentralizovaných financí, možnostech a rizicích.",
    track: "Hlavní sál",
    day: 2
  },
  {
    id: 24,
    time: "14:00 - 15:00",
    title: "Workshop: Jak platit bitcoinem v každodenním životě",
    speaker: "Dušan Matuška",
    description: "Praktický workshop o používání bitcoinu pro každodenní platby.",
    track: "Workshop sál",
    day: 2
  },
  {
    id: 25,
    time: "15:00 - 15:30",
    title: "Coffee break",
    speaker: "",
    description: "Přestávka na kávu a networking.",
    track: "Všechny",
    day: 2
  },
  {
    id: 26,
    time: "15:30 - 16:30",
    title: "Panelová diskuze: Bitcoin vs. tradiční finanční systém",
    speaker: "Josef Tětek, Jakub Vejmola, Lea Petrášová, Karel Fillner",
    description: "Panelová diskuze o vztahu bitcoinu a tradičního finančního systému.",
    track: "Hlavní sál",
    day: 2
  },
  {
    id: 27,
    time: "16:30 - 17:30",
    title: "Závěrečná keynote: Bitcoin - revoluce v platebních systémech",
    speaker: "Marek Palatinus",
    description: "Závěrečná keynote přednáška o bitcoinu jako revoluci v platebních systémech.",
    track: "Hlavní sál",
    day: 2
  },
  {
    id: 28,
    time: "17:30 - 18:00",
    title: "Zakončení konference",
    speaker: "Organizační tým",
    description: "Oficiální zakončení konference, poděkování účastníkům a přednášejícím.",
    track: "Hlavní sál",
    day: 2
  }
];

export function Schedule() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [activeTrack, setActiveTrack] = useState<string>("all");
  
  const filteredSchedule = SCHEDULE_ITEMS.filter(item => {
    if (item.day !== activeDay) return false;
    if (activeTrack === "all") return true;
    return item.track === activeTrack || item.track === "Všechny";
  });

  return (
    <section id="schedule" className="py-20 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-purple-500">Program</span> konference
          </h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Připravili jsme pro vás bohatý program plný přednášek, workshopů a panelových diskuzí. Vyberte si z nabídky a sestavte si vlastní program.
          </p>
        </div>
        
        {/* Day selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full bg-purple-900/30 p-1">
            <button
              className={`px-6 py-2 rounded-full transition-colors ${
                activeDay === 1 ? "bg-purple-600 text-white" : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setActiveDay(1)}
            >
              Den 1 - 20. září
            </button>
            <button
              className={`px-6 py-2 rounded-full transition-colors ${
                activeDay === 2 ? "bg-purple-600 text-white" : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setActiveDay(2)}
            >
              Den 2 - 21. září
            </button>
          </div>
        </div>
        
        {/* Track selector */}
        <div className="flex justify-center mb-12 flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTrack === "all" ? "bg-purple-600 text-white" : "bg-purple-900/30 text-gray-300 hover:bg-purple-900/50"
            }`}
            onClick={() => setActiveTrack("all")}
          >
            Všechny
          </button>
          <button
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTrack === "Hlavní sál" ? "bg-purple-600 text-white" : "bg-purple-900/30 text-gray-300 hover:bg-purple-900/50"
            }`}
            onClick={() => setActiveTrack("Hlavní sál")}
          >
            Hlavní sál
          </button>
          <button
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTrack === "Workshop sál" ? "bg-purple-600 text-white" : "bg-purple-900/30 text-gray-300 hover:bg-purple-900/50"
            }`}
            onClick={() => setActiveTrack("Workshop sál")}
          >
            Workshop sál
          </button>
        </div>
        
        {/* Schedule */}
        <div className="space-y-6">
          {filteredSchedule.map((item) => (
            <div 
              key={item.id}
              className="bg-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 transition-all hover:border-purple-500/40"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:w-1/6">
                  <div className="text-purple-400 font-mono">{item.time}</div>
                  <div className="text-gray-400 text-sm">{item.track}</div>
                </div>
                
                <div className="md:w-5/6">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  {item.speaker && (
                    <p className="text-purple-300 mb-2">{item.speaker}</p>
                  )}
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Download button */}
        <div className="mt-12 text-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition-colors inline-flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Stáhnout kompletní program (PDF)
          </button>
        </div>
      </div>
    </section>
  );
}
