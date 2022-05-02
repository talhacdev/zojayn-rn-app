import React, {useReducer, useState, useRep, useEffect} from 'react';
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
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import Button from '../../../components/Button';
import CustomText from '../../../components/Text';
import {Header, Badge, Icon} from 'react-native-elements';
// import {Input} from '../../../components/Input/Input';
// import DateTimePicker from '@react-native-community/datetimepicker';

// import {SocialButton} from '../../../components/SocialButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import Feather from 'react-native-vector-icons/Feather';
import {RBSheet} from 'react-native-raw-bottom-sheet';
//google
import {Textarea} from 'react-native-textarea';
import Modal1 from '../../../components/Modal1';

import colors from '../../../theme/colors';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {updown} from '../../../assets';
// import CustomModal from '../../../components/Modal';
import {
  Circled_edit,
  Premium,
  Profile_pic_placeholder,
  Premium_black,
  Video,
  Circled_favorite_on,
  Circled_favorite_off,
  Messages_active,
  Blocked_person,
  Imagepic,
  GradientYellow,
} from '../../../assets';
import {
  GradientButtongray,
  GradientButtonyellow,
  GradientButtongrayPic,
  LinearGradient,
  GradientButtonupgrade1,
} from '../../../components/GradientButton';
// import {Loading} from '../../../components/Loading';
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
// import AlertModal from '../../../components/AlertModal';
import fonts from '../../../theme/fonts';
import {storeurl} from '../../../redux/actions/storeurl';
import {Loading} from '../../../components/Loading';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
const roomRef = database().ref('rooms');

