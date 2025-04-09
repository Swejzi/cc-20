"use client";

import { useState, useEffect } from "react";

export function FAQ() {
  const [isVisible, setIsVisible] = useState(false);
  const [openItem, setOpenItem] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("caste-dotazy");
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

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqItems = [
    {
      question: "Co je ChainCamp?",
      answer: "ChainCamp je **legendární konference** bitcoinové komunity. Vystupují tady **nejvýznamnější speakeři a společnosti** z odvětví. Na přednáškách a workshopech předávají dál své znalosti a zkušenosti. ChainCamp **propojuje bitcoinery** a vrací setkávání do offline světa."
    },
    {
      question: "Komu je ChainCamp určený?",
      answer: "**ChainCamp je pro akce všechny!** Na své si přijde každý - **od úplných začátečníků až po zkušené** dlouholeté bitcoinové **matadory**. Na přednáškách získáš přehled a na workshopech se ponoříš do hloubky problémů. U pivka to potom společně probereme."
    },
    {
      question: "Kde se ChainCamp koná?",
      answer: "Aktivity spojené s ChainCampem proběhnou v inspirativních prostorách **univerzitního kampusu VŠB**, vše pohodlně blízko u sebe. Konference bude **v Aule VŠB**."
    },
    {
      question: "Jak dlouho ChainCamp trvá?",
      answer: "V pátek večer proběhnou různé doprovodné akce. Program ChainCampu **začíná v sobotu ráno před devátou**. Přednášky a workshopy končí v šest večer. Afterparty **se může protáhnout až do neděle... (:**"
    },
    {
      question: "Kde seženu vstupenku?",
      answer: "Vstupenky na ChainCamp 2026 seženeš **od dubna tady na webu** **vpravo nahoře**. Po zakoupení vstupenky dostaneš mailem unikátní **QR kód, který Tě pustí ke všemu**, co chceš vidět a zažít. Včetně pohodlné online registrace na workshopy."
    },
    {
      question: "Je vstupenka anonymní?",
      answer: "Ctíme principy anonymity. Proto v celém procesu nákupu vstupenky **nechceme žádné osobní údaje, stačí nějaký e-mail**. Po zaplacení dostaneš QR kód, který není na nikoho vázán a můžeš ho komukoli prodat nebo věnovat."
    },
    {
      question: "Co si mám vzít?",
      answer: "Nezapomeň **dobrou náladu a walletku nabitou saty** na utrácení. Na workshopy se může hodit **notebook a hardwarová peněženka**. Večer může být venku chladněji, vezmi si **oblečení podle počasí. Máme šatnu**, kde si můžeš odložit."
    },
    {
      question: "Co si nemám brát?",
      answer: "S nakažlivou nemocí zůstaň doma. Nepotřebuješ jídlo ani pití. **Budou stánky s kávou, teplým i studeným jídlem a samozřejmě nebude chybět ani pivko.** Respektuj svým chováním ostatní návštěvníky."
    },
    {
      question: "Budou záznamy přednášek?",
      answer: "Jasně! **Všechny** **přednášky** budeme nahrávat a po konferenci je zveřejníme **zdarma na našem YouTube** kanálu. **Workshopy se nenahrávají**, ty se musí zažít."
    }
  ];

  return (
    <div
      id="caste-dotazy"
      className="py-20 relative"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Časté dotazy
        </h2>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`mb-4 transition-all duration-1000 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left bg-purple-900/20 backdrop-blur-sm p-5 rounded-xl border border-purple-500/20 hover:bg-purple-800/30 transition-colors flex justify-between items-center"
              >
                <span className="text-white font-medium">{item.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-purple-400 transition-transform ${
                    openItem === index ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openItem === index && (
                <div className="bg-purple-900/10 backdrop-blur-sm p-5 rounded-b-xl border-x border-b border-purple-500/20 mt-px">
                  <p className="text-gray-300">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
