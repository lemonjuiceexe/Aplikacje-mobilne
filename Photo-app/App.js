import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import MainPage from './components/views/MainPage';
import PhotosList from './components/views/PhotosList';
// import PhotoDetails from './components/views/Photo';
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
