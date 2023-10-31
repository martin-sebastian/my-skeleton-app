<script>
	import { flip } from 'svelte/animate';

	let baskets = [
		{
			name: 'TODO',
			items: ['Task One', 'Task Two', 'Task Three', 'Task Four']
		},
		{
			name: 'DOING',
			items: ['Task Five', 'Task Six', 'Task Seven', 'Task Eight']
		},
		{
			name: 'DONE',
			items: ['Task Nine', 'Task Ten', 'Task Eleven', 'Task Twelve']
		}
	];

	let hoveringOverBasket;

	function dragStart(event, basketIndex, itemIndex) {
		// The data we want to make available when the element is dropped
		// is the index of the item being dragged and
		// the index of the basket from which it is leaving.
		const data = { basketIndex, itemIndex };
		event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}

	function drop(event, basketIndex) {
		event.preventDefault();
		const json = event.dataTransfer.getData('text/plain');
		const data = JSON.parse(json);

		// Remove the item from one basket.
		// Splice returns an array of the deleted elements, just one in this case.
		const [item] = baskets[data.basketIndex].items.splice(data.itemIndex, 1);

		// Add the item to the drop target basket.
		baskets[basketIndex].items.push(item);
		baskets = baskets;

		hoveringOverBasket = null;
	}
</script>

<main class="p-8">
	<h1 class="h1 mb-5">Tasks</h1>
	<div class="flex flex-row gap-4 w-full">
		{#each baskets as basket, basketIndex (basket)}
			<div class="bg-surface-300/5 rounded-lg w-full" animate:flip>
				<h4 class="h4 m-3 font-semibold">{basket.name}</h4>
				<ul
					class="bg-surface-300/5 rounded-lg h-96"
					class:hovering={hoveringOverBasket === basket.name}
					on:dragenter={() => (hoveringOverBasket = basket.name)}
					on:dragleave={() => (hoveringOverBasket = null)}
					on:drop={(event) => drop(event, basketIndex)}
					ondragover="return false"
				>
					{#each basket.items as item, itemIndex (item)}
						<div class="item block" animate:flip>
							<li
								draggable={true}
								on:dragstart={(event) => dragStart(event, basketIndex, itemIndex)}
							>
								{item}
							</li>
						</div>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</main>

<style>
	.hovering {
		border: solid 1px orange;
		border-color: orange;
	}

	li {
		background-color: rgba(0, 0, 0, 0.8);
		border: solid lightgray 0px;
		border-radius: 1rem;
		cursor: pointer;
		display: block;
		margin: 5px;
		padding: 5px 20px;
	}
	li:hover {
		background: orange;
	}
	ul {
		display: flex; /* required for drag & drop to work when .item display is inline */
		flex-direction: column;
	}
</style>
