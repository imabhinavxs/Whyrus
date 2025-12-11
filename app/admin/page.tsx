import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get article statistics
  const { count: totalArticles } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true })

  const { count: publishedArticles } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("published", true)

  const { count: draftArticles } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("published", false)

  const { count: featuredArticles } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("homepage_featured", true)

  // Get recent articles
  const { data: recentArticles } = await supabase
    .from("articles")
    .select("id, title, section, published, created_at")
    .order("created_at", { ascending: false })
    .limit(5)

  const stats = [
    { label: "Total Articles", value: totalArticles || 0, color: "text-foreground" },
    { label: "Published", value: publishedArticles || 0, color: "text-green-500" },
    { label: "Drafts", value: draftArticles || 0, color: "text-yellow-500" },
    { label: "Featured", value: featuredArticles || 0, color: "text-blue-500" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold tracking-wide text-foreground mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground">Manage your content and articles</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border border-border/50 rounded-lg p-6 bg-card/30 backdrop-blur-sm"
          >
            <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/articles/new"
            className="px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium"
          >
            + New Article
          </Link>
          <Link
            href="/admin/articles"
            className="px-6 py-3 border border-border/50 rounded-lg hover:border-foreground/30 transition-colors font-medium"
          >
            Manage Articles
          </Link>
          <Link
            href="/admin/categories"
            className="px-6 py-3 border border-border/50 rounded-lg hover:border-foreground/30 transition-colors font-medium"
          >
            Manage Categories
          </Link>
        </div>
      </div>

      {/* Recent Articles */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Recent Articles</h2>
        <div className="border border-border/50 rounded-lg bg-card/30 backdrop-blur-sm overflow-hidden">
          {recentArticles && recentArticles.length > 0 ? (
            <table className="w-full">
              <thead className="border-b border-border/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Section</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Created</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentArticles.map((article) => (
                  <tr key={article.id} className="border-b border-border/30 hover:bg-card/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground">{article.title}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground uppercase">{article.section}</td>
                    <td className="px-6 py-4 text-sm">
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
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(article.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className="text-foreground hover:text-foreground/80 transition-colors"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No articles yet. <Link href="/admin/articles/new" className="text-foreground hover:underline">Create your first article</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

