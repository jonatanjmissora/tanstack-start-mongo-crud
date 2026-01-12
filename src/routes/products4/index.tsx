import { createFileRoute } from "@tanstack/react-router"
import {
	productsQueryOptions,
	useSuspenseFilteredProducts,
} from "../../lib/products"
import type { ProductType } from "../../lib/types"
import { Product } from "../../components/product"
import { ProductsSkeleton } from "../../components/product-skelton"
import { z } from "zod"
import SearchInput from "./-search-input"

const SearchShema = z.object({
	q: z.string().optional(),
})

export const Route = createFileRoute("/products4/")({
	validateSearch: search => SearchShema.parse(search),
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(productsQueryOptions),
	component: RouteComponent,
	pendingComponent: PendingComponent,
})

function RouteComponent() {
	const { q } = Route.useSearch()
	const products = useSuspenseFilteredProducts(q).data
	return (
		<ComponentContainer>
			<div className="flex flex-wrap gap-4 my-10">
				{products.map((product: ProductType) => (
					<Product key={product.id} product={product} />
				))}
			</div>
		</ComponentContainer>
	)
}

function PendingComponent() {
	return (
		<ComponentContainer>
			<ProductsSkeleton from="PENDING COMPONENT" />
		</ComponentContainer>
	)
}

const ComponentContainer = ({ children }: { children?: React.ReactNode }) => {
	return (
		<article className="flex-1 w-full p-10 flex flex-col pag-4">
			<p>
				Uso todo en un unico componente, pero tengo que hacer la logica tanto
				para el RouteComponent como para el PendingComponent, ya que la pagina
				esta bloqueada hasta que se carguen los datos.
			</p>
			<div className="flex items-enter justify-between">
				<span className="text-2xl font-bold mb-4">PRODUCTS PAGE</span>
				<SearchInput />
			</div>

			{children}
		</article>
	)
}
