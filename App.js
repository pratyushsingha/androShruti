import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Chatbot from './src/screens/Chatbot';
import Welcome from './src/screens/Welcome';


function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{
          headerShown: false,
        }} />
        <Stack.Screen name='Welcome' component={Welcome} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Chatbot" component={Chatbot} options={{
          headerShown: false,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;