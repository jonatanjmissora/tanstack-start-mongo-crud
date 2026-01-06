import { createFileRoute } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"

export type ProductType = {
	id: number
	title: string
	price: number
	description: string
	category: string
	image: string
}

export const Route = createFileRoute("/products/")({
	component: RouteComponent,
	loader: async () => {
		const data = await fetch("https://fakestoreapi.com/products")
		return (await data.json()) as ProductType[]
	},
})

function RouteComponent() {
	const products = Route.useLoaderData()
	return (
		<article className="flex-1 w-full p-10 ">
			<span className="text-2xl font-bold mb-4">PRODUCTS PAGE</span>
			<p className="text-lg font-bold mb-4">
				Aca lo hacemos mal, porque hacemos un fetch en /products/ y luego un
				fetch en /products/$productId para encontrar el producto y los de su
				categoria, estamos haciendo dos fetchs innecesarios y no utilizamos
				TansTack Query
			</p>
			<div className="flex flex-wrap gap-4 my-10">
				{products.map((product: ProductType) => (
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
		</article>
	)
}
