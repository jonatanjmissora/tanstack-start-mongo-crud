import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/character/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const data = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`)
    const character = await data.json()
    return character
  },
  pendingComponent: () => <div>Loading character...</div>,
})

function RouteComponent() {
const character = Route.useLoaderData()

if(character.error) return <div>Character not found</div>

  return (<article className="w-full h-full flex gap-4 bg-gray-600">
    
    <div className="w-1/2 flex flex-col gap-4 p-4">
        <h2 className="text-2xl font-bold underline">{character.name}</h2>
        <img className='size-20' src={character.image} alt={character.name} />
        <div>
            <p>{character.species}</p>
            <p>{character.gender}</p>
            <p>{character.status}</p>
        </div>

    <div className="grid grid-cols-3 gap-1">
        <h3 className="col-span-3">Episodes:</h3>
        {character.episode.map((episode: any) => (
            <Link 
            activeProps={{className: "text-blue-500"}}
            to={`/character/$id/$episode.split('/').pop()`}
            params={{id: character.id, episode: episode.id}}
            key={episode.split('/').pop()}
            >
            {episode.split('/').pop()}
        </Link>   
        // <span>{episode}</span>
        ))}
</div>
        </div>

    <Outlet />
  </article>)
}
