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

9 - creo src/routes/products.ts ( con sus hooks y queries incluidos)
====================

// API FETCH
export const getProducts = async () => {
	// await delay()
	const response = await fetch("https://fakestoreapi.com/products")
	const data = await response.json()
	return data as ProductType[]
}

//	QUERY
export const productsQueryOptions = queryOptions({
	queryKey: ["products"],
	queryFn: () => getProducts(),
})

//	HOOK
export const useFilteredProducts = (q?: string) => {
	return useSuspenseQuery({
		...productsQueryOptions,
		select: products => {
			if (!q) return products

			const normalized = q.toLowerCase()

			return products.filter(p => p.title.toLowerCase().includes(normalized))
		},
	})
}

//  SCHEMA para q
const SearchShema = z.object({
	q: z.string().optional(),
})

export const Route = createFileRoute("/products6/")({
	component: RouteComponent,
	validateSearch: search => SearchShema.parse(search),
	loader: async ({ context }) => {
		context.queryClient.ensureQueryData(productsQueryOptions)
	},
})

function RouteComponent() {
	const { q } = Route.useSearch()
	return (
		<article className="flex-1 w-full p-10 ">
			<p>
				Aqui utilizamos el {"<"}Suspense{">"}, y solo en ProductsList se hace
				uso del useSuspenseQuery.
			</p>
			<div className="flex items-enter justify-between">
				<span className="text-2xl font-bold mb-4">PRODUCTS PAGE</span>
				<SearchInput />
			</div>

			<Suspense
				fallback={<ProductsSkeleton from={"SUSPENSE + useSuspenseQuery"} />}
			>
				<ProductsList q={q} />
			</Suspense>
		</article>
	)
}

export default function ProductsList({ q }: { q?: string }) {
	const products = useFilteredProducts(q).data

	return (
		<div className="flex flex-wrap gap-4 my-10">
			{products.map((product: ProductType) => (
				<Link
					key={product.id}
					to="/products6/$productId"
					params={{ productId: String(product.id) }}
					search={{ q }}
				>
					<Product product={product} />
				</Link>
			))}
		</div>
	)
}

11 - creo src/components/search-input.tsx
====================
function SearchInput() {
  const navigate = useNavigate({ from: "/products6" })
    const search = useSearch({ from: "/products6/" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const q = e.target.value.trim() === "" ? undefined : e.target.value
        navigate({
            replace: true,
            search: prev => ({ ...prev, q }),
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
            <button
                className="button"
                onClick={() => navigate({ replace: true, search: { q: undefined } })}
            >
                Clear
            </button>
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

13 - agregamos un debounce en lib/utils.ts
==============================
import { useEffect, useState } from "react"

export function useDebouncedValue<T>(value: T, delay: number) {
	const [debounced, setDebounced] = useState(value)

	useEffect(() => {
		const id = setTimeout(() => {
			setDebounced(value)
		}, delay)

		return () => clearTimeout(id)
	}, [value, delay])

	return debounced
}

14 - modificamos el search-input
==============================

function SearchInput() {
	const navigate = useNavigate({ from: "/products" })
	const search = useSearch({ from: "/products" })

	const [value, setValue] = useState(search.q ?? "")
	const debouncedValue = useDebouncedValue(value, 400)

	// sincroniza input ← URL al entrar/back/forward
	useEffect(() => {
		setValue(search.q ?? "")
	}, [search.q])

	// cuando cambia el debounced, actualiza la URL
	useEffect(() => {
		navigate({
			search: prev => ({
				...prev,
				q: debouncedValue || undefined,
			}),
			replace: true, // no ensucia el history
		})
	}, [debouncedValue, navigate])

	return (
		<div className="flex gap-2 items-center">
			<input
				value={value}
				onChange={e => setValue(e.target.value)}
				placeholder="Buscar productos..."
				className="max-w-md w-full rounded border border-slate-300 px-3 py-2"
			/>
			<button
				className="button"
				onClick={() => {
					setValue("")
					navigate({ replace: true, search: { q: undefined } })
				}}
			>
				Clear
			</button>
		</div>
	)
}

export default SearchInput

OPCIONAL usando startTransition para cargas muy pesadas, o llamadas a la API
====================================================
cambio en el search-input.tsx
--------------------------------
function SearchInput() {
	const navigate = useNavigate({ from: "/products" })
	const search = useSearch({ from: "/products" })

	const [value, setValue] = useState(search.q ?? "")
	const debouncedValue = useDebouncedValue(value, 400)
	const [isPending, startTransition] = useTransition()

	// sincroniza input ← URL al entrar/back/forward
	useEffect(() => {
		setValue(search.q ?? "")
	}, [search.q])

	// cuando cambia el debounced, actualiza la URL
	useEffect(() => {
		startTransition(() => {
			navigate({
				search: prev => ({
					...prev,
					q: debouncedValue || undefined,
				}),
				replace: true,
			})
		})
	}, [debouncedValue, navigate])

	return (
		<div className="flex gap-2 items-center">
			<InputComponent isPending={isPending} value={value} setValue={setValue} />
			<button
				className="button"
				onClick={() => {
					setValue("")
					navigate({ replace: true, search: { q: undefined } })
				}}
			>
				Clear
			</button>
		</div>
	)
}

export default SearchInput

const InputComponent = ({
	isPending,
	value,
	setValue,
}: {
	isPending: boolean
	value: string
	setValue: (value: string) => void
}) => {
	return (
		<div className="relative">
			<input
				value={value}
				onChange={e => setValue(e.target.value)}
				placeholder="Buscar productos..."
				className="max-w-md w-full rounded border border-slate-300 px-3 py-2"
			/>
			{isPending && (
				<i className="size-6 text-white absolute top-1/2 -translate-y-1/2 right-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M20 4v5h-.582m0 0a8.001 8.001 0 00-15.356 2m15.356-2H15M4 20v-5h.581m0 0a8.003 8.003 0 0015.357-2M4.581 15H9"
						/>
					</svg>
				</i>
			)}
		</div>
	)
}



