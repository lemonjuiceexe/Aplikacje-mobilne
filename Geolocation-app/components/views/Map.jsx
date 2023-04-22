import {StyleSheet, View, Text, ActivityIndicator} from "react-native";
import {useState, useEffect} from "react";
import MapView, {Marker} from "react-native-maps";

export default function Map(props) {
	console.log(props.route.params.locations);
	return (
		<MapView
			style={styles.container}
			initialRegion={ !props.route.params.locations || !props.route.params.locations.length > 0 ? {
				latitude: 50.01549126131934,
				longitude: 19.95030437547158,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005
			} : {
				latitude: props.route.params.locations[0].latitude,
				longitude: props.route.params.locations[0].longitude,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005
			}}
			mapType="satellite"
			loadingEnabled={true}
			loadingIndicatorColor={"#8996f5"}
			loadingBackgroundColor={"#FFFFFF"}
		>
			{props.route.params.locations.map((el, index) =>
				<Marker title={`Location from ${el.timestamp}`}
						key={index}
						coordinate={{
							latitude: el.latitude,
							longitude: el.longitude
						}}
				/>
			)}
		</MapView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		height: '100%'
	},
	text: {
		fontSize: 25,
		margin: 20,
		textAlign: 'center',
		lineHeight: 35
	}
});