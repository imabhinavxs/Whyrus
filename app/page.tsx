import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { DuvidhaSection } from "@/components/sections/duvidha-section"
import { DvandSection } from "@/components/sections/dvand-section"
import { BirhaSection } from "@/components/sections/birha-section"
import { VyangyaSection } from "@/components/sections/vyangya-section"
import { BakaitSection } from "@/components/sections/bakait-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <DuvidhaSection />
      <DvandSection />
      <BirhaSection />
      <VyangyaSection />
      <BakaitSection />
      <Footer />
    </main>
  )
}
