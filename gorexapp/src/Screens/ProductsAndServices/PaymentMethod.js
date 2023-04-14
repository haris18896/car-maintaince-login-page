//import liraries
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
 View,
 StyleSheet,
 Image,
 Text,
 ScrollView,
 TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FlatList } from 'react-native-gesture-handler';
import { Basket, Cart } from '../../assets';
import BoxLayout from '../../Components/BoxLayout';
import BackHeader from '../../Components/Header/BackHeader';
import CheckBox from '../../Components/Inputs/CheckBox';
import { BLACK, GREEN, WHITE } from '../../constants/colors';
import { SFProDisplayBold, SFProDisplayRegular } from '../../constants/fonts';
import {
 getData,
 getServicesData,
 getUser,
 showToast,
} from '../../utils/common';
import { hp, responsiveFontSize, wp } from '../../utils/responsiveSizes';
import BottomBar from './ components/BottomBar';
import { useDispatch } from 'react-redux';
import { createOrder, getVehicle } from '../../store/actions/order';

// create a component
const PaymentMethod = ({ route }) => {
 const navigation = useNavigation();
 const focus = useIsFocused();
 const dispatch = useDispatch();
 const [cart, setCart] = useState([]);
 const [user, setUser] = useState([]);
 const [services, setServices] = useState([]);
 const [vehicle, setVehicle] = useState([]);
 const [updateCart, setUpdateCart] = useState(false);
 const [loading, setLoading] = useState(false);
 const [paymentMethod, setPaymentMethod] = useState('cash');

 const title = route?.params?.title;
 const branch = route?.params?.branch;

 const getCart = async () => {
  const data = (await getData()) || [];
  setCart(data);
 };
 const getServices = async () => {
  const data = (await getServicesData()) || [];
  setServices(data);
 };

 useEffect(() => {
  getCart();
  getServices();
 }, [updateCart]);

 useEffect(() => {
  getUser().then((_user) => {
   if (_user) {
    setUser(_user);
    dispatch(getVehicle(_user?.id)).then((v) => {
     setVehicle(v?.payload);
    });
   }
  });
 }, [focus]);

 const deleteItem = async (id) => {
  const data = await getData('cart');
  const index = data?.findIndex((product) => product?._id === id);
  data.splice(index, 1);
  const jsonValue = JSON.stringify(data);
  await AsyncStorage.setItem('cart', jsonValue);
  setUpdateCart(!updateCart);
 };
 const deleteService = async (id) => {
  const data = services;
  const index = data?.findIndex((s) => s?._id === id);
  data.splice(index, 1);
  const jsonValue = JSON.stringify(data);
  await AsyncStorage.setItem('services', jsonValue);
  setUpdateCart(!updateCart);
 };

 return (
  <View style={styles.container}>
   <BackHeader rightIcon={Cart} title={title} />
   <ScrollView style={styles.paddedContent}>
    <BoxLayout title={'Order Details'}>
     <Text style={styles.heading}>Parts</Text>
     <FlatList
      data={cart}
      renderItem={({ item }) => (
       <View style={styles.rowContainer}>
        <Text style={styles.title}>
         {item?.name} X {item?.quantity}
        </Text>
        <View style={styles.rightView}>
         <Text style={styles.price}>{item?.quantity * item?.price} SAR</Text>
         <TouchableOpacity onPress={() => deleteItem(item?._id)}>
          <Image source={Basket} />
         </TouchableOpacity>
        </View>
       </View>
      )}
     />
     <Text style={styles.heading}>Services</Text>
     <FlatList
      data={services}
      renderItem={({ item }) => (
       <View style={styles.rowContainer}>
        <Text style={styles.title}>{item?.name}</Text>
        <View style={styles.rightView}>
         <Text style={styles.price}>{item?.quantity * item?.price} SAR</Text>
         <TouchableOpacity onPress={() => deleteService(item?._id)}>
          <Image source={Basket} />
         </TouchableOpacity>
        </View>
       </View>
      )}
     />
    </BoxLayout>
    <BoxLayout title={'Payment method'}>
     <CheckBox
      onCheck={() => setPaymentMethod('cash')}
      _checked={paymentMethod === 'cash' ? true : false}
      title='Cash'
      hideRight
     />
     {/* <CheckBox
            onCheck={() => setPaymentMethod('card')}
            _checked={paymentMethod === 'card' ? true : false}
            title="Card"
            hideRight
            disabled
          />
          <CheckBox
            onCheck={() => setPaymentMethod('wallet')}
            _checked={paymentMethod === 'wallet'}
            title="Wallet"
            hideRight
            disabled
          /> */}
    </BoxLayout>
   </ScrollView>
   <BottomBar
    onPress={(price) => {
     if (vehicle?.length) {
      let _services = services?.map((s) => {
       return {
        service: s?._id,
        quantity: 1,
        unit_price: s?.price,
        total_price: s?.price,
       };
      });
      let _prods = cart?.map((p) => {
       return {
        item: p?._id,
        quantity: p?.quantity,
        unit_price: p?.price,
        total_price: Number(p?.price) * Number(p?.quantity),
       };
      });
      setLoading(true);
      const data = {
       branch: branch?._id,
       service_provider: branch?.service_provider,
       vehicle: vehicle[0]?._id,
       customer: user?.id,
       services: _services,
       items: _prods,
       payment_method: 'cash',
       total_price: `${price}`,
      };
      dispatch(createOrder(data)).then(async (res) => {
       setLoading(false);
       if (!res?.payload?.error) {
        navigation.navigate('OrderDetails', {
         order: res?.payload,
        });
        await AsyncStorage.removeItem('services');
        await AsyncStorage.removeItem('cart');
        showToast('Success!', 'Order is created successfully', 'success');
       }
      });
     } else {
      showToast('Error', 'Please add a vehicle first', 'error');
      navigation.navigate('VehicleInformation');
     }
    }}
    showButton
    updateCart={updateCart}
    btnTitle={'Create Order'}
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
 heading: {
  fontSize: responsiveFontSize(16),
  textAlign: 'left',
  fontFamily: SFProDisplayBold,
  color: BLACK,
  marginBottom: hp(11),
 },
 title: {
  fontSize: responsiveFontSize(16),
  textAlign: 'left',
  fontFamily: SFProDisplayRegular,
  color: BLACK,
  marginBottom: hp(11),
 },
 rowContainer: {
  marginLeft: wp(18),
  flexDirection: 'row',
  justifyContent: 'space-between',
 },
 price: {
  fontSize: responsiveFontSize(16),
  textAlign: 'left',
  fontFamily: SFProDisplayRegular,
  color: GREEN,
  marginRight: wp(18),
 },
 rightView: {
  flexDirection: 'row',
  alignItems: 'center',
 },
});

//make this component available to the app
export default PaymentMethod;
