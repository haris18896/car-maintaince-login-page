//import liraries
import React, { useEffect, useState } from 'react';
import {
 View,
 TouchableOpacity,
 StyleSheet,
 Image,
 Text,
 Switch,
} from 'react-native';
import { Fuel } from '../../../assets';
import {
 ALICE_BLUE,
 BLACK,
 BLUE,
 GHOST_WHITE,
} from '../../../constants/colors';
import { hp, responsiveFontSize, wp } from '../../../utils/responsiveSizes';
import { SFProDisplayMedium } from '../../../constants/fonts';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { getServiceTypes } from '../../ServiceProvider/ServiceProviderActions';
import { useIsFocused } from '@react-navigation/native';
// create a component
const BottomBar = ({ filterChanged }) => {
 const [active, setActive] = useState(1);
 const dispatch = useDispatch();
 const focus = useIsFocused();

 const [serviceTypes, setServiceTypes] = useState([]);

 useEffect(() => {
  if (focus) {
   dispatch(getServiceTypes()).then((res) => {
    setServiceTypes(res?.payload?.data);
   });
  }
 }, [focus]);
 return (
  <View style={styles.container}>
   <View style={styles.buttons}>
    <FlatList
     data={serviceTypes}
     showsHorizontalScrollIndicator={false}
     renderItem={({ item }) => (
      <View style={styles.buttonContainer}>
       <TouchableOpacity
        onPress={() => {
         setActive(item?._id);
         filterChanged(item?._id);
        }}
        style={active === item?._id ? styles.buttonActive : styles.button}
       >
        <Image source={Fuel} />
       </TouchableOpacity>
       <Text style={styles.buttonText}>{item?.name}</Text>
      </View>
     )}
     horizontal
    />
   </View>
   {/* <View style={styles.bottomAction}>
        <Text style={styles.bottomText}>Provide Service at My Location</Text>
        <Switch />
      </View> */}
  </View>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: ALICE_BLUE,
  minHeight: hp(129),
  borderTopLeftRadius: wp(20),
  borderTopRightRadius: wp(20),
  paddingHorizontal: wp(16),
 },
 buttons: {
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  marginTop: -wp(53),
 },
 buttonContainer: {
  alignItems: 'center',
  marginRight: wp(10),
 },
 button: {
  backgroundColor: GHOST_WHITE,
  height: wp(103),
  width: wp(103),
  borderRadius: wp(20),
  justifyContent: 'center',
  alignItems: 'center',
 },
 buttonActive: {
  backgroundColor: BLUE,
  height: wp(103),
  width: wp(103),
  borderRadius: wp(20),
  justifyContent: 'center',
  alignItems: 'center',
 },
 buttonText: {
  color: BLUE,
  fontSize: responsiveFontSize(14),
  textAlign: 'left',
  fontFamily: SFProDisplayMedium,
 },
 bottomAction: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: wp(11),
 },
 bottomText: {
  fontSize: responsiveFontSize(14),
  textAlign: 'left',
  fontFamily: SFProDisplayMedium,
  color: BLACK,
 },
});

//make this component available to the app
export default BottomBar;
