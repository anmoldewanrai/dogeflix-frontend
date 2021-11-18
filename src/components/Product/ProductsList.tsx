import { ProfilerProps, useState } from 'react'
import { FilterIcon } from '@heroicons/react/solid'
import { DesktopFiltersSidebar } from './DesktopFiltersSidebar'
import { MobileFiltersSidebar } from './MobileFiltersSidebar'
import { SortMenu } from './SortMenu'
import { ProductCard } from './ProductCard'
import { Heading } from '../ui/Heading'
import useSWRInfinite from 'swr/infinite'
import { fetcher } from '~/lib/fetchJson'
import { ProductType } from '~/types'
import { Button } from '../ui/Button'
import Spinner from '../ui/Spinner'

export const sortOptions = [
	{ name: 'Most Popular', href: '#', current: true },
	{ name: 'Best Rating', href: '#', current: false },
	{ name: 'Newest', href: '#', current: false },
	{ name: 'Price: Low to High', href: '#', current: false },
	{ name: 'Price: High to Low', href: '#', current: false },
]

export const filters = [
	{
		id: 'color',
		name: 'Color',
		options: [
			{ value: 'white', label: 'White', checked: false },
			{ value: 'beige', label: 'Beige', checked: false },
			{ value: 'blue', label: 'Blue', checked: true },
			{ value: 'brown', label: 'Brown', checked: false },
			{ value: 'green', label: 'Green', checked: false },
			{ value: 'purple', label: 'Purple', checked: false },
		],
	},
	{
		id: 'category',
		name: 'Category',
		options: [
			{ value: 'new-arrivals', label: 'New Arrivals', checked: false },
			{ value: 'sale', label: 'Sale', checked: false },
			{ value: 'travel', label: 'Travel', checked: true },
			{ value: 'organization', label: 'Organization', checked: false },
			{ value: 'accessories', label: 'Accessories', checked: false },
		],
	},
	{
		id: 'size',
		name: 'Size',
		options: [
			{ value: '2l', label: '2L', checked: false },
			{ value: '6l', label: '6L', checked: false },
			{ value: '12l', label: '12L', checked: false },
			{ value: '18l', label: '18L', checked: false },
			{ value: '20l', label: '20L', checked: false },
			{ value: '40l', label: '40L', checked: true },
		],
	},
]

const PAGE_SIZE = 10

export function ProductsList() {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

	const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite<
		Array<ProductType>
	>(
		(index) => `/api/products/all?page=${index + 1}&limit=${PAGE_SIZE}`,
		fetcher
	)

	const isLoadingInitialData = !data && !error

	if (isLoadingInitialData) return <div>loading</div>

	const flattenedData = data?.flat() as ProductType[]

	const products: ProductType[] = flattenedData
		? // @ts-ignore - TS doesn't know that `flat()` returns an array
		  [].concat(...flattenedData)
		: ([] as ProductType[])

	const isLoadingMore =
		isLoadingInitialData ||
		(size > 0 && products && typeof products[size - 1] === 'undefined')

	const isEmpty = data?.[0]?.length === 0

	const isReachingEnd =
		isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

	const isRefreshing = isValidating && data && data.length === size

	return (
		<div className="bg-white">
			<div>
				{/* Mobile filter dialog */}
				<MobileFiltersSidebar
					open={mobileFiltersOpen}
					setOpen={setMobileFiltersOpen}
				/>

				<main className=" mx-auto px-4 sm:px-6 lg:px-8">
					<div className="w-full bg-white z-10 flex items-center justify-between sticky top-0 pt-4 pb-6 border-b border-gray-200">
						<Heading size="h3">Explore.</Heading>
						<div className="flex items-center">
							<SortMenu />
							<button
								type="button"
								className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
								onClick={() => setMobileFiltersOpen(true)}
							>
								<span className="sr-only">Filters</span>
								<FilterIcon className="w-5 h-5" aria-hidden="true" />
							</button>
						</div>
					</div>

					<section
						aria-labelledby="products-heading"
						className="md:mt-6 pb-24 relative"
					>
						<h2 id="products-heading" className="sr-only">
							Products
						</h2>

						<div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
							{/* Filters */}
							<DesktopFiltersSidebar />

							{/* Product grid */}
							<div className="lg:col-span-3 mt-4 md:mt-0">
								<div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
									{/* TODO: show shimmer while this loads */}
									{products.map((product, idx) => (
										<ProductCard product={product} key={idx} />
									))}
								</div>
								<div className="flex items-center justify-center py-6">
									<Button
										size="xl"
										variant="white"
										disabled={isLoadingMore || isReachingEnd}
										onClick={() => setSize(size + 1)}
									>
										{isLoadingMore ? (
											<span className="flex items-center space-x-2 justify-center">
												<p>Loading</p> <Spinner />
											</span>
										) : isReachingEnd ? (
											<span>All caught up!</span>
										) : (
											<span className="flex items-center space-x-2 justify-center">
												Load more
											</span>
										)}
									</Button>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	)
}
