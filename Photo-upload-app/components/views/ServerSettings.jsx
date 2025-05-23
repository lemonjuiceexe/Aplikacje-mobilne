import {View, Text, StyleSheet} from 'react-native';
import Dialog from "react-native-dialog";
import * as SecureStore from "expo-secure-store";
import {useEffect, useState} from "react";

import Button from "../Button";

export default function ServerSettings(){
	const [dialogVisible, setDialogVisible] = useState(false);
	const [ip, setIp] = useState('192.168.0.1');
	const [port, setPort] = useState('3000');
	// ExpoSecureStore.getItemAsync("IP").then(value => { if(value) setIp(value.toString()) });
	// ExpoSecureStore.getItemAsync("Port").then(value => { if(value) console.log(value.toString()) });

	function toggleDialogHandler() {
		console.log('toggling dialog');
		setDialogVisible(previousState => !previousState); }
	async function saveSettingsHandler() {
		console.log('saving settings');
		console.table(ip, port);
		await SecureStore.setItemAsync("IP", ip.toString());
		await SecureStore.setItemAsync("Port", port.toString());
		toggleDialogHandler();
	}

	useEffect(() => {
		SecureStore.getItemAsync("IP").then(value => { if(value) setIp(value) });
		SecureStore.getItemAsync("Port").then(value => { if(value) setPort(value) });
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.infoWrapper}>
				<Text style={[styles.text, styles.header]}>Server Settings</Text>
				<Text style={styles.text}>Currently saved data:</Text>
				<Text style={styles.text}>IP: {ip ? ip : "Not set!"}</Text>
				<Text style={styles.text}>Port: {port ? port : "Not set!"}</Text>
			</View>
			<Button {...styles.button} text="Change data" onPress={toggleDialogHandler} />
			<Dialog.Container visible={dialogVisible}>
				<Dialog.Title>Server Settings</Dialog.Title>
				<Dialog.Description>
					Enter new server data:
				</Dialog.Description>
				<Dialog.Input label="IP" value={ip} onChangeText={value => setIp(value)}/>
				<Dialog.Input label="Port" value={port} onChangeText={setPort}/>
				<Dialog.Button label="Cancel" onPress={toggleDialogHandler} />
				<Dialog.Button label="Save" onPress={saveSettingsHandler} />
			</Dialog.Container>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		height: '100%',
		width: '100%',
		backgroundColor: '#212121',
		padding: '10%',
		paddingBottom: '80%'
	},
	infoWrapper: {
		flex: 4,
	},
	header: {
		fontSize: 30
	},
	text: {
		fontSize: 20,
		color: '#fff',
		textAlign: 'center',
		marginBottom: 15
	},
	button: {
		flex: 1,
		backgroundColor: "#E91E63",
		height: 50,
		paddingHorizontal: 35,
		paddingVertical: 5,
		textHeight: '100%',
		color: "#fff"
	},
});