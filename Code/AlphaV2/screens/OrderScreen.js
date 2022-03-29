import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { View, TextInput, Button, FormErrorMessage } from '../components';
import { Images, Colors, auth } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { loginValidationSchema } from '../utils';
import { Picker } from '@react-native-picker/picker';


export const OrderScreen = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>New Order</Text>
      <Picker
      	selectedValue={selectedLanguage}
      	onValueChange= {(itemValue,itemIndex) =>
      		setSelectedLanguage(itemValue)}>
      	<Picker.item label = "Theater1 5pm" value= "Theater1"/>
      	<Picker.item label = "Theater2 5pm" value= "Theater2"/>
      </Picker>
      {/* Buttons */}
          <Button style={styles.borderlessButtonContainer} borderless
          title={'Cancel Order'}
          onPress = {() => navigation.navigate('CustomerHomeScreen')} />
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