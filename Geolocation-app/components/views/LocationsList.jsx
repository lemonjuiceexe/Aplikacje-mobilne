import {StyleSheet, View, Text, Switch, ActivityIndicator} from "react-native";

import Button from "../Button";

export default function LocationsList(props) {
	return (
		<View style={styles.container}>
			<View style={styles.buttonsContainer}>
				<View style={styles.buttonContainerRow}>
					<Button text="Save current location" paddingHorizontal={10} paddingVertical={7} />
					<Button text="Delete" paddingHorizontal={10} paddingVertical={7} />
				</View>
				<View style={styles.buttonContainerRow}>
					<Button text="Show me the map" margin={30} paddingHorizontal={15} paddingVertical={7}
							onPress={() => props.navigation.navigate("Map")}/>
					<Switch />
				</View>
			</View>
			<View style={styles.list}>
				<Text style={styles.text}>List of locations</Text>
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
		justifyContent: 'center'
	},
	buttonContainerRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		width: '100%',
		borderColor: "black",
		borderWidth: 1
	},
	list: {
		flex: 5,
		flexDirection: 'column',
		backgroundColor: '#3F51B5'
	},

	text: {
		fontSize: 25,
		margin: 20,
		textAlign: 'center',
		lineHeight: 35
	}
});