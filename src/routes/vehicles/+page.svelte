<script>
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
			imageurl: item.querySelector('imageurl').textContent
		}));
		//console.log(JSON.stringify(vehicles, null, 2));
	}

	let vehicles = fetchVehicles();
</script>

<main class="p-8">
	<h1 class="h1 pb-5">Inventory</h1>
	{#await vehicles}
		<p>Loading...</p>
	{:then vehicles}
		<div class="flex flex-wrap">
			{#each vehicles as vehicle}
				<div class="card m-1 flex-1">
					<img class="w-100" src={vehicle.imageurl} alt={vehicle.title} />
					<header class="card-header" />

					<section class="p-4">
						<h5 class="h5">{vehicle.title}</h5>
						<p>{vehicle.stocknumber}</p>
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
