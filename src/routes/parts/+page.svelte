<script>
	import { onMount } from 'svelte';

	let parts = [];

	onMount(async () => {
		const apiUrl =
			"https://int.lightspeedadp.com/lsapi/Part/76014343?$top=1000&$filter=OnHand gt '1'";
		try {
			const response = await fetch(apiUrl, {
				method: 'GET',
				headers: {
					Authorization: 'Basic ' + btoa('76014343:123456'), // Base64 encode username and key
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			parts = data.value || []; // Assuming the parts are in `value` array
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});
</script>

<template>
	<div class="container mt-5">
		<h1 class="text-center mb-4">Parts List</h1>
		<table class="table table-striped">
			<thead>
				<tr>
					<th>Part Number</th>
					<th>Description</th>
					<th>On Hand</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				{#each parts as part}
					<tr>
						<td>{part.PartNumber || 'N/A'}</td>
						<td>{part.Description || 'N/A'}</td>
						<td>{part.OnHand || '0'}</td>
						<td>{part.Price || '0.00'}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</template>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
	}

	h1 {
		margin-bottom: 20px;
	}
</style>
