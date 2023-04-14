//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BLUE, BOX_BORDER, BOX_GRAY, WHITE } from '../constants/colors';
import { SFProDisplaySemiBold } from '../constants/fonts';
import { hp, responsiveFontSize, wp } from '../utils/responsiveSizes';

// create a component
const BoxLayout = ({ children, title, hideHeader }) => {
 return (
  <View style={styles.container}>
   {!hideHeader && (
    <View style={styles.header}>
     <Text style={styles.title}>{title}</Text>
    </View>
   )}
   <View style={styles.paddedContent}>{children}</View>
  </View>
 );
};

// define your styles
const styles = StyleSheet.create({
 header: {
  backgroundColor: BLUE,
  height: hp(40),
  borderRadius: 6,
  alignItems: 'center',
  justifyContent: 'center',
 },
 container: {
  backgroundColor: BOX_GRAY,
  // minHeight: hp(214),
  marginTop: 8,
  borderWidth: 1,
  borderColor: BOX_BORDER,
  borderRadius: 6,
 },
 title: {
  color: WHITE,
  fontSize: responsiveFontSize(16),
  textAlign: 'left',
  fontFamily: SFProDisplaySemiBold,
 },
 paddedContent: {
  padding: wp(20),
 },
});

//make this component available to the app
export default BoxLayout;
