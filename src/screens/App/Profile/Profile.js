import React, {useReducer, useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  Keyboard,
  FlatList,
} from 'react-native';
import Button from '../../../components/Button';
import CustomText from '../../../components/Text';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Header, Badge, Icon, Divider} from 'react-native-elements';
import {Input} from '../../../components/Input/Input';

import styles from './styles';
import {SocialButton} from '../../../components/SocialButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Feather from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
//google
import Textarea from 'react-native-textarea';

import colors from '../../../theme/colors';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  Chevron_grey_down,
  Arrow_black_right,
  Country_city,
  Calender,
  Gender,
  arrowright,
} from '../../../assets';
import {
  GradientButton,
  GradientsigninButton,
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
} from '../../../redux/actions/auth';
import AlertModal from '../../../components/AlertModal';
import fonts from '../../../theme/fonts';
import {storeurl} from '../../../redux/actions/storeurl';
import axios from 'axios';
//facebook
const Profile = ({
  navigation,
  route,
  signInWithPhone,
  token,
  userData,
  updateAccount,
  updateProfileIno,
  updateAdditionalIno,
}) => {
  const [checked, setChecked] = useState(true);
  const [editable, setEditable] = useState(true);
  const [genderEidt, setGenderEdit] = useState(false);

  const [modal, toggleModal] = useState(false);
  const [gender, setGender] = useState(
    userData.gender == '' ? 'Male' : userData.gender,
  );
  const [type, setType] = useState('');
  const show = useRef(null);
  // const from = route.params.params.from;
  const from = 'Additional Information';
  const [phoneno, setPhone] = useState(
    userData ? userData?.phone.toString() : '',
  );
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(
    userData.dob == '' ? new Date() : new Date(userData.dob),
  );
  const [mode, setMode] = useState('date');
  const [show1, setShow1] = useState(false);
  const refRBSheet = useRef();

  const [apidata, setapidata] = useState([]);
  const [country, setcountry] = useState(userData.country_name);
  const [countryid, setcountryid] = useState(userData.country_id);
  const [allcountry, setallcountry] = useState(['']);

  const [allcity, setallcity] = useState(['']);
  const [city, setcity] = useState(userData.city_name);
  const [cityid, setcityid] = useState(userData.city_id);

  const onChange = (event, selectedDate) => {
    console.log(`selectedDate`, selectedDate);
    const currentDate = selectedDate || date;
    setShow1(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow1(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  function openrbsheet(var1) {
    if (var1 == 'country') {
      setapidata(allcountry);
      console.log('all country', allcountry);
    } else if (var1 == 'gender') {
      var arry = [];
      let person = {
        id: 1,
        title: 'Male',
        status: 'Gender',
      };
      arry.push(person);

      let person1 = {
        id: 2,
        title: 'Female',
        status: 'Gender',
      };
      arry.push(person1);

      setapidata(arry);
    } else if (var1 == 'city') {
      setapidata(allcity);
    }
    refRBSheet.current.open();
  }

  useEffect(() => {
    (async function example() {
      setLoading(true);
      axios
        .get(`${storeurl}api/get_county`, '', {})
        .then(res => {
          console.log('apiresponse', res);
          if (res.data.status == true) {
            var arry = [];
            for (var i = 0; i < res.data.data.length; i++) {
              let person = {
                id: res.data.data[i].country_id,
                title: res.data.data[i].country_name,
                status: 'country',
              };

              arry.push(person);
            }
            setallcountry(arry);

            if (parseInt(countryid) > 0) {
            } else {
              setcountry(arry[0].title);
              setcountryid(arry[0].id);
            }

            var arry = [];
            for (var i = 0; i < res.data.allcity.length; i++) {
              let person = {
                id: res.data.allcity[i].city_id,
                title: res.data.allcity[i].city_name,
                status: 'city',
              };

              arry.push(person);
            }

            setallcity(arry);

            if (parseInt(cityid) > 0) {
            } else {
              setcity(arry[0].title);
              setcityid(arry[0].id);
            }
          } else {
            setallcountry('');
          }
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          console.log('error comes here', err);
          rej(err.message);
        });
    })();
  }, []);

  function closerbsheet(status1, id1, title1) {
    refRBSheet.current.close();

    if (status1 == 'country') {
      setcountry(title1);
      setcountryid(id1);
      const formData = new FormData();
      formData.append('country_id', id1);

      axios
        .post(`${storeurl}api/get_city`, formData, {})
        .then(res => {
          if (res.data.status == true) {
            var arry = [];
            for (var i = 0; i < res.data.data.length; i++) {
              let person = {
                id: res.data.data[i].city_id,
                title: res.data.data[i].city_name,
                status: 'city',
              };
              arry.push(person);
            }
            setallcity(arry);
            setcity(arry[0].title);
            setcityid(arry[0].id);
          } else {
            setallcity('');
            setcity('');
            setcityid('');
          }
        })
        .catch(err => {
          setLoading(false);
          console.log('error comes here', err);
          rej(err.message);
        });
    } else if (status1 == 'city') {
      setcity(title1);
      setcityid(id1);
    } else if (status1 == 'Gender') {
      setGender(title1);
    }
  }

  const aboutdetail = async id => {
    setLoading(true);

    try {
      const formData = new FormData();
      //about section
      formData.append('dob', moment(date).format('YYYY-MM-DD'));
      formData.append('gender', gender);
      formData.append('countryid', countryid);
      formData.append('city', cityid);
      formData.append('modal', 13);

      console.log('formdata', formData);

      const res = await updateProfileIno(formData, userData?.auth);

      if (res.data.status == true) {
        setMsg(res.data.message);
        setShowAlert(true);
        setLoading(false);
        // navigation.navigate('MyDashboard');
      } else {
        setMsg(err.message);
        setShowAlert(true);
        setLoading(false);
      }
    } catch (err) {
      setMsg(err.message);
      setShowAlert(true);
      // console.log(err);
    }
  };

  console.log('test', userData);

  const Item = ({title}) => (
    <View
      style={{
        width: 400,
        padding: 2,
        borderBottomWidth: 1,
        alignItems: 'center',
      }}>
      <Text
        style={[
          styles.title,
          {fontFamily: fonts.PoppinsBold, fontSize: 17, padding: 10},
        ]}>
        {title}
      </Text>
    </View>
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        flex: 1,
      }}
      onPress={() => {
        closerbsheet(item.status, item.id, item.title);
      }}>
      {/* <View style={{flex: 1}}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: fonts.PoppinsBold,
            borderBottomColor: 'black',
            borderBottomWidth: 2,
          }}>
          {item.title}
        </Text>
      </View> */}

      <Item title={item.title} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={{paddingLeft: 20, marginTop: 60, paddingRight: 20}}>
        <Text
          style={{
            fontSize: 24,
            color: colors.primary,
            fontFamily: fonts.PoppinsBold,
            fontWeight: 'bold',
          }}>
          Additional information
        </Text>
        <Text
          style={{
            fontFamily: fonts.PoppinsMedium,
            fontSize: 14,
            marginTop: 10,
          }}>
          We need a bit more information about yourself so that get you relavant
          matche
        </Text>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
          }}>
          {from == 'Account Settings' && (
            <View>
              <Input
                keyboardType={'default'}
                placeholder={'First Name'}
                value={fname}
                onChangeText={e => {
                  setFname(e);
                }}
                left={user}
              />
              <Input
                keyboardType={'default'}
                placeholder={'Last Name'}
                value={lname}
                onChangeText={e => {
                  setLname(e);
                }}
                left={user}
              />
              <Input
                keyboardType={'email-address'}
                placeholder={'Email'}
                value={email}
                onChangeText={e => {
                  setEmail(e);
                }}
                left={mail}
              />
              <Input
                keyboardType={'phone-pad'}
                placeholder={'Phone Number'}
                value={phoneno}
                onChangeText={e => {
                  setPhone(e);
                }}
                left={call}
              />
              <Input
                keyboardType={'default'}
                placeholder={'Password'}
                isSecure={true}
                value={pass}
                onChangeText={e => {
                  setPass(e);
                }}
                left={key}
              />
            </View>
          )}

          {from === 'Additional Information' && (
            <View style={{}}>
              <View style={{marginTop: 38, paddingLeft: 20}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.primary,
                    fontFamily: fonts.PoppinsBold,
                    fontWeight: 'bold',
                  }}>
                  Date of birth
                </Text>
              </View>
              <TouchableOpacity onPress={showDatepicker}>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    marginHorizontal: 20,

                    borderBottomWidth: 0.5,
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      marginBottom: 10,
                    }}>
                    <Image source={Calender} style={{height: 15, width: 15}} />

                    {show1 && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                      />
                    )}
                  </View>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      marginBottom: 10,
                    }}>
                    <Text style={{textAlign: 'left', marginLeft: 20}}>
                      {moment(date).format('Do MMMM YYYY')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openrbsheet('gender')}>
                <View style={{marginTop: 30, paddingLeft: 20}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.primary,
                      fontFamily: fonts.PoppinsBold,
                      fontWeight: 'bold',
                    }}>
                    Gender
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    paddingLeft: 20,
                  }}>
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      width: '95%',
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={Gender}
                      style={{height: 12, width: 12, marginBottom: 10}}
                    />
                    <Text style={{paddingLeft: 20, marginBottom: 10}}>
                      {gender}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={{marginTop: 40, paddingLeft: 20}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.primary,
                    fontFamily: fonts.PoppinsBold,
                    fontWeight: 'bold',
                  }}>
                  Country
                </Text>
              </View>
              <TouchableOpacity onPress={() => openrbsheet('country')}>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    paddingLeft: 20,
                  }}>
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      width: '95%',
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={Country_city}
                      style={{height: 12, width: 12, marginBottom: 2}}
                    />
                    <Text style={{paddingLeft: 20, marginBottom: 8}}>
                      {country}
                    </Text>
                  </View>
                  <View style={{position: 'absolute', right: 20, bottom: 8}}>
                    <EvilIcons name="chevron-down" size={26} color="black" />
                  </View>
                </View>
              </TouchableOpacity>

              <View style={{marginTop: 30, paddingLeft: 20}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.primary,
                    fontFamily: fonts.PoppinsBold,
                    fontWeight: 'bold',
                  }}>
                  City
                </Text>
              </View>
              <TouchableOpacity onPress={() => openrbsheet('city')}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingLeft: 20,
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      width: '95%',
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={Country_city}
                      style={{height: 12, width: 12, marginBottom: 10}}
                    />
                    <Text style={{paddingLeft: 20, marginBottom: 8}}>
                      {city}
                    </Text>
                  </View>
                  <View style={{position: 'absolute', right: 20, bottom: 8}}>
                    <EvilIcons name="chevron-down" size={26} color="black" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {from === 'Additional Information' && <View></View>}
          <View style={{paddingTop: 80}}>
            <GradientsigninButton
              title="Get started"
              iconRight={arrowright}
              onButtonPress={() => {
                aboutdetail(1);
              }}
            />
          </View>
        </View>

        {/* <RBSheet
          ref={show}
          height={440}
          openDuration={250}
          customStyles={{
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              marginTop: 30,
              padding: 20,
            },
          }}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date ? date : new Date()}
            placeholder="Date"
            mode={'date'}
            display="inline"
            onChange={onChange}
          />
        </RBSheet> */}

        <RBSheet
          height={300}
          duration={250}
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              height: 900,
            },

            // },
            draggableIcon: {
              backgroundColor: 'black',
              alignItems: 'center',
            },
            container: {
              // alignItems: 'center',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}>
          <FlatList
            data={apidata}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </RBSheet>
      </KeyboardAwareScrollView>
      <Loading visible={loading} />
      {showAlert && (
        <AlertModal
          heading={msg}
          button1="OK"
          form={true}
          onOkPress={() => {
            setShowAlert(false);
            navigation.navigate('Root');
          }}
        />
      )}
    </View>
  );
};

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
})(Profile);
