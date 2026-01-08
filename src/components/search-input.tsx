import { useNavigate, useSearch } from "@tanstack/react-router"

function SearchInput() {
	const navigate = useNavigate({ from: "/products" })
	const search = useSearch({ from: "/products" })

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const q = e.target.value.trim() === "" ? undefined : e.target.value
		navigate({
			to: "/products",
			replace: true,
			search: prev => ({ ...prev, q }),
		})
	}

	return (
		<div className="flex gap-2 items-center">
			<input
				value={search.q ?? ""}
				onChange={handleChange}
				placeholder="Buscar productos..."
				className="max-w-md w-full rounded border border-slate-300 px-3 py-2"
			/>
			<button
				className="button"
				onClick={() => navigate({ replace: true, search: { q: undefined } })}
			>
				Clear
			</button>
		</div>
	)
}

export default SearchInput
