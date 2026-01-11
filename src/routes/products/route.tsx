import { createFileRoute, Link, Outlet } from "@tanstack/react-router"
import { useFilteredProducts } from "../../lib/products"
import SearchInput from "../../components/search-input"
import { z } from "zod"

const SearchShema = z.object({
	q: z.string().optional(),
})

export const Route = createFileRoute("/products")({
	component: RouteComponent,
	validateSearch: search => SearchShema.parse(search),
})

function RouteComponent() {
	const { q } = Route.useSearch()
	const { data: products, isLoading } = useFilteredProducts(q)

	return (
		<article className="w-full flex-1 flex">
			<aside className="w-1/3 flex flex-col gap-4 p-10">
				<p>
					Usamos un route.tsx para obtener el outlet y renderizar en la misma
					pagina
				</p>
				<h2 className="text-2xl font-bold">
					Productos ({products?.length || 0})
				</h2>
				<SearchInput />
				{isLoading && <div>Cargando del useQuery...</div>}
				<ul className="flex flex-col gap-2">
					{products?.map(p => (
						<Link
							key={p.id}
							to={`/products/$productId`}
							params={{ productId: String(p.id) }}
							search={{ q }}
							className="truncate"
							activeProps={{ className: "bg-blue-500" }}
						>
							{p.title}
						</Link>
					))}
				</ul>
			</aside>
			<div className="flex-1 w-2/3  p-10">
				<Outlet />
			</div>
		</article>
	)
}
