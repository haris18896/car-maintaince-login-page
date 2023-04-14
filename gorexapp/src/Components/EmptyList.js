import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import { Empty } from '../assets';
import { BLACK } from '../constants/colors';
import { SFProDisplayMedium } from '../constants/fonts';
import { hp, responsiveFontSize, wp } from '../utils/responsiveSizes';

function EmptyList() {
 return (
  <View style={styles.container}>
   <Image transitionDuration={1000} source={Empty} style={styles.item} />
   <Text style={styles.text}>Nothing to show yet</Text>
  </View>
 );
}
const styles = StyleSheet.create({
 container: {
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
 },
 item: {
  height: hp(160),
  resizeMode: 'contain',
  width: wp(105),
 },
 text: {
  color: BLACK,
  textAlign: 'left',
  fontFamily: SFProDisplayMedium,
  fontSize: responsiveFontSize(22),
  marginTop: hp(10),
 },
});
export default EmptyList;
