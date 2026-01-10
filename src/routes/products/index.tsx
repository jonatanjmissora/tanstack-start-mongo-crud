import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/products/")({
	component: RouteComponent,
})

function RouteComponent() {
	return <div className="text-2xl font-bold">Elige un articulo</div>
}
