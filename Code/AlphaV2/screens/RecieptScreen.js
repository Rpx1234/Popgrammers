import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { View, TextInput, Logo, Button, FormErrorMessage } from '../components';
import { Images, Colors, auth } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { loginValidationSchema } from '../utils';
import { LogBox } from 'react-native';



export const RecieptScreen = ({ navigation }) => {
  
LogBox.ignoreLogs(['Setting a timer']);
  
  return (

   
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Reciepts</Text>
      {/* Buttons */}
          
          {/* in progress */}
            <Button style={styles.button} onPress = {() => navigation.navigate('ProgressRecieptScreen')}>
            <Text style={styles.buttonText}>View in Progress</Text>
            </Button>
    {/* finished */}
          <Button style={styles.button} onPress = {() => navigation.navigate('FinishedRecieptScreen')}>
          <Text style={styles.buttonText}>View finished</Text>
          </Button>
          
          <Button style={styles.borderlessButtonContainer} borderless
          title={'Done with Reciepts'}
          onPress = {() => navigation.navigate('TheaterHomeScreen')} />
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
    fontSize: 30,
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