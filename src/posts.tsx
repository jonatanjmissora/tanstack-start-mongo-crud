// import { QueryClientProvider, type QueryClient } from "@tanstack/react-query"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
// import {
// 	createRootRouteWithContext,
// 	createRoute,
// 	Outlet,
// 	RouterProvider,
// } from "@tanstack/react-router"
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

// const rootRoute = createRootRouteWithContext<{
// 	queryClient: QueryClient
// }>()({
// 	component: RootComponent,
// })

// function RootComponent() {
// 	return (
// 		<section>
// 			<header></header>
// 			<Outlet />
// 			<ReactQueryDevtools buttonPosition="top-right" />
// 			<TanStackRouterDevtools position="bottom-right" />
// 		</section>
// 	)
// }

// const postsLayoutRoute = createRoute({
// 	getParentRoute: () => rootRoute,
// 	path: "posts",
// 	loader: ({ context: { queryClient } }) =>
// 		queryClient.ensureQueryData(postsQueryOptions),
// }).lazy(() => import("./posts.lazy").then(d => d.Route))

// const postsIndexRoute = createRoute({
// 	getParentRoute: () => postsLayoutRoute,
// 	path: "/",
// 	component: PostsIndexRouteComponent,
// })

// function PostsIndexRouteComponent() {
// 	return <div>Select a post.</div>
// }

// const postRoute = createRoute({
// 	getParentRoute: () => postsLayoutRoute,
// 	path: "$postId",
// 	loader: ({ context: { queryClient }, params: { postId } }) =>
// 		queryClient.ensureQueryData(postQueryOptions(postId)),
// 	component: PostRouteComponent,
// })

// function PostRouteComponent() {
// 	const { postId } = postRoute.useParams()
// 	const postQuery = useSuspenseQuery(postQueryOptions(postId))
// 	const post = postQuery.data

// 	return (
// 		<div className="space-y-2">
// 			<h4 className="text-xl font-bold underline">{post.title}</h4>
// 			<div className="text-sm">{post.body}</div>
// 		</div>
// 	)
// }

// const routeTree = rootRoute.addChildren([
// 	postsLayoutRoute.addChildren([postRoute, postsIndexRoute]),
// ])

// const queryClient = new QueryClient()

// // Set up a Router instance
// const router = createRoute({
// 	routeTree,
// 	defaultPreload: "intent",
// 	// Since we're using React Query, we don't want loader calls to ever be stale
// 	// This will ensure that the loader is always called when the route is preloaded or visited
// 	defaultPreloadStaleTime: 0,
// 	scrollRestoration: true,
// 	context: {
// 		queryClient,
// 	},
// })

// // Register things for typesafety
// declare module "@tanstack/react-router" {
// 	interface Register {
// 		router: typeof router
// 	}
// }

// const rootElement = document.getElementById("app")!

// if (!rootElement.innerHTML) {
// 	const root = ReactDOM.createRoot(rootElement)

// 	root.render(
// 		<QueryClientProvider client={queryClient}>
// 			<RouterProvider router={router} />
// 		</QueryClientProvider>
// 	)
// }
