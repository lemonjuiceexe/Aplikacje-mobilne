import {StyleSheet, View, Text, Switch} from "react-native";

export default function LocationsListItem(props) {
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
			<Switch />
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