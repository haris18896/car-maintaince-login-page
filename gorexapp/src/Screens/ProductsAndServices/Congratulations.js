//import liraries
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Cart, Congrats } from '../../assets';
import FullButton from '../../Components/Buttons/FullButton';
import BackHeader from '../../Components/Header/BackHeader';
import { BLUE, WHITE } from '../../constants/colors';
import { PoppinsRegular, PoppinsSemiBold } from '../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../utils/responsiveSizes';

// create a component
const Congratulations = () => {
 const navigation = useNavigation();
 return (
  <View style={styles.container}>
   <BackHeader rightIcon={Cart} title='Auto Master' />
   <View style={styles.content}>
    <View style={styles.textContainer}>
     <Text style={styles.lightText}>Many</Text>
     <Text style={styles.heavyText}>Congratulations</Text>
     <Text style={styles.lightText}>
      You have successfully completed the Order.
     </Text>
     <View style={styles.imageConainer}>
      <Image style={styles.image} source={Congrats} />
     </View>
    </View>

    <View style={styles.buttonContainer}>
     <FullButton onPress={() => navigation.navigate('Scan')} title={'Finish'} />
    </View>
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
 content: {
  flex: 1,
  justifyContent: 'space-around',
 },
 textContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: hp(30),
  paddingHorizontal: hp(30),
 },
 lightText: {
  textAlign: 'left',
  fontFamily: PoppinsRegular,
  fontSize: responsiveFontSize(16),
  color: BLUE,
  textAlign: 'center',
 },
 heavyText: {
  textAlign: 'left',
  fontFamily: PoppinsSemiBold,
  fontSize: responsiveFontSize(26),
  color: BLUE,
 },
 imageConainer: {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: hp(32),
 },
 image: {
  width: wp(277),
  height: hp(222),
 },
});

//make this component available to the app
export default Congratulations;
