import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/page-with-layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  <div className='bg-blue-500 p-20'>
    <p>Este es el layout de /page-with-layout donde creo un route.tsx y puedo colocar</p>
    <p>un {"<"} Outlet /{">"} que me renderiza el contenido de los componentes hijos</p>
    <div className='flex gap-4 my-10 underline'>
      <Link activeProps={{className: "text-blue-700"}} to={`/page-with-layout/$id`} params={{id: "react"}}>React</Link>
      <Link activeProps={{className: "text-blue-700"}} to={`/page-with-layout/$id`} params={{id: "java"}}>Java</Link>
      <Link activeProps={{className: "text-blue-700"}} to={`/page-with-layout/$id`} params={{id: "python"}}>Python</Link>
    </div> 
    <div className='bg-yellow-700 w-full min-h-20'>
      <Outlet />
    </div>
  </div>
  )
}
