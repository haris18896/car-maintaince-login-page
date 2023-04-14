//import liraries
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { ScanPlaceholder } from '../../assets';
import FullButton from '../../Components/Buttons/FullButton';
import BackHeader from '../../Components/Header/BackHeader';
import HomeHeader from '../../Components/Header/HomeHeader';
import { WHITE } from '../../constants/colors';
import { getProfile } from '../../store/actions/auth';
import { wp } from '../../utils/responsiveSizes';
import SideMenu from '../Dashboard/components/SideMenu';

// create a component
const Scan = () => {
 const navigation = useNavigation();
 const dispatch = useDispatch();
 const { t } = useTranslation();
 const focus = useIsFocused();
 const [showMenu, setShowMenu] = useState(false);

 useEffect(() => {
  if (focus) dispatch(getProfile());
 }, [focus]);
 return (
  <View style={styles.container}>
   <HomeHeader title='Payment History' onPress={() => setShowMenu(!showMenu)} />
   <View style={styles.content}>
    <Image style={styles.scan} source={ScanPlaceholder} />
    <FullButton
     title={t('scan.Scan')}
     onPress={() => navigation.navigate('BarcodeScanner')}
    />
   </View>
   <SideMenu visible={showMenu} onClose={() => setShowMenu(false)} />
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
  justifyContent: 'space-between',
  alignItems: 'center',
  flex: 1,
  paddingVertical: wp(30),
 },
 scan: {
  width: wp(295),
  height: wp(295),
 },
});

//make this component available to the app
export default Scan;
