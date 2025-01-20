import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons for the messaging icon
import axios from 'axios';

const All = ({ navigation, route }: any) => {
  const [head, setHead] = useState(route.params.sender); // Extract 'head' parameter from route
  const [drivers, setDrivers] = useState<User[]>([]); // State to store drivers
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors

  // Fetch drivers by head from the backend API
  const fetchDrivers = async () => {
    try {
      setLoading(true); // Show loading indicator
      setError(null); // Clear previous errors
      const response = await axios.post('http://192.168.11.122:3000/auth/get-drivers', {
        head, // Send head in the body of the POST request
      });
      console.log(response.data); // Log the API response for debugging
      setDrivers(response.data); // Update drivers state with API response
    } catch (err: any) {
      setError(err.message || 'An error occurred'); // Handle errors
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  useEffect(() => {
    fetchDrivers(); // Fetch drivers when the component mounts
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading drivers...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Drivers for Head: {head}</Text>
      <FlatList
        data={drivers}
        keyExtractor={(item, index) => index.toString()} // Provide a unique key for each item
        renderItem={({ item }) => (
          <View style={styles.driverItem}>
            <Text style={styles.driverName}>Name: {item.username}</Text>
            <TouchableOpacity
              style={styles.messageIconContainer}
              onPress={() =>
                navigation.navigate('Chatx', {
                  sender: head,
                  receiver: item.username,
                })
              }
            >
              <Ionicons name="chatbubble-outline" size={24} color="#0000ff" />
              <Text style={styles.messageText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default All;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  driverItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 14,
    color: '#0000ff',
    marginLeft: 8,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
