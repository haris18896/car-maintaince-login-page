//import liraries
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { GREEN } from '../../constants/colors';
import { SFProDisplaySemiBold } from '../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../utils/responsiveSizes';

// create a component
const MediumButton = ({ title, onPress }) => {
 return (
  <TouchableOpacity onPress={onPress} style={styles.container}>
   <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {
  alignItems: 'center',
  backgroundColor: GREEN,
  borderRadius: hp(100),
  height: hp(56),
  justifyContent: 'center',
  width: wp(231),
  alignSelf: 'center',
 },
 title: {
  textTransform: 'uppercase',
  textAlign: 'left',
  fontFamily: SFProDisplaySemiBold,
  fontSize: responsiveFontSize(20),
 },
});

//make this component available to the app
export default MediumButton;
