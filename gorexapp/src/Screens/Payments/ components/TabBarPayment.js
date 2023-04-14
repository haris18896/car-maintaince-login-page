//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BLACK, BLUE, BORDER_GRAY, WHITE } from '../../../constants/colors';
import { SFProDisplaySemiBold } from '../../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../../utils/responsiveSizes';

// create a component
const TabBarPayment = ({ active, setActive }) => {
 return (
  <View style={styles.container}>
   <TouchableOpacity
    onPress={() => setActive(1)}
    disabled={active == 1}
    style={active == 1 ? styles.leftActive : styles.leftButton}
   >
    <Text style={active == 1 ? styles.textActive : styles.text}>Wallet</Text>
   </TouchableOpacity>
   <TouchableOpacity
    onPress={() => setActive(2)}
    disabled={active == 2}
    style={active == 2 ? styles.centerButtonActive : styles.centerButton}
   >
    <Text style={active == 2 ? styles.textActive : styles.text}>Card</Text>
   </TouchableOpacity>
   <TouchableOpacity
    onPress={() => setActive(3)}
    disabled={active == 3}
    style={active == 3 ? styles.rightButtonActive : styles.rightButton}
   >
    <Text style={active == 3 ? styles.textActive : styles.text}>
     Transactions
    </Text>
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
  width: '33%',
  borderTopLeftRadius: wp(20),
  borderColor: BORDER_GRAY,
 },
 leftActive: {
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  width: '33%',
  borderTopLeftRadius: wp(20),
  backgroundColor: BLUE,
  borderColor: BORDER_GRAY,
 },
 rightButton: {
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  width: '33%',
  borderTopRightRadius: wp(20),
  borderColor: BORDER_GRAY,
 },
 rightButtonActive: {
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  width: '33%',
  borderTopRightRadius: wp(20),
  borderColor: BORDER_GRAY,
  backgroundColor: BLUE,
 },
 centerButton: {
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  width: '33%',

  borderColor: BORDER_GRAY,
 },
 centerButtonActive: {
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  width: '33%',

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
export default TabBarPayment;
