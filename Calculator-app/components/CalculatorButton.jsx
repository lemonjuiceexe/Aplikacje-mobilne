import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

export default function CalculatorButton({text, theme, onClick}) {
	return (
		<TouchableOpacity onPress={onClick} style={[styles.button, theme === "orange" ? styles.orange : styles.grey]}>
			<Text style={styles.buttonText}>{text}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		flex: 1,
		marginHorizontal: 5,
		marginVertical: 5,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	buttonText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white"
	},
	orange: {
		backgroundColor: "#FF9F0A"
	},
	grey: {
		backgroundColor: "#333333"
	}
});