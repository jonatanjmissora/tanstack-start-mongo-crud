import { createFileRoute, ErrorComponent } from '@tanstack/react-router'
import { searchSchema } from '../lib/types'
import { getAllElectrodomesticos, searchElectrodomesticos } from '../lib/electrodomesticos-mock'
import { Electrodomesticos } from '../components/electrodomesticos'

export const Route = createFileRoute('/search')({
  component: RouteComponent,
  validateSearch: searchSchema,
  loaderDeps: ({search}) => ({search}),
  loader: async ({ deps: {search} }) => {
    const electrodomesticos = await searchElectrodomesticos(search)
    const allElectrodomesticos = await getAllElectrodomesticos()
    return {allElectrodomesticos, electrodomesticos}
  },
  errorComponent: ErrorComponent,
  pendingComponent: () => <div>Loading</div>,
})

function RouteComponent() {
  const { allElectrodomesticos, electrodomesticos } = Route.useLoaderData()
  return (
  <div className='flex flex-col gap-8'>
    <Electrodomesticos electrodomesticos={electrodomesticos}/>
    {/*<div className='flex flex-wrap gap-2'>
       <Link 
        to={"/search"}
        search={{page: 1, color: "", sort: "asc"}}
        activeProps={{className: "shadow-[0_0_5px_5px_rgb(255,255,255,0.5)]"}}
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
          activeProps={{className: "shadow-[0_0_5px_5px_rgb(255,255,255,0.5)]"}}
          className={`px-2 py-1 rounded text-gray-800`} 
          style={{ backgroundColor: color.name }} 
          >
          {color.name}
        </Link> )}
    </div>
    {JSON.stringify(colors)} */}
    {electrodomesticos.map(electrodomestico => <span key={electrodomestico.id} className='mx-4'>{electrodomestico.name}</span>)}
  </div>)
}
