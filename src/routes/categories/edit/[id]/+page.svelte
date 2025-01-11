<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1 class="mb-3 text-2xl font-bold">Edit Category</h1>
<form method="POST" class="w-full max-w-xs rounded border p-3" use:enhance>
	<input name="id" type="text" value={data.category.id} class="hidden" />
	<label for="name"> Edit Category Name </label>
	<input name="name" type="text" value={data.category.name} placeholder="Ex: Electronics" />
	<button
		class="!mt-5 block w-full rounded bg-blue-800 py-2 text-center text-white hover:bg-blue-900"
		>Edit</button
	>
</form>
