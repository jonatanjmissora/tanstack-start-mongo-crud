import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/tanstack-query/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<article className="flex-1 w-full p-10 ">
			<span className="text-2xl font-bold mb-4">PRODUCTS PAGE</span>
			este seria mi layout?
		</article>
	)
}
