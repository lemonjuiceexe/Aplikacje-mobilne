import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from "react";

import Button from "../Button.jsx";
import env from "../../env.json";

const SERVER_IP = env.SERVER_IP;
export default function Main(props) {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const styles = StyleSheet.create({
		header: {
			flex: 1,
			backgroundColor: '#f4511e',
			alignItems: 'center',
			justifyContent: 'center',
			borderBottomWidth: 10,
			borderBottomColor: '#ddd',
			width: '100%',
			color: 'red'
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

	function loginChangeHandler(login){
		setLogin(login);
	}
	function passwordChangeHandler(password){
		setPassword(password);
	}
	function loginHandler(){
		if(login === "" || password === ""){
			console.log("Empty login or password");
			alert("Empty login or password");
			return;
		}
		fetch(SERVER_IP, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				action: 'addUser',
				login: login,
				password: password
			})
		})
			.then(response => response.json())
			.then(data => {
				if(data["exists"] === true){
					console.log("User already exists");
					alert("User already exists");
					return;
				}
				console.log('Success: ', data);
				setLogin(""); setPassword("");
				props.navigation.navigate('UsersList');
			})
			.catch((error) => {
				console.error('Error: ', error);
				setLogin(""); setPassword("");
				props.navigation.navigate('UsersList');
			});
	}

	return (
		<>
			<StatusBar />
			<View style={styles.header}>
				<Text style={styles.headerText}>Register app</Text>
			</View>
			<View style={styles.login}>
				<Text style={styles.loginHeader}>Login</Text>
				<TextInput
					style={styles.input}
					placeholder="Login"
					onChangeText={loginChangeHandler}
					value={login}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					onChangeText={passwordChangeHandler}
					value={password}
				/>
				<Button
					text="Login"
					backgroundColor="cornflowerblue"
					textColor="white"
					onPress={loginHandler}
				/>
			</View>
		</>
	);
}