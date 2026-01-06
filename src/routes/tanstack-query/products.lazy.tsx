import { useSuspenseQuery } from "@tanstack/react-query"
import { createLazyFileRoute } from "@tanstack/react-router"
import { productsQueryOptions } from "../../lib/products"

export const Route = createLazyFileRoute("/tanstack-query/products")({
	component: RouteComponent,
})

function RouteComponent() {
	const productsQuery = useSuspenseQuery(productsQueryOptions)
	const products = productsQuery.data

	return <div>{JSON.stringify(products[0].title)}</div>
}
