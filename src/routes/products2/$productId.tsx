import { createFileRoute, Link, useRouter } from "@tanstack/react-router"
import type { ProductType } from "../../lib/types"
import { Product } from "../../components/product"
export const Route = createFileRoute("/products2/$productId")({
	component: RouteComponent,
})

function RouteComponent() {
	const { productId } = Route.useParams()
	const router = useRouter()
	const { queryClient } = router.options.context
	const products = queryClient.getQueryData(["products"]) as
		| ProductType[]
		| undefined
	const product = products?.find(p => String(p.id) === productId)
	return (
		<article className="w-full flex-1 flex items-center p-10 flex-col gap-4">
			<Link to="/products2" className="underline mr-auto text-lg font-semibold">
				Volver
			</Link>
			<div className="w-1/2 h-max">
				<Product product={product} />
			</div>
		</article>
	)
}
