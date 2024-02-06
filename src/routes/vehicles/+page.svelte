<script>
	import { ProgressBar } from '@skeletonlabs/skeleton';
	async function fetchVehicles() {
		const response = await fetch('https://www.flatoutmotorcycles.com/unitinventory_univ.xml');
		const data = await response.text();
		const parser = new DOMParser();
		const xml = parser.parseFromString(data, 'application/xml');
		const items = xml.querySelectorAll('item');
		vehicles = Array.from(items).map((item) => ({
			stocknumber: item.querySelector('stocknumber').textContent,
			title: item.querySelector('title').textContent,
			link: item.querySelector('link').textContent,
			price: item.querySelector('price').textContent,
			usage: item.querySelector('usage').textContent,
			vin: item.querySelector('vin').textContent,
			description: item.querySelector('description').textContent,
			imageurl: item.querySelector('imageurl').textContent
		}));
		console.log(JSON.stringify(vehicles, null, 2));
	}

	let vehicles = fetchVehicles();
</script>

<main class="container pl-5">
	<h1 class="h1 my-5">Inventory</h1>
	{#await vehicles}
		<h5 class="h5 mb-2 font-semibold">Loading</h5>
		<ProgressBar value={undefined} />
	{:then vehicles}
		<div class="flex flex-row flex-wrap gap-3">
			{#each vehicles as vehicle}
				<div class="card w-full md:w-96 lg:w-96 rounded-xl overflow-clip">
					<img class="" src={vehicle.imageurl} alt={vehicle.title} />
					<header class="card-header">
						<h5 class="h5 truncate">{vehicle.title}</h5>
					</header>

					<section class="p-4">
						<p class="text-sm">{vehicle.stocknumber}</p>
						<p class="text-sm">{vehicle.vin}</p>
						<p class="text-sm">{vehicle.price}</p>
					</section>

					<footer class="card-footer">
						<button type="button" class="btn variant-filled-primary">
							<a href=" {vehicle.link}">Goto Vehicle</a>
						</button>
					</footer>
				</div>
			{/each}
		</div>
	{:catch error}
		<p>{error.message}</p>
	{/await}
</main>
