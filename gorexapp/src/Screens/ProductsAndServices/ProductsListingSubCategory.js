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
import { Cart, Wheel } from '../../assets';
import EmptyList from '../../Components/EmptyList';
import BackHeader from '../../Components/Header/BackHeader';
import SearchBar from '../../Components/Inputs/SearchBar';
import Loader from '../../Components/Loader';
import {
 BORDER_GRAYLIGHTEST,
 DARKBLUE,
 GREEN,
 WHITE,
} from '../../constants/colors';
import { SFProDisplayMedium } from '../../constants/fonts';
import { hp, responsiveFontSize, wp } from '../../utils/responsiveSizes';
import { getProducts } from '../ServiceProvider/ServiceProviderActions';
import BottomBar from './ components/BottomBar';
import TabBar from './ components/TabBar';

// create a component
const ProductsListingSubCategory = ({ route }) => {
 const navigation = useNavigation();
 const title = route?.params?.title;
 const branch = route?.params?.branch;
 const category = route?.params?.category;
 const dispatch = useDispatch();

 const [products, setProducts] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  dispatch(getProducts({ branch: branch?._id, category: category?._id })).then(
   (res) => {
    setLoading(false);
    setProducts(res?.payload?.data);
   }
  );
 }, []);
 return (
  <View style={styles.container}>
   <BackHeader rightIcon={Cart} title={title} />
   <TabBar branch={branch} active={1} />
   <View style={styles.paddedContent}>
    <SearchBar />
    {!loading && (
     <FlatList
      data={products}
      style={styles.list}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapperStyle}
      renderItem={({ item }) => (
       <TouchableOpacity
        onPress={() =>
         navigation.navigate('ProductDetails', {
          product: item,
          title,
          branch,
         })
        }
        style={styles.product}
       >
        <Image style={styles.productImage} source={Wheel} />
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.price}>{item?.price} SAR</Text>
       </TouchableOpacity>
      )}
      ListEmptyComponent={EmptyList}
     />
    )}
   </View>
   <Loader visible={loading} />
   <BottomBar />
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
  paddingVertical: hp(10),
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
 price: {
  textAlign: 'left',
  fontFamily: SFProDisplayMedium,
  fontSize: responsiveFontSize(18),
  color: GREEN,
  marginTop: hp(20),
 },
});

//make this component available to the app
export default ProductsListingSubCategory;
