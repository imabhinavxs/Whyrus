import Link from "next/link"
import { SectionWrapper } from "../section-wrapper"
import { HomepageFeaturedArticles } from "./homepage-featured-articles"

export function DvandSection() {
  const placeholderCards = [
    { title: "Duty vs Desire" },
    { title: "Individual vs Collective" },
    { title: "Reason vs Emotion" },
    { title: "Silence vs Speech" },
    { title: "Memory vs Forgetting" },
    { title: "Action vs Contemplation" },
  ]
  return (
    <SectionWrapper id="dvand" className="relative overflow-hidden">
      {/* Split-screen grid background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-foreground/10" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-foreground/10" />
        {/* Mirrored fractals */}
        <div className="absolute left-0 top-0 w-1/2 h-full opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-foreground rounded-full" />
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-foreground rounded-full rotate-45" />
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 scale-x-[-1]">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-foreground rounded-full" />
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-foreground rounded-full rotate-45" />
        </div>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide mb-4 text-foreground">
            DVAND
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground font-serif italic">द्वन्द्व</p>
          <div className="w-24 h-px bg-foreground/30 mx-auto mt-8" />
        </div>

        {/* Quote */}
        <blockquote className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-lg sm:text-xl text-foreground/80 italic leading-relaxed font-serif">
            {'"The unexamined life is not worth living."'}
          </p>
          <cite className="block mt-4 text-sm text-muted-foreground not-italic">— Socrates</cite>
        </blockquote>

        {/* Content */}
        <div className="space-y-8">
          {/* Featured Articles or Placeholder Cards */}
          <HomepageFeaturedArticles 
            section="dvand" 
            placeholderCards={placeholderCards}
          />

          {/* View Articles Button */}
          <div className="text-center mt-12">
            <Link
              href="/dvand"
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
