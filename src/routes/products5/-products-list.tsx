import { Product } from "../../components/product"
import type { ProductType } from "../../lib/types"
import { useSuspenseFilteredProducts } from "../../lib/products"
import { Link } from "@tanstack/react-router"

export default function ProductsList({ q }: { q?: string }) {
	const products = useSuspenseFilteredProducts(q).data

	return (
		<div className="flex flex-wrap gap-4 my-10">
			{products.map((product: ProductType) => (
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
