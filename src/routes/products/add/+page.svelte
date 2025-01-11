<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1 class="mb-3 text-2xl font-bold">Add Product</h1>
<form method="POST" class="w-full max-w-xs space-y-2 rounded border p-3" use:enhance>
	<div>
		<label for="name"> Name </label>
		<input name="name" type="text" placeholder="Ex: Wood Desk" />
	</div>
	<div>
		<label for="price"> Price (USD) </label>
		<input name="price" placeholder="Ex: 10.50" type="number" step=".01" min="1" max="10000" />
	</div>
	<div>
		<label for="category"> Category </label>
		<select name="category">
			{#each data.categories as category}
				<option value={category.id}>{category.name}</option>
			{/each}
		</select>
	</div>
	<button
		class="!mt-5 block w-full rounded bg-blue-800 py-2 text-center text-white hover:bg-blue-900"
		>Add Product</button
	>
</form>
