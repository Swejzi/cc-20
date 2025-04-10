export function Venue() {
  return (
    <section id="venue" className="py-20 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 next-block-heading">
            <span className="text-[#530b6e]">MÍSTO</span> <span className="text-white">KONÁNÍ</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#530b6e] to-[#30ff97] mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            ChainCamp 2026 se bude konat v moderních prostorách Auly VŠB v Ostravě-Porubě.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl mb-6 next-block-heading text-[#30ff97]">
              AULA VŠB-TUO
            </h3>
            <p className="text-gray-300 mb-6">
              Aula VŠB-TUO je moderní konferenční centrum s kapacitou až 1000 osob. Nachází se v kampusu Vysoké školy báňské - Technické univerzity Ostrava v Ostravě-Porubě.
            </p>

            <div className="next-block-card-purple mb-6">
              <h4 className="text-xl font-semibold text-white mb-4">Adresa</h4>
              <p className="text-gray-300 flex items-start">
                <svg className="h-6 w-6 mr-3 text-[#530b6e] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  Aula VŠB-TUO<br />
                  17. listopadu 2172/15<br />
                  708 00 Ostrava-Poruba<br />
                  Česká republika
                </span>
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white">Jak se tam dostat</h4>

              <div className="flex items-start">
                <svg className="h-6 w-6 mr-3 text-[#30ff97] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div>
                  <h5 className="text-white font-medium">MHD</h5>
                  <p className="text-gray-300">
                    Tramvají č. 7, 8, 17 nebo 19 do zastávky "Rektorát VŠB". Aula se nachází přímo naproti zastávce.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="h-6 w-6 mr-3 text-[#30ff97] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div>
                  <h5 className="text-white font-medium">Autem</h5>
                  <p className="text-gray-300">
                    Parkování je možné v areálu VŠB nebo v okolí. Doporučujeme využít parkoviště přímo u Auly VŠB.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="h-6 w-6 mr-3 text-[#30ff97] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div>
                  <h5 className="text-white font-medium">Vlakem/Autobusem</h5>
                  <p className="text-gray-300">
                    Z hlavního nádraží nebo autobusového nádraží můžete využít MHD (tramvaj č. 8 nebo 19) přímo k Aule VŠB.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Map placeholder */}
            <div className="next-block-card-purple h-80 flex items-center justify-center">
              <div className="text-center">
                <svg className="h-16 w-16 text-[#530b6e] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-gray-300">Interaktivní mapa</p>
              </div>
            </div>

            <div className="next-block-card-lime">
              <h4 className="text-xl font-semibold text-white mb-4">Ubytování</h4>
              <p className="text-gray-300 mb-4">
                Pro účastníky konference jsme zajistili zvýhodněné ceny v následujících hotelech:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 text-[#30ff97] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">
                    <strong className="text-white">Hotel Imperial</strong> - 10% sleva s kódem "CHAINCAMP2026"
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 text-[#30ff97] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">
                    <strong className="text-white">Harmony Club Hotel</strong> - 15% sleva s kódem "CHAINCAMP2026"
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 text-[#30ff97] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">
                    <strong className="text-white">Koleje VŠB</strong> - zvýhodněná cena pro účastníky konference
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
