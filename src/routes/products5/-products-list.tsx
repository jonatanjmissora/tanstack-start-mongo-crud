import { useSuspenseQuery } from "@tanstack/react-query"
import { Product } from "../../components/product"
import type { ProductType } from "../../lib/types"
import { productsQueryOptions } from "../../lib/products"
import { Link } from "@tanstack/react-router"

export default function ProductsList({ q }: { q?: string }) {
	const products = useSuspenseQuery(productsQueryOptions).data
	const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(q?.toLowerCase() || ""))

	return (
		<div className="flex flex-wrap gap-4 my-10">
			{filteredProducts.map((product: ProductType) => (
				<Link
					key={product.id}
					to="/products5/$productId"
					params={{ productId: String(product.id) }}
					search={{ q }}
				>
					<Product product={product} />
				</Link>
			))}
		</div>
	)
}
