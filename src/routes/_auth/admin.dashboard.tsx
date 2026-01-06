import { createFileRoute, getRouteApi, Outlet } from "@tanstack/react-router"

const searchRouteApi = getRouteApi("/_auth/admin/dashboard")

export const Route = createFileRoute("/_auth/admin/dashboard")({
	component: RouteComponent,
})

function RouteComponent() {
	const { filter } = searchRouteApi.useSearch()
	return (
		<article className="min-h-20 w-1/2 p-6 bg-blue-400 text-black rounded-lg flex flex-col gap-4 justify-center">
			<h2 className="text-2xl font-bold">Dashboard</h2>
			<p>Contenido de Dashboard FILTER: {filter || "ALL"}</p>
			<Outlet />
		</article>
	)
}
