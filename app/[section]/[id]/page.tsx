import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SectionWrapper } from "@/components/section-wrapper"
import { notFound } from "next/navigation"
import Link from "next/link"

interface PageProps {
  params: Promise<{ section: string; id: string }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { section, id } = await params
  const supabase = await createClient()

  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .eq('section', section)
    .eq('published', true)
    .single()

  if (error || !article) {
    notFound()
  }

  // Increment view count (fire and forget)
  supabase
    .from('articles')
    .update({ views: (article.views || 0) + 1 })
    .eq('id', id)
    .then()

  const SECTION_NAMES: Record<string, { en: string; hi: string }> = {
    duvidha: { en: 'DUVIDHA', hi: 'दुविधा' },
    dvand: { en: 'DVAND', hi: 'द्वन्द्व' },
    birha: { en: 'BIRHA', hi: 'विरह' },
    vyangya: { en: 'VYANGYA', hi: 'व्यंग्य' },
  }

  const sectionInfo = SECTION_NAMES[section] || { en: section.toUpperCase(), hi: '' }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <SectionWrapper className="relative">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href={`/${section}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {sectionInfo.en}
          </Link>

          {/* Article Header */}
          <article className="space-y-8">
            <header className="space-y-4">
              {article.category && (
                <span className="inline-block text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  {article.category}
                </span>
              )}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide text-foreground">
                {article.title}
              </h1>
              {article.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {article.excerpt}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border/50">
                <span>{new Date(article.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                {article.views > 0 && <span>• {article.views} views</span>}
              </div>
            </header>

            {/* Cover Image */}
            {article.cover_image && (
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted">
                <img
                  src={article.cover_image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div
              className="prose prose-invert max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-foreground prose-a:underline prose-strong:text-foreground prose-code:text-foreground"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-8 border-t border-border/50">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono border border-border/50 rounded-full text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        </div>
      </SectionWrapper>
      <Footer />
    </main>
  )
}

