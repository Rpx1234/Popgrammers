import React from 'react';
import { StyleSheet, Text, View, TextInput, img } from 'react-native';
import {UploadImage, Button, Logo} from '../components';
import {auth, Images} from '../config';


export const AccountInfoScreen = ({ navigation }) => {
  const [text, onChangeText] = React.useState(null);

  return (

   
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Account Information</Text>
      <Text style={styles.welcomeUser}>Hello User!</Text>
      <View style={styles.logoContainer}>
      <Logo uri={Images.logo} />
        </View>
      <View style={styles.container2}>
      <Text style={styles.emailName}>Your Email</Text>
      <Text style={styles.nickName}>Your Name</Text>

      <TextInput style={styles.TextInput} value={auth.currentUser.email} /> 
      </View>
      <Button style={styles.borderlessButtonContainer} borderless
          title={'Done with Account Information?'}
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
  logoContainer:{
    elevation:2,
    height:200,
    width:200,
    backgroundColor:'#efefef',
    position:'relative',
    borderRadius:999,
    overflow:'hidden',
    alignItems: 'center',

},
  screenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'orange',
    paddingTop: 10 ,
    paddingBottom: 50 
    
  },
  welcomeUser: {
    fontSize: 18,
    fontWeight: '200',
    color: 'orange',
    paddingTop: 40,
    paddingBottom: 50 
  },
  borderlessButtonContainer: {
    marginTop: 30, 
    alignItems: 'center',
    paddingTop: 100,
  },

  TextInput: {
    textAlign: 'center',
    margin: 20,
    height: 30,
    width: 150,
    borderWidth: 1,
    borderColor: 'orange',
    color: 'orange',
  },
  emailName: {
    color: 'orange',
    margin: 20,
    fontSize: 20,

  },
  nickName: {
    color: 'orange',
    margin: 20,
    fontSize: 20,
    },
  container2: {
    flexDirection: 'row',
      paddingHorizontal: 12,
    },
 

});