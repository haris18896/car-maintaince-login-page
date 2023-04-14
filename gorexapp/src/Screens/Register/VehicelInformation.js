//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import FullButton from '../../Components/Buttons/FullButton';
import FormElement from '../../Components/FormEelement';
import Header from '../../Components/Header/Header';
import Loader from '../../Components/Loader';

import { BLACK, WHITE } from '../../constants/colors';
import { PoppinsRegular } from '../../constants/fonts';
import { getUser } from '../../utils/common';
import { hp, responsiveFontSize, wp } from '../../utils/responsiveSizes';

import { addVehicle, getVhicleForm } from './RegistrationActions';

// create a component
const VehicleInformation = () => {
 const navigation = useNavigation();
 const [loading, setLoading] = useState(false);
 const [state, setState] = useState({
  fields: [],
  errorMessages: {},
 });

 const dispatch = useDispatch();
 useEffect(() => {
  setLoading(true);
  dispatch(getVhicleForm()).then((res) => {
   setTimeout(() => {
    setLoading(false);
   }, 2000);
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

 const registerVhicle = async () => {
  let data = {};
  const user = await getUser();
  data.user = user?.id;

  state?.fields?.forEach((field) => {
   data[field?.xmlName] = field?.value;
  });
  dispatch(addVehicle(data)).then((res) => {
   if (res?.payload?._id) {
    navigation?.goBack();
   }
  });
 };

 return (
  <View style={styles.container}>
   <Header title={'Add Vehicle'} />
   {/* <PagerIndicator page={2} /> */}
   <ScrollView style={styles.content}>
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
    <View style={styles.buttonContainer}>
     <FullButton
      // onPress={() => navigation.navigate('OTP')}
      onPress={() => registerVhicle()}
      title={'Add Vehicle'}
     />
    </View>
    <Text style={styles.bottomText}>
     By continuing, you agree to Grow’s Terms of Service and Privacy Policy
    </Text>
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
  paddingHorizontal: wp(22),
  marginTop: hp(10),
 },
 buttonContainer: {
  marginTop: hp(30),
 },
 bottomText: {
  marginTop: hp(30),
  textAlign: 'center',
  fontSize: responsiveFontSize(13),
  textAlign: 'left',
  fontFamily: PoppinsRegular,
  color: BLACK,
 },
});

//make this component available to the app
export default VehicleInformation;
