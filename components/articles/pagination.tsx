"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  searchParams?: Record<string, string>
}

export function Pagination({ currentPage, totalPages, baseUrl, searchParams = {} }: PaginationProps) {
  if (totalPages <= 1) return null

  const createUrl = (page: number) => {
    const params = new URLSearchParams({ ...searchParams, page: page.toString() })
    return `${baseUrl}?${params.toString()}`
  }

  const pages = []
  const showPages = 5
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
  let endPage = Math.min(totalPages, startPage + showPages - 1)

  if (endPage - startPage < showPages - 1) {
    startPage = Math.max(1, endPage - showPages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-12">
      {currentPage > 1 && (
        <Link
          href={createUrl(currentPage - 1)}
          className="px-4 py-2 border border-border/50 rounded-lg hover:border-foreground/30 transition-colors text-sm"
        >
          Previous
        </Link>
      )}

      {startPage > 1 && (
        <>
          <Link
            href={createUrl(1)}
            className={cn(
              "px-4 py-2 border border-border/50 rounded-lg hover:border-foreground/30 transition-colors text-sm",
              currentPage === 1 && "bg-foreground/10"
            )}
          >
            1
          </Link>
          {startPage > 2 && <span className="text-muted-foreground">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={createUrl(page)}
          className={cn(
            "px-4 py-2 border border-border/50 rounded-lg hover:border-foreground/30 transition-colors text-sm",
            currentPage === page && "bg-foreground/10 border-foreground/30"
          )}
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-muted-foreground">...</span>}
          <Link
            href={createUrl(totalPages)}
            className={cn(
              "px-4 py-2 border border-border/50 rounded-lg hover:border-foreground/30 transition-colors text-sm",
              currentPage === totalPages && "bg-foreground/10"
            )}
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link
          href={createUrl(currentPage + 1)}
          className="px-4 py-2 border border-border/50 rounded-lg hover:border-foreground/30 transition-colors text-sm"
        >
          Next
        </Link>
      )}
    </nav>
  )
}

