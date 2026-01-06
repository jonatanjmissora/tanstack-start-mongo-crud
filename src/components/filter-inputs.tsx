import { getRouteApi, Link } from "@tanstack/react-router"
import { useState } from "react"
import type { SearchParams } from "../lib/types"

const seachRouteApi = getRouteApi("/search")

export function FilterInputs() {
	const { page, filter, sort } = seachRouteApi.useSearch()

	const [inputPage, setInputPage] = useState<number>(page)
	const [inputFilter, setInputFilter] = useState<string>(filter)
	const [inputSort, setInputSort] = useState<"asc" | "desc">(sort)

	const getSearchParams = (updates: Partial<SearchParams>) => {
		return {
			page: updates.page !== undefined ? updates.page : page,
			filter: updates.filter !== undefined ? updates.filter : filter,
			sort: updates.sort !== undefined ? updates.sort : sort,
		}
	}

	return (
		<article className="flex gap-6 items-center">
			<h2 className="underline">Filters</h2>
			<div className="flex gap-2 items-center">
				<label htmlFor="page">page: </label>
				<input
					className={"bg-slate-700 text-center"}
					type="text"
					name="page"
					value={inputPage}
					onChange={e => setInputPage(parseInt(e.target.value, 10))}
				/>
				<Link
					to={"/search"}
					search={getSearchParams({ page: inputPage })}
					className="bg-cyan-700 px-2"
				>
					Apply
				</Link>
			</div>
			<div className="flex gap-2 items-center">
				<label htmlFor="filter">filter: </label>
				<input
					className={"bg-slate-700 text-center"}
					type="text"
					name="filter"
					value={inputFilter}
					onChange={e => setInputFilter(e.target.value)}
				/>
				<Link
					to={"/search"}
					search={getSearchParams({ filter: inputFilter })}
					className="bg-cyan-700 px-2"
				>
					Apply
				</Link>
			</div>
			<div className="flex gap-2 items-center">
				<label htmlFor="sort">sort: </label>
				<input
					className={"bg-slate-700 text-center"}
					type="text"
					name="sort"
					value={inputSort}
					onChange={e => setInputSort(e.target.value as "asc" | "desc")}
				/>
				<Link
					to={"/search"}
					search={getSearchParams({ sort: inputSort })}
					className="bg-cyan-700 px-2"
				>
					Apply
				</Link>
			</div>
		</article>
	)
}
