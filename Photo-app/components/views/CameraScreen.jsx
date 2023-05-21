import {
	View,
	Text,
	ActivityIndicator,
	StatusBar,
	Animated,
	StyleSheet,
	TouchableOpacity,
	ScrollView
} from 'react-native';
import * as ExpoCamera from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import {useState, useEffect, useRef} from 'react';

import RadioGroup from "../UI/RadioGroup";

export default function CameraScreen(props) {
	const [cameraPermission, setCameraPermission] = useState(false);
	const [cameraReverted, setCameraReverted] = useState(false);
	const [settingsShown, setSettingsShown] = useState(false);
	const [settingsWrapperOffset, setSettingsWrapperOffset] = useState(new Animated.Value(660));
	const [cameraSettings, setCameraSettings] = useState({});
	const cameraRef = useRef(null);

	function revertCameraHandler() {
		setCameraReverted(prevState => !prevState);
	}

	function goBackHandler() {
		props.navigation.navigate("PhotosList");
	}

	async function takePhotoHandler() {
		const photo = await cameraRef.current.takePictureAsync();
		const photoAsset = await MediaLibrary.createAssetAsync(photo.uri);
		const albumRef = await MediaLibrary.getAlbumAsync(props.route.params.DIRECTORY_NAME);
		await MediaLibrary.addAssetsToAlbumAsync([photoAsset], albumRef);
	}

	function toggleSettingsHandler() {
		Animated.spring(settingsWrapperOffset, {
			toValue: settingsShown ? 660 : 0,
			velocity: 3,
			tension: 2,
			friction: 8,
			useNativeDriver: true
		}).start();

		setSettingsShown(prevState => !prevState);
		// setSettingsWrapperHeight(prevState => prevState === '0%' ? '83%' : '0%');

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
							   onCameraReady={() => setCameraSettings(ExpoCamera.Camera.Constants)}
			/>

			{/* Navigation and action buttons */}
			<TouchableOpacity style={[styles.button, styles.buttonShutter,
									{ pointerEvents: settingsShown ? "none" : "auto" }
			]} /* Shutter button */
							  onPress={takePhotoHandler}>
				<Text style={styles.text}></Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, styles.buttonBack]} /* Back button */
							  onPress={goBackHandler}>
				<Text style={styles.textBack}>&#x21A9;</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, styles.buttonSettings]} /* Settings button */
							  onPress={toggleSettingsHandler}>
				<Text style={styles.textSettings}>&#x2699;</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, styles.buttonRevert,
									{ pointerEvents: settingsShown ? "none" : "auto" }
			]} /* Revert camera button */
							  onPress={revertCameraHandler}>
				<Text style={styles.text}>&#x21BA;</Text>
			</TouchableOpacity>

			{/* Camera settings */}
			<Animated.View style={[
				styles.settingsWrapper,
				{
					transform: [{translateY: settingsWrapperOffset}]
				}
			]}>
				<ScrollView>
				<Text style={styles.textSettingsTitle}>Settings</Text>
				{cameraSettings && Object.values(cameraSettings).map((setting, i) =><>
					<RadioGroup key={Math.random()} title={Object.keys(cameraSettings)[i]} options={setting} /></>
				)}
				</ScrollView>
			</Animated.View>
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
	buttonSettings: {
		bottom: 40,
		left: 20,
		width: 60,
		height: 60
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
	},
	textSettings: {
		color: "#000",
		height: '100%',
		textAlign: "center",
		marginTop: '6%',
		marginLeft: '1%',
		fontSize: 40
	},

	settingsWrapper: {
		position: "absolute",
		right: 0,
		bottom: 0,
		width: '65%',
		height: '80%',
		padding: 10,
		zIndex: 10,
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		borderTopLeftRadius: 20,
	},
	textSettingsTitle: {
		color: "#F8BBD0",
		fontSize: 40,
		fontFamily: "dongle-bold"
	}
});