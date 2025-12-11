"use client"

import { useRouter, useSearchParams } from "next/navigation"

export function ArticleFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const sections = [
    { value: "duvidha", label: "DUVIDHA" },
    { value: "dvand", label: "DVAND" },
    { value: "birha", label: "BIRHA" },
    { value: "vyangya", label: "VYANGYA" },
  ]

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/admin/articles?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        defaultValue={searchParams.get("section") || ""}
        onChange={(e) => updateFilter("section", e.target.value)}
        className="px-4 py-2 border border-border/50 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
      >
        <option value="">All Sections</option>
        {sections.map((section) => (
          <option key={section.value} value={section.value}>
            {section.label}
          </option>
        ))}
      </select>

      <select
        defaultValue={searchParams.get("published") || ""}
        onChange={(e) => updateFilter("published", e.target.value)}
        className="px-4 py-2 border border-border/50 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
      >
        <option value="">All Status</option>
        <option value="true">Published</option>
        <option value="false">Draft</option>
      </select>
    </div>
  )
}

