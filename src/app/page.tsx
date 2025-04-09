import { SplashCursor } from "@/components/ui/splash-cursor";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Speakers } from "@/components/sections/speakers";
import { Schedule } from "@/components/sections/schedule";
import { Sponsors } from "@/components/sections/sponsors";
import { Venue } from "@/components/sections/venue";
import { FAQ } from "@/components/sections/faq";
import { Tickets } from "@/components/sections/tickets";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-geist-sans)]">
      {/* Purple and lime fluid background effect */}
      <SplashCursor
        CURL={5}
        SPLAT_RADIUS={0.3}
        SPLAT_FORCE={8000}
        COLOR_UPDATE_SPEED={15}
        BACK_COLOR={{ r: 0.25, g: 0.05, b: 0.4 }} // Dark purple background color
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Speakers />
        <Schedule />
        <Sponsors />
        <Venue />
        <FAQ />
        <Tickets />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
