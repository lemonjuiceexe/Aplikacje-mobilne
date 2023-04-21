import {StyleSheet, View, Text, ActivityIndicator} from "react-native";
import {useState, useEffect} from "react";
import MapView, {Marker} from "react-native-maps";

export default function Map(props) {
	console.log(props.route.params.locations);
	return (
		<MapView
			style={styles.container}
			initialRegion={{
				latitude: 50.01549126131934,
				longitude: 19.95030437547158,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005
			}}
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