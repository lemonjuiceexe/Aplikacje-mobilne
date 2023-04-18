import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Main from './components/views/Main';
import UsersList from './components/views/UsersList';
import UserDetails from './components/views/UserDetails';

const Stack = createNativeStackNavigator();

export default function App() {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
		},
	});

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Main"
							  component={Main}
							  options={{
								  headerShown: false
							  }}
				/>
				<Stack.Screen name="UsersList"
							  component={UsersList}
							  options={{
								  headerTitle: "List of users"
							  }}
				/>
				<Stack.Screen name="UserDetails"
							  component={UserDetails}
							  options={{
								  headerTitle: "User details"
							  }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}