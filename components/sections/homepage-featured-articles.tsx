import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Article } from "@/lib/types/database.types"

interface HomepageFeaturedArticlesProps {
  section: 'duvidha' | 'dvand' | 'birha' | 'vyangya'
  placeholderCards: Array<{ title: string; topic?: string; excerpt?: string; tag?: string }>
}

export async function HomepageFeaturedArticles({ section, placeholderCards }: HomepageFeaturedArticlesProps) {
  const supabase = await createClient()

  // Fetch up to 6 featured articles for homepage
  const { data: articles } = await supabase
    .from('articles')
    .select('id, title, excerpt, section, category')
    .eq('section', section)
    .eq('published', true)
    .eq('homepage_featured', true)
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(6)

  // If we have real articles, show them. Otherwise, show placeholders
  const hasArticles = articles && articles.length > 0
  const displayItems = hasArticles 
    ? articles.slice(0, 6)
    : placeholderCards.slice(0, 6)

  if (section === 'duvidha') {
    // 2-column grid layout for Duvidha
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {displayItems.map((item, i) => {
          if (hasArticles && 'id' in item) {
            const article = item as Article
            return (
              <Link
                key={article.id}
                href={`/${section}/${article.id}`}
                className="group border border-border/30 rounded-lg p-6 hover:border-foreground/30 transition-all cursor-pointer bg-card/20"
              >
                <h4 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-foreground/80 transition-colors">
                  {article.title}
                </h4>
                {article.excerpt && (
                  <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                )}
              </Link>
            )
          }

          const placeholder = item as typeof placeholderCards[0]
          return (
            <div
              key={i}
              className="group border border-border/30 rounded-lg p-6 hover:border-foreground/30 transition-all cursor-pointer bg-card/20"
            >
              <h4 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-foreground/80 transition-colors">
                {placeholder.title}
              </h4>
              {(placeholder.topic || placeholder.excerpt) && (
                <p className="text-sm text-muted-foreground">{placeholder.topic || placeholder.excerpt}</p>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  if (section === 'dvand') {
    // 3-column grid layout for Dvand (debate topics)
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayItems.map((item, i) => {
          if (hasArticles && 'id' in item) {
            const article = item as Article
            return (
              <Link
                key={article.id}
                href={`/${section}/${article.id}`}
                className="border border-border/30 rounded-lg p-4 text-center hover:border-foreground/30 transition-colors cursor-pointer group"
              >
                <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                  {article.title}
                </span>
              </Link>
            )
          }

          const placeholder = item as typeof placeholderCards[0]
          return (
            <div
              key={i}
              className="border border-border/30 rounded-lg p-4 text-center hover:border-foreground/30 transition-colors cursor-pointer group"
            >
              <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                {placeholder.title}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  if (section === 'birha') {
    // 2-column grid with special styling for Birha
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {displayItems.map((item, i) => {
          if (hasArticles && 'id' in item) {
            const article = item as Article
            return (
              <Link
                key={article.id}
                href={`/${section}/${article.id}`}
                className="group border border-border/30 rounded-lg p-6 hover:border-foreground/20 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="font-serif text-lg font-semibold text-foreground mb-3 relative">
                  {article.title}
                </h4>
                {article.excerpt && (
                  <p className="text-sm text-muted-foreground italic relative">{article.excerpt}</p>
                )}
              </Link>
            )
          }

          const placeholder = item as typeof placeholderCards[0]
          return (
            <div
              key={i}
              className="group border border-border/30 rounded-lg p-6 hover:border-foreground/20 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h4 className="font-serif text-lg font-semibold text-foreground mb-3 relative">
                {placeholder.title}
              </h4>
              {(placeholder.excerpt || placeholder.topic) && (
                <p className="text-sm text-muted-foreground italic relative">
                  {placeholder.excerpt || placeholder.topic}
                </p>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  if (section === 'vyangya') {
    // 3-column grid with comic styling for Vyangya
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayItems.map((item, i) => {
          if (hasArticles && 'id' in item) {
            const article = item as Article
            return (
              <Link
                key={article.id}
                href={`/${section}/${article.id}`}
                className="group border-2 border-border/50 rounded-lg p-5 hover:border-foreground/50 transition-all cursor-pointer bg-card/20 relative"
                style={{
                  transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 0.5}deg)`,
                }}
              >
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-foreground/10 rounded-full" />
                {article.category && (
                  <span className="text-xs font-mono text-muted-foreground/70 uppercase tracking-wider">
                    {article.category}
                  </span>
                )}
                <h4 className="font-serif text-lg font-semibold text-foreground mt-2 group-hover:text-foreground/80 transition-colors">
                  {article.title}
                </h4>
              </Link>
            )
          }

          // Placeholder handling for Vyangya - it has both title and tag
          const placeholder = item as typeof placeholderCards[0]
          const placeholderWithTag = placeholder as { title: string; tag?: string }
          return (
            <div
              key={i}
              className="group border-2 border-border/50 rounded-lg p-5 hover:border-foreground/50 transition-all cursor-pointer bg-card/20 relative"
              style={{
                transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 0.5}deg)`,
              }}
            >
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-foreground/10 rounded-full" />
              {placeholderWithTag.tag && (
                <span className="text-xs font-mono text-muted-foreground/70 uppercase tracking-wider">
                  {placeholderWithTag.tag}
                </span>
              )}
              <h4 className="font-serif text-lg font-semibold text-foreground mt-2 group-hover:text-foreground/80 transition-colors">
                {placeholder.title}
              </h4>
            </div>
          )
        })}
      </div>
    )
  }

  return null
}
