import Link from "next/link"
import { SectionWrapper } from "../section-wrapper"
import { HomepageFeaturedArticles } from "./homepage-featured-articles"

export function DuvidhaSection() {
  const placeholderCards = [
    { title: "The Weight of Maybe", topic: "On decisions unmade" },
    { title: "Between Two Chairs", topic: "UPSC and the soul" },
    { title: "Probability of Self", topic: "Who am I, statistically?" },
    { title: "The Blur", topic: "When edges dissolve" },
  ]
  return (
    <SectionWrapper id="duvidha" className="relative overflow-hidden">
      {/* Unstable lines background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-pulse-slow"
            style={{
              top: `${15 + i * 12}%`,
              left: "-10%",
              right: "-10%",
              animationDelay: `${i * 0.5}s`,
              transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (Math.random() * 2)}deg)`,
            }}
          />
        ))}
      </div>

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide mb-4 text-foreground">
            DUVIDHA
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground font-serif italic">दुविधा</p>
          <div className="w-24 h-px bg-foreground/30 mx-auto mt-8" />
        </div>

        {/* Subheader */}
        <h3 className="text-2xl sm:text-3xl font-serif text-center mb-12 text-foreground/90">
          How Certain is Uncertainty?
        </h3>

        {/* Content placeholder */}
        <div className="space-y-8">
          <div className="border border-border/50 rounded-lg p-8 bg-card/30 backdrop-blur-sm">
            <p className="text-muted-foreground leading-relaxed">
              This hall contains essays of existential doubt, UPSC angst, ambiguity, and philosophical wandering. Here,
              certainty is the enemy, and every answer births a thousand questions.
            </p>
          </div>

          {/* Waveform visualization */}
          <div className="flex items-center justify-center gap-1 py-8">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-foreground/30 rounded-full animate-pulse"
                style={{
                  height: `${20 + Math.sin(i * 0.3) * 20 + Math.random() * 10}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          {/* Featured Articles or Placeholder Cards */}
          <HomepageFeaturedArticles 
            section="duvidha" 
            placeholderCards={placeholderCards}
          />

          {/* View Articles Button */}
          <div className="text-center mt-12">
            <Link
              href="/duvidha"
              className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/30 rounded-lg hover:bg-foreground/10 transition-colors text-foreground font-medium"
            >
              View All Articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
