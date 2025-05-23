import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const IP = '192.168.0.30';
const PORT = 8080;
const MIN_INTERVAL = 0;

export default function App() {
  const [lastSent, setLastSent] = useState(new Date());
  const [ws, setWs] = useState(null);
  const [shouldSend, setShouldSend] = useState(false);

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(32);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    if (subscription) {
      const now = new Date();
      if (ws && ws.readyState === WebSocket.OPEN && shouldSend && now - lastSent > MIN_INTERVAL) {
        console.log('sending' + now);
        setLastSent(now);
        ws.send(JSON.stringify({ x: x, y: y, z: z }));
      }
    }
  }, [subscription, ws, x, y, z]);

  useEffect(() => {
    const newWs = new WebSocket(`ws://${IP}:${PORT}`);
    newWs.onerror = (e) => {
      console.log(e.message);
    };

    newWs.onclose = (e) => {
      console.log(e.code, e.reason);
    };

    setWs(newWs);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
	<View style={styles.buttonContainer}>
		<TouchableOpacity onPress={() => setShouldSend(prevState => !prevState)} style={styles.button}>
		  <Text>{shouldSend ? 'Currently sending' : 'Currently not sending'}</Text>
		</TouchableOpacity>
	</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});
