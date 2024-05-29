<script>
	// Existing imports and state variables
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let searchQuery = ''; // Combined search query for model name, stock number, VIN number, and color
	let selectedManufacturer = '';
	let selectedYear = '';
	let selectedModelType = '';
	let selectedModelTypeStyle = ''; // New filter for model type style
	let selectedColor = ''; // New filter for color
	let selectedUsage = '';
	let isTableView = false; // State for view type
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

	function toggleView() {
		isTableView = !isTableView;
	}
</script>

<!-- UI components with a single input field for combined search -->
<button
	type="button"
	class="mobile-filter-button btn variant-filled-primary"
	on:click={toggleDrawer}>Filter</button
>
<nav class="vehicle-filters bg-surface-500 sticky top-0 flex-row z-50 gap-3 p-3 hidden lg:flex">
	<button type="button" class="btn variant-filled-secondary" on:click={toggleView}>
		{isTableView ? 'Show Card View' : 'Show Table View'}
	</button>
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
	<div class="drawer-content p-2">
		<button type="button" class="drawer-close btn btn-icon" on:click={toggleDrawer}
			><svg class="fill-token h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
				><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
					d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
				/></svg
			></button
		>
		<hr class="mb-2" />
		<!-- Filter content duplicated here -->
		<input
			type="search"
			bind:value={searchQuery}
			placeholder="Search by Model Name, Stock Number, VIN, or Color"
			class="input search m-1 pl-4"
		/>
		<select class="select m-1 pl-4" bind:value={selectedYear}>
			<option value="">All Years</option>
			{#each $years as year}
				<option value={year}>{year}</option>
			{/each}
		</select>
		<select class="select m-1 pl-4" bind:value={selectedManufacturer}>
			<option value="">All Manufacturers</option>
			{#each $manufacturers as manufacturer}
				<option value={manufacturer}>{manufacturer}</option>
			{/each}
		</select>
		<select class="select m-1 pl-4" bind:value={selectedModelType}>
			<option value="">All Model Types</option>
			{#each $modelTypes as modelType}
				<option value={modelType}>{modelType}</option>
			{/each}
		</select>
		<select class="select m-1 pl-4" bind:value={selectedModelTypeStyle}>
			<option value="">All Model Type Styles</option>
			{#each $modelTypeStyles as modelTypeStyle}
				<option value={modelTypeStyle}>{modelTypeStyle}</option>
			{/each}
		</select>
		<select class="select m-1 pl-4" bind:value={selectedColor}>
			<option value="">All Colors</option>
			{#each $colors as color}
				<option value={color}>{color}</option>
			{/each}
		</select>
		<select class="select m-1 pl-4" bind:value={selectedUsage}>
			<option value="">All Usages</option>
			{#each $usages as usage}
				<option value={usage}>{usage}</option>
			{/each}
		</select>
		<button
			type="button"
			class="btn variant-filled-primary clear-filters m-2"
			on:click={clearFilters}
		>
			Clear
		</button>
	</div>
</div>

<!-- Conditionally render the card view or table view -->
<main class="p-5 mt-10">
	{#if isTableView}
		<h2 class="text-2xl font-bold my-5">Table View</h2>
		<div class="table">
			<table class="w-full">
				<thead>
					<tr>
						<th>Image</th>
						<th>Title</th>
						<th>Manuf.</th>
						<th>Year</th>
						<th>Type</th>
						<th>Style</th>
						<th>Color</th>
						<th>Stock #</th>
						<th>VIN</th>
						<th>Price</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each $displayedVehicles as vehicle (vehicle.vin)}
						<tr>
							<td>
								<img src={vehicle.imageurl} alt={vehicle.title} class="w-20 h-auto object-cover" />
							</td>
							<td>{vehicle.title}</td>
							<td>{vehicle.manufacturer}</td>
							<td>{vehicle.year}</td>
							<td>{vehicle.model_type}</td>
							<td>{vehicle.model_typestyle}</td>
							<td>{vehicle.color}</td>
							<td>{vehicle.stocknumber}</td>
							<td>{vehicle.vin}</td>
							<td>{vehicle.price}</td>
							<td>
								<a href={`/vehicles/${vehicle.vin}`} class="btn btn-sm variant-filled-primary"
									>View Details</a
								>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
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
						<a href={`/vehicles/${vehicle.vin}`} class="btn btn-sm variant-filled-primary"
							>View Vehicle Details</a
						>
					</footer>
				</div>
			{/each}
		</div>
	{/if}
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

	.drawer-close {
		cursor: pointer;
		padding: 5px 0;
	}

	.mobile-filter-button {
		display: block;
	}

	@media (min-width: 1024px) {
		.mobile-filter-button {
			display: none;
		}
	}
</style>
