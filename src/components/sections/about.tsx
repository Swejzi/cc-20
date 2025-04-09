export function About() {
  return (
    <section id="about" className="py-20 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            O <span className="text-purple-500">konferenci</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-purple-400 mb-6">
              Největší bitcoinová konference v Česku a na Slovensku
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              ChainCamp je legendární konference bitcoinové komunity. Vystupují tady nejvýznamnější speakeři a společnosti z odvětví.
            </p>
            <p className="text-gray-300 mb-6 text-lg">
              Na přednáškách a workshopech předávají dál své znalosti a zkušenosti. ChainCamp propojuje bitcoinery a vrací setkávání do offline světa.
            </p>
            <p className="text-gray-300 mb-6 text-lg">
              Konference je určena jak pro začátečníky, tak pro pokročilé uživatele bitcoinu. Najdete zde přednášky o technických aspektech bitcoinu, ekonomice, bezpečnosti, ale i o praktickém využití v každodenním životě.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">2000+</div>
                <div className="text-gray-400">Účastníků</div>
              </div>
              <div className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">40+</div>
                <div className="text-gray-400">Přednášek</div>
              </div>
              <div className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">30+</div>
                <div className="text-gray-400">Speakerů</div>
              </div>
              <div className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">7.</div>
                <div className="text-gray-400">Ročník</div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20">
            <h3 className="text-2xl font-bold text-purple-400 mb-6">
              Co vás na ChainCampu čeká?
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-6 w-6 mr-3 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-300">
                  <strong className="text-white">Přednášky od expertů</strong> - Naučte se od nejlepších odborníků v oboru
                </span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 mr-3 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-300">
                  <strong className="text-white">Praktické workshopy</strong> - Vyzkoušejte si práci s bitcoinem pod vedením profesionálů
                </span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 mr-3 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-300">
                  <strong className="text-white">Networking</strong> - Seznamte se s dalšími nadšenci a profesionály z bitcoinové komunity
                </span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 mr-3 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-300">
                  <strong className="text-white">Panelové diskuze</strong> - Zapojte se do debat o budoucnosti bitcoinu a kryptoměn
                </span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 mr-3 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-300">
                  <strong className="text-white">Výstava technologií</strong> - Prohlédněte si nejnovější hardware a služby v oblasti bitcoinu
                </span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 mr-3 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-300">
                  <strong className="text-white">Afterparty</strong> - Užijte si neformální setkání s přednášejícími a ostatními účastníky
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
