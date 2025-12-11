"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { RichTextEditor } from "./rich-text-editor"
import { Article } from "@/lib/types/database.types"

interface ArticleFormProps {
  article?: Article
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [title, setTitle] = useState(article?.title || "")
  const [content, setContent] = useState(article?.content || "")
  const [excerpt, setExcerpt] = useState(article?.excerpt || "")
  const [section, setSection] = useState<"duvidha" | "dvand" | "birha" | "vyangya">(
    article?.section || "duvidha"
  )
  const [category, setCategory] = useState(article?.category || "")
  const [published, setPublished] = useState(article?.published || false)
  const [homepageFeatured, setHomepageFeatured] = useState(article?.homepage_featured || false)
  const [coverImage, setCoverImage] = useState(article?.cover_image || "")
  const [tags, setTags] = useState(article?.tags?.join(", ") || "")

  const [categories, setCategories] = useState<Array<{ id: string; name: string; slug: string }>>([])

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("id, name, slug")
        .eq("active", true)
        .or(`section.eq.${section},section.is.null`)
        .order("order", { ascending: true })

      if (data) {
        setCategories(data)
      }
    }

    fetchCategories()
  }, [section, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required")
      setLoading(false)
      return
    }

    const articleData = {
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt.trim() || null,
      section,
      category: category || null,
      published,
      homepage_featured: homepageFeatured,
      cover_image: coverImage.trim() || null,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      published_at: published && !article?.published_at ? new Date().toISOString() : article?.published_at || null,
    }

    try {
      if (article) {
        // Update existing article
        const { error: updateError } = await supabase
          .from("articles")
          .update(articleData)
          .eq("id", article.id)

        if (updateError) throw updateError
      } else {
        // Create new article
        const { error: insertError } = await supabase.from("articles").insert(articleData)

        if (insertError) throw insertError
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/admin/articles")
        router.refresh()
      }, 1000)
    } catch (err: any) {
      setError(err.message || "An error occurred")
      setLoading(false)
    }
  }

  const sections = [
    { value: "duvidha", label: "DUVIDHA" },
    { value: "dvand", label: "DVAND" },
    { value: "birha", label: "BIRHA" },
    { value: "vyangya", label: "VYANGYA" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/10 text-destructive">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 border border-green-500/50 rounded-lg bg-green-500/10 text-green-500">
          Article {article ? "updated" : "created"} successfully! Redirecting...
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
          Title <span className="text-destructive">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border border-border/50 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          placeholder="Enter article title"
        />
      </div>

      {/* Section */}
      <div>
        <label htmlFor="section" className="block text-sm font-medium text-foreground mb-2">
          Section <span className="text-destructive">*</span>
        </label>
        <select
          id="section"
          value={section}
          onChange={(e) => setSection(e.target.value as any)}
          required
          className="w-full px-4 py-2 border border-border/50 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
        >
          {sections.map((sec) => (
            <option key={sec.value} value={sec.value}>
              {sec.label}
            </option>
          ))}
        </select>
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-foreground mb-2">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-border/50 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          placeholder="Short description or summary"
        />
      </div>

      {/* Content Editor */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Content <span className="text-destructive">*</span>
        </label>
        <RichTextEditor content={content} onChange={setContent} />
      </div>

      {/* Cover Image */}
      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-foreground mb-2">
          Cover Image URL
        </label>
        <input
          id="coverImage"
          type="url"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="w-full px-4 py-2 border border-border/50 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-border/50 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          >
            <option value="">No category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-2">
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 border border-border/50 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
            placeholder="philosophy, doubt, uncertainty"
          />
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4 p-6 border border-border/50 rounded-lg bg-card/30">
        <div className="flex items-center gap-3">
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 border-border/50 rounded focus:ring-2 focus:ring-foreground/20"
          />
          <label htmlFor="published" className="text-sm font-medium text-foreground cursor-pointer">
            Publish this article
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="homepageFeatured"
            type="checkbox"
            checked={homepageFeatured}
            onChange={(e) => setHomepageFeatured(e.target.checked)}
            className="w-4 h-4 border-border/50 rounded focus:ring-2 focus:ring-foreground/20"
          />
          <label htmlFor="homepageFeatured" className="text-sm font-medium text-foreground cursor-pointer">
            Feature on homepage (max 6 per section)
          </label>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={loading || success}
          className="px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : success ? "Saved!" : article ? "Update Article" : "Create Article"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-border/50 rounded-lg hover:border-foreground/30 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

