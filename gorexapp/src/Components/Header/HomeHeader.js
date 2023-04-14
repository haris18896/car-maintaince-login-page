//import liraries
import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Logo, Menu } from '../../assets';
import { BLUE, PLACEHOLDER_BLUE } from '../../constants/colors';
// import SideMenu from '../../Screens/Dashboard/components/SideMenu';
import { hp, wp } from '../../utils/responsiveSizes';

// create a component
const HomeHeader = ({ onPress, hideMenu }) => {
 return (
  <View style={styles.container}>
   {!hideMenu && (
    <TouchableOpacity onPress={onPress} style={styles.menuButton}>
     <Image style={styles.menu} source={Menu} />
    </TouchableOpacity>
   )}
   <Image style={styles.logo} source={Logo} />
   <View style={styles.placeholder} />
  </View>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: BLUE,
  borderBottomLeftRadius: hp(20),
  borderBottomRightRadius: hp(20),
  height: hp(90),
  flexDirection: 'row',
  paddingHorizontal: 9,
 },
 logo: {
  width: 100,
  resizeMode: 'contain',
  height: hp(25),
 },
 menuButton: {
  height: wp(40),
  width: wp(40),
  backgroundColor: PLACEHOLDER_BLUE,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: wp(20),
 },
 placeholder: {
  width: wp(40),
 },
});

//make this component available to the app
export default HomeHeader;
