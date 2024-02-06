export const load = async ({ fetch }) => {
	const fetchVehicles = async () => {
		const vehicleRes = await fetch('https://www.flatoutmotorcycles.com/unitinventory_univ.xml');
		const vehicleData = await vehicleRes.json();
		return vehicleData;
	};

	return {
		vehicles: fetchVehicles()
	};
};
