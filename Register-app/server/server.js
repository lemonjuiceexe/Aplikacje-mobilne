const express = require('express');
const { readFileSync, writeFile } = require('fs');
const app = express();

let users = [];
// The file is relative to the whole project's root and not the server file
try{
	users = JSON.parse(readFileSync('./server/users.json', { encoding: 'utf8', flag: 'r' }));
}
catch(err){
	// If the file doesn't exist, create it
	readFileSync('./server/users.json', { encoding: 'utf8', flag: 'w+' });
}

app.get('/', (req, res) => {
	  users.push({
		  "login": "added",
		  "password": "ads",
		  "date": new Date().toLocaleString("pl-PL")
	  });
	  console.log('New users: ' + JSON.stringify(users));
	  writeFile('./server/users.json', JSON.stringify(users), (err) => {
		  if (err) {
			  console.log(err);
			  res.status(500).setHeader('Content-Type', 'text/plain').send('500 Error while saving file');
			  return;
		  }
		  console.log('File has been saved');
		  res.status(200).setHeader('Content-Type', 'text/plain').send('200 File has been saved');
		  users = JSON.parse(readFileSync('./server/users.json', 'utf8'));
	  });
});

app.listen(3000, () => {
	  console.log('Server listening on port 3000');
});