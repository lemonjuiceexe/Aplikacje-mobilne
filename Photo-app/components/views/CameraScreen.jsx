import {View, Text, ActivityIndicator, Button, StyleSheet, TouchableOpacity} from 'react-native';
import * as ExpoCamera from 'expo-camera';
import { useState, useEffect } from 'react';

export default function CameraScreen(){
	const [cameraPermission, setCameraPermission] = useState(false);
	useEffect(() => {
		async function getPermission(){
			return await ExpoCamera.requestCameraPermissionsAsync();
		}

		getPermission().then((permission) => {
			if(permission.status === "granted"){
				setCameraPermission(true);
			}
		});
	}, []);

	if(!cameraPermission){
		return (
			<View style={styles.container}>
				<Text style={styles.text}>Waiting for camera permission...</Text>
				<ActivityIndicator size="large" color="#fff"/>
			</View>
		);
	}

	return(
		<View style={styles.container}>
			<ExpoCamera.Camera style={{flex: 1}}/>
			<TouchableOpacity style={styles.button}>
				<Text style={styles.text}>Take photo</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E91E63"
	},
	button: {
		position: "absolute",
		bottom: 20,
		left: '50%',
		transform: [{translateX: -50}],
		width: 100,
		height: 100,
		borderRadius: 100,
		backgroundColor: "#fff",
	},
	text: {
		color: "#000",
		height: '100%',
		textAlign: "center",
		textAlignVertical: "center"
	}
});