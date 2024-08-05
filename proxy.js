const express = require('express');
const request = require('request');
const app = express();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/parts', (req, res) => {
	const apiUrl =
		"https://int.lightspeedadp.com/lsapi/Part/76014343?$top=1000&$filter=OnHand gt '1'";
	request({
		url: apiUrl,
		headers: {
			Authorization: 'Basic ' + Buffer.from('76014343:123456').toString('base64')
		}
	}).pipe(res);
});

app.listen(3000, () => {
	console.log('Proxy server running on http://localhost:3000');
});
