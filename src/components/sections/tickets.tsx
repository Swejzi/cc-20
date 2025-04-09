"use client";

import { useState } from "react";

interface TicketType {
  id: string;
  name: string;
  price: number;
  bitcoinPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
}

const TICKET_TYPES: TicketType[] = [
  {
    id: "early-bird",
    name: "Early Bird",
    price: 1500,
    bitcoinPrice: 1350,
    description: "Limitovaná edice vstupenek za zvýhodněnou cenu",
    features: [
      "Přístup na všechny přednášky",
      "Přístup na workshopy (nutná registrace)",
      "Základní občerstvení a nápoje",
      "Konferenční materiály",
      "Přístup k záznamům přednášek po konferenci"
    ]
  },
  {
    id: "standard",
    name: "Standard",
    price: 2500,
    bitcoinPrice: 2250,
    description: "Standardní vstupenka na konferenci",
    features: [
      "Přístup na všechny přednášky",
      "Přístup na workshopy (nutná registrace)",
      "Základní občerstvení a nápoje",
      "Konferenční materiály",
      "Přístup k záznamům přednášek po konferenci",
      "ChainCamp tričko"
    ],
    popular: true
  },
  {
    id: "vip",
    name: "VIP",
    price: 5000,
    bitcoinPrice: 4500,
    description: "Exkluzivní VIP vstupenka s nadstandardními službami",
    features: [
      "Přístup na všechny přednášky",
      "Prioritní registrace na workshopy",
      "Prémiové občerstvení a nápoje",
      "Obědy v ceně",
      "VIP lounge s občerstvením",
      "Meet & Greet se speakery",
      "Exkluzivní ChainCamp merchandise balíček",
      "Přístup k záznamům přednášek po konferenci",
      "Pozvánka na VIP afterparty"
    ]
  }
];

export function Tickets() {
  const [selectedTicket, setSelectedTicket] = useState<string>("standard");
  const [paymentMethod, setPaymentMethod] = useState<"bitcoin" | "card" | "bank">("bitcoin");

  const getTicketPrice = () => {
    const ticket = TICKET_TYPES.find(t => t.id === selectedTicket);
    if (!ticket) return 0;
    return paymentMethod === "bitcoin" ? ticket.bitcoinPrice : ticket.price;
  };

  return (
    <section id="tickets" className="py-20 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-purple-500">Vstupenky</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Zajistěte si vstupenku na ChainCamp 2026 a buďte součástí největší bitcoinové konference v Česku a na Slovensku.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TICKET_TYPES.map((ticket) => (
            <div 
              key={ticket.id}
              className={`bg-purple-900/20 backdrop-blur-sm rounded-xl border transition-all ${
                selectedTicket === ticket.id 
                  ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                  : 'border-purple-500/20 hover:border-purple-500/50'
              } ${ticket.popular ? 'relative' : ''}`}
            >
              {ticket.popular && (
                <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  Nejpopulárnější
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{ticket.name}</h3>
                <p className="text-gray-400 mb-4">{ticket.description}</p>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">{paymentMethod === "bitcoin" ? ticket.bitcoinPrice : ticket.price} Kč</span>
                  {paymentMethod === "bitcoin" && (
                    <span className="text-sm text-purple-400 ml-2">10% sleva při platbě bitcoinem</span>
                  )}
                </div>
                
                <ul className="space-y-2 mb-6">
                  {ticket.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 rounded-lg transition-colors ${
                    selectedTicket === ticket.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-900/50 text-gray-300 hover:bg-purple-900/80 hover:text-white'
                  }`}
                  onClick={() => setSelectedTicket(ticket.id)}
                >
                  {selectedTicket === ticket.id ? 'Vybráno' : 'Vybrat'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 max-w-2xl mx-auto bg-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Dokončit objednávku</h3>
          
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">Vybraná vstupenka</label>
            <div className="bg-purple-900/50 rounded-lg p-4 flex justify-between items-center">
              <div>
                <span className="text-white font-semibold">
                  {TICKET_TYPES.find(t => t.id === selectedTicket)?.name}
                </span>
                <span className="text-gray-400 ml-2">
                  ({getTicketPrice()} Kč)
                </span>
              </div>
              <button 
                className="text-purple-400 hover:text-purple-300 transition-colors"
                onClick={() => window.location.href = '#tickets'}
              >
                Změnit
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">Způsob platby</label>
            <div className="grid grid-cols-3 gap-4">
              <button
                className={`p-4 rounded-lg flex flex-col items-center transition-colors ${
                  paymentMethod === "bitcoin" 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-900/50 text-gray-300 hover:bg-purple-900/80 hover:text-white'
                }`}
                onClick={() => setPaymentMethod("bitcoin")}
              >
                <svg className="h-8 w-8 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.17-1.064-.25l.53-2.127-1.32-.33-.54 2.165c-.285-.065-.565-.128-.84-.196l-1.815-.45-.35 1.407s.975.225.955.238c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.415-.614.32.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.53 2.14 1.32.33.54-2.18c2.24.427 3.93.255 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.52 2.75 2.084v.006z" fill="currentColor" />
                </svg>
                <span>Bitcoin</span>
                <span className="text-xs mt-1">10% sleva</span>
              </button>
              
              <button
                className={`p-4 rounded-lg flex flex-col items-center transition-colors ${
                  paymentMethod === "card" 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-900/50 text-gray-300 hover:bg-purple-900/80 hover:text-white'
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <svg className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Karta</span>
                <span className="text-xs mt-1 opacity-0">-</span>
              </button>
              
              <button
                className={`p-4 rounded-lg flex flex-col items-center transition-colors ${
                  paymentMethod === "bank" 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-900/50 text-gray-300 hover:bg-purple-900/80 hover:text-white'
                }`}
                onClick={() => setPaymentMethod("bank")}
              >
                <svg className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                <span>Převod</span>
                <span className="text-xs mt-1 opacity-0">-</span>
              </button>
            </div>
          </div>
          
          <div className="mb-8">
            <label className="block text-white font-medium mb-2">Osobní údaje</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Jméno"
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
              />
              <input
                type="text"
                placeholder="Příjmení"
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
              />
              <input
                type="email"
                placeholder="E-mail"
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
              />
              <input
                type="tel"
                placeholder="Telefon"
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <span className="text-white font-medium">Celková cena:</span>
            <span className="text-2xl font-bold text-white">{getTicketPrice()} Kč</span>
          </div>
          
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg transition-colors text-lg font-semibold">
            Dokončit objednávku
          </button>
          
          <p className="text-gray-400 text-sm text-center mt-4">
            Kliknutím na tlačítko souhlasíte s <a href="#" className="text-purple-400 hover:text-purple-300">obchodními podmínkami</a> a <a href="#" className="text-purple-400 hover:text-purple-300">zpracováním osobních údajů</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
