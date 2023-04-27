import React from "react";

import { useNetInfo } from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import Register from "../Screens/Register";
import OnBoarding from "../Screens/Onboarding";
import SelectAuth from "../Screens/Onboarding/SelectAuth";
import VehicleInformation from "../Screens/VehicleAddUpdate";
import Login from "../Screens/Login/LoginScreen";
import OTP from "../Screens/OTP/OTPScreen";
import Dashboard from "../Screens/Dashboard/Dashboard";
import ServiceProviderDetails from "../Screens/ServiceProvider/ServiceProviderDetails";
import ProductsListing from "../Screens/ProductsAndServices/ProductsListing";
import ProductsListingSubCategory from "../Screens/ProductsAndServices/ProductsListingSubCategory";
import ProductDetails from "../Screens/ProductsAndServices/ProductDetails";
import ServicesListing from "../Screens/ProductsAndServices/ServicesListing";
import ServicesSubCategory from "../Screens/ProductsAndServices/ServicesSubCategory";
import PaymentMethod from "../Screens/ProductsAndServices/PaymentMethod";
import OrderDetails from "../Screens/ProductsAndServices/OrderDetails";
import Congratulations from "../Screens/ProductsAndServices/Congratulations";
import OrderHistory from "../Screens/ProductsAndServices/OrderHistory";
import PaymentHistory from "../Screens/Payments/PaymentHistory";
import MyVehicles from "../Screens/MyVehicles";
import AddCard from "../Screens/Payments/AddCard";
import ProfileUpdate from "../Screens/ProfileUpdate/ProfileUpdate";
import TopUp from "../Screens/Payments/Topup";
import Complain from "../Screens/Complain/ComplainScreen";
import ForgotPassword from "../Screens/ForgotPassword/ForgotPassword";
import ResetPassword from "../Screens/ResetPassword/ResetPassword";
import ViewPayment from "../Screens/Payments/ViewPayment";
import Success from "../Screens/Payments/ViewPayment";
import UpdatePassword from "../Screens/UpdatePassword/UpdatePassword";
import OTPScreens from "../Screens/OffersScreen/Offers";
import Setting from "../Screens/Setting";
import Language from "../Screens/Language";
import SuccessVehicle from "../Screens/ProductsAndServices/SuccessVehicle";
import Country from "../Screens/Country";
import OfferData from "../Screens/OfferData";
import OfferDetail from "../Screens/OfferDetail";
import GorexSupport from "../Screens/GorexSupport";
import UpdateVehicle from "../Screens/ProductsAndServices/components/UpdateVehicle";
import PaymentOptions from "../Screens/Payments/PaymentOptions";
import NotificationScreen from "../Screens/NotificationScreen";
import SuccessCard from "../Screens/CardScreens/SuccessCard";
import RejectCard from "../Screens/CardScreens/RejectCard";
import TopUpCard from "../Screens/Payments/TopUpCard";
import TopUpSuccess from "../Screens/Payments/TopUpSuccess";
import OrderConfirmed from "../Screens/OrderConfirmed";
import SideMenu from "../Screens/Dashboard/components/SideMenu";
import GorexClub from "../Screens/GorexClub/GorexClub";
import GorexCards from "../Screens/GorexClub/GorexCards";
import { Splash } from "../Screens/Splash";
import {ForceUpdate} from "../Screens/ForceUpdate";

import { GoDPlaceOrder, GoDChooseVehicle, GoDChooseService, GoDOrderConfirmed, GoDChooseAddressAndSlot } from "../Screens";
import Slots from "../Screens/OnDemandFlow/Slots/Slots";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <SideMenu {...props} />}>
      <Drawer.Screen name="DashboardScreen" component={Dashboard} />
      <Drawer.Screen name="PaymentHistory" component={PaymentHistory} />
      <Drawer.Screen name="MyVehicles" component={MyVehicles} />
      <Drawer.Screen name="OrderHistory" component={OrderHistory} />
      <Drawer.Screen name="OfferData" component={OfferData} />
      <Drawer.Screen name="Setting" component={Setting} />
      <Drawer.Screen name="GorexSupport" component={GorexSupport} />
      <Drawer.Screen name="GorexCards" component={GorexCards}/>
    </Drawer.Navigator>
  );
}

function Navigation() {
  // const netInfo = useNetInfo();
  // if (netInfo?.isConnected && netInfo?.isInternetReachable)
  // if (netInfo?.isConnected)
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="SplashScreen" component={Splash} />
        <Stack.Screen name="ForceUpdate" component={ForceUpdate} />
        <Stack.Screen name="Onboarding" component={OnBoarding} />
        <Stack.Screen name="SelectAuth" component={SelectAuth} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="OTPScreens" component={OTPScreens} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPasswordSuccess" component={Success} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="Dashboard" component={MainDrawer} />
        <Stack.Screen name="ServicesListing" component={ServicesListing} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Country" component={Country} />
        <Stack.Screen name="UpdateVehicle" component={UpdateVehicle} />
        <Stack.Screen name="ProductsListingSubCategory" component={ProductsListingSubCategory}/>
        <Stack.Screen name="ProductsListing" component={ProductsListing} />
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
        <Stack.Screen name="ServiceProviderDetails" component={ServiceProviderDetails}/>
        <Stack.Screen name="VehicleInformation" component={VehicleInformation}/>
        <Stack.Screen name="Congratulations" component={Congratulations} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
        <Stack.Screen name="ServicesSubCategory" component={ServicesSubCategory}/>
        <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
        <Stack.Screen name="AddCard" component={AddCard} />
        <Stack.Screen name="TopUp" component={TopUp} />
        <Stack.Screen name="Complain" component={Complain} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="ViewPayment" component={ViewPayment} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="SuccessVehicle" component={SuccessVehicle} />
        <Stack.Screen name="OfferDetail" component={OfferDetail} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen}/>
        <Stack.Screen name="OrderConfirmed" component={OrderConfirmed} />
        <Stack.Screen name="PaymentOptions" component={PaymentOptions} />
        <Stack.Screen name="SuccessCard" component={SuccessCard} />
        <Stack.Screen name="RejectCard" component={RejectCard} />
        <Stack.Screen name="TopUpCard" component={TopUpCard} />
        <Stack.Screen name="TopUpSuccess" component={TopUpSuccess} />
        <Stack.Screen name="GorexClub" component={GorexClub} />
        <Stack.Screen name="GoDPlaceOrder" component={GoDPlaceOrder} />
        <Stack.Screen name="GoDChooseVehicle" component={GoDChooseVehicle} />
        <Stack.Screen name="GoDChooseService" component={GoDChooseService} />
        <Stack.Screen name="GoDOrderConfirmed" component={GoDOrderConfirmed} />
        <Stack.Screen name="GoDChooseAddressAndSlot" component={GoDChooseAddressAndSlot} />
        <Stack.Screen name="Slots" component={Slots} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  // return <NoInternet />;
}

export default Navigation;
