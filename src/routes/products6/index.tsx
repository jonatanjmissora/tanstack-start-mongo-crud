import { createFileRoute, Link } from '@tanstack/react-router'
import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { z } from "zod"
import { productsQueryOptions } from "../../lib/products"
import type { ProductType } from '../../lib/types';
import { Product } from '../../components/product';
import { ProductsSkeleton } from '../../components/product-skelton';
import SearchInput from './-search-input';

const SearchShema = z.object({
	q: z.string().optional(),
})

export const Route = createFileRoute("/products6/")({
	component: RouteComponent,
	validateSearch: search => SearchShema.parse(search),
	loader: async ({ context }) => {
		context.queryClient.ensureQueryData(productsQueryOptions);
	  },
})

function RouteComponent() {
   const { q } = Route.useSearch()
  return (
    <article className="flex-1 w-full p-10 ">
			<p>
				Aqui utilizamos el {"<"}Suspense{">"}, y solo en ProductsList se hace
				uso del useSuspenseQuery.
			</p>
			<div className="flex items-enter justify-between">
				<span className="text-2xl font-bold mb-4">PRODUCTS PAGE</span>
				<SearchInput />
			</div>

			<Suspense
				fallback={<ProductsSkeleton from={"SUSPENSE + useSuspenseQuery"} />}
			>
				<ProductsList q={q} />
			</Suspense>
		</article>
  );
}

export default function ProductsList({ q }: { q?: string }) {
  const products = useSuspenseQuery(productsQueryOptions).data
  const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(q?.toLowerCase() || ""))

  return (
    <div className="flex flex-wrap gap-4 my-10">
      {filteredProducts.map((product: ProductType) => (
        <Link
          key={product.id}
          to="/products6/$productId"
          params={{ productId: String(product.id) }}
          search={{ q }}
        >
          <Product product={product} />
        </Link>
      ))}
    </div>
  )
}