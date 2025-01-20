import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

const Info = ({ route, navigation }: any) => {
  const [notifications, setNotifications] = useState<any[]>([]); // Liste des notifications
  const [loading, setLoading] = useState(false);

  // useEffect pour récupérer les notifications lorsque le composant est monté
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true); // Démarrer le chargement
        const response = await axios.get("http://192.168.11.122:3000/notif/all");
        setNotifications(response.data); // Mettre à jour l'état avec les notifications récupérées
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false); // Terminer le chargement
      }
    };

    fetchNotifications(); // Appeler la fonction pour récupérer les notifications
  }, []); // Ce useEffect s'exécute une seule fois lorsque le composant est monté

  // useEffect pour envoyer des notifications lorsque l'utilisateur est connecté
  useEffect(() => {
    const sendNotifications = async () => {
      try {
        for (let n of notifications) {
          if (n.seen==0) { // Si la notification n'a pas été vue
            await axios.post("https://exp.host/--/api/v2/push/send", {
              to: n.token, // Le token de l'utilisateur responsable
              title: n.title,
              body: n.body,
            });

             axios.post("http://192.168.11.122:3000/notif/see", {
              id:n.id,
              seen: 1,
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (notifications.length > 0) {
      sendNotifications(); // Appeler la fonction pour envoyer les notifications
    }
  }, [notifications]); // Ce useEffect se déclenche chaque fois que les notifications changent

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Chargement des notifications...</Text> // Affichage pendant le chargement
      ) : (
        <>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('drivers', { sender: route.params.sender })}
          >
            <Text style={styles.cardText}>Drivers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('status')}
          >
            <Text style={styles.cardText}>Drivers Progress</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Info;

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
