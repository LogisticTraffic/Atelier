import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import axios from "axios";
import jwt_decode, { jwtDecode } from 'jwt-decode';

interface MyJwtPayload {
  username: string;
  role: string;
  sub: number;
  exp: number;
  iat: number;
}

const SignIn = ({ navigation }: any) => {
  const [username, setuserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUpNavigation = () => {
    navigation.navigate('SignUp'); // Ensure this matches your navigation setup
  };

  const welcom = async() => {
   try{
    console.log("Username:", username, "Password:", password);
     const response= await axios.post("http://192.168.11.122:3000/auth/signin",
      {
        username,
        password
      }, {
        headers: {
          "Content-Type": "application/json", // Ensure the correct content type
        },
      }
     )
     console.log(response);
     const token= response.data;
     console.log(token)
     const tk = jwtDecode<MyJwtPayload>(token);
      const hea=tk.head;
    if( tk.role == "driver"){
      navigation.navigate('Driver',{sender:username,receiver:hea}); 
     }else{
      if(tk.role == "super admin")
      {
        navigation.navigate('admin'); 
      }else{
        navigation.navigate('Info',{sender:username,receiver:hea}); 
      }
  
     }

   }catch(e)
   {

   }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={(text) => setuserName(text)}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={welcom}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      
      <Text>
        Don't have an account? 
        <TouchableOpacity onPress={handleSignUpNavigation}>
          <Text style={styles.linkText}> Sign Up</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2c3e50',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // For Android shadow effect
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  linkText: {
    color: '#3498db', // Link color for "Sign Up"
    fontSize: 16,
    fontWeight: '600',
  },
});
