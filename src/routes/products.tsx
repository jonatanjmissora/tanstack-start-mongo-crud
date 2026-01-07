import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import { productsQueryOptions, useFilteredProducts } from "../lib/products"
import SearchInput from "../components/search-input"

export const Route = createFileRoute("/products")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(productsQueryOptions),

  validateSearch: z.object({
    q: z.string().optional(),
  }),
  component: ProductsPage,
})

function ProductsPage() {
    const { q } = Route.useSearch()
  const { data: products, isLoading } = useFilteredProducts(q)

  if (isLoading) return <div>Cargando...</div>

  return (
    <article className="w-full flex-1 p-10 flex flex-col gap-4">
    <h2 className="text-2xl font-bold">Productos</h2>
    <SearchInput />
    <ul className="flex flex-col gap-2">
      {products?.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  </article>
  )
}

export default ProductsPage