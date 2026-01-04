import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/admin')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.isAdmin) {
      throw redirect({ to: '/client' })
    }
  }
})

function RouteComponent() {
  return <div><span className="text-2xl font-bold mb-4">ADMIN PAGE</span> <Outlet /></div>
}
