import { createFileRoute } from '@tanstack/react-router'
import { searchSchema } from '../lib/types'

export const Route = createFileRoute('/search')({
  component: RouteComponent,
  validateSearch: searchSchema,
  loaderDeps: ({search}) => ({search}),
  loader: async ({ deps: {search} }) => {
    console.log("search", search)
    return search
  },
})

function RouteComponent() {
  const {page, filter, sort } = Route.useLoaderData()
  return <div>Hello "/search"! {page} {filter} {sort}</div>
}
