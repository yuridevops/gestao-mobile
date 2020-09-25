import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Exo2_400Regular, Exo2_900Black, Exo2_600SemiBold } from '@expo-google-fonts/exo-2';
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons'
import api from '../config/api'

export default function Login({ navigation }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')




  let [fontsLoaded] = useFonts({
    Exo2_400Regular,
    Exo2_900Black,
    Exo2_600SemiBold
  });

  if (!fontsLoaded) {
    return null
  }

  async function login(email: String, password: String) {
    try{
      const response = await api.post('/authenticate', { email, password })
      if(response.status === 200){
        navigation.navigate('Home')
      }
    }catch(err){
      console.log('Credenciais invalidas')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../assets/sicredi-logo.png')} />
        <Text style={styles.menuText}>SICREDI STORE STOCK</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.searchSection}>
          <Feather style={styles.searchIcon} name="user" size={20} color="#aab0aa" />
          <TextInput
            style={styles.input}
            placeholder="Login"
            underlineColorAndroid="transparent"
            onChangeText={value => { setEmail(value) }}
          />
        </View>
        <View style={styles.searchSection}>
          <Feather style={styles.searchIcon} name="key" size={20} color="#aab0aa" />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            underlineColorAndroid="transparent"
            autoCompleteType="password"
            secureTextEntry={true}
            onChangeText={value => { setPassword(value) }}
            textContentType="password"
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            login(email, password)
          }}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7E6C8',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20

  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    marginTop: 40,
    height: 50,
    width: 200,
    resizeMode: 'stretch'
  },
  menuText: {
    marginTop: 80,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: "Exo2_900Black",
    color: "#3FA110"
  },
  button: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#1e9b32",
    width: 300,
    height: 50,
    borderRadius: 5
  },
  buttonText: {
    fontFamily: "Exo2_600SemiBold",
    fontSize: 24,
    color: "#fff"
  },
  inputText: {
    marginTop: 10,
    width: 300,
    height: 45,
    paddingStart: 15,
    fontFamily: "Exo2_400Regular",
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: 16
  },
  searchSection: {
    height: 45,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 5
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});
