//import liraries
import React, { useEffect, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import HomeHeader from '../../Components/Header/HomeHeader';
import BottomBar from './components/BottomBar';
import { BranchPin, Locate, MyPin, Reload } from '../../assets';
import { BLUE } from '../../constants/colors';
import { hp, wp } from '../../utils/responsiveSizes';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import SideMenu from './components/SideMenu';
import { useDispatch } from 'react-redux';
import { getBranches, getBranchesByFilter } from './DashboardActions';
import Loader from '../../Components/Loader';

// create a component
const Dashboard = () => {
 const navigation = useNavigation();

 const dispatch = useDispatch();

 const focus = useIsFocused();

 const [coordinates, setCoordinates] = useState(null);
 const [showMenu, setShowMenu] = useState(false);
 const [branches, setBranches] = useState([]);
 const [loading, setLoading] = useState(true);
 const [reload, setReload] = useState(false);
 const mapRef = useRef();

 useEffect(() => {
  if (focus) {
   Geolocation.getCurrentPosition((location) => {
    setCoordinates({
     latitude: location?.coords.latitude,
     longitude: location?.coords.longitude,
    });
   });
   dispatch(getBranches()).then((res) => {
    setLoading(false);
    setBranches(res?.payload);
   });
  }
 }, [reload, focus]);

 const animateMap = () => {
  mapRef.current.animateToRegion({
   latitude: coordinates.latitude,
   longitude: coordinates.longitude,
   latitudeDelta: 0.0922,
   longitudeDelta: 0.0421,
  });
  setReload(!reload);
 };
 // const reloadMap = () => {
 //   Geolocation.getCurrentPosition(location => {
 //     mapRef.current.animateToRegion({
 //       latitude: location?.coords.latitude,
 //       longitude: location?.coords.longitude,
 //       latitudeDelta: 0.0922,
 //       longitudeDelta: 0.0421,
 //     });
 //     setCoordinates({
 //       latitude: location?.coords.latitude,
 //       longitude: location?.coords.longitude,
 //     });
 //   });
 // };
 const filterChanged = (id) => {
  setLoading(true);
  dispatch(
   getBranchesByFilter({
    id,
    lat: coordinates?.latitude,
    lon: coordinates?.longitude,
   })
  ).then((res) => {
   setLoading(false);
   setBranches(res?.payload);
  });
 };
 return (
  <View style={styles.container}>
   {coordinates && (
    <MapView
     ref={mapRef}
     provider={PROVIDER_GOOGLE}
     initialRegion={{
      latitude: coordinates?.latitude,
      longitude: coordinates?.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
     }}
     style={styles.map}
    >
     <MapView.Marker key={'1'} coordinate={coordinates}>
      <View style={styles.circle}>
       <Image source={MyPin} />
      </View>
     </MapView.Marker>
     {branches?.map((value, index) => (
      <MapView.Marker
       key={index}
       title={value?.title}
       onCalloutPress={() =>
        navigation.navigate('ServiceProviderDetails', {
         id: value?._id,
        })
       }
       coordinate={{
        latitude: Number(value?.location?.coordinates[0]),
        longitude: 73.75707118492694,
       }}
      >
       <View style={styles.circle}>
        <Image source={BranchPin} />
       </View>
      </MapView.Marker>
     ))}
    </MapView>
   )}
   <View style={styles.content}>
    <HomeHeader onPress={() => setShowMenu(!showMenu)} />
    <View style={styles.mapActions}>
     <TouchableOpacity
      // onPress={reloadMap}
      onPress={() => navigation.navigate('ServiceProviderDetails')}
      style={styles.mapAction}
     >
      <Image style={styles.locate} source={Reload} />
     </TouchableOpacity>
     <TouchableOpacity onPress={animateMap} style={styles.mapAction}>
      <Image style={styles.locate} source={Locate} />
     </TouchableOpacity>
    </View>

    <BottomBar filterChanged={filterChanged} />
   </View>
   <Loader visible={loading} />
   <SideMenu visible={showMenu} onClose={() => setShowMenu(false)} />
  </View>
 );
};

// define your styles
const styles = StyleSheet.create({
 container: { flex: 1 },
 content: { flex: 1 },
 map: {
  ...StyleSheet.absoluteFillObject,
 },
 mapActions: {
  position: 'absolute',
  bottom: hp(200),
  right: wp(20),
 },
 mapAction: {
  backgroundColor: BLUE,
  width: wp(47),
  height: wp(47),
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  marginBottom: hp(10),
 },
});

//make this component available to the app
export default Dashboard;
