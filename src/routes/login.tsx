import { createFileRoute, redirect, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import z from "zod"
import { useRouterContext } from "../lib/use-router-context"

const loginSchema = z.object({
	redirect: z.string().default("/"),
})

export const Route = createFileRoute("/login")({
	component: RouteComponent,
	validateSearch: loginSchema,
	beforeLoad: async ({ context }) => {
		const { isAdmin, isAuthenticated } = context
		if (isAuthenticated) {
			throw redirect({
				to: isAdmin ? "/admin" : "/client",
			})
		}
	},
	pendingComponent: () => <div>Loading...</div>,
})

function RouteComponent() {
	const router = useRouter()
	const { login } = useRouterContext()
	const search = Route.useSearch()
	const navigate = Route.useNavigate()
	const [username, setUsername] = useState("")
	return (
		<article className="flex-1 w-full flex items-center flex-col gap-10 p-10">
			<form className="flex flex-col gap-8">
				<span className="text-2xl font-bold mb-4">LOGIN PAGE</span>
				<input
					className="p-2"
					type="text"
					placeholder="Username"
					value={username}
					onChange={e => setUsername(e.target.value)}
					autoFocus
					required
				/>
				<button
					className="button"
					type="submit"
					onClick={() => {
						if (username === "admin") {
							login("admin")
						} else {
							login("client")
						}
						router.invalidate()
						// router.navigate({ reloadDocument: true });
						navigate({ to: search.redirect })
					}}
				>
					Login
				</button>

				<p className="text-sm text-gray-600">
					Use "admin" or whatever for "client"
				</p>
			</form>
		</article>
	)
}
