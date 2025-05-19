import { categoryData } from "@/data/category-data"
import CategoryPageClient from "./CategoryPageClient"

// Cette fonction est nécessaire pour la génération statique avec output: export
export function generateStaticParams() {
  // Retourne un tableau d'objets avec les paramètres pour chaque page statique à générer
  return Object.keys(categoryData).map((slug) => ({
    slug,
  }))
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryPageClient params={params} />
}
