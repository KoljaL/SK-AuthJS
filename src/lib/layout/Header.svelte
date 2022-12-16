<script lang="ts">
	import Auth from '$lib/layout/Auth.svelte';
</script>

<header>
	<h2>SvelteKit + AuthJS + Prisma</h2>

	<nav>
		<a href="/">Home</a>
		<a href="/protected">Protected</a>
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
		margin-top: 1rem;
		border-bottom: 1px solid var(--color-shadow);
	}

	h2 {
		color: var(--color-svelte);
		margin: 0;
	}
	header .logo {
		display: flex;
	}
	header .logo a:hover {
		filter: none;
	}
	:global(.logo svg) {
		height: 50px;
		width: auto;
	}
	/* header .logo span {
		color: var(--color-svelte);
		font-size: 2rem;
		font-weight: 600;
		margin-left: 0.15rem;
	} */
</style>
