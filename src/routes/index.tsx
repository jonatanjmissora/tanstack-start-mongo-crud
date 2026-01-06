import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<article>
			<div>HOME PAGE</div>
		</article>
	)
}
