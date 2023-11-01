import { writable } from 'svelte/store';

// Create a writable store with initial value of null
const store = writable(null);

// Function to fetch data from the API
async function fetchData() {
	const response = await fetch(
		'https://newportal.flatoutmotorcycles.com/portal/public/api/majorunit/stocknumber/P25060'
	);
	const data = await response.json();

	// Create vehicleTitle
	const vehicleTitle = `${data.ModelYear} ${data.Manufacturer} ${data.ModelName} ${data.Color}`;
	const expirationDate = new Date(data.ExpirationDate);

	// Update the store with the fetched data
	store.set({ ...data, vehicleTitle, expirationDate });
}

// Fetch data when the store is created
fetchData();

export default store;
