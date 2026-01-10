import { Link } from "@tanstack/react-router"
type RouterError = Error & { status?: number; statusText?: string }
export default function ErrorComponent({ error }: { error: unknown }) {
	const err = error as RouterError
	console.error(err)
	const errorMessage = err?.statusText ?? err?.message ?? "Unknown error"
	return (
		<div className="w-full flex-1 flex items-center justify-center text-4xl font-bold">
			<span>Error: {errorMessage}</span>
			<Link to="/">Go back</Link>
		</div>
	)
}
