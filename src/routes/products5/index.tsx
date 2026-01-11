import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import ProductsList from "./-products-list"
import { ProductsSkeleton } from "../../components/product-skelton"
import SearchInput from "./-search-input"
import { z } from "zod"

const SearchShema = z.object({
	q: z.string().optional(),
})

export const Route = createFileRoute("/products5/")({
	component: RouteComponent,
	validateSearch: search => SearchShema.parse(search),
})

function RouteComponent() {
	const { q } = Route.useSearch()
	return (
		<article className="flex-1 w-full p-10 ">
			<p>
				Aqui utilizamos el {"<"}Suspense{">"}, y solo en ProductsList se hace
				uso del useSuspenseQuery.
			</p>
			<div className="flex items-enter justify-between">
				<span className="text-2xl font-bold mb-4">PRODUCTS PAGE</span>
				<SearchInput />
			</div>

			<Suspense
				fallback={<ProductsSkeleton from={"SUSPENSE + useSuspenseQuery"} />}
			>
				<ProductsList q={q} />
			</Suspense>
		</article>
	)
}
