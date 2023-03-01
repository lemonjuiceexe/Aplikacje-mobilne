import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Item from "./components/Item";

export default function App() {
	const COLORS = ["tomato", "lightseagreen", "dodgerblue", "violet", "#000"];

	let views = [];

	for (let i = 0; i < 6; i++) {
		const flexDirection = i % 2 === 0 ? "column" : "column reverse";
		views.push(
				COLORS.map((el, i) =>
					<Item key={Math.random()} text={"Item no. " + i} wrapperStyle={{
						flex: 1,
						flexDirection: flexDirection,
						backgroundColor: el,
						display: "flex",
						justifyContent: "center",
						alignItems: "center"
					}} />
				)
		);
	}

	return (
		<View>
			<StatusBar />
			{views}
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
