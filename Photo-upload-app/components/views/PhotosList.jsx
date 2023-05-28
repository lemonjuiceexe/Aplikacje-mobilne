import {
	StyleSheet,
	View,
	Text,
	Image,
	FlatList,
	TouchableOpacity,
	ToastAndroid,
	Dimensions,
	ActivityIndicator
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {useIsFocused} from "@react-navigation/native";
import * as ExpoMediaLibrary from 'expo-media-library';
import * as SecureStore from "expo-secure-store";
import {useState, useEffect} from "react";

import Button from "../Button";
import {createAlbumAsync, getAlbumAsync, getAssetsAsync} from "expo-media-library";

export default function PhotosList(props) {
	const [filesPermission, setFilesPermission] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [gridView, setGridView] = useState(true);
	const isFocused = useIsFocused();

	const PHOTOS_AMOUNT = 30;
	const DIRECTORY_NAME = "PhotoApp";

	useEffect(() => {
		async function getPermission() {
			return await ExpoMediaLibrary.requestPermissionsAsync();
		}

		getPermission().then((permission) => {
			if (permission.status === "granted") {
				setFilesPermission(true);

			} else {
				ToastAndroid.show("You need to give files permission to use this app", ToastAndroid.LONG);
			}
		});
	}, []);
	// Fetch photos when permissions granted or entered the view (isFocused)
	useEffect(() => {
		refreshPhotos().catch(error => console.log(error));
	}, [filesPermission, isFocused]);

	async function refreshPhotos() {
		async function getOrCreateDirectory(directoryName) {
			// If directory exists, return it
			if ((await getAlbumAsync(directoryName)) !== null) return getAlbumAsync(directoryName);
			// On Android it's impossible to create an empty directory, so we need to create it with a sample asset
			const sampleAsset = (await getAssetsAsync()).assets[2];
			return createAlbumAsync("PhotoApp", sampleAsset);
		}

		async function getPhotos(albumRef) {
			return await ExpoMediaLibrary.getAssetsAsync({
				first: PHOTOS_AMOUNT,
				album: albumRef,
				mediaType: ExpoMediaLibrary.MediaType.photo,
				sortBy: [ExpoMediaLibrary.SortBy.modificationTime]
			});
		}

		// If got permission, get photos
		if (filesPermission) {
			getOrCreateDirectory(DIRECTORY_NAME).then(directory => {
				getPhotos(directory)
					.then((res) => {
						// Add a new `selected` property to each photo, representing user selection
						res.assets.map(el => el.selected = false);
						setPhotos(res.assets);
					});
			})
				.catch(error => console.log(error));
		}
	}

	function selectPhotoHandler(item) {
		item.selected = !item.selected;
		setPhotos(prevState =>
			prevState.map(el => el.id === item.id ? item : el)
		)
	}

	function toggleViewHandler() {
		setGridView(prevState => !prevState);
	}

	async function deleteHandler() {
		ExpoMediaLibrary.deleteAssetsAsync(photos.filter(el => el.selected))
			.then(refreshPhotos)
			.catch(error => console.log(error));
	}

	async function uploadSelectedHandler() {
		let formData = new FormData();
		photos.filter(el => el.selected).forEach(el => {
			formData.append("photos", {
				uri: el.uri,
				type: "image/jpeg",
				name: el.filename
			});
		});

		refreshPhotos();

		const ip = await SecureStore.getItemAsync("IP");
		const port = await SecureStore.getItemAsync("Port");
		console.log(formData);
		fetch(`http://${ip}:${port}/upload`,
			{
				method: "POST",
				body: formData
			},
			{
				headers: {
					"Content-Type": "multipart/form-data"
				}
			}
		)
			.then(response => response.json())
			.then(data => ToastAndroid.show('Upload successful', ToastAndroid.LONG))
			.catch(error => ToastAndroid.show('Upload unsuccessful', ToastAndroid.LONG));
	}

	function setServerDataHandler() {
		props.navigation.navigate("ServerSettings");
	}

	if (!filesPermission) {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>Waiting for files permisssion...</Text>
				<ActivityIndicator size="large" color="#E91E63"/>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.buttonsContainer}>
				<View style={styles.buttonContainerRow}>
					<Button text="&#x1FA9F;" // Layout button
							{...styles.button}
							onPress={toggleViewHandler}
					/>
					<Button text="&#x1F4F8;" // Camera button
							{...styles.button}
							onPress={() => props.navigation.navigate("Camera", {DIRECTORY_NAME: DIRECTORY_NAME})}
					/>
					<Button text="&#x1F5D1;" // Delete button
							{...styles.button}
							onPress={deleteHandler}
					/>
				</View>
				<View style={styles.buttonContainerRow}>
					<Button text="Upload selected"
							{...styles.button}
							onPress={uploadSelectedHandler}
					/>
					<Button text="Set server data"
							{...styles.button}
							onPress={setServerDataHandler}
					/>
				</View>
			</View>
			<View style={gridView ? styles.list : styles.listListView}>
				{photos.length !== 0 && <FlatList
					data={photos}
					style={{width: '100%'}}
					renderItem={({item}) => (
						<TouchableOpacity
							style={gridView ? styles.singleImageContainer : styles.singleImageListContainer}
							onPress={() => props.navigation.navigate("PhotoDetails", {photo: item})}
							onLongPress={() => selectPhotoHandler(item)}
						>
							<BouncyCheckbox style={styles.checkbox}
											fillColor={"#E91E63"}
											isChecked={item.selected}
											disableBuiltInState={true}
											onPress={() => selectPhotoHandler(item)}
							/>
							<Image style={gridView ? {width: 100, height: 100} : styles.imageListView}
								   source={{uri: item.uri}}/>
							<Text style={styles.imageText}>
								{item.id}
							</Text>
						</TouchableOpacity>
					)}
					keyExtractor={() => Math.random().toString()}
					key={gridView ? "grid" : "list"}
					numColumns={gridView ? 3 : 1}
					contentContainerStyle={{justifyContent: 'space-between', alignItems: 'center'}}
				/>}
				{photos.length === 0 && <Text style={styles.warningText}>No photos in directory</Text>}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		height: '100%',
		width: '100%',
		backgroundColor: '#212121'
	},
	buttonsContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
	},
	buttonContainerRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	button: {
		backgroundColor: "#E91E63",
		height: "70%",
		paddingHorizontal: 35,
		paddingVertical: 5,
		textHeight: '100%'
	},
	list: {
		flex: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: "100%",
		paddingVertical: 15,
	},
	listListView: {
		flex: 5,
		flexDirection: 'column',
		alignItems: 'flex-start',
		width: '100%',
		paddingVertical: 15
	},
	singleImageContainer: {
		margin: 4,
		borderWidth: 2,
		borderColor: "#E91E63"
	},
	singleImageListContainer: {
		borderColor: "#E91E63",
		borderWidth: 2,
		margin: 15,
		width: Dimensions.get("window").width - 15
	},
	imageListView: {
		width: '100%',
		aspectRatio: 4 / 3
	},
	checkbox: {
		position: "absolute",
		top: 5,
		left: 5,
		zIndex: 1,
	},
	imageText: {
		position: "absolute",
		right: 0,
		bottom: 0,
		backgroundColor: "#E91E63",
		color: "#fff",
		paddingVertical: 2,
		paddingHorizontal: 5,
	},
	text: {
		fontSize: 25,
		margin: 20,
		textAlign: 'center',
		lineHeight: 35,
		color: '#fff'
	},
	warningText: {
		fontSize: 25,
		width: '100%',
		textAlign: 'center',
		color: '#fff'
	}
});