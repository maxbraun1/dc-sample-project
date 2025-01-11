<script lang="ts">
	import { enhance } from '$app/forms';
	import { Pencil, Trash } from 'lucide-svelte';

	let { name, id } = $props();
</script>

<div class="flex justify-between rounded border p-3">
	<p>{name}</p>
	<div class="flex gap-5">
		<form method="POST" action="?/delete" use:enhance>
			<label class="hidden">
				<input name="id" type="text" value={id} />
			</label>
			<button><Trash size={20} color="red" /></button>
		</form>
		<a href={'/categories/edit/' + id}><Pencil size={20} color="blue" /></a>
	</div>
</div>
