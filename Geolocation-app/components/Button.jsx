import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function Button(props) {
	const styles = StyleSheet.create({
		button: {
			backgroundColor: props.backgroundColor ? props.backgroundColor : 'cornflowerblue',
			paddingHorizontal: props.paddingHorizontal ? props.paddingHorizontal : '11.5%',
			paddingVertical: props.paddingVertical ? props.paddingVertical : '2%',
			borderRadius: props.borderRadius ? props.borderRadius : 5,
			margin: props.margin ? props.margin : 5,
		},
		buttonText: {
			color: props.textColor ? props.textColor : 'white',
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