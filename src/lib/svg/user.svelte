<svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	viewBox="0 0 24 24"
	width="24px"
	height="24px"
	stroke-width="1.5"
	stroke="currentColor"
>
	<path
		class="path"
		pathLength="1"
		stroke-linecap="round"
		stroke-linejoin="round"
		d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
	/>
</svg>

<style>
	.path {
		stroke-dasharray: 1;
		stroke-dashoffset: 1;
		animation: dash 3s linear normal 1 forwards;
	}

	@keyframes dash {
		from {
			stroke-dashoffset: 1;
		}
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
