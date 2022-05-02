import React, {useEffect} from 'react';
import {Text, View, Image, ImageBackground, StyleSheet} from 'react-native';
import {logo, bg, logo_blue, SplashImage} from '../../../assets';
import styles from './styles';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/routers';
import Svg, {
  Ellipse,
  G,
  Path,
  Rect,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const Splash = ({navigation, isLoggedIn, from}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
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
            routes: [{name: 'AfterSplash'}],
          }),
        );
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return <ImageBackground style={styles.main} source={SplashImage} />;
};
const mapStateToProps = state => {
  const {isLoggedIn} = state.auth;
  return {isLoggedIn};
};
export default connect(mapStateToProps)(Splash);
