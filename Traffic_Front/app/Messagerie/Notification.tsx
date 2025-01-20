import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import React from 'react';
import axios from "axios";

const Notification = ({ route}: any) => {

  const reclamer = async () => {
      try {
        const res = await axios.post("http://192.168.11.122:3000/notif/reclamation",
        {
          token:"ExponentPushToken[VmGLOGHAby269Jtp9mPBxg]",
          title:"❌❌Réclamation❌❌",
          body:"Il s'agit d'un incident de la part du driver:"+route.params.sender
        })
      } catch (e) {
        console.log(e);
      }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        En cas d'incident, veuillez réclamer à votre Responsable SVP :
      </Text>

      <TouchableOpacity style={styles.button} onPress={reclamer}>
        <Text style={styles.buttonText}>Reclamer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF5733', // Couleur du bouton
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000', // Ombre du bouton
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Pour Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
