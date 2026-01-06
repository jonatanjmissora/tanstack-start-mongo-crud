import { createFileRoute } from "@tanstack/react-router"
import CharactersByEpisode from "../components/characters-by-episode"

export const Route = createFileRoute("/character/$id/$episode")({
	component: RouteComponent,
	loader: async ({ params: { episode } }) => {
		const data = await fetch(
			`https://rickandmortyapi.com/api/episode/${episode}`
		)
		return await data.json()
	},
	pendingComponent: () => <div>Loading episode...</div>,
	errorComponent: () => <div>Episode not found</div>,
})

function RouteComponent() {
	const episode = Route.useLoaderData()
	return (
		<article className="bg-gray-400 flex flex-col gap-2 p-2">
			<h2 className="text-2xl font-bold">
				EP {episode.id} {episode.name}
			</h2>
			<p>Codigo: {episode.episode}</p>
			<p>Fecha de emision: {episode.air_date}</p>
			<CharactersByEpisode characters={episode.characters} />
		</article>
	)
}
