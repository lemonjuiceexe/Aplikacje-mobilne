import {StyleSheet, View, Text, FlatList, Switch, ActivityIndicator} from "react-native";
import {useState, useEffect} from "react";

import Button from "../Button";
import LocationsListItem from "../LocationsListItem";

export default function LocationsList(props) {
	const [locations, setLocations] = useState([
		{
			timestamp: Date.now(),
			latitude: 50.01549126131934,
			longitude: 19.95030437547158
		}
	]);

	return (
		<View style={styles.container}>
			<View style={styles.buttonsContainer}>
				<View style={styles.buttonContainerRow}>
					<Button text="Save current location" margin={30} width={250} height="70%" paddingVertical={7} />
					<Button text="Delete" paddingHorizontal={10} paddingVertical={7} />
				</View>
				<View style={styles.buttonContainerRow}>
					<Button text="Show me the map" margin={30} width={250} height="70%" paddingVertical={7}
							onPress={() => props.navigation.navigate("Map")}/>
					<Switch />
				</View>
			</View>
			<View style={styles.list}>
				<Text style={styles.text}>List of locations</Text>
				<FlatList
					data={locations}
					renderItem={({item}) =>
						<LocationsListItem
							timestamp={item.timestamp}
							latitude={item.latitude}
							longitude={item.longitude}
						/>
					}
					keyExtractor={item => item.timestamp.toString()}
				>
				</FlatList>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		height: '100%'
	},
	buttonsContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainerRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		paddingHorizontal: 20
	},
	list: {
		flex: 5,
		flexDirection: 'column'
	},

	text: {
		fontSize: 25,
		margin: 20,
		textAlign: 'center',
		lineHeight: 35
	}
});