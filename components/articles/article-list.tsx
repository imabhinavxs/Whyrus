"use client"

import Link from "next/link"
import { Article } from "@/lib/types/database.types"
import { cn } from "@/lib/utils"

interface ArticleListProps {
  articles: Article[]
  section: string
}

export function ArticleList({ articles, section }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles found in this section.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/${section}/${article.id}`}
          className="group border border-border/50 rounded-lg p-6 hover:border-foreground/30 transition-all bg-card/20 hover:bg-card/40"
        >
          {article.cover_image && (
            <div className="aspect-video w-full mb-4 rounded-lg overflow-hidden bg-muted">
              <img
                src={article.cover_image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="space-y-2">
            {article.category && (
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {article.category}
              </span>
            )}
            <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
              {article.title}
            </h3>
            {article.excerpt && (
              <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
            )}
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
              <span>{new Date(article.created_at).toLocaleDateString()}</span>
              {article.views > 0 && <span>• {article.views} views</span>}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

