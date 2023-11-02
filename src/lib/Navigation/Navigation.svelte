<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();
	function drawerClose() {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li
			class="hover:variant-filled-primary active:variant-filled-primary hover:text-white rounded-lg"
		>
			<a href="/" on:click={drawerClose}>
				<svg
					class="fill-current w-4 h-4 mr-3"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"><path d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8v6z" /></svg
				>
				Home
			</a>
		</li>
		<li class="hover:variant-filled-primary hover:text-white rounded-lg">
			<a href="/clock" on:click={drawerClose}>
				<svg
					class="fill-current w-4 h-4 mr-3"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					><path
						d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z"
					/></svg
				>
				Clock
			</a>
		</li>
		<li class="hover:variant-filled-primary hover:text-white rounded-lg">
			<a href="/table" on:click={drawerClose}>
				<svg
					class="fill-current w-4 h-4 mr-3"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					><path
						d="M1 4h2v2H1V4zm4 0h14v2H5V4zM1 9h2v2H1V9zm4 0h14v2H5V9zm-4 5h2v2H1v-2zm4 0h14v2H5v-2z"
					/></svg
				>
				Table
			</a>
		</li>
		<li class="hover:variant-filled-primary hover:text-white rounded-lg">
			<a href="/photos" on:click={drawerClose}>
				<svg
					class="fill-current w-4 h-4 mr-3"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					><path
						d="M0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm11 9l-3-3-6 6h16l-5-5-2 2zm4-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
					/></svg
				>
				Photos
			</a>
		</li>
		<li class="hover:variant-filled-primary hover:text-white rounded-lg">
			<a href="/chart" on:click={drawerClose}>
				<svg
					class="fill-current w-4 h-4 mr-3"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					><path
						d="M4.13 12H4a2 2 0 1 0 1.8 1.11L7.86 10a2.03 2.03 0 0 0 .65-.07l1.55 1.55a2 2 0 1 0 3.72-.37L15.87 8H16a2 2 0 1 0-1.8-1.11L12.14 10a2.03 2.03 0 0 0-.65.07L9.93 8.52a2 2 0 1 0-3.72.37L4.13 12zM0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"
					/></svg
				>
				Chart
			</a>
		</li>
		<li class="hover:variant-filled-primary hover:text-white rounded-lg">
			<a href="/glow" on:click={drawerClose}>
				<svg
					class="fill-current w-4 h-4 mr-3"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					><path
						d="M4.13 12H4a2 2 0 1 0 1.8 1.11L7.86 10a2.03 2.03 0 0 0 .65-.07l1.55 1.55a2 2 0 1 0 3.72-.37L15.87 8H16a2 2 0 1 0-1.8-1.11L12.14 10a2.03 2.03 0 0 0-.65.07L9.93 8.52a2 2 0 1 0-3.72.37L4.13 12zM0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"
					/></svg
				>
				Glow
			</a>
		</li>
		<li class="hover:variant-filled-primary hover:text-white rounded-lg">
			<a href="/tasks" on:click={drawerClose}>
				<svg
					class="fill-current w-4 h-4 mr-3"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					><path
						d="M15 9h-3v2h3v3h2v-3h3V9h-3V6h-2v3zM0 3h10v2H0V3zm0 8h10v2H0v-2zm0-4h10v2H0V7zm0 8h10v2H0v-2z"
					/></svg
				>
				Tasks
			</a>
		</li>
		<li class="hover:variant-filled-primary hover:text-white rounded-lg">
			<a href="/vehicle" on:click={drawerClose}>
				<svg
					class="fill-current w-4 h-4 mr-3"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					><path
						d="M2 14v-3H1a1 1 0 0 1-1-1 1 1 0 0 1 1-1h1l4-7h8l4 7h1a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-1v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H5v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3zm13.86-5L13 4H7L4.14 9h11.72zM5.5 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
					/></svg
				>
				Vehicle
			</a>
		</li>
	</ul>
</nav>
