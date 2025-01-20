import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native';
import axios from 'axios';

export default function App({ navigation }: any) {
  const nav = () => {
    navigation.navigate("resdriver");
  };
  const [role, setRole] = useState('responsable'); // Rôle par défaut
  const [data, setData] = useState([]); // Stocke les données récupérées

  // Fonction pour basculer entre les rôles
  const toggleRole = (selectedRole: any) => {
    setRole(selectedRole);
  };

  // Fonction pour lancer la requête API
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://192.168.11.122:3000/auth/all/${role}`);
      setData(response.data); // Mettre à jour les données récupérées
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sélectionnez un rôle</Text>

      {/* Toggle buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.button, role === 'responsable' && styles.activeButton]}
          onPress={() => toggleRole('responsable')}
        >
          <Text style={styles.buttonText}>Responsable</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, role === 'driver' && styles.activeButton]}
          onPress={() => toggleRole('driver')}
        >
          <Text style={styles.buttonText}>Drivers</Text>
        </TouchableOpacity>
      </View>

      {/* Bouton Rechercher */}
      <View style={styles.buttonContainer}>
        <Button title="Rechercher" onPress={fetchData} />
      </View>

      {/* Bouton Management */}
      <View style={styles.buttonContainer}>
        <Button title="Management" onPress={nav} />
      </View>

      {/* Liste des résultats */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>Id:{item.id} ⚪ Username: {item.username}</Text>
        )}
        ListEmptyComponent={<Text>Aucune donnée disponible</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    marginBottom: 20, // Espacement entre les boutons
  },
});
