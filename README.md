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
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App

8 - creo src/routes/__root.tsx
====================
import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className="container mx-auto max-w-8xl py-4 flex justify-center items-center gap-6">
        <Link activeProps={{ className: 'text-blue-500' }} to="/">Home</Link>
        <Link activeProps={{ className: 'text-blue-500' }} to="/about">About</Link>
      </div>
      <Outlet />
    </React.Fragment>
  )
}

================================================================================
================================================================================
creamos una ruta anidada
src/routes/character.tsx
           character.$id.tsx
           character.$id.episode.tsx

           o
           
src/routes/character
                    route.tsx
                    /$id
                        route.tsx
                        /$episode
                            route.tsx 
================================================================================
================================================================================

1 - creamos src/routes/character/route.tsx
--------------------------------------------------------------------

export const Route = createFileRoute('/character')({
  component: RouteComponent,
  loader: async () => retornamos los datos de la api ,
  pendingComponent: () => <div>Loading characters...</div>,
  errorComponent: () => <div>Error loading characters</div>,
})

function RouteComponent() {
const {characters} = Route.useLoaderData()
return (
  ...

  {characters.map((character: any) => (
    <Link 
        activeProps={{className: "text-blue-500"}}
        to={`/character/$id`}
        params={{id: character.id}}
        key={character.id}
        >
          {character.name}
      </Link>
  ))}
  <Outlet />
  ...
)
}

2 - creamos src/routes/character/$id/route.tsx
--------------------------------------------------------------------

export const Route = createFileRoute('/character/$id')({
  component: RouteComponent,
  loader: async ({ params: {id} }) => retornamos los datos de la api segun el id,
  pendingComponent: () => <div>Loading character...</div>,
  errorComponent: () => <div>Character not found</div>,
})

function RouteComponent() {
const character = Route.useLoaderData()
return (
  {character.episode.map((episode: any) => (
            <Link 
            activeProps={{className: "text-blue-500"}}
            from={`/character/$id`}
            to={`/character/$id/${episodeId}`}
            params={{episodeId: episode.id}}
            key={episodeId}
            >
            {`EP ${episodeId}`}
        </Link>   
        ))}
  ...
  <Outlet />
  ...
)

3 - creamos src/routes/character/$id/$episodeId/route.tsx
--------------------------------------------------------------------

export const Route = createFileRoute('/character/$id/$episode')({
  component: RouteComponent,
  loader: async ({ params: {episode} }) => retornamos los datos de la api segun el episodeId,
  pendingComponent: () => <div>Loading episode...</div>,
  errorComponent: () => <div>Episode not found</div>,
})

function RouteComponent() {
  const episode = Route.useLoaderData()
  return <CharactersByEpisode characters={episode.characters}/>
}

================================================================================
================================================================================
veamos el search
================================================================================
================================================================================

1 - creamos un searchSchema en src/lib/types.ts
--------------------------------------------------------------------

import { z } from "zod";

export const searchSchema = z.object({
    page: z.number().min(1).default(1).catch(1),
    filter: z.string().default("").catch(""),
    sort: z.enum(["asc", "desc"]).default("asc").catch("asc"),
});

export type SearchParams = z.infer<typeof searchSchema>

2 - creamos src/routes/search.tsx
--------------------------------------------------------------------

export const Route = createFileRoute('/search')({
  component: RouteComponent,
  validateSearch: searchSchema,
  loaderDeps: ({search}) => ({search}),
  loader: async ({ deps: {search} }) => {
    const filteredElectrodomesticos = await searchElectrodomesticos(search)
    const allElectrodomesticos = await getAllElectrodomesticos()
    return {allElectrodomesticos, filteredElectrodomesticos}
  },
  errorComponent: ErrorComponent,
  pendingComponent: () => <div>Loading</div>,
})

function RouteComponent() {

  const { allElectrodomesticos, filteredElectrodomesticos } = Route.useLoaderData()
  const {page} = Route.useSearch()

  return (
    <FilterInputs />
    <Electrodomesticos electrodomesticos={filteredElectrodomesticos} page={page}/>
  )

  3 - creamos src/components/filter-inputs.tsx
--------------------------------------------------------------------
const seachRouteApi = getRouteApi("/search")

export function FilterInputs() {

  const { page, filter, sort} = seachRouteApi.useSearch()

  const [inputPage, setInputPage] = useState<number>(page)
  const [inputFilter, setInputFilter] = useState<string>(filter)
  const [inputSort, setInputSort] = useState<"asc" | "desc">(sort)

  const getSearchParams = (updates: Partial<SearchParams>) => {
    return {
      page: updates.page !== undefined ? updates.page : page,
      filter: updates.filter !== undefined ? updates.filter : filter,
      sort: updates.sort !== undefined ? updates.sort : sort,
    }
  }

  return (
    ...
    <div >
      <label htmlFor="page">page: </label>
      <input type="text" name="page" value={inputPage} onChange={(e) => setInputPage(parseInt(e.target.value, 10))}/>
      <Link to={"/search"} search={getSearchParams({page: inputPage})} >Apply</Link>
    </div>
    ...
  )
}

================================================================================
================================================================================
CONTEXT
================================================================================
================================================================================

1 - Router context setup
---------------------------
export type UserRole = "admin" | "client" | null;
export type RouterContext = {
  role: UserRole;
  login: (role: "admin" | "client") => void;
  logout: () => void;
  isAdmin: boolean;
  isClient: boolean;
  isAuthenticated: boolean;
};

export function useRouterContext(): RouterContext {
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole | null;
    return savedRole ?? null;
  });

useEffect(() => {
    if (role !== null) {
      localStorage.setItem("userRole", role);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [role]);

  const login = (newRole: "admin" | "client") => {
    setRole(newRole);
  };

  const logout = () => {
    setRole(null);
  };

  const isAdmin = role === "admin";
  const isClient = role === "client";
  const isAuthenticated = !!role;

  return {
    role,
    login,
    logout,
    isAdmin,
    isClient,
    isAuthenticated,
  };
}

2- App.tsx
---------------------------
...
const router = createRouter({
  routeTree,
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

3 - en _root
---------------------------
...
export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});
...

================================================================================
================================================================================
RUTAS PROTEGIDAS
================================================================================
================================================================================

1 - En el context, tengo las funciones de login y logout, 
ademas de las constantes de autenticacion.

2 - En /login.tsx
------------------------------------------

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  validateSearch: loginSchema,
  beforeLoad: async ({ context }) => {
    const { isAdmin, isAuthenticated } = context;
    if (isAuthenticated) {
      throw redirect({
        to: (isAdmin ? "/admin" : "/client"),
      });
    }
  },
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const router = useRouter();
  const { login } = useRouterContext();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <>
    ...
      <button
        className="button"
        type="submit"
        onClick={() => {
          if (username === "admin") {
            login("admin");
          } else {
            login("client");
          }
          router.invalidate();
          // router.navigate({ reloadDocument: true });
          navigate({ to: search.redirect });
        }}
      >
        Login
      </button>
      ...
    </>
  );
}

3 - En /_auth/route.tsx
------------------------------------------
export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  }
})

function RouteComponent() {
  return <Outlet />
}


4 - En /_auth/client/route.tsx (ruta protegida para clientes)
    En /_auth/admin/route.tsx (ruta protegida para clientes)
------------------------------------------