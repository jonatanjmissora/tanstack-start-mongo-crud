import { createRootRoute, Link, Outlet } from "@tanstack/react-router"

export const Route = createRootRoute({
	component: () => (
		<section className="flex flex-col w-screen min-h-screen overflow-x-hidden bg-blue-950">
			<header className="py-4 mx-auto w-full flex justify-center gap-16 bg-blue-900">
				<Link activeProps={{ className: "text-blue-500" }} to="/">
					Home
				</Link>
				<Link activeProps={{ className: "text-blue-500" }} to="/fake-api">
					Fake API
				</Link>
				<Link activeProps={{ className: "text-blue-500" }} to="/tanstack-query">
					Tanstack Query
				</Link>
			</header>
			<Outlet />
		</section>
	),
})
