import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import { Dimensions } from 'react-native';
import axios from 'axios';

const MapScreen = () => {
  const circleDiameter = 100;
  const { width, height } = Dimensions.get('window');
  const [ubicacion, setUbicacion] = useState(null);
  const scale = Math.min(width, height) / 400;

  useEffect(() => {
    pedirPermisos();
  }, []);

  const pedirPermisos = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permiso de ubicación no concedido');
    } else {
      obtenerUbicacion();
    }
  };

  const obtenerUbicacion = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setUbicacion(location.coords);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  };

  const [points, setPoints] = useState([]);
  useEffect(() => {
    axios.get('http://192.168.18.183:8082/Points')
      .then(response => {
        setPoints(response.data);
      })
      .catch(error => {
        console.error('Error al obtener puntos', error);
      });
  }, []);

  const datafromAPI = points;

  const [blueContainer2Visible, setBlueContainer2Visible] = useState(false);

  let [loaded] = useFonts({
    // Define tus fuentes aquí
  });

  if (!loaded) {
    return null; // Muestra algo mientras se cargan las fuentes
  }

  return (
    <View style={styles.container}>
      {/* Contenedor de color azul arriba */}
      <View style={styles.blueContainer}>
        <Text style={styles.blueText}>Ubicación</Text>
        <Image source={require('./assets/marcador.png')} style={styles.markerImage} />
      </View>
      
      {/* Mapa */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: ubicacion?.latitude || -2.9005500,
            longitude: ubicacion?.longitude || -79.0045300,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {ubicacion && (
            <Marker
              coordinate={{
                latitude: ubicacion.latitude,
                longitude: ubicacion.longitude,
              }}
              title="Mi ubicación"
              description="Esta es mi ubicación actual."
              image={require('./assets/marcador.png')} 
            />
          )}

          {datafromAPI.map(punto => (
            <Circle
              key={punto.id}
              center={{
                latitude: punto.latitude,
                longitude: punto.longitude,
              }}
              radius={punto.radius}
              fillColor={punto.color}
            />
          ))}
        </MapView>
        {!ubicacion && <Text>Obteniendo ubicación...</Text>}
      </View>
          
      {/* Contenedor azul abajo */}
      {blueContainer2Visible && (
        <View style={styles.blueContainer2}>
          <View style={styles.zoneContainer}>
            <Text style={styles.redZone}>Zonas Rojas</Text>
            <Text style={styles.criticalZone}>Zonas Críticas</Text>
            <Text style={styles.blackZone}>Zonas Negras</Text>
          </View>
          <View style={styles.container2}>
            <View style={[styles.circle, { backgroundColor: 'rgba(255,0,0,0.5)',borderColor:'black',borderWidth: 3 }]}></View>
            <View style={[styles.circle, { backgroundColor: 'rgba(255,255,0,0.5)',borderColor:'black',borderWidth: 3}]}></View>
            <View style={[styles.circle, { backgroundColor: 'rgba(0,0,0,0.4)',borderColor:'black',borderWidth: 3 }]}></View>
          </View>
        </View>
      )}

      {/* Botón para controlar la visibilidad de blueContainer2 */}
      <TouchableOpacity
        style={styles.blueContainer3}
        onPress={() => setBlueContainer2Visible(!blueContainer2Visible)}
      >
        <Text style={styles.toggleButtonText}>
          {blueContainer2Visible ? 'Ocultar' : 'Mostrar'} Zonas 
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blueContainer: {
    backgroundColor: '#4c669f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    
  },
  blueContainer2: {
    backgroundColor: '#4c669f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderColor:'white',
    borderWidth: 3,
    flexDirection:'column'
  },
  blueContainer3: {
    backgroundColor: '#4c669f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderColor:'white',
    borderWidth: 3,
    flexDirection:'column'
  },
  blueText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  redZone: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
    marginHorizontal: 10, // Agregado para separación horizontal
  },
  criticalZone: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
    marginHorizontal: 10, // Agregado para separación horizontal
  },
  blackZone: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
    marginHorizontal: 10, // Agregado para separación horizontal
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  zoneContainer: {
    flexDirection: 'row', // Cambiado a 'row'
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:45,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft:200,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 80,
  },
  toggleButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapScreen;
