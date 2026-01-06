import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
	beforeLoad: ({ context, location }) => {
		if (!context.isAuthenticated) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			})
		}
	},
})

function RouteComponent() {
	return (
		<div className="flex flex-col gap-8 p-10">
			<p className="text-lg font-semibold">
				Aqui en _auth/route.tsx empiezan las rutas protegidas, si no estas
				autenticado, entonces te vas a login, por mas que lo pongas en el URL
				manualmente
			</p>
			<p className="text-lg font-semibold">
				Si estas autenticado, entonces podras ver en el header el link para las
				rutas protegidas
			</p>
			<Outlet />
		</div>
	)
}
