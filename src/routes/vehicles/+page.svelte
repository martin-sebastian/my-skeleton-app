<script>
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';

	let selectedManufacturer = '';
	let selectedYear = '';
	let selectedModelType = '';
	let modelNameQuery = ''; // Handle input query for model names
	let selectedUsage = '';
	let manufacturers = writable([]);
	let years = writable([]);
	let modelTypes = writable([]);
	let usages = writable([]);
	let vehicles = writable([]);
	let displayedVehicles = writable([]);

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
			let fetchedVehicles = Array.from(items).map((item) => {
				const getTextContent = (selector) => {
					const element = item.querySelector(selector);
					return element ? element.textContent : null;
				};
				return {
					manufacturer: getTextContent('manufacturer'),
					year: getTextContent('year'),
					modelType: getTextContent('model_type'),
					modelName: getTextContent('model_name'),
					usage: getTextContent('usage'),
					stocknumber: getTextContent('stocknumber'),
					title: getTextContent('title'),
					link: getTextContent('link'),
					price: formatPrice(getTextContent('price')),
					vin: getTextContent('vin'),
					description: getTextContent('description'),
					metric_type: getTextContent('metric_type'),
					metric_value: getTextContent('metric_value'),
					imageurl: getTextContent('imageurl')
				};
			});
			vehicles.set(fetchedVehicles);
			manufacturers.set(
				[...new Set(fetchedVehicles.map((vehicle) => vehicle.manufacturer))].sort()
			);
			years.set([...new Set(fetchedVehicles.map((vehicle) => vehicle.year))].sort((a, b) => b - a)); // Sort years in descending order
			modelTypes.set([...new Set(fetchedVehicles.map((vehicle) => vehicle.modelType))].sort());
			usages.set([...new Set(fetchedVehicles.map((vehicle) => vehicle.usage))].sort());
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	function formatPrice(price) {
		return Number(price) ? `$${Number(price).toLocaleString('en-US')}` : 'N/A';
	}

	// Update displayed vehicles reactively based on filters
	$: {
		displayedVehicles.set(
			$vehicles.filter(
				(vehicle) =>
					(selectedManufacturer ? vehicle.manufacturer === selectedManufacturer : true) &&
					(selectedYear ? vehicle.year === selectedYear : true) &&
					(selectedModelType ? vehicle.modelType === selectedModelType : true) &&
					(modelNameQuery
						? vehicle.modelName.toLowerCase().includes(modelNameQuery.toLowerCase())
						: true) &&
					(selectedUsage ? vehicle.usage === selectedUsage : true)
			)
		);
	}

	fetchVehicles();
</script>

<nav class="bg-surface-500/5 z-40 sticky top-0 flex flex-row gap-3 p-4">
	<input
		type="search"
		bind:value={modelNameQuery}
		placeholder="Search by Model Name"
		class="input"
	/>
	<select class="select" bind:value={selectedYear}>
		<option value="">All Years</option>
		{#each $years as year}
			<option value={year}>{year}</option>
		{/each}
	</select>
	<select class="select" bind:value={selectedManufacturer}>
		<option value="">All Manufacturers</option>
		{#each $manufacturers as manufacturer}
			<option value={manufacturer}>{manufacturer}</option>
		{/each}
	</select>
	<select class="select" bind:value={selectedModelType}>
		<option value="">All Model Types</option>
		{#each $modelTypes as modelType}
			<option value={modelType}>{modelType}</option>
		{/each}
	</select>
	<select class="select" bind:value={selectedUsage}>
		<option value="">All Usages</option>
		{#each $usages as usage}
			<option value={usage}>{usage}</option>
		{/each}
	</select>
</nav>

<main class="px-5">
	{#await $vehicles}
		<h5 class="h5 mb-2 font-semibold">Loading...</h5>
		<ProgressBar value={undefined} />
	{:then vehicles}
		<div class="flex flex-row flex-wrap grow gap-3">
			{#each $displayedVehicles as vehicle (vehicle.vin)}
				<div class="card card-hover w-64 overflow-hidden">
					<header class="bg-black/50">
						<img class="w-64 object-fill" src={vehicle.imageurl} alt={vehicle.title} />
					</header>
					<section class="p-4">
						<p class="text-sm font-semibold">{vehicle.manufacturer}</p>
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
