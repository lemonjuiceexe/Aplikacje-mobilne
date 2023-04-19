import {SafeAreaView, StyleSheet, Text, TextInput, View, Image} from 'react-native';
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
			backgroundColor: '#C5CAE9'
		},
		'text':  {
			fontSize: 20,
			marginVertical: 5,
			color: 'black'
			},
			'image':  {
				borderColor: 'white',
				borderWidth: 1,
				width: '60%',
				height: '50%',
			borderRadius: 300
		},
		'label':  {
			fontWeight: 'bold'
		}
	});
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={require("../../assets/profile.jpg")} />
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