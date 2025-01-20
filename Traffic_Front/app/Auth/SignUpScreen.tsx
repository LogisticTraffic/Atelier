import React, { useState } from 'react';
import { signUp } from '../actions/authActions';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';

export default function SignUpScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('driver'); // Default role is 'driver'

  const handleSignUp = async() => {
    try{
      const response = axios.post('http://192.168.11.122:3000/auth/signup',
        {
          username,
          password,
          role
        }
      )
      console.log(response);
      navigation.navigate("SignIn");
    }catch( e)
    {
      console.log('Erreur,',e);
    }
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setPassword}
      />

      <View style={styles.roleContainer}>
        <Text style={styles.roleTitle}>Choose your role:</Text>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="driver"
            status={role === 'driver' ? 'checked' : 'unchecked'}
            onPress={() => setRole('driver')}
          />
          <Text style={styles.radioText}>Driver</Text>
        </View>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="responsable"
            status={role === 'responsable' ? 'checked' : 'unchecked'}
            onPress={() => setRole('responsable')}
          />
          <Text style={styles.radioText}>Responsable</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignUp} color="#6200EE" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
    fontSize: 16,
  },
  roleContainer: {
    width: '100%',
    marginBottom: 20,
  },
  roleTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden', // To ensure the button fits neatly inside the rounded container
  },
});
