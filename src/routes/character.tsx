import { createFileRoute, Link, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/character")({
	component: RouteComponent,
	loader: async () => {
		const data = await fetch("https://rickandmortyapi.com/api/character")
		return await data.json()
	},
	pendingComponent: () => <div>Loading characters...</div>,
	errorComponent: () => <div>Error loading characters</div>,
})

function RouteComponent() {
	const rickandmortyapi = Route.useLoaderData()

	return (
		<section className="flex bg-gray-500">
			<article className="w-1/4 p-4 flex flex-col gap-4 bg-gray-400">
				<h2 className="text-2xl font-bold underline">Characters:</h2>

				{rickandmortyapi.results.map((character: any) => (
					<Link
						activeProps={{ className: "text-blue-500" }}
						to={`/character/$id`}
						params={{ id: character.id }}
						key={character.id}
					>
						{character.name}
					</Link>
				))}
			</article>
			<article className="w-3/4">
				<Outlet />
			</article>
		</section>
	)
}
