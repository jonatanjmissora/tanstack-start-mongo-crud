1 - npm create vite@latest .

2 - npm install tailwindcss @tailwindcss/vite

3 - TAILWIND CSS install
================
 en vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

3.1 - en index.css
============
@import "tailwindcss";

4 - npm install @tanstack/react-router @tanstack/react-router-devtools

5 - npm install --save-dev @tanstack/router-plugin

6 - vite.config.ts
===========
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import {tanstackRouter} from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tanstackRouter({
target: 'react',
autoCodeSplitting: true,
  }), 
    react(), 
    tailwindcss()],
})

7 - App.tsx
========
const queryClient = new QueryClient()

const router = createRouter({
	routeTree,
	defaultPendingMs: 0,
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	context: {
		queryClient,
	},
})

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	)
}

8 - creo src/routes/__root.tsx
====================
export const Route = createRootRouteWithContext<{
	queryClient: QueryClient
}>()({
	component: RootComponent,
})

function RootComponent() {
	return (
    ---
  )
}

9 En Fake Api
----------------------------------
export const Route = createFileRoute("/fake-api")({
	component: RouteComponent,
	loader: async () => {
		const products = await getProducts()
		return { products }
	},
	pendingComponent: () => <Loading />,
	errorComponent: () => <ErrorComponent />,
})

10 pero con Tanstack Query
=========================

en routes/tanstack-query/index.tsx
---------------------------------------
export const Route = createFileRoute('/tanstack-query/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(productsQueryOptions),
  component: () => import("./products.lazy").then(d => d.Route)
})

en lib/products.ts
-------------------
export const getProducts = async () => {
	const response = await fetch("https://fakestoreapi.com/products")
	const data = await response.json()
	return data as ProductType[]
}

export const getProduct = async (productId: string) => {
	const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
	const data = await response.json()
	return data as ProductType
}

export const productsQueryOptions = queryOptions({
	queryKey: ["products"],
	queryFn: () => getProducts(),
})

export const productQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: ['product', { productId }],
    queryFn: () => getProduct(productId),
  })

en routes/tanstack-query/products.lazy.tsx
------------------------------------------
export const Route = createLazyFileRoute("/tanstack-query/products")({
	component: RouteComponent,
})

function RouteComponent() {
	const productsQuery = useSuspenseQuery(productsQueryOptions)
	const products = productsQuery.data

	return (
    ---
  )
}

en src/routes/tanstack-query/products.l$productId$.tsx
------------------------------------------
export const Route = createFileRoute('/tanstack-query/products/$productId')({
 component: RouteComponent,
})

function RouteComponent() {
	const { productId } = Route.useParams()
  const productQuery = useSuspenseQuery(productQueryOptions(productId))
  const product = productQuery.data
	return (
    ---
  )
}
