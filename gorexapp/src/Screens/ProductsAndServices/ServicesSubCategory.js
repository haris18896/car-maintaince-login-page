//import liraries

import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';

import {Cart} from '../../assets';
import MediumButton from '../../Components/Buttons/MediumButton';
import BackHeader from '../../Components/Header/BackHeader';
import CheckBox from '../../Components/Inputs/CheckBox';
import {WHITE} from '../../constants/colors';
import {getData, getServicesData} from '../../utils/common';
import {hp, wp} from '../../utils/responsiveSizes';
import {getServices} from '../ServiceProvider/ServiceProviderActions';
import BottomBar from './ components/BottomBar';
import TabBar from './ components/TabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const ServicesSubCategory = ({route}) => {
  const navigation = useNavigation();
  const title = route?.params?.title;
  const branch = route?.params?.branch;
  const servicetype = route?.params?.servicetype;
  const dispatch = useDispatch();

  const [services, setServices] = useState([]);
  const [updateCart, setUpdateCart] = useState(false);

  const [servicesSelected, setServicesSelected] = useState([]);

  // const _services = [
  //   {_id: 1, name: 'A service', price: 10},
  //   {_id: 2, name: 'B service', price: 20},
  // ];

  useEffect(() => {
    dispatch(
      getServices({branch: branch?._id, servicetype: servicetype?._id}),
    ).then(res => {
      setServices(res?.payload?.data);
    });
  }, []);

  const serviceChecked = async (checked, service) => {
    service.quantity = 1;
    if (checked) {
      setServicesSelected(_service => [..._service, service]);
    } else {
      let ss = [...servicesSelected];
      const index = ss.findIndex(s => s.name === service.name);
      ss.splice(index, 1);
      setServicesSelected(ss);
    }
  };
  const addToCart = async () => {
    let data = (await getServicesData()) || [];

    data = [...data, ...servicesSelected];

    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('services', jsonValue);
    setUpdateCart(!updateCart);
  };
  return (
    <View style={styles.container}>
      <BackHeader rightIcon={Cart} title={title} />
      <TabBar active={2} />
      <View style={styles.paddedContent}>
        <View style={styles.servicesContainer}>
          <FlatList
            data={services}
            renderItem={({item}) => (
              <CheckBox serviceChecked={serviceChecked} item={item} />
            )}
          />
        </View>
        <MediumButton onPress={addToCart} title={'Add To Order'} />
      </View>
      <BottomBar
        updateCart={updateCart}
        onPress={() => navigation.navigate('PaymentMethod', {title, branch})}
        showButton
        btnTitle={'View Order'}
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
  servicesContainer: {
    marginTop: hp(30),
    marginBottom: hp(20),
    maxHeight: hp(350),
  },
});

//make this component available to the app
export default ServicesSubCategory;
