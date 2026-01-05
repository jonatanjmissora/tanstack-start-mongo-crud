import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/page-without-layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  <div className='bg-blue-500 p-20'>
    <p>Este es el contenido de "/page-without-layout", pero como fue creado con "index.tsx"</p>
    <p>por mas que coloque {"<"}Outlet /{">"} no se mostrara el contenido de "/page-without-layout/$id",</p>
    <p>sino que sera una pagina completamente nueva</p>
    <div className='flex gap-4 my-10 underline'>
          <Link activeProps={{className: "text-blue-700"}} to={`/page-without-layout/$id`} params={{id: "react"}}>React</Link>
          <Link activeProps={{className: "text-blue-700"}} to={`/page-without-layout/$id`} params={{id: "java"}}>Java</Link>
          <Link activeProps={{className: "text-blue-700"}} to={`/page-without-layout/$id`} params={{id: "python"}}>Python</Link>
        </div> 
  </div>)
}
