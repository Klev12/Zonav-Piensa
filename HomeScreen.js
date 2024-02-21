import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View, Text, SafeAreaView, Animated, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'; 
import { LinearGradient } from "expo-linear-gradient";

const Stack = createStackNavigator();

const images = [
  {
    imageUrl: 'https://img.freepik.com/fotos-premium/coches-policia-ciudad-noche_688350-5009.jpg',
    button: {
      text: 'Zonas Negras',
      screenName: 'ZonasNegras',
      image: require('./assets/robo.png') 
    },
  },
  {
    imageUrl: 'https://www.arpem.com/wp-content/uploads/2023/07/protocolo-pas.jpg',
    button: {
      text: 'Zonas Críticas',
      screenName: 'ZonasCriticas',
      image: require('./assets/accidente.png') 
    },
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
    button: {
      text: 'Zonas Rojas',
      screenName: 'ZonasRojas',
      image: require('./assets/detener.png') 
    },
  },
];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const containerSpace = width * 0.7;
const espaceLateral = (width - containerSpace) / 2;
const espace = 10;
const alturaBackdrop = height * 0.5;

function BackDrop({ scrollX }) {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      {images.map((imagen, index) => {
        const inputRange = [
          (index - 1) * containerSpace,
          index * containerSpace,
          (index + 1) * containerSpace,
        ];

        const outputRange = [0, 1, 0];
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange,
        });

        return (
          <Animated.Image
            key={index}
            source={{ uri: imagen.imageUrl }}
            style={[{ height: alturaBackdrop, width, position: "absolute", top: 0, opacity }]}
          />
        );
      })}
      <LinearGradient
        colors={["transparent", "#4c669f"]}
        style={{ height: alturaBackdrop, width, position: "absolute", top: 382 }}
      />
    </View>
  );
}

function HomeScreen({ navigation }) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  HomeScreen.navigationOptions = {
    headerShown: false, // Esta línea oculta el header en esta pantalla
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackDrop scrollX={scrollX} />
      <StatusBar hidden />
      <View style={styles.titleContainer}>
        <Text style={{ ...styles.titleText, flexDirection: 'row', alignItems: 'center' }}> DESCUBRE <Image source={require('./assets/lupa.png')} style={{ width: 40, height: 40, marginLeft: 10 }}/> </Text>
      </View>
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        data={images}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 200,
          paddingHorizontal: espaceLateral,
        }}
        decelerationRate={0}
        snapToInterval={containerSpace}
        snapToAlignment="start"
        scrollEventThrottle={16}
        keyExtractor={(item) => item.imageUrl}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * containerSpace,
            index * containerSpace,
            (index + 1) * containerSpace,
          ];

          const outputRange = [0, -50, 0];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange,
          });

          return (
            <View style={{ width: containerSpace,  }}>
              <Animated.View style={{
                marginHorizontal: espace,
                padding: espace,
                borderRadius: 34,
                height:540,
                backgroundColor: "#fff",
                alignItems: "center",
                transform: [{ translateY }],
              }}>
                <Image source={{ uri: item.imageUrl }} style={styles.posterImage} />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate(item.button.screenName)} 
                >
                  <Text style={styles.buttonText}>
                    {item.button.text}
                  </Text>
                  <Image source={item.button.image} style={styles.buttonImage} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        }}
      />
       <TouchableOpacity
        style={styles.staticButton}
        onPress={() => navigation.navigate('Map')} // Aquí debes poner el nombre de la pantalla a la que quieres navegar
      >
        <Text style={styles.staticButtonText}>Ir al mapa <Image source={require('./assets/mapa.png')} style={styles.staticButtonImage} /></Text>
      </TouchableOpacity>
    </SafeAreaView>
    
  );
  
}


function ZonasNegras() {
  return (
    <View style={styles.container1}>
      <Image
        source={require('./assets/CiudadPeligrosa.jpg')}
        style={styles.imagen}
      />
      <View style={styles.textoContainer}>
        <Text style={styles.encabezado}>Zonas Negras</Text>
      </View>
      <View style={styles.textoContainer}>
        <Text style={styles.descripcion}>Esta zona representa la presencia de actividades delictivas como robos, asaltos, 
        y tráfico de drogas, donde se crea un ambiente de temor e inseguridad, limitando así la calidad de vida de los usuarios locales y extranjeros.</Text>
      </View>
      <View>
        <Text>----------------------------------------------------------------------------------------</Text>
      </View>
      <View>
        <Text style={styles.recomedaction}>Te recomendamos estar alejado de estas zonas con altos índices de criminalidad:</Text>
      </View>
      <View style={styles.imagenesContainer}>
        <View style={styles.imagenTextoContainer}>
          <Image source={require('./assets/calleLarga.jpg')} style={styles.imagenCircular}/>
          <Text style={styles.textoImagen}>Calle Larga</Text>
        </View>
        <View style={styles.imagenTextoContainer}>
          <Image source={require('./assets/horonatoVasquez.jpg')} style={styles.imagenCircular}/>
          <Text style={styles.textoImagen}>Honorato Vasquez</Text>
        </View>
      </View>
      <View style={styles.imagenesContainer}>
        <View style={styles.imagenTextoContainer}>
          <Image source={require('./assets/9Octubre.jpg')} style={styles.imagenCircular}/>
          <Text style={styles.textoImagen}>Plaza Cívica</Text>
        </View>
        <View style={styles.imagenTextoContainer}>
          <Image source={require('./assets/elVado.png')} style={styles.imagenCircular}/>
          <Text style={styles.textoImagen}>Barrio El Vado</Text>
        </View>
      </View>
    </View>
  );
}

