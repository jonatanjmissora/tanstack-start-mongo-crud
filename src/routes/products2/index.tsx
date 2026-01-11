import { createFileRoute, Link } from "@tanstack/react-router"
import { useFilteredProducts } from "../../lib/products"
import { z } from "zod"
import SearchInput2 from "../../components/search-input2"

const SearchShema = z.object({
	q: z.string().optional(),
})

export const Route = createFileRoute("/products2/")({
	component: RouteComponent,
	validateSearch: search => SearchShema.parse(search),
})

function RouteComponent() {
	const { q } = Route.useSearch()
	const { data: products, isLoading } = useFilteredProducts(q)

	return (
		<article className="w-full flex-1 flex">
			<aside className="w-1/3 flex flex-col gap-4 p-10">
				<p>Usamos un index.tsx para renderizar en otra pagina</p>
				<h2 className="text-2xl font-bold">
					Productos ({products?.length || 0})
				</h2>
				<SearchInput2 />
				{isLoading && <div>Cargando del useQuery...</div>}
				<ul className="flex flex-col gap-2">
					{products?.map(p => (
						<Link
							key={p.id}
							to={`/products2/$productId`}
							params={{ productId: String(p.id) }}
							search={{ q }}
							className="truncate"
						>
							{p.title}
						</Link>
					))}
				</ul>
			</aside>
		</article>
	)
}
