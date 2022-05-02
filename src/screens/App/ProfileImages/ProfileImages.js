import React, {useReducer, useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  Keyboard,
  StyleSheet,
  ImageBackground,
  FlatList,
} from 'react-native';

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
import Button from '../../../components/Button';
import Swiper from 'react-native-swiper';
import CustomText from '../../../components/Text';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Header, Badge, Icon} from 'react-native-elements';
import {Input} from '../../../components/Input/Input';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './styles';
import {SocialButton} from '../../../components/SocialButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Feather from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
//google
import Textarea from 'react-native-textarea';

import colors from '../../../theme/colors';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

import {
  updown,
  Arrow_colored_right,
  Circled_Arrow_multicolored_right,
  Circled_Arrow_multicolored_left,
  Arrow_white_left,
  logout,
  Locked_multicolored,
  Right_multicolored,
} from '../../../assets';
import CustomModal from '../../../components/Modal';
import {Calender, Gender} from '../../../assets';
import {
  GradientButton,
  GradientsigninButton,
  GradientButtongrayPic,
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
  accessrequest,
} from '../../../redux/actions/auth';
import AlertModal from '../../../components/AlertModal';
import fonts from '../../../theme/fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {storeurl} from '../../../redux/actions/storeurl';
import axios from 'axios';
import {getPhotos, updatePhotoStatus} from '../../../redux/actions/app';
import {useNavigation, useIsFocused} from '@react-navigation/native';

