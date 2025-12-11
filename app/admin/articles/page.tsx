import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { ArticleFilters } from "@/components/admin/article-filters"
import { ArticleActions } from "@/components/admin/article-actions"

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string; published?: string }>
}) {
  const supabase = await createClient()
  const params = await searchParams

  let query = supabase.from("articles").select("*").order("created_at", { ascending: false })

  // Apply filters
  if (params.section) {
    query = query.eq("section", params.section)
  }

  if (params.published === "true") {
    query = query.eq("published", true)
  } else if (params.published === "false") {
    query = query.eq("published", false)
  }

  const { data: articles } = await query

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl font-bold tracking-wide text-foreground mb-2">
            Articles
          </h1>
          <p className="text-muted-foreground">Manage all your articles</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium"
        >
          + New Article
        </Link>
      </div>

      {/* Filters */}
      <ArticleFilters />

      {/* Articles Table */}
      <div className="border border-border/50 rounded-lg bg-card/30 backdrop-blur-sm overflow-hidden">
        {articles && articles.length > 0 ? (
          <table className="w-full">
            <thead className="border-b border-border/50 bg-card/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Section</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Featured</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Created</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-border/30 hover:bg-card/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{article.title}</div>
                    {article.excerpt && (
                      <div className="text-sm text-muted-foreground line-clamp-1 mt-1">{article.excerpt}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground uppercase">{article.section}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        article.published
                          ? "bg-green-500/20 text-green-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {article.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {article.homepage_featured ? (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-500">
                        Featured
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(article.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <ArticleActions articleId={article.id} section={article.section} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No articles found.{" "}
            <Link href="/admin/articles/new" className="text-foreground hover:underline">
              Create your first article
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

