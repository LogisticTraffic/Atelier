import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Welcome = ({ navigation }: any) => {
  const handleSignIn = () => {
    navigation.navigate('SignIn'); // Navigate to the SignIn screen
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background}
      source={require('../../assets/images/traffic.jpg')}
      >
        <Text style={styles.title}>Welcome To Traffic Logistic</Text>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Welcom</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure it takes full screen
  },
  background: {
    flex: 1, // Ensure the background image stretches to fill the container
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20, // Added spacing between title and button
    fontSize: 27, // Adjust font size
    color: 'white', // Adjust text color for better contrast
  },
  button: {
    backgroundColor: '#007AFF', // Button background color (blue)
    paddingVertical: 10, // Padding for vertical space
    paddingHorizontal: 20, // Padding for horizontal space
    borderRadius: 5, // Rounded corners
    alignItems: 'center', // Center text inside button
  },
  buttonText: {
    color: 'white', // Button text color
    fontSize: 18, // Font size for button text
    fontWeight: 'bold', // Bold text
  },
});
