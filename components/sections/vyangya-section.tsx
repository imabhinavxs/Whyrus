"use client"

import { SectionWrapper } from "../section-wrapper"

export function VyangyaSection() {
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
          <div className="border border-border/50 rounded-lg p-8 bg-card/30 backdrop-blur-sm">
            <p className="text-muted-foreground leading-relaxed">
              The hall of satire, cultural criticism, village absurdism, and political irreverence. Where the mirror
              laughs back, and every truth wears the mask of a joke.
            </p>
          </div>

          {/* Satire cards with comic styling */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "The Village Committee", tag: "Bureaucracy" },
              { title: "Development Dreams", tag: "Progress" },
              { title: "The Holy Hypocrite", tag: "Religion" },
              { title: "Electoral Arithmetic", tag: "Politics" },
              { title: "Modern Traditions", tag: "Culture" },
              { title: "The Educated Fool", tag: "Education" },
            ].map((satire, i) => (
              <div
                key={i}
                className="group border-2 border-border/50 rounded-lg p-5 hover:border-foreground/50 transition-all cursor-pointer bg-card/20 relative"
                style={{
                  transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 0.5}deg)`,
                }}
              >
                {/* Comic accent */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-foreground/10 rounded-full" />
                <span className="text-xs font-mono text-muted-foreground/70 uppercase tracking-wider">
                  {satire.tag}
                </span>
                <h4 className="font-serif text-lg font-semibold text-foreground mt-2 group-hover:text-foreground/80 transition-colors">
                  {satire.title}
                </h4>
              </div>
            ))}
          </div>

          {/* Rustic decoration */}
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="w-8 h-px bg-foreground/30" />
            <span className="text-muted-foreground/50 text-2xl">☆</span>
            <div className="w-8 h-px bg-foreground/30" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
