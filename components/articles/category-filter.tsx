"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Category } from "@/lib/types/database.types"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  categories: (Category | null)[]
  baseUrl: string
  section: string
}

export function CategoryFilter({ categories, baseUrl, section }: CategoryFilterProps) {
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category")

  if (categories.length === 0) return null

  const validCategories = categories.filter((cat): cat is Category => cat !== null)

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link
        href={baseUrl}
        className={cn(
          "px-4 py-2 border border-border/50 rounded-lg text-sm transition-colors",
          !currentCategory
            ? "bg-foreground/10 border-foreground/30 text-foreground"
            : "hover:border-foreground/30 text-muted-foreground"
        )}
      >
        All
      </Link>
      {validCategories.map((category) => (
        <Link
          key={category.id}
          href={`${baseUrl}?category=${category.slug}`}
          className={cn(
            "px-4 py-2 border border-border/50 rounded-lg text-sm transition-colors",
            currentCategory === category.slug
              ? "bg-foreground/10 border-foreground/30 text-foreground"
              : "hover:border-foreground/30 text-muted-foreground"
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}

