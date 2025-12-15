import Link from "next/link"
import { SectionWrapper } from "../section-wrapper"
import { HomepageFeaturedArticles } from "./homepage-featured-articles"

export function VyangyaSection() {
  const placeholderCards = [
    { title: "The Village Committee", tag: "Bureaucracy" },
    { title: "Development Dreams", tag: "Progress" },
    { title: "The Holy Hypocrite", tag: "Religion" },
    { title: "Electoral Arithmetic", tag: "Politics" },
    { title: "Modern Traditions", tag: "Culture" },
    { title: "The Educated Fool", tag: "Education" },
  ]
  return (
    <SectionWrapper id="vyangya" className="relative overflow-hidden">
      {/* Comic-style background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Jagged lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <pattern id="zigzag" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20 L10 10 L20 20 L30 10 L40 20" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#zigzag)" />
        </svg>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide mb-4 text-foreground">
            VYANGYA
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground font-serif italic">व्यंग्य</p>
          <div className="w-24 h-px bg-foreground/30 mx-auto mt-8" />
        </div>

        {/* Quote - Harishankar Parsai */}
        <blockquote className="text-center mb-16 max-w-3xl mx-auto px-4">
          <p className="text-base sm:text-lg text-foreground/80 italic leading-relaxed font-serif">
            {'"व्यंग्य हमेशा जवाब नहीं देता—'}
            <br />
            {'कभी-कभी सिर्फ़ सवाल को नंगा कर देता है।"'}
          </p>
          <cite className="block mt-6 text-sm text-muted-foreground not-italic">— हरिशंकर परसाई</cite>
        </blockquote>

        {/* Content */}
        <div className="space-y-8">
          {/* Featured Articles or Placeholder Cards */}
          <HomepageFeaturedArticles 
            section="vyangya" 
            placeholderCards={placeholderCards}
          />

          {/* Rustic decoration */}
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="w-8 h-px bg-foreground/30" />
            <span className="text-muted-foreground/50 text-2xl">☆</span>
            <div className="w-8 h-px bg-foreground/30" />
          </div>

          {/* View Articles Button */}
          <div className="text-center mt-12">
            <Link
              href="/vyangya"
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
