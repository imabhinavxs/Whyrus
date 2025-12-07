"use client"

import { SectionWrapper } from "../section-wrapper"

export function DuvidhaSection() {
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

          {/* Essay cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "The Weight of Maybe", topic: "On decisions unmade" },
              { title: "Between Two Chairs", topic: "UPSC and the soul" },
              { title: "Probability of Self", topic: "Who am I, statistically?" },
              { title: "The Blur", topic: "When edges dissolve" },
            ].map((essay, i) => (
              <div
                key={i}
                className="group border border-border/30 rounded-lg p-6 hover:border-foreground/30 transition-all cursor-pointer bg-card/20"
              >
                <h4 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-foreground/80 transition-colors">
                  {essay.title}
                </h4>
                <p className="text-sm text-muted-foreground">{essay.topic}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
