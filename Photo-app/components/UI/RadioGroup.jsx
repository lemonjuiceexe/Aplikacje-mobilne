import {View, Text, StyleSheet} from 'react-native';
import RadioButton from "./RadioButton";

import {useEffect, useState} from "react";

export default function RadioGroup(props) {
	console.log(props.options);
	console.log(props.active);
	const optionName = props.title[0].toLowerCase() + props.title.slice(1);
	const [options, setOptions] = useState(props.options);
	const [activeElement, setActiveElement] = useState(props.active);

	function radioToggleHandler(buttonOption) {
		console.log("NEWACTIVE", buttonOption);
		props.onToggle(optionName, buttonOption);
		setActiveElement(buttonOption);
		props.active = buttonOption;
	}

	useEffect(() => {
		setTimeout( () => setActiveElement(props.active), 500);
	}, [props.active])

	if (!options || Object.keys(options).length === 0) return;

	return (
		<View>
			<Text style={styles.radioGroupTitle}>{props.title}</Text>
			{options && Object.keys(options).map((option) => {
					if (option === "active") return;
					return <View style={styles.inputGroup} key={Math.random()}>
						<RadioButton active={activeElement === options[option]}
									 onToggle={radioToggleHandler}
									 id={options[option]}
						/>
						<Text style={styles.text}>{option}</Text>
					</View>;
				}
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