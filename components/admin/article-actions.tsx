"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface ArticleActionsProps {
  articleId: string
  section: string
}

export function ArticleActions({ articleId, section }: ArticleActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      return
    }

    setLoading(true)
    const supabase = createClient()

    const { error } = await supabase.from("articles").delete().eq("id", articleId)

    if (error) {
      alert("Error deleting article: " + error.message)
      setLoading(false)
      return
    }

    router.refresh()
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/admin/articles/${articleId}`}
        className="text-sm text-foreground hover:text-foreground/80 transition-colors"
      >
        Edit
      </Link>
      <Link
        href={`/${section}/${articleId}`}
        target="_blank"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        View
      </Link>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-sm text-destructive hover:text-destructive/80 transition-colors disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  )
}

