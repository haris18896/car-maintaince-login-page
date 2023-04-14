//import liraries
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import FullButton from '../../Components/Buttons/FullButton';
import Header from '../../Components/Header/BackHeader';

import jwt from 'jwt-decode'; // import dependency
import TextInput from '../../Components/Inputs/TextInput';

import {BLUE, GREY_TEXT, WHITE} from '../../constants/colors';
import {PoppinsRegular, SFProDisplayMedium} from '../../constants/fonts';
import {
  loginAction,
  loginForm,
  sendPasswordAction,
} from '../../store/actions/auth';
import {setToken, setUser, showToast} from '../../utils/common';
import {hp, responsiveFontSize, wp} from '../../utils/responsiveSizes';
import FormElement from '../../Components/FormEelement';
import Loader from '../../Components/Loader';
import {useTranslation} from 'react-i18next';

// create a component
const ForgotPassword = ({route}) => {
  const navigation = useNavigation();
  const isCustomer = route?.params?.customer;
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  const [state, setState] = useState({
    fields: [],
    errorMessages: {},
  });

  useEffect(() => {
    setLoading(true);
    dispatch(loginForm()).then(res => {
      setLoading(false);
      setState({
        ...state,
        fields: res?.payload,
      });
    });
  }, []);

  const handleChange = value => {
    setEmail(value);
  };

  const sendPassword = () => {
    setLoading(true);
    dispatch(sendPasswordAction({email: email})).then(res => {
      setLoading(false);
      if (res?.payload?.message) {
        showToast('Success!', res?.payload?.message, 'success');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Header title={t('auth.Forgot Password')} />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.content}>
        <TextInput
          changeHandler={handleChange}
          value
          title={t('auth.Please enter email')}
        />

        <View style={styles.buttonContainer}>
          <FullButton onPress={sendPassword} title={t('auth.Send Password')} />
        </View>
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
  buttonContainer: {
    marginTop: hp(14),
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: wp(22),
  },
});

//make this component available to the app
export default ForgotPassword;
