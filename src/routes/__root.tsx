import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
export const Route = createRootRoute({
  component: () => (
    <section className="w-screen min-h-screen overflow-x-hidden bg-blue-950">
      <header className="py-4 mx-auto max-w-8xl flex justify-center gap-16">
        <Link activeProps={{className: "text-blue-500"}} to="/">Home</Link>
        <Link activeProps={{className: "text-blue-500"}} to="/character">Characters</Link>
        <Link activeProps={{className: "text-blue-500"}} to="/search">Search</Link>
        <Link activeProps={{className: "text-blue-500"}} to="/contact-us">Contact Us</Link>
      </header>
      <Outlet />
    </section>
  ),
})