function ZonasCriticas() {
  return (
    <View style={styles.container2}>
      <Image
        source={require('./assets/transito.jpg')}
        style={styles.imagen2}
      />
      <View style={styles.textoContainer2}>
        <Text style={styles.encabezado2}>Zonas Críticas</Text>
      </View>
      <View style={styles.textoContainer2}>
        <Text style={styles.descripcion2}>Esta zona representa accidentes de tránsito automovilísticos en muchas zonas urbanas y suburbanas, 
        donde el comportamiento  imprudente de los conductores contribuyen a un aumento significativo de incidentes viales.</Text>
      </View>
      <View>
        <Text>----------------------------------------------------------------------------------------</Text>
      </View>
      <View>
        <Text style={styles.recomedaction2}>Te recomendamos tener precaución al conducir por estas zonas viales: </Text>
      </View>
      <View style={styles.imagenesContainer2}>
        <View style={styles.imagenTextoContainer2}>
          <Image source={require('./assets/Autopista.jpg')} style={styles.imagenCircular2}/>
          <Text style={styles.textoImagen2}>Autopista</Text>
        </View>
        <View style={styles.imagenTextoContainer2}>
          <Image source={require('./assets/ControlSur.png')} style={styles.imagenCircular2}/>
          <Text style={styles.textoImagen2}>Control Sur</Text>
        </View>
      </View>
      <View style={styles.imagenesContainer2}>
        <View style={styles.imagenTextoContainer2}>
          <Image source={require('./assets/RedondelChuchonas.png')} style={styles.imagenCircular2}/>
          <Text style={styles.textoImagen2}>Muñecas De Piedra</Text>
        </View>
        <View style={styles.imagenTextoContainer2}>
          <Image source={require('./assets/CholaCuenca.png')} style={styles.imagenCircular2}/>
          <Text style={styles.textoImagen2}>Chola Cuencana</Text>
        </View>
      </View>
    </View>
  );
}

