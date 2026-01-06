import { queryOptions, useQuery } from "@tanstack/react-query"
import type { ProductType } from "./types"

export const getProducts = async () => {
	const response = await fetch("https://fakestoreapi.com/products")
	const data = await response.json()
	return data as ProductType[]
}

export const useProducts = () => {
	const { data, error, isError, isLoading, isRefetching, status, isFetching } =
		useQuery({
			queryKey: ["products"],
			queryFn: getProducts,
			refetchOnWindowFocus: false,
			refetchInterval: 15 * 1000,
		})
	return {
		products: data || [],
		error,
		isError,
		isLoading,
		isRefetching,
		status,
		isFetching,
	}
}

export const productsQueryOptions = queryOptions({
	queryKey: ["products"],
	queryFn: () => getProducts(),
})
