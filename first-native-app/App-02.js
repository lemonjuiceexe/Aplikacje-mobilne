import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Item from "./components/Item";

export default function App() {
	const COLORS = ["tomato", "lightseagreen", "dodgerblue", "violet", "#000"];
	return (
		<View style={styles.container}>
			<StatusBar />
			{COLORS.map((el, i) => 
				<Item key={Math.random()} text={"Item no. " + i} wrapperStyle={{
					flex: 1,
					backgroundColor: el,
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				}} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: '#fff',
		alignItems: "stretch",
		justifyContent: 'center',
	},
});
