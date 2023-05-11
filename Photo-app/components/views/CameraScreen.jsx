import {View, Text, ActivityIndicator, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import * as ExpoCamera from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import {useState, useEffect, useRef} from 'react';

export default function CameraScreen(props) {
	const [cameraPermission, setCameraPermission] = useState(false);
	const [cameraReverted, setCameraReverted] = useState(false);
	const cameraRef = useRef(null);

	function revertCameraHandler() {
		setCameraReverted(prevState => !prevState);
	}

	function goBackHandler() {
		props.navigation.navigate("PhotosList");
	}

	async function takePhotoHandler() {
		// console.log(cameraRef.current);
		const photo = await cameraRef.current.takePictureAsync();
		const photoAsset = await MediaLibrary.createAssetAsync(photo.uri);
		const albumRef = await MediaLibrary.getAlbumAsync(props.route.params.DIRECTORY_NAME);
		await MediaLibrary.addAssetsToAlbumAsync([photoAsset], albumRef);
	}

	useEffect(() => {
		async function getPermission() {
			return await ExpoCamera.requestCameraPermissionsAsync();
		}

		getPermission().then((permission) => {
			if (permission.status === "granted") {
				setCameraPermission(true);
			}
		});
	}, []);

	if (!cameraPermission) {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>Waiting for camera permission...</Text>
				<ActivityIndicator size="large" color="#fff"/>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<StatusBar/>
			<ExpoCamera.Camera style={styles.camera}
							   type={cameraReverted ?
								   ExpoCamera.Camera.Constants.Type.front :
								   ExpoCamera.Camera.Constants.Type.back}
							   ref={cameraRef}
			/>
			<TouchableOpacity style={[styles.button, styles.buttonShutter]} /* Shutter button */
							  onPress={takePhotoHandler}>
				<Text style={styles.text}></Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, styles.buttonBack]} /* Back button */
							  onPress={goBackHandler}>
				<Text style={styles.textBack}>&#x21A9;</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, styles.buttonRevert]} /* Revert camera button */
							  onPress={revertCameraHandler}>
				<Text style={styles.text}>&#x21BA;</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "center"
	},
	camera: {
		width: '100%',
		aspectRatio: 3/4
	},
	button: {
		position: "absolute",
		borderRadius: 100,
		backgroundColor: "#fff"
	},
	buttonShutter: {
		bottom: 20,
		left: '50%',
		transform: [{translateX: -50}],
		width: 100,
		height: 100
	},
	buttonBack: {
		top: 50,
		left: 20,
		width: 40,
		height: 40,
	},
	buttonRevert: {
		bottom: 40,
		right: 20,
		width: 60,
		height: 60
	},
	text: {
		color: "#000",
		textAlign: "center",
		height: '100%',
		verticalAlign: "middle",
		marginTop: '-10%',
		fontSize: 50
	},
	textBack: {
		color: "#000",
		height: '100%',
		textAlign: "center",
		marginTop: '-25%',
		fontSize: 40
	}
});