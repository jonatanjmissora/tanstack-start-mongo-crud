import { useSuspenseQuery } from "@tanstack/react-query"
import { createLazyFileRoute } from "@tanstack/react-router"
import { productsQueryOptions } from "../../lib/products"
import { ProductWithTanStackQuery } from "../../components/product-with-tanstack-query"
import type { ProductType } from "../../lib/types"

export const Route = createLazyFileRoute("/tanstack-query/products")({
	component: RouteComponent,
})

function RouteComponent() {
	const productsQuery = useSuspenseQuery(productsQueryOptions)
	const products = productsQuery.data

	return (
	<article className="flex-1 w-full p-10 ">
				<span className="text-2xl font-bold mb-4">PRODUCTS PAGE</span>
	
				<div className="flex flex-wrap gap-4 my-10">
					{products.map((product: ProductType) => (
						<ProductWithTanStackQuery key={product.id} product={product} />
					))}
				</div>
			</article>
	)
}
