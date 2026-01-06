import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<article>
			<div className="text-2xl font-bold p-10">HOME PAGE</div>
		</article>
	)
}
