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


