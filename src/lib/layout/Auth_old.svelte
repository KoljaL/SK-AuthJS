<script lang="ts">
	// import Login from '$lib/svg/login.svelte';
	// import Logout from '$lib/svg/logout.svelte';
	// import User from '$lib/svg/user.svelte';
	// import { signOut, getUser } from '@lucia-auth/sveltekit/client';

	import { clickOutside } from '$lib/functions/clickOutside';
	import { enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import { slide, fade } from 'svelte/transition';

	let isExpanded = true;
	let signUpIn = true;
	function togglesignUpIn(event: Event) {
		event.stopPropagation();

		signUpIn = !signUpIn;
	}

	function toggleExpand() {
		isExpanded = !isExpanded;
	}

	// const user = getUser();
	// let errorMessage: String;

	// $: console.log('Header $user', $user);
	// $: console.log('Auth $user', $user);
	// $: console.log('Header $user', $user);
</script>

<div class="auth">
	<button
		on:click={(event) => {
			isExpanded = true;
			event.stopPropagation();
		}}
	>
		{#if $user}
			<User />
		{:else}
			<Login />
		{/if}
	</button>

	{#if isExpanded}
		<div
			class="login"
			transition:fade
			use:clickOutside={() => {
				isExpanded = false;
			}}
		>
			<!-- PROFILE / LOGOUT -->
			{#if $user}
				<div class="user">
					<button><User /> Profile</button>
					<button
						on:click={async () => {
							await signOut();
							invalidateAll();
							toggleExpand();
						}}><Logout />Sign out</button
					>
				</div>
				<!-- LOGIN -->
			{:else if signUpIn}
				<form
					method="post"
					action="/login/username?/signin"
					use:enhance={() => {
						errorMessage = '';
						return async ({ result }) => {
							if (result.type === 'invalid' && result.data) {
								errorMessage = result.data.message;
							}
							if (result.type === 'success') {
								invalidateAll();
								toggleExpand();
							}
						};
					}}
				>
					<label for="username">username</label>
					<input id="username" name="username" value="peter" />
					<label for="password">password</label>
					<input type="password" id="password" name="password" value="peter123" />
					<div style="display:flex; justify-content:space-between; align-items: center;">
						<input type="submit" value="Sign In" class="button" />
						<span class="signUpIn" on:click={togglesignUpIn} on:keydown={togglesignUpIn}
							>Sign Up</span
						>
					</div>
				</form>
				<!-- register -->
			{:else}
				<form
					method="post"
					action="/login/username?/signup"
					use:enhance={() => {
						errorMessage = '';
						return async ({ result }) => {
							if (result.type === 'invalid' && result.data) {
								errorMessage = result.data.message;
							}
							if (result.type === 'success') {
								invalidateAll();
								toggleExpand();
							}
						};
					}}
				>
					<label for="username">username</label>
					<input id="username" name="username" value="peter" />
					<label for="password">password</label>
					<input type="password" id="password" name="password" value="peter123" />
					<div style="display:flex; justify-content:space-between; align-items: center;">
						<span class="signUpIn" on:click={togglesignUpIn} on:keydown={togglesignUpIn}
							>Sign In</span
						>
						<input type="submit" value="Sign Up" class="button" />
					</div>
				</form>
			{/if}

			{#if errorMessage}
				<p class="error">{errorMessage}</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.auth {
		position: relative;
	}
	button {
		background-color: transparent;
		border: none;
		color: var(--color-link);
		padding: 0;
		display: flex;
		gap: 0.5rem;
		/* text-align: left; */
	}
	.login {
		position: absolute;
		top: 2.5rem;
		right: 0;
		background-color: var(--color-bg);
		width: max-content;
	}

	form {
		padding: 1rem;
		width: 200px;
	}

	form .button {
		padding: 0.5rem 1rem;
	}

	.signUpIn {
		color: var(--color-link);
		cursor: pointer;
	}

	.signUpIn:hover {
		filter: brightness(var(--hover-brightness));
	}

	.user {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--color-bg-secondary);
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow) var(--color-shadow);
		padding: 1rem;
		text-align: var(--justify-normal);
	}
</style>
