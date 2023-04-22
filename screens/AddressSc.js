import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { database } from 'firebase-functions/v1/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const SignUpPage = () => {
  const [addLine1, setAddLine1] = useState('');
  const [addLine2, setAddLine2] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    getDatabase();
  }, []);

  const navigation = useNavigation();
  const route = useRoute();

  const getDatabase = async () => {
    try {
      const user = await firebase.auth().currentUser.uid;
      const data = await firestore().collection('User1').doc(user).get();

      console.log(data._data);
    }
    catch(err) {
      console.log(err);
    }
  }

  const handleAddData = async () => {
    try {
      const user = await firebase.auth().currentUser.uid;
      await firestore().collection('User1').doc(user).set({
        address1: addLine1,
        address2: addLine2,
        cityName: city,
        pinCode: pincode,
        stateName: state,
        userType: (route?.params.isBuyer==1)?"Buyer":"Seller",
        name: route?.params.name,
      }).then(() =>{console.log('data added')});

      console.log(user);
      navigation.navigate('BottomNavigator');
    }
    catch(err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Address Details-</Text>
      <TextInput
        style={styles.input}
        placeholder="Address Line 1"
        placeholderTextColor="#AAAAAA"
        onChangeText={text => setAddLine1(text)}
        value={addLine1}
        autoCapitalize="words"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Adress Line 2"
        placeholderTextColor="#AAAAAA"
        onChangeText={text => setAddLine2(text)}
        value={addLine2}
        autoCapitalize="words"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Pin Code"
        placeholderTextColor="#AAAAAA"
        onChangeText={text => setPincode(text)}
        value={pincode}
        maxLength={6}
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        placeholderTextColor="#AAAAAA"
        onChangeText={text => setCity(text)}
        value={city}
        autoCapitalize="words"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        placeholderTextColor="#AAAAAA"
        onChangeText={text => setState(text)}
        value={state}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.rowstyle}>
        <View style={styles.boxstyle}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => navigation.navigate('SelectProfile')}>
            <Text style={styles.buttonTitle1}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxstyle}>
          <TouchableOpacity style={styles.button} onPress={handleAddData}>
            <Text style={styles.buttonTitle}>Save</Text>
          </TouchableOpacity>
        </View>
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
  button1: {
    backgroundColor: '#F1FFF9',
    width: '50%',
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonTitle1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0dbd71',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 30,
    textAlign: 'center',
  },
  rowstyle: {
    flexDirection: 'row',
    padding: 20,
    margine: 20,
    rowGap: 20,
  },
  boxstyle: {
    width: '78%',
    alignItems: 'center',
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 16,
    width: '100%',
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#0dbd71',
    width: '50%',
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
    color: '#FFCD61',
    marginLeft: 5,
    fontSize: 16,
  },
});

export default SignUpPage;
