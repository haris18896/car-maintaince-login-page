//import liraries
import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import './src/i18n';
import store from './src/store';
import { BLUE } from './src/constants/colors';
import Navigation from './src/navigations';

// create a component
const App = () => {
 useEffect(() => {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
 }, []);
 return (
  <Provider store={store}>
   <SafeAreaView style={styles.uperSafeArea} />
   <SafeAreaView style={styles.container}>
    <StatusBar hidden />
    <Navigation />
    <Toast />
   </SafeAreaView>
  </Provider>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {
  // backgroundColor: BLUE,
  flex: 1,
 },

 uperSafeArea: {
  backgroundColor: BLUE,
  flex: 0,
 },
});

//make this component available to the app
export default App;
