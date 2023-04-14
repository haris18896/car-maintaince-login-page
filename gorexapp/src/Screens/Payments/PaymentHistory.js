//import liraries

import React, { useState } from 'react';
import {
 View,
 StyleSheet,
 FlatList,
 Text,
 Image,
 TouchableOpacity,
} from 'react-native';
import { Card } from '../../assets';
import BackHeader from '../../Components/Header/BackHeader';
import {
 BLACK,
 BLACK_OPAC,
 BLUE,
 LIGHT_BLUE,
 OFF_WHITE,
 RED,
 WHITE,
} from '../../constants/colors';
import {
 SFProDisplayLight,
 SFProDisplayMedium,
 SFProDisplaySemiBold,
} from '../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../utils/responsiveSizes';

import TabBarPayment from './ components/TabBarPayment';

// create a component
const PaymentHistory = () => {
 const [active, setActive] = useState(1);

 return (
  <View style={styles.container}>
   <BackHeader title='Payment History' />
   <TabBarPayment active={active} setActive={setActive} />
   <View style={styles.paddedContent}>
    {active === 1 ? (
     <View style={styles.paymentContainer}>
      <Text style={styles.paymentTitle}>Balance</Text>
      <Text style={styles.price}>19500 SAR</Text>
     </View>
    ) : active === 2 ? (
     <FlatList
      data={[1]}
      renderItem={() => (
       <View>
        <Image style={styles.card} source={Card} />
       </View>
      )}
     />
    ) : (
     <FlatList
      data={[1, 2, 3, 4]}
      renderItem={() => (
       <View style={styles.transactionCard}>
        <View style={styles.leftView}>
         <Text style={styles.orderNumber}>Order # 3433455</Text>
         <Text style={styles.wallet}>Wallet</Text>
        </View>
        <View style={styles.rightView}>
         <Text style={styles.transaction}>- $20,17</Text>
         <Text style={styles.time}>09:37 AM</Text>
        </View>
       </View>
      )}
     />
    )}
    <TouchableOpacity style={styles.plusButton}>
     <Text style={styles.plusButtonText}>+</Text>
    </TouchableOpacity>
   </View>
  </View>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: WHITE,
 },
 paddedContent: {
  paddingHorizontal: wp(14),
  flex: 1,
  backgroundColor: OFF_WHITE,
 },
 paymentContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: hp(30),
 },
 paymentTitle: {
  textAlign: 'left',
  fontFamily: SFProDisplayMedium,
  fontSize: responsiveFontSize(22),
  color: BLACK_OPAC,
 },
 price: {
  textAlign: 'left',
  fontFamily: SFProDisplayLight,
  fontSize: responsiveFontSize(56),
  color: BLUE,
  marginTop: hp(15),
 },
 card: {
  height: hp(233),
  width: wp(348),
  // resizeMode: 'contain',
 },
 transactionCard: {
  minHeight: hp(55),
  backgroundColor: WHITE,
  width: '100%',
  borderRadius: wp(12),
  marginTop: 7,
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: hp(14),
 },
 orderNumber: {
  textAlign: 'left',
  fontFamily: SFProDisplaySemiBold,
  fontSize: responsiveFontSize(15),
  color: BLACK,
 },
 wallet: {
  textAlign: 'left',
  fontFamily: SFProDisplayMedium,
  fontSize: responsiveFontSize(11),
  color: BLACK_OPAC,
  marginTop: hp(11),
 },
 transaction: {
  textAlign: 'left',
  fontFamily: SFProDisplayMedium,
  fontSize: responsiveFontSize(16),
  color: RED,
 },
 time: {
  textAlign: 'left',
  fontFamily: SFProDisplayMedium,
  fontSize: responsiveFontSize(11),
  color: BLACK_OPAC,
  marginTop: hp(11),
 },
 rightView: {
  justifyContent: 'center',
  alignItems: 'center',
 },
 plusButton: {
  height: hp(40),
  width: hp(40),
  borderRadius: 7,
  backgroundColor: LIGHT_BLUE,
  position: 'absolute',
  bottom: hp(20),
  right: hp(20),
  justifyContent: 'center',
  alignItems: 'center',
 },
 plusButtonText: {
  color: WHITE,
  textAlign: 'left',
  fontFamily: SFProDisplayLight,
  fontSize: responsiveFontSize(35),
 },
});

//make this component available to the app
export default PaymentHistory;
