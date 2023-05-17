import {View, Image, Text, StyleSheet} from 'react-native';
import * as ExpoMediaLibrary from 'expo-media-library';
import * as ExpoSharing from 'expo-sharing';
import Button from "../Button";

export default function PhotoDetails(props) {
	async function sharePhotoHandler(){
		if (await ExpoSharing.isAvailableAsync()) {
			await ExpoSharing.shareAsync(props.route.params.photo.uri, {
				mimeType: 'image/jpeg',
				dialogTitle: 'Share a photo'
			});
		}
	}
	function deletePhotoHandler(){
		ExpoMediaLibrary.deleteAssetsAsync(props.route.params.photo)
			.then(() => props.navigation.navigate("PhotosList"))
			.catch(error => console.log(error));
	}

	return (
		<View style={styles.container}>
			<Image
				source={{uri: props.route.params.photo.uri}}
				style={styles.image}
			/>
			<Text style={styles.text}>
				{props.route.params.photo.width} x {props.route.params.photo.height}
			</Text>
			<View style={styles.buttonsWrapper}>
				<Button text="Share"
						onPress={sharePhotoHandler}
						{...styles.button}/>
				<Button text="Delete"
						onPress={deletePhotoHandler}
						{...styles.button}/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#212121'
	},
	image: {
		width: '90%',
		aspectRatio: 3 / 4,
		borderRadius: 10,
		borderColor: "#fff",
		borderWidth: 2
	},
	text: {
		color: "#fff",
		fontSize: 25,
		marginTop: 15
	},
	buttonsWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '90%',
		marginVertical: 15,
		height: 50
	},
	button: {
		height: '100%',
		textHeight: '100%',
		backgroundColor: "#E91E63",
		fontSize: 22
	}
});