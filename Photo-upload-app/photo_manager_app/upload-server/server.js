// express server to upload files to the server with formidable

const express = require('express');
const formidable = require('formidable');
const bodyParser = require('body-parser');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const PORT = 4231;
const UPLOAD_DIR = "../public/img";

app.post('/upload', (req, res) => {
	console.log('POST /upload');
	const form = new formidable.IncomingForm({multiples: false, maxFileSize: 50 * 1024 * 1024, uploadDir: UPLOAD_DIR, keepExtensions: true});

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

app.post('/rename', (req, res) => {
	console.log('POST /rename');
	const oldName = req.body.oldName;
	const extension = path.extname(oldName);
	const newName = req.body.newName + extension;

	console.log(req.body);

	fs.rename(path.join(UPLOAD_DIR, oldName), path.join(UPLOAD_DIR, newName), err => {
		if (err) {
			res.status(400).send('Error renaming file');
			return;
		}

		res.status(200).send('File renamed');
	});
});

app.get('/fileNames', (req, res) => {
	console.log('GET /files');
	const files = fs.readdirSync(UPLOAD_DIR);
	// set content type to application/json
	res
		.setHeader('Content-Type', 'application/json')
		.status(200)
		.send(files);
});

app.get('/files', (req, res) => {
	let response = [];
	const files = fs.readdirSync(UPLOAD_DIR);
	// console.log(fs.readFileSync('./upload/' + files[0]));
	files.forEach(file => {
		response.push({ name: file, data: fs.readFileSync(UPLOAD_DIR + '/' + file) });
		// fs.readFileSync('./upload/' + file, (err, data) => {
		// 	if (err) {
		// 		res.status(400).send('Error reading file');
		// 		return;
		// 	}
		// 	console.log(data);
		// 	response.push(data);
		// });
	});

	// console.log(response);
	res.status(200).setHeader('Content-Type', 'application/json').send(response);
});

app.listen(PORT, () => {
	console.log('hej\' on port ' + PORT);
});