import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/character/$id/$episode')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const data = await fetch(`https://rickandmortyapi.com/api/episode/${params.episode}`)
    return await data.json()
  },
  pendingComponent: () => <div>Loading episode...</div>,
})

function RouteComponent() {
  const episode = Route.useLoaderData()
  return <div className="w-1/2 bg-gray-200">{JSON.stringify(episode)}</div>
}
