<script>
	let images = [];

	fetch('https://newportal.flatoutmotorcycles.com/portal/public/api/majorunit/stocknumber/P25060')
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
			<img class="rounded-xl" src={image.ImgURL} alt={`Image ${index + 1}`} />
		{:else}
			<p>Loading...</p>
		{/each}
	</section>
</main>
