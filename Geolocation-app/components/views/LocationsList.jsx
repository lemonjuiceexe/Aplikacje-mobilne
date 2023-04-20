import {StyleSheet, View, Text, ActivityIndicator} from "react-native";

import Button from "../Button";

export default function LocationsList(props) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>There will be list of locations in here, promise.</Text>
			<Button text="Show me the map" margin={30}
					onPress={() => props.navigation.navigate("Map")}/>
		</View>
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