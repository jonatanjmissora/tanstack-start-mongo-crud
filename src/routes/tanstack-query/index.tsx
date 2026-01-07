import { createFileRoute } from '@tanstack/react-router'
import { productsQueryOptions } from '../../lib/products'

export const Route = createFileRoute('/tanstack-query/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(productsQueryOptions),
  component: () => import("./products.lazy").then(d => d.Route)
})