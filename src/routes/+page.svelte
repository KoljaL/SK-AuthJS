<script lang="ts">
	import { page } from '$app/stores';
</script>

<h2>Home</h2>

{#if $page}
	<h3>$page.data.session</h3>
	<pre class="code">{JSON.stringify($page, null, 2)}</pre>
{/if}
