import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/main';
import AddSong from './src/components/AddSong';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add" component={AddSong} options={{ title: 'Add Audio' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack