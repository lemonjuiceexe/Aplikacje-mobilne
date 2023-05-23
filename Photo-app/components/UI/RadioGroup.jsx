import {View, Text, StyleSheet} from 'react-native';
import RadioButton from "./RadioButton";

import {useEffect, useState} from "react";

export default function RadioGroup(props) {
	if(props.title === "CameraRatio") console.log('props.active z gory', props.active);
	// props.active = props.active === undefined ? 1 : props.active;
	// props.active = props.active === -300 ? 0 : props.active;
	// let defValue = props.active;
	const optionName = props.title[0].toLowerCase() + props.title.slice(1);
	const [options, setOptions] = useState(props.options);
	// const [activeElement, setActiveElement] = useState(defValue);

	function radioToggleHandler(buttonOption) {
		console.log('hi id like to set ', buttonOption);
		props.onToggle(optionName, buttonOption);
		// setActiveElement(buttonOption);
		// props.active = buttonOption;
		// defValue = buttonOption;
	}

	// useEffect(() => {
	// 	console.log("NEWACTIVEaa", activeElement);
	// }, [activeElement]);

	if (!options || Object.keys(options).length === 0) return;

	return (
		<View>
			<Text style={styles.radioGroupTitle}>{props.title}</Text>
			{options && Object.keys(options).map((option) => {
					if (option === "active") return;
					if(props.title === "CameraRatio") console.log('option', option, 'active', props.active, 'options[option]', options[option])
					return <View style={styles.inputGroup} key={Math.random()}>
						<RadioButton active={props.active === options[option]}
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