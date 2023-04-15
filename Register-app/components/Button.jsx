import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function Button(props) {
	const styles = StyleSheet.create({
		button: {
			backgroundColor: props.backgroundColor,
			paddingHorizontal: '12%',
			paddingVertical: '2%',
			borderRadius: 5,
			margin: 10
		},
		buttonText: {
			color: props.textColor,
			fontSize: props.fontSize ? props.fontSize : 20,
			textAlign: 'center',
		}
	});

	return (
		<TouchableOpacity onPress={props.onPress}>
			<View style={styles.button}>
				<Text style={styles.buttonText}>{props.text}</Text>
			</View>
		</TouchableOpacity>
	);
}