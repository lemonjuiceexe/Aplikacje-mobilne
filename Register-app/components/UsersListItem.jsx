import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";

import Button from "./Button.jsx";

export default function UsersListItem(props) {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: 'rgb(48, 176, 199)',
			color: "#fff",
			alignItems: 'center',
			justifyContent: 'space-around',
			width: '95%',
			flexDirection: 'row',
			margin: 10,
			borderRadius: 10,
			borderColor: 'rgb(10, 132, 255)',
			borderWidth: 4,
			padding: 2
		},
		imageWrapper: {
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			flex: 1,
			height: '100%',
			marginVertical: 10
		},
		image: {
			width: '75%',
			height: '95%',
			borderRadius: 300,
			borderColor: 'black',
			borderWidth: 1
		},
		dataWrapper: {
			flexDirection: 'column',
			justifyContent: 'space-around',
			alignItems: 'flex-start',
			flex: 2.5,
			height: '100%'
		},
		buttonsWrapper: {
			flexDirection: 'row',

		},
		textWrapper: {
			width: '100%',
			flexDirection: 'row',
			justifyContent: 'flex-start',
			paddingLeft: '6%',
			marginVertical: 5
		},
		text: {
			fontSize: 20,
			textAlign: 'left',
			color: '#fff',
			fontWeight: 'bold'
		},
		label: {
			fontWeight: 'bold'
		}
	});

	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<View style={styles.imageWrapper}>
				<Image style={styles.image} source={require("../assets/profile.jpg")} />
			</View>
			<View style={styles.dataWrapper}>
				<View style={styles.textWrapper}>
					<Text style={styles.text}>
						{/*<Text style={styles.label}>{props.index}:&nbsp;</Text>*/}
						{props.login}
					</Text>
				</View>
				<View style={styles.buttonsWrapper}>
					<Button
						text='Details' backgroundColor='green' textColor='white' fontSize={20}
						onPress={() =>
							navigation.navigate('UserDetails', {
								styles: styles,
								login: props.login,
								password: props.password,
								date: props.date
							})
						}
					/>
					<Button
						text='Delete' backgroundColor='tomato' textColor='white' fontSize={20}
						onPress={props.onRemoveUser}
					/>
				</View>
			</View>
		</View>
	);
}