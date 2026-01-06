import { createFileRoute } from "@tanstack/react-router"
import { productsQueryOptions } from "../../lib/products"

export const Route = createFileRoute("/tanstack-query/products")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(productsQueryOptions),
}).lazy(() => import("./products.lazy").then(d => d.Route))
