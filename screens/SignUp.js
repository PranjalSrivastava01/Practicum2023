import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {tokens} from 'react-native-paper/lib/typescript/src/styles/themes/v3/tokens';
import auth from '@react-native-firebase/auth';

const SignUpPage = ({navigation}) => {
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const createUser=()=>{
    auth()
  .createUserWithEmailAndPassword(name, phoneNo)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
  }
  const handleSignUp = () => {
    if (!name) {
      ToastAndroid.show('Please Enter your email', ToastAndroid.BOTTOM);
    } else if (!phoneNo) {
      ToastAndroid.show('Please Enter Password', ToastAndroid.BOTTOM);
    } else {
      createUser();
      navigation.navigate('OtpScreen', {user: {name, phoneNo}});
    }
    // Write your sign-up logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonTitle}>Sign up</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LoginPage');
          }}>
          <Text style={styles.footerLink}>Log in</Text>
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

export default SignUpPage;
