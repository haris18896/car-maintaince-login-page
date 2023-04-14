//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { checkBox, checkBoxChecked } from '../../assets';
import { BLACK, GREEN } from '../../constants/colors';
import {
 SFProDisplayMedium,
 SFProDisplaySemiBold,
} from '../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../utils/responsiveSizes';

// create a component
const CheckBox = ({
 title,
 hideRight,
 serviceChecked,
 item,
 _checked,
 disabled,
}) => {
 const [checked, setChecked] = useState(_checked);

 useEffect(() => {
  setChecked(_checked);
 }, [_checked]);
 return (
  <TouchableOpacity
   disabled={disabled}
   onPress={() => {
    if (serviceChecked) serviceChecked(!checked, item);
    setChecked(!checked);
   }}
   style={styles.checkBoxContainer}
  >
   <View style={styles.leftView}>
    <Image source={checked ? checkBoxChecked : checkBox} />
    <Text style={styles.titleText}>{title ? title : item?.name}</Text>
   </View>
   {!hideRight && <Text style={styles.price}>{item?.price}</Text>}
  </TouchableOpacity>
 );
};

// define your styles
const styles = StyleSheet.create({
 checkBoxContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: hp(21),
 },
 leftView: {
  flexDirection: 'row',
  alignItems: 'center',
 },
 titleText: {
  marginLeft: wp(12),
  fontSize: responsiveFontSize(14),
  textAlign: 'left',
  fontFamily: SFProDisplaySemiBold,
  color: BLACK,
 },
 price: {
  marginLeft: wp(12),
  fontSize: responsiveFontSize(14),
  textAlign: 'left',
  fontFamily: SFProDisplayMedium,
  color: GREEN,
 },
});

//make this component available to the app
export default CheckBox;
