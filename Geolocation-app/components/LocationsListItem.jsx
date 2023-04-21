import {StyleSheet, View, Text, Switch} from "react-native";
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

	return (
		<View style={styles.container}>
			<View style={styles.image}>
				<Text>Obrazek :)</Text>
			</View>
			<View style={styles.coordinatesContainer}>
				<Text style={styles.coordinatesHeader}>Timestamp: {props.timestamp}</Text>
				<Text style={styles.text}>Latitude: {props.latitude}</Text>
				<Text style={styles.text}>Longitude: {props.longitude}</Text>
			</View>
			<Switch value={show}
					onValueChange={toggleSwitchHandler}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 1
	},
	image: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 100,
		height: 100,
		borderRadius: 50,
		borderColor: 'black',
		borderWidth: 1
	}
});