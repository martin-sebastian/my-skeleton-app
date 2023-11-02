<script>
	import { onMount } from 'svelte';
	import apiData from './store.js';

	let data = {};

	onMount(async () => {
		// Wait for the data to be fetched
		data = $apiData;
		console.log(data);
	});
</script>

<main class="p-8">
	<h1 class="h1 mb-10">Vehicle Data via API</h1>

	{#if data !== null}
		<div class="max-w-xl rounded-xl overflow-hidden shadow-lg">
			<img class="w-full" src={data.ImageUrl} alt="{data.ModelName} - {data.Color}" />
			<div class="px-6 py-4">
				<div class="font-bold text-xl mb-2">
					{data.vehicleTitle}
				</div>
				<p class="text-gray-500 text-base">
					{data.MSRP}
				</p>
				<p>{data.formattedDate}</p>
			</div>
			<div class="grid grid-flow-col grid-rows-1 grid-cols-5 gap-2">
				<div>
					<img src={data.ImageUrl} alt="" loading="lazy" />
				</div>
				<div>
					<img src={data.ImageUrl} alt="" loading="lazy" />
				</div>
				<div>
					<img src={data.ImageUrl} alt="" loading="lazy" />
				</div>
				<div>
					<img src={data.ImageUrl} alt="" loading="lazy" />
				</div>
				<div>
					<img src={data.ImageUrl} alt="" loading="lazy" />
				</div>
			</div>
			<div class="px-6 pt-4 pb-2">
				<span
					class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
					>{data.StockNumber}</span
				>
				<span
					class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
					>{data.ModelCode}</span
				>
				<span
					class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
					>{data.B50ModelTypeStyle}</span
				>
				{#if data.Stocked === true}
					<span
						class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
						>In Stock</span
					>
				{:else}
					<span
						class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
						>Not In Stock</span
					>
				{/if}
			</div>
		</div>
		<div class="w-5 h-36" />
		<hr />
		<pre class="bg-gray-900">{JSON.stringify(data, null, 2)}</pre>
	{:else}
		<p>Loading...</p>
	{/if}
</main>
