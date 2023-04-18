const express = require('express');
const {readFileSync, writeFile} = require('fs');
const path = require('path');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let users = [];
// The file is relative to the whole project's root and not the server file
try {
	users = JSON.parse(readFileSync('./server/users.json', {encoding: 'utf8', flag: 'r'}));
} catch (err) {
	// If the file doesn't exist, create it
	readFileSync('./server/users.json', {encoding: 'utf8', flag: 'w+'});
}

app.get('/', (req, res) => {
	res.render("index.html");
});
app.post('/', (req, res) => {
	console.log("Yummy request");
	const action = req.body.action;
	switch (action) {
		case 'addUser':
			// Check if the user already exists
			for (let i = 0; i < users.length; i++) {
				if (users[i].login === req.body.login) {
					res.json({
						exists: true
					});
					return;
				}
			}
			users.push({
				"login": req.body.login,
				"password": req.body.password,
				"date": new Date().toLocaleString("pl-PL")
			});
			// Insert to file
			writeFile('./server/users.json', JSON.stringify(users), (err) => {
				if (err) {
					console.log(err);
					res
						.status(500)
						.setHeader('Content-Type', 'text/plain')
						.send('500 Error while adding the user');
					return;
				}
				console.log('User successfully added');
				res
					.status(200)
					.setHeader('Content-Type', 'text/plain')
					.send('200 User added');
				users = JSON.parse(readFileSync('./server/users.json', 'utf8'));
			});

			break;
		case 'getUsers':
			res.json(users);
			break;
		default:
			res
				.status(400)
				.setHeader('Content-Type', 'text/plain')
				.send('400 Bad request: POST request needs to have a valid `action` parameter');
	}
});

app.listen(3000, '0.0.0.0', () => {
	console.log('Server listening on port 3000');
});