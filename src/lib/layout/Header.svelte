<script lang="ts">
	import Auth from '$lib/layout/Auth.svelte';
	import Logo from '$lib/svg/SvelteMateLogo.svelte';
</script>

<header>
	<h2>
		<Logo />
		SvelteKit + AuthJS + Prisma
	</h2>

	<nav>
		<a href="/">Home</a>
		<a href="/protected">Protected</a>
		<a href="/protected/P1">P1</a>
		<a href="/protected/P2">P2</a>
		<a href="/semi-protected">semi Protected</a>
	</nav>
	<Auth />
</header>

<style>
	header {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		justify-content: space-between;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		border-bottom: 1px solid var(--color-shadow);
	}

	h2 {
		color: var(--color-svelte);
		margin: 0;
	}

	:global(h2 svg) {
		height: 40px;
		width: auto;
	}
</style>
