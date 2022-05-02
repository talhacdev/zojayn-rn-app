import React, {useReducer, useState, useEffect, useRef} from 'react';
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
  StatusBar,
  Animated,
} from 'react-native';
import Button from '../../../components/Button';
import axios from 'axios';

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
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';

import {updown} from '../../../assets';
import CustomModal from '../../../components/Modal';
import {
  Premium_black,
  Arrow_black_right,
  Search_multicolored,
  Chevron_colored_right,
} from '../../../assets';
import {
  GradientButton,
  GradientButtonyellow,
  GradientButtonupgrade,
  GradientButtonupgrade1,
} from '../../../components/GradientButton';
import {Loading} from '../../../components/Loading';
import {connect} from 'react-redux';
import {
  signInWithPhone,
  signup,
  updateAccount,
  logoutSuccess,
} from '../../../redux/actions/auth';
import {
  updateProfileIno,
  updateAdditionalIno,
} from '../../../redux/actions/auth';
import AlertModal from '../../../components/AlertModal';
import fonts from '../../../theme/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Directions} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';
import styles from './styles';
import HeaderRight from '../../../components/HeaderRight';
import {storeurl} from '../../../redux/actions/storeurl';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

//facebook
const MyDashboard = ({
  route,
  signInWithPhone,
  token,
  userData,
  updateAccount,
  updateProfileIno,
  updateAdditionalIno,
  logoutSuccess,
  allUser,
}) => {
  const [search, setSearch] = useState('');
  const [searchState, setSearchState] = useState(false);
  const [selected, setSelected] = useState('top');
  const [loading, setLoading] = useState(false);
  const [DATA, setdata] = useState([]);
  const [privatephoto, setprivatephotos] = useState(0);
  const [likedyou, setlikedyou] = useState(0);
  const [visitors, setVisitors] = useState(0);
  const [profilecompleted, setprofilecompleted] = useState(0);

  const navigation = useNavigation();

  const show = useRef(null);
  const from = route?.params?.from;

  console.log('privatephoto', privatephoto);

  useEffect(() => {
    setLoading(true);
    const formData = new FormData();
    formData.append('type', selected);
    console.log('myformdata', formData);

    const res = axios
      .post(`${storeurl}api/get_all_users`, formData, {
        headers: {
          auth: userData.auth,
        },
      })
      .then(res => {
        console.log('my res', res);
        setLoading(false);
        var a = [];
        if (res.data.status == true) {
          setdata(res.data.data);
          setprivatephotos(res.data.privatephotos);
          setlikedyou(res.data.likedyou);
          setVisitors(res.data.vistors);

          setprofilecompleted(res.data.profilecompleted);
        } else {
          setdata('');
          setprivatephotos(res.data.privatephotos);
          setlikedyou(res.data.likedyou);
          setVisitors(res.data.vistors);
          setprofilecompleted(0);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        rej(err.message);
      });
  }, [selected]);

  console.log('profilecompleted', profilecompleted);

  var myarray = [1, 2, 3, 4, 5, 6, 7, 8];

  const renderItem = ({item, index}) => (
    <View
      style={{
        marginHorizontal: 10,
        width: '45%',
        marginVertical: 30,
      }}>
      <TouchableOpacity
        onPress={() => {
          let userid = item.id;
          navigation.navigate('Timeline', {userid: userid});
        }}>
        <View style={{borderRadius: 15, overflow: 'hidden'}}>
          <Image
            style={{alignSelf: 'center', height: 180, width: '100%'}}
            source={{uri: item.dp}}
          />
          {item.isonline == 'Yes' && (
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
          )}
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, paddingLeft: 10}}>
            <Text
              style={{
                color: colors.secondary,
                fontSize: 16,
                marginTop: 10,
                fontFamily: fonts.PoppinsBold,
              }}>
              {item.first_name + ' ' + item.last_name}
            </Text>
            <Text style={{fontSize: 12}}>
              {item.age ? item.age : ''}
              {item.city_name ? '|' + item.city_name + ',' : ''}{' '}
              {item.country_name ? item.country_name : ''}
            </Text>
            {/* <Text style={{marginTop: 3, fontSize: 10}}>
              last online 7 min ago
            </Text> */}
            {item.isonline == 'No' && item.online != '' && (
              <Text>
                <Text style={{fontWeight: 'bold', fontSize: 10}}>
                  last online
                </Text>

                <Text style={{fontSize: 10}}> {item.online}</Text>
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        containerStyle={{marginVertical: 30}}
        backgroundColor={'transparent'}
        leftComponent={
          <View
            style={{
              flexDirection: 'row',
              width: 30,
              height: 30,
              alignItems: 'center',
            }}>
            <Ionicons
              name={'chevron-back'}
              size={20}
              color={colors.secondary}
              onPress={() => {
                navigation.goBack();
              }}
              style={{alignSelf: 'center', marginTop: -20}}
            />
          </View>
        }
        centerComponent={
          <View style={{width: '120%'}}>
            <CustomText
              title={
                userData ? userData.first_name + ' ' + userData.last_name : ''
              }
              type={'large'}
              color={colors.secondary}
              style={{fontSize: 24, marginLeft: 60, fontWeight: 'bold'}}
            />
            <Text style={{fontSize: 13, marginTop: 5}}>
              The profile is monitored by her guardian
            </Text>
          </View>
        }
      />
      <Loading visible={loading} />
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <GradientButtonupgrade1
            title={'upgrade to pro'}
            iconRight={Arrow_black_right}
            iconLeft={Premium_black}
            onButtonPress={() => {
              navigation.navigate('Payment');
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <GradientButtonupgrade
            title={'Customized search'}
            iconLeft={Search_multicolored}
            iconRight={Chevron_colored_right}
            onButtonPress={() => {
              navigation.navigate('Filters1');
            }}
          />
        </View>
      </View>
      <View
        style={{
          // width: '90%',
          flex: 1,
          marginTop: 10,
          backgroundColor: 'white',
          marginHorizontal: 14,
          borderRadius: 15,
          paddingBottom: 20,
          elevation: 1,
        }}>
        <TouchableOpacity>
          <View style={{paddingLeft: 20, paddingTop: 10}}>
            <Text style={{fontWeight: 'bold'}}>
              Complete your profile for better visibility
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{flex: 9, paddingLeft: 20}}>
            <Text style={{fontSize: 13}}>
              Please complete your profile information to increase your
              visibility in your search system.people will not be able to serach
              you without your profile pictures
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Ionicons
              name={'chevron-forward'}
              size={20}
              color={colors.secondary}
              onPress={() => {
                navigation.goBack();
              }}
              style={{alignSelf: 'flex-end', paddingRight: 10}}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 20,
            width: '90%',
          }}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: colors.secondary,
                marginTop: 12,
                borderRadius: 8,
              }}>
              {/* <Text>{profilecompleted}</Text> */}
              <Entypo
                name={'minus'}
                color={colors.secondary}
                style={{height: 4, width: 25}}
              />
            </View>
          </View>
          {myarray &&
            myarray.map(item => {
              return (
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  {item <= profilecompleted && (
                    <View
                      style={{
                        backgroundColor: colors.secondary,
                        marginTop: 12,
                        borderRadius: 8,
                        marginLeft: 10,
                      }}>
                      {/* <Text>{profilecompleted}</Text> */}
                      <Entypo
                        name={'minus'}
                        color={colors.secondary}
                        style={{height: 4, width: 25}}
                      />
                    </View>
                  )}

                  {item > profilecompleted && (
                    <View
                      style={{
                        backgroundColor: 'white',
                        marginTop: 12,
                        borderRadius: 8,
                        elevation: 1,
                        marginLeft: 10,
                      }}>
                      <Entypo
                        name={'minus'}
                        color={colors.secondary}
                        style={{height: 4, width: 25}}
                      />
                    </View>
                  )}
                </View>
              );
            })}
        </View>
      </View>
      {privatephoto > 0 && (
        <View
          style={{
            // width: '90%',
            flex: 1,
            marginTop: 10,
            backgroundColor: 'white',
            marginHorizontal: 14,
            borderRadius: 100,
            flexDirection: 'row',
            paddingTop: 10,
            paddingBottom: 10,
            elevation: 1,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchResult', {from: 'photorequest'});
            }}>
            <View
              style={{
                flex: 1,
                paddingLeft: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold'}}>
                {privatephoto} Private photo access requests.
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Ionicons
              name={'chevron-forward'}
              size={20}
              color={colors.secondary}
              onPress={() => {
                navigation.goBack();
              }}
              style={{alignSelf: 'flex-end', paddingRight: 10}}
            />
          </View>
        </View>
      )}
      <View style={styles1.mainContainer}>
        <StatusBar content />
        <View style={styles1.header}>
          {/* <View style={styles1.top}>
            <View style={{}}></View>
          </View> */}
          <View style={styles1.tabs}>
            <TouchableOpacity
              onPress={() => {
                setSelected('top');
              }}>
              <CustomText
                title={'Recommended'}
                type={'large'}
                color={selected == 'top' ? colors.secondary : colors.black}
                style={{fontSize: 12, marginBottom: 10}}
              />
              {selected == 'top' && <Divider style={styles1.divider} />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected('like');
              }}>
              <CustomText
                title={'Liked by you'}
                type={'large'}
                color={selected == 'like' ? colors.secondary : colors.black}
                style={{fontSize: 12, marginBottom: 10}}
              />

              {selected == 'like' && <Divider style={styles1.divider} />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected('follow');
              }}>
              <CustomText
                title={'Liked you'}
                type={'large'}
                color={selected == 'follow' ? colors.secondary : colors.black}
                style={{fontSize: 12, marginBottom: 10}}
              />
              {likedyou > 0 && (
                <Badge
                  value="1"
                  status="error"
                  containerStyle={{position: 'absolute', top: -12, right: -6}}
                />
              )}
              {selected == 'follow' && <Divider style={styles1.divider} />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected('visit');
              }}>
              <CustomText
                title={'Visitors'}
                type={'large'}
                color={selected == 'visit' ? colors.secondary : colors.black}
                style={{fontSize: 12, marginBottom: 10}}
              />
              {visitors > 0 && (
                <Badge
                  value={visitors}
                  status="error"
                  containerStyle={{position: 'absolute', top: -12, right: -6}}
                />
              )}
              {selected == 'visit' && <Divider style={styles1.divider} />}
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={item => item}
        />
      </View>
    </ScrollView>
  );
};

const styles1 = StyleSheet.create({
  tabs: {
    // justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //  padding: Platform.OS == 'ios' ? 20 : 10,
    borderBottomWidth: 0.5,
    marginTop: 20,
    marginHorizontal: 10,
  },
  mainContainer: {
    // flex: 1,
    // backgroundColor: 'white',
    // paddingBottom: 20,
  },
  header: {
    // backgroundColor: colors.primary,
    // height: Platform.OS == 'ios' ? '15%' : '19%',
    // position: 'absolute',
    // top: 0,
    // width: '100%',
    // borderBottomRightRadius: Platform.OS == 'ios' ? 25 : 20,
    // borderBottomLeftRadius: Platform.OS == 'ios' ? 25 : 20,
  },
  // top: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: Platform.OS == 'ios' ? 50 : 20,
  //   justifyContent: 'space-between',

  // },
  divider: {
    height: 1.5,
    backgroundColor: colors.secondary,
    width: 80,
    // alignSelf:'flex-start',
  },
});

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
  logoutSuccess,
})(MyDashboard);
