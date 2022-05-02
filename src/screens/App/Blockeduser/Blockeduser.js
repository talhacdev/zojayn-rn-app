import React, {useReducer, useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import Button from '../../../components/Button';

import CustomText from '../../../components/Text';
import {Header, Badge, Icon} from 'react-native-elements';
import {Input} from '../../../components/Input/Input';
import DateTimePicker from '@react-native-community/datetimepicker';

import {SocialButton} from '../../../components/SocialButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Feather from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
//google
import Textarea from 'react-native-textarea';
import Modal1 from '../../../components/Modal1';

import colors from '../../../theme/colors';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {updown} from '../../../assets';
import CustomModal from '../../../components/Modal';
import {
  logo_blue,
  google,
  fb,
  logout,
  eye,
  key,
  user,
  mail,
  call,
  calendar,
  map,
  health,
  heart,
  note,
  book,
  office,
  weigh,
  game,
  Circled_edit,
  Premium,
  Profile_pic_placeholder,
  Delete_multicolored_on,
  Circled_cancel,
  unblockuserbutton,
} from '../../../assets';
import {
  GradientButtonunblockuser,
  GradientButtonyellow,
} from '../../../components/GradientButton';
import {Loading} from '../../../components/Loading';
import {connect} from 'react-redux';
import {
  signInWithPhone,
  signup,
  updateAccount,
} from '../../../redux/actions/auth';
import {
  updateProfileIno,
  updateAdditionalIno,
  getallBlockuser,
} from '../../../redux/actions/auth';
import AlertModal from '../../../components/AlertModal';
import fonts from '../../../theme/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {storeurl} from '../../../redux/actions/storeurl';

const {height, width} = Dimensions.get('window');

//facebook
const Blockeduser = ({
  navigation,
  route,
  signInWithPhone,
  token,
  userData,
  updateAccount,
  updateProfileIno,
  updateAdditionalIno,
  getallBlockuser,
}) => {
  const [data, setdata] = useState('');
  const [blockeduser, setblockeduser] = useState('');
  const show = useRef(null);
  const from = route?.params?.from;
  const [phoneno, setPhone] = useState(
    userData ? userData?.phone.toString() : '',
  );
  const [loading, setLoading] = useState(false);
  const [myprop, setmyprop] = useState(false);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  useEffect(() => {
    setLoading(true);
    (async function example() {
      const res = await getallBlockuser('', userData?.auth);
      console.log('my res', res);

      if (res.data.status == true) {
        setblockeduser(res.data.data);
      } else {
      }
      setLoading(false);
    })();
  }, []);

  function handleChange(newValue, id) {
    if (newValue == 'false') {
      setmyprop(false);
      setLoading(true);
      (async function example() {
        const res = await getallBlockuser('', userData?.auth);
        console.log('my res', res);

        if (res.data.status == true) {
          setblockeduser(res.data.data);
        } else {
        }
        setLoading(false);
      })();
    } else {
      if (newValue == 'unblockuser') {
        newValue = {
          name: 'unblockuser',
          userid: id,
        };
      }

      console.log('my only status', newValue);
      setmyprop(newValue);
    }
  }

  console.log('blockeduser', blockeduser);
  const renderItem = ({item, index}) => (
    <View
      style={{
        marginHorizontal: 15,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 20,
          marginBottom: 20,
          elevation: 2,
          borderRadius: 20,
          overflow: 'hidden',
        }}>
        <Image
          style={{backgroundColor: 'white', width: '100%', height: 250}}
          source={{uri: item.dp}}
        />

        <View style={{flexDirection: 'row', paddingBottom: 10}}>
          <View style={{flex: 0.7, paddingLeft: 15}}>
            <Text
              style={{
                color: colors.secondary,
                fontSize: 15,
                marginTop: 10,
                fontFamily: fonts.PoppinsBold,
              }}>
              {item.first_name + ' ' + item.last_name}
                        
            </Text>
            <Text
              style={{
                color: colors.black,
                fontSize: 10,
                fontFamily: fonts.PoppinsBold,
              }}>
              {item.age ? item.age + ' | ' : ''}
              {item.city_name ? item.city_name + ',' : 'N/A'}  
              {item.country_name ? item.country_name : 'N/A'}
                        
            </Text>
            <Text
              style={{
                color: colors.black,
                fontSize: 10,
                fontFamily: fonts.PoppinsBold,
              }}>
              last online : {item.onlne ? item.onlne : 'N/A'}
                        
            </Text>
          </View>
          <View style={{flex: 1}}>
            <GradientButtonunblockuser
              title="Unblock user"
              onButtonPress={() => {
                handleChange('unblockuser', item.id);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        containerStyle={{marginTop: 40, marginBottom: 20}}
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
                title={'Blocked user'}
                type={'large'}
                color={colors.secondary}
                style={{fontSize: 28, marginLeft: 10}}
              />
              <CustomText
                title={'Manage blocked user list here'}
                type={'medium'}
                color={'black'}
                style={{fontSize: 13, marginLeft: 10}}
              />
            </View>
          </View>
        }
      />

      <FlatList
        data={blockeduser}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Loading visible={loading} />
      {myprop != false && <Modal1 status={myprop} onChange={handleChange} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  const {user, token} = state.auth;
  return {
    userData: user,
    token,
  };
};
export default connect(mapStateToProps, {
  signInWithPhone,
  signup,
  updateAccount,
  updateProfileIno,
  updateAdditionalIno,
  getallBlockuser,
})(Blockeduser);
