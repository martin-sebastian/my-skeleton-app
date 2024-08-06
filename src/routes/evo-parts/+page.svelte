<script>
	import { onMount } from 'svelte';

	let parts = [];

	onMount(async () => {
		try {
			const response = await fetch('http://localhost:3000/api/parts');

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			parts = data || [];
			console.log(parts);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});
</script>

<div class="container mt-5">
	<h1 class="text-center mb-4">Parts List</h1>
	<table class="table table-striped">
		<thead>
			<tr>
				<th>Part Number</th>
				<th>Description</th>
				<th>On Hand</th>
				<th>Available</th>
				<th>Last Sold Date</th>
				<th>Price</th>
				<th>Location (Bin)</th>
			</tr>
		</thead>
		<tbody>
			{#each parts as part}
				<tr>
					<td>{part.PartNumber || 'N/A'}</td>
					<td>{part.Description || 'N/A'}</td>
					<td>{part.OnHand || '0'}</td>
					<td>{part.Avail || '0'}</td>
					<td>{part.LastSoldDate || 'N/A'}</td>
					<td>{part.CurrentActivePrice.toFixed(2) || '0.00'}</td>
					<td>{part.Bin1 || 'N/A'}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
	}

	h1 {
		margin-bottom: 20px;
	}
</style>
