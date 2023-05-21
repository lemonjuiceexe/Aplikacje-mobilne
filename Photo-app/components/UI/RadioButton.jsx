import { View, TouchableOpacity, StyleSheet} from "react-native";

export default function RadioButton(props) {
	function toggleHandler(){
		props.onToggle(props.id);
	}

	return (
		<TouchableOpacity style={styles.radioButton} onPress={toggleHandler}>
			{props.active && <View style={styles.radioButtonFill}></View>}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	radioButton: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#E91E63",
		marginRight: 10,
		justifyContent: "center",
		alignItems: "center"
	},
	radioButtonFill: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "#E91E63"
	}
});