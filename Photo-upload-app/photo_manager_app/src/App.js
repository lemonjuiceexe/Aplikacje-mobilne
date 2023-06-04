import {useState, useEffect} from "react";

import FileList from "./components/FileList";

import logo from './logo.svg';
import './App.css';

const IP = "http://localhost:4231";

function App() {
	const [dataLoaded, setDataLoaded] = useState(false);
	const [photos, setPhotos] = useState([]);

	function refreshFiles() {
		fetch(IP + '/fileNames', {
			method: "GET"
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setDataLoaded(true);
				setPhotos(data);
			})
			.catch(error => {
				console.log(error);
			});
	}

	async function renamePhotoHandler(photoName){
		fetch(IP + '/rename', {
			method: 'POST',
			body: JSON.stringify({
				oldName: photoName,
				newName: prompt('Enter new name for the photo')
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => refreshFiles())
			.catch(error => refreshFiles());
	}


	useEffect(refreshFiles, []);

	if(!dataLoaded)
		return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					The photos are loading...
				</p>
			</header>
		</div>
	);

	return (
		<div className="App">
			<FileList photos={photos} renamePhotoHandler={renamePhotoHandler} />
		</div>
	);
}

export default App;
