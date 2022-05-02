import React, {useState, useRef, useEffect} from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {Header, Badge} from 'react-native-elements';
import colors from '../../../theme/colors';
import CustomText from '../../../components/Text';
import {CustomTextMessages} from '../../../components/Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderRight from '../../../components/HeaderRight';
import ActionButton from 'react-native-action-button';

import styles from './styles';
import auth from '@react-native-firebase/auth';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Divider} from 'react-native-paper';
import {Loading} from '../../../components/Loading';
import database from '@react-native-firebase/database';
import moment from 'moment';
const roomRef = database().ref('rooms');
import {connect} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const messagesRef = database().ref('messages');

const Messages = ({user}) => {
  const navigation = useNavigation();
  const [tab, setTab] = useState(2);
  const [threads, setThreads] = useState([]);

  const [selected, setSelected] = useState('top');
  const [threadTracking, setThreadTracking] = useState({});
  const [searchWidth, setSearchWidth] = useState(new Animated.Value(0));
  const [searchState, setSearchState] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const sheet = useRef();
  const [roomKey, setRoomKey] = useState('');
  const [unreadMsgs, setUnread] = useState('0');
  const [updateflatlist, setupdateflatlist] = useState('0');

  const [last, setlast] = useState([]);

  // const animationToggle = () => {
  //   if (!searchState) {
  //     Animated.timing(searchWidth, {
  //       toValue: Dimensions.get('window').width / 1.2,
  //       timing: 15000,
  //     }).start(() => {
  //       setSearchState(true);
  //     });
  //   } else {
  //     Animated.timing(searchWidth, {
  //       toValue: 0,
  //       timing: 15000,
  //     }).start(() => {
  //       setSearchState(false);
  //     });
  //   }
  // };

  useEffect(() => {
    const unsub = listenForRooms(roomRef);
    return () => {
      unsub;
    };
  }, [isFocused, tab]);

  //let messagesFB = [];
  const [messagesFB, setmessages] = useState([]);

  const listenForRooms = roomsRef => {
    setmessages([]);
    roomsRef.on('value', snapshot => {
      let roomsFB = [];
      snapshot.forEach(element => {
        if (
          user?.id == element.val().send_uid ||
          user?.id == element.val().recv_uid
        ) {
          database()
            .ref(`messages/${element.key}`)
            .orderByValue('createdAt')
            .limitToLast(1)
            .once('value', snapshot => {
              snapshot.forEach(element1 => {
                if (tab == 1) {
                  if (
                    element1.val().sendid !== user.id &&
                    element1.val().status == 'unread'
                  ) {
                    var a = {
                      created_at: element.val().created_at,
                      recv_dp: element.val().recv_dp,
                      recv_name: element.val().recv_name,
                      recv_uid: element.val().recv_uid,
                      send_name: element.val().send_name,
                      send_uid: element.val().send_uid,
                      sender_dp: element.val().sender_dp,
                      key: element.key,
                      lastmsg: element1.val().text,
                      readstatys: element1.val().status,
                    };

                    roomsFB.push(a);

                    // setUnread(parseInt(unreadMsgs)+1);
                  }
                } else {
                  if (
                    element1.val().fist_user_dlted == user.id ||
                    element1.val().scnd_user_dlted == user.id
                  ) {
                  } else {
                    roomsFB.push({
                      created_at: element.val().created_at,
                      recv_dp: element.val().recv_dp,
                      recv_name: element.val().recv_name,
                      recv_uid: element.val().recv_uid,
                      send_name: element.val().send_name,
                      send_uid: element.val().send_uid,
                      sender_dp: element.val().sender_dp,
                      key: element.key,
                      lastmsg: element1.val().text,
                      readstatys: element1.val().status,
                    });
                  }
                }
              });
              setupdateflatlist(new Date());
              setThreads(roomsFB);
            });
        } else {
          return;
        }
      });
    });
  };

  console.log('pakistan1234', threads);

  // const test = [{
  //               created_at: "1634908358467",
  //               key: "-Mmc7RoQHMhbA0Le4eha",
  //               lastmsg: "g sadam Kia half hysss",
  //               recv_dp: "https://th.bing.com/th/id/R.4812d4d5fd9c06ec84ad926a732a5998?rik=6U32waagHz%2bwFQ&pid=ImgRaw&r=0",
  //               recv_name: "Zeshan1 khan1",
  //               recv_uid: 11,
  //               send_name: "Bilal Hasan",
  //               send_uid: 33,
  //               sender_dp: "https://ranaentp.net/nikkahnama/uploads/rn_image_picker_lib_temp_23b53860-44e8-4bb8-8161-2328fa1e2b48.jpg",
  //             },{
  //               created_at: "1634908774689",
  //               key: "-Mmc91QsZzEN_YWKY_M3",
  //               lastmsg: "I am sadam",
  //               recv_dp: "https://th.bing.com/th/id/R.4812d4d5fd9c06ec84ad926a732a5998?rik=6U32waagHz%2bwFQ&pid=ImgRaw&r=0",
  //               recv_name: "Zeshan1 khan1",
  //               recv_uid: 11,
  //               send_name: "sadam  iqbal",
  //               send_uid: 30,
  //               sender_dp: "http://ranaentp.net/nikkahnama/uploads/Profile_pic_placeholder.png"
  //             }];

  //   console.log("mytest",test);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 50}}>
        <View style={{alignItems: 'center'}}>
          <CustomText
            title={'Your Messages'}
            type={'large'}
            color={colors.secondary}
            style={{fontSize: 26}}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text>check your seen or unseen messages here</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setThreads();
            setTab(1);
            setUnread(0);
          }}
          style={[
            styles.categoryContainer,
            {
              marginRight: 10,
              // elevation: tab == 1 ? 5 : 0,
              borderBottomWidth: 2,
              borderBottomColor: tab == 1 ? '#7F1DFF' : '#D3D3D3',
              //backgroundColor: tab == 1 ? '#F6F6F6' : '#fff',
            },
          ]}>
          <View style={{flexDirection: 'row'}}>
            <CustomText
              //title={`Unread (${unreadMsgs})`}
              title={'Unread'}
              count={String(unreadMsgs)}
              type={tab === 1 ? 'bold' : 'medium'}
              color={tab === 1 ? colors.secondary : '#464646'}
              style={{fontSize: 15}}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setThreads();
            setTab(2);
          }}
          style={[
            styles.categoryContainer,
            {
              // elevation: tab == 2 ? 5 : 0,
              borderBottomWidth: 2,
              borderBottomColor: tab == 2 ? '#7F1DFF' : '#D3D3D3',
            },
          ]}>
          <CustomText
            title={'All'}
            type={tab !== 1 ? 'bold' : 'medium'}
            color={tab !== 1 ? colors.secondary : '#464646'}
            style={{fontSize: 15}}
          />
        </TouchableOpacity>
      </View>
      {console.log('mythread', threads)}
      <FlatList
        data={threads}
        extraData={updateflatlist}
        keyExtractor={item => item.key}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.card,
                {
                  backgroundColor:
                    item.readstatys == 'unread' ? '#fbfbfb' : 'white',
                  elevation: 5,
                },
              ]}
              onPress={() => {
                navigation.navigate('Conversation', {
                  roomKey: item.key,
                  roomName:
                    item.recv_uid == user.id ? item.send_name : item.recv_name,
                  roomdp:
                    item.recv_uid == user.id ? item.sender_dp : item.recv_dp,
                  userid:
                    item.recv_uid == user.id ? item.send_uid : item.recv_uid,
                });
              }}>
              <View style={{width: '20%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 80,
                    width: 80,
                    // paddingLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 0.3,
                    overflow: 'hidden',
                  }}>
                  <Image
                    style={{
                      height: 70,
                      width: 70,
                      borderRadius: 70 / 2,
                      resizeMode: 'cover',
                    }}
                    source={{
                      uri:
                        item.send_uid == user.id
                          ? item.recv_dp
                          : item.sender_dp,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 6,
                      right: 15,
                      height: 11,
                      width: 11,
                      borderRadius: 11 / 2,
                      backgroundColor: '#00c23a',
                    }}
                  />
                </View>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  width: '55%',
                }}>
                <CustomText
                  title={
                    item.recv_uid != user?.id ? item.recv_name : item.send_name
                  }
                  type={'large'}
                  color={colors.secondary}
                  style={{fontSize: 16}}
                />
                <Text ellipsizeMode="tail" numberOfLines={1}>
                  {item.lastmsg}
                </Text>

                {/*                   <CustomText
                    //title={moment(new Date(item.created_at)).format('LT')}
                    title={messagesFB
                      .filter(item2 => {
                        return item2.user._id === item.recv_uid;
                      })
                      .splice(-1)
                      .map(function (obj) {
                        return obj.text;
                      })
                      .join(", ")}
                    type={'medium'}
                    color={'black'}
                    style={{fontSize: 10}}
                  /> */}
              </View>
              <View
                style={{
                  width: '15%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  name="arrow-forward"
                  size={22}
                  color={colors.secondary}
                  style={{alignSelf: 'center', marginRight: 20}}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <Loading visible={loading} />
    </View>
  );
};
const mapStateToProps = state => {
  const {user} = state.auth;
  return {user};
};
export default connect(mapStateToProps)(Messages);
const styles1 = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    borderBottomWidth: 0.5,
    marginTop: 20,

    marginHorizontal: 30,
  },

  divider: {
    height: 1.5,
    backgroundColor: colors.secondary,

    marginTop: 5,
    width: 170,
    alignSelf: 'flex-start',
  },
});
