import { createLazyFileRoute } from "@tanstack/react-router"
import { useSuspenseFilteredProducts } from "../../lib/products"
import type { ProductType } from "../../lib/types"
import { Product } from "../../components/product"
import SearchInput from "./-search-input"

export const Route = createLazyFileRoute("/products3/")({
	component: RouteComponent,
})

function RouteComponent() {
	const { q } = Route.useSearch()
	const products = useSuspenseFilteredProducts(q).data

	return (
		<article className="flex-1 w-full p-10 ">
			<p>
				Utilizamos lazy + ensureQueryData en el loader, me aseguro de que cuando
				la ruta sea cargada, tenga los datos. El problema es que bloquea toda la
				ruta hasta que tenga los datos. Es necesario crear un pendingComponent a
				modo de skelton.
			</p>
			<div className="flex items-enter justify-between">
				<span className="text-2xl font-bold mb-4">PRODUCTS PAGE</span>
				<SearchInput />
			</div>

			<div className="flex flex-wrap gap-4 my-10">
				{products.map((product: ProductType) => (
					<Product key={product.id} product={product} />
				))}
			</div>
		</article>
	)
}
