<script>
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { lazyLoad } from '$lib/LazyLoad/lazyload';
	let images = [];

	fetch('https://newportal.flatoutmotorcycles.com/portal/public/api/majorunit/stocknumber/SCSC177')
		.then((response) => response.json())
		.then((data) => {
			if (data.Images && Array.isArray(data.Images)) {
				images = data.Images;
			}
		});
</script>

<main class="p-8">
	<h1 class="h1 mb-5">Photo Gallery</h1>
	<section class="grid grid-cols-2 md:grid-cols-3 gap-4">
		{#each images as image, index (index)}
			<img class="rounded-xl" use:lazyLoad={image.ImgURL} alt={`Image ${index + 1}`} />
		{:else}
			<p>Loading...</p>
			<ProgressBar value={undefined} />
		{/each}
	</section>
</main>
