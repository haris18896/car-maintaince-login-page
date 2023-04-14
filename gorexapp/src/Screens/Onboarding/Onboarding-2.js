//import liraries
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Battery, Frame, Gear, Logo, Oil, Spark, Tire } from '../../assets';
import SmallButton from '../../Components/Buttons/SmallButton';
import { BLUE, WHITE } from '../../constants/colors';
import { SFProDisplayRegular } from '../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../utils/responsiveSizes';
import CircularIcon from './components/CircularIcon';

// create a component
const Onboardig2 = () => {
 const navigation = useNavigation();
 const { i18n, t } = useTranslation();
 const isRTL = i18n.language === 'ar';
 return (
  <View style={styles.container}>
   <Image style={styles.logo} source={Logo} />
   <Text style={isRTL ? styles.logoTitle : styles.logoTitleRight}>
    {t('onboarding.LetsGo')}
   </Text>
   <View style={styles.iconContainer}>
    <View style={styles.iconsRow}>
     <CircularIcon icon={Battery} />
     <CircularIcon icon={Spark} />
     <CircularIcon icon={Tire} />
    </View>
    <View style={styles.iconsRow}>
     <CircularIcon icon={Tire} />
     <CircularIcon icon={Oil} />
    </View>
    <CircularIcon icon={Gear} />
   </View>
   <View style={styles.buttonContainer}>
    <SmallButton
     onPress={() => navigation.navigate('Login')}
     title={t('onboarding.Continue')}
    />
   </View>
   <Image style={styles.frame} source={Frame} />
  </View>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {
  alignItems: 'center',
  backgroundColor: BLUE,
  flex: 1,
  // paddingHorizontal: hp(0),
 },
 frame: {
  height: '100%',
  position: 'absolute',
  resizeMode: 'contain',
  right: -5,
 },
 iconContainer: {
  marginTop: hp(60),
  justifyContent: 'center',
  alignItems: 'center',
 },
 logo: {
  marginTop: hp(30),
  resizeMode: 'contain',
  width: wp(234),
 },
 iconsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
 },
 logoTitle: {
  color: WHITE,
  textAlign: 'left',
  fontFamily: SFProDisplayRegular,
  textAlign: 'left',
  fontSize: responsiveFontSize(22),
  letterSpacing: 5,
  marginRight: 5,
  marginTop: hp(10),
 },
 logoTitleRight: {
  color: WHITE,
  textAlign: 'left',
  fontFamily: SFProDisplayRegular,
  textAlign: 'left',
  fontSize: responsiveFontSize(22),
  letterSpacing: 5,
  marginLeft: 5,
  marginTop: hp(10),
 },
 buttonContainer: {
  marginTop: hp(70),
 },
});

//make this component available to the app
export default Onboardig2;
