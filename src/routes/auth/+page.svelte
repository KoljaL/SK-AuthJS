<script lang="ts">
	import { enhance } from '$app/forms';
	// import getCsrfToken from '@auth/sveltekit';
	// const csrfToken = await getCsrfToken();

	import type { PageData, ActionData } from './$types';
	export let data: PageData;

	export let form: ActionData;

	// action="?/register"
</script>

<form
	method="POST"
	action="/auth/signin"
	use:enhance={({ form, data, action, cancel }) => {
		// `form` is the `<form>` element    // `data` is its `FormData` object
		// `action` is the URL to which the form is posted
		// `cancel()` will prevent the submission
		return async ({ result, update }) => {
			// `result` is an `ActionResult` object
			// `update` is a function which triggers the logic that would be triggered if this callback wasn't set
		};
	}}
>
	<input type="text" name="name" placeholder="name" value="name" />
	<input type="password" name="password" placeholder="password" value="123456" />
	<button type="submit">Login</button>
</form>

{#if form?.success}
	<!-- this message is ephemeral; it exists because the page was rendered in       response to a form submission. it will vanish if the user reloads -->
	<p>Successfully logged in! Welcome back,</p>
{/if}

<form method="post" action="/auth/signin">
	<label>
		Email address
		<input type="email" id="email" name="email" value="test@test.de" />
		<input type="password" id="password" name="password" value="123456" />
	</label>
	<button type="submit">Sign in with Credentials</button>
</form>
