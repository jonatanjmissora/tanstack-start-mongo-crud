import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { productQueryOptions } from '../../lib/products'

export const Route = createFileRoute('/tanstack-query/products/$productId')({
 component: RouteComponent,
})

function RouteComponent() {
	const { productId } = Route.useParams()
  const productQuery = useSuspenseQuery(productQueryOptions(productId))
  const product = productQuery.data
	return (
		<article className="p-10 flex flex-col gap-20  items-center">
			<Link
				to="/tanstack-query/products"
				className="text-lg underline font-bold mr-auto"
			>
				Volver
			</Link>
			<div className={`flex  gap-2 rounded-lg bg-blue-800 p-2 w-1/2 shadow-lg`}>
				<img src={product.image} alt="" className="w-48 h-48 object-contain" />
				<div className="flex-1 flex flex-col justify-between gap-2">
					<h2>{product.title}</h2>
					<p>{product.description}</p>
					<div className="flex justify-between items-center">
						<span>{product.category}</span>
						<span>{product.price}</span>
					</div>
				</div>
			</div>
		</article>
	)
}
