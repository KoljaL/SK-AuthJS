<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>semi-Protected page</h1>
{#if $page.data.session}
	<p>This is a protected content. You can access this content because you are signed in.</p>
	<p>Session expiry: {$page.data.session?.expires}</p>
{:else}
	<p>This is a protected content. You can't access this content because you are not signed in.</p>
{/if}
