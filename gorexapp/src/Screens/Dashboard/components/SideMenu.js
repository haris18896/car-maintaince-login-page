import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Modal, Text, Image, FlatList, Alert } from 'react-native';
import { BLACK_OPAC, BLUE, MENU_GRAY, WHITE } from '../../../constants/colors';
import {
  About,
  Calendar,
  Contact,
  Edit,
  History,
  Home,
  Logo,
  Logout,
  Placeholder,
  Profile,
  Settings,
  Vehicle
} from '../../../assets';
import { hp, responsiveFontSize, wp } from '../../../utils/responsiveSizes';
import { SFProDisplayLight, SFProDisplayMedium } from '../../../constants/fonts';
import { useNavigation } from '@react-navigation/native';
import { removeToken, showToast } from '../../../utils/common';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount, logout } from '../../../store/actions/auth';
import { mediaUrl } from '../../../utils/defaultConfig';
import { useTranslation } from 'react-i18next';

const SideMenu = props => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const menu = [
    {
      name: t('menu.Home'),
      image: Home
    },
    // {
    //  name: 'About Gorex',
    //  image: About,
    // },

    {
      name: t('menu.My Orders History'),
      image: History,
      screen: 'OrderHistory'
    },

    // {
    //  name: 'Contact Us',
    //  image: Contact,
    // },
    {
      name: t('menu.Change Password'),
      image: Settings,
      screen: 'ChangePassword'
    },
    {
      name: t('menu.Settings'),
      image: Settings,
      screen: 'ProfileUpdate'
    },
    {
      name: t('menu.Logout'),
      image: Logout,
      screen: 'Logout'
    }
  ];
  return (
    <Modal animationType='fade' transparent visible={props.visible} style={styles.container}>
      <SafeAreaView style={styles.uperSafeArea} />
      <View style={styles.leftRightContainer}>
        <SafeAreaView style={styles.contenContainer}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={Logo} />
            </View>
            <View style={styles.avatarContainer}>
              <View>
                <Image
                  style={styles.avatar}
                  source={user?.profile?.file ? { uri: `${mediaUrl}${user?.profile?.file}` } : Profile}
                />
                {/* <View style={styles.editContainer}>
         <Image style={styles.edit} source={Edit} />
        </View> */}
              </View>

              <View>
                <Text style={styles.welcome}>{t('menu.Welcome')}</Text>
                <Text style={styles.name}>{user?.profile?.name}</Text>
              </View>
            </View>
          </View>
          <View style={styles.menu}>
            <FlatList
              data={menu}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    if (item?.screen === 'Logout') {
                      removeToken();
                      props.onClose();
                      dispatch(logout());
                    } else {
                      navigation.navigate(item?.screen ? item?.screen : '');
                      props.onClose();
                    }
                  }}
                  style={styles.menuButton}
                >
                  <Image source={item?.image} />
                  <Text style={styles.menuText}>{item?.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.versionContainer}>
            <Text style={styles.version}>V 1.0.0</Text>
          </View>
        </SafeAreaView>
        <TouchableOpacity onPress={() => props.onClose()} style={styles.rightSide} />
      </View>
    </Modal>
  );
};
SideMenu.propTypes = {
  props: PropTypes.object,
  visible: PropTypes.bool,
  onClose: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  header: {
    backgroundColor: BLUE,
    padding: wp(20)
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: wp(100),
    resizeMode: 'contain'
  },
  uperSafeArea: {
    backgroundColor: BLUE,
    width: '85%'
  },
  contenContainer: {
    backgroundColor: WHITE,

    width: '85%'
  },
  leftRightContainer: {
    flexDirection: 'row',
    flex: 1
  },
  rightSide: {
    backgroundColor: BLACK_OPAC,
    flex: 1
  },
  avatarContainer: {
    flexDirection: 'row',
    marginTop: hp(20)
  },
  avatar: {
    width: wp(58),
    height: wp(58),
    borderRadius: wp(28),
    marginRight: 9
  },
  edit: {
    width: 10,
    height: 10
  },
  editContainer: {
    bottom: 5,
    right: 5,
    position: 'absolute',
    backgroundColor: WHITE,
    padding: 5,
    borderRadius: 10
  },
  welcome: {
    textAlign: 'left',
    fontFamily: SFProDisplayLight,
    fontSize: responsiveFontSize(18),
    color: WHITE
  },
  name: {
    textAlign: 'left',
    fontFamily: SFProDisplayMedium,
    fontSize: responsiveFontSize(18),
    color: WHITE,
    marginTop: hp(10)
  },
  menu: {
    padding: wp(25)
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(30)
  },
  menuText: {
    textAlign: 'left',
    fontFamily: SFProDisplayMedium,
    fontSize: responsiveFontSize(14),
    color: MENU_GRAY,
    marginLeft: wp(20)
  },
  version: {
    fontSize: responsiveFontSize(14),
    textAlign: 'left',
    fontFamily: SFProDisplayMedium
  },
  versionContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SideMenu;
