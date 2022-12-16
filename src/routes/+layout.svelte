<script lang="ts">
	import '$lib/layout/app.css';
	import Header from '$lib/layout/Header.svelte';
</script>

<svelte:head>
	<title>SvelteKit + AuthJS + Prisma</title>
</svelte:head>

<Header />
<main>
	<slot />
</main>

<footer />

<style>
</style>
