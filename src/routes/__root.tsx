import { createRootRouteWithContext } from '@tanstack/react-router';
import { Link, Outlet } from '@tanstack/react-router';
import type { RouterContext } from '../lib/use-router-context';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

  function RootComponent() {
    return (
    <section className="w-screen min-h-screen overflow-x-hidden bg-blue-950">
      <header className="py-4 mx-auto max-w-8xl flex justify-center gap-16">
        <Link activeProps={{className: "text-blue-500"}} to="/">Home</Link>
        <Link activeProps={{className: "text-blue-500"}} to="/character">Characters</Link>
        <Link activeProps={{className: "text-blue-500"}} to="/search">Search</Link>
        <Link activeProps={{className: "text-blue-500"}} to="/page-with-layout">Page With Layout</Link>
        <Link activeProps={{className: "text-blue-500"}} to="/page-without-layout">Page Without Layout</Link>
      </header>
      <Outlet />
    </section>
  )
}