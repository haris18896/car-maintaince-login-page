//import liraries
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { ArrowBack, ArrowForward, Logo } from '../../assets';
import { BLUE, WHITE } from '../../constants/colors';
import { SFProDisplayMedium } from '../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../utils/responsiveSizes';

// create a component
const BackHeader = ({ rightIcon, title, profile }) => {
 const navigation = useNavigation();

 const { i18n } = useTranslation();
 const isRTL = i18n.language === 'ar';
 return (
  <View style={profile ? styles.containerProfile : styles.container}>
   <TouchableOpacity
    onPress={() => navigation.goBack()}
    style={styles.menuButton}
   >
    <Image style={styles.menu} source={isRTL ? ArrowForward : ArrowBack} />
   </TouchableOpacity>
   {title ? (
    <Text style={styles.title}>{title}</Text>
   ) : (
    <Image style={styles.logo} source={Logo} />
   )}
   <View style={styles.placeholder}>
    <Image source={rightIcon} />
   </View>
  </View>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: BLUE,
  borderBottomLeftRadius: hp(20),
  borderBottomRightRadius: hp(20),
  height: hp(74),
  flexDirection: 'row',
  paddingHorizontal: 9,
 },
 containerProfile: {
  justifyContent: 'space-between',
  // alignItems: 'center',
  backgroundColor: BLUE,
  borderBottomLeftRadius: hp(20),
  borderBottomRightRadius: hp(20),
  height: hp(150),
  paddingTop: hp(20),
  flexDirection: 'row',
  paddingHorizontal: 9,
 },
 logo: {
  width: 100,
  resizeMode: 'contain',
  height: hp(25),
 },
 menuButton: {
  height: wp(40),
  width: wp(40),

  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: wp(20),
 },
 placeholder: {
  width: wp(40),
 },
 title: {
  color: WHITE,
  textAlign: 'left',
  fontFamily: SFProDisplayMedium,
  fontSize: responsiveFontSize(22),
 },
});

//make this component available to the app
export default BackHeader;
