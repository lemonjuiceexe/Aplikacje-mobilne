import {View, Text, ActivityIndicator, StyleSheet, TouchableOpacity} from "react-native";
import * as Font from 'expo-font';

import {useState, useEffect} from "react";


export default function MainPage(props){
	const [fontsLoaded, setFontsLoaded] = useState(false);

	useEffect(() => {
		Font.loadAsync({
			'dongle': require('../../assets/fonts/Dongle-Regular.ttf'),
			'dongle-bold': require('../../assets/fonts/Dongle-Bold.ttf'),
			'dongle-light': require('../../assets/fonts/Dongle-Light.ttf')
		}).then(() => {
			setFontsLoaded(true);
		});
	}, []);

	if(!fontsLoaded){
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<TouchableOpacity
					onPress={() => props.navigation.navigate("LocationsList")}
				>
					<Text style={styles.header}>Main Page</Text>
				</TouchableOpacity>
				<Text style={styles.text}>a pretty bottom text to look at</Text>
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
	headerContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#3F51B5',
	},
	header: {
		fontFamily: 'dongle-bold',
		fontSize: 100,
		textAlign: 'center',
		color: "#FFFFFF",
		marginTop: 50
	},
	text: {
		textAlign: 'center',
		fontFamily: 'dongle-light',
		fontSize: 40,
		color: "#FFFFFF",
		marginTop: 50
	}
});