//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import FullButton from '../../Components/Buttons/FullButton';
import Header from '../../Components/Header/Header';

import jwt from 'jwt-decode'; // import dependency

import { BLUE, GREY_TEXT, WHITE } from '../../constants/colors';
import { PoppinsRegular, SFProDisplayMedium } from '../../constants/fonts';
import { loginAction, loginForm } from '../../store/actions/auth';
import { setToken, setUser } from '../../utils/common';
import { hp, responsiveFontSize, wp } from '../../utils/responsiveSizes';
import FormElement from '../../Components/FormEelement';
import Loader from '../../Components/Loader';
import { useTranslation } from 'react-i18next';

// create a component
const Login = ({ route }) => {
 const navigation = useNavigation();
 const isCustomer = route?.params?.customer;
 const dispatch = useDispatch();
 const { i18n, t } = useTranslation();
 const isRTL = i18n.language === 'ar';
 const [loading, setLoading] = useState(true);

 const [state, setState] = useState({
  fields: [],
  errorMessages: {},
 });

 useEffect(() => {
  setLoading(true);
  dispatch(loginForm()).then((res) => {
   setLoading(false);
   setState({
    ...state,
    fields: res?.payload,
   });
  });
 }, []);

 const handleChange = (name, index, value) => {
  const { fields, errorMessages } = state;
  const field = fields[index];
  const { fieldType, xmlName } = field;
  if (name === xmlName) {
   switch (fieldType) {
    case 'checkbox':
     field['value'] = value;
     break;
    case 'select':
     field['value'] = value;
     break;
    default:
     field['value'] = value;
     break;
   }
  }
  if (errorMessages[name]) delete errorMessages[name];
  setState({
   ...state,
   fields,
   [name]: value,
  });
 };

 const login = () => {
  let data = {};
  state?.fields?.forEach((field) => {
   data[field?.xmlName] = field?.value;
  });
  data.userAgent = `gorex-${Platform.OS}`;
  data.type = 'merchant';
  setLoading(true);
  dispatch(loginAction(data)).then((res) => {
   setLoading(false);
   if (res?.payload?.accessToken) {
    const user = jwt(res?.payload?.accessToken);
    setUser(user);
    setToken(res?.payload);
    // navigation.navigate('Dashboard');
   }
  });
 };

 return (
  <View style={styles.container}>
   <Header title={t('auth.Login')} />

   <ScrollView
    style={styles.content}
    contentContainerStyle={styles.contentContainer}
   >
    {state?.fields && state?.fields?.length > 0
     ? state?.fields?.map((field, i) => (
        <FormElement
         index={i}
         key={i}
         field={field}
         currentField={{ [field?.xmlName]: state[field?.xmlName] }}
         errorMessages={state.errorMessages}
         handleChange={handleChange}
        />
       ))
     : null}
    {/* <TextInput value title={'Mobile Number / Email'} />
        <TextInput secured title={'Password'} /> */}
    <TouchableOpacity
     style={styles.forgotButton}
     onPress={() => navigation.navigate('ForgotPassword')}
    >
     <Text style={styles.forgotText}>{t('auth.Forgot Password?')}</Text>
    </TouchableOpacity>
    <View style={styles.buttonContainer}>
     <FullButton onPress={login} title={t('auth.Login')} />
    </View>
    <Text style={styles.bottomText}>
     {t(
      'auth.By continuing, you agree to Grow’s Terms of Service and Privacy Policy'
     )}
    </Text>
    {isCustomer && (
     <View style={styles.signupButton}>
      <Text style={styles.signupText}>
       {t('auth.Dont have an account. ? ')}{' '}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
       <Text style={styles.forgotText}>{t('auth.Sign Up')} </Text>
      </TouchableOpacity>
     </View>
    )}
    {/* <SocialButton
          containerStyle={{backgroundColor: LIGHTBLUE}}
          title="Sign in with Google"
          icon={Google}
        />
        <SocialButton
          containerStyle={{backgroundColor: DARKERGREEN}}
          title="Sign in with Email"
          icon={Message}
        />
        <SocialButton
          containerStyle={{backgroundColor: FACEBOOKBLUE}}
          title="Sign in with Facebook"
          icon={Message}
        />
        <SocialButton
          containerStyle={{backgroundColor: WHITE}}
          title="Sign in with Apple"
          titleStyle={{color: BLACK}}
          icon={Apple}
        /> */}
   </ScrollView>
   <Loader visible={loading} />
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
  marginTop: hp(10),
 },
 contentContainer: {
  flexGrow: 1,
  paddingHorizontal: wp(22),
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
 signupButton: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: hp(15),
  marginBottom: hp(15),
 },
 signupText: {
  textAlign: 'center',
  fontSize: responsiveFontSize(13),
  textAlign: 'left',
  fontFamily: PoppinsRegular,
  color: GREY_TEXT,
 },
 forgotButton: {
  alignSelf: 'flex-end',
  marginTop: hp(11),
 },
 forgotText: {
  color: BLUE,
  textAlign: 'left',
  fontFamily: SFProDisplayMedium,
  textAlign: 'left',
  fontSize: responsiveFontSize(16),
 },
});

//make this component available to the app
export default Login;
