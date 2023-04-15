import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";

import Button from "./Button.jsx";

export default function UsersListItem(props) {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'space-around',
			borderColor: 'black',
			borderWidth: 1,
			width: '95%',
			flexDirection: 'row',
			margin: 10
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
			width: '90%',
			aspectRatio: 1,
			fontSize: 20,
			textAlign: 'center',
			textAlignVertical: 'center',
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
			textAlign: 'left'
		},
		label: {
			fontWeight: 'bold'
		}
	});

	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<View style={styles.imageWrapper}>
				<Text style={styles.image}>img</Text>
			</View>
			<View style={styles.dataWrapper}>
				<View style={styles.textWrapper}>
				<Text style={styles.text}>
					<Text style={styles.label}>{props.index}:&nbsp;</Text>
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
					<Button text='Delete' backgroundColor='tomato' textColor='white' fontSize={20} />
				</View>
			</View>
		</View>
	);
}