import { useQuery } from "@tanstack/react-query"

export const getProducts = async () => {
	const response = await fetch("https://fakestoreapi.com/products")
	const data = await response.json()
	return data
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
