import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ArticleForm } from "@/components/admin/article-form"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !article) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold tracking-wide text-foreground mb-2">
          Edit Article
        </h1>
        <p className="text-muted-foreground">Edit your article</p>
      </div>

      <ArticleForm article={article} />
    </div>
  )
}

