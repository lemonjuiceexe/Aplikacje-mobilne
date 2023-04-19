import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, TextInput, View, FlatList} from 'react-native';
import {useState, useEffect} from "react";

import Button from "../Button.jsx";
import UsersListItem from "../UsersListItem.jsx";

import env from "../../env.json";

export default function UsersList(props) {
	const [users, setUsers] = useState([]);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			paddingVertical: 10
		},
		list: {
			width: '100%',
			padding: 10
		}
	});

	function removeUserHandler(login) {
		fetch(env.SERVER_IP, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				action: 'deleteUser',
				login: login
			})
		})
			.then(response => response.json())
			.then(data => {
					console.log("Very happy data: " + data);
					setUsers(data);
				}
			)
			.catch(error => {
					console.log(error);
				}
			);
	}
	function syncList(){
		fetch(env.SERVER_IP, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				action: 'getUsers'
			})
		})
			.then(response => response.json())
			.then(data => {
				console.log("Very happy data: " + data);
				setUsers(data);
			})
			.catch(error => {
					console.log(error);
				}
			);
	}

	useEffect(() => {
		syncList();
		// index = 1;
		// j = 0;
	}, []);


	return (
		<View style={styles.container}>
			<Button
				text="Go back"
				backgroundColor="#FF4081"
				textColor="white"
				onPress={() => props.navigation.navigate('Main')}
			/>
			<FlatList
				style={styles.list}
				data={users}
				renderItem={({item}) =>{
					return <UsersListItem
						index={item.index}
						login={item.login}
						password={item.password}
						date={item.date}
						onRemoveUser={() => removeUserHandler(item.login)}
					/>
				}}
				keyExtractor={user => user.login}
			/>
		</View>
	);
}