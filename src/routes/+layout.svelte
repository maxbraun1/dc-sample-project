<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<main>
	<Header />
	<div class="mx-auto w-full max-w-5xl py-5">
		{@render children()}
	</div>
</main>
