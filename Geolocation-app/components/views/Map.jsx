import {StyleSheet, View, Text, ActivityIndicator} from "react-native";
import {useState, useEffect} from "react";
import MapView from "react-native-maps";

export default function Map() {
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