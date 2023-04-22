import {StyleSheet, View, Text, FlatList, Switch, ActivityIndicator} from "react-native";
import {useState, useEffect} from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../Button";
import LocationsListItem from "../LocationsListItem";

export default function LocationsList(props) {
	const [locations, setLocations] = useState([]);
	const [allShown, setAllShown] = useState(true);
	const [permissionGranted, setPermissionGranted] = useState(false);
	const [locationsLoaded, setLocationsLoaded] = useState(false);

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
	function deleteAllHandler(){
		saveLocationsToStorage([]);
		setLocations([]);
		setAllShown(false);
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
				setLocationsLoaded(true);
			});
	}, []);

	if (!permissionGranted || !locationsLoaded) {
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
					<Button text="&#129517; Save my location"
							backgroundColor="#8996f5"
							width={235}
							height="70%"
							margin={30}
							padcdingVertical={5}
							textHeight='100%'
							onPress={saveLocationHandler}
					/>
					<Button text="&#128465; Delete all"
							backgroundColor="#8996f5"
							height="70%"
							paddingHorizontal={10}
							paddingVertical={5}
							textHeight='100%'
							onPress={deleteAllHandler}
					/>
				</View>
				<View style={styles.buttonContainerRow}>
					<Button text="&#128506; Show me the map"
							backgroundColor="#8996f5"
							width={235}
							height="70%"
							margin={30}
							paddingVertical={7}
							textHeight='100%'
							onPress={goToMapHandler}
					/>
					<Switch value={allShown}
							onValueChange={showAllToggleHandler}
							style={styles.switchUpper}
							trackColor={{false: "#757575", true: "#81b0ff"}}
							thumbColor={!allShown ? "#BDBDBD" : "#FF4081"}
					/>
				</View>
			</View>
			<View style={styles.list}>
				<Text style={styles.text}>&#10024;&nbsp;List of locations&nbsp;&#10024;</Text>
				{locations.length === 0 && <Text style={[styles.text, styles.textSmall]}>
					It seems you haven't saved any locations yet...
				</Text>}
				<FlatList
					data={locations}
					renderItem={({item}) =>
						<LocationsListItem
							timestamp={item.timestamp}
							latitude={item.latitude}
							longitude={item.longitude}
							show={item.show}
							onShowChange={showToggleHandler}
							onPress={showToggleHandler}
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
		paddingHorizontal: 8
	},
	switchUpper: {
		marginRight: 11.7
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
	},
	textSmall: {
		fontSize: 22,
		paddingHorizontal: 20,
	}
});