import { createFileRoute } from '@tanstack/react-router'
import { useRouterContext } from '../lib/use-router-context';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  })

function RouteComponent() {

  const { role, login, logout, isAdmin, isClient, isAuthenticated } = useRouterContext();

  return <article>
    <div>HOME PAGE</div>
    <div>Current role: {role}</div>
    <div>Is Admin: {isAdmin.toString()}</div>
    <div>Is Client: {isClient.toString()}</div>
    <div>Is Authenticated: {isAuthenticated.toString()}</div>
    <button onClick={() => login("admin")}>Set Admin</button>
    <button onClick={() => login("client")}>Set Client</button>
    <button onClick={() => logout()}>Clear Role</button>
  </article>
}
