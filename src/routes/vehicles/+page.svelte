<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { ProgressBar } from '@skeletonlabs/skeleton';

	let searchQuery = ''; // Combined search query for model name, stock number, VIN number, and color
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

	let isDrawerOpen = false; // State for drawer visibility

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
				(!searchQuery ||
					vehicle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					vehicle.stocknumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
					vehicle.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
					vehicle.color.toLowerCase().includes(searchQuery.toLowerCase())) && // Add color filter to search query
				(!selectedManufacturer || vehicle.manufacturer === selectedManufacturer) &&
				(!selectedYear || vehicle.year === selectedYear) &&
				(!selectedModelType || vehicle.model_type === selectedModelType) &&
				(!selectedModelTypeStyle || vehicle.model_typestyle === selectedModelTypeStyle) && // Filter by model type style
				(!selectedColor || vehicle.color === selectedColor) && // Filter by color
				(!selectedUsage || vehicle.usage === selectedUsage)
		)
	);

	function clearFilters() {
		searchQuery = ''; // Clear combined search query
		selectedManufacturer = '';
		selectedYear = '';
		selectedModelType = '';
		selectedModelTypeStyle = '';
		selectedColor = '';
		selectedUsage = '';
	}

	function toggleDrawer() {
		isDrawerOpen = !isDrawerOpen;
	}
</script>

<!-- UI components with a single input field for combined search -->
<button class="mobile-filter-button" on:click={toggleDrawer}>Filter</button>
<nav
	class="vehicle-filters bg-surface-500/90 sticky top-0 flex flex-row z-50 gap-3 p-3 hidden lg:flex"
>
	<!-- Existing filter content here -->
	<input
		type="search"
		bind:value={searchQuery}
		placeholder="Search by Model Name, Stock Number, VIN, or Color"
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
	<button type="button" class="btn clear-filters" on:click={clearFilters}> Clear </button>
</nav>

<!-- Drawer for mobile -->
<div class:drawer-open={isDrawerOpen} class="drawer lg:hidden bg-surface-500/100">
	<div class="drawer-content">
		<button type="button" class="drawer-close btn variant-filled-surface" on:click={toggleDrawer}
			>Close</button
		>
		<!-- Filter content duplicated here -->
		<input
			type="search"
			bind:value={searchQuery}
			placeholder="Search by Model Name, Stock Number, VIN, or Color"
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
		<button class="btn clear-filters" on:click={clearFilters}> Clear </button>
	</div>
</div>

<!-- The rest of your component -->
<main class="p-5">
	{#await $displayedVehicles}
		<h5 class="h5 my-5 py-5 font-semibold">Loading...</h5>
		<ProgressBar />
	{:then $displayedVehicles}
		<div class="flex flex-row flex-wrap justify-start items-stretch gap-4">
			{#each $displayedVehicles as vehicle (vehicle.vin)}
				<div
					class="card card-hover bg-surface-500/10 border border-gray-300/10 w-80 overflow-hidden"
				>
					<header class="bg-gray-300/10 overflow-hidden">
						<img
							class="object-cover w-auto aspect-16/9"
							src={vehicle.imageurl}
							alt={vehicle.title}
						/>
					</header>
					<section class="p-4 h-48">
						<p class="text-sm font-semibold text-current my-1">{vehicle.title}</p>
						<p class="text-sm text-gray-500 font-semibold">Stock #: {vehicle.stocknumber}</p>
						<p class="text-sm text-gray-500">VIN: {vehicle.vin}</p>
						<p class="text-sm font-bold text-current my-1">Price: {vehicle.price}</p>

						<span
							class="inline-flex items-center rounded-md bg-red-500 px-2 py-1 my-1 text-xs font-medium text-current ring-1 ring-inset ring-gray-500/10"
							>{vehicle.manufacturer}</span
						>
						<span
							class="inline-flex items-center rounded-md bg-blue-500 px-2 py-1 my-1 text-xs font-medium text-white-600 ring-1 ring-inset ring-gray-500/10"
							>{vehicle.model_type}</span
						>
						<span
							class="inline-flex items-center rounded-md bg-orange-500 px-2 py-1 my-1 text-xs font-medium text-white-600 ring-1 ring-inset ring-gray-500/10"
							>{vehicle.model_typestyle}</span
						>
						<span
							class="inline-flex items-center rounded-md bg-gray-500 px-2 py-1 my-1 text-xs font-medium text-white-600 ring-1 ring-inset ring-gray-500/10"
							>{vehicle.color}</span
						>
					</section>
					<footer class="card-footer py-3">
						<a href={vehicle.link} class="btn btn-sm variant-filled-primary" target="_blank"
							>Goto web page</a
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
	.drawer {
		position: fixed;
		top: 0;
		right: -100%;
		width: 80%;
		max-width: 300px;
		height: 100%;

		box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
		transition: right 0.3s ease;
		z-index: 1000;
	}

	.drawer-open {
		right: 0;
	}

	.drawer-content {
		padding: 20px;
	}

	.drawer-close {
		background: none;
		border: none;

		font-size: 20px;
		cursor: pointer;
	}

	.mobile-filter-button {
		display: block;
		margin: 10px;
		background: none;
		border: 5px solid black;
		border-radius: 5px;
		padding: 10px;
		cursor: pointer;
	}

	@media (min-width: 1024px) {
		.mobile-filter-button {
			display: none;
		}
	}
</style>
