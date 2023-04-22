import React, {useEffect, useState,Image} from 'react';
import {Avatar} from 'react-native-paper';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  route,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import HomeScreen from './HomeScreen';
const LoginPage = ({navigation}) => {
  const [phoneNo, setPhoneNo] = useState('');
  const [name, setName] = useState('');

  const createUser = async () => {
    try {
      await auth()
      .signInWithEmailAndPassword(name, phoneNo)
      .then(() => {
        const routes = navigation.getState()?.routes
        navigation.replace(routes[routes.length - 1]?.name == "LoginPage" ? "BottomNavigator" : 'HomeScreen' , {user: route?.params.user});
      });
    }
    catch(error) {
      if (error.code === 'auth/user-not-found') {
        navigation.navigate('SignUp'); 
        Alert.alert('User Account not found please sign-up')
        console.log('That email address is already in use!');
      }
      if(error.code='auth/wrong-password') {
        Alert.alert('The password is invalid or the user does not have a password')
      }
      if (error.code === 'auth/invalid-email') {
        Alert.alert('please enter valid credential')
        console.log('That email address is invalid!');
      }

      console.error(error);
    }
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Farmers Community</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#AAAAAA"
        onChangeText={text => setName(text)}
        value={name}
        autoCapitalize="words"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#AAAAAA"
        onChangeText={text => setPhoneNo(text)}
        value={phoneNo}
        maxLength={10}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button} onPress={createUser}>
        <Text style={styles.buttonTitle}>Log in</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={styles.footerLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#F2F2F2',
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 16,
    width: '100%',
    fontSize: 16,
  },
  ImagePic: {
    width: 110,
    height: 110,
    borderRadius: 24,
    shadowColor: '#202020',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },
  button: {
    backgroundColor: '#0dbd71',
    width: '100%',
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  footerText: {
    color: '#333333',
    fontSize: 16,
  },
  footerLink: {
    color: '#0dbd71',
    marginLeft: 5,
    fontSize: 16,
  },
});

export default LoginPage;
