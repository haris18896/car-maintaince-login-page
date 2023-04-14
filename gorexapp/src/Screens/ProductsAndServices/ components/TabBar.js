//import liraries
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BLACK, BLUE, BORDER_GRAY, WHITE } from '../../../constants/colors';
import { SFProDisplaySemiBold } from '../../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../../utils/responsiveSizes';

// create a component
const TabBar = ({ active, branch }) => {
 const navigation = useNavigation();
 return (
  <View style={styles.container}>
   <TouchableOpacity
    onPress={() => navigation.navigate('ProductsListing', { branch })}
    disabled={active == 1}
    style={active == 1 ? styles.leftActive : styles.leftButton}
   >
    <Text style={active == 1 ? styles.textActive : styles.text}>Products</Text>
   </TouchableOpacity>
   <TouchableOpacity
    onPress={() => navigation.navigate('ServicesListing', { branch })}
    disabled={active == 2}
    style={active == 2 ? styles.rightButtonActive : styles.rightButton}
   >
    <Text style={active == 2 ? styles.textActive : styles.text}>Services</Text>
   </TouchableOpacity>
  </View>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {
  height: hp(33),
  flexDirection: 'row',
  marginTop: 7,
 },
 leftButton: {
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  width: '50%',
  borderTopLeftRadius: wp(20),
  borderColor: BORDER_GRAY,
 },
 leftActive: {
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  width: '50%',
  borderTopLeftRadius: wp(20),
  backgroundColor: BLUE,
  borderColor: BORDER_GRAY,
 },
 rightButton: {
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  width: '50%',
  borderTopRightRadius: wp(20),
  borderColor: BORDER_GRAY,
 },
 rightButtonActive: {
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  width: '50%',
  borderTopRightRadius: wp(20),
  borderColor: BORDER_GRAY,
  backgroundColor: BLUE,
 },
 text: {
  textAlign: 'left',
  fontFamily: SFProDisplaySemiBold,
  fontSize: responsiveFontSize(12),
  color: BLACK,
 },
 textActive: {
  textAlign: 'left',
  fontFamily: SFProDisplaySemiBold,
  fontSize: responsiveFontSize(12),
  color: WHITE,
 },
});

//make this component available to the app
export default TabBar;
