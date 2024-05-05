<script>
	import { ProgressBar } from '@skeletonlabs/skeleton';

	let images = [];

	fetch('https://newportal.flatoutmotorcycles.com/portal/public/api/majorunit/stocknumber/VH04719')
		.then((response) => response.json())
		.then((data) => {
			if (data.Images && Array.isArray(data.Images)) {
				images = data.Images;
			}
		});

	// Components
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { CodeBlock, LightSwitch, Tab, TabGroup } from '@skeletonlabs/skeleton';
</script>

{#await images}
	<h5 class="h5 mb-2 font-semibold">Loading</h5>
	<ProgressBar value={undefined} />
{:then images}
	<div class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-1 overflow-x-auto px-2 py-2">
		{#each images as image, index (index)}
			<div class="snap-center shrink-0 py-2 px-2 w-full lg:w-1/2 text-center rounded-xl">
				<img class="rounded-xl" src={image.ImgURL} alt={`Image ${index + 1}`} />
			</div>
		{:else}
			<p>Loading...</p>
		{/each}
	</div>
{:catch error}
	<p>{error.message}</p>
{/await}

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
			<a class="btn variant-filled-primary mb-1" href="https://kit.svelte.dev/" target="_blank"
				>SvelteKit</a
			>
			<a class="btn variant-filled-primary mb-1" href="https://tailwindcss.com/" target="_blank"
				>Tailwind</a
			>
			<a class="btn variant-filled-primary mb-1" href="https://www.skeleton.dev/" target="_blank"
				>Skeleton</a
			>
		</section>
		<hr />
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate nostrum, vero explicabo
			sunt ipsum asperiores. Molestias nostrum mollitia cumque veniam eum error atque, dolores
			nesciunt voluptas ea consectetur sed delectus.
		</p>
		<span
			class="inline-flex items-center rounded-md bg-gray-500 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
			>VS Code</span
		>
		<span
			class="inline-flex items-center rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
			>HTML</span
		>
		<span
			class="inline-flex items-center rounded-md bg-yellow-500 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
			>JavaScript</span
		>
		<span
			class="inline-flex items-center rounded-md bg-green-500 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
			>CSS</span
		>
		<span
			class="inline-flex items-center rounded-md bg-blue-500 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
			>SvelteKit</span
		>
		<span
			class="inline-flex items-center rounded-md bg-indigo-500 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
			>Skeleton</span
		>
		<span
			class="inline-flex items-center rounded-md bg-purple-500 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
			>Tailwind</span
		>
		<span
			class="inline-flex items-center rounded-md bg-pink-500 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10"
			>Vercel</span
		>
	</div>
</main>
