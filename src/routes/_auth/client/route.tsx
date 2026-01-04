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
  return <div><span className="text-2xl font-bold mb-4">CLIENT PAGE</span> <Outlet /></div>
}
