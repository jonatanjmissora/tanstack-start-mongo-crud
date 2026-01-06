import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/page-with-layout/$id/")({
	component: RouteComponent,
})

function RouteComponent() {
	const { id } = Route.useParams()
	return (
		<div className="bg-yellow-700 p-10">{`Este es el contenido hijo  "/page-with-layout/$${id}/!"`}</div>
	)
}
