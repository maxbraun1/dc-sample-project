<script lang="ts">
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<h1 class="mb-3 text-2xl font-bold">Statistics</h1>

<table class="w-full table-fixed md:w-auto">
	<tbody>
		<tr>
			<th>Category Name</th>
			<th>No. of Products</th>
		</tr>

		{#each data.categoryCounts as category}
			<tr>
				<td>{category.categoryName}</td>
				<td>{category.count}</td>
			</tr>
		{/each}

		<tr>
			<td colspan="2" class="font-semibold"
				><span class="font-black text-blue-800">{data.productCount}</span> Total Products</td
			>
		</tr>
	</tbody>
</table>
