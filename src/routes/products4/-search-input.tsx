import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { useDebouncedValue } from "../../lib/utils"

function SearchInput() {
	const navigate = useNavigate({ from: "/products4" })
	const search = useSearch({ from: "/products4/" })

	const [value, setValue] = useState(search.q ?? "")
	const debouncedValue = useDebouncedValue(value, 400)

	// sincroniza input ← URL al entrar/back/forward
	useEffect(() => {
		setValue(search.q ?? "")
	}, [search.q])

	// cuando cambia el debounced, actualiza la URL
	useEffect(() => {
		navigate({
			search: prev => ({
				...prev,
				q: debouncedValue || undefined,
			}),
			replace: true, // no ensucia el history
		})
	}, [debouncedValue, navigate])

	return (
		<div className="flex gap-2 items-center">
			<input
				value={value}
				onChange={e => setValue(e.target.value)}
				placeholder="Buscar productos..."
				className="max-w-md w-full rounded border border-slate-300 px-3 py-2"
			/>
			<button
				className="button"
				onClick={() => {
					setValue("")
					navigate({ replace: true, search: { q: undefined } })
				}}
			>
				Clear
			</button>
		</div>
	)
}

export default SearchInput
