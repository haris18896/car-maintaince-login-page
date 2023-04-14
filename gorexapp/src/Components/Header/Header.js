//import liraries
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Logo } from '../../assets';
import { BLUE, WHITE } from '../../constants/colors';
import { PoppinsSemiBold } from '../../constants/fonts';
import { hp, responsiveFontSize } from '../../utils/responsiveSizes';

// create a component
const Header = ({ title }) => {
 return (
  <View style={styles.container}>
   <Image style={styles.logo} source={Logo} />
   <Text style={styles.title}>{title}</Text>
  </View>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: BLUE,
  paddingVertical: hp(30),
  borderBottomLeftRadius: hp(20),
  borderBottomRightRadius: hp(20),
 },
 logo: {
  width: 100,
  resizeMode: 'contain',
  height: hp(25),
  marginBottom: hp(20),
 },
 title: {
  fontSize: responsiveFontSize(26),
  color: WHITE,
  textAlign: 'left',
  fontFamily: PoppinsSemiBold,
 },
});

//make this component available to the app
export default Header;
