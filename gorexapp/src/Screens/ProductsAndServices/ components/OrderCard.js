//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
 BLACK,
 BLACK_OPAC,
 BLUE,
 BOX_BORDER,
 BOX_GRAY,
 OLIVE,
 WHITE,
} from '../../../constants/colors';
import {
 SFProDisplayBold,
 SFProDisplaySemiBold,
} from '../../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../../utils/responsiveSizes';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

// create a component
const OrderCard = ({ order }) => {
 const navigation = useNavigation();
 const { t } = useTranslation();
 return (
  <TouchableOpacity
   onPress={() => {
    navigation.navigate('OrderDetails', { order: order?._id, history: true });
   }}
   style={styles.container}
  >
   <View style={styles.header}>
    <Text style={styles.title}>{t('order_history.Order #')}</Text>
    <Text style={styles.title}>{order?.order_id}</Text>
   </View>
   <View style={styles.paddedContent}>
    <View style={styles.row}>
     <Text style={styles.heading}>{t('order_history.Service Provider')}</Text>
     <Text style={styles.value}>{order?.service_provider?.profile?.name}</Text>
    </View>
    <View style={styles.row}>
     <Text style={styles.heading}>{t('order_history.Order Status')}</Text>
     <Text
      style={[
       styles.status,
       {
        // color: active == 1 ? GREEN : active == 2 ? OLIVE : RED,
        color: OLIVE,
       },
      ]}
     >
      {order?.status}
     </Text>
    </View>
    <View style={styles.row}>
     <Text style={styles.heading}>{t('order_history.Payment Method')}</Text>
     <Text style={styles.value}>{order?.payment_method}</Text>
    </View>
    {/* <View style={styles.row}>
          <Text style={styles.heading}>Services</Text>
          <Text style={styles.value}>Engine Oil</Text>
        </View> */}
    <View style={styles.row}>
     <Text style={styles.heading}>{t('order_history.Amount')}</Text>
     <Text style={styles.value}>
      {order?.total_price} {t('common.SAR')}
     </Text>
    </View>
    <View style={styles.row}>
     <Text style={styles.heading}>{t('order_history.VAT')}</Text>
     <Text style={styles.value}>
      {order?.vat} {t('common.SAR')}
     </Text>
    </View>
    <View style={styles.row}>
     <Text style={styles.heading}>{t('order_history.Total Amount')}</Text>
     <Text style={styles.value}>
      {order?.net_total} {t('common.SAR')}
     </Text>
    </View>
    <Text style={styles.date}>
     {moment(order?.created_at).format('D/MM/YYYY hh:mm A')}
    </Text>
   </View>
  </TouchableOpacity>
 );
};

// define your styles
const styles = StyleSheet.create({
 header: {
  backgroundColor: BLUE,
  height: hp(40),
  borderRadius: 6,
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  paddingHorizontal: 14,
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
  textAlign: 'left',
 },
 paddedContent: {
  padding: wp(20),
 },
 heading: {
  textAlign: 'left',
  fontFamily: SFProDisplayBold,
  textAlign: 'left',
  fontSize: responsiveFontSize(16),
  color: BLACK,
 },
 value: {
  textAlign: 'left',
  fontFamily: SFProDisplayBold,
  textAlign: 'left',
  fontSize: responsiveFontSize(16),
  color: BLACK_OPAC,
 },
 status: {
  textAlign: 'left',
  fontFamily: SFProDisplayBold,
  textAlign: 'left',
  fontSize: responsiveFontSize(16),
  color: BLACK,
 },
 date: {
  textAlign: 'left',
  fontFamily: SFProDisplayBold,
  textAlign: 'left',
  fontSize: responsiveFontSize(14),
  color: BLACK_OPAC,
  textAlign: 'center',
 },
 row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: hp(12),
 },
});

//make this component available to the app
export default OrderCard;
