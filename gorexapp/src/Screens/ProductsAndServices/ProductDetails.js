//import liraries

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cart, Wheel } from '../../assets';
import MediumButton from '../../Components/Buttons/MediumButton';
import BackHeader from '../../Components/Header/BackHeader';
import { BLACK, DARK_GREY, GREEN, WHITE } from '../../constants/colors';
import {
 PoppinsMedium,
 SFProDisplayBold,
 SFProDisplayRegular,
} from '../../constants/fonts';
import { responsiveFontSize, wp } from '../../utils/responsiveSizes';
import BottomBar from './ components/BottomBar';
import TabBar from './ components/TabBar';
import { getData } from '../../utils/common';

// create a component
const ProductDetails = ({ route }) => {
 const navigation = useNavigation();
 const [count, setCount] = useState(1);
 const [updateCart, setUpdateCart] = useState(false);
 const product = route?.params?.product;
 const branch = route?.params?.branch;
 const title = route?.params?.title;

 const decreaseCount = () => {
  if (count > 1) {
   setCount((c) => c - 1);
  }
 };
 const increaseCount = () => {
  setCount((c) => c + 1);
 };

 const addToCart = async () => {
  const data = (await getData()) || [];
  const item = {
   ...product,
   quantity: count,
  };
  data.push(item);

  const jsonValue = JSON.stringify(data);
  await AsyncStorage.setItem('cart', jsonValue);
  setUpdateCart(!updateCart);
 };

 return (
  <View style={styles.container}>
   <BackHeader rightIcon={Cart} title={title} />
   <TabBar active={1} branch={branch} />
   <View style={styles.paddedContent}>
    <View style={styles.imageContainer}>
     <Image style={styles.image} source={Wheel} />
    </View>
    <View style={styles.namePriceContainer}>
     <Text style={styles.name}>{product?.name}</Text>
     <Text style={styles.price}>{product?.price} SAR</Text>
    </View>
    <View style={styles.descriptionContainer}>
     <Text style={styles.description}>{product?.description}</Text>
    </View>
    <View style={styles.incrementContainer}>
     <TouchableOpacity onPress={decreaseCount} style={styles.roundButton}>
      <Text style={styles.roundBtnText}>-</Text>
     </TouchableOpacity>
     <Text style={styles.count}>{count}</Text>
     <TouchableOpacity onPress={increaseCount} style={styles.roundButton}>
      <Text style={styles.roundBtnText}>+</Text>
     </TouchableOpacity>
    </View>
    <MediumButton onPress={addToCart} title={'Add To Order'} />
   </View>
   <BottomBar
    showButton
    updateCart={updateCart}
    btnTitle={'View Order'}
    onPress={() =>
     navigation.navigate('PaymentMethod', { title: title, branch })
    }
   />
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
 },
 imageContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: wp(20),
 },
 image: {
  width: wp(101),
  height: wp(101),
 },
 namePriceContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: wp(20),
  marginTop: wp(11),
 },
 name: {
  fontSize: responsiveFontSize(16),
  textAlign: 'left',
  fontFamily: PoppinsMedium,
  color: BLACK,
 },
 price: {
  fontSize: responsiveFontSize(18),
  textAlign: 'left',
  fontFamily: PoppinsMedium,
  color: GREEN,
 },
 descriptionContainer: {
  paddingHorizontal: wp(20),
  marginTop: 5,
 },
 description: {
  fontSize: responsiveFontSize(13),
  textAlign: 'left',
  fontFamily: PoppinsMedium,
  color: DARK_GREY,
 },
 incrementContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: wp(35),
  marginBottom: wp(35),
 },
 roundButton: {
  width: wp(30),
  height: wp(30),
  backgroundColor: GREEN,
  borderRadius: wp(15),
  justifyContent: 'center',
  alignItems: 'center',
 },
 roundBtnText: {
  color: WHITE,
  fontSize: responsiveFontSize(25),
  textAlign: 'left',
  fontFamily: SFProDisplayBold,
  lineHeight: 32,
 },
 count: {
  fontSize: responsiveFontSize(35),
  textAlign: 'left',
  fontFamily: SFProDisplayRegular,
  marginHorizontal: wp(30),
 },
});

//make this component available to the app
export default ProductDetails;
