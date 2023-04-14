//import liraries
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Logo } from '../../assets';
import FullButton from '../../Components/Buttons/FullButton';
import CountryPickerInput from '../../Components/Inputs/CountryPicker';
import PickerInputRound from '../../Components/Inputs/PickerInputRound';
import { BLUE, WHITE } from '../../constants/colors';
import { SFProDisplayRegular } from '../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../utils/responsiveSizes';

// create a component
const CountrySelection = () => {
 const navigation = useNavigation();
 const { t } = useTranslation();
 return (
  <View style={styles.container}>
   <View>
    <Image style={styles.logo} source={Logo} />
    <Text style={styles.logoTitle}>{t('onboarding.VehicleServices')}</Text>
   </View>

   <View style={styles.pickers}>
    <CountryPickerInput />
    <PickerInputRound title={t('onboarding.Selectlanguage')} value='English' />
   </View>

   <View style={styles.buttonContainer}>
    {/* <Text style={styles.continue}>Continue as: </Text> */}
    <FullButton
     onPress={() => navigation.navigate('Login', { customer: true })}
     title={t('onboarding.Customer')}
    />
    <View style={styles.corporateContainer}>
     <FullButton
      onPress={() => navigation.navigate('Login', { customer: false })}
      title={t('onboarding.CorporateUser')}
     />
    </View>
   </View>
  </View>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {
  alignItems: 'center',
  backgroundColor: BLUE,
  flex: 1,
  justifyContent: 'space-around',
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
  textAlign: 'center',
  fontSize: responsiveFontSize(22),
  letterSpacing: 5,
  marginLeft: 5,
  marginTop: hp(10),
 },
 buttonContainer: {
  width: '90%',
 },
 corporateContainer: {
  marginTop: wp(12),
 },
});

//make this component available to the app
export default CountrySelection;
