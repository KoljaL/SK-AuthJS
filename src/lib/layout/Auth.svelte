<script lang="ts">
	import LogOutIcon from '$lib/svg/logout.svelte';
	import LogInIcon from '$lib/svg/login.svelte';

	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<div class="auth">
	{#if $page.data.session}
		<span>
			<strong>{$page.data.session.user?.email ?? $page.data.session.user?.name}</strong>
		</span>
		{#if $page.data.session.user?.image}
			<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
		{/if}

		<span class="icon" on:click={() => signOut()} on:keydown={() => signOut()}><LogOutIcon /></span>
	{:else}
		<span>Sign In with GitHub</span>
		<span class="icon" on:click={() => signIn('github')} on:keydown={() => signIn('github')}
			><LogInIcon /></span
		>

		<span>Sign In with credentials</span>
		<span
			class="icon"
			on:click={() => signIn('credentials')}
			on:keydown={() => signIn('credentials')}><LogInIcon /></span
		>
	{/if}
</div>

<style>
	.auth {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 1rem;
	}

	.icon {
		cursor: pointer;
	}

	.icon:hover {
		color: var(--color-link);
		cursor: pointer;
	}
	.avatar {
		border-radius: 2rem;
		float: left;
		height: 2rem;
		width: 2rem;
		background-color: white;
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>
