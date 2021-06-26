import React, { Component } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { View, Text } from 'react-native'
import{StyleSheet} from 'react-native'
import{TextInput} from 'react-native'
import{Button} from 'react-native'
import{Alert} from  'react-native'
import {register} from "./signin";
import {SigInComponent} from "./signin"
import auth from "@react-native-firebase/auth"
import {ImageBackground} from 'react-native'
import {useState} from "react";
import {menu} from "./Home"
import {Listfile} from "./audio";
import {fireconnect} from "./ImagePIcker";
import {admin} from "./admin"
import {adminmenu} from "./admin/admin_menu"
import {Docinfo} from './admin/docinfo'
import{docconnect} from "/New folder/AwesomeProject/Users/Contact"
import{quiz} from "/New folder/AwesomeProject/Qutioner.js/quiz"
import{CreateChatRoom} from "./admin/createChat"
import{ChatRoom} from "/New folder/AwesomeProject/admin/Chatroom"
import{Messages} from  "/New folder/AwesomeProject/admin/massage"
import { psychoeducation } from './Users/psycoeducation ';
import { addpsyco } from './admin/addpsyco';
import { initializeParse } from '@parse/react-native';

initializeParse(
  'YOUR_SERVER_URL',
  'YOUR_APPLICATION_ID',
  'YOUR_JAVASCRIPT_KEY'
);




const Stack = createStackNavigator();
const __isValidEmail = email => {
   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
 };

export function App() {
   return (
         <NavigationContainer> 
            <Stack.Navigator initialRouteName=" DetailsScreen">
            <Stack.Screen name=" DetailsScreen" component={ DetailsScreen} />
            <Stack.Screen name="register" component={register} />
            <Stack.Screen name="Home" component={menu} />
            <Stack.Screen name="fireconnect" component={fireconnect} />
            <Stack.Screen name="admin" component={admin}/>
            <Stack.Screen name="adminmenu" component={adminmenu}/>
            <Stack.Screen name="Docinfo" component={Docinfo}/>
            <Stack.Screen name="docconnect" component={docconnect}/>
            <Stack.Screen name="quiz" component={quiz}/>
            <Stack.Screen name="CreateChatRoom" component={CreateChatRoom}/>
            <Stack.Screen name="ChatRoom" component={ChatRoom}/>
            <Stack.Screen name="Messages" component={Messages}/>
            <Stack.Screen name="psychoeducation" component={psychoeducation}/>
            <Stack.Screen name="addpsyco" component={addpsyco}/>
           
  

            </Stack.Navigator>
         </NavigationContainer>
   )
}
function DetailsScreen({navigation}) {
   
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [fetching, setFetching] = useState(false);
      const [error, setError] = useState("");
      const [isValid, setValid] = useState(true);

      const __doLogin = () => {
        if (!email) {
          setError("Email required *");
          setValid(false);
          return;
        } else if (!password && password.trim() && password.length > 6) {
          setError("Weak password, minimum 5 chars");
          setValid(false);
          return;
        } else if (!__isValidEmail(email)) {
          setError("Invalid Email");
          setValid(false);
          return;
        }
        let signInRequestData = {
          email,
          password
        };
    
        __doSingIn(email, password);

      };
     
   
      const __doSingIn = async (email, password) => {
        try {
          let response = await auth().signInWithEmailAndPassword(email, password);
          if (response && response.user) {
            Alert.alert("Success ✅", "Logged successfully");
            navigation.navigate('Home')
          }
        } catch (e) {
          console.error(e.message);
        }
      };
    
   return (
      <View>
         <ImageBackground source={require('./image.jpg')} style={{width: '100%', height: '100%'}}>
      <View style = {styles.container}>
      <TextInput style = {styles.input}
         underlineColorAndroid = "transparent"
         label={"email"}
         placeholder = "Email"
         placeholderTextColor = "#9a73ef"
         autoCapitalize = "none"
         onChangeText={text => {
            // let isValid = this.state.isValid;
            // isValid["email"] = !this.__isValidEmail(text);
            setValid(__isValidEmail(text));
            setEmail(text);
          }}
          error={isValid}
        />
      <TextInput style = {styles.input}
         underlineColorAndroid = "transparent"
         label={"password"}
         placeholder = "Password"
         placeholderTextColor = "#9a73ef"
         autoCapitalize = "none"
         onChangeText={text => setPassword(text)}
        />
        <Button
    title="Sign In"
    onPress={__doLogin} 
  />
  <Button
  title="Register"
  onPress={() =>navigation.navigate('register')}
/>
<Button
  title="Admin"
  onPress={() =>navigation.navigate('admin')}
/> 
         </View>
   <View>
      <Text></Text>
   </View>
   </ImageBackground>
   </View>
   );
 }
export default App
const styles = StyleSheet.create({
  container: {
     paddingTop: 23
  },
  input: {
     margin: 15,
     height: 40,
     borderColor: '#7a42f4',
     borderWidth: 1
  },

})
