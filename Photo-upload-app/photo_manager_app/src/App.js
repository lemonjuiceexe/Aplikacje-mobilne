import {useState, useEffect} from "react";

import FileList from "./components/FileList";

import logo from './logo.svg';
import './App.css';

const IP = "http://localhost:4231";

function App() {
	const [dataLoaded, setDataLoaded] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [selectedNames, setSelectedNames] = useState([]);

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

	function toggleSelectPhotoHandler(name){
		if(selectedNames.includes(name)){
			setSelectedNames(selectedNames.filter(n => n !== name));
		} else {
			setSelectedNames([...selectedNames, name]);
		}
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
	async function deletePhotosHandler(photoNames){
		console.log('delete');
		fetch(IP + '/delete', {
			method: 'POST',
			body: JSON.stringify({
				names: photoNames
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => { console.log('delete then'); refreshFiles(); })
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
			<FileList photos={photos} selectedNames={selectedNames}
					  onToggleSelectPhoto={toggleSelectPhotoHandler}
					  onRenamePhoto={renamePhotoHandler}
					  onDeletePhoto={deletePhotosHandler}
			/>
		</div>
	);
}

export default App;
