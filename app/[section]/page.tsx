import { createClient } from "@/lib/supabase/server"
import { ArticleList } from "@/components/articles/article-list"
import { Pagination } from "@/components/articles/pagination"
import { CategoryFilter } from "@/components/articles/category-filter"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SectionWrapper } from "@/components/section-wrapper"
import { notFound } from "next/navigation"

const ITEMS_PER_PAGE = 12
const SECTIONS = ['duvidha', 'dvand', 'birha', 'vyangya'] as const
const SECTION_NAMES: Record<string, { en: string; hi: string }> = {
  duvidha: { en: 'DUVIDHA', hi: 'दुविधा' },
  dvand: { en: 'DVAND', hi: 'द्वन्द्व' },
  birha: { en: 'BIRHA', hi: 'विरह' },
  vyangya: { en: 'VYANGYA', hi: 'व्यंग्य' },
}

interface PageProps {
  params: Promise<{ section: string }>
  searchParams: Promise<{ page?: string; category?: string }>
}

export async function generateStaticParams() {
  return SECTIONS.map((section) => ({ section }))
}

export default async function SectionPage({ params, searchParams }: PageProps) {
  const { section } = await params
  const search = await searchParams
  const page = parseInt(search.page || '1', 10)
  const category = search.category || null

  if (!SECTIONS.includes(section as any)) {
    notFound()
  }

  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Missing Supabase environment variables!')
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <SectionWrapper id={section} className="relative overflow-hidden">
          <div className="relative">
            <div className="text-center py-12">
              <p className="text-destructive">Configuration Error</p>
              <p className="text-sm text-muted-foreground mt-2">
                Missing Supabase environment variables. Please check your .env.local file.
              </p>
            </div>
          </div>
        </SectionWrapper>
        <Footer />
      </main>
    )
  }

  let supabase
  try {
    supabase = await createClient()
  } catch (clientError) {
    console.error('Error creating Supabase client:', clientError)
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <SectionWrapper id={section} className="relative overflow-hidden">
          <div className="relative">
            <div className="text-center py-12">
              <p className="text-destructive">Connection Error</p>
              <p className="text-sm text-muted-foreground mt-2">
                Failed to connect to database. Please check your Supabase configuration.
              </p>
            </div>
          </div>
        </SectionWrapper>
        <Footer />
      </main>
    )
  }

  const offset = (page - 1) * ITEMS_PER_PAGE

  // Fetch articles
  let articlesQuery = supabase
    .from('articles')
    .select('*', { count: 'exact' })
    .eq('section', section)
    .eq('published', true)
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  if (category) {
    articlesQuery = articlesQuery.eq('category', category)
  }

  let articles, count, error
  try {
    const result = await articlesQuery.range(offset, offset + ITEMS_PER_PAGE - 1)
    articles = result.data
    count = result.count
    error = result.error
  } catch (fetchError) {
    console.error('Error fetching articles:', fetchError)
    error = {
      message: fetchError instanceof Error ? fetchError.message : 'Unknown error',
      details: String(fetchError),
    } as any
    articles = null
    count = 0
  }

  // Fetch categories for this section (both section-specific and global)
  let categories = null
  if (supabase && !error) {
    try {
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .eq('active', true)
        .or(`section.eq.${section},section.is.null`)
        .order('order', { ascending: true })
      categories = categoriesData
    } catch (catError) {
      console.error('Error fetching categories:', catError)
      // Continue without categories if there's an error
    }
  }

  const totalPages = count ? Math.ceil(count / ITEMS_PER_PAGE) : 1

  const sectionInfo = SECTION_NAMES[section] || { en: section.toUpperCase(), hi: '' }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <SectionWrapper id={section} className="relative overflow-hidden">
        <div className="relative">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide mb-4 text-foreground">
              {sectionInfo.en}
            </h1>
            {sectionInfo.hi && (
              <p className="text-xl sm:text-2xl text-muted-foreground font-serif italic mb-4">
                {sectionInfo.hi}
              </p>
            )}
            <div className="w-24 h-px bg-foreground/30 mx-auto mt-8" />
          </div>

          {/* Category Filter */}
          {categories && categories.length > 0 && (
            <CategoryFilter
              categories={categories}
              baseUrl={`/${section}`}
              section={section}
            />
          )}

          {/* Articles List */}
          {error ? (
            <div className="text-center py-12">
              <p className="text-destructive">Error loading articles. Check console for details.</p>
              <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
              <p className="text-xs text-muted-foreground/70 mt-4">
                <strong>Possible issues:</strong><br />
                1. Supabase URL or API key is incorrect<br />
                2. Network connectivity issue<br />
                3. Supabase project might be paused<br />
                4. Database tables might not exist (run the migration SQL)
              </p>
            </div>
          ) : articles && articles.length > 0 ? (
            <>
              <ArticleList articles={articles} section={section} />
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                baseUrl={`/${section}`}
                searchParams={category ? { category } : {}}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found in this section.</p>
              <p className="text-sm text-muted-foreground/70 mt-2">
                Make sure your article has <code className="text-xs bg-card px-1 py-0.5 rounded">published = true</code> in Supabase.
              </p>
            </div>
          )}
        </div>
      </SectionWrapper>
      <Footer />
    </main>
  )
}
