import { createFileRoute, Link } from "@tanstack/react-router"
import type { ProductType } from ".."

export const Route = createFileRoute("/products/$productId/")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const allProducts = await fetch(`https://fakestoreapi.com/products`)
		const products = (await allProducts.json()) as ProductType[]
		const product = products.find(
			(product: ProductType) => product.id === Number(params.productId)
		)
		if (!product) {
			throw new Error("Product not found")
		}
		const productsByCategory = products.filter(
			(productByCategory: ProductType) =>
				productByCategory.category === product.category &&
				productByCategory.id !== product.id
		)
		return { product, productsByCategory }
	},
	pendingComponent: () => <div>Loading products...</div>,
	errorComponent: () => <div>Error loading productos</div>,
})

function RouteComponent() {
	const { product, productsByCategory } = Route.useLoaderData()
	return (
		<article className="p-10 flex flex-col gap-20  items-center">
			<Link to="/products" className="text-lg underline font-bold mr-auto">
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
							to={`/products/$productId`}
							params={{ productId: product.id.toString() }}
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
