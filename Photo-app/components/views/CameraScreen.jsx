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
	const CAMERA_RATIOS = {"16:9": 1, "4:3": 0}
	const DEFAULT_VALUES = {
		"FlashMode": "off",
		"AutoFocus": "on",
		"WhiteBalance": "incandescent",
		"VideoQuality": "4:3",
		"CameraRatio": "4:3",
		"Type": "back"
	}

	const [cameraPermission, setCameraPermission] = useState(false);
	const [settingsShown, setSettingsShown] = useState(false);
	const [settingsWrapperOffset, setSettingsWrapperOffset] = useState(new Animated.Value(660));
	const [cameraSettings, setCameraSettings] = useState({});

	const [cameraReverted, setCameraReverted] = useState(valueToIndex("Type", "back"));
	const [flashMode, setFlashMode] = useState(valueToIndex("FlashMode", "off"));
	const [autoFocus, setAutoFocus] = useState(valueToIndex("AutoFocus", "on"));
	const [whiteBalance, setWhiteBalance] = useState(valueToIndex("WhiteBalance", "incandescent"));
	const [videoQuality, setVideoQuality] = useState(valueToIndex("VideoQuality", "4:3"));
	const [cameraRatio, setCameraRatio] = useState(valueToIndex("CameraRatio", "4:3"));
	const [pictureSize, setPictureSize] = useState(valueToIndex("PictureSize", "1920x1440"));
	const [pictureSizesLoaded, setPictureSizesLoaded] = useState(false);

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
	function cameraOptionChangeHandler(option, value){
		switch(option){
			case "type":
				setCameraReverted(value);
				break;
			case "flashMode":
				setFlashMode(value);
				break;
			case "autoFocus":
				setAutoFocus(value);
				break;
			case "whiteBalance":
				setWhiteBalance(value);
				break;
			case "videoQuality":
				setVideoQuality(value);
				break;
			case "cameraRatio":
				console.log("SET RATIO STATE ", value);
				setCameraRatio(value);
				break;
			case "pictureSize":
				setPictureSize(value);
				break;
		}
	}
	function indexToState(index){
		switch(index){
			case 0:
				return cameraReverted;
			case 1:
				return flashMode;
			case 2:
				return autoFocus;
			case 3:
				return whiteBalance;
			case 4:
				return videoQuality;
			case 5:
				return cameraRatio;
			case 6:
				return pictureSize;
		}
	}
	function indexToParam(index){
		switch(index){
			case 0:
				return "Type";
			case 1:
				return "FlashMode";
			case 2:
				return "AutoFocus";
			case 3:
				return "WhiteBalance";
			case 4:
				return "VideoQuality";
			case 5:
				return "CameraRatio";
			case 6:
				return "PictureSize";
		}
	}
	function valueToIndex(param, value){
		switch(param){
			case "Type":
				return value === "back" ? 0 : 1;
			case "FlashMode":
				switch(value){
					case "off":
						return 0;
					case "on":
						return 1;
					case "auto":
						return 3;
					case "torch":
						return 2;
					default:
						return -300;
				}
			case "AutoFocus":
				return value === "on";
			case "WhiteBalance":
				switch(value){
					case "auto":
						return 0;
					case "sunny":
						return 2;
					case "cloudy":
						return 1;
					case "shadow":
						return 3;
					case "incandescent":
						return 5;
					case "fluorescent":
						return 4;
					default:
						return -300;
				}
			case "VideoQuality":
				switch(value){
					case "1080p":
						return 1;
					case "720p":
						return 2;
					case "480p":
						return 3;
					case "4:3":
						return 4;
					case "2160p":
						return 0;
					default:
						return -300;
				}
			case "CameraRatio":
				return value === "4:3" ? 0 : 1;
			case "PictureSize":
				return value;
		}
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
			<ExpoCamera.Camera style={{...styles.camera, aspectRatio: cameraRatio === 0 ? 3 / 4 : 9 / 16}}
							   type={cameraReverted ?
								   ExpoCamera.Camera.Constants.Type.front :
								   ExpoCamera.Camera.Constants.Type.back}
							   flashMode={flashMode}
							   autoFocus={autoFocus}
							   whiteBalance={whiteBalance}
							   ratio={cameraRatio === 0 ? "4:3" : "16:9"}
							   pictureSize={pictureSize}
							   ref={cameraRef}
							   onCameraReady={async () =>
							   {
								   const pictureSizes = await cameraRef.current.getAvailablePictureSizesAsync(cameraRatio === 0 ? "4:3" : "16:9");
								   setCameraSettings(
									   {
										   ...ExpoCamera.Camera.Constants,
										   "CameraRatio": CAMERA_RATIOS,
										   "PictureSize": pictureSizes
									   }
								   );
								   console.log(pictureSizes);
									setPictureSizesLoaded(true);
							   }}
			/>

			{/* Navigation and action buttons */}
			<TouchableOpacity style={[styles.button, styles.buttonShutter,
				{pointerEvents: settingsShown ? "none" : "auto"}
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
				{pointerEvents: settingsShown ? "none" : "auto"}
			]} /* Revert camera button */
							  onPress={revertCameraHandler}>
				<Text style={styles.text}>&#x21BA;</Text>
			</TouchableOpacity>

			{/* Camera settings */}
			{ pictureSizesLoaded && <Animated.View style={[
				styles.settingsWrapper,
				{
					transform: [{translateY: settingsWrapperOffset}]
				}
			]}>
				<ScrollView>
					<Text style={styles.textSettingsTitle}>Settings</Text>
					{cameraSettings && Object.values(cameraSettings).map((setting, i) => {
						if (Object.keys(cameraSettings)[i] !== "CameraRatio" && Object.keys(cameraSettings)[i] !== "PictureSize")
							return <RadioGroup
								key={Math.random()}
								title={Object.keys(cameraSettings)[i]}
								options={setting}
								active={setting !== undefined ? indexToState(i) : 1}
								onToggle={cameraOptionChangeHandler}
							/>
						return <></>;
					})}
					<RadioGroup title={"CameraRatio"}
								key={Math.random()}
								options={cameraSettings.CameraRatio}
								active={cameraRatio}
								onToggle={cameraOptionChangeHandler}/>
					<RadioGroup title={"PictureSize"}
								key={Math.random()}
								options={cameraSettings.PictureSize}
								active={pictureSize}
								onToggle={cameraOptionChangeHandler}/>
				</ScrollView>
			</Animated.View>}
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
		width: '100%'
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