export function Sponsors() {
  const sponsors = {
    platinum: [
      { name: "Trezor", logo: "/sponsors/trezor.svg" },
      { name: "Alza", logo: "/sponsors/alza.svg" }
    ],
    gold: [
      { name: "Paralelní Polis", logo: "/sponsors/paralelnipolis.svg" },
      { name: "Braiins", logo: "/sponsors/braiins.svg" },
      { name: "Simple Coin", logo: "/sponsors/simplecoin.svg" }
    ],
    silver: [
      { name: "General Bytes", logo: "/sponsors/generalbytes.svg" },
      { name: "Bit.plus", logo: "/sponsors/bitplus.svg" },
      { name: "Coinmate", logo: "/sponsors/coinmate.svg" },
      { name: "Binance", logo: "/sponsors/binance.svg" }
    ],
    bronze: [
      { name: "Goochain", logo: "/sponsors/goochain.svg" },
      { name: "Bitcoach", logo: "/sponsors/bitcoach.svg" },
      { name: "Cryptostorage", logo: "/sponsors/cryptostorage.svg" },
      { name: "Crypto Kingdom", logo: "/sponsors/cryptokingdom.svg" },
      { name: "Holky v kryptu", logo: "/sponsors/holkyvkryptu.svg" },
      { name: "Bitcoinovej kanál", logo: "/sponsors/bitcoinovejkanal.svg" }
    ]
  };

  return (
    <section id="sponsors" className="py-20 bg-gradient-to-b from-purple-900/20 to-black/0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 next-block-heading">
            <span className="text-[#530b6e]">SPONZOŘI</span> <span className="text-white">KONFERENCE</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#530b6e] to-[#30ff97] mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            ChainCamp by nebyl možný bez podpory našich sponzorů. Děkujeme všem partnerům za jejich podporu.
          </p>
        </div>

        {/* Platinum Sponsors */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-purple-300 mb-8">Platinový sponzoři</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sponsors.platinum.map((sponsor, index) => (
              <div
                key={index}
                className="next-block-card-purple p-8 flex items-center justify-center h-48"
              >
                <div className="text-white text-2xl font-bold">{sponsor.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Gold Sponsors */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-center text-yellow-400 mb-8">Zlatí sponzoři</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sponsors.gold.map((sponsor, index) => (
              <div
                key={index}
                className="next-block-card-lime p-6 flex items-center justify-center h-36"
              >
                <div className="text-white text-xl font-bold">{sponsor.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Silver Sponsors */}
        <div className="mb-16">
          <h3 className="text-lg font-bold text-center text-gray-300 mb-8">Stříbrní sponzoři</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sponsors.silver.map((sponsor, index) => (
              <div
                key={index}
                className="next-block-card-purple p-4 flex items-center justify-center h-28"
              >
                <div className="text-white font-bold">{sponsor.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bronze Sponsors */}
        <div>
          <h3 className="text-md font-bold text-center text-amber-700 mb-8">Bronzoví sponzoři</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {sponsors.bronze.map((sponsor, index) => (
              <div
                key={index}
                className="next-block-card-lime p-3 flex items-center justify-center h-24"
              >
                <div className="text-white text-sm font-bold">{sponsor.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Become a sponsor */}
        <div className="mt-16 bg-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Staňte se sponzorem</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Máte zájem stát se sponzorem ChainCampu 2026? Kontaktujte nás a my vám rádi poskytneme více informací o možnostech sponzorství.
          </p>
          <a
            href="mailto:sponsors@chaincamp.cz"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition-colors inline-block"
          >
            Kontaktujte nás
          </a>
        </div>
      </div>
    </section>
  );
}
