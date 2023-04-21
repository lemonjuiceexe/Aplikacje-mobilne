import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function Button(props) {
	const styles = StyleSheet.create({
		button: {
			backgroundColor: props.backgroundColor ? props.backgroundColor : 'cornflowerblue',
			paddingHorizontal: props.paddingHorizontal ? props.paddingHorizontal : '11.5%',
			paddingVertical: props.paddingVertical ? props.paddingVertical : '2%',
			borderRadius: props.borderRadius ? props.borderRadius : 5,
			marginHorizontal: props.marginHorizontal ? props.marginHorizontal : 5,
			marginVertical: props.marginVertical ? props.marginVertical : 5,
			textAlign: 'center',
			textAlignVertical: 'center',
			width: props.width ? props.width : undefined,
			height: props.height ? props.height : undefined
		},
		buttonText: {
			color: props.textColor ? props.textColor : 'white',
			fontSize: props.fontSize ? props.fontSize : 20,
			textAlign: 'center',
			textAlignVertical: 'center',
			height: props.textHeight ? props.textHeight : undefined
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