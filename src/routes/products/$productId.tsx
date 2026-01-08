import { createFileRoute, useRouter } from "@tanstack/react-router"
import type { ProductType } from "../../lib/types"
import { Product } from "../../components/product"
export const Route = createFileRoute("/products/$productId")({
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
	return <Product product={product} />
}
