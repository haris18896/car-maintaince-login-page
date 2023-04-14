// In App.js in a new project

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../Screens/Register/RegisterScreen';
import Onboardig1 from '../Screens/Onboarding/Onboarding-1';
import Onboardig2 from '../Screens/Onboarding/Onboarding-2';
import CountrySelection from '../Screens/Onboarding/CountrySelection';
import VehicleInformation from '../Screens/Register/VehicelInformation';
import Login from '../Screens/Login/LoginScreen';
import OTP from '../Screens/OTP/OTPScreen';
// import Dashboard from '../Screens/Dashboard/Dashboard';
import ServiceProviderDetails from '../Screens/ServiceProvider/ServiceProviderDetails';
import ProductsListing from '../Screens/ProductsAndServices/ProductsListing';
import ProductsListingSubCategory from '../Screens/ProductsAndServices/ProductsListingSubCategory';
import ProductDetails from '../Screens/ProductsAndServices/ProductDetails';
import ServicesListing from '../Screens/ProductsAndServices/ServicesListing';
import ServicesSubCategory from '../Screens/ProductsAndServices/ServicesSubCategory';
import PaymentMethod from '../Screens/ProductsAndServices/PaymentMethod';
import OrderDetails from '../Screens/ProductsAndServices/OrderDetails';
import Congratulations from '../Screens/ProductsAndServices/Congratulations';
import OrderHistory from '../Screens/ProductsAndServices/OrderHistory';
import PaymentHistory from '../Screens/Payments/PaymentHistory';
import { getToken } from '../utils/common';
import { useSelector } from 'react-redux';
import Scan from '../Screens/Scan/Scan';
import BarcodeScanner from '../Screens/Scan/Scanner';
import ProfileUpdate from '../Screens/Register/ProfileUpdate';
import ForgotPassword from '../Screens/ForgotPassword/ForgotPassword';
import ChangePassword from '../Screens/ ChangePassword/ChangePassword';

const Stack = createStackNavigator();

function Navigation() {
 const [loggedin, setLoggedIn] = React.useState(false);

 const token = useSelector((state) => state?.auth?.token);

 React.useEffect(() => {
  setTimeout(() => {
   getToken().then((tokens) => {
    if (tokens?.accessToken) {
     setLoggedIn(true);
    } else {
     setLoggedIn(false);
    }
   });
  }, 100);
 }, [token]);
 return (
  <NavigationContainer>
   <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!loggedin ? (
     // {false ? (
     <>
      <Stack.Screen name='Onboarding1' component={Onboardig1} />
      <Stack.Screen name='Onboarding2' component={Onboardig2} />
      <Stack.Screen name='CountrySelection' component={CountrySelection} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='OTP' component={OTP} />
     </>
    ) : (
     <>
      <Stack.Screen name='Scan' component={Scan} />
      <Stack.Screen name='OrderDetails' component={OrderDetails} />
      <Stack.Screen name='BarcodeScanner' component={BarcodeScanner} />
      <Stack.Screen name='ServicesListing' component={ServicesListing} />
      <Stack.Screen name='ProductDetails' component={ProductDetails} />
      <Stack.Screen
       name='ProductsListingSubCategory'
       component={ProductsListingSubCategory}
      />
      <Stack.Screen name='ProductsListing' component={ProductsListing} />
      <Stack.Screen
       name='ServiceProviderDetails'
       component={ServiceProviderDetails}
      />
      <Stack.Screen name='VehicleInformation' component={VehicleInformation} />
      <Stack.Screen name='Congratulations' component={Congratulations} />
      <Stack.Screen name='PaymentMethod' component={PaymentMethod} />
      <Stack.Screen
       name='ServicesSubCategory'
       component={ServicesSubCategory}
      />
      <Stack.Screen name='OrderHistory' component={OrderHistory} />
      <Stack.Screen name='PaymentHistory' component={PaymentHistory} />
      <Stack.Screen name='ProfileUpdate' component={ProfileUpdate} />
      <Stack.Screen name='ChangePassword' component={ChangePassword} />
     </>
    )}
   </Stack.Navigator>
  </NavigationContainer>
 );
}

export default Navigation;
