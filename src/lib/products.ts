import { queryOptions, useQuery } from "@tanstack/react-query"
import type { ProductType } from "./types"
import { delay } from "./utils"

export const getProducts = async () => {
	await delay()
	const response = await fetch("https://fakestoreapi.com/products")
	const data = await response.json()
	return data as ProductType[]
}

export const getProduct = async (productId: string) => {
	await delay()
	const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
	const data = await response.json()
	return data as ProductType
}

export const productsQueryOptions = queryOptions({
	queryKey: ["products"],
	queryFn: () => getProducts(),
})

export const productQueryOptions = (productId: string) =>
	queryOptions({
		queryKey: ["product", { productId }],
		queryFn: () => getProduct(productId),
	})

export const useFilteredProducts = (q?: string) => {
	return useQuery({
		...productsQueryOptions,
		select: products => {
			if (!q) return products

			const normalized = q.toLowerCase()

			return products.filter(p => p.title.toLowerCase().includes(normalized))
		},
	})
}
