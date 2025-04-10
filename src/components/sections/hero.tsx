import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Blockchain blocks background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        {/* Grid of blocks */}
        <div className="grid grid-cols-4 gap-8 transform rotate-12">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className={`w-32 h-32 border-2 ${i % 3 === 0 ? 'border-[#530b6e]' : 'border-[#30ff97]'} opacity-${20 + (i % 4) * 20}`}
            >
              <div className={`w-full h-full ${i % 4 === 0 ? 'bg-[#530b6e]/20' : i % 3 === 0 ? 'bg-[#30ff97]/20' : 'bg-transparent'}`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Bitcoin symbol smaller */}
      <div className="absolute right-10 top-1/4 opacity-20 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 6.5V17.5M9.5 6.5H13.5C14.8807 6.5 16 7.61929 16 9C16 10.3807 14.8807 11.5 13.5 11.5H9.5M9.5 6.5H7M9.5 11.5V17.5M9.5 11.5H14C15.3807 11.5 16.5 12.6193 16.5 14C16.5 15.3807 15.3807 16.5 14 16.5H9.5M9.5 17.5H7M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fadeIn next-block-heading">
          <span className="text-[#530b6e]">CHAIN</span><span className="text-[#30ff97]">CAMP</span> 2026
        </h1>
        <p className="text-2xl md:text-3xl text-gray-300 mb-8 animate-fadeIn animation-delay-200">
          <span className="font-bold tracking-wider">NEXT BLOCK</span> - 7. ročník legendární akce bitcoinové komunity
        </p>
        <p className="text-xl text-gray-400 mb-12 animate-fadeIn animation-delay-400">
          Aula VŠB, Ostrava - Poruba, 20. - 21. září 2026
        </p>

        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 mb-12 animate-fadeIn animation-delay-600">
          <Link
            href="#tickets"
            className="next-block-btn next-block-btn-primary px-8 py-4 text-lg"
          >
            Koupit vstupenku
          </Link>
          <Link
            href="#schedule"
            className="next-block-btn next-block-btn-secondary px-8 py-4 text-lg"
          >
            Program konference
          </Link>
        </div>

        <div className="mt-16 animate-fadeIn animation-delay-800">
          <p className="text-[#30ff97] mb-4 font-medium tracking-wider uppercase">Hlavní partneři</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="w-32 h-16 bg-black next-block-border-purple flex items-center justify-center hover:border-[#30ff97] transition-colors">
              <span className="text-white font-bold">Trezor</span>
            </div>
            <div className="w-32 h-16 bg-black next-block-border-lime flex items-center justify-center hover:border-[#530b6e] transition-colors">
              <span className="text-white font-bold">Alza</span>
            </div>
            <div className="w-32 h-16 bg-black next-block-border-purple flex items-center justify-center hover:border-[#30ff97] transition-colors">
              <span className="text-white font-bold">Paralelní Polis</span>
            </div>
            <div className="w-32 h-16 bg-black next-block-border-lime flex items-center justify-center hover:border-[#530b6e] transition-colors">
              <span className="text-white font-bold">Braiins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll down indicator - block style */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link href="#about" className="block">
          <div className="w-10 h-10 next-block-border-lime relative">
            <div className="absolute inset-0 flex items-center justify-center text-[#30ff97]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
