//import liraries
import React, { useEffect, useState } from 'react';
import {
 View,
 Text,
 StyleSheet,
 Image,
 I18nManager,
 Platform,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Down } from '../../assets';
import { BLACK, WHITE } from '../../constants/colors';
import { SFProDisplayRegular } from '../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../utils/responsiveSizes';
import RNPickerSelect from 'react-native-picker-select';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';

// create a component
const PickerInputRound = ({ title, value, onPress, flag }) => {
 const { i18n } = useTranslation();
 const [language, setLanguage] = useState(
  i18n?.language == 'en' ? 'English' : 'اللغة العربية'
 );

 const toggleLang = (lang) => {
  if (lang !== i18n.language) {
   i18n.changeLanguage(lang).then(() => {
    const isRTL = i18n.language === 'ar';
    I18nManager.forceRTL(isRTL);
    setTimeout(() => {
     RNRestart.Restart();
    }, 1);
   });
  }
 };

 // useEffect(() => {
 //   setLanguage(i18n?.language == 'en' ? 'English' : 'اللغة العربية');
 // }, []);

 return (
  <View style={styles.container}>
   <Text style={styles.title}>{title}</Text>
   {onPress ? (
    <TouchableOpacity
     disabled
     onPress={onPress && onPress}
     style={styles.picker}
    >
     <View style={styles.leftContainer}>
      {flag && <Image style={styles.flag} source={{ uri: flag }} />}
      <Text style={styles.value}>{value}</Text>
     </View>
     <Image source={Down} />
    </TouchableOpacity>
   ) : (
    <RNPickerSelect
     onValueChange={(value) => {
      setLanguage(value);
      if (Platform.OS === 'android') {
       toggleLang(value === 'English' ? 'en' : 'ar');
      }
     }}
     onDonePress={() => {
      toggleLang(value === 'English' ? 'en' : 'ar');
     }}
     items={[
      { label: 'English', value: 'English' },
      { label: 'اللغة العربية', value: 'اللغة العربية' },
     ]}
    >
     <TouchableOpacity onPress={onPress && onPress} style={styles.picker}>
      <View style={styles.leftContainer}>
       {flag && <Image style={styles.flag} source={{ uri: flag }} />}
       <Text style={styles.value}>{language}</Text>
      </View>
      <Image source={Down} />
     </TouchableOpacity>
    </RNPickerSelect>
   )}
  </View>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginBottom: hp(23),
 },
 title: {
  color: WHITE,
  fontFamily: SFProDisplayRegular,
  textAlign: 'left',
  fontSize: responsiveFontSize(18),
  marginBottom: hp(8),
  marginLeft: hp(5),
 },
 leftContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  resizeMode: 'contaon',
 },
 picker: {
  width: wp(338),
  height: hp(58),
  borderRadius: hp(26),
  backgroundColor: WHITE,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: wp(13),
 },
 value: {
  fontSize: responsiveFontSize(22),
  fontFamily: SFProDisplayRegular,
  textAlign: 'left',
  color: BLACK,
 },
 flag: {
  width: hp(36),
  height: hp(36),
  borderRadius: hp(18),
  marginRight: hp(5),
 },
});

//make this component available to the app
export default PickerInputRound;
