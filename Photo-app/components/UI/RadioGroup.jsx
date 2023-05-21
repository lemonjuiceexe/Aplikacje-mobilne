import {View, Text, StyleSheet } from 'react-native';
import RadioButton from "./RadioButton";

import {useState} from "react";

export default function RadioGroup(props) {
	console.log(props);
	const [options, setOptions] = useState(props.options);
	function radioToggleHandler(buttonId){
		setOptions(prevState => prevState.active = buttonId);
	}

	if(!options || Object.keys(options).length === 0) return;

	return (
		<View>
			<Text style={styles.radioGroupTitle}>{props.title}</Text>
			{options && Object.keys(options).map((option) =>
				<View style={styles.inputGroup}>
					<RadioButton active={false} onToggle={() => radioToggleHandler(options[option])}/>
					<Text style={styles.text}>{option}</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	radioGroupTitle: {
		fontFamily: 'dongle-bold',
		fontSize: 35,
		color: '#F8BBD0',
		marginTop: 20,
		marginLeft: 20
	},
	inputGroup: {
		flexDirection: 'row',
	},
	text: {
		fontFamily: 'dongle-bold',
		fontSize: 20,
		color: '#F8BBD0'
	}
});