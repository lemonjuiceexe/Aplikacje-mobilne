import {StyleSheet, View, Text, Image, Switch, TouchableOpacity} from "react-native";
import {useState, useEffect} from "react";

export default function LocationsListItem(props) {
	const [show, setShow] = useState(props.show);

	function toggleSwitchHandler() {
		setShow(previousState => !previousState);
		props.onShowChange(props.timestamp);
	}

	// useEffect makes sure that the show state is in sync with the show prop
	// By doing this weird workaround instead of just using props.show everywhere
	// we can make switch animation actually work, for some weird reason
	useEffect(() => setShow(props.show), [props.show]);

	const formattedTimestamp = new Date(props.timestamp).toLocaleTimeString();

	return (
			<View style={styles.container}>
				<View style={styles.imageContainer}>
		<TouchableOpacity onPress={toggleSwitchHandler}>
					<Image source={require("../assets/pinpoint.png")} style={styles.image}/>
		</TouchableOpacity>
				</View>
				<View style={styles.coordinatesContainer}>
					<Text style={styles.coordinatesHeader}>Timestamp: {formattedTimestamp}</Text>
					<Text style={styles.text}>Latitude: {props.latitude}</Text>
					<Text style={styles.text}>Longitude: {props.longitude}</Text>
				</View>
				<Switch value={show}
						onValueChange={toggleSwitchHandler}
						trackColor={{false: "#757575", true: "#81b0ff"}}
						thumbColor={!show ? "#BDBDBD" : "#FF4081"}
				/>
			</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 10,
		paddingVertical: 10,
		paddingHorizontal: 5,
		borderRadius: 5,
		borderWidth: 5,
		borderColor: '#C5CAE9'
	},
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	image: {
		width: 80,
		height: 80
	},
	coordinatesContainer: {
		flex: 2.5,
	},
	text: {
		fontSize: 18,
		margin: 5
	},
	coordinatesHeader: {
		fontSize: 18,
		margin: 5,
		fontWeight: 'bold',
		color: '#FF4081'
	}
});