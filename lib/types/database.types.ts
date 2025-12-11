export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string | null
          section: 'duvidha' | 'dvand' | 'birha' | 'vyangya'
          category: string | null
          author_id: string | null
          published: boolean
          featured: boolean
          homepage_featured: boolean
          views: number
          created_at: string
          updated_at: string
          published_at: string | null
          tags: string[] | null
          cover_image: string | null
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt?: string | null
          section: 'duvidha' | 'dvand' | 'birha' | 'vyangya'
          category?: string | null
          author_id?: string | null
          published?: boolean
          featured?: boolean
          homepage_featured?: boolean
          views?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
          tags?: string[] | null
          cover_image?: string | null
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string | null
          section?: 'duvidha' | 'dvand' | 'birha' | 'vyangya'
          category?: string | null
          author_id?: string | null
          published?: boolean
          featured?: boolean
          homepage_featured?: boolean
          views?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
          tags?: string[] | null
          cover_image?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          section: 'duvidha' | 'dvand' | 'birha' | 'vyangya' | null
          description: string | null
          order: number
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          section?: 'duvidha' | 'dvand' | 'birha' | 'vyangya' | null
          description?: string | null
          order?: number
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          section?: 'duvidha' | 'dvand' | 'birha' | 'vyangya' | null
          description?: string | null
          order?: number
          active?: boolean
          created_at?: string
        }
      }
      sections: {
        Row: {
          id: string
          slug: 'duvidha' | 'dvand' | 'birha' | 'vyangya'
          name: string
          description: string | null
          icon: string | null
          order: number
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          slug: 'duvidha' | 'dvand' | 'birha' | 'vyangya'
          name: string
          description?: string | null
          icon?: string | null
          order?: number
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          slug?: 'duvidha' | 'dvand' | 'birha' | 'vyangya'
          name?: string
          description?: string | null
          icon?: string | null
          order?: number
          active?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      section_type: 'duvidha' | 'dvand' | 'birha' | 'vyangya'
    }
  }
}

export type Article = Database['public']['Tables']['articles']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Section = Database['public']['Tables']['sections']['Row']

