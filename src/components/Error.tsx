import { Link } from "@tanstack/react-router";

export default function ErrorComponent() {
	return (
		<div className="w-full flex-1 flex items-center justify-center text-4xl font-bold">
			<span>Error</span>
			<Link to="/">Go back</Link>
		</div>
	)
}
