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
import fonts from '../../../theme/fonts';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Inputchangepassword} from '../../../components/Input/Input';
import {CommonActions} from '@react-navigation/routers';

import colors from '../../../theme/colors';
import {Header, Badge, Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {updatePassword} from '../../../redux/actions/auth';
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
  Visible_multicolored,
} from '../../../assets';

import {GradientButton} from '../../../components/GradientButton';
import {GradientGoogleButton} from '../../../components/GradientButton';
import {GradientfbButton} from '../../../components/GradientButton';
import {GradientsigninButton} from '../../../components/GradientButton';
//redux
import {signin, signin1} from '../../../redux/actions/auth';
import {connect} from 'react-redux';
import AlertModal from '../../../components/AlertModal';
import {Loading} from '../../../components/Loading';
import AsyncStorage from '@react-native-community/async-storage';

import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

const Changepassword = ({navigation, signin, route, updatePassword, user}) => {
  console.log('myuserdata', user);
  const onButtonPress = () => {
    alert('hello');
  };
  const [secure, setShow] = useState(true);
  const [secure1, setShow1] = useState(true);
  const [cnf, setCnf] = useState('');
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePress = async id => {
    if (!pass) {
      // setMsg('Kindly Enter New Password');
      // setShowAlert(true);
      alert('Kindly Enter New Password');
    } else if (!cnf) {
      // setMsg('Kindly Confirm Password');
      // setShowAlert(true);
      alert('Kindly Enter Confirm Password');
    } else if (cnf != pass) {
      // setMsg('Password did not match');
      // setShowAlert(true);
      alert('Password did not match');
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append('new_password', pass);

      const res = await updatePassword(formData, user.auth);
      if (res.data.status == true) {
        setMsg(res.data.message);
        setShowAlert(true);
      } else {
      }

      setLoading(false);
    }
  };

  function handleChange(event) {
    setLoading(false);
    setShowAlert(false);
    setCnf('');
    setPass('');
  }

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <Header
        containerStyle={{marginVertical: Platform.OS==='ios'?0:40}}
        backgroundColor={'transparent'}
        leftComponent={
          <View
            style={{flexDirection: 'row', width: 500, alignItems: 'center'}}>
            <Ionicons
              name={'chevron-back'}
              size={20}
              color={colors.secondary}
              onPress={() => {
                navigation.goBack();
              }}
              style={{alignSelf: 'center'}}
            />
            <View>
              <CustomText
                title={'Change password'}
                type={'large'}
                color={colors.secondary}
                style={{fontSize: 26, marginLeft: 10, fontWeight: 'bold'}}
              />
              <CustomText
                title={'Enter your new password below'}
                type={'medium'}
                color={'black'}
                style={{fontSize: 13, marginLeft: 10}}
              />
            </View>
          </View>
        }
      />
      <View style={{marginTop: 80}}>
        <Inputchangepassword
          keyboardType={'default'}
          isSecure={secure1}
          value={pass}
          placeholder={'New Password'}
          onChangeText={e => {
            setPass(e);
            console.log(e);
          }}
          right={Visible_multicolored}
          onRightIconPress={() => {
            setShow1(!secure1);
          }}
          // left={key}
        />
      </View>
      <View style={{marginTop: 20}}>
        <Inputchangepassword
          keyboardType={'default'}
          isSecure={secure}
          value={cnf}
          placeholder={'Confirm New Password'}
          onChangeText={e => {
            console.log(e);
            setCnf(e);
          }}
          // left={key}
          right={Visible_multicolored}
          onRightIconPress={() => {
            setShow(!secure);
          }}
        />
      </View>

      <View style={{marginTop: 30}}>
        <GradientsigninButton
          title="Update Password"
          // iconRight={arrowright}
          onButtonPress={() => {
            handlePress(1);
          }}
        />
      </View>
      <Loading visible={loading} />
      {showAlert && (
        <AlertModal
          heading={msg}
          button1="OK"
          form={true}
          onOkPress={() => {
            handleChange();
          }}
        />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  console.log('userphotos', state);
  const {user} = state.auth;
  return {user};
};
export default connect(mapStateToProps, {
  updatePassword,
})(Changepassword);
