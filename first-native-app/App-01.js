import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Item from "./components/Item";

export default function App() {
	const NAMES = ["Header", "Content", "Footer"];
	const COLORS = ["red", "green", "blue"];
	return (
		<View style={styles.container}>
			<StatusBar />
			{NAMES.map((el, i) => 
				<Item key={Math.random()} text={"Item=" + el} wrapperStyle={{
					flex: 1,
					backgroundColor: COLORS[i],
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
