//import liraries

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
 View,
 StyleSheet,
 FlatList,
 Text,
 TouchableOpacity,
 ImageBackground,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Cart, ServiceBg } from '../../assets';
import BackHeader from '../../Components/Header/BackHeader';
import SearchBar from '../../Components/Inputs/SearchBar';
import {
 BLACK,
 BORDER_GRAYLIGHTEST,
 GREEN,
 WHITE,
} from '../../constants/colors';
import { SFProDisplayLight, SFProDisplaySemiBold } from '../../constants/fonts';
import { responsiveFontSize, wp } from '../../utils/responsiveSizes';
import {
 getServiceTypes,
 getServiceTypesByBranch,
} from '../ServiceProvider/ServiceProviderActions';
import BottomBar from './ components/BottomBar';
import TabBar from './ components/TabBar';

// create a component
const ServicesListing = ({ route }) => {
 const navigation = useNavigation();

 const title = route?.params?.title;
 const branch = route?.params?.branch;
 console.log("branch", branch);
 const dispatch = useDispatch();

 const [serviceTypes, setServiceTypes] = useState([]);

 useEffect(() => {
  dispatch(getServiceTypesByBranch(branch?._id)).then((res) => {
   setServiceTypes(res?.payload?.data);
  });
 }, []);
 return (
  <View style={styles.container}>
   <BackHeader rightIcon={Cart} title={title} />
   <TabBar active={2} />
   <View style={styles.paddedContent}>
    <SearchBar />
    <FlatList
     data={serviceTypes}
     style={styles.list}
     renderItem={({ item }) => (
      <View>
       <ImageBackground style={styles.service} source={ServiceBg}>
        <View style={styles.serviceContent}>
         <Text style={styles.title}>{item?.name}</Text>
         <Text style={styles.price}>Start From 99 SAR</Text>
         <TouchableOpacity
          onPress={() =>
           navigation.navigate('ServicesSubCategory', {
            branch,
            servicetype: item,
           })
          }
          style={styles.button}
         >
          <Text style={styles.buttonText}>View Service Details</Text>
         </TouchableOpacity>
        </View>
       </ImageBackground>
      </View>
     )}
    />
   </View>
   <BottomBar showButton btnTitle={'View Order'} />
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

 service: {
  width: '100%',
  minHeight: wp(123),
  borderWidth: 1,
  borderColor: BORDER_GRAYLIGHTEST,
  marginBottom: 4,
  borderRadius: 6,
 },
 serviceContent: {
  padding: wp(10),
  justifyContent: 'space-between',
  flex: 1,
 },
 list: {
  flex: 1,
 },
 title: {
  textAlign: 'left',
  fontFamily: SFProDisplaySemiBold,
  fontSize: responsiveFontSize(16),
  color: WHITE,
 },
 price: {
  textAlign: 'left',
  fontFamily: SFProDisplayLight,
  fontSize: responsiveFontSize(16),
  color: WHITE,
 },
 button: {
  width: wp(143),
  height: wp(26),
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: GREEN,
  borderRadius: wp(13),
 },
 buttonText: {
  textAlign: 'left',
  fontFamily: SFProDisplaySemiBold,
  fontSize: responsiveFontSize(12),
  color: BLACK,
 },
});

//make this component available to the app
export default ServicesListing;
