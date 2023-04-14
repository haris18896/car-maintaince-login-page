//import liraries

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
 View,
 StyleSheet,
 FlatList,
 Image,
 Text,
 TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { CarCare, Cart } from '../../assets';
import EmptyList from '../../Components/EmptyList';
import BackHeader from '../../Components/Header/BackHeader';
import SearchBar from '../../Components/Inputs/SearchBar';
import Loader from '../../Components/Loader';
import { BORDER_GRAYLIGHTEST, DARKBLUE, WHITE } from '../../constants/colors';
import { SFProDisplayMedium } from '../../constants/fonts';
import { responsiveFontSize, wp } from '../../utils/responsiveSizes';
import { getCategories } from '../ServiceProvider/ServiceProviderActions';
import BottomBar from './ components/BottomBar';
import TabBar from './ components/TabBar';

// create a component
const ProductsListing = ({ route }) => {
 const navigation = useNavigation();
 const id = route?.params?.id;
 const title = route?.params?.title;
 const branch = route?.params?.branch;
 const dispatch = useDispatch();

 const [categories, setCategories] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  setLoading(true);
  dispatch(getCategories(branch?._id)).then((res) => {
   setTimeout(() => {
    setLoading(false);
   }, 1000);
   setCategories(res?.payload);
  });
 }, []);

 return (
  <View style={styles.container}>
   <BackHeader rightIcon={Cart} title={title} />
   <TabBar branch={branch} active={1} />
   <View style={styles.paddedContent}>
    <SearchBar />
    {!loading && (
     <FlatList
      data={categories}
      style={styles.list}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapperStyle}
      renderItem={({ item }) => (
       <TouchableOpacity
        onPress={() =>
         navigation.navigate('ProductsListingSubCategory', {
          category: item,
          title,
          id,
          branch,
         })
        }
        style={styles.product}
       >
        <Image style={styles.productImage} source={CarCare} />
        <Text style={styles.title}>{item?.name}</Text>
       </TouchableOpacity>
      )}
      ListEmptyComponent={EmptyList}
     />
    )}
   </View>
   <BottomBar />
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
 paddedContent: {
  paddingHorizontal: wp(14),
  flex: 1,
 },
 columnWrapperStyle: {
  justifyContent: 'space-between',
 },
 product: {
  width: wp(167),
  minHeight: wp(117),
  borderWidth: 1,
  borderColor: BORDER_GRAYLIGHTEST,
  marginBottom: 4,
  justifyContent: 'center',
  alignItems: 'center',
 },
 productImage: {
  height: wp(90),
  width: wp(90),
 },
 list: {
  flex: 1,
 },
 title: {
  textAlign: 'left',
  fontFamily: SFProDisplayMedium,
  fontSize: responsiveFontSize(16),
  color: DARKBLUE,
  marginTop: 2,
 },
});

//make this component available to the app
export default ProductsListing;
