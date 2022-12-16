<script lang="ts">
	import { page } from '$app/stores';
</script>

<h2>protected page</h2>
{#if $page.data.session}
	<h3>$page.data.session</h3>
	<pre class="code">{JSON.stringify($page.data.session, null, 2)}</pre>
{/if}
