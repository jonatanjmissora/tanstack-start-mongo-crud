import { createFileRoute, ErrorComponent, Link } from '@tanstack/react-router'
import { searchSchema } from '../lib/types'

export const Route = createFileRoute('/search')({
  component: RouteComponent,
  validateSearch: searchSchema,
  loaderDeps: ({search}) => ({search}),
  loader: async ({ deps: {search} }) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon-color/`)
    const response = await data.json()
    return {colors: response}
  },
  errorComponent: ErrorComponent,
  pendingComponent: () => <div>Loading</div>,
})

function RouteComponent() {
  const { colors } = Route.useLoaderData()
  console.log("COLORS", colors)
  return (
  <div className='flex flex-col gap-8'>
    <p className='text-2xl font-bold'>Pathname: "/search"!</p>
    <div className='flex flex-wrap gap-2'>
      <Link 
        to={"/search"}
        search={{page: 1, color: "", sort: "asc"}}
        activeProps={{className: "scale-110"}}
        className='px-2 py-1 rounded text-gray-400 border border-gray-400' 
        style={{ backgroundColor: "transparent" }}
        >
          none
      </Link>
      {colors.results.map((color: any) => 
        <Link 
          key={color.name} 
          to={"/search"} 
          search={{page: 1, color: color.name, sort: "asc"}} 
          activeProps={{className: "scale-110"}}
          className={`px-2 py-1 rounded text-gray-800`} 
          style={{ backgroundColor: color.name }} 
          >
          {color.name}
        </Link> )}
    </div>
    {JSON.stringify(colors)}
  </div>)
}
