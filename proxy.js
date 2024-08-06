import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/parts', async (req, res) => {
	const apiUrl = process.env.API_URL;
	const authHeader =
		'Basic ' +
		Buffer.from(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`).toString('base64');

	try {
		console.log('Sending request to API with headers:', { Authorization: authHeader });

		const response = await axios.get(apiUrl, {
			headers: {
				Authorization: authHeader,
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});

		console.log('API Response Status:', response.status);
		console.log('API Response Body:', response.data);

		res.status(response.status).send(response.data);
	} catch (error) {
		console.error('Error during API request:', error.message);

		if (error.response) {
			console.error('API Response Status:', error.response.status);
			console.error('API Response Headers:', error.response.headers);
			console.error('API Response Body:', error.response.data);
			res.status(error.response.status).send(error.response.data);
		} else {
			res.status(500).send('Internal Server Error');
		}
	}
});

app.listen(3000, () => {
	console.log('Proxy server running on http://localhost:3000');
});
