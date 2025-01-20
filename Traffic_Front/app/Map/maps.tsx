import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView  from 'react-native-maps'; // Importation de MapView depuis react-native-maps
import { Marker } from 'react-native-maps';
// Définition du composant fonctionnel Maps
const Maps = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.697904, 
          longitude: -7.4019606, 
          latitudeDelta: 0.0922, 
          longitudeDelta: 0.0421, 
        }}
      />

      {/* Marqueur 1 */}
 <Marker
      coordinate={{ latitude: 33.697904, longitude: -7.4019606 }} // Position du marqueur
      title="Driver Mohammed" // Titre du marqueur
      description="position de driver"
  /> 

 <Marker
      coordinate={{ latitude: 33.703904, longitude: -7.4059606 }}
      title="Driver Youssef"
      description="position de driver" 
 />
    </View>
  );
};

// Définition des styles
const styles = StyleSheet.create({
  container: {
    flex: 1, // Occupe toute la hauteur disponible
    width: '100%', // Largeur de 100% de l'écran
    height: '100%', // Hauteur de 100% de l'écran
  },
  map: {
    flex: 1, // La carte occupe tout l'espace du conteneur
  },
});

export default Maps;
