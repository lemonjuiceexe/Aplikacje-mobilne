import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, TextInput, View, FlatList} from 'react-native';
import {useState} from "react";

import Button from "../Button.jsx";
import UsersListItem from "../UsersListItem.jsx";

export default function UsersList(props) {
	const [users, setUsers] = useState([
		{
			login: 'user1',
			password: 'password1',
			date: '2021-01-01'
		},
		{
			login: 'user2',
			password: 'password2',
			date: '2021-01-02'
		}
	]);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			paddingTop: 10
		},
		list: {
			width: '100%',
			padding: 10
		}
	});

	let index = 1;

	function removeUserHandler(login){
		setUsers(prevState => prevState.filter(user => user.login !== login));
	}

	return (
		<View style={styles.container}>
			<Button
				text="Go back"
				backgroundColor="cornflowerblue"
				textColor="white"
				onPress={() => props.navigation.navigate('Main')}
			/>
			<FlatList
				style={styles.list}
				data={users}
				renderItem={({item}) =>
					<UsersListItem
						index={index++}
						login={item.login}
						password={item.password}
						date={item.date}
						onRemoveUser={() => removeUserHandler(item.login)}
					/>
				}
				keyExtractor={user => user.login}
			/>
		</View>
	);
}