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
import {Modal1} from '../../../components/Modal1';

import colors from '../../../theme/colors';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {updown} from '../../../assets';
import CustomModal from '../../../components/Modal';
import {
  logo_blue,
  Circled_edit,
  Circled_cancel,
  Delete_multicolored_on,
} from '../../../assets';
import {
  GradientButton,
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
  get_all_users,
  updateAdditionalIno,
  searchuserbyfilter,
  get_my_photo_requests,
  acept_reject_photo_request,
} from '../../../redux/actions/auth';
import AlertModal from '../../../components/AlertModal';
import fonts from '../../../theme/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Directions} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const {height, width} = Dimensions.get('window');

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
// ];

//facebook
const SearchResult = ({
  navigation,
  route,
  signInWithPhone,
  token,
  userData,
  updateAccount,
  get_all_users,
  get_my_photo_requests,
  searchuserbyfilter,
  acept_reject_photo_request,
}) => {
  const [checked, setChecked] = useState(true);
  const [userdata, setDATA] = useState(false);
  const [dummydata, setdummydata] = useState('');

  const show = useRef(null);
  const from = route?.params?.from;
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [showAlert, setShoAlert] = useState(false);
  const [status, setstatus] = useState('');
  const [request_id, setrequest_id] = useState();

  console.log('myroute', route);
  console.log('myroute', from);

  useEffect(() => {
    if (from == 'filters') {
      const formData = new FormData();

      formData.append('gender', route.params.myparam.gender);
      formData.append('language_id', route.params.myparam.language_id);
      formData.append('education', route.params.myparam.education);
      formData.append('nationality_id', route.params.myparam.nationality_id);
      formData.append('marital_Status', route.params.myparam.marital_Status);
      formData.append('age_from', route.params.myparam.age_from);
      formData.append('age_to', route.params.myparam.age_to);
      formData.append('profession', route.params.myparam.profession);
      formData.append('ethinicity', route.params.myparam.ethinicity);
      console.log('formData==>', formData);

      setLoading(true);
      searchuserbyfilter(formData, userData.auth)
        .then(res => {
          console.log('myresponse==>', res);
          if (res.data.status == true) {
            setDATA(res.data.data);
          } else {
          }
          setLoading(false);
        })
        .catch(err => {
          // setLoading(false);
          console.log('myerror', err);
          rej(err.message);
          setLoading(false);
        });
    } else {
      try {
        (async () => {
          const res = await get_my_photo_requests('', userData.auth);
          if (res.data.status == true) {
            setDATA(res.data.data);
          } else {
            setDATA('');
          }
          console.log('myres', res);
        })();
      } catch (err) {
        console.log('myreserr', err);
      }
    }
  }, [dummydata]);

  const updatephotostatus = () => {
    const formData = new FormData();
    formData.append('request_id', request_id);
    formData.append('status', status);

    console.log('formdata', formData);
    setLoading(true);
    (async () => {
      try {
        const res = await acept_reject_photo_request(formData, userData.auth);
        console.log('myresponse', res);
        if (res.data.status == true) {
          setdummydata(res.data.data);
        } else {
        }

        setLoading(false);
      } catch (err) {
        console.log('myresponseerr', err);
        setLoading(false);
      }
    })();
  };

  console.log('my data', userdata);

  const renderItem = ({item}) => (
    <View
      style={{
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        marginHorizontal: 10,
        marginVertical: 10,
        overflow: 'hidden',
        elevation: 1,
      }}>
      <View style={{}}>
        <Image
          style={{
            alignSelf: 'center',
            height: 250,
            width: '100%',
          }}
          source={{uri: item.photo_url}}
          resizeMode="cover"
        />
      </View>
      <View style={{flexDirection: 'row', padding: 20}}>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: colors.secondary,
              fontSize: 16,
              marginTop: 10,
              fontFamily: fonts.PoppinsBold,
            }}>
            {item.first_name} {item.last_name}
          </Text>
          <Text>
            {item.age} | {item.city_name} , {item.country_name}
          </Text>
          {/* <Text style={{marginTop: 3}}>
            <Text style={{fontWeight: 'bold', fontSize: 10}}>last online</Text>

            <Text style={{fontSize: 10}}> {item.online}</Text>
          </Text> */}
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                setMsg('Are you sure want to delete this photo request');
                setShoAlert(true);
                setstatus('delete');
                setrequest_id(item.request_id);
                // updatephotostatus('delete', item.request_id);
              }}
              // onPress={() => {
              //   updatephotostatus('delete', item.request_id);
              // }}
              style={{
                height: 30,
                width: 30,
                borderRadius: 30 / 2,
                marginLeft: 5,
                backgroundColor: '#ffffff',
                justifyContent: 'center',
                alignItems: 'center',
                // shadowColor: '#BDBDBD',
                borderColor: '#ddd',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 3,
                elevation: 4,
              }}>
              {/* <MaterialCommunityIcons
              name="delete-forever-outline"
              size={30}
              color="red"
            /> */}
              <Image
                style={{height: 20, width: 20, alignSelf: 'center'}}
                source={Delete_multicolored_on}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View>
              <TouchableOpacity
                onPress={() => {
                  setMsg('Are you sure want to reject this photo request');
                  setShoAlert(true);
                  setstatus('reject');
                  setrequest_id(item.request_id);
                  // updatephotostatus('reject', item.request_id);
                }}
                // onPress={() => {
                //   updatephotostatus('reject', item.request_id);
                // }}
              >
                <Image
                  style={{height: 50, width: 40}}
                  source={Circled_cancel}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 30 / 2,
                marginLeft: 5,
                backgroundColor: '#ffffff',
                justifyContent: 'center',
                alignItems: 'center',
                // shadowColor: '#BDBDBD',
                borderColor: '#ddd',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 1,
                elevation: 4,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setMsg('Are you sure want to accept this photo request');
                  setShoAlert(true);
                  setstatus('accept');
                  setrequest_id(item.request_id);
                }}
                // onPress={() => {
                //   updatephotostatus('accept', item.request_id);
                // }}
              >
                <AntDesign
                  name="check"
                  size={20}
                  style={{color: colors.greenColor}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {showAlert && (
          <AlertModal
            heading={msg}
            button1="Yes"
            button2="NO"
            onYesPress={() => {
              updatephotostatus();

              setShoAlert(false);
            }}
            onNoPress={() => {
              setShoAlert(false);
            }}
          />
        )}
      </View>
    </View>

    // <View
    //   style={{
    //     marginHorizontal: 10,
    //     marginVertical: 10,
    //     width: '45%',
    //   }}>
    //   <View style={{borderRadius: 15, overflow: 'hidden'}}>
    //     <Image
    //       style={{alignSelf: 'center', height: 180, width: '100%'}}
    //       source={{uri: item.dp}}
    //     />
    //     <Badge
    //       value=" "
    //       status="success"
    //       containerStyle={{
    //         position: 'absolute',
    //         right: 10,
    //         top: 10,
    //         scaleX: 0.7,
    //         scaleY: 0.7,
    //       }}
    //     />
    //   </View>
    //   <View style={{flexDirection: 'row'}}>
    //     <View style={{flex: 1, paddingLeft: 20}}>
    //       <Text
    //         style={{
    //           color: colors.secondary,
    //           fontSize: 16,
    //           marginTop: 10,
    //           fontFamily: fonts.PoppinsBold,
    //         }}>
    //         {item.first_name} {item.last_name}
    //       </Text>
    //       <Text>
    //         {item.age} | {item.city_name} , {item.country_name}
    //       </Text>
    //       <Text style={{marginTop: 3, fontSize: 10}}>
    //         last online {item.online}
    //       </Text>
    //     </View>
    //   </View>
    // </View>
  );

  const renderItem1 = ({item}) => (
    <View
      style={{
        marginHorizontal: 10,
        marginVertical: 10,
        width: '45%',
        elevation: 5,
        backgroundColor: 'white',
        overflow: 'hidden',
        borderRadius: 15,
      }}>
      <View style={{borderRadius: 15}}>
        <Image
          style={{alignSelf: 'center', height: 180, width: '100%'}}
          source={{uri: item.dp}}
        />
        <Badge
          value=" "
          status="success"
          containerStyle={{
            position: 'absolute',
            right: 10,
            top: 10,
            scaleX: 0.7,
            scaleY: 0.7,
          }}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, paddingLeft: 10, paddingBottom: 10}}>
          <Text
            style={{
              color: colors.secondary,
              fontSize: 16,
              marginTop: 10,
              fontFamily: fonts.PoppinsBold,
            }}>
            {item.first_name} {item.last_name}
          </Text>
          <Text>
            {item.age} | {item.city_name ? item.city_name : 'N/A'} ,{' '}
            {item.country_name ? item.country_name : 'N/A'}
          </Text>
          <Text style={{marginTop: 3, fontSize: 10}}>
            last online: {item.online ? item.online : 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        containerStyle={{marginVertical: 40}}
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
              {from == 'filters' && (
                <CustomText
                  title={'Search results'}
                  type={'large'}
                  color={colors.secondary}
                  style={{fontSize: 28, marginLeft: 10}}
                />
              )}

              {from == 'photorequest' && (
                <CustomText
                  title={'Photo requests'}
                  type={'large'}
                  color={colors.secondary}
                  style={{fontSize: 28, marginLeft: 10}}
                />
              )}
              <CustomText
                title={'Manage photo requests here'}
                type={'medium'}
                color={'black'}
                style={{fontSize: 13, marginLeft: 10}}
              />
            </View>
          </View>
        }
      />
      {from == 'filters' && (
        <FlatList
          data={userdata}
          renderItem={renderItem1}
          numColumns={2}
          keyExtractor={item => item.id}
        />
      )}

      {from == 'photorequest' && (
        <FlatList
          data={userdata}
          renderItem={renderItem}
          numColumns={0}
          keyExtractor={item => item.id}
        />
      )}

      {/* <View
        style={{
          borderRadius: 15,
          marginHorizontal: 10,
        }}>
        <Image style={{alignSelf: 'center'}} source={Circled_edit} />
      </View> */}
      {/* <View style={{flexDirection: 'row'}}> */}
      {/* <View style={{flex: 1, paddingLeft: 20}}>
          <Text
            style={{
              color: colors.secondary,
              fontSize: 16,
              marginTop: 10,
              fontFamily: fonts.PoppinsBold,
            }}>
            Camil Mesut
          </Text>
          <Text>32|Ankara,Turkey</Text>
          <Text style={{marginTop: 3}}>
            <Text style={{fontWeight: 'bold', fontSize: 10}}>last online</Text>

            <Text style={{fontSize: 10}}> 7 mins ago</Text>
          </Text>
        </View> */}
      {/* <View style={{flex: 1}}> */}
      {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 30 / 2,
                marginLeft: 5,
                backgroundColor: '#ffffff',
                justifyContent: 'center',
                alignItems: 'center',
                // shadowColor: '#BDBDBD',
                borderColor: '#ddd',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 3,
                elevation: 4,
              }}>
              <Image
                style={{height: 20, width: 20, alignSelf: 'center'}}
                source={Delete_multicolored_on}
                resizeMode="contain"
              />
            </View>
            <View>
              <Image style={{height: 50, width: 40}} source={Circled_cancel} />
            </View>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 30 / 2,
                marginLeft: 5,
                backgroundColor: '#ffffff',
                justifyContent: 'center',
                alignItems: 'center',
                // shadowColor: '#BDBDBD',
                borderColor: '#ddd',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 1,
                elevation: 4,
              }}>
              <AntDesign
                name="check"
                size={20}
                style={{color: colors.greenColor}}
              />
            </View>
          </View> */}
      {/* </View> */}
      {/* </View> */}

      <Loading visible={loading} />
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
  get_all_users,
  searchuserbyfilter,
  updateAdditionalIno,
  get_my_photo_requests,
  acept_reject_photo_request,
})(SearchResult);
