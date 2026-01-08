import type { ProductType } from "../lib/types"

interface ProductProps {
	product: ProductType | undefined
}

export function Product({ product }: ProductProps) {
	if (!product) {
		return <div>Product not found</div>
	}
	return (
		<div
			key={product?.id}
			className={`flex flex-col gap-2 rounded-lg bg-blue-800 p-2 flex-1 min-w-64 shadow-lg`}
		>
			<img src={product.image} alt="" className="w-full h-48 object-contain" />
			<div className="flex-1 flex flex-col justify-between gap-2">
				<h2>{product.title}</h2>
				<div className="flex justify-between items-center">
					<span>{product.category}</span>
					<span>$ {product.price}</span>
				</div>
			</div>
		</div>
	)
}
