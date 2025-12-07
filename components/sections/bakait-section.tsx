"use client"

import { SectionWrapper } from "../section-wrapper"

const bakaits = [
  {
    title: "Pradhan Bakait",
    subtitle: "Prime Minister of Bakaiti",
    description:
      "The chief questioner. The origin of thought-virus strain WHY-001. Philosopher of doubt, chronic overthinker, part-time UPSC rebel, full-time troublemaker.",
  },
  {
    title: "Deputy Bakait",
    subtitle: "Minister of Contradictions",
    description: "Caretaker of DVAND. Responsible for maintaining internal conflict and external confusion.",
  },
  {
    title: "Literary Bakait",
    subtitle: "Minister of Birha & Broken Emotions",
    description: "Custodian of rivers, poems, and unresolved love stories.",
  },
  {
    title: "Satire Bakait",
    subtitle: "Minister of Vyanga Affairs",
    description: "Keeper of sarcasm, roaster of society, inheritor of Parsai's specter.",
  },
  {
    title: "Intern Bakait",
    subtitle: "Junior Minister",
    description: "Responsible for fetching metaphors, filing uncertainties, and deleting certainty.",
  },
]

export function BakaitSection() {
  return (
    <SectionWrapper id="bakaits" className="relative">
      <div className="relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-muted-foreground tracking-widest uppercase mb-4">About The Writers</p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide mb-4 text-foreground">
            THE BAKAIT PARLIAMENT
          </h2>
          <div className="w-24 h-px bg-foreground/30 mx-auto mt-8" />
        </div>

        {/* Cabinet members */}
        <div className="space-y-6">
          {bakaits.map((bakait, i) => (
            <div
              key={i}
              className="group border border-border/50 rounded-lg p-6 sm:p-8 hover:border-foreground/30 transition-all bg-card/20"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                {/* Abstract portrait placeholder */}
                <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-border/50 flex items-center justify-center bg-card/50">
                  {/* Viral network silhouette */}
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-foreground/30" viewBox="0 0 100 100">
                    <circle cx="50" cy="35" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
                    <line x1="50" y1="50" x2="50" y2="75" stroke="currentColor" strokeWidth="1" />
                    <line x1="50" y1="55" x2="30" y2="65" stroke="currentColor" strokeWidth="1" />
                    <line x1="50" y1="55" x2="70" y2="65" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="35" r="3" fill="currentColor" />
                    <circle cx="30" cy="65" r="2" fill="currentColor" />
                    <circle cx="70" cy="65" r="2" fill="currentColor" />
                    <circle cx="50" cy="75" r="2" fill="currentColor" />
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="font-serif text-xl font-bold text-foreground">{bakait.title}</h3>
                    <span className="text-sm font-mono text-muted-foreground">— {bakait.subtitle}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{bakait.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Official stamp decoration */}
        <div className="flex justify-center mt-12">
          <div className="border-2 border-dashed border-foreground/20 rounded-full w-32 h-32 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs text-muted-foreground/70 font-mono">OFFICIAL</p>
              <p className="font-serif font-bold text-foreground/50 text-sm">BAKAIT</p>
              <p className="text-xs text-muted-foreground/70 font-mono">SEAL</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
