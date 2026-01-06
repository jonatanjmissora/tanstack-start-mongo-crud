import { createFileRoute, getRouteApi, Link } from "@tanstack/react-router"
import type { ProductType } from "../products"

const productsRouteApi = getRouteApi("/products2")

export const Route = createFileRoute("/products2/$product2Id")({
	component: RouteComponent,
})

function RouteComponent() {
	const { product2Id: productId } = Route.useParams()
	const products = productsRouteApi.useLoaderData()

	const product = products.find(p => p.id === Number(productId))

	if (!product) return <p>Producto No encontrado</p>

	const productsByCategory = products.filter(
		(productByCategory: ProductType) =>
			productByCategory.category === product.category &&
			productByCategory.id !== product.id
	)

	return (
		<article className="p-10 flex flex-col gap-20  items-center">
			<Link to="/products2" className="text-lg underline font-bold mr-auto">
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
			<div>
				<span className="text-2xl font-bold mb-4">RECOMMENDED</span>
				<div className="flex flex-wrap gap-4 my-10">
					{productsByCategory.map((product: ProductType) => (
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
			</div>
		</article>
	)
}
