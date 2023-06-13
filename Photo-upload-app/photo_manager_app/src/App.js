import {useState, useEffect} from "react";

import FileList from "./components/FileList";

import logo from './logo.svg';
import styles from './App.module.css';

const IP = "http://localhost:4231";

function App() {
	const [dataLoaded, setDataLoaded] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [selectedNames, setSelectedNames] = useState([]);

	function refreshFiles() {
		setDataLoaded(false);
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
	function selectAllHandler() {
		if(selectedNames.length === photos.length){
			setSelectedNames([]);
		} else {
			setSelectedNames(photos);
		}
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
		<div className={styles.App}>
			<header className={styles.AppHeader}>
				<img src={logo} className={styles['App-logo']} alt="logo" />
				<p>
					The photos are loading...
				</p>
			</header>
		</div>
	);

	return (
		<div className={styles.App}>
			<div className={styles.buttonsWrapper}>
				<button className={styles.button} onClick={refreshFiles}>Refresh</button>
				<button className={styles.button} onClick={selectAllHandler}>
					{photos.length === selectedNames.length ? 'Deselect all' : 'Select all'}</button>
				<button className={styles.button} onClick={() => deletePhotosHandler(selectedNames)}>Delete selected</button>
			</div>
			<FileList photos={photos} selectedNames={selectedNames}
					  onToggleSelectPhoto={toggleSelectPhotoHandler}
					  onRenamePhoto={renamePhotoHandler}
					  onDeletePhoto={deletePhotosHandler}
			/>
		</div>
	);
}

export default App;
