<script lang="ts">
	import Product from '$lib/components/Product.svelte';
	import { Plus } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="mb-5 flex items-center justify-between">
	<h1 class="text-2xl font-bold">Products</h1>
	<a
		class="flex w-fit items-center gap-2 rounded bg-blue-800 px-4 py-2 text-center text-white hover:bg-blue-900"
		href="/products/add"><Plus size={20} />Add Product</a
	>
</div>
<div class="grid grid-cols-3 gap-3">
	{#each data.products as product}
		<Product
			name={product.productName}
			price={product.productPrice}
			categoryName={product.categoryName}
			productId={product.productId}
		/>
	{/each}
</div>
