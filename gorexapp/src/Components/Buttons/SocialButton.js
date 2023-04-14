//import liraries
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Google } from '../../assets';

import { GREEN, WHITE } from '../../constants/colors';
import { PoppinsRegular } from '../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../utils/responsiveSizes';

// create a component
const SocialButton = ({ title, icon, onPress, containerStyle, titleStyle }) => {
 return (
  <TouchableOpacity
   onPress={onPress}
   style={[styles.container, containerStyle]}
  >
   <Image style={styles.icon} source={icon ? icon : Google} />
   <Text style={[styles.title, titleStyle]}>{title}</Text>
  </TouchableOpacity>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {
  alignItems: 'center',
  backgroundColor: GREEN,
  borderRadius: hp(100),
  height: hp(44),

  justifyContent: 'center',
  width: wp(330),
  alignSelf: 'center',
  marginBottom: hp(9),
  borderWidth: 1,
  flexDirection: 'row',
 },
 title: {
  textAlign: 'left',
  fontFamily: PoppinsRegular,
  fontSize: responsiveFontSize(15),
  color: WHITE,
 },
 icon: {
  position: 'absolute',
  left: wp(20),
 },
});

//make this component available to the app
export default SocialButton;
