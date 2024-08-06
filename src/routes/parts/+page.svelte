<script>
	import { onMount } from 'svelte';
	import { createGrid } from 'ag-grid-community';
	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-alpine.css';

	let gridElement;

	let gridOptions = {
		columnDefs: [
			{ headerName: 'Part Number', field: 'PartNumber' },
			{ headerName: 'Description', field: 'Description' },
			{ headerName: 'On Hand', field: 'OnHand' },
			{ headerName: 'Available', field: 'Avail' },
			{ headerName: 'Last Sold Date', field: 'LastSoldDate' },
			{
				headerName: 'Price',
				field: 'CurrentActivePrice',
				valueFormatter: (params) => `$${params.value.toFixed(2)}`
			},
			{ headerName: 'Location (Bin)', field: 'Bin1' }
		],
		defaultColDef: {
			sortable: true,
			filter: true,
			resizable: true
		}
	};

	onMount(async () => {
		try {
			const response = await fetch('http://localhost:3000/api/parts');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();

			// Initialize AG Grid and get the gridApi
			const { api: gridApi } = createGrid(gridElement, gridOptions);

			// Use applyTransaction to add the row data if gridApi is available
			if (gridApi) {
				gridApi.applyTransaction({ add: data });
			} else {
				console.error('Grid API is not ready');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});
</script>

<div class="ag-theme-alpine" style="height: 500px; width: 100%;" bind:this={gridElement} />

<style>
	.ag-theme-alpine {
		width: 100%;
		height: 500px;
	}
</style>
