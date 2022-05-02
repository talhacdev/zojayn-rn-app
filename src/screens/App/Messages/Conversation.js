import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  // ScrollView,
} from 'react-native';
import {Header} from 'react-native-elements';
import CustomText from '../../../components/Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Circled_send, Circled_emojis} from '../../../assets';
import colors from '../../../theme/colors';
import Moment from 'moment';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Loading} from '../../../components/Loading';
import {load, setMaxListeners} from 'npm';
import {GiftedChat, Bubble, Day} from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import EmojiPicker from 'rn-emoji-keyboard';
import Modal from 'react-native-modal';
import AlertModal from '../../../components/AlertModal';

import styles from './styles';
const Conversation = ({route, user}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const {roomKey, roomName} = route.params;
  const [messages, setMessages] = useState([]);
  const [imageItem, setImageItem] = useState(null);
  const [move, setMove] = useState('');
  console.log('RoomMsg' + JSON.stringify(messages));
  const [message, setMessage] = useState('');
  const [send, setSend] = useState(false);
  const [ifonline, setifonline] = useState('No');
  const [msg, setMsg] = useState('');
  const [showAlert, setShoAlert] = useState(false);
  const {height, width} = Dimensions.get('window');

  const messagesRef = database().ref(`messages/${roomKey}`);

  const flatRef = useRef();
  const roomsRef = database().ref('rooms');
  const [isOpen, setIsOpen] = useState(false);
  const mydp = route.params.roomdp;
  const targetuserid = route.params.userid;
  const Onlineref = database().ref(`online/` + targetuserid);

  console.log('myparamdp', targetuserid);

  //emjoi
  const handlePick = emojiObject => {
    setMessage(message.concat(emojiObject.emoji));
  };
  const [modalVisible, setModalVisible] = useState(false);

  //Date Wise Messages Part
  function groupedDays(msgs) {
    return msgs.reduce((acc, el, i) => {
      const messageDay = moment(el.createdAt).format('YYYY-MM-DD');
      if (acc[messageDay]) {
        return {...acc, [messageDay]: acc[messageDay].concat([el])};
      }
      return {...acc, [messageDay]: [el]};
    }, {});
  }

  function generateItems(msgs) {
    const days = groupedDays(msgs);
    const sortedDays = Object.keys(days).sort(
      (x, y) => moment(y, 'YYYY-MM-DD').unix() - moment(x, 'YYYY-MM-DD').unix(),
    );
    const items = sortedDays.reduce((acc, date) => {
      const sortedMessages = days[date].sort(
        (x, y) => new Date(y.created_at) - new Date(x.created_at),
      );
      return acc.concat([...sortedMessages, {type: 'day', date, id: date}]);
    }, []);
    return items;
  }
  //Date Wise Messages Part

  useEffect(() => {
    listenForMessages(messagesRef);
  }, []);

  const listenForMessages = messagesRef => {
    messagesRef.on('value', snapshot => {
      let messagesFB = [];
      snapshot.forEach(child => {
        console.log('helo', child.val());
        if (
          child.val().fist_user_dlted == user.id ||
          child.val().scnd_user_dlted == user.id
        ) {
        } else {
          messagesFB = [
            ...messagesFB,
            {
              _id: child.key,
              text: child.val().text,
              createdAt: child.val().createdAt,
              recvid: child.val().recvid,
              sendid: child.val().sendid,
              sendername: child.val().sendername,
              recvrname: child.val().recvrname,
              status: child.val().status,
              sndrdp: child.val().sndrdp,
              recvrdp: child.val().recvrdp,
            },
          ];
        }
      });

      setMessages(messagesFB);
    });
  };

  useEffect(() => {
    // Execute transaction
    Onlineref.transaction(currentLikes => {
      if (currentLikes) {
        if (currentLikes.onlinestatus == 'Online') {
          setifonline('Yes');
        } else {
          setifonline('No');
        }
      }
    });
  }, []);

  Onlineref.on('value', snapshot => {
    Onlineref.transaction(currentLikes => {
      if (currentLikes) {
        if (currentLikes.onlinestatus == 'Online') {
          setifonline('Yes');
        } else {
          setifonline('No');
        }
      }
    });
  });

  const checkLastMsg = () => {
    try {
      console.log('hi');
      messagesRef.on('value', snapshot => {
        let messagesFB = [];
        snapshot.forEach(child => {
          messagesFB = [
            ...messagesFB,
            {
              _id: child.key,
              text: child.val().text,
              createdAt: child.val().createdAt,
              id: child.val().user?._id,
              status: child.val().status,
              user: {
                _id: child.val().user?._id,
                name: child.val().user.name,
              },
            },
          ];
        });

        let last =
          messagesFB?.length > 1
            ? messagesFB[messagesFB.length - 1]
            : messagesFB[0];
        let msgId = last?._id;

        if (last?.id != user?.firebase_uid) {
          last &&
            database().ref(`messages/${roomKey}`).child(msgId).update({
              text: last?.text,
              createdAt: last?.createdAt,
              user: last?.user,
              status: 'read',
            });
        }
      });
    } catch (err) {
      console.log(err);
    }
    setSend(false);
  };

  const addMessage = () => {
    if (message.length > 0) {
      messagesRef.push({
        text: message,
        createdAt: Date.now(),
        status: 'unread',
        sendid: user.id,
        sendername: user.first_name,
        recvid: targetuserid,
        recvrname: roomName,
        sndrdp: user.dp,
        recvrdp: mydp,
        fist_user_dlted: 'no',
        scnd_user_dlted: 'no',
      });
      // setSend(true);
      setMessage('');
    }
  };

  if (messages.length > 0) {
    const lastid = messages[messages.length - 1]._id;
    console.log('lastmsgkey', messages[messages.length - 1]);

    if (messages[messages.length - 1].sendid == user.id) {
    } else {
      database()
        .ref('/messages/' + roomKey + '/' + lastid)
        .update({
          status: 'read',
        })
        .then(() => console.log('Data updated.'));
    }
  }

  console.log('online status', ifonline);
  const deltemsgs = () => {
    if (messages.length > 0) {
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].fist_user_dlted == 'no') {
          database()
            .ref('/messages/' + roomKey + '/' + messages[i]._id)
            .update({
              fist_user_dlted: user.id,
            })
            .then(() => console.log('Data updated.'));
        } else {
          database()
            .ref('/messages/' + roomKey + '/' + messages[i]._id)
            .update({
              scnd_user_dlted: user.id,
            })
            .then(() => console.log('Data updated.'));
        }
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          width: '100%',
          paddingTop: 50,
          flexDirection: 'row',
          height: height * 0.12,
        }}>
        <View
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Ionicons
            onPress={() => {
              navigation.goBack();
            }}
            name={'chevron-back'}
            size={22}
            color={colors.secondary}
            style={{marginHorizontal: 10, alignSelf: 'center'}}
          />
        </View>
        <View
          style={{
            width: '18%',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <View style={{width: 60, height: 60, borderRadius: 60 / 2}}>
            <Image
              style={{height: 50, width: 50, borderRadius: 50 / 2}}
              source={{
                uri: mydp,
              }}
            />
            {ifonline == 'Yes' && (
              <View
                style={{
                  position: 'absolute',
                  top: 3,
                  right: 12,
                  height: 10,
                  width: 10,
                  borderRadius: 10 / 2,
                  backgroundColor: '#00c23a',
                }}
              />
            )}
          </View>
        </View>
        <View
          style={{
            width: '35%',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <CustomText
            title={roomName}
            type={'medium'}
            color={colors.secondary}
            textAlign={'left'}
            style={{fontSize: 15, fontWeight: 'bold', marginBottom: 10}}
          />
        </View>
        <View
          style={{
            width: '32%',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: 'row',
            }}>
            <MaterialCommunityIcons
              name={'dots-vertical'}
              size={20}
              color={colors.secondary}
            />
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}
            onRequestClose={() => {}}>
            <View style={Styles.centeredView}>
              <View style={Styles.modalView}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.navigate('Timeline', {userid: targetuserid});
                  }}>
                  <Text style={Styles.modalText}>View Profile</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => {
                    setImageItem(0);
                    setMsg('Are you sure to move image to public');
                    setMove(0);
                    setShoAlert(true);
                    // setModalVisible(!modalVisible);
                  }}>
                  {showAlert && (
                    <AlertModal
                      heading={msg}
                      button1="Yes"
                      button2="NO"
                      onYesPress={() => {
                        movePicUpDown(imageItem, move);
                        setShoAlert(false);
                      }}
                      onNoPress={() => {
                        setShoAlert(false);
                      }}
                    />
                  )}
                  <Text style={Styles.modalText}>Block User</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    deltemsgs();
                  }}>
                  <Text style={Styles.modalText}>Delete Chat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <ScrollView style={{height: height * 0.78}}>
        <FlatList
          data={generateItems(messages).sort(
            (a, b) => b.createdAt - a.createdAt,
          )}
          inverted
          renderItem={({item, index}) => {
            if (
              item.type === 'day' &&
              item.date === moment().format('YYYY-MM-DD')
            ) {
              return (
                <Text
                  style={{
                    backgroundColor: '#ffffff',
                    textAlign: 'center',
                    alignSelf: 'center',
                    padding: 10,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#dadada',
                    fontWeight: 'bold',
                  }}>
                  Today
                </Text>
              );
            } else if (item.type === 'day') {
              return (
                <Text
                  style={{
                    backgroundColor: '#ffffff',
                    textAlign: 'center',
                    alignSelf: 'center',
                    padding: 10,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#dadada',
                    fontWeight: 'bold',
                  }}>
                  {moment(item.date).format('ll')}
                </Text>
              );
            } else {
              console.log(JSON.stringify(item));
              return (
                <ScrollView>
                  <View
                    style={{
                      flex: 1,
                      margin: 10,
                      alignSelf:
                        item.id !== user?.id ? 'flex-start' : 'flex-end',
                    }}>
                    <View
                      style={{
                        justifyContent: 'space-around',
                        alignSelf: 'flex-start',
                      }}>
                      {item.sendid == user?.id ? (
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            margin: 10,
                          }}>
                          <View
                            style={{
                              height: 50,
                              width: '20%',
                              borderRadius: 50 / 2,
                              justifyContent: 'center',
                              alignItems: 'flex-start',
                            }}>
                            <Image
                              style={{
                                height: 45,
                                width: 45,
                                borderRadius: 45 / 2,
                              }}
                              source={{
                                uri: item.sndrdp,
                              }}
                            />
                          </View>
                          <View
                            style={{
                              width: '80%',
                              justifyContent: 'center',
                              alignItems: 'flex-start',
                              padding: 12,
                              borderRadius: 10,
                              backgroundColor: 'white',
                              shadowColor: '#000',
                              shadowOffset: {
                                width: 0,
                                height: 1,
                              },
                              shadowOpacity: 0.2,
                              shadowRadius: 1.41,

                              elevation: 2,
                            }}>
                            <Text>{item.text}</Text>
                            <Text style={{fontSize: 10, color: '#b2b2b2'}}>
                              {Moment(item.createdAt).format('LT')}
                            </Text>
                            <TouchableOpacity
                              style={{
                                position: 'absolute',
                                top: -2,
                                right: 5,
                                margin: 3,
                              }}>
                              <MaterialIcons
                                color="#d4d4d4"
                                size={25}
                                name="keyboard-arrow-down"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : (
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            margin: 10,
                          }}>
                          <View
                            style={{
                              width: '80%',
                              justifyContent: 'center',
                              alignItems: 'flex-start',
                              padding: 12,
                              borderRadius: 10,
                              backgroundColor: '#f5f5f5',
                              shadowColor: '#000',
                              shadowOffset: {
                                width: 0,
                                height: 1,
                              },
                              shadowOpacity: 0.2,
                              shadowRadius: 1.41,

                              elevation: 2,
                            }}>
                            <Text ellipsizeMode="tail" numberOfLines={1}>
                              {item.text}
                            </Text>
                            <Text style={{fontSize: 10, color: '#b2b2b2'}}>
                              {Moment(item.createdAt).format('LT')}
                            </Text>
                            <TouchableOpacity
                              style={{
                                position: 'absolute',
                                top: -2,
                                right: 5,
                                margin: 3,
                              }}>
                              <MaterialIcons
                                color="#d4d4d4"
                                size={25}
                                name="keyboard-arrow-down"
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              height: 50,
                              width: '20%',
                              borderRadius: 50 / 2,
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                            }}>
                            <Image
                              style={{
                                height: 45,
                                width: 45,
                                borderRadius: 45 / 2,
                              }}
                              source={{
                                uri: item.sndrdp,
                              }}
                            />
                          </View>
                        </View>
                      )}
                      {/*                   <Text
                        style={{
                          textAlign:
                            item.id !== user?.firebase_uid ? 'left' : 'right',
                          width: '100%',
                          // marginLeft: 10,
    
                          color: item.id === user?.firebase_uid ? '#000' : '#000',
                          fontSize: 12,
                          //padding: 10,
                          marginTop: 10,
                        }}>
                        {Moment(item.created_at).format('LT')}
                      </Text> */}
                    </View>
                  </View>
                </ScrollView>
              );
            }
          }}
          keyExtractor={item => item.id}
        />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          padding: Platform.OS === 'ios' ? 8 : 8,
          borderColor: '#ddd',
          shadowColor: '#BDBDBD',
          backgroundColor: '#f9f9f9',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.5,
          marginHorizontal: 10,
          elevation: 1,
          alignItems: 'center',
          borderRadius: 30,
          marginBottom: 20,
        }}>
        <View
          style={{
            flex: 0.9,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsOpen(true);
            }}
            style={{
              marginLeft: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={Circled_emojis} style={{height: 40, width: 40}} />
          </TouchableOpacity>
          <TextInput
            value={message}
            onChangeText={e => setMessage(e)}
            placeholderTextColor={'gray'}
            placeholder="Write Here..."
            multiline
            style={{paddingLeft: 10, color: 'black', width: '80%'}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 0.2,
            aligItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              addMessage();
            }}
            style={{
              marginLeft: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={Circled_send} style={{height: 40, width: 40}} />
          </TouchableOpacity>
        </View>
      </View>
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </View>
  );
};
const mapStateToProps = state => {
  const {user} = state.auth;
  return {user};
};

const Styles = StyleSheet.create({
  modalView: {
    marginBottom: 500,
    marginRight: 10,
    backgroundColor: '#fdfdfd',
    borderRadius: 10,
    width: 130,
    alignSelf: 'flex-end',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#6e6e6e',
    padding: 5,
  },
});
export default connect(mapStateToProps)(Conversation);
