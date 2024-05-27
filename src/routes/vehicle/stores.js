import { writable } from 'svelte/store';

// Create a writable store with initial value of null
const store = writable(null);

// Function to fetch data from the API
async function fetchData() {
	const response = await fetch(
		'https://newportal.flatoutmotorcycles.com/portal/public/api/majorunit/stocknumber/SCSC177'
	);
	const data = await response.json();

	// Create vehicleTitle and expirationDate properties
	const vehicleTitle = `${data.ModelYear} ${data.Manufacturer} ${data.ModelName} ${data.Color}`;
	const expirationDate = new Date(data.ExpirationDate);

	// Format the date
	const formattedDate = expirationDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	// Update the store with the fetched data
	store.set({ ...data, vehicleTitle, expirationDate, formattedDate });
}

// Fetch data when the store is created
fetchData();

export default store;
