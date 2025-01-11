<script lang="ts">
	import Category from '$lib/components/Category.svelte';
	import { Plus } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { categoriesStore } from '$lib/state.svelte';

	let { data }: { data: PageData } = $props();
	let editingPostId: null | string = $state(null);
	categoriesStore.categories = data.categories;

	$inspect(editingPostId);
</script>

<div class="mb-5 flex items-center justify-between">
	<h1 class="text-2xl font-bold">Categories</h1>
	<a
		class="flex w-fit items-center gap-2 rounded bg-blue-800 px-4 py-2 text-center text-white hover:bg-blue-900"
		href="/categories/add"><Plus size={20} />Add Category</a
	>
</div>

<div class="space-y-2">
	{#each data.categories as category}
		<Category name={category.name} id={category.id} />
	{/each}
</div>
