import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {StatusBar} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function UserDetails(properties){
	const props = properties.route.params;
	const styles = StyleSheet.create({
		'container':  {
			flexDirection: 'column',
			justifyContent: 'space-evenly',
			alignItems: 'center',
			height: '100%',
			paddingVertical: '30%',
			paddingHorizontal: '10%',
		},
		'text':  {
			fontSize: 20,
			marginVertical: 5
		},
		'image':  {
			borderColor: 'black',
			borderWidth: 1,
			width: '60%',
			aspectRatio: 1,
			fontSize: 20,
			textAlign: 'center',
			textAlignVertical: 'center',
			borderRadius: 300
		}
	});
	return (
		<View style={styles.container}>
			<Text style={styles.image}>image</Text>
			<View>
			<Text style={styles.text}>
				<Text style={styles.label}>Login:&nbsp;</Text>
				{props.login}
			</Text>
			<Text style={styles.text}>
				<Text style={styles.label}>Password:&nbsp;</Text>
				{props.password}
			</Text>
			<Text style={styles.text}>
				<Text style={styles.label}>Registered:&nbsp;</Text>
				{props.date}
			</Text>
			</View>
		</View>
	);
}