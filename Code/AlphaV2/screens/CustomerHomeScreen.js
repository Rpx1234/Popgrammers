import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signOut } from 'firebase/auth';
import { View, TextInput, Logo, Button, FormErrorMessage } from '../components';
import { Images, Colors, auth } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { loginValidationSchema } from '../utils';
import { getDatabase, ref, set, update, child, get } from "firebase/database";



export const CustomerHomeScreen = ({ navigation }) => {
  
  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Customer Home Screen</Text>
      {/* New Order */}
          <Button style={styles.button} onPress = {() => navigation.navigate('OrderScreen')}>
          <Text style={styles.buttonText}>New Order</Text>
          </Button>
	  {/* Order History */}
          <Button style={styles.button} onPress = {() => navigation.navigate('OrderHistoryScreen')}>
          <Text style={styles.buttonText}>Order History</Text>
          </Button>
      {/* Account Information */}
          <Button style={styles.button} onPress = {() => navigation.navigate('AccountInfoScreen')}>
          <Text style={styles.buttonText}>Account Information</Text>
          </Button>
          <Button style={styles.borderlessButtonContainer} borderless
          title={'Log Out?'}
          onPress={handleLogout} />
    </View>
  );
};


          
const styles = StyleSheet.create({
  container: {
	flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 12,
    alignItems: 'center'
  },
  logoContainer: {
    alignItems: 'center'
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.orange,
    paddingTop: 10
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',

  },
  borderlessButtonContainer: {
    marginTop: 16, 
    alignItems: 'center',
  }
  });