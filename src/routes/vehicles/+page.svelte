<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { ProgressBar } from '@skeletonlabs/skeleton';

	let modelNameQuery = '';
	let selectedManufacturer = '';
	let selectedYear = '';
	let selectedModelType = '';
	let selectedModelTypeStyle = ''; // New filter for model type style
	let selectedColor = ''; // New filter for color
	let selectedUsage = '';
	let manufacturers = writable([]);
	let years = writable([]);
	let modelTypes = writable([]);
	let modelTypeStyles = writable([]); // Store for model type styles
	let colors = writable([]); // Store for colors
	let usages = writable([]);
	let vehicles = writable([]);
	let displayedVehicles = writable([]);

	onMount(async () => {
		await fetchVehicles();
	});

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
			let fetchedVehicles = Array.from(items).map((item) => parseVehicle(item));
			vehicles.set(fetchedVehicles);
			manufacturers.set(
				[...new Set(fetchedVehicles.map((vehicle) => vehicle.manufacturer))].sort()
			);
			years.set([...new Set(fetchedVehicles.map((vehicle) => vehicle.year))].sort((a, b) => b - a));
			modelTypes.set([...new Set(fetchedVehicles.map((vehicle) => vehicle.model_type))].sort());
			modelTypeStyles.set(
				[...new Set(fetchedVehicles.map((vehicle) => vehicle.model_typestyle))].sort()
			); // Set model type styles
			colors.set([...new Set(fetchedVehicles.map((vehicle) => vehicle.color))].sort()); // Set colors
			usages.set([...new Set(fetchedVehicles.map((vehicle) => vehicle.usage))].sort());
		} catch (error) {
			console.error('Failed to fetch vehicles:', error);
		}
	}

	function parseVehicle(item) {
		const getTextContent = (selector) => {
			const element = item.querySelector(selector);
			return element ? element.textContent : null;
		};
		return {
			manufacturer: getTextContent('manufacturer'),
			year: getTextContent('year'),
			model_type: getTextContent('model_type'),
			model_typestyle: getTextContent('model_typestyle'), // Extract model type style
			color: getTextContent('color'), // Extract color
			model_name: getTextContent('model_name'),
			usage: getTextContent('usage'),
			stocknumber: getTextContent('stocknumber'),
			title: getTextContent('title'),
			link: getTextContent('link'),
			price: formatPrice(getTextContent('price')),
			vin: getTextContent('vin'),
			description: getTextContent('description'),
			imageurl: getTextContent('imageurl')
		};
	}

	function formatPrice(price) {
		return Number(price) ? `$${Number(price).toLocaleString('en-US')}` : 'N/A';
	}

	$: displayedVehicles.set(
		$vehicles.filter(
			(vehicle) =>
				(!modelNameQuery || vehicle.title.toLowerCase().includes(modelNameQuery.toLowerCase())) &&
				(!selectedManufacturer || vehicle.manufacturer === selectedManufacturer) &&
				(!selectedYear || vehicle.year === selectedYear) &&
				(!selectedModelType || vehicle.model_type === selectedModelType) &&
				(!selectedModelTypeStyle || vehicle.model_typestyle === selectedModelTypeStyle) && // Filter by model type style
				(!selectedColor || vehicle.color === selectedColor) && // Filter by color
				(!selectedUsage || vehicle.usage === selectedUsage)
		)
	);
</script>

<!-- UI components with new dropdowns -->
<nav class="vehicle-filters bg-surface-500/90 sticky top-0 flex flex-row gap-3 p-3">
	<input
		type="search"
		bind:value={modelNameQuery}
		placeholder="Search by Model Name"
		class="input search"
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
	<select class="select" bind:value={selectedModelTypeStyle}>
		<option value="">All Model Type Styles</option>
		{#each $modelTypeStyles as modelTypeStyle}
			<option value={modelTypeStyle}>{modelTypeStyle}</option>
		{/each}
	</select>
	<select class="select" bind:value={selectedColor}>
		<option value="">All Colors</option>
		{#each $colors as color}
			<option value={color}>{color}</option>
		{/each}
	</select>
	<select class="select" bind:value={selectedUsage}>
		<option value="">All Usages</option>
		{#each $usages as usage}
			<option value={usage}>{usage}</option>
		{/each}
	</select>
</nav>

<!-- The rest of your component -->
<main class="p-5">
	{#await $displayedVehicles}
		<h5 class="h5 my-5 py-5 font-semibold">Loading...</h5>
		<ProgressBar />
	{:then $displayedVehicles}
		<div class="flex flex-row flex-wrap grow gap-5">
			{#each $displayedVehicles as vehicle (vehicle.vin)}
				<div class="card card-hover w-64 max-w-64 overflow-hidden">
					<header class="bg-black/50">
						<img class="w-64 object-fill" src={vehicle.imageurl} alt={vehicle.title} />
					</header>
					<section class="p-4">
						<p class="text-sm font-semibold">{vehicle.manufacturer}</p>
						<p class="text-sm font-semibold">{vehicle.title}</p>
						<p class="text-sm text-gray-500">VIN: {vehicle.vin}</p>
						<p class="text-sm text-gray-500">Price: {vehicle.price}</p>
						<p class="text-sm text-gray-500 font-semibold">Stock #: {vehicle.stocknumber}</p>
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

<style>
	.card {
		border-radius: 0.5rem;
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
		transition: box-shadow 0.3s;
	}
	@media (max-width: 640px) {
		.card {
			width: 50%;
			z-index: -1;
		}
		.vehicle-filters {
			flex-wrap: wrap;
		}
		input.search {
			width: 100%;
		}
	}
</style>
