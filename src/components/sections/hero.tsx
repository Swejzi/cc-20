import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Bitcoin symbol background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <svg width="800" height="800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 6.5V17.5M9.5 6.5H13.5C14.8807 6.5 16 7.61929 16 9C16 10.3807 14.8807 11.5 13.5 11.5H9.5M9.5 6.5H7M9.5 11.5V17.5M9.5 11.5H14C15.3807 11.5 16.5 12.6193 16.5 14C16.5 15.3807 15.3807 16.5 14 16.5H9.5M9.5 17.5H7M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fadeIn">
          <span className="text-purple-500">Chain</span>Camp 2026
        </h1>
        <p className="text-2xl md:text-3xl text-gray-300 mb-8 animate-fadeIn animation-delay-200">
          7. ročník legendární akce bitcoinové komunity
        </p>
        <p className="text-xl text-gray-400 mb-12 animate-fadeIn animation-delay-400">
          Aula VŠB, Ostrava - Poruba, 20. - 21. září 2026
        </p>
        
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 mb-12 animate-fadeIn animation-delay-600">
          <Link 
            href="#tickets" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full transition-colors text-lg font-semibold"
          >
            Koupit vstupenku
          </Link>
          <Link 
            href="#schedule" 
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full transition-colors text-lg font-semibold"
          >
            Program konference
          </Link>
        </div>
        
        <div className="mt-16 animate-fadeIn animation-delay-800">
          <p className="text-gray-400 mb-4">Hlavní partneři</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">Trezor</span>
            </div>
            <div className="w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">Alza</span>
            </div>
            <div className="w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">Paralelní Polis</span>
            </div>
            <div className="w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">Braiins</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link href="#about" className="text-white/50 hover:text-white transition-colors">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
