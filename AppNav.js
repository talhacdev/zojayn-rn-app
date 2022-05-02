import React, {useEffect, useState} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

//screens
import BottomTab from './src/navigation/BottomTab';

import {connect} from 'react-redux';
import Splash from './src/screens/Auth/Splash';
import AfterSplash from './src/screens/Auth/AfterSplash/AfterSplash';
import AccountInformation from './src/screens/Auth/AccountInformation/AccountInformation';
import UnlockProFeature from './src/screens/Auth/UnlockProFeature/UnlockProFeature';
import BankTransfer from './src/screens/Auth/BankTransfer/BankTransfer';
import NotificationAndPrivacy from './src/screens/Auth/NotificationAndPrivacy';
import DeleteAccount from './src/screens/Auth/DeleteAccount/DeleteAccount';
import MemberShipinfo from './src/screens/Auth/MemberShipInfo/MemberShipinfo';
import Filters1 from './src/screens/Auth/Filters1';
import Changepassword from './src/screens/Auth/Changepassword';
import SentRequest from './src/screens/Auth/SentRequest/SentRequest';
import Test from './src/screens/Auth/Test';
import Timeline from './src/screens/App/Timeline';
import Blockeduser from './src/screens/App/Blockeduser/Blockeduser';
import MyDashboard from './src/screens/App/MyDashboard/MyDashboard';
import SearchResult from './src/screens/App/SearchResult';
import ProfileImages from './src/screens/App/ProfileImages';
import Login from './src/screens/Auth/Login';
import Signup from './src/screens/Auth/Signup';
import OTP from './src/screens/Auth/Registration/OTP';
import Forget from './src/screens/Auth/ForgetPassword';
import Reset from './src/screens/Auth/Reset';
import Success from './src/screens/Auth/Success';
import DashBoard from './src/screens/App/Dashboard';
import Collection from './src/screens/App/Collections';
import Articles from './src/screens/App/Articles';
import Messages from './src/screens/App/Messages';
import Settings from './src/screens/App/Settings';
import SingleProfile from './src//screens/App/SignleProfile';
import ImageViewer from './src//screens/App/ImageViwer';
import ArticleDetail from './src//screens/App/ArticleDetail';
import Profile from './src//screens/App/Profile';
import Conversation from './src//screens/App/Messages/Conversation';
import AddPhotoVid from './src//screens/App/PhtotosVid';
import FAQs from './src//screens/App/FAQs';
import {LogBox} from 'react-native';
import AccountSettings from './src/screens/App/Settings/AccountSettings';
import Payment from './src/screens/App/PaymentMethods';
import Filters from './src/screens/App/Filters';
import TopTab from './src/screens/App/TopTab/TopTab';
import Paypal from './src/components/Paypal';
import Stripe from './src/components/Stripe';
LogBox.ignoreAllLogs();
function AppNav({route}) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Splash'}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false, animationEnabled: true}}
        />
          <Stack.Screen
          name="Test"
          component={Test}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="AccountInformation"
          component={AccountInformation}
          options={{headerShown: false, animationEnabled: true}}
        />
          <Stack.Screen
          name="Timeline"
          component={Timeline}
          options={{headerShown: false, animationEnabled: true}}
        />
          <Stack.Screen
          name="Blockeduser"
          component={Blockeduser}
          options={{headerShown: false, animationEnabled: true}}
        />
          <Stack.Screen
          name="MyDashboard"
          component={MyDashboard}
          options={{headerShown: false, animationEnabled: true}}
        />
          <Stack.Screen
          name="ProfileImages"
          component={ProfileImages}
          options={{headerShown: false, animationEnabled: true}}
        />
         <Stack.Screen
          name="SearchResult"
          component={SearchResult}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="AfterSplash"
          component={AfterSplash}
          options={{headerShown: false, animationEnabled: true}}
        />
          <Stack.Screen
          name="UnlockProFeature"
          component={UnlockProFeature}
          options={{headerShown: false, animationEnabled: true}}
        />
           <Stack.Screen
          name="BankTransfer"
          component={BankTransfer}
          options={{headerShown: false, animationEnabled: true}}
        />
             <Stack.Screen
          name="NotificationAndPrivacy"
          component={NotificationAndPrivacy}
          options={{headerShown: false, animationEnabled: true}}
        />
            <Stack.Screen
          name="DeleteAccount"
          component={DeleteAccount}
          options={{headerShown: false, animationEnabled: true}}
        />
            <Stack.Screen
          name="MemberShipinfo"
          component={MemberShipinfo}
          options={{headerShown: false, animationEnabled: true}}
        />
              <Stack.Screen
          name="Filters1"
          component={Filters1}
          options={{headerShown: false, animationEnabled: true}}
        />
            <Stack.Screen
          name="Changepassword"
          component={Changepassword}
          options={{headerShown: false, animationEnabled: true}}
        />
              <Stack.Screen
          name="SentRequest"
          component={SentRequest}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Forget"
          component={Forget}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Stripe"
          component={Stripe}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Reset"
          component={Reset}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Paypal"
          component={Paypal}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Root"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ArticleDetail"
          component={ArticleDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Collection"
          component={Collection}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Setting"
          component={Settings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Messages"
          component={Messages}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Single"
          component={SingleProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ImageViewer"
          component={ImageViewer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Conversation"
          component={Conversation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddPhotoVid"
          component={AddPhotoVid}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FAQs"
          component={FAQs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AccountSettings"
          component={AccountSettings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Articles"
          component={Articles}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Filters"
          component={Filters}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TopTab"
          component={TopTab}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const mapStateToProps = state => {
  const {isLoggedIn} = state.auth;
  return {
    isLoggedIn,
  };
};
export default connect(mapStateToProps)(AppNav);
