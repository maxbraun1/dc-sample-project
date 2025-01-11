<script lang="ts">
	import Product from '$lib/components/Product.svelte';
	import { Plus } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { createClient } from '@supabase/supabase-js';
	import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
	import { categoriesStore } from '$lib/state.svelte';

	let { data }: { data: PageData } = $props();
	let filter = $state(null);
	let searchTerm = $state('');
	let unfilteredProducts = $state(data.products);
	categoriesStore.categories = data.categories;

	// Product search and filtering
	let products = $derived.by(() => {
		// Filters products by filter and search term and returns filtered products
		if (!searchTerm && !filter) return unfilteredProducts;

		let filtered = unfilteredProducts;
		if (searchTerm) {
			filtered = filtered.filter((product) =>
				product.productName.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
		if (filter) {
			filtered = filtered.filter((product) => product.categoryId === filter);
		}

		return filtered;
	});

	// Live product updates
	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
	supabase
		.channel('table_db_changes')
		.on(
			'postgres_changes',
			{
				event: '*',
				schema: 'public',
				table: 'products'
			},
			(payload) => {
				// Performs action based on type of update (INSERT, UPDATE, or DELETE)
				if (payload.eventType === 'DELETE') {
					// Removes deleted product from unfilteredProducts
					unfilteredProducts = unfilteredProducts.filter(
						(product) => product.productId !== payload.old.id
					);
				} else if (payload.eventType === 'INSERT') {
					// Gets category name and adds new product to unfilteredProducts
					if (categoriesStore.categories) {
						const categoryName = categoriesStore.categories.find(
							(category) => category.id === payload.new.category_id
						);
						const newProduct = {
							productId: payload.new.id,
							productName: payload.new.name,
							productPrice: payload.new.price,
							categoryId: payload.new.category_id,
							categoryName: categoryName?.name || 'Uncategorized'
						};
						unfilteredProducts.push(newProduct);
					}
				} else if (payload.eventType === 'UPDATE') {
					// Gets category name and updates product info in unfilteredProducts
					if (categoriesStore.categories) {
						const categoryName = categoriesStore.categories.find(
							(category) => category.id === payload.new.category_id
						);
						const productIndex = unfilteredProducts.findIndex(
							(product) => product.productId === payload.old.id
						);
						unfilteredProducts[productIndex] = {
							productId: payload.new.id,
							productName: payload.new.name,
							productPrice: payload.new.price,
							categoryId: payload.new.category_id,
							categoryName: categoryName?.name || 'Uncategorized'
						};
					}
				}
			}
		)
		.subscribe();
</script>

<div class="mb-5 flex flex-col items-start justify-between md:flex-row md:items-center">
	<h1 class="text-3xl font-bold md:text-2xl">Products</h1>
	<div
		class="mt-3 flex w-full flex-col items-start gap-4 md:mt-0 md:w-fit md:flex-row md:items-center"
	>
		<input type="text" bind:value={searchTerm} placeholder="Search" class="w-full" />
		<select bind:value={filter} class="w-full">
			<option value={null} selected>No Filter</option>
			{#each data.categories as category}
				<option value={category.id}>{category.name}</option>
			{/each}
		</select>
		<a
			class="flex min-w-40 items-center gap-2 rounded bg-blue-800 px-4 py-2 text-center text-white hover:bg-blue-900"
			href="/products/add"><Plus size={20} />Add Product</a
		>
	</div>
</div>
<div class="grid grid-cols-1 gap-3 md:grid-cols-3">
	{#each products as product}
		<Product
			name={product.productName}
			price={product.productPrice}
			categoryName={product.categoryName}
			productId={product.productId}
		/>
	{/each}
</div>
