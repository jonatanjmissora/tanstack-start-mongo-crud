import { createFileRoute, ErrorComponent, Link, Outlet } from '@tanstack/react-router'
import { searchSchema } from '../../lib/types'

export const Route = createFileRoute('/_auth/admin')({
  component: RouteComponent,
    validateSearch: searchSchema,
    loaderDeps: ({search}) => ({search}),
    errorComponent: ErrorComponent,
    pendingComponent: () => <div>Loading</div>,
  })

function RouteComponent() {
    const {filter} = Route.useSearch()

  return (
    <div className="flex flex-col gap-6">
      <span className="text-2xl font-bold mb-4">ADMIN PAGE</span>
      <div className="flex gap-2">
        <Link 
          to={"/admin/dashboard"} 
          search={{filter: "all"}} 
          className="button"
        >
          All
        </Link>
        <Link 
          to={"/admin/dashboard"} 
          search={{filter: "filtered"}} 
          className="button"
        >
          Filter
        </Link>
        <Link 
          to={"/admin/dashboard/create"} 
          search={{filter}}
          className="button"
        >
          Crear
        </Link>
      </div> 
      <Outlet />
    </div>
  )
}