import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avatar} from 'react-native-paper';
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const UserProfile = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      const user = await firebase.auth().currentUser;
      const data = await firestore().collection('User1').doc(user.uid).get();
      setName(data._data.name);
      setEmail(user.email)
    }
    catch(err) {
      console.log(err);
    }
  }

  const signOut = async () => {
    try {
      await auth().signOut().then(() => console.log('User signed out!'));
      navigation.replace('LoginPage');
    }
    catch(err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Avatar.Image
          size={150}
          source={require('../assests/Image/user.png')}
          style={{
            alignItems: 'center',
            width: 300,
            backgroundColor: 'white',
          }}
        />
        <Text style={styles.heading}>User Profile Details</Text>
        <View style={{gap: 10,marginVertical:40}}>
          <Text style={styles.TextArea}>Name: {name}</Text>
          <Text style={styles.TextArea}>
            Email: {email}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CropStock')}>
        <Text style={styles.buttonText}>Buyer/Seller</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    color:'black',
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  profile: {
    flexDirection: 'row',
    marginBottom: 10,
    textAlign: 'left',
    borderWidth: 2,
    borderColor: 'red',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  info: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0dbd71',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width:'70%',
    marginTop:20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  TextArea: {
    fontSize: 17,
    color: 'black',
    fontWeight: '400',
  },
});

export default UserProfile;
