import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/client")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.isClient) {
			throw redirect({ to: "/admin" })
		}
	},
})

function RouteComponent() {
	return (
		<div className="flex flex-col gap-6">
			<Link className="button w-max" to={Route.to + "/files/$"}>
				Files
			</Link>
			<span className="text-2xl font-bold mb-4">CLIENT PAGE</span>
			<Outlet />
		</div>
	)
}
