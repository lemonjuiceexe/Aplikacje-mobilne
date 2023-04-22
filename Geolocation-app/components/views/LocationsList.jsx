import {StyleSheet, View, Text, FlatList, Switch, ActivityIndicator} from "react-native";
import {useState, useEffect} from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../Button";
import LocationsListItem from "../LocationsListItem";

export default function LocationsList(props) {
	const [locations, setLocations] = useState([
		{
			timestamp: Date.now(),
			latitude: 50.01549,
			longitude: 19.95030,
			show: true
		},
		{
			timestamp: Date.now() - 10,
			latitude: 50.01549,
			longitude: 19.95030,
			show: true
		}
	]);
	const [allShown, setAllShown] = useState(true);
	const [permissionGranted, setPermissionGranted] = useState(false);

	// ---- Button handlers ----
	// Toggle for a specific location, identified by timestamp
	function showToggleHandler(timestamp) {
		saveLocationsToStorage(locations.map(el => {
				if (el.timestamp === timestamp) {
					el.show = !el.show;
				}
				return el;
			})
		);
		setLocations(previousState => {
			return previousState.map(el => {
				if (el.timestamp === timestamp) {
					el.show = !el.show;
				}
				return el;
			});
		});

		// If all locations are on, set allShown to true
		// If any location is off, set allShown to false
		setAllShown(
			// Use the updated version of locations
			locations.map(el => {
				if (el.timestamp === timestamp) {
					el.show = !el.show;
				}
				return el;
			}).every(el => el.show)
		);
	}

	// Toggle for all the locations
	function showAllToggleHandler() {
		const valueToSet = !allShown;
		saveLocationsToStorage(locations.map(el => {return {...el, show: valueToSet}}));
		setLocations(prevState => {
			return prevState.map(el => {
				el.show = valueToSet;
				return el;
			});
		});

		setAllShown(prevState => !prevState);
	}
	async function saveLocationHandler() {
		const location = await Location.getCurrentPositionAsync();
		const newLocationObject = {
			timestamp: Date.now(),
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			show: true
		};

		// Save the new location to the storage
		saveLocationsToStorage([...locations, newLocationObject]);

		// Update the state
		setLocations(prevState => {
			return [
				newLocationObject,
				...prevState
			];
		});
	}
	function goToMapHandler() {
		// Pass only the locations that are shown and only the latitude and longitude
		props.navigation.navigate("Map", {
			locations: locations
				.filter(el => el.show)
				.map(el => el = {
					latitude: el.latitude,
					longitude: el.longitude,
					timestamp: new Date(el.timestamp).toLocaleTimeString()
				})
		})
	}

	// ---- Other utility ----
	function saveLocationsToStorage(locationsArray) {
		AsyncStorage.setItem('locations', JSON.stringify(locationsArray))
			.then(async () => console.log('Current storage: ', await AsyncStorage.getItem('locations')))
			.catch(err => console.log(err));
	}

	useEffect(() => {
		// Request location permission
		Location.requestForegroundPermissionsAsync()
			.then(response => {
				setPermissionGranted(response.status === 'granted');
			});
		// Get locations from storage
		AsyncStorage.getItem('locations')
			.then(response => {
				if (response) {
					const parsedResponse = JSON.parse(response);
					setLocations(parsedResponse);
					setAllShown(parsedResponse.every(el => el.show));
				}
			});
	}, []);

	if (!permissionGranted) {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>Waiting for the location permission...</Text>
				<ActivityIndicator size="large" color="#0000ff"/>
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<View style={styles.buttonsContainer}>
				<View style={styles.buttonContainerRow}>
					<Button text="Save current location"
							width={250}
							height="70%"
							margin={30}
							padcdingVertical={5}
							textHeight='100%'
							onPress={saveLocationHandler}
					/>
					<Button text="Delete all"
							height="70%"
							paddingHorizontal={10}
							paddingVertical={5}
							textHeight='100%'
					/>
				</View>
				<View style={styles.buttonContainerRow}>
					<Button text="Show me the map"
							width={250}
							height="70%"
							margin={30}
							paddingVertical={7}
							textHeight='100%'
							onPress={goToMapHandler}
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