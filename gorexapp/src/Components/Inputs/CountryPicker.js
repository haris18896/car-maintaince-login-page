//import liraries
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PickerInputRound from './PickerInputRound';
import CountryPicker from 'react-native-country-picker-modal';
import { KSA } from '../../constants/country';

// create a component
const CountryPickerInput = () => {
 const [countryCode, setCountryCode] = useState('SA');
 const [country, setCountry] = useState(KSA);
 const [showPicker, setShowPicker] = useState(false);
 const onSelect = (country) => {
  setCountryCode(country?.cca2);
  setCountry(country);
  setShowPicker(false);
 };
 return (
  <View style={styles.container}>
   <PickerInputRound
    // title={'Select you country'}
    value={country?.cca2}
    flag={country?.flag}
    onPress={() => setShowPicker(true)}
   />
   <CountryPicker
    {...{
     countryCode,
     withFilter: true,
     withFlag: true,
     withCountryNameButton: true,
     withAlphaFilter: true,
     withCallingCode: true,
     withEmoji: false,
     onSelect,
    }}
    renderFlagButton={() => null}
    onClose={() => setShowPicker(false)}
    visible={showPicker}
   />
  </View>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: {},
});

//make this component available to the app
export default CountryPickerInput;
