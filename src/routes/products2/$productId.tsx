import { createFileRoute, Link, useRouter } from "@tanstack/react-router"
import type { ProductType } from "../../lib/types"
import { Product } from "../../components/product"
import { z } from "zod"

const SearchShema = z.object({
	q: z.string().optional(),
})

export const Route = createFileRoute("/products2/$productId")({
	component: RouteComponent,
	validateSearch: search => SearchShema.parse(search),
})

function RouteComponent() {
	const { productId } = Route.useParams()
	const { q } = Route.useSearch()
	const router = useRouter()
	const { queryClient } = router.options.context
	const products = queryClient.getQueryData(["products"]) as
		| ProductType[]
		| undefined
	const product = products?.find(p => String(p.id) === productId)
	return (
		<article className="w-full flex-1 flex items-center p-10 flex-col gap-4">
			<Link to="/products2" search={{ q }} className="underline mr-auto text-lg font-semibold">
				Volver
			</Link>
			<div className="w-1/2 h-max">
				<Product product={product} />
			</div>
		</article>
	)
}
