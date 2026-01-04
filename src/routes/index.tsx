import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useRouterContext } from '../lib/use-router-context';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  })

function RouteComponent() {

  const router = useRouter();
  const { role, login, logout, isAdmin, isClient, isAuthenticated } = useRouterContext();

  return <article className='flex-1 w-full bg-green-700 p-10'>
    <div className="flex flex-col gap-4">
    <div className="text-2xl font-bold mb-4">HOME PAGE</div>
    <div>Current role: {role}</div>
    <div>Is Admin: {isAdmin.toString()}</div>
    <div>Is Client: {isClient.toString()}</div>
    <div>Is Authenticated: {isAuthenticated.toString()}</div>
    <div className="flex gap-2">
    <button className="button" onClick={() => {login("admin"); router.invalidate(); router.navigate({ reloadDocument: true });}}>Set Admin</button>
    <button className="button" onClick={() => {login("client"); router.invalidate(); router.navigate({ reloadDocument: true });}}>Set Client</button>
    <button className="button" onClick={() => {logout(); router.invalidate(); router.navigate({ reloadDocument: true });}}>Clear Role</button>
    </div>
    </div>
  </article>
}
