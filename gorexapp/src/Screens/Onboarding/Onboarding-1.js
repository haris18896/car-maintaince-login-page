//import liraries
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Frame, Logo } from '../../assets';
import SmallButton from '../../Components/Buttons/SmallButton';
import { BLUE, WHITE } from '../../constants/colors';
import { PoppinsSemiBold, SFProDisplayRegular } from '../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../utils/responsiveSizes';
import CircularIcon from './components/CircularIcon';

// create a component
const Onboardig1 = () => {
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
    <CircularIcon />
   </View>

   <Text style={styles.title}>{t('onboarding.AllElectrical')}</Text>
   <View>
    <Text style={styles.descriptionHeading}>{t('onboarding.Deal')}</Text>
    <Text style={styles.description}>{t('onboarding.Description')}</Text>
   </View>

   <View style={styles.buttonContainer}>
    <SmallButton
     onPress={() => navigation.navigate('Onboarding2')}
     // onPress={() => navigation.navigate('AddCard')}
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
  paddingHorizontal: hp(20),
 },
 description: {
  color: WHITE,
  textAlign: 'left',
  fontFamily: SFProDisplayRegular,
  textAlign: 'left',
  fontSize: responsiveFontSize(18),
  marginTop: hp(16),
 },
 descriptionHeading: {
  color: WHITE,
  textAlign: 'left',
  fontFamily: SFProDisplayRegular,
  textAlign: 'left',
  fontSize: responsiveFontSize(18),
  marginTop: hp(16),
 },
 frame: {
  height: '100%',
  position: 'absolute',
  resizeMode: 'contain',
  right: -5,
 },
 iconContainer: {
  marginTop: hp(60),
 },
 logo: {
  marginTop: hp(30),
  resizeMode: 'contain',
  width: wp(234),
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
 title: {
  color: WHITE,
  textAlign: 'left',
  fontFamily: PoppinsSemiBold,
  textAlign: 'left',
  fontSize: responsiveFontSize(26),
  marginTop: hp(16),
 },
 buttonContainer: {
  marginTop: hp(50),
 },
});

//make this component available to the app
export default Onboardig1;
