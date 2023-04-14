//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
 View,
 Image,
 StyleSheet,
 Text,
 FlatList,
 ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Cart, ServiceDetailsBg, Shop } from '../../assets';
import FullButton from '../../Components/Buttons/FullButton';
import BackHeader from '../../Components/Header/BackHeader';
import {
 ALICE_BLUE,
 BLUE,
 DARK_GREY,
 LIGHTBLACK,
 LIGHTBLACKOPAC,
 WHITE,
} from '../../constants/colors';
import { PoppinsMedium, SFProDisplaySemiBold } from '../../constants/fonts';
import { responsiveFontSize, wp } from '../../utils/responsiveSizes';
import { data } from './dummyData';
import { getBranchDetails } from './ServiceProviderActions';

// create a component
const ServiceProviderDetails = ({ route }) => {
 const navigation = useNavigation();
 const id = route?.params?.id;
 const dispatch = useDispatch();

 const [branch, setBranch] = useState({});

 useEffect(() => {
  dispatch(getBranchDetails(id)).then((res) => setBranch(res?.payload));
 }, []);

 const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
 ];
 return (
  <View style={styles.container}>
   <Image style={styles.image} source={ServiceDetailsBg} />
   <BackHeader rightIcon={Cart} title={branch?.title} />
   <ScrollView
    style={styles.content}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.contentContainer}
   >
    <View style={styles.paddedContent}>
     <Image style={styles.shopImage} source={Shop} />
     <Text style={styles.bigTitle}>Info</Text>
     <Text style={[styles.description, styles.details]}>
      {branch?.information}
     </Text>
     <View style={styles.row}>
      <Text style={[styles.bigTitle, styles.uniform]}>Address</Text>
      <Text style={[styles.description, styles.value]}>{branch?.region}</Text>
     </View>

     <View style={styles.row}>
      <Text style={[styles.bigTitle, styles.uniform]}>City</Text>
      <Text style={[styles.description, styles.value]}>{branch?.city}</Text>
     </View>
     <View style={styles.row}>
      <Text style={[styles.bigTitle, styles.uniform]}>Rating</Text>
      <Text style={[styles.description, styles.value]}>4.5</Text>
     </View>
     {/* <View style={styles.row}>
            <Text style={styles.bigTitle}>Our Services</Text>
          </View>
          <View style={styles.services}>
            <FlatList
              data={data}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapperStyle}
              renderItem={({item}) => (
                <View style={styles.service}>
                  <Image source={item?.image} />
                  <Text style={styles.serviceText}>{item.name}</Text>
                </View>
              )}
            />
          </View> */}
     <Text style={[styles.bigTitle, styles.openingHeader]}>Opening Hours</Text>
    </View>
    <FlatList
     data={days}
     renderItem={({ item, index }) => (
      <View
       key={item}
       style={index % 2 != 0 ? styles.hoursRowColored : styles.hoursRow}
      >
       <Text style={styles.day}>{item}</Text>
       <Text style={styles.time}>9:00 AM- 5 PM</Text>
      </View>
     )}
    />
    <FullButton
     onPress={() =>
      navigation.navigate('ProductsListing', {
       title: branch?.title,
       id,
       branch,
      })
     }
     title={'Continue'}
    />
   </ScrollView>
  </View>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
 image: {
  width: '100%',
  height: wp(300),
  marginTop: wp(60),
  position: 'absolute',
 },
 shopImage: {
  width: '100%',
  height: wp(200),
  marginBottom: wp(10),
 },
 content: {
  backgroundColor: WHITE,
  borderTopLeftRadius: wp(20),
  borderTopRightRadius: wp(20),
  marginTop: wp(50),
  paddingTop: wp(20),
 },
 contentContainer: {
  flexGrow: 1,
  paddingBottom: wp(30),
 },
 paddedContent: {
  paddingHorizontal: wp(20),
 },
 bigTitle: {
  textAlign: 'left',
  fontFamily: SFProDisplaySemiBold,
  fontSize: responsiveFontSize(22),
  color: BLUE,
 },
 uniform: {
  width: wp(100),
 },
 description: {
  textAlign: 'left',
  fontFamily: PoppinsMedium,
  fontSize: responsiveFontSize(13),
  color: DARK_GREY,
 },
 details: {
  marginTop: 7,
 },
 value: {
  marginTop: 4,
  marginLeft: wp(13),
 },
 row: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: wp(9),
 },
 services: {
  marginTop: wp(10),
 },
 service: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: wp(15),
 },
 serviceText: {
  marginLeft: wp(13),
  color: LIGHTBLACK,
  textAlign: 'left',
  fontFamily: SFProDisplaySemiBold,
 },
 columnWrapperStyle: {
  justifyContent: 'space-between',
 },
 openingHeader: {
  marginVertical: wp(10),
 },
 hoursRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 3,
  height: wp(25),
  paddingHorizontal: wp(27),
 },
 hoursRowColored: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 3,
  height: wp(25),
  backgroundColor: ALICE_BLUE,
  paddingHorizontal: wp(27),
 },
 day: {
  textAlign: 'left',
  fontFamily: SFProDisplaySemiBold,
  fontSize: responsiveFontSize(14),
  color: LIGHTBLACK,
 },
 time: {
  textAlign: 'left',
  fontFamily: SFProDisplaySemiBold,
  fontSize: responsiveFontSize(14),
  color: LIGHTBLACKOPAC,
 },
});

//make this component available to the app
export default ServiceProviderDetails;
