import { useSuspenseQuery } from "@tanstack/react-query"
import { Product } from "../../components/product"
import type { ProductType } from "../../lib/types"
import { productsQueryOptions } from "../../lib/products"
import { Link } from "@tanstack/react-router"

export default function ProductsList() {
	const products = useSuspenseQuery(productsQueryOptions).data

	return (
		<div className="flex flex-wrap gap-4 my-10">
			{products.map((product: ProductType) => (
				<Link
					key={product.id}
					to="/products4/$productId"
					params={{ productId: String(product.id) }}
				>
					<Product product={product} />
				</Link>
			))}
		</div>
	)
}
