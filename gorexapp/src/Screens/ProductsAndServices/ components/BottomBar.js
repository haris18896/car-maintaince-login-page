//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FullButton from '../../../Components/Buttons/FullButton';
import { ALICE_BLUE, BLACK, BLUE } from '../../../constants/colors';
import { SFProDisplaySemiBold } from '../../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../../utils/responsiveSizes';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

// create a component
const BottomBar = ({
 showButton,
 btnTitle,
 onPress,
 updateCart,
 total,
 cancelBtnTitle,
 onCancelPress,
 vat,
}) => {
 const { t } = useTranslation();
 return (
  <View style={styles.container}>
   <View style={styles.content}>
    <Text style={styles.total}>{t('bottom.Grand Total')}</Text>
    <Text style={styles.price}>
     {total} {t('common.SAR')}
    </Text>
   </View>
   <View style={styles.content}>
    <Text style={styles.totalVat}>{t('bottom.Vat Amount')}</Text>
    <Text style={styles.vatPrice}>
     {vat || (total * 8) / 100} {t('common.SAR')}
    </Text>
   </View>
   {showButton && (
    <View style={styles.buttonContainer}>
     <FullButton
      onPress={onPress ? () => onPress(total) : () => {}}
      title={btnTitle}
     />
     {/* <View style={styles.cancelContainer}>
      <FullButton
       onPress={onCancelPress}
       title={cancelBtnTitle}
       type='cancel'
      />
     </View> */}
    </View>
   )}
  </View>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {
  backgroundColor: ALICE_BLUE,
  minHeight: hp(50),
  borderTopLeftRadius: wp(20),
  borderTopRightRadius: wp(20),
  paddingVertical: wp(20),
  paddingHorizontal: wp(27),
 },
 content: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
 },
 total: {
  textAlign: 'left',
  fontFamily: SFProDisplaySemiBold,
  fontSize: responsiveFontSize(14),
  color: BLACK,
 },
 totalVat: {
  textAlign: 'left',
  fontFamily: SFProDisplaySemiBold,
  fontSize: responsiveFontSize(12),
  color: BLACK,
 },
 price: {
  textAlign: 'left',
  fontFamily: SFProDisplaySemiBold,
  fontSize: responsiveFontSize(24),
  color: BLUE,
 },
 vatPrice: {
  textAlign: 'left',
  fontFamily: SFProDisplaySemiBold,
  fontSize: responsiveFontSize(14),
  color: BLUE,
 },
 buttonContainer: {
  marginTop: wp(10),
 },
 cancelContainer: {
  marginTop: wp(10),
 },
});

//make this component available to the app
export default BottomBar;
