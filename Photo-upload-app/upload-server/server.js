// express server to upload files to the server with formidable

const express = require('express');
const formidable = require('formidable');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const PORT = 3000;

app.post('/upload', (req, res) => {
	console.log('POST /upload');
	const form = new formidable.IncomingForm({multiples: false, maxFileSize: 50 * 1024 * 1024, uploadDir: "./upload", keepExtensions: true});

	form.parse(req, (err, fields, files) => {
		if (err) {
			res.status(400).send('Error parsing form data');
			return;
		}

		// Handle the uploaded file
		const imageFile = files.photo;
		console.log('man some photo sick');

		if (!imageFile) {
			res.status(400).send('No file uploaded');
			return;
		}

		// Move the uploaded file to the desired location
		const newPath = path.join(__dirname, 'uploads', 'image.jpg');

		// File was successfully uploaded
		res.status(200).send('File uploaded');
	});
});

app.listen(PORT, () => {
	console.log('hej\' on port ' + PORT);
});