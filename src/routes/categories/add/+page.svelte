<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1 class="mb-3 text-2xl font-bold">Add Category</h1>
<form method="POST" class="w-full max-w-xs space-y-2 rounded border p-3" use:enhance>
	<label for="name"> Category Name </label>
	<input name="name" type="text" placeholder="Ex: Electronics" />
	<button
		class="!mt-5 block w-full rounded bg-blue-800 py-2 text-center text-white hover:bg-blue-900"
		>Add Category</button
	>
</form>
