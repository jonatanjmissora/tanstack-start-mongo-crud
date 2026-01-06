import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/admin/dashboard_/create")({
	component: RouteComponent,
})

function RouteComponent() {
	const { filter } = Route.useSearch()
	return (
		<article className="text-lg font-semibold w-1/2 p-6 bg-blue-400 text-black rounded-lg flex flex-col gap-4 justify-center">
			<div className="flex justify-between">
				<h2 className="text-2xl font-bold">Crear</h2>
				<Link to={"/admin/dashboard"} search={{ filter }} className="underline">
					Volver
				</Link>
			</div>
			<p>Formulario para crear elementos</p>
			<p>
				aca no se listan los elementos del dashboard, yo que utilice
				admin.dashboard_.create
			</p>
		</article>
	)
}
