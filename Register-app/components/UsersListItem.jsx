import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import Button from "./Button.jsx";

export default function UsersListItem(props) {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'space-around',
			borderColor: 'black',
			borderWidth: 1,
			width: '90%',
			flexDirection: 'row',
			margin: 10,
			padding: 10
		},
		imageWrapper: {
			flexDirection: 'column',
			justifyContent: 'space-around',
			alignItems: 'center',
			flex: 1,
			height: '100%'
		},
		dataWrapper: {
			flexDirection: 'column',
			justifyContent: 'space-around',
			alignItems: 'center',
			flex: 2,
			height: '100%'
		},
		buttonsWrapper: {
			flexDirection: 'row',

		},
		text: {
			fontSize: 20
		},
		label: {
			fontWeight: 'bold'
		}
	});

	return (
		<View style={styles.container}>
			<View style={styles.imageWrapper}>
				<Text>img</Text>
			</View>
			<View style={styles.dataWrapper}>
				<View style={styles.buttonsWrapper}>
					<Button text='Details' backgroundColor='green' textColor='white' fontSize={15} />
					<Button text='Delete' backgroundColor='tomato' textColor='white' fontSize={15} />
				</View>
				<Text style={styles.text}>
					<Text style={styles.label}>{props.index}:&nbsp;</Text>
					{props.login}
				</Text>
			</View>
		</View>
	);
}