import type { QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {
	createRootRouteWithContext,
	Link,
	Outlet,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import ErrorComponent from "../components/Error"
import Loading from "../components/Loading"

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient
}>()({
	component: RootComponent,
	errorComponent: ({ error }) => <ErrorComponent error={error} />,
	pendingComponent: () => <Loading />,
})

function RootComponent() {
	return (
		<section className="flex flex-col w-screen min-h-screen overflow-x-hidden bg-blue-950">
			<header className="py-4 mx-auto w-full flex justify-center gap-16 bg-blue-900">
				<Link
					activeProps={{ className: "text-blue-500" }}
					to="/"
					viewTransition={{ types: ["fade-in"] }}
				>
					Home
				</Link>
				<Link
					activeProps={{ className: "text-blue-500" }}
					to="/products"
					viewTransition={{ types: ["fade-in"] }}
				>
					Products
				</Link>
				<Link
					activeProps={{ className: "text-blue-500" }}
					to="/products2"
					viewTransition={{ types: ["fade-in"] }}
				>
					Products2
				</Link>
				<Link
					activeProps={{ className: "text-blue-500" }}
					to="/products3"
					viewTransition={{ types: ["fade-in"] }}
				>
					Products3
				</Link>
				<Link
					activeProps={{ className: "text-blue-500" }}
					to="/products4"
					viewTransition={{ types: ["fade-in"] }}
				>
					Products4
				</Link>
				<Link
					activeProps={{ className: "text-blue-500" }}
					to="/products5"
					viewTransition={{ types: ["fade-in"] }}
				>
					Products5 ✅
				</Link>
			</header>
			<div className="flex-1 [view-transition-name:main-content]">
				<Outlet />
			</div>
			<TanStackRouterDevtools />
			<ReactQueryDevtools />
		</section>
	)
}
