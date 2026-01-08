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

7 - App.tsx (update)
========
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
})

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

8 - creo src/routes/__root.tsx (update)
====================
export const Route = createRootRouteWithContext<{
	queryClient: QueryClient
}>()({
	component: RootComponent,
	...
})

function RootComponent() {
	return (
    ---
  )
}

9 - creo lib/products.ts (hooks y queries)
====================
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
	
export const useFilteredProducts = (q?: string) => {
	return useQuery({
    ...productsQueryOptions,
    select: (products) => {
      if (!q) return products

      const normalized = q.toLowerCase()

      return products.filter((p) =>
        p.title.toLowerCase().includes(normalized)
      )
    },
  })
}

10 - creo src/routes/products/index.tsx
====================
export const Route = createFileRoute("/products")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(productsQueryOptions),
	...
})

function ProductsPage() {
    const { q } = Route.useSearch()
    const { data: products, isLoading } = useFilteredProducts(q)

  if (isLoading) return <div>Cargando...</div>

  return (
	...
	<SearchInput />
	...
	<ul className="flex flex-col gap-2">
					{products?.map(p => (
						<Link
							key={p.id}
							to={`/products/$productId`}
							params={{ productId: String(p.id) }}
							className="truncate"
						>
							{p.title}
						</Link>
					))}
				</ul>
	...
	)
}

11 - creo src/components/search-input.tsx
====================
function SearchInput() {
  const navigate = useNavigate({ from: "/products" })
  const search = useSearch({ from: "/products" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value.trim() === "" ? undefined : e.target.value
    navigate({
      to: "/products",
      replace: true,
      search: (prev) => ({ ...prev, q }),
    })
  }

  return (
	<div className="flex gap-2 items-center">
        <input
        value={search.q ?? ""}
        onChange={handleChange}
        placeholder="Buscar productos..."
        className="max-w-md w-full rounded border border-slate-300 px-3 py-2"
        />
        <button className="button" onClick={() => navigate({ to: "/products", replace: true, search: { q: undefined } })}>Clear</button>
    </div>
  )
}

12 - creo src/routes/products/$productId.tsx
====================
function RouteComponent() {
	const { productId } = Route.useParams()
	const router = useRouter()
	const { queryClient } = router.options.context
	const products = queryClient.getQueryData(["products"]) as
		| ProductType[]
		| undefined
	const product = products?.find(p => String(p.id) === productId)
	return <Product product={product} />
}



