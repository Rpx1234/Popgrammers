import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {UploadImage} from '../components';

export const AccountInfoScreen = ({ navigation }) => {
  return (

   
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Account Information</Text>
      <UploadImage/>
      {/* Buttons */}
          <Button style={styles.borderlessButtonContainer} 
          title={'Done with Account Information'}
          onPress = {() => navigation.navigate('CustomerHomeScreen')} />
    </View>
  );
}

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
    color: 'orange',
    paddingTop: 10 ,
    paddingBottom: 100 
  },
  welcomeUser: {
    fontSize: 18,
    fontWeight: '200',
    color: 'orange',
    paddingTop: 40
  },
  borderlessButtonContainer: {
    marginTop: 30, 
    alignItems: 'center',
    paddingTop: 30,
  }
});