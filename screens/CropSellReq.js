import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';

const CropSellReq = ({navigation}) => {
  const [cropname, setCropName] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');

  const addCrop = async () => {
    try {
      const user = await firebase.auth().currentUser;
      // const data = await firestore().collection('UserCrops').doc(user.uid).get();
      // if(!data._data) {
      //   await firestore().collection('UserCrops').doc(user.uid).set({crops: []});
      // }

      await firestore().collection('User1').doc(user.uid)
      .update({crops: firestore.FieldValue.arrayUnion({cropname: cropname, weight: weight, price: price})})
      .then(()=> {console.log('data added')});

      console.log(user.uid);

      navigation.goBack();
    }
    catch(err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Crop for Selling!</Text>
      <TextInput
        style={styles.input} 
        placeholder="Crop Name"
        placeholderTextColor="#AAAAAA"
        onChangeText={text => setCropName(text)}
        value={cropname}
        autoCapitalize="words"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight of the Crop (QT)"
        placeholderTextColor="#AAAAAA"
        onChangeText={text => setWeight(text)}
        value={weight}
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Price per kg"
        placeholderTextColor="#AAAAAA"
        onChangeText={text => setPrice(text)}
        value={price}
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button} onPress={addCrop}>
        <Text style={styles.buttonTitle}>Submit</Text>
      </TouchableOpacity>
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
    color: '#ff932b',
    marginLeft: 5,
    fontSize: 16,
  },
});

export default CropSellReq;
