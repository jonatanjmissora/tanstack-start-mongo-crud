import { Link } from "@tanstack/react-router";
import { useRouterContext } from "../lib/use-router-context";
import { useRouter } from "@tanstack/react-router";

export default function Header() {
  
const router = useRouter();
const { role, logout, isAdmin, isClient, isAuthenticated } = useRouterContext();

  return (
    <header className="h-20 p-6 w-full flex justify-between gap-2">
        <span className="text-white font-bold text-xl">Logo</span>
        <nav className="flex justifi-center items-center gap-12">
            <Link activeProps={{className: "text-blue-500"}} to="/">Home</Link>
            <Link activeProps={{className: "text-blue-500"}} to="/character">Characters</Link>
            <Link activeProps={{className: "text-blue-500"}} to="/search">Search</Link>
            <Link activeProps={{className: "text-blue-500"}} to="/page-with-layout">Page With Layout</Link>
            <Link activeProps={{className: "text-blue-500"}} to="/page-without-layout">Page Without Layout</Link>
            
        </nav>

        <div className="flex justify-center items-center gap-6">
        {!role && <div className="flex items-center gap-8"><span className="opacity-50">no user</span><Link activeProps={{className: "text-blue-500"}} to="/login">Login</Link></div>}
        {isAdmin && <span className="text-white">hello, Admin</span>}
        {isClient && <span className="text-white">hello, Client</span>}
        {isAuthenticated && <button onClick={() => {logout(); router.invalidate(); router.navigate({ reloadDocument: true });}} className="py-1 px-2 bg-blue-600 text-white rounded">Logout</button>}
        </div>
      </header>
  )
}