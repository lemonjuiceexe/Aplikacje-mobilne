import {StyleSheet, View, Text, FlatList, Alert, ActivityIndicator} from "react-native";
import {useState, useEffect} from "react";

import Button from "../Button";

export default function PhotosList(){
	return (
		<View style={styles.buttonsContainer}>
				<View style={styles.buttonContainerRow}>
					<Button text="Change layout"
							backgroundColor="#E91E63"
							width={235}
							height="70%"
							margin={30}
							padcdingVertical={5}
							textHeight='100%'
					/>
					<Button text="Camera"
							backgroundColor="#E91E63"
							height="70%"
							paddingHorizontal={10}
							paddingVertical={5}
							textHeight='100%'
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
					/>
				</View>
			<View style={styles.list}>
				<Text style={styles.text}>&#10024;&nbsp;List of locations&nbsp;&#10024;</Text>
			</View>
			</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		height: '100%',
		backgroundColor: "#E91E63"
	},
	buttonsContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 5
	},
	buttonContainerRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
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