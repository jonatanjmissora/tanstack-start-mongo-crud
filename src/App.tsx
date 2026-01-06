import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { useRouterContext } from "./lib/use-router-context";

const router = createRouter({
  routeTree,
  defaultPendingMs: 0,
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  scrollRestoration: true,
  context: {
    role: null,
    login: () => {},
    logout: () => {},
    isAdmin: false,
    isClient: false,
    isAuthenticated: false,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {

  const routerContext = useRouterContext();
  return (
    <RouterProvider router={router} context={routerContext} />
  )
}

export default App
