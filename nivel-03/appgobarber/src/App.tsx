import 'react-native-gesture-handler';

import React from 'react';
import { Text, View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import AuthRoutes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38"/>
    <View style={{backgroundColor: '#312e38', flex: 1}}>

      <AuthRoutes/>

    </View>

    </NavigationContainer>
);

export default App;
