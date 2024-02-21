import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios.get('http://192.168.18.183:8082/Users')
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Error al obtener los usuarios:', error);
          Alert.alert('Error', 'No se pudo obtener la lista de usuarios');
        });
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogin = () => {
    const userMatch = userData.find(user => user.username === username);
    if (!userMatch) {
      Alert.alert('Error', 'Usuario no encontrado');
      return;
    }

    if (userMatch.password !== password) {
      Alert.alert('Error', 'Contraseña incorrecta');
      return;
    }
    setUsername('');
    setPassword('');

    navigation.navigate('Home');
  };


  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/fondo.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Bienvenido</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={(text) => setUsername(text)}
          selectionColor="grey"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          selectionColor="grey"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <Text style={styles.text1}>¿Aún no tienes cuenta?</Text>
        <TouchableOpacity onPress={navigateToRegister}>
          <Text style={styles.text2}>Regístrate para comenzar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '80%',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  text1: {
    color: '#FFFFFF',
    marginBottom: 10,
  },
  text2: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
