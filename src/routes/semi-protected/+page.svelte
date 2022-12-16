<script lang="ts">
	import { page } from '$app/stores';
</script>

<h2>semi-protected page</h2>

<h3>Content for All</h3>
<p>You can access this content even you are <b>not</b> signed in.</p>
<br />
{#if $page.data.session}
	<h3>Content for authenticated user</h3>
	<p>You can access this content only if you are signed in.</p>
{:else}
	<br />
	<p>Some secret content, please sign in.</p>
{/if}
