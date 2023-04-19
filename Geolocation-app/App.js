import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StyleSheet, Text, View} from 'react-native';

import MainPage from './components/views/MainPage';
import LocationsList from './components/views/LocationsList';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="MainPage"
							  component={MainPage}
							  options={{
								  headerShown: false
							  }}
				/>
				<Stack.Screen name="Locations List"
							  component={LocationsList}
							  options={{
								  headerTitle: "List of locations"
							  }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}