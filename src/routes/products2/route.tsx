import { createFileRoute } from '@tanstack/react-router'
import type { ProductType } from '../products'
import { Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/products2')({
  component: RouteComponent,
   loader: async () => {
      const data = await fetch('https://fakestoreapi.com/products')
      return await data.json() as ProductType[]
    },
})

function RouteComponent() {
  return <Outlet />
}
