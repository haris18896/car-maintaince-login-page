//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BLACK, BLUE, GREY, WHITE } from '../../../constants/colors';
import { PoppinsRegular, PoppinsSemiBold } from '../../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../../utils/responsiveSizes';

// create a component
const PagerIndicator = ({ page }) => {
 return (
  <View>
   <View style={styles.container}>
    <View style={styles.leftContainer}>
     <View style={styles.countContainerOn}>
      <Text style={styles.number}>1</Text>
     </View>
     <Text style={styles.title}>Customer Details</Text>
    </View>

    <View style={styles.placeholderLine}>
     <View style={page == 1 ? styles.fillLineHalf : styles.fillLine} />
    </View>
    <View style={styles.leftContainer}>
     <View style={page == 1 ? styles.countContainer : styles.countContainerOn}>
      <Text style={styles.number}>2</Text>
     </View>
     <Text style={styles.title}>Vhicle Details</Text>
    </View>
   </View>
  </View>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  marginTop: hp(13),
  width: wp(300),
  alignSelf: 'center',
 },
 countContainer: {
  height: hp(23),
  width: hp(23),
  borderRadius: hp(16),
  backgroundColor: GREY,
  justifyContent: 'center',
  alignItems: 'center',
 },
 leftContainer: {
  justifyContent: 'center',
  alignItems: 'center',
 },

 title: {
  textAlign: 'left',
  fontFamily: PoppinsRegular,
  fontSize: responsiveFontSize(12),
  color: BLACK,
  marginTop: hp(5),
 },
 countContainerOn: {
  height: wp(23),
  width: wp(23),
  borderRadius: hp(16),
  backgroundColor: BLUE,
  justifyContent: 'center',
  alignItems: 'center',
 },
 placeholderLine: {
  height: 1.58,
  width: '60%',
  backgroundColor: GREY,
  position: 'absolute',
  top: 10,
  left: 60,
 },
 fillLineHalf: {
  height: 1.58,
  width: '50%',
  backgroundColor: BLUE,
 },
 fillLine: {
  height: 1.58,
  width: '100%',
  backgroundColor: BLUE,
 },
 number: {
  color: WHITE,
  textAlign: 'left',
  fontFamily: PoppinsSemiBold,
  fontSize: responsiveFontSize(16),
 },
});

//make this component available to the app
export default PagerIndicator;
