<script>
	import { ProgressBar } from '@skeletonlabs/skeleton';
	async function fetchVehicles() {
		try {
			const response = await fetch('https://www.flatoutmotorcycles.com/unitinventory_univ.xml');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.text();
			const parser = new DOMParser();
			const xml = parser.parseFromString(data, 'application/xml');
			const items = xml.querySelectorAll('item');
			let vehicles = Array.from(items).map((item) => {
				const getTextContent = (selector) => {
					const element = item.querySelector(selector);
					return element ? element.textContent : null;
				};
				return {
					stocknumber: getTextContent('stocknumber'),
					title: getTextContent('title'),
					link: getTextContent('link'),
					price: Number(getTextContent('price')).toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD'
					}),
					usage: getTextContent('usage'),
					vin: getTextContent('vin'),
					description: getTextContent('description'),
					imageurl: getTextContent('imageurl')
				};
			});
			console.log(JSON.stringify(vehicles, null, 2));
			return vehicles;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	let vehicles = fetchVehicles();
</script>

<main class="pl-5">
	<h1 class="h1 my-5">Inventory</h1>
	{#await vehicles}
		<h5 class="h5 mb-2 font-semibold">Loading</h5>
		<ProgressBar value={undefined} />
	{:then vehicles}
		<div class="flex flex-row flex-wrap grow gap-3">
			{#each vehicles as vehicle (vehicle.vin)}
				<div class="card card-hover w-64 overflow-hidden">
					<header class="bg-black/50">
						<img class="w-64 object-fill" src={vehicle.imageurl} alt={vehicle.title} />
					</header>
					<section class="p-4">
						<p class="text-sm font-semibold">{vehicle.title}</p>
						<p class="text-sm text-gray-500">VIN: {vehicle.vin}</p>
						<p class="text-sm text-gray-500">Price: {vehicle.price}</p>
					</section>
					<footer class="card-footer p-2">
						<a href={vehicle.link} class="btn btn-sm variant-filled w-full" target="_blank"
							>Open web page</a
						>
					</footer>
				</div>
			{/each}
		</div>
	{:catch error}
		<p>Error: {error.message}</p>
	{/await}
</main>
