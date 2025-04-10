"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Co je ChainCamp?",
    answer: "ChainCamp je největší bitcoinová konference v České republice a na Slovensku. Jde o dvoudenní akci plnou přednášek, workshopů a networkingu zaměřenou na bitcoin a kryptoměny."
  },
  {
    question: "Kdy a kde se ChainCamp 2026 koná?",
    answer: "ChainCamp 2026 se koná 20. - 21. září 2026 v Aule VŠB v Ostravě-Porubě."
  },
  {
    question: "Pro koho je konference určena?",
    answer: "Konference je určena pro všechny zájemce o bitcoin a kryptoměny, od úplných začátečníků až po pokročilé uživatele a profesionály z oboru."
  },
  {
    question: "Kolik stojí vstupenka?",
    answer: "Ceny vstupenek se liší podle typu a času nákupu. Early bird vstupenky začínají na 1500 Kč, standardní vstupenky stojí 2500 Kč. VIP vstupenky, které zahrnují přístup do VIP zóny, obědy a další výhody, stojí 5000 Kč."
  },
  {
    question: "Jak mohu zaplatit vstupenku?",
    answer: "Vstupenky můžete zaplatit bitcoinem, kartou nebo bankovním převodem. Preferujeme platbu bitcoinem, za kterou poskytujeme 10% slevu."
  },
  {
    question: "Je možné koupit vstupenku na místě?",
    answer: "Ano, vstupenky bude možné zakoupit i na místě, pokud nebudou vyprodány. Doporučujeme však koupit vstupenku předem, protože kapacita je omezená a cena na místě bude vyšší."
  },
  {
    question: "V jakém jazyce budou přednášky?",
    answer: "Většina přednášek bude v češtině nebo slovenštině. Některé přednášky zahraničních hostů budou v angličtině s českými titulky nebo tlumočením."
  },
  {
    question: "Bude k dispozici občerstvení?",
    answer: "Ano, v ceně vstupenky je zahrnuto základní občerstvení a nápoje během přestávek. Obědy nejsou zahrnuty v ceně standardní vstupenky, ale budou k dispozici v areálu za příplatek nebo v rámci VIP vstupenky."
  },
  {
    question: "Budou přednášky nahrávány?",
    answer: "Ano, většina přednášek bude nahrávána a záznamy budou po konferenci dostupné na našem YouTube kanálu."
  },
  {
    question: "Mohu se stát sponzorem nebo partnerem konference?",
    answer: "Ano, nabízíme různé možnosti sponzorství a partnerství. Pro více informací nás kontaktujte na sponsors@chaincamp.cz."
  },
  {
    question: "Jak se mohu stát přednášejícím?",
    answer: "Pokud máte zájem přednášet na ChainCampu, vyplňte formulář na našem webu nebo nás kontaktujte na speakers@chaincamp.cz. Program sestavujeme několik měsíců předem, proto doporučujeme kontaktovat nás co nejdříve."
  },
  {
    question: "Bude na konferenci možnost platit bitcoinem?",
    answer: "Ano, na konferenci bude možné platit bitcoinem za občerstvení, merchandise a další služby. Budou k dispozici i bitcoinové bankomaty."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-black/0 to-purple-900/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 next-block-heading">
            ČASTO KLADENÉ <span className="text-[#530b6e]">OTÁZKY</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#530b6e] to-[#30ff97] mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Našli jste odpověď na svou otázku? Pokud ne, neváhejte nás kontaktovat na info@chaincamp.cz.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className="next-block-card-purple overflow-hidden transition-all"
              >
                <button
                  type="button"
                  className="w-full text-left p-6 focus:outline-none flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                  <svg
                    className={`h-5 w-5 text-purple-500 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`px-6 pb-6 transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="text-gray-300">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-6">
              Máte další otázky? Neváhejte nás kontaktovat.
            </p>
            <a
              href="mailto:info@chaincamp.cz"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition-colors inline-flex items-center"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Kontaktujte nás
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
