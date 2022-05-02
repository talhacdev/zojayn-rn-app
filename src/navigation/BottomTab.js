import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Header, Badge} from 'react-native-elements';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
import colors from '../theme/colors';
import {Messages_active} from '../assets';
//classes
import React, {useState, useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View, Image, AppState} from 'react-native';
// import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Svg, {
  Ellipse,
  G,
  Path,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  Circle,
} from 'react-native-svg';
//icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Collection from '../screens/Auth/Filters1/Filters1';
import Articles from '../screens/App/Articles';
import Messages from '../screens/App/Messages';
import Settings from '../screens/App/Settings';
import TopTab from '../screens/App/MyDashboard/MyDashboard';
import PushNotification from 'react-native-push-notification';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
const INITIAL_ROUTE_NAME = 'settings';
import {article, dashboard, collection, chat, settings} from '../assets';
import {connect} from 'react-redux';
import {logoutSuccess, updateuserinfo} from '../redux/actions/auth';
import {storeurl} from '../redux/actions/storeurl';

function BottomTabNavigator({
  navigation,
  route,
  user,
  logoutSuccess,
  updateuserinfo,
}) {
  const [position, setPosition] = useState(new Animated.Value(2));
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [index, setIndex] = useState(2);
  const [routes, setRoutes] = useState([
    {key: 'setting', title: 'Setting'},
    {key: 'collection', title: 'Collection'},
    {key: 'dashboard', title: 'Dashboard'},
    {key: 'articles', title: 'Articles'},
    {key: 'messages', title: 'Messages'},
  ]);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  // //Push Notification Work Start
  // // Must be outside of any component LifeCycle (such as `componentDidMount`).
  // PushNotification.configure({
  //   // (optional) Called when Token is generated (iOS and Android)
  //   onRegister: function (token) {
  //     console.log('TOKEN:', token);
  //   },

  //   // (required) Called when a remote is received or opened, or local notification is opened
  //   onNotification: function (notification) {
  //     PushNotification.localNotification({
  //       channelId: '2223',
  //       color: 'black',
  //       autoCancel: true,
  //       title: notification.title,
  //       message: notification.message,
  //       vibrate: true,
  //       vibration: 300,
  //       playSound: true,
  //       soundName: 'default',
  //       actions: ['View'],
  //       invokeApp: false,
  //     });

  //     // process the notification
  //   },

  //   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  //   onAction: function (notification) {
  //     console.log('ACTION:', notification.action);
  //     console.log('NOTIFICATION:', notification);

  //     // process the action
  //   },

  //   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  //   onRegistrationError: function (err) {
  //     console.error(err.message, err);
  //   },

  //   // IOS ONLY (optional): default: all - Permissions to register.
  //   permissions: {
  //     alert: true,
  //     badge: true,
  //     sound: true,
  //   },
  //   popInitialNotification: true,
  //   requestPermissions: true,
  // });
  // //Push Notification Work End
  const renderIcon = (route, focused, color) => {
    console.log('route key ==>', route);
    switch (route.key) {
      case 'setting':
        return (
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 77.351 64.976">
            <G
              id="Group_7879"
              data-name="Group 7879"
              transform="translate(-102.256 -2831.688)">
              <Path
                id="Path_2538"
                data-name="Path 2538"
                d="M340.535,289.619h10.829a3.868,3.868,0,1,0,0-7.735H340.535a3.868,3.868,0,0,0,0,7.735Z"
                transform="translate(-175.624 2560.633)"
                fill="#f14d74"
              />
              <Path
                id="Path_2539"
                data-name="Path 2539"
                d="M322.646,281.884H302.535a3.868,3.868,0,1,0,0,7.735h20.111a3.868,3.868,0,1,0,0-7.735Z"
                transform="translate(-196.411 2560.633)"
                fill="#f14d74"
              />
              <Path
                id="Path_2540"
                data-name="Path 2540"
                d="M313.364,304.884H302.535a3.868,3.868,0,0,0,0,7.735h10.829a3.868,3.868,0,0,0,0-7.735Z"
                transform="translate(-196.411 2573.215)"
                fill="#f14d74"
              />
              <Path
                id="Path_2541"
                data-name="Path 2541"
                d="M354.646,304.884H334.535a3.868,3.868,0,1,0,0,7.735h20.111a3.868,3.868,0,0,0,0-7.735Z"
                transform="translate(-178.906 2573.215)"
                fill="#f14d74"
              />
              <Path
                id="Path_2542"
                data-name="Path 2542"
                d="M322.364,297.884a14.7,14.7,0,1,0,14.7,14.7A14.7,14.7,0,0,0,322.364,297.884Zm0,21.658a6.962,6.962,0,1,1,6.962-6.962A6.969,6.969,0,0,1,322.364,319.542Z"
                transform="translate(-191.487 2569.386)"
                fill="#8a2eff"
              />
              <Path
                id="Path_2543"
                data-name="Path 2543"
                d="M335.364,274.884a14.7,14.7,0,1,0,14.7,14.7A14.7,14.7,0,0,0,335.364,274.884Zm0,21.658a6.962,6.962,0,1,1,6.962-6.962A6.969,6.969,0,0,1,335.364,296.542Z"
                transform="translate(-184.376 2556.804)"
                fill="#8a2eff"
              />
            </G>
          </Svg>
        );

      case 'collection':
        return (
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 81.05 81.208">
            <G
              id="Group_7878"
              data-name="Group 7878"
              transform="translate(-389.9 -2824.142)">
              <G id="Group_7874" data-name="Group 7874">
                <Path
                  id="Path_2583"
                  data-name="Path 2583"
                  d="M706.519,404.907a6.525,6.525,0,0,1,4.509-6.2,6.522,6.522,0,1,0,0,12.41,6.524,6.524,0,0,1-4.509-6.2Z"
                  transform="translate(-264.22 2462.365)"
                  fill="#c2d9ef"
                />
                <Path
                  id="Path_2584"
                  data-name="Path 2584"
                  d="M654.464,699.841a1.134,1.134,0,0,1-1.134-1.134,8.062,8.062,0,0,0-8.053-8.053h-1.7a8.062,8.062,0,0,0-8.053,8.053,1.134,1.134,0,1,1-2.269,0,10.333,10.333,0,0,1,10.322-10.322h1.7A10.333,10.333,0,0,1,655.6,698.707,1.134,1.134,0,0,1,654.464,699.841Z"
                  transform="translate(-198.907 2188.812)"
                  fill="#f14d74"
                  stroke="#f14d74"
                  stroke-width="2"
                />
                <Path
                  id="Path_2585"
                  data-name="Path 2585"
                  d="M700.909,393.7a7.656,7.656,0,1,1,7.656-7.656A7.665,7.665,0,0,1,700.909,393.7Zm0-13.044a5.388,5.388,0,1,0,5.388,5.388A5.394,5.394,0,0,0,700.909,380.654Z"
                  transform="translate(-255.505 2481.23)"
                  fill="#8a2eff"
                  stroke="#8a2eff"
                  stroke-width="1"
                />
                <Path
                  id="Path_2583-2"
                  data-name="Path 2583"
                  d="M704.822,402.158a3.774,3.774,0,0,1,2.608-3.589,3.773,3.773,0,1,0,0,7.179,3.774,3.774,0,0,1-2.608-3.589Z"
                  transform="translate(-278.801 2463.365)"
                  fill="#c2d9ef"
                />
                <Path
                  id="Path_2584-2"
                  data-name="Path 2584"
                  d="M645.523,695.012a.656.656,0,0,1-.656-.656,4.664,4.664,0,0,0-4.659-4.659h-.984a4.664,4.664,0,0,0-4.659,4.659.656.656,0,1,1-1.312,0,5.978,5.978,0,0,1,5.971-5.971h.984a5.978,5.978,0,0,1,5.971,5.971A.656.656,0,0,1,645.523,695.012Z"
                  transform="translate(-211.833 2182.879)"
                  fill="#f14d74"
                  stroke="#f14d74"
                  stroke-width="2"
                />
                <Path
                  id="Path_2585-2"
                  data-name="Path 2585"
                  d="M697.682,387.243a4.429,4.429,0,1,1,4.429-4.429A4.434,4.434,0,0,1,697.682,387.243Zm0-7.546a3.117,3.117,0,1,0,3.117,3.117A3.12,3.12,0,0,0,697.682,379.7Z"
                  transform="translate(-269.864 2482.709)"
                  fill="#8a2eff"
                  stroke="#8a2eff"
                  stroke-width="1"
                />
                <Path
                  id="Path_2594"
                  data-name="Path 2594"
                  d="M487.055,1129.945V1106.2a15.83,15.83,0,0,1,15.83-15.83h-9.5a15.83,15.83,0,0,0-15.83,15.83v23.745a15.83,15.83,0,0,0,15.83,15.83h9.5A15.83,15.83,0,0,1,487.055,1129.945Z"
                  transform="translate(-71.826 1756.409)"
                  fill="#cee1f2"
                />
                <Path
                  id="Path_2595"
                  data-name="Path 2595"
                  d="M439.806,1028.856H409.412a19.018,19.018,0,0,1-19-19V986.115a19.018,19.018,0,0,1,19-19h30.394a19.018,19.018,0,0,1,19,19v23.745A19.018,19.018,0,0,1,439.806,1028.856Zm-30.394-55.4a12.678,12.678,0,0,0-12.664,12.664v23.745a12.678,12.678,0,0,0,12.664,12.664h30.394a12.678,12.678,0,0,0,12.664-12.664V986.115a12.678,12.678,0,0,0-12.664-12.664Zm-25.328,25v-31.81a12.678,12.678,0,0,1,12.664-12.664h30.394a12.682,12.682,0,0,1,10.407,5.448,3.166,3.166,0,1,0,5.2-3.614,19.016,19.016,0,0,0-15.607-8.166H396.748a19.018,19.018,0,0,0-19,19v31.81a3.166,3.166,0,1,0,6.332,0Z"
                  transform="translate(12.148 1876.494)"
                  fill="#8a2eff"
                />
              </G>
            </G>
          </Svg>
        );
      case 'dashboard':
        return (
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 78.961 78.949">
            <G
              id="Group_7875"
              data-name="Group 7875"
              transform="translate(-680.52 -2823)">
              <Path
                id="Path_2597"
                data-name="Path 2597"
                d="M1083.392,676.912a15.423,15.423,0,0,1-14.073-15.362V635.6a15.422,15.422,0,0,1,6.069-12.262l20.974-16a15.422,15.422,0,0,1,18.705,0l1.419,1.082a15.4,15.4,0,0,0-10.871,3.082l-24.944,19.025a5.334,5.334,0,0,0-2.1,4.241v30.944a15.378,15.378,0,0,0,4.82,11.2Z"
                transform="translate(-385.714 2221.894)"
                fill="#cee1f2"
              />
              <Path
                id="Path_2598"
                data-name="Path 2598"
                d="M1109.773,663.2h-41.948a18.527,18.527,0,0,1-18.506-18.506V618.746a18.613,18.613,0,0,1,7.283-14.715l20.974-16a18.551,18.551,0,0,1,22.446,0l20.974,16a18.613,18.613,0,0,1,7.283,14.715V644.7A18.527,18.527,0,0,1,1109.773,663.2ZM1088.8,590.419a12.321,12.321,0,0,0-7.482,2.52l-20.974,16a12.409,12.409,0,0,0-4.855,9.81V644.7a12.352,12.352,0,0,0,12.338,12.338h41.948a12.352,12.352,0,0,0,12.338-12.338V618.746a12.408,12.408,0,0,0-4.855-9.81l-20.974-16A12.324,12.324,0,0,0,1088.8,590.419Z"
                transform="translate(-368.799 2238.746)"
                fill="#8a2eff"
              />
              <Circle
                id="Ellipse_343"
                data-name="Ellipse 343"
                cx="4.888"
                cy="4.888"
                r="4.888"
                transform="translate(706.216 2857.587)"
                fill="none"
                stroke="#f14d74"
                stroke-miterlimit="10"
                stroke-width="4"
              />
              <Circle
                id="Ellipse_344"
                data-name="Ellipse 344"
                cx="4.888"
                cy="4.888"
                r="4.888"
                transform="translate(723.926 2857.587)"
                fill="none"
                stroke="#f14d74"
                stroke-miterlimit="10"
                stroke-width="4"
              />
              <Circle
                id="Ellipse_345"
                data-name="Ellipse 345"
                cx="4.888"
                cy="4.888"
                r="4.888"
                transform="translate(706.216 2874.155)"
                fill="none"
                stroke="#f14d74"
                stroke-miterlimit="10"
                stroke-width="4"
              />
              <Circle
                id="Ellipse_346"
                data-name="Ellipse 346"
                cx="4.888"
                cy="4.888"
                r="4.888"
                transform="translate(723.926 2874.155)"
                fill="none"
                stroke="#f14d74"
                stroke-miterlimit="10"
                stroke-width="4"
              />
            </G>
          </Svg>
        );
      case 'articles':
        return (
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 68.63 82.874">
            <G
              id="Group_7876"
              data-name="Group 7876"
              transform="translate(-971.687 -2823)">
              <Path
                id="Path_2586"
                data-name="Path 2586"
                d="M-466.555,137.363V93.323a16.16,16.16,0,0,1,16.141-16.18h-9.828a16.186,16.186,0,0,0-16.186,16.186v44.027a16.186,16.186,0,0,0,16.186,16.186h9.828a16.16,16.16,0,0,1-16.141-16.18Z"
                transform="translate(1451.191 2749.094)"
                fill="#c2d9ef"
              />
              <Ellipse
                id="Ellipse_342"
                data-name="Ellipse 342"
                cx="4.138"
                cy="4.138"
                rx="4.138"
                ry="4.138"
                transform="translate(990.829 2853.403)"
                fill="#f14d74"
              />
              <Path
                id="Path_2587"
                data-name="Path 2587"
                d="M-446.219,140.017h-29.79a19.442,19.442,0,0,1-19.42-19.42V76.563a19.442,19.442,0,0,1,19.42-19.42h29.79a19.442,19.442,0,0,1,19.42,19.42V120.6A19.442,19.442,0,0,1-446.219,140.017Zm-29.79-76.4a12.96,12.96,0,0,0-12.946,12.946V120.6a12.961,12.961,0,0,0,12.946,12.946h29.79A12.961,12.961,0,0,0-433.273,120.6V76.563a12.961,12.961,0,0,0-12.946-12.946Z"
                transform="translate(1467.116 2765.857)"
                fill="#8a2eff"
              />
              <Path
                id="Path_2588"
                data-name="Path 2588"
                d="M-259.6,157.214h-5.5a11.343,11.343,0,0,1-11.331-11.33v-5.5a3.237,3.237,0,0,1,3.237-3.237,3.237,3.237,0,0,1,3.237,3.237v5.5a4.861,4.861,0,0,0,4.856,4.856h5.5a3.237,3.237,0,0,1,3.237,3.237A3.237,3.237,0,0,1-259.6,157.214Z"
                transform="translate(1283.564 2698.806)"
                fill="#8a2eff"
              />
              <Path
                id="Path_2589"
                data-name="Path 2589"
                d="M-354.854,418.617h-22.337a3.237,3.237,0,0,1-3.237-3.237,3.237,3.237,0,0,1,3.237-3.237h22.337a3.237,3.237,0,0,1,3.237,3.237A3.237,3.237,0,0,1-354.854,418.617Z"
                transform="translate(1370.73 2468.319)"
                fill="#f14d74"
              />
              <Path
                id="Path_2590"
                data-name="Path 2590"
                d="M-354.854,341.617h-22.337a3.237,3.237,0,0,1-3.237-3.237,3.237,3.237,0,0,1,3.237-3.237h22.337a3.237,3.237,0,0,1,3.237,3.237A3.237,3.237,0,0,1-354.854,341.617Z"
                transform="translate(1370.73 2532.855)"
                fill="#f14d74"
              />
            </G>
          </Svg>
        );

      case 'messages':
        return (
          <View
            style={{
              height: 50,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={Messages_active}
              style={{height: 25, width: 30}}
            />
            {/* <Badge
              status="error"
              value="2"
              containerStyle={{position: 'absolute', top: 2, right: 2}}
            /> */}
          </View>
          // <Svg
          //   xmlns="http://www.w3.org/2000/svg"
          //   width="30"
          //   height="30"
          //   viewBox="0 0 84.397 67.41">
          //   <G
          //     id="Group_7877"
          //     data-name="Group 7877"
          //     transform="translate(-1252 -2831)">
          //     <Path
          //       id="Path_2591"
          //       data-name="Path 2591"
          //       d="M-115.354,759.254V738.731A19.536,19.536,0,0,1-95.818,719.2H-107.54a19.536,19.536,0,0,0-19.536,19.536v20.523a19.536,19.536,0,0,0,19.536,19.536h11.722a19.537,19.537,0,0,1-19.536-19.537Z"
          //       transform="translate(1382.983 2115.712)"
          //       fill="#cee1f2"
          //     />
          //     <Path
          //       id="Path_2592"
          //       data-name="Path 2592"
          //       d="M-86.122,766.605h-37.51a23.47,23.47,0,0,1-23.444-23.444V722.639A23.47,23.47,0,0,1-123.632,699.2h37.51a23.47,23.47,0,0,1,23.444,23.444v20.523a23.47,23.47,0,0,1-23.444,23.443Zm-37.51-59.6a15.647,15.647,0,0,0-15.629,15.629v20.523a15.647,15.647,0,0,0,15.629,15.629h37.51a15.647,15.647,0,0,0,15.629-15.629V722.639A15.647,15.647,0,0,0-86.122,707.01Z"
          //       transform="translate(1399.076 2131.805)"
          //       fill="#8a2eff"
          //     />
          //     <Path
          //       id="Path_2593"
          //       data-name="Path 2593"
          //       d="M-40.507,842.939A20.259,20.259,0,0,1-52.7,838.89l-12.818-9.612a3.907,3.907,0,0,1-.782-5.47,3.907,3.907,0,0,1,5.47-.782L-48,832.642a12.523,12.523,0,0,0,14.987,0l12.827-9.619a3.907,3.907,0,0,1,5.47.782,3.907,3.907,0,0,1-.782,5.47l-12.822,9.616a20.25,20.25,0,0,1-12.183,4.045Z"
          //       transform="translate(1334.707 2032.795)"
          //       fill="#f14d74"
          //     />
          //   </G>
          // </Svg>
        );

      default:
        return;
    }
  };

  // Notification starts here
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getfcmToken();
    }
  }
  const getfcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(`the old token`, fcmToken);
    if (!fcmToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log(`the new generated token `, fcmToken);
          await AsyncStorage.setItem('fcmToken');
        }
      } catch (error) {
        console.log(`error raised in fcm token`, error);
      }
    }
  };
  const notificationListener = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });
    messaging().onMessage(async remoteMessage => {
      // if (remoteMessage.data.name) {
      //   navigation.navigate(CreateCart);
      // }
      console.log(`received in foreground`, remoteMessage.data.name);
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }

        // if (remoteMessage.data.name) {
        //   navigation.navigate(CreateCart);
        // }
        // console.log(`received`, remoteMessage);
      });
  };
  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);
  // Notification ends here

  // useEffect(() => {
  //   // Get the device token
  //   messaging()
  //     .getToken()
  //     .then(token => {
  //       console.log(token);
  //       return true;
  //     });
  //   //Push Handle
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });
  // }, []);

  if (user != undefined) {
    const formData = new FormData();
    formData.append('id', user.id);

    (async () => {
      try {
        const res = await axios.post(`${storeurl}api/getuserrecord`, formData);
        console.log('testing1', res);
        if (res.data.status == 'ban') {
          // const res = await logoutSuccess();
          // navigation.navigate('Login');
          // console.log("testing","banned");
        } else {
          if (res.data.data.auth == user.auth) {
            // console.log("testing","Auth is matched");
          } else {
            // console.log("testing","Auth didnt matched",res.data);
            // const res = await updateuserinfo(a);
          }
        }
      } catch (err) {
        console.log('testing', err);
      }
    })();

    console.log('myuserq', user);

    const myonlinereference = database().ref(`/online/` + user.id);
    myonlinereference.transaction(userexists => {
      if (userexists === null) {
        myonlinereference
          .set({
            onlinestatus: 'Online',
            lastonline: new Date().getTime(),
          })
          .then(() => console.log(''));
      } else {
        console.log('helog', 'record exits');
      }
    });

    // Remove the node whenever the client disconnects
    myonlinereference
      .onDisconnect()
      .update({
        onlinestatus: 'Offline',
        lastonline: new Date().getTime(),
      })
      .then(() => console.log(''));

    if (appStateVisible == 'background') {
      myonlinereference
        .update({
          onlinestatus: 'Offline',
          lastonline: new Date().getTime(),
        })
        .then(() => console.log(''));
    } else if (appStateVisible == 'active') {
      myonlinereference
        .update({
          onlinestatus: 'Online',
          lastonline: new Date().getTime(),
        })
        .then(() => console.log(''));
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 2}}>
      <TabView
        tabBarPosition="bottom"
        renderTabBar={props => (
          <TabBar
            renderIcon={({route, focused, color}) =>
              renderIcon(route, focused, color)
            }
            renderLabel={({route, focused, color}) => <></>}
            {...props}
            activeColor={colors.primary}
            inactiveColor={colors.gray}
            style={styles.tabBar}
            indicatorStyle={{backgroundColor: colors.primary}}
          />
        )}
        navigationState={{index, routes}}
        renderScene={SceneMap({
          setting: Settings,
          collection: Collection,
          dashboard: TopTab,
          articles: Articles,
          messages: Messages,
        })}
        style={{backgroundColor: colors.white}}
        position={position}
        onIndexChange={index => setIndex(index)}
      />
    </View>
  );
}

const mapStateToProps = state => {
  const {user} = state.auth;
  return {user};
};
export default connect(mapStateToProps, {logoutSuccess, updateuserinfo})(
  BottomTabNavigator,
);

const styles = StyleSheet.create({
  tabBarWrapper: {
    backgroundColor: colors.white,
    flex: 1,
  },
  tabBar: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  bottomIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
});
