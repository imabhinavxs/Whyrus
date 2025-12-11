import { ArticleForm } from "@/components/admin/article-form"

export default function NewArticlePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold tracking-wide text-foreground mb-2">
          New Article
        </h1>
        <p className="text-muted-foreground">Create a new article</p>
      </div>

      <ArticleForm />
    </div>
  )
}

