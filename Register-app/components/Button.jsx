import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function Button(props) {
	const styles = StyleSheet.create({
		button: {
			backgroundColor: props.backgroundColor,
			paddingHorizontal: '15%',
			paddingVertical: '2%',
			borderRadius: 5,
			margin: 10
		},
		buttonText: {
			color: props.textColor,
			fontSize: 20,
			textAlign: 'center',
		}
	});

	return (
		<TouchableOpacity>
			<View style={styles.button}>
				<Text style={styles.buttonText}>{props.text}</Text>
			</View>
		</TouchableOpacity>
	);
}