import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/client')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.isClient) {
      throw redirect({ to: '/admin' })
    }
  }
})

function RouteComponent() {
  return <div>Hello "/_auth/client"! <Outlet /></div>
}
