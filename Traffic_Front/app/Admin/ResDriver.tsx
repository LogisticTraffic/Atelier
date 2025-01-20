import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import axios from "axios";
import { Button } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';

const ResDriver = () => {
  const [role, setRole] = useState("responsable"); // Rôle initial
  const [selectedDriver, setSelectedDriver] = useState(""); // Driver sélectionné
  const [email, setEmail] = useState(""); // Email saisi pour conducteur
  const [drivers, setDrivers] = useState([]); // Liste des drivers récupérés

  // Fonction pour récupérer les drivers
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await axios.get(`http://192.168.11.122:3000/auth/all/${role}`);
        setDrivers(res.data); // Stocke les données des drivers
        console.log("Drivers récupérés :", drivers);

      } catch (error) {
        console.error("Erreur lors de la récupération des drivers :", error);
      }
    };

    fetchDrivers(); // Appel de la fonction au montage
  }, [role]); // Rechargement si le rôle change

  // Fonction pour affecter un responsable
  // Fonction pour affecter un responsable
  const affect = async () => {
    try {
      console.log("Données envoyées :", { username: email, responsable: selectedDriver });
      const res = await axios.post(`http://192.168.11.122:3000/auth/addRD`, {
        username: email, // Nom d'utilisateur du driver sélectionné
        responsable: selectedDriver, // Email ou identifiant du responsable
      });
      console.log("Affectation réussie :", res.data);
    } catch (error) {
      console.error("Erreur lors de l'affectation :", error.response?.data || error.message);
    }
  };
  


  return (
    <View style={styles.main}>
      <Text style={styles.title}>Affecting Responsibility</Text>

      {/* Sélection des utilisateurs */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Select Responsable:</Text>
        <Picker
          selectedValue={selectedDriver}
          onValueChange={(itemValue) => setSelectedDriver(itemValue)}
        >
          {drivers.map((driver) => (
            <Picker.Item
              key={driver.id} // Identifiant unique pour chaque option
              label={driver.username}
              value={driver.username}
            />
          ))}
        </Picker>

      </View>

      {/* Input pour entrer une valeur */}
      <View style={styles.input}>
        <TextInput
          placeholder="Driver Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
        />
      </View>

      {/* Bouton */}
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => affect()} // Appelle la fonction affect au clic
      >
        Affecter
      </Button>
    </View>
  );
};

export default ResDriver;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 10,
  },
});
