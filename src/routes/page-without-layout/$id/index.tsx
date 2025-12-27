import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/page-without-layout/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {id} = Route.useParams()
  return (
  <div className='p-20 bg-yellow-700 w-full min-h-20 flex flex-col gap-6'>
    <Link to="/page-without-layout" className="underline">Volver</Link>
    <p>Aca esta el contenido de {id}</p>
  </div>)
}
