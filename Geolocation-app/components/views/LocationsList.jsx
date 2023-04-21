import {StyleSheet, View, Text, FlatList, Switch, ActivityIndicator} from "react-native";
import {useState, useEffect} from "react";
import * as Location from "expo-location";

import Button from "../Button";
import LocationsListItem from "../LocationsListItem";

export default function LocationsList(props) {
	const [locations, setLocations] = useState([
		{
			timestamp: Date.now(),
			latitude: 50.01549126131934,
			longitude: 19.95030437547158,
			show: true
		},
		{
			timestamp: Date.now() - 10,
			latitude: 50.01549126131934,
			longitude: 19.95030437547158,
			show: true
		}
	]);
	const [allShown, setAllShown] = useState(true);
	const [permissionGranted, setPermissionGranted] = useState(false);

	// Toggle for a specific location, identified by timestamp
	function showToggleHandler(timestamp) {
		setLocations(previousState => {
			return previousState.map(el => {
				if (el.timestamp === timestamp) {
					el.show = !el.show;
				}
				return el;
			})
		});
		// If all locations are on, set allShown to true
		// If any location is off, set allShown to false
		setAllShown(locations.every(el => el.show));
	}
	// Toggle for all the locations
	function showAllToggleHandler(){
		const valueToSet = !allShown;
		setLocations(prevState => {
			const a = prevState.map(el => {
				el.show = valueToSet;
				return el;
			});
			console.log(a);
			return a;
		});
		// setLocations([
		// {
		// 	timestamp: Date.now(),
		// 	latitude: 50.01549126131934,
		// 	longitude: 19.95030437547158,
		// 	show: valueToSet
		// },
		// {
		// 	timestamp: Date.now() - 10,
		// 	latitude: 50.01549126131934,
		// 	longitude: 19.95030437547158,
		// 	show: valueToSet
		// }
		// ]);
		setAllShown(prevState => !prevState);
	}

	// Request location permission
	// useEffect(() => {
	// 	Location.requestForegroundPermissionsAsync()
	// 		.then(status => {
	// 			console.log(status);
	// 			setPermissionGranted(status === 'granted');
	// 		});
	// }, []);

	// if(!permissionGranted) {
	// 	return (
	// 		<View style={styles.container}>
	// 			<Text style={styles.text}>Waiting for the location permission...</Text>
	// 			<ActivityIndicator size="large" color="#0000ff" />
	// 		</View>
	// 	);
	// }

	return (
		<View style={styles.container}>
			<View style={styles.buttonsContainer}>
				<View style={styles.buttonContainerRow}>
					<Button text="Save current location"
							width={250}
							height="70%"
							margin={30}
							padcdingVertical={7}
					/>
					<Button text="Delete all"
							height="70%"
							paddingHorizontal={10}
							paddingVertical={7}
					/>
				</View>
				<View style={styles.buttonContainerRow}>
					<Button text="Show me the map"
							width={250}
							height="70%"
							margin={30}
							paddingVertical={7}
							onPress={() =>
								props.navigation.navigate("Map")
							}
					/>
					<Switch value={allShown}
							onValueChange={showAllToggleHandler}
					/>
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
							show={item.show}
							onShowChange={showToggleHandler}
						/>
					}
					keyExtractor={item => item.timestamp}
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