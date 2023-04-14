//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FullButton from '../../Components/Buttons/FullButton';
import Header from '../../Components/Header/Header';

import { BLACK, BLUE, GREY_TEXT, WHITE } from '../../constants/colors';
import {
 PoppinsRegular,
 SFProDisplayMedium,
 SFProDisplayRegular,
} from '../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../utils/responsiveSizes';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Phone } from '../../assets';
// create a component
const OTP = () => {
 const navigation = useNavigation();
 const [resendTime, setResendTime] = useState(46);

 useEffect(() => {
  const timeout = setInterval(() => {
   let time = resendTime;
   if (time > 0) {
    setResendTime((_time) => {
     if (_time > 0) {
      return _time - 1;
     } else {
      clearInterval(timeout);
      return 0;
     }
    });
   } else {
    clearInterval(timeout);
   }
  }, 1000);
  return () => {
   clearInterval(timeout);
  };
 }, []);

 const formatTime = (t) => {
  if (t >= 10) return t;
  return `0${t}`;
 };
 return (
  <View style={styles.container}>
   <Header title={'OTP Verification'} />
   <ScrollView
    style={styles.content}
    contentContainerStyle={styles.contentContainerStyle}
   >
    <View>
     <Text style={styles.timer}>00:{formatTime(resendTime)}</Text>
     <Image style={styles.phoneLogo} source={Phone} />
     <Text style={styles.description}>
      Please type the varification Code Sent to
     </Text>
     <Text style={styles.medium}>Your Register Mobile Number / Your Email</Text>
    </View>
    <View>
     <OTPInputView
      pinCount={6}
      style={[styles.otpWrapper]}
      autoFocusOnLoad
      onCodeFilled={() => {}}
      editable={true}
      codeInputFieldStyle={styles.otpInptItem}
     />
     <View style={styles.signupButton}>
      <Text style={styles.signupText}>Did not get code. ? </Text>
      <TouchableOpacity onPress={() => {}}>
       <Text style={styles.forgotText}>Resend</Text>
      </TouchableOpacity>
     </View>
    </View>
    <View>
     <View style={styles.buttonContainer}>
      <FullButton
    //    onPress={() => navigation.navigate('Dashboard')}
       title={'Verify'}
      />
     </View>
     <Text style={styles.bottomText}>
      By continuing, you agree to Grow’s Terms of Service and Privacy Policy
     </Text>
    </View>
   </ScrollView>
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
  paddingHorizontal: wp(22),
  marginTop: hp(10),
 },
 buttonContainer: {
  marginTop: hp(14),
 },
 bottomText: {
  marginTop: hp(15),
  textAlign: 'center',
  fontSize: responsiveFontSize(13),
  textAlign: 'left',
  fontFamily: PoppinsRegular,
  color: GREY_TEXT,
 },
 timer: {
  textAlign: 'center',
  fontSize: responsiveFontSize(20),
  textAlign: 'left',
  fontFamily: SFProDisplayMedium,
  color: GREY_TEXT,
 },
 description: {
  textAlign: 'center',
  fontSize: responsiveFontSize(16),
  textAlign: 'left',
  fontFamily: SFProDisplayMedium,
  color: GREY_TEXT,
  marginTop: hp(15),
 },
 phoneLogo: {
  alignSelf: 'center',
  marginTop: 10,
  width: wp(112),
  height: wp(112),
  resizeMode: 'contain',
 },
 medium: {
  color: BLUE,
  textAlign: 'center',
  fontSize: responsiveFontSize(16),
  textAlign: 'left',
  fontFamily: SFProDisplayMedium,
 },
 otpInptItem: {
  width: wp(34),
  borderWidth: 0,
  borderBottomWidth: 1,
  borderBottomColor: GREY_TEXT,
  alignItems: 'center',
  textAlign: 'center',
  color: BLACK,
  fontSize: responsiveFontSize(24),
  textAlign: 'left',
  fontFamily: SFProDisplayRegular,
 },
 otpWrapper: {
  flexDirection: 'row',
  justifyContent: 'space-around',

  marginHorizontal: wp(25),
 },
 contentContainerStyle: {
  justifyContent: 'space-between',
  flex: 1,
 },
 signupButton: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',

  marginBottom: hp(15),
  marginRight: wp(20),
  marginTop: hp(23),
 },
 signupText: {
  textAlign: 'center',
  fontSize: responsiveFontSize(13),
  textAlign: 'left',
  fontFamily: PoppinsRegular,
  color: GREY_TEXT,
 },

 forgotText: {
  color: BLUE,
  textAlign: 'left',
  fontFamily: SFProDisplayMedium,
  fontSize: responsiveFontSize(16),
 },
});

//make this component available to the app
export default OTP;
