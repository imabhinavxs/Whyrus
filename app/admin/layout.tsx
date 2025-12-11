import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNavigation } from "@/components/admin/admin-navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If no user, redirect to login
  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      <main className="pt-16">{children}</main>
    </div>
  )
}