//facebook
const ProfileImages = ({
  navigation,
  route,
  signInWithPhone,
  token,
  userData,
  accessrequest,
}) => {
  const isFocused = useIsFocused();
  const images1 = route.params.userid;
  const [ishow, setishow] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log('imagesfromtimeline', images1);

  const accessrequestnew = (picid, userid) => {
    const formData = new FormData();
    formData.append('photo_id', picid);
    formData.append('user_id', userid);
    console.log('myres', formData);

    setLoading(true);

    (async () => {
      try {
        const res = await axios.post(
          `http://nikahnama.ranaentp.net/api/paymentApi`,
          formData,
          {
            headers: {
              auth: userData.auth,
            },
          },
        );

        console.log('anyresponse', res);

        if (res.data.status == 'true') {
          setishow(true);
          setLoading(false);
        } else {
          alert(res.data.message);
          setLoading(false);
        }
      } catch (err) {
        console.log('anyresponseerr', err);
      }
    })();
  };

  return (
    <View style={{flex: 1}}>
      {ishow == true && (
        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          <View
            style={{
              height: 300,
              width: 300,
              marginHorizontal: 55,
              backgroundColor: 'white',
              borderRadius: 30,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}></View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 70,
                  width: 70,
                  backgroundColor: colors.lightWhite,
                  marginTop: 30,
                  borderRadius: 17,
                }}>
                <Image
                  source={Right_multicolored}
                  resizeMode="contain"
                  style={{
                    height: 45,
                    width: 45,
                    // marginLeft: 2,
                    marginTop: 10,
                    alignSelf: 'center',
                  }}
                />
              </View>
            </View>

            {/* <View
              style={{
                paddingTop: 20,
                width: '100%',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: colors.secondary,
                  fontFamily: fonts.PoppinsBold,
                }}>
                Request Sent
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.black,
                  fontFamily: fonts.PoppinsBold,
                }}>
                You will be notified if the request has been granted
              </Text>
            </View> */}

            <View style={{marginTop: 20}}>
              <GradientsigninButton
                title="Back to profile"
                onButtonPress={() => {
                  navigation.navigate('Timeline', {userid: images1[0].user_id});
                }}
              />
            </View>
          </View>
        </View>
      )}
      {ishow == false && (
        <Swiper
          containerStyle={{flex: 1}}
          // autoplay
          autoplayTimeout={5}
          showsPagination={true}
          buttonColor={'red'}
          nextButton={
            <View style={{flex: 1}}>
              <Image
                style={{height: 40, width: 40}}
                source={Circled_Arrow_multicolored_right}
              />
            </View>
          }
          prevButton={
            <View style={{flex: 1}}>
              <Image
                style={{height: 40, width: 40}}
                source={Circled_Arrow_multicolored_left}
              />
            </View>
          }
          dot={
            <View
              style={{
                height: 8,
                width: 8,
                backgroundColor: 'white',
                borderRadius: 4,
                margin: 5,
              }}></View>
          }
          activeDot={
            <View
              style={{
                height: 15,
                width: 15,
                backgroundColor: 'gray',
                borderRadius: 15,
                margin: 5,
                borderRadius: 6,
                margin: 5,
                backgroundColor: `#ff69b4`,
              }}></View>
          }
          showsButtons>
          {images1 &&
            images1.map(item => {
              // item.photo_status==1 ? <ImageBackground style={styles.slide} source={{uri: item.photo_url}} /> : ""
              return (
                <View style={{flex: 1, flexDirection: 'row'}}>
                  {item.photo_status == 1 && (
                    <ImageBackground
                      style={{flex: 1}}
                      source={{uri: item.photo_url}}
                    />
                  )}

                  {item.photo_status == 0 && (
                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          height: 300,
                          width: 250,
                          backgroundColor: 'white',
                          borderRadius: 30,
                        }}>
                        <View style={{alignItems: 'center'}}>
                          <View
                            style={{
                              height: 70,
                              width: 70,
                              backgroundColor: colors.lightWhite,
                              marginTop: 30,
                              borderRadius: 17,
                            }}>
                            <Image
                              source={Locked_multicolored}
                              resizeMode="contain"
                              style={{
                                height: 45,
                                width: 45,
                                // marginLeft: 2,
                                marginTop: 10,
                                alignSelf: 'center',
                              }}
                            />
                          </View>
                          <View
                            style={{
                              alignItems: 'center',
                              width: '100%',
                              paddingTop: 20,
                            }}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: colors.secondary,
                                fontFamily: fonts.PoppinsBold,
                              }}>
                              Preview blocked due
                            </Text>
                            <Text
                              style={{
                                fontSize: 20,
                                color: colors.secondary,
                                fontFamily: fonts.PoppinsBold,
                              }}>
                              to privacy
                            </Text>
                          </View>

                          <TouchableOpacity
                            style={{alignItems: 'center'}}
                            onPress={() => {
                              accessrequestnew(item.id, item.user_id);
                            }}>
                            <Text>Request Access</Text>
                          </TouchableOpacity>
                          <View style={{marginTop: 20}}>
                            <GradientsigninButton
                              iconLeft={logout}
                              title="Request Access"
                              onButtonPress={() => {
                                accessrequestnew(item.id, item.user_id);
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    </View>

                    // </View>
                    // <View style={{justifyContent: 'center', flex: 1}}>
                    //   <View
                    //     style={{
                    //       height: 300,
                    //       width: 250,
                    //       backgroundColor: 'white',
                    //       marginHorizontal: 55,
                    //       backgroundColor: 'white',
                    //       borderRadius: 30,
                    //     }}>
                    //     <View
                    //       style={{
                    //         alignItems: 'center',
                    //       }}>
                    //       <View
                    //         style={{
                    //           height: 70,
                    //           width: 70,
                    //           backgroundColor: colors.lightWhite,
                    //           marginTop: 30,
                    //           borderRadius: 17,
                    //         }}>
                    //         <Image
                    //           source={Locked_multicolored}
                    //           resizeMode="contain"
                    //           style={{
                    //             height: 45,
                    //             width: 45,
                    //             // marginLeft: 2,
                    //             marginTop: 10,
                    //             alignSelf: 'center',
                    //           }}
                    //         />
                    //       </View>
                    //     </View>

                    //     <View
                    //       style={{
                    //         paddingTop: 20,
                    //         width: '100%',
                    //         alignItems: 'center',
                    //       }}>
                    //       <Text
                    //         style={{
                    //           fontSize: 20,
                    //           color: colors.secondary,
                    //           fontFamily: fonts.PoppinsBold,
                    //         }}>
                    //         Preview blocked due
                    //       </Text>
                    //       <Text
                    //         style={{
                    //           fontSize: 20,
                    //           color: colors.secondary,
                    //           fontFamily: fonts.PoppinsBold,
                    //         }}>
                    //         to privacy
                    //       </Text>
                    //       <Text style={{fontSize: 12}}>
                    //         Request user for access
                    //       </Text>
                    //     </View>

                    //     {/* <View style={{alignItems: 'center'}}>
                    //     <TouchableOpacity
                    //       onPress={() => {
                    //         accessrequestnew(item.id, item.user_id);
                    //       }}>
                    //       <Text>Request Access</Text>
                    //     </TouchableOpacity>
                    //   </View> */}

                    //     <View style={{marginTop: 20}}>
                    //       <GradientsigninButton
                    //         title="Request Access"
                    //         onButtonPress={() => {
                    //           accessrequestnew(item.id, item.user_id);
                    //         }}
                    //       />
                    //       <View
                    //         style={{position: 'absolute', left: 40, top: 22}}>
                    //         <Feather name="key" size={22} color="white" />
                    //       </View>
                    //     </View>
                    //   </View>
                    // </View>
                  )}
                </View>
              );
            })}

          {/* return (
             <ImageBackground style={styles.slide} source={{uri: item.photo_url}} />
          ) */}
        </Swiper>
      )}
      <View style={{position: 'absolute', top: 40, left: 10}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="left" color="white" size={14} />
        </TouchableOpacity>
      </View>
      <Loading visible={loading} />
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
  getPhotos,
  updateProfileIno,
  updateAdditionalIno,
  accessrequest,
})(ProfileImages);
