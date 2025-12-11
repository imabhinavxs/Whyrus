import { createClient } from "@/lib/supabase/server"

export default async function CategoriesPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("order", { ascending: true })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold tracking-wide text-foreground mb-2">
          Categories
        </h1>
        <p className="text-muted-foreground">Manage article categories</p>
      </div>

      <div className="border border-border/50 rounded-lg bg-card/30 backdrop-blur-sm overflow-hidden">
        {categories && categories.length > 0 ? (
          <table className="w-full">
            <thead className="border-b border-border/50 bg-card/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Slug</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Section</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Order</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b border-border/30 hover:bg-card/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{category.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground font-mono">{category.slug}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground uppercase">
                    {category.section || "Global"}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{category.order}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        category.active
                          ? "bg-green-500/20 text-green-500"
                          : "bg-gray-500/20 text-gray-500"
                      }`}
                    >
                      {category.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No categories found. Create them in Supabase or add a category management interface.
          </div>
        )}
      </div>

      <div className="mt-6 p-4 border border-border/50 rounded-lg bg-card/30">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> Categories are currently managed through Supabase. To add/edit categories, go to
          Supabase Dashboard → Table Editor → categories table.
        </p>
      </div>
    </div>
  )
}

