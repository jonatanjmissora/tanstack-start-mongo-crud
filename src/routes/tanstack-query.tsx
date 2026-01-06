import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/tanstack-query")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<article className="flex-1 w-full p-10 ">logica de tanstack query</article>
	)
}
