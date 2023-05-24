import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import MainPage from './components/views/MainPage';
import PhotosList from './components/views/PhotosList';
import PhotoDetails from './components/views/PhotoDetails';
import ServerSettings from './components/views/ServerSettings';
import CameraScreen from './components/views/CameraScreen';

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
				<Stack.Screen name="PhotosList"
							  component={PhotosList}
							  options={{
								  headerTitle: "Gallery",
							  }}
				/>
				<Stack.Screen name="PhotoDetails"
							  component={PhotoDetails}
							  options={{
								  headerTitle: "Photo"
							  }}
				/>
				<Stack.Screen name="ServerSettings"
							  component={ServerSettings}
							  options={{
								  headerTitle: "Server Settings"
							  }}
				/>
				<Stack.Screen name="Camera"
							  component={CameraScreen}
							  options={{
								  headerShown: false
							  }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
);
}
