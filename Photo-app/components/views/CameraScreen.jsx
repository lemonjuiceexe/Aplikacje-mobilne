import {View, Text, ActivityIndicator, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import * as ExpoCamera from 'expo-camera';
import {useState, useEffect} from 'react';

export default function CameraScreen(props) {
	const [cameraPermission, setCameraPermission] = useState(false);
	const [cameraReverted, setCameraReverted] = useState(false);

	function revertCameraHandler() {
		setCameraReverted(prevState => !prevState);
	}

	function goBackHandler() {
		props.navigation.navigate("PhotosList");
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
			/>
			<TouchableOpacity style={[styles.button, styles.buttonShutter]}>
				<Text style={styles.text}></Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, styles.buttonBack]}
							  onPress={goBackHandler}>
				<Text style={styles.textBack}>&#x21A9;</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, styles.buttonRevert]}
							  onPress={revertCameraHandler}>
				<Text style={styles.text}>&#x21BA;</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E91E63"
	},
	camera: {
		flex: 1
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
		height: 100,
	},
	buttonBack: {
		top: 20,
		left: 20,
		width: 40,
		height: 40,
	},
	buttonRevert: {
		bottom: 50,
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