import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');

  const handleRegister = () => {
    // Validación de campos
    if (!firstName || !lastName || !username || !email || !password || !password1) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    // Verificación de contraseñas
    if (password !== password1) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Lógica de registro
    axios.post('http://192.168.18.183:8082/Users', {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password
    })
    .then(response => {
      // Manejar la respuesta de la API si es necesario
      Alert.alert('Registro Exitoso', 'El usuario ha sido registrado correctamente.');
      navigation.navigate('Login'); // Navegar a la pantalla de inicio de sesión después del registro
    })
    .catch(error => {
      console.error('Error al registrar el usuario:', error);
      Alert.alert('Error', 'No se pudo completar el registro. Por favor, inténtalo de nuevo.');
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/fondo.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Registrarse</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          selectionColor="grey"
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          selectionColor="grey"
        />
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={(text) => setUsername(text)}
          selectionColor="grey"
        />
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={(text) => setEmail(text)}
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
        <TextInput
          style={styles.input}
          placeholder="Repetir Contraseña"
          secureTextEntry
          value={password1}
          onChangeText={(text) => setPassword1(text)}
          selectionColor="grey"
        />
        <Text style={styles.password}>La contraseña debe contener al menos 8 caracteres</Text>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Crear Cuenta</Text>
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
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '70%', 
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'grey',
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },
  button: {
    backgroundColor: '#272525',
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
  password: {
    color: 'white',
    fontSize: 11,
  },
});

export default RegisterScreen;
