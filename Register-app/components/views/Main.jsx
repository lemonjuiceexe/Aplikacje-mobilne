import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import Button from "../Button.jsx";

export default function Main(props) {
	return (
		<>
			<StatusBar />
			<View style={styles.header}>
				<Text style={styles.headerText}>Register app</Text>
			</View>
			<View style={styles.login}>
				<Text style={styles.loginHeader}>Login</Text>
				<TextInput style={styles.input} placeholder="Login" />
				<TextInput style={styles.input} placeholder="Password" />
				<Button
					text="Login"
					backgroundColor="cornflowerblue"
					textColor="white"
					onPress={() => props.navigation.navigate('UsersList')}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	header: {
		flex: 1,
		backgroundColor: '#f4511e',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 10,
		borderBottomColor: '#ddd',
		width: '100%',
		color: 'red',

	},
	headerText: {
		color: 'white',
		fontSize: 30,
	},
	login: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		width: '100%'
	},
	loginHeader: {
		fontSize: 30,
		marginBottom: 20
	},
	input: {
		borderWidth: 1,
		borderColor: '#777',
		padding: 8,
		margin: 10,
		width: '80%'
	}
});