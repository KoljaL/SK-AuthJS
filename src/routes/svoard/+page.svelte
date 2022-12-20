<script lang="ts">
	import { each } from 'svelte/internal';
	import type { PageData } from './$types';

	export let data: PageData;

	function formatDate(date: any) {
		const d = new Date(date);
		const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
		const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
		const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
		return `${da}-${mo}-${ye}`;
	}

	import { slide } from 'svelte/transition';
	let openCat = true;
	function toggleCat() {
		openCat = !openCat;
	}

	let openExcerps = true;
	function toggleExcerps() {
		openExcerps = !openExcerps;
	}
	// console.log(data.categories);
	// console.log(data.topics);
</script>

<h2>
	Categories
	<span class="showExcerp" on:click={toggleCat} on:keypress={toggleCat}>toggle Categories</span>
</h2>
{#if openCat}
	<div class="grid" transition:slide>
		{#if data}
			{#each data.categories as category}
				<div class="card">
					<h3 class="card-head">
						<a href="./c/{category.id}">{category.name}</a>
					</h3>

					<div class="card-body">
						{category.description}
					</div>
					<div class="card-footer">
						<span class="userlink" />
						<span class="comments">
							{category.count}
							<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								><path
									d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"
								/></svg
							>
						</span>
					</div>
				</div>
			{/each}
		{/if}
	</div>
{/if}
<h2>
	Last Topics
	<span class="showExcerp" on:click={toggleExcerps} on:keypress={toggleExcerps}>toggle Excerps</span
	>
</h2>
<div class="grid">
	{#if data}
		{#each data.topics as topic}
			<div class="card">
				<h3 class="card-head">
					<a href="./t/{topic.id}">{topic.title}</a>
				</h3>
				<div class="card-subhead">
					<span class="cat">
						{topic.Category?.name}
					</span>
					<span class="date">
						{formatDate(topic.createdAt)}
					</span>
				</div>
				{#if openExcerps}
					<div class="card-body" transition:slide>
						{topic.excerp}
					</div>
				{/if}
				<div class="card-footer">
					<span class="userlink">
						<a href="./user/{topic.user.id}">{topic.user.name}</a>
					</span>
					<span class="comments">
						{topic.comment_count}
						<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							><path
								d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"
							/></svg
						>
					</span>
					<span class="date">
						{topic.tags}
					</span>
				</div>
			</div>
		{/each}
	{/if}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
		grid-gap: 1rem;
	}
	.card {
		background-color: var(--color-bg-secondary);
		border: 1px solid #ccc;
		border-radius: 3px;
		transition: all 0.3s ease-in-out;
	}
	.card:hover {
		box-shadow: 0 0 5px 0 rgba(220, 220, 220, 0.6);
		/* transform: scale(1.01); */
	}
	.card-head {
		color: var(--color-text);
		background-color: var(--color-svelte);
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
		padding-inline: 1rem;
		line-height: 2rem;
		margin: 0;
		font-weight: normal;
	}
	.card-head a {
		color: var(--color-text);
		vertical-align: text-top;
	}
	.card-subhead {
		padding: 0.25rem 1rem 0 1rem;
		display: flex;
		flex-direction: row;
		font-size: 0.85rem;
		justify-content: space-between;
	}
	.card-body {
		padding: 0.25rem 1rem;
		min-height: 5rem;
	}
	.card-footer {
		padding: 0.5rem 1rem 0 1rem;
		display: flex;
		flex-direction: row;
		font-size: 0.85rem;
		justify-content: space-between;
	}

	.comments {
		stroke: var(--color-text);
	}

	.showExcerp {
		cursor: pointer;
		font-size: 0.8rem;
		color: var(--color-text);
		margin-left: 1rem;
	}

	/* style="background-image: url({topic.image}); background-size: cover;" */
</style>
