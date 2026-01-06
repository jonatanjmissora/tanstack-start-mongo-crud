import { createFileRoute, ErrorComponent } from "@tanstack/react-router"
import { searchSchema } from "../lib/types"
import {
	getAllElectrodomesticos,
	searchElectrodomesticos,
} from "../lib/electrodomesticos-mock"
import { Electrodomesticos } from "../components/electrodomesticos"
import { FilterInputs } from "../components/filter-inputs"

export const Route = createFileRoute("/search")({
	component: RouteComponent,
	validateSearch: searchSchema,
	loaderDeps: ({ search }) => ({ search }),
	loader: async ({ deps: { search } }) => {
		const filteredElectrodomesticos = await searchElectrodomesticos(search)
		const allElectrodomesticos = await getAllElectrodomesticos()
		return { allElectrodomesticos, filteredElectrodomesticos }
	},
	errorComponent: ErrorComponent,
	pendingComponent: () => <div>Loading</div>,
})

function RouteComponent() {
	const { allElectrodomesticos, filteredElectrodomesticos } =
		Route.useLoaderData()
	const { page } = Route.useSearch()
	const electrodomesticosPerPage = 2
	let totalPages = 1
	if (page) {
		totalPages = Math.trunc(
			filteredElectrodomesticos.length / electrodomesticosPerPage
		)
		totalPages =
			filteredElectrodomesticos.length % electrodomesticosPerPage !== 0
				? totalPages + 1
				: totalPages
	}

	return (
		<div className="flex flex-col gap-8">
			<article className="flex flex-col gap-2">
				<h2>Todos los electrodomesticos</h2>
				<Electrodomesticos electrodomesticos={allElectrodomesticos} />
			</article>

			<FilterInputs />

			<article className="flex flex-col gap-2">
				<h2>
					Electrodomesticos filtrados({filteredElectrodomesticos.length}) - page{" "}
					{page}/{totalPages}
				</h2>
				<Electrodomesticos
					electrodomesticos={filteredElectrodomesticos}
					page={page}
				/>
			</article>
		</div>
	)
}