//facebook
const Timeline = ({
  navigation,
  route,
  signInWithPhone,
  token,
  userData,
  updateAccount,
  updateProfileIno,
  updateAdditionalIno,
}) => {
  // const userid = 11;
  // const from = route?.params?.from;
  const [myprop, setmyprop] = useState(false);
  const [profiledata, setprofiledata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userallimages, setuserallimages] = useState(false);

  const [userid, setuserid] = useState(
    parseInt(route?.params?.userid) > 0 ? route?.params?.userid : userData.id,
  );

  console.log('myuserdata', userData);

  const formData = new FormData();
  formData.append('userid', userid);
  useEffect(() => {
    setLoading(true);
    axios
      .post(`${storeurl}api/user_details`, formData, {
        headers: {
          auth: userData.auth,
        },
      })
      .then(res => {
        if (res.data.status == true) {
          console.log('userdetails', res.data.data[0]);
          setprofiledata(res.data.data[0]);
          setLoading(false);
          setuserallimages(res.data.data[0].alluserphotos);
        } else {
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('my response err', res);
        console.log(err);
        rej(err.message);
      });
  }, []);

  function handleChange(newValue) {
    if (newValue == 'false') {
      setmyprop(false);
    } else {
      if (newValue == 'unblockuser') {
        newValue = {
          name: 'unblockuser',
          userid: profiledata.id,
        };
      } else if (newValue == 'blockuser') {
        newValue = {
          name: 'blockuser',
          userid: profiledata.id,
        };
      } else if (newValue == 'favuser') {
        newValue = {
          name: 'favuser',
          userid: profiledata.id,
        };
      } else if (newValue == 'unfavuser') {
        newValue = {
          name: 'unfavuser',
          userid: profiledata.id,
        };
      }
      console.log('my only status', newValue);
      setmyprop(newValue);
    }

    axios
      .post(`${storeurl}api/user_details`, formData, {
        headers: {
          auth: userData.auth,
        },
      })
      .then(res => {
        // setLoading(false);
        if (res.data.status == true) {
          setprofiledata(res.data.data[0]);
        } else {
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        rej(err.message);
      });
  }

  const checkRoomExists = async item => {
    try {
      roomRef.on('value', snapshot => {
        let roomsFB = [];
        snapshot.forEach(element => {
          roomsFB.push({
            recv_name: element.val().recv_name,
            send_name: element.val().send_name,
            key: element.key,
            send_uid: element.val().send_uid,
            recv_uid: element.val().recv_uid,
            created_at: element.val().created_at,
          });
        });

        const res = roomsFB?.some(element => {
          return (
            (element.recv_uid == item.id && element.send_uid == userData.id) ||
            (element.recv_uid == userData.id && element.send_uid == item.id)
          );
        });

        if (res) {
          const index = roomsFB.find(element => {
            return (
              (element.recv_uid == item.id &&
                element.send_uid == userData.id) ||
              (element.recv_uid == userData.id && element.send_uid == item.id)
            );
          });
          navigation.navigate('Conversation', {
            roomKey: index.key,
            roomName: item.first_name + ' ' + item.last_name,
            roomdp: item.dp,
            userid: item.id,
          });
        } else {
          addRoom(item);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const addRoom = async item => {
    let roomsFB = [];
    try {
      await roomRef.push({
        recv_name: item.first_name + ' ' + item.last_name,
        send_name: userData?.first_name + ' ' + userData?.last_name,
        send_uid: userData?.id,
        recv_uid: item.id,
        sender_dp: userData.dp,
        recv_dp: item.dp,
        created_at: new Date().getTime(),
      });

      roomRef.on('value', snapshot => {
        let roomsFB = [];
        snapshot.forEach(element => {
          roomsFB.push({
            recv_name: element.val().recv_name,
            send_name: element.val().send_name,
            key: element.key,
            send_uid: element.val().send_uid,
            recv_uid: element.val().recv_uid,
            created_at: element.val().created_at,
          });
        });

        const res = roomsFB?.some(element => {
          return (
            (element.recv_uid == item.id && element.send_uid == userData.id) ||
            (element.recv_uid == userData.id && element.send_uid == item.id)
          );
        });

        if (res) {
          const index = roomsFB.find(element => {
            return (
              (element.recv_uid == item.id &&
                element.send_uid == userData.id) ||
              (element.recv_uid == userData.id && element.send_uid == item.id)
            );
          });
          navigation.navigate('Conversation', {
            roomKey: index.key,
            roomName: item.first_name + ' ' + item.last_name,
            roomdp: item.dp,
            userid: item.id,
          });
        } else {
          // addRoom(item);
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View style={{}}>
      <ScrollView style={{backgroundColor: 'white'}}>
        <Header
          containerStyle={{height: 130}}
          backgroundColor={'transparent'}
          leftComponent={
            <View
              style={{
                // flexDirection: 'row',
                // width: 30,
                // height: 30,
                // alignItems: 'center',
                // justifyContent:'center',
                marginBottom: 10,
              }}>
              <Ionicons
                name={'chevron-back'}
                size={20}
                color={colors.secondary}
                onPress={() => {
                  navigation.goBack();
                }}
                style={{alignSelf: 'center'}}
              />
            </View>
          }
          centerComponent={
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '150%',
                // marginTop:20
              }}>
              <View style={{}}>
                <CustomText
                  title={
                    profiledata
                      ? profiledata.first_name + ' ' + profiledata.last_name
                      : ''
                  }
                  type={'large'}
                  color={colors.secondary}
                  style={{fontSize: 24, fontWeight: 'bold'}}
                />
              </View>

              <CustomText
                title={'This profile is monitored by her guardian'}
                type={'medium'}
                color={'black'}
                style={{fontSize: 12}}
              />
            </View>
          }
        />

        {/* <View style={{marginTop: -20}}>
          {profiledata.ispro == 'No' && profiledata.id == userData.id && (
            <GradientButtonyellow
              title={'Upgrade to pro1'}
              onButtonPress={() => {
                navigation.navigate('UnlockProFeature');
              }}
              iconLeft={Premium_black}
            />
          )}
        </View> */}

        <View
          style={{
            marginTop: -15,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UnlockProFeature');
            }}>
            {profiledata.ispro == 'No' && profiledata.id == userData.id && (
              <ImageBackground
                source={GradientYellow}
                style={{
                  height: 35,
                  width: '60%',
                  borderRadius: 60 / 2,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '60%',
                  }}>
                  <Image
                    source={Premium_black}
                    style={{height: 15, width: 15, marginTop: 10}}
                  />
                  <Text
                    style={{paddingTop: 7, fontWeight: 'bold', fontSize: 12}}>
                    Upgrade to pro
                  </Text>
                </View>
              </ImageBackground>
            )}
          </TouchableOpacity>
        </View>

        {profiledata.id != userData.id && (
          <View
            style={{
              flexDirection: 'row',
              // marginTop: 40,
            }}></View>
        )}

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
          }}>
          <Image
            style={{height: 320, width: '100%'}}
            source={{
              uri: profiledata.coverphoto,
            }}
          />
          <Badge
            value=" "
            status="success"
            containerStyle={{position: 'absolute', top: 20, right: 12}}
          />
        </View>

        {userData.id != profiledata.id && profiledata.userphotos > 0 && (
          <View
            style={{
              width: 220,
              alignSelf: 'flex-end',
              paddingRight: 10,
              marginTop: -80,
            }}>
            <GradientButtongrayPic
              onButtonPress={() => {
                navigation.navigate('ProfileImages', {userid: userallimages});
              }}
              title={'See all pictures (' + profiledata.userphotos + ')'}
              iconLeft={Imagepic}
            />
          </View>
        )}

        {userData.id == profiledata.id && (
          <View
            style={{
              width: 270,
              paddingRight: 10,
              marginTop: -80,
              alignSelf: 'center',
            }}>
            <GradientButtongrayPic
              onButtonPress={() => {
                navigation.navigate('AddPhotoVid');
              }}
              title={'Photos & video managment'}
              iconLeft={Imagepic}
            />
          </View>
        )}

        {profiledata.id == userData.id && (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              paddingLeft: 25,
              paddingRight: 30,
            }}>
            <View>
              <Text style={{paddingTop: 4, paddingRight: 10, color: 'gray'}}>
                {profiledata.tagline
                  ? profiledata.tagline
                  : 'Tagline not provided '}{' '}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  handleChange('aboutyou');
                }}>
                <Image
                  source={Circled_edit}
                  style={{height: 30, width: 30, alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {profiledata.id != userData.id && (
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 20,
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View style={{marginTop: 26, flex: 5}}>
              <Text style={{color: 'gray'}}>
                {profiledata.tagline
                  ? profiledata.tagline
                  : 'Tagline not provided '}
              </Text>
            </View>

            <View style={{marginTop: 20, flex: 1}}>
              {profiledata.isblocked == 'Yes' && (
                <TouchableOpacity
                  onPress={() => {
                    handleChange('unblockuser');
                  }}>
                  <Image
                    source={Blocked_person}
                    style={{height: 30, width: 30, alignSelf: 'center'}}
                  />
                </TouchableOpacity>
              )}

              {profiledata.isblocked == 'No' && (
                <TouchableOpacity
                  onPress={() => {
                    handleChange('blockuser');
                  }}>
                  <Image
                    source={Blocked_person}
                    style={{height: 30, width: 30, alignSelf: 'center'}}
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={{marginTop: 22, flex: 1}}>
              <TouchableOpacity
                onPress={() => {
                  checkRoomExists(profiledata);
                }}>
                <Image
                  source={Messages_active}
                  style={{height: 22, width: 27, alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 16, flex: 1}}>
              {profiledata.isliked == 'No' && (
                <TouchableOpacity
                  onPress={() => {
                    handleChange('favuser');
                  }}>
                  <Image
                    source={Circled_favorite_off}
                    style={{height: 35, width: 35, alignSelf: 'center'}}
                  />
                </TouchableOpacity>
              )}

              {profiledata.isliked == 'Yes' && (
                <TouchableOpacity
                  onPress={() => {
                    handleChange('unfavuser');
                  }}>
                  <Image
                    source={Circled_favorite_on}
                    style={{height: 35, width: 35, alignSelf: 'center'}}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '97%',
          }}>
          <View style={{paddingLeft: 25, marginTop: 20}}>
            <Text
              style={{
                fontSize: 20,
                color: colors.secondary,
                fontFamily: fonts.PoppinsBold,
              }}>
              {profiledata.first_name + ' ' + profiledata.last_name}
            </Text>
            <Text style={{color: 'rgb(0, 0, 0,0)'}}>
              {profiledata.age ? profiledata.age : 'Age not provided '} ,
              {profiledata.gender
                ? profiledata.gender
                : ' Gender not provided '}
            </Text>
            <Text style={{color: 'black'}}>
              {profiledata.city_name
                ? profiledata.city_name
                : 'City not provided '}{' '}
              ,
              {profiledata.country_name
                ? profiledata.country_name
                : ' Country not provided '}
            </Text>
          </View>
          {profiledata.id == userData.id && (
            <View style={{marginTop: 16}}>
              <TouchableOpacity
                onPress={() => {
                  handleChange('additionalinfo');
                }}>
                <Image source={Circled_edit} style={{height: 35, width: 35}} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {myprop != false && <Modal1 status={myprop} onChange={handleChange} />}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={styles.heading}>
            <Text
              style={{
                fontSize: 20,
                color: colors.secondary,
                fontFamily: fonts.PoppinsBold,
                flex: 1,
              }}>
              Islamic values
            </Text>
            {profiledata.id == userData.id && (
              <View style={{flex: 1, alignSelf: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => {
                    handleChange('aboutyou');
                  }}>
                  <Image
                    source={Circled_edit}
                    style={{height: 35, width: 35, alignSelf: 'flex-end'}}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.bgchange}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>Sect</Text>
          </View>
          <View
            style={{
              flex: 1,

              alignItems: 'flex-start',
            }}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              {profiledata.sect ? profiledata.sect : 'Not yet provided'}
            </Text>
          </View>
        </View>
        <View style={styles.bgnochange}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>Religious Practice</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              {profiledata.religion_practice
                ? profiledata.religion_practice
                : 'Not yet provided'}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={styles.heading1}>
            <Text
              style={{
                fontSize: 20,
                color: colors.secondary,
                fontFamily: fonts.PoppinsBold,
                flex: 2,
              }}>
              Appearence & health
            </Text>
            {profiledata.id == userData.id && (
              <View style={{flex: 1, alignSelf: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => {
                    handleChange('appearencehealth');
                  }}>
                  <Image
                    source={Circled_edit}
                    style={{height: 35, width: 35, alignSelf: 'flex-end'}}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.bgchange}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>Height</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              {profiledata.heightinfeet
                ? profiledata.heightinfeet + "'" + profiledata.heightininches
                : 'Not yet provided'}
            </Text>
          </View>
        </View>
        <View style={styles.bgnochange}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>Weight</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              {profiledata.weight
                ? profiledata.weight + ' kg'
                : 'Not yet provided'}
            </Text>
          </View>
        </View>
        <View style={styles.bgchange}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>Disabilities</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              {profiledata.disability
                ? profiledata.disability + ' ' + profiledata.describedisability
                : 'Not yet provided'}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={styles.heading}>
            <Text
              style={{
                fontSize: 20,
                color: colors.secondary,
                fontFamily: fonts.PoppinsBold,
                flex: 2,
              }}>
              Family background
            </Text>
            {profiledata.id == userData.id && (
              <View style={{flex: 1, alignSelf: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => {
                    handleChange('familybackground');
                  }}>
                  <Image
                    source={Circled_edit}
                    style={{height: 35, width: 35, alignSelf: 'flex-end'}}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.bgchange}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>Ethincity</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              {profiledata.ethinicity
                ? profiledata.ethinicity
                : 'Not yet provided'}
            </Text>
          </View>
        </View>
        <View style={styles.bgnochange}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>Language</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              {profiledata.language_name
                ? profiledata.language_name
                : 'Not yet provided'}
            </Text>
          </View>
        </View>
        <View style={styles.bgchange}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>Nationality</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              {profiledata.nationality_name
                ? profiledata.nationality_name
                : 'Not yet provided'}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={styles.heading}>
            <Text
              style={{
                fontSize: 20,
                color: colors.secondary,
                fontFamily: fonts.PoppinsBold,
                flex: 2,
              }}>
              Education & profession
            </Text>
            {profiledata.id == userData.id && (
              <View style={{flex: 1, alignSelf: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => {
                    handleChange('educationprofession');
                  }}>
                  <Image
                    source={Circled_edit}
                    style={{height: 35, width: 35, alignSelf: 'flex-end'}}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.bgchange}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>Education level</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              {profiledata.education
                ? profiledata.education
                : 'Not yet provided'}
            </Text>
          </View>
        </View>
        <View style={styles.bgnochange}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>Profession</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              {profiledata.profession
                ? profiledata.profession
                : 'Not yet provided'}
            </Text>
          </View>
        </View>
        <View style={styles.bgchange}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>Earnings per month</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              {profiledata.earningpermonth
                ? profiledata.earningpermonth
                : 'Not yet provided'}
            </Text>
          </View>
        </View>
        <View style={styles.bgnochange}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>Maritial status</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              {profiledata.martial_status
                ? profiledata.martial_status
                : 'Not yet provided'}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={styles.heading}>
            <Text
              style={{
                fontSize: 20,
                color: colors.secondary,
                fontFamily: fonts.PoppinsBold,
                flex: 2,
              }}>
              Wali information
            </Text>
            {profiledata.id == userData.id && (
              <View style={{flex: 1, alignSelf: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => {
                    handleChange('walisinformation');
                  }}>
                  <Image
                    source={Circled_edit}
                    style={{height: 35, width: 35, alignSelf: 'flex-end'}}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.bgchange}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>First Name</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              {profiledata.wali_f_name
                ? profiledata.wali_f_name
                : 'Not yet provided'}
            </Text>
          </View>
        </View>
        <View style={styles.bgnochange}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>Last Name</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              {profiledata.wali_l_name
                ? profiledata.wali_l_name
                : 'Not yet provided'}
            </Text>
          </View>
        </View>
        <View style={styles.bgchange}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>Email</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              {profiledata.wali_email
                ? profiledata.wali_email
                : 'Not yet provided'}
            </Text>
          </View>
        </View>
        <View style={styles.bgnochange}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>Phone</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              {profiledata.wali_phone
                ? profiledata.wali_phone
                : 'Not yet provided'}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={styles.heading}>
            <Text
              style={{
                fontSize: 20,
                color: colors.secondary,
                fontFamily: fonts.PoppinsBold,
                flex: 2,
              }}>
              Myself & spouse
            </Text>
            {profiledata.id == userData.id && (
              <View style={{flex: 1, alignSelf: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => {
                    handleChange('aboutyou');
                  }}>
                  <Image
                    source={Circled_edit}
                    style={{height: 35, width: 35, alignSelf: 'flex-end'}}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.bgchange1}>
          <Text style={{fontSize: 16}}>About myself</Text>
          <Text style={{fontSize: 14, paddingTop: 10}}>
            {profiledata.about ? profiledata.about : 'Not yet provided'}
          </Text>
        </View>

        <View style={styles.bgchange2}>
          <Text style={{fontSize: 16}}>
            What im looking in my potential spouse ?
          </Text>
          <Text style={{fontSize: 14, paddingTop: 10}}>
            {profiledata.aboutpartner
              ? profiledata.aboutpartner
              : 'Not yet provided'}
          </Text>
        </View>

        <View style={styles.bgchange1}>
          <Text style={{fontSize: 16}}>Likes</Text>
          <Text style={{fontSize: 14, paddingTop: 10}}>
            {profiledata.likes ? profiledata.likes : 'Not yet provided'}
          </Text>
        </View>

        <View style={[styles.bgchange2, {marginBottom: 20}]}>
          <Text style={{fontSize: 16}}>Dislikes</Text>
          <Text style={{fontSize: 14, paddingTop: 10}}>
            {profiledata.dislikes ? profiledata.dislikes : 'Not yet provided'}
          </Text>
        </View>
        {/* <RBSheet /> */}
      </ScrollView>

      <Loading visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 40,
    paddingLeft: 25,
    paddingBottom: 5,
    paddingRight: 15,
  },
  heading1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 15,
    paddingLeft: 25,
    paddingBottom: 5,
    paddingRight: 15,
  },
  bgchange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    paddingLeft: 25,
    paddingBottom: 12,
    paddingRight: 15,
    backgroundColor: colors.grey,
  },
  bgnochange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    paddingLeft: 25,
    paddingBottom: 12,
    paddingRight: 15,
    backgroundColor: `white`,
  },
  bgchange1: {
    width: '100%',
    paddingTop: 12,
    paddingLeft: 25,
    paddingBottom: 12,
    paddingRight: 15,
    backgroundColor: `#F6F7F8`,
  },
  bgchange2: {
    width: '100%',
    paddingTop: 12,
    paddingLeft: 25,
    paddingBottom: 12,
    paddingRight: 15,
    backgroundColor: `white`,
  },
  // main: {

  // },
});

const mapStateToProps = state => {
  console.log('my state timeline', state);
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
})(Timeline);
