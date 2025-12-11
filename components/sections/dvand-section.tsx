"use client"

import Link from "next/link"
import { SectionWrapper } from "../section-wrapper"

export function DvandSection() {
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
          <div className="border border-border/50 rounded-lg p-8 bg-card/30 backdrop-blur-sm">
            <p className="text-muted-foreground leading-relaxed">
              The arena of debates, contradictions, arguments, and dialectical clashes. Where thesis meets antithesis,
              and synthesis remains forever elusive.
            </p>
          </div>

          {/* Opposing cards */}
          <div className="grid md:grid-cols-2 gap-0">
            <div className="border-r border-border/30 p-8 text-right">
              <h4 className="font-serif text-lg font-semibold text-foreground mb-4">THESIS</h4>
              <div className="space-y-3">
                <p className="text-muted-foreground">Tradition preserves wisdom</p>
                <p className="text-muted-foreground">Structure enables freedom</p>
                <p className="text-muted-foreground">Faith grounds meaning</p>
              </div>
            </div>
            <div className="p-8 text-left">
              <h4 className="font-serif text-lg font-semibold text-foreground mb-4">ANTITHESIS</h4>
              <div className="space-y-3">
                <p className="text-muted-foreground">Progress requires change</p>
                <p className="text-muted-foreground">Freedom transcends structure</p>
                <p className="text-muted-foreground">Doubt illuminates truth</p>
              </div>
            </div>
          </div>

          {/* Debate topics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Duty vs Desire",
              "Individual vs Collective",
              "Reason vs Emotion",
              "Silence vs Speech",
              "Memory vs Forgetting",
              "Action vs Contemplation",
            ].map((topic, i) => (
              <div
                key={i}
                className="border border-border/30 rounded-lg p-4 text-center hover:border-foreground/30 transition-colors cursor-pointer group"
              >
                <span className="text-foreground/80 group-hover:text-foreground transition-colors">{topic}</span>
              </div>
            ))}
          </div>

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
