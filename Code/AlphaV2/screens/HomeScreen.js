import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { signOut } from 'firebase/auth';
import {Colors, auth } from '../config';


export const HomeScreen = () => {
  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  return (

   
    <View style={styles.container}>
      <Text style={styles.screenTitle}>PopGrammers</Text>
      <Text style={styles.bodyText}>You have been successfully logged in, More to come...</Text>
      <Button title='Sign Out' onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    paddingTop: 20
  },
  bodyText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
    paddingTop: 20
  }
});
