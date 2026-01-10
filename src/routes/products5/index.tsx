import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import ProductsList from "./-products-list"
import { ProductsSkeleton } from "../../components/product-skelton"

export const Route = createFileRoute("/products5/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<article className="flex-1 w-full p-10 ">
			<p>
				Aqui utilizamos el {"<"}Suspense{">"}, y solo en ProductsList se hace
				uso del useSuspenseQuery.
			</p>
			<span className="text-2xl font-bold mb-4">PRODUCTS PAGE</span>

			<Suspense
				fallback={<ProductsSkeleton from={"SUSPENSE + useSuspenseQuery"} />}
			>
				<ProductsList />
			</Suspense>
		</article>
	)
}
