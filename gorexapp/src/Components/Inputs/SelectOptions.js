//import liraries
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
 StyleSheet,
 Modal,
 View,
 TouchableOpacity,
 Text,
 SafeAreaView,
} from 'react-native';
import { BLACK, BLACK_OPAC, GREY, WHITE } from '../../constants/colors';
import { hp, wp } from '../../utils/responsiveSizes';

const SelectOptions = ({ visible, options, selectOption }) => {
 const [show, setShow] = useState(visible);
 useEffect(() => {
  if (visible) {
   setShow(visible);
  } else {
   setTimeout(() => {
    setShow(visible);
   }, 100);
  }
 }, [visible]);
 return (
  <Modal transparent visible={show} style={styles.container}>
   <SafeAreaView style={styles.content}>
    <View style={styles.optionsContainer}>
     {options?.map((item, index) => {
      return (
       <TouchableOpacity
        style={styles.option}
        key={index}
        disabled={index === 0}
        onPress={() => selectOption(item)}
       >
        <Text style={index === 0 ? styles.disabledText : styles.text}>
         {' '}
         {item?.label}
        </Text>
       </TouchableOpacity>
      );
     })}
    </View>
   </SafeAreaView>
  </Modal>
 );
};
SelectOptions.propTypes = {
 visible: PropTypes.bool,
};

// define your styles
const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
 content: {
  backgroundColor: WHITE,
  flex: 1,
 },
 optionsContainer: {
  padding: wp(20),
 },
 option: {
  height: hp(50),
  borderBottomWidth: 1,
  borderColor: BLACK_OPAC,
  justifyContent: 'center',
  marginBottom: hp(15),
 },
 disabledText: {
  color: GREY,
 },
 text: {
  color: BLACK,
 },
});

export default SelectOptions;
