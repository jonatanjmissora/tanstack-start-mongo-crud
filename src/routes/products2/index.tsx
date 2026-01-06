import { createFileRoute, getRouteApi, Link } from "@tanstack/react-router"
import type { ProductType } from "../products"

const productsRouteApi = getRouteApi("/products2")

export const Route = createFileRoute("/products2/")({
	component: RouteComponent,
})

function RouteComponent() {
	const products2 = productsRouteApi.useLoaderData()
	return (
		<article className="flex-1 w-full p-10 ">
			<span className="text-2xl font-bold mb-4">PRODUCTS PAGE</span>
			<p className="text-lg font-bold mb-4">
				Aca lo hacemos bien, porque hacemos UN solo fetch en
				/products2/route.tsx que lo utilizo como loader solamente, y luego tengo
				el loader disponible para ambos hijos /products2/index.tsx y
				/products2/$product2Id.tsx{" "}
			</p>
			<div className="flex flex-wrap gap-4 my-10">
				{products2.map((product: ProductType) => (
					<Link
						to={`/products2/$product2Id`}
						params={{ product2Id: product.id.toString() }}
						key={product.id}
						className={`flex flex-col gap-2 rounded-lg bg-blue-800 p-2 flex-1 min-w-64 shadow-lg`}
					>
						<img
							src={product.image}
							alt=""
							className="w-full h-48 object-contain"
						/>
						<div className="flex-1 flex flex-col justify-between gap-2">
							<h2>{product.title}</h2>
							<div className="flex justify-between items-center">
								<span>{product.category}</span>
								<span>{product.price}</span>
							</div>
						</div>
					</Link>
				))}
			</div>
		</article>
	)
}
