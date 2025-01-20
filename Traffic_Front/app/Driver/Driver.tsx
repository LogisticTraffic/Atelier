import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = ({ route,navigation }:any) => {
  return (
    <View style={styles.container}>
    
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Notifier',{sender:route.params.sender})}
      >
        <Text style={styles.cardText}>Réclamer</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Chat',{sender:route.params.sender,receiver:route.params.receiver})}
      >
        <Text style={styles.cardText}>Contacter Responsable</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
