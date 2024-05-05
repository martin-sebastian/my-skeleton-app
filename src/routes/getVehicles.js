import fetch from 'node-fetch';

export async function get(req, res, next) {
	try {
		const response = await fetch('https://www.flatoutmotorcycles.com/unitinventory_univ.xml');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.text();
		const parser = new DOMParser();
		const xml = parser.parseFromString(data, 'application/xml');
		const items = xml.querySelectorAll('item');
		let vehicles = Array.from(items).map((item) => {
			const getTextContent = (selector) => {
				const element = item.querySelector(selector);
				return element ? element.textContent : null;
			};
			return {
				stocknumber: getTextContent('stocknumber'),
				title: getTextContent('title'),
				link: getTextContent('link'),
				price: getTextContent('price'),
				usage: getTextContent('usage'),
				vin: getTextContent('vin'),
				description: getTextContent('description'),
				imageurl: getTextContent('imageurl')
			};
		});
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify(vehicles));
	} catch (error) {
		res.writeHead(500, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify({ error: 'Failed to fetch vehicles' }));
	}
}
