import {StyleSheet, View, Text, Image, FlatList, TouchableOpacity, ToastAndroid, ActivityIndicator} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import * as ExpoMediaLibrary from 'expo-media-library';
import {useState, useEffect} from "react";

import Button from "../Button";
import {createAlbumAsync, getAlbumAsync, getAssetsAsync} from "expo-media-library";

export default function PhotosList(props) {
	const [filesPermission, setFilesPermission] = useState(false);
	const [photos, setPhotos] = useState([]);
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
						setPhotos(res.assets);
					});
			})
				.catch(error => console.log(error));
		}
	}, [filesPermission, isFocused]);

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
					/>
					<Button text="&#x1F4F8;" // Camera button
							{...styles.button}
							onPress={() => props.navigation.navigate("Camera", {DIRECTORY_NAME: DIRECTORY_NAME})}
					/>
					<Button text="&#x1F5D1;" // Delete button
							{...styles.button}
					/>
				</View>
			</View>
			<View style={styles.list}>
				{photos.length !== 0 && <FlatList
					data={photos}
					renderItem={({item}) => (
						<TouchableOpacity style={styles.singleImageContainer}>
							<Image source={{uri: item.uri}} style={{width: 100, height: 100}}/>
							<Text style={styles.imageText}>{item.id}</Text>
						</TouchableOpacity>
					)}
					keyExtractor={item => item.id}
					numColumns={3}
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
		flex: .5,
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
		justifyContent: 'space-between',
		width: "100%"
	},
	singleImageContainer: {
		margin: 4,
		borderWidth: 2,
		borderColor: "#E91E63",
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