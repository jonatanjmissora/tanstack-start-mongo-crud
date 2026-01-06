import { createFileRoute } from "@tanstack/react-router"
import type { ProductType } from "../lib/types"
import { getProducts } from "../lib/products"
import { Product } from "../components/product"
import Loading from "../components/Loading"
import ErrorComponent from "../components/Error"

export const Route = createFileRoute("/fake-api")({
	component: RouteComponent,
	loader: async () => {
		const products = await getProducts()
		return { products }
	},
	pendingComponent: () => <Loading />,
	errorComponent: () => <ErrorComponent />,
})

function RouteComponent() {
	const { products } = Route.useLoaderData()
	return (
		<article className="flex-1 w-full p-10 ">
			<span className="text-2xl font-bold mb-4">PRODUCTS PAGE</span>

			<div className="flex flex-wrap gap-4 my-10">
				{products.map((product: ProductType) => (
					<Product key={product.id} product={product} />
				))}
			</div>
		</article>
	)
}
