import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Dimensions, Text, View} from 'react-native';
import {useState} from 'react';
import {SafeAreaProvider, SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';


import CalculatorButton from "./components/CalculatorButton";

export default function App() {
	const [orientation, setOrientation] = useState(Dimensions.get('window').height > 500 ? 'portrait' : 'landscape');
	Dimensions.addEventListener('change', () => {
		setOrientation(Dimensions.get('window').height > 500 ? 'portrait' : 'landscape');
	});
	const [currentEquation, setCurrentEquation] = useState('');
	const [result, setResult] = useState('');

	function looseEval(str) {
		return Function(`'use strict'; return (${str})`)();
	}
	function inputHandler(value) {
		setCurrentEquation(prevState => prevState + value);
	}
	function calculateHandler() {
		try {
			setResult(looseEval(currentEquation));
			setCurrentEquation(looseEval(currentEquation));
		} catch (e) {
			setResult('Error');
			setCurrentEquation('');
		}
	}
	function squareHandler() {
		const currentValue = looseEval(currentEquation);
		const newValue = (currentValue ** 2).toString();
		setCurrentEquation(newValue);
		setResult(newValue);
	}
	function trigonometryHandler(func) {
		if(!['sin', 'cos'].includes(func)) return console.error('Wrong trigonometry function');
		const currentValue = looseEval(currentEquation);
		const newValue = Math[func](currentValue).toString();
		setCurrentEquation(newValue);
		setResult(newValue);
	}
	function clearHandler() {
		setCurrentEquation('');
		setResult('');
	}


	return (
		<SafeAreaProvider>
		<SafeAreaView style={[styles.container, {paddingTop: 10}]}>
			<StatusBar style="light"/>
			<View style={orientation === 'portrait' ? styles.output : [styles.output, styles.outputVertical]}>
				<Text style={styles.currentEquation}>
					{currentEquation}
				</Text>
				<Text style={styles.result}>
					{result}
				</Text>
			</View>
			<View style={orientation === 'portrait' ? styles.keyboard : [styles.keyboard, styles.keyboardVertical]}>
				<View style={styles.inputColumn}>
					<CalculatorButton text="7" theme="grey" onClick={() => inputHandler("7")}/>
					<CalculatorButton text="4" theme="grey" onClick={() => inputHandler("4")}/>
					<CalculatorButton text="1" theme="grey" onClick={() => inputHandler("1")}/>
					<CalculatorButton text="." theme="grey" onClick={() => inputHandler(".")}/>
				</View>
				<View style={styles.inputColumn}>
					<CalculatorButton text="8" theme="grey" onClick={() => inputHandler("8")}/>
					<CalculatorButton text="5" theme="grey" onClick={() => inputHandler("5")}/>
					<CalculatorButton text="2" theme="grey" onClick={() => inputHandler("2")}/>
					<CalculatorButton text="0" theme="grey" onClick={() => inputHandler("0")}/>
				</View>
				<View style={styles.inputColumn}>
					<CalculatorButton text="9" theme="grey" onClick={() => inputHandler("9")}/>
					<CalculatorButton text="6" theme="grey" onClick={() => inputHandler("6")}/>
					<CalculatorButton text="3" theme="grey" onClick={() => inputHandler("3")}/>
					<CalculatorButton text="=" theme="orange" onClick={calculateHandler}/>
				</View>
				{orientation === 'landscape' && (
					<View style={styles.inputColumn}>
						<CalculatorButton text="sqr" theme="orange" onClick={() => squareHandler()} />
						<CalculatorButton text="pow" theme="orange" onClick={() => inputHandler("**")} />
						<CalculatorButton text="sin" theme="orange" onClick={() => trigonometryHandler("sin")} />
						<CalculatorButton text="cos" theme="orange" onClick={() => trigonometryHandler("cos")} />
					</View>
				)}
				<View style={styles.inputColumn}>
					<CalculatorButton text="C" theme="orange" onClick={clearHandler}/>
					<CalculatorButton text="&#247;" theme="orange" onClick={() => inputHandler("/")}/>
					<CalculatorButton text="&#215;" theme="orange" onClick={() => inputHandler("*")}/>
					<CalculatorButton text="&#8722;" theme="orange" onClick={() => inputHandler("-")}/>
					<CalculatorButton text="&#43;" theme="orange" onClick={() => inputHandler("+")}/>
				</View>
			</View>
		</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden'
	},
	output: {
		marginTop: 10,
		flex: 2,
		backgroundColor: '#000',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	outputVertical: {
		flex: 2
	},
	currentEquation: {
		fontSize: 40,
		width: '100%',
		padding: 10,
		textAlign: 'right',
		color: "#fff"
	},
	result: {
		fontSize: 50,
		width: '100%',
		padding: 10,
		textAlign: 'right',
		color: "#fff"
	},
	keyboard: {
		flex: 5,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	keyboardVertical: {
		flex: 4
	},
	inputColumn: {
		flex: 1,
		backgroundColor: '#000',
		flexDirection: 'column',
		height: '100%',
	}
});
