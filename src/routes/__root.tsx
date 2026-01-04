import { createRootRouteWithContext } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import type { RouterContext } from '../lib/use-router-context';
import Header from '../components/header';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

  function RootComponent() {
    return (
    <section className="flex flex-col w-screen min-h-screen overflow-x-hidden bg-blue-950">
      <Header />
      <Outlet />
    </section>
  )
}