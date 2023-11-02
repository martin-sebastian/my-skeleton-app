<script>
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	// Components
	import { CodeBlock, LightSwitch, Tab, TabGroup } from '@skeletonlabs/skeleton';
</script>

<main class="p-8">
	<div class="container space-y-5">
		<h1 class="h1">
			<span
				class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
				>Design.</span
			>
			<span
				class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
				>Build.</span
			>
			<span
				class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone"
				>Deploy.</span
			>
		</h1>

		<h4 class="h4">
			My framework experiment built with SvelteKit and Tailwind CSS, deployed to Vercel.
		</h4>

		<div
			class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-10"
		>
			{#each Array.from({ length: 8 }) as _, i}
				<div class="snap-start shrink-0 card py-20 w-40 md:w-80 text-center">{i + 1}</div>
			{/each}
		</div>

		<p class="text-left w-auto">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum eros nulla, eu pretium
			massa tristique eu. Ut urna ex, facilisis vitae mattis vel, auctor sed dolor. Sed efficitur
			tincidunt elit quis dignissim. Nulla nisi tellus, cursus in interdum nec, ultrices vel leo.
			Sed malesuada ipsum quis enim pulvinar mattis quis lobortis diam. Curabitur elementum cursus
			orci, eget blandit erat ullamcorper ac.
		</p>
		<hr />
		<h4 class="h4">Built With These Technologies</h4>
		<section>
			<a class="btn variant-filled-primary" href="https://kit.svelte.dev/" target="_blank"
				>SvelteKit</a
			>
			<a class="btn variant-filled-primary" href="https://tailwindcss.com/" target="_blank"
				>Tailwind</a
			>
			<a class="btn variant-filled-primary" href="https://www.skeleton.dev/" target="_blank"
				>Skeleton</a
			>
			<a class="btn variant-filled-primary" href="https://github.com/" target="_blank">GitHub</a>
		</section>
		<hr />
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate nostrum, vero explicabo
			sunt ipsum asperiores. Molestias nostrum mollitia cumque veniam eum error atque, dolores
			nesciunt voluptas ea consectetur sed delectus.
		</p>
		<span
			class="inline-flex items-center rounded-md bg-gray-500 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
			>Badge</span
		>
		<span
			class="inline-flex items-center rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
			>Badge</span
		>
		<span
			class="inline-flex items-center rounded-md bg-yellow-500 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
			>Badge</span
		>
		<span
			class="inline-flex items-center rounded-md bg-green-500 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
			>Badge</span
		>
		<span
			class="inline-flex items-center rounded-md bg-blue-500 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
			>Badge</span
		>
		<span
			class="inline-flex items-center rounded-md bg-indigo-500 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
			>Badge</span
		>
		<span
			class="inline-flex items-center rounded-md bg-purple-500 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
			>Badge</span
		>
		<span
			class="inline-flex items-center rounded-md bg-pink-500 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10"
			>Badge</span
		>
	</div>
</main>
