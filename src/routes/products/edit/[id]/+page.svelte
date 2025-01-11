<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1 class="mb-3 text-2xl font-bold">Edit Product</h1>
<form method="POST" class="w-full max-w-xs space-y-2 rounded border p-3">
	<input name="id" value={data.product.id} class="hidden" />
	<div class="!mt-0">
		<label for="name"> Name </label>
		<input name="name" type="text" value={data.product.name} placeholder="Ex: Wood Desk" />
	</div>
	<div>
		<label for="price"> Price </label>
		<input
			name="price"
			type="number"
			placeholder="Ex: 10.50"
			step=".01"
			min="1"
			max="10000"
			value={data.product.price}
		/>
	</div>
	<div>
		<label for="category"> Category </label>
		<select name="category">
			{#each data.categories as category}
				<option value={category.id} selected={category.id === data.product.categoryId}
					>{category.name}</option
				>
			{/each}
		</select>
	</div>

	<button
		class="!mt-5 block w-full rounded bg-blue-800 py-2 text-center text-white hover:bg-blue-900"
		>Save Edit</button
	>
</form>
