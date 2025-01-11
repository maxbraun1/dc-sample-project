<script lang="ts">
	import Product from '$lib/components/Product.svelte';
	import { Plus } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
	import { createClient } from '@supabase/supabase-js';
	import { invalidateAll } from '$app/navigation';
	import { browser } from '$app/environment';

	let { data }: { data: PageData } = $props();
	let filter = $state(null);
	let searchTerm = $state('');
	let products = $state(data.products);

	let filteredProducts = $derived.by(() => {
		if (!searchTerm && !filter) return null;

		let filtered = products;
		if (searchTerm) {
			filtered = products.filter((product) =>
				product.productName.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
		if (filter) {
			filtered = filtered.filter((product) => product.categoryId === filter);
		}

		return filtered;
	});

	// const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
	// const channel = supabase
	// 	.channel('table_db_changes')
	// 	.on(
	// 		'postgres_changes',
	// 		{
	// 			event: '*',
	// 			schema: 'public',
	// 			table: 'products'
	// 		},
	// 		(payload) => {
	// 			console.log(payload);
	// 		}
	// 	)
	// 	.subscribe();

	// $inspect(filter);
</script>

<div class="mb-5 flex items-center justify-between">
	<h1 class="text-2xl font-bold">Products</h1>
	<div class="flex items-center gap-4">
		<input type="text" bind:value={searchTerm} placeholder="Search" />
		<select bind:value={filter}>
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
<div class="grid grid-cols-3 gap-3">
	{#if filteredProducts === null}
		{#each products as product}
			<Product
				name={product.productName}
				price={product.productPrice}
				categoryName={product.categoryName}
				productId={product.productId}
			/>
		{/each}
	{:else}
		{#each filteredProducts as product}
			<Product
				name={product.productName}
				price={product.productPrice}
				categoryName={product.categoryName}
				productId={product.productId}
			/>
		{/each}
	{/if}
</div>
