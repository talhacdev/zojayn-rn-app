import React, {useReducer, useState, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import Button from '../../../components/Button';
import CustomText from '../../../components/Text';
import Modal from 'react-native-modal';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Input} from '../../../components/Input/Input';
import {CommonActions} from '@react-navigation/routers';

import colors from '../../../theme/colors';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//logo
import {
  logo_blue,
  google,
  fb,
  logout,
  eye,
  key,
  user,
  logocolored,
  arrowright,
  Facebook,
  Google,
  Google2,
  Signup_Signin,
} from '../../../assets';

import {GradientButton} from '../../../components/GradientButton';
import {GradientGoogleButton} from '../../../components/GradientButton';
import {GradientfbButton} from '../../../components/GradientButton';
import {GradientsigninButton} from '../../../components/GradientButton';
//redux
import {signin, signin1, signupwithfb} from '../../../redux/actions/auth';
import {connect} from 'react-redux';
import AlertModal from '../../../components/AlertModal';
import {Loading} from '../../../components/Loading';
import AsyncStorage from '@react-native-community/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Settings, LoginManager, Profile} from 'react-native-fbsdk-next';

import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

const AfterSplash = ({navigation, signin, route, signupwithfb}) => {
  const {width, height} = Dimensions.get('window');

  const signInG = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const formData = new FormData();
      formData.append('first_name', userInfo.user.givenName);
      formData.append('last_name', userInfo.user.familyName);
      formData.append('password', '');
      formData.append('email', userInfo.user.email);
      formData.append('firebase_uid', userInfo.user.id);
      console.log('myformdata', formData);
      new Promise((rsl, rej) => {
        signupwithfb(formData, rsl, rej);
      })
        .then(async res => {
          console.log('myresnew', res);

          if (res.isnew == 'no') {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Root'}],
              }),
            );
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Success', params: {from: 'signupsuccess'}}],
              }),
            );
          }
        })
        .catch(err => {
          // setMsg(err);
          // setShowAlert(true);
          // setLoading(false);
        });
    } catch (error) {
      console.log('myerror', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const signInF = () => {
    LoginManager.setLoginBehavior('WEB_ONLY');
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          const currentProfile = Profile.getCurrentProfile().then(function (
            currentProfile,
          ) {
            if (currentProfile) {
              const formData = new FormData();
              formData.append('first_name', currentProfile.firstName);
              formData.append('last_name', currentProfile.lastName);
              formData.append('password', '');
              formData.append('email', currentProfile.email);
              formData.append('firebase_uid', currentProfile.userID);
              new Promise((rsl, rej) => {
                signupwithfb(formData, rsl, rej);
              })
                .then(async res => {
                  console.log(res);
                  setLoading(false);
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{name: 'Root'}],
                    }),
                  );
                })
                .catch(err => {
                  setMsg(err);
                  setShowAlert(true);
                  setLoading(false);
                });
            }
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '903978324153-schcjrqo4dnmtp7l4rec9tb415aoialq.apps.googleusercontent.com',
    });
    Settings.initializeSDK();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white', height: height}}>
      <KeyboardAwareScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={logocolored} style={styles.logo_colored} />
        </View>
        <View style={{flex: 1, marginTop: 90}}>
          <View>
            <GradientsigninButton
              title="Sign up manually"
              iconLeft={Signup_Signin}
              onButtonPress={() => {
                navigation.navigate('Signup');
              }}
            />
          </View>
          <View style={{marginTop:Platform.OS==='ios'?-30: -20}}>
            <GradientfbButton
              title="Sign up with facebook"
              onButtonPress={() => {
                signInF();
              }}
            />
          </View>
          <View style={{marginTop:Platform.OS==='ios'?-5: 0}}>
            <GradientGoogleButton
              title="Sign up with google"
              iconLeft={Google2}
              onButtonPress={() => {
                signInG();
              }}
              iconRight={arrowright}
            />
          </View>
          <View style={{alignItems: 'center', marginTop:Platform.OS==='ios'?40: 30}}>
            <Text>Have an account already?</Text>
          </View>
          <View style={{marginTop:Platform.OS==='ios'?10:  20, marginBottom: 30}}>
            <GradientButton
              title="Sign in"
              iconLeft={Signup_Signin}
              onButtonPress={() => {
                navigation.navigate('Login');
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default connect(null, {signupwithfb})(AfterSplash);
