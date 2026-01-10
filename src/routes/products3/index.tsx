import { createFileRoute } from "@tanstack/react-router"
import { productsQueryOptions } from "../../lib/products"
import { ProductsSkeleton } from "../../components/product-skelton"

export const Route = createFileRoute("/products3/")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(productsQueryOptions),
	component: () => import("./index.lazy").then(d => d.Route),
	pendingComponent: PendingComponent,
})

function PendingComponent() {
	return (
		<article className="flex-1 w-full p-10 flex flex-col">
			<p>
				Utilizamos lazy + ensureQueryData en el loader, me aseguro de que cuando
				la ruta sea cargada, tenga los datos. El problema es que bloquea toda la
				ruta hasta que tenga los datos. Es necesario crear un pendingComponent a
				modo de skelton.
			</p>
			<span className="text-2xl font-bold mb-4">PRODUCTS PAGE</span>
			<ProductsSkeleton from="PENDING COMPONENT" />
		</article>
	)
}