function ZonasRojas() {
  return (
    <View style={styles.container3}>
      <Image
        source={require('./assets/trafico2.jpg')}
        style={styles.imagen3}
      />
      <View style={styles.textoContainer3}>
        <Text style={styles.encabezado3}>Zonas Rojas</Text>
      </View>
      <View style={styles.textoContainer3}>
        <Text style={styles.descripcion3}>Esta zona representa el tráfico en las zonas urbanas por la presencia constante de
        vehículos en las carreteras, lo que resulta frustrante y un impacto negativo en la calidad de vida de los residentes. </Text>
      </View>
      <View>
        <Text>----------------------------------------------------------------------------------------</Text>
      </View>
      <View>
        <Text style={styles.recomedaction3}>Te recomendamos  evitar conducir por estas zonas viales debido al tráfico intenso: </Text>
      </View>
      <View style={styles.imagenesContainer3}>
        <View style={styles.imagenTextoContainer3}>
          <Image source={require('./assets/tresPuentes.jpg')} style={styles.imagenCircular3}/>
          <Text style={styles.textoImagen3}>Tres Puentes</Text>
        </View>
        <View style={styles.imagenTextoContainer3}>
          <Image source={require('./assets/calleLarga.jpg')} style={styles.imagenCircular3}/>
          <Text style={styles.textoImagen3}>Calle Larga</Text>
        </View>
      </View>
      <View style={styles.imagenesContainer3}>
        <View style={styles.imagenTextoContainer3}>
          <Image source={require('./assets/SimonBolivar.png')} style={styles.imagenCircular3}/>
          <Text style={styles.textoImagen3}>Simon Bolivar</Text>
        </View>
        <View style={styles.imagenTextoContainer3}>
          <Image source={require('./assets/GeneralTorres.png')} style={styles.imagenCircular3}/>
          <Text style={styles.textoImagen3}>GeneralTorres</Text>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ZONAV" 
        component={HomeScreen} 
        options={{
          headerTitle: props => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:50 }}>
              <Image
                source={require('./assets/LOGO.png')}
                style={{ width: 40, height: 40 }}
              /> 
              <Text style={[styles.logoText, { fontSize: 30, fontWeight: 'bold', color: 'white', marginLeft:8 }]}>ZONAV</Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#4c669f', 
          },
        }}
      />
      <Stack.Screen 
        name="ZonasNegras" 
        component={ZonasNegras} 
        options={{
          headerTitle: props => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:58 }}>
              <Image
                source={require('./assets/LOGO.png')}
                style={{ width: 36, height: 36 }}
              />
              <Text style={[styles.logoText, { fontSize: 30, fontWeight: 'bold', color: 'white', marginLeft: 5 }]}>ZONAV</Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#4c669f', 
          },
        }}
      />
      <Stack.Screen 
        name="ZonasCriticas" 
        component={ZonasCriticas} 
        options={{
          headerTitle: props => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:58 }}>
              <Image
                source={require('./assets/LOGO.png')}
                style={{ width: 36, height: 36 }}
              />
              <Text style={[styles.logoText, { fontSize: 30, fontWeight: 'bold', color: 'white', marginLeft: 5 }]}>ZONAV</Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#4c669f', 
          },
        }}
      />
      <Stack.Screen 
        name="ZonasRojas" 
        component={ZonasRojas} 
        options={{
          headerTitle: props => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:58 }}>
              <Image
                source={require('./assets/LOGO.png')}
                style={{ width: 36, height: 36 }}
              />
              <Text style={[styles.logoText, { fontSize: 30, fontWeight: 'bold', color: 'white', marginLeft: 5 }]}>ZONAV</Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#4c669f', 
          },
        }}
      />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterImage: {
    width: "100%",
    height: containerSpace * 1.85,
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  titleContainer: {
    position: 'absolute',
    top: 80,
    width: '150%',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    textShadowColor: 'blue', 
    textShadowOffset: { width: -3, height: 3 }, 
    textShadowRadius: 5, 
    color: "white",
    marginRight:140, 
    marginVertical:-25
  },
  button: {
    marginVertical: -78,
    padding: 5,
    borderRadius: 30,
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor:"#4c669f", 
    borderColor: "white",
    borderWidth: 1,
  },  
 
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 9, 
    height:30,
  },
  buttonImage: {
    width: 28,
    height: 28, 
  },

  //Zonas Negras
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  imagen: {
    position: 'absolute',
    top: '4%', 
    left:0,
    width: '155%', 
    height: 310,
    resizeMode: 'cover', 
    transform: [{ translateY: -130 }], 
    borderRadius:100,
  },
  textoContainer: {
    marginTop: 10,
  },
  encabezado: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: '-45%', 
    marginTop: '48%',
  },
  descripcion: {
    fontSize: 15, 
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: '90%',
  },
  icono: {
    width: 20, 
    height: 20, 
    marginRight: 8, 
  },
  recomedaction:{
    fontSize:15,
    fontWeight: 'bold',
    maxWidth:'70%',
    marginTop:15
  },
  imagenesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40, 
    marginTop: 10,
  },
  imagenTextoContainer: {
    alignItems: 'center',
    marginHorizontal: 40, 
  },
  imagenCircular: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  textoImagen: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  //Zonas Criticas

  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  imagen2: {
    position: 'absolute',
    top: '4%', 
    left:0,
    width: '125%', 
    height: 310,
    resizeMode: 'cover', 
    transform: [{ translateY: -130 }], 
    borderRadius:100,
  },
  textoContainer2: {
    marginTop: 10,
  },
  encabezado2: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: '-45%',
    marginTop: '48%',
  },
  descripcion2: {
    fontSize: 15, 
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: '90%',
  },
  icono2: {
    width: 20, 
    height: 20, 
    marginRight: 8, 
  },
  recomedaction2:{
    fontSize:15,
    fontWeight: 'bold',
    maxWidth:'62%',
    marginTop:15
  },
  imagenesContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40, 
    marginTop: 10,
  },
  imagenTextoContainer2: {
    alignItems: 'center',
    marginHorizontal: 40, 
  },
  imagenCircular2: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  textoImagen2: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  //Zonas Rojas 

  container3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  imagen3: {
    position: 'absolute',
    top: '4%', 
    left:0,
    width: '125%', 
    height: 310,
    resizeMode: 'cover', 
    transform: [{ translateY: -130 }], 
    borderRadius:100,
  },
  textoContainer3: {
    marginTop: 10,
  },
  encabezado3: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: '-45%', 
    marginTop: '48%',
  },
  descripcion3: {
    fontSize: 15, 
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: '90%',
  },
  icono3: {
    width: 20, 
    height: 20,
    marginRight: 8, 
  },
  recomedaction3:{
    fontSize:15,
    fontWeight: 'bold',
    maxWidth:'75%',
    marginTop:15
  },
  imagenesContainer3: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    marginTop: 10,
  },
  imagenTextoContainer3: {
    alignItems: 'center',
    marginHorizontal: 40, 
  },
  imagenCircular3: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  textoImagen3: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  //Button to the map
  staticButton: {
    position: "absolute",
    backgroundColor: "#4c669f",
    width: 120,
    height: 35,
    borderRadius: 30,
    right: 0,
    bottom: 7,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    flexDirection: 'row',
    marginRight:132,
  },
  staticButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 5,
  },
  staticButtonImage: {
    width: 20,
    height: 20,
  },
  logoText: {
    textShadowColor: 'blue', 
    textShadowOffset: { width: -3, height: 3 }, 
    textShadowRadius: 5, 
    color: "white",
    marginRight: 90, 
    marginVertical: -15,
  },
});

