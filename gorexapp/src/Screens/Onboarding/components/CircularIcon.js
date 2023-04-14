//import liraries
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Spark} from '../../../assets';
import {WHITE, WHITEOPAC} from '../../../constants/colors';
import {hp} from '../../../utils/responsiveSizes';

// create a component
const CircularIcon = ({icon}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={icon ? icon : Spark} />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: WHITEOPAC,
    borderRadius: hp(60),
    height: hp(100),
    justifyContent: 'center',
    width: hp(100),
    marginRight: hp(5),
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: hp(60),
    height: hp(88),
    justifyContent: 'center',
    width: hp(88),
  },
  image: {
    width: hp(32),
    height: hp(32),
    resizeMode: 'contain',
  },
});

//make this component available to the app
export default CircularIcon;
