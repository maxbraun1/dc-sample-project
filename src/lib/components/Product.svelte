<script lang="ts">
	let { name, price, categoryName, productId } = $props();
</script>

<div class="rounded border p-3">
	<h2 class="text-lg font-bold">{name}</h2>
	<p class="text-sm text-neutral-500">{categoryName}</p>
	<p class="text-green-700">${price}</p>
	<div class="mt-2 flex gap-2">
		<a
			class="block w-fit rounded bg-blue-800 px-2 py-1 text-sm text-white hover:bg-blue-900"
			href={'/products/edit/' + productId}>Edit</a
		>
		<form method="POST" action="?/delete">
			<input name="id" type="text" value={productId} class="hidden" />
			<button class="rounded bg-blue-800 px-2 py-1 text-sm text-white hover:bg-blue-900"
				>Delete</button
			>
		</form>
	</div>
</div>
