<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<main>
	<Header />
	<div class="mx-auto w-full max-w-5xl p-5 lg:px-0">
		{@render children()}
	</div>
</main>
