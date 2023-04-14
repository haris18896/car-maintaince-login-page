//import liraries
import React from 'react';
import { View, Image, StyleSheet, TextInput } from 'react-native';
import { Search } from '../../assets';
import { BORDER_GRAYLIGHT } from '../../constants/colors';
import { SFProDisplayRegular } from '../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../utils/responsiveSizes';

// create a component
const SearchBar = () => {
 return (
  <View style={styles.container}>
   <Image source={Search} />
   <TextInput style={styles.input} placeholder='Search' />
  </View>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {
  marginVertical: hp(10),
  borderWidth: 1,
  borderColor: BORDER_GRAYLIGHT,
  height: hp(43),
  alignItems: 'center',
  borderRadius: wp(27),
  paddingLeft: wp(20),
  flexDirection: 'row',
 },
 input: {
  marginLeft: wp(15),
  flex: 1,
  paddingRight: wp(20),
  textAlign: 'left',
  fontFamily: SFProDisplayRegular,
  fontSize: responsiveFontSize(17),
 },
});

//make this component available to the app
export default SearchBar;
