"use client"

import { useEffect, useRef } from "react"
import { VirusNetwork } from "./virus-network"

export function HeroSection() {
  const scrollArrowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollArrowRef.current) {
        const opacity = Math.max(0, 1 - window.scrollY / 300)
        scrollArrowRef.current.style.opacity = String(opacity)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToContent = () => {
    const duvidha = document.querySelector("#duvidha")
    if (duvidha) {
      duvidha.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <VirusNetwork />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Viral outline effect */}
        <div className="relative inline-block">
          <div className="absolute inset-0 blur-3xl opacity-20 bg-foreground rounded-full scale-150" />
          <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl font-bold tracking-wider text-foreground mb-4 relative">
            WHYRUS
          </h1>
        </div>

        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground tracking-widest mb-12">
          Containing The Recursive WHY
        </p>

        <blockquote className="max-w-2xl mx-auto">
          <p className="text-sm sm:text-base text-muted-foreground italic leading-relaxed">
            {'"Of all the many values of science, the greatest must be the freedom to doubt."'}
          </p>
          <cite className="block mt-4 text-xs sm:text-sm text-muted-foreground/70 not-italic">— Richard Feynman</cite>
        </blockquote>
      </div>

      {/* Scroll Arrow */}
      <div
        ref={scrollArrowRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer animate-float"
        onClick={scrollToContent}
      >
        <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
