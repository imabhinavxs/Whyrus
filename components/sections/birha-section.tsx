import Link from "next/link"
import { SectionWrapper } from "../section-wrapper"
import { HomepageFeaturedArticles } from "./homepage-featured-articles"

export function BirhaSection() {
  const placeholderCards = [
    { title: "The Unnamed River", excerpt: "It flows without destination..." },
    { title: "Letters Never Sent", excerpt: "Dear shadow of tomorrow..." },
    { title: "Monsoon Memory", excerpt: "Rain remembers what we forget..." },
    { title: "The Space Between", excerpt: "Neither here nor there exists..." },
  ]
  return (
    <SectionWrapper id="birha" className="relative overflow-hidden">
      {/* Wave animations background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent animate-wave"
            style={{
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${8 + i * 2}s`,
            }}
          />
        ))}
        {/* Dripping question marks effect */}
        <div className="absolute top-0 left-1/4 text-4xl text-foreground/5 animate-drip">?</div>
        <div
          className="absolute top-0 left-1/2 text-6xl text-foreground/5 animate-drip"
          style={{ animationDelay: "1s" }}
        >
          ?
        </div>
        <div
          className="absolute top-0 left-3/4 text-3xl text-foreground/5 animate-drip"
          style={{ animationDelay: "2s" }}
        >
          ?
        </div>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide mb-4 text-foreground">
            BIRHA
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground font-serif italic">विरह</p>
          <div className="w-24 h-px bg-foreground/30 mx-auto mt-8" />
        </div>

        {/* Quote - Nasadiya Sukta */}
        <blockquote className="text-center mb-16 max-w-3xl mx-auto px-4">
          <p className="text-base sm:text-lg text-foreground/80 italic leading-loose font-serif">
            {"\"Whether God's will created it, or whether He was mute;"}
            <br />
            {"Perhaps it formed itself, or perhaps it did not."}
            <br />
            {"The One who is all-pervasive, the knower of all—"}
            <br />
            {"He may know…"}
            <br />
            {'and if even He does not—then no one knows."'}
          </p>
          <cite className="block mt-6 text-sm text-muted-foreground not-italic">— Rig Veda, Nasadiya Sukta</cite>
        </blockquote>

        {/* Content */}
        <div className="space-y-8">
          <div className="border border-border/50 rounded-lg p-8 bg-card/30 backdrop-blur-sm">
            <p className="text-muted-foreground leading-relaxed">
              The river of poetry, longing, nostalgia, drifting, and incomplete emotions. Where words dissolve at their
              edges, and meaning flows like water through fingers.
            </p>
          </div>

          {/* Featured Articles or Placeholder Cards */}
          <HomepageFeaturedArticles 
            section="birha" 
            placeholderCards={placeholderCards}
          />

          {/* Visual river element */}
          <div className="relative h-16 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-foreground/5 to-background" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted-foreground/50 text-sm tracking-[1em]">~ ~ ~ ~ ~</span>
            </div>
          </div>

          {/* View Articles Button */}
          <div className="text-center mt-12">
            <Link
              href="/birha"
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
