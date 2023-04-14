//import liraries
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import FullButton from '../../Components/Buttons/FullButton';
import Header from '../../Components/Header/BackHeader';

import TextInput from '../../Components/Inputs/TextInput';

import {WHITE} from '../../constants/colors';
import {changePassword, loginForm} from '../../store/actions/auth';
import {showToast} from '../../utils/common';
import {hp, wp} from '../../utils/responsiveSizes';
import Loader from '../../Components/Loader';
import {useTranslation} from 'react-i18next';

// create a component
const ChangePassword = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const _changePassword = () => {
    if (newPassword !== confirmPassword) {
      showToast(
        'Error!',
        'New password and confirm password does not match',
        'error',
      );
    } else {
      setLoading(true);
      dispatch(
        changePassword({oldPassword: currentPassword, password: newPassword}),
      ).then(res => {
        setLoading(false);

        if (res?.payload?.data?.message) {
          showToast('Success!', res?.payload?.data?.message, 'success');
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title={t('Change Password')} />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.content}>
        <TextInput
          changeHandler={value => setCurrentPassword(value)}
          value={currentPassword}
          title={t('Current Password')}
          secured
        />
        <TextInput
          changeHandler={value => setNewPassword(value)}
          value={newPassword}
          title={t('New Password')}
          secured
        />
        <TextInput
          changeHandler={value => setConfirmPassword(value)}
          value={confirmPassword}
          title={t('Confirm New Password')}
          secured
        />

        <View style={styles.buttonContainer}>
          <FullButton
            disabled={!currentPassword || !newPassword || !confirmPassword}
            onPress={_changePassword}
            title={t('Change Password')}
          />
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
export default ChangePassword;
