import { useEffect, useState } from "react"

export function useDebouncedValue<T>(value: T, delay: number) {
	const [debounced, setDebounced] = useState(value)

	useEffect(() => {
		const id = setTimeout(() => {
			setDebounced(value)
		}, delay)

		return () => clearTimeout(id)
	}, [value, delay])

	return debounced
}

export const delay = () => {
	return new Promise(resolve => setTimeout(resolve, 3000))
}
