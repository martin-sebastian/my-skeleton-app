<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';

	let vehicle = writable(null);
	let error = writable(null);

	onMount(async () => {
		const id = $page.params.id;
		try {
			const response = await fetch('https://www.flatoutmotorcycles.com/unitinventory_univ.xml');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.text();
			const parser = new DOMParser();
			const xml = parser.parseFromString(data, 'application/xml');
			const items = xml.querySelectorAll('item');
			const selectedVehicle = Array.from(items)
				.map(parseVehicle)
				.find((v) => v.vin === id);
			if (!selectedVehicle) {
				throw new Error('Vehicle not found');
			}
			vehicle.set(selectedVehicle);
		} catch (e) {
			error.set(e.message);
		}
	});

	function parseVehicle(item) {
		const getTextContent = (selector) => {
			const element = item.querySelector(selector);
			return element ? element.textContent : null;
		};
		return {
			manufacturer: getTextContent('manufacturer'),
			year: getTextContent('year'),
			model_type: getTextContent('model_type'),
			model_typestyle: getTextContent('model_typestyle'),
			color: getTextContent('color'),
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
</script>

<main class="p-5 mt-10">
	{#if $error}
		<p>Error: {$error}</p>
	{:else if $vehicle}
		<div class="vehicle-detail">
			<header class="vehicle-header">
				<img src={$vehicle.imageurl} alt={$vehicle.title} />
				<h1>{$vehicle.title}</h1>
			</header>
			<section class="vehicle-info">
				<p><strong>Manufacturer:</strong> {$vehicle.manufacturer}</p>
				<p><strong>Year:</strong> {$vehicle.year}</p>
				<p><strong>Model Type:</strong> {$vehicle.model_type}</p>
				<p><strong>Model Type Style:</strong> {$vehicle.model_typestyle}</p>
				<p><strong>Color:</strong> {$vehicle.color}</p>
				<p><strong>Usage:</strong> {$vehicle.usage}</p>
				<p><strong>Stock Number:</strong> {$vehicle.stocknumber}</p>
				<p><strong>VIN:</strong> {$vehicle.vin}</p>
				<p><strong>Price:</strong> {$vehicle.price}</p>
				<p><strong>Description:</strong> {$vehicle.description}</p>
				<a href={$vehicle.link} class="btn btn-primary" target="_blank">View on Website</a>
			</section>
		</div>
	{:else}
		<p>Loading...</p>
	{/if}
</main>

<style>
	.vehicle-detail {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.vehicle-header {
		text-align: center;
	}
	.vehicle-header img {
		width: 100%;
		max-width: 600px;
	}
	.vehicle-info {
		margin-top: 20px;
	}
	.vehicle-info p {
		margin: 5px 0;
	}
</style>
