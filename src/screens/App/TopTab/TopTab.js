import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import styles from './styles';
import {Header, Badge} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../theme/colors';
const window = Dimensions.get('window');
import fonts from '../../../theme/fonts';
import {Loading} from '../../../components/Loading';
import {Alert} from 'react-native';
import CustomText from '../../../components/Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Divider} from 'react-native-paper';
import HeaderRight from '../../../components/HeaderRight';
import {useNavigation, useIsFocused} from '@react-navigation/native';
//redux
import {connect} from 'react-redux';
import {usersList, searchUser} from '../../../redux/actions/app';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
const roomRef = database().ref('rooms');
const TopTab = ({
  params,
  userCart,
  getWinners,
  winners,
  usersList,
  allUser,
  user,
  searchUser,
}) => {
  const navigation = useNavigation();
  const [qty, setQty] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('top');
  const [searchWidth, setSearchWidth] = useState(new Animated.Value(0));
  const [searchState, setSearchState] = useState(false);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  // const productList = useState([
  const isFocused = useIsFocused();
  const sheet = useRef();
  const animationToggle = () => {
    if (!searchState) {
      Animated.timing(searchWidth, {
        toValue: Dimensions.get('window').width / 1.2,
        timing: 15000,
      }).start(() => {
        setSearchState(true);
      });
    } else {
      Animated.timing(searchWidth, {
        toValue: 0,
        timing: 15000,
      }).start(() => {
        setSearchState(false);
      });
    }
  };
  const renderPages = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Single', {id: item.id});
        }}
        key={index}
        activeOpacity={0.9}
        style={styles.cardContainer}>
        <Image
          style={{
            height: 170,
            width: '100%',
          }}
          source={{
            uri: 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg',
          }}
        />
        <Text
          style={[
            {
              color: 'black',
              fontFamily: Fonts.PoppinsMedium,
              fontSize: 14,
              marginTop: 10,
              color: colors.black,
              marginHorizontal: 10,
            },
          ]}>
          {item.first_name + ' ' + item.last_name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{width: '70%'}}>
              <Text
                style={[
                  {
                    color: 'black',
                    fontFamily: Fonts.PoppinsMedium,
                    fontSize: 10,
                    marginTop: 10,
                    color: colors.black,
                    marginLeft: 10,
                  },
                ]}>
                {`Age: ${item.age ? item.age : 'N/A'} | DOB: ${
                  item.dob ? item.dob : 'N/A'
                } | Country: ${item.country ? item.country : 'N/A'}`}
              </Text>
              <Text
                style={[
                  {
                    color: 'black',
                    fontFamily: Fonts.PoppinsMedium,
                    fontSize: 9,

                    color: colors.gray,
                    marginLeft: 10,
                  },
                ]}>
                {'Last Online 10 min ago'}
              </Text>
            </View>
            <TouchableOpacity
              disabled
              onPress={() => {
                alert('user');
              }}
              style={{
                height: 20,
                width: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                alignSelf: 'center',
                marginLeft: 5,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                checkRoomExists(item);
              }}>
              <Image
                style={{
                  height: 28,
                  width: 28,
                  elevation: 4,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  resizeMode: 'contain',
                }}
                source={{
                  uri: 'https://icons.iconarchive.com/icons/xenatt/the-circle/512/App-Messages-icon.png',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    const unsub = getUserList();
    return () => unsub;
  }, [isFocused]);
  const getUserList = async () => {
    try {
      setLoading(true);
      const res = await usersList(user?.id);
      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

  // const checkRoomExists = async item => {
  //   try {
  //     roomRef.on('value', snapshot => {
  //       let roomsFB = [];
  //       snapshot.forEach(element => {
  //         roomsFB.push({
  //           recv_name: element.val().recv_name,
  //           send_name: element.val().send_name,
  //           key: element.key,
  //           send_uid: element.val().send_uid,
  //           recv_uid: element.val().recv_uid,
  //           created_at: element.val().created_at,
  //         });
  //       });
  //       const res = roomsFB?.some(element => {
  //         return (
  //           element.recv_uid == item.firebase_uid ||
  //           element.send_uid == item.firebase_uid
  //         );
  //       });
  //       if (res) {
  //         const index = roomsFB.find(element => {
  //           return (
  //             element.recv_uid == item.firebase_uid ||
  //             element.send_uid == item.firebase_uid
  //           );
  //         });
  //         navigation.navigate('Conversation', {
  //           roomKey: index.key,
  //           roomName: index.recv_name,
  //         });
  //       } else {
  //         addRoom(item);
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const addRoom = async item => {
  //   try {
  //     await roomRef.push({
  //       recv_name: item.first_name + ' ' + item.last_name,
  //       send_name: user?.first_name + ' ' + user?.last_name,
  //       send_uid: user?.firebase_uid,
  //       recv_uid: item.firebase_uid,
  //       status: '',

  //       created_at: new Date().getTime(),
  //     });
  //     navigation.navigate('Messages');
  //   } catch (err) {
  //     alert(err);
  //   }
  // };
  const handleSearch = async e => {
    try {
      setSearch(e);

      if (e.length > 2) {
        const formData = new FormData();
        formData.append('search_string', e);

        const res = await searchUser(formData);
        setFiltered(res);
      }
    } catch (err) {}
  };
  return (
    <View style={styles.mainContainer}>
      <StatusBar content />
      <View style={styles.header}>
        <View style={styles.top}>
          <CustomText
            title={''}
            type={'medium'}
            color={'white'}
            style={{fontSize: 16}}
          />

          {!searchState && (
            <CustomText
              title={'Welcome Kadir'}
              type={'medium'}
              color={'white'}
              style={{fontSize: 16, marginLeft: 10}}
            />
          )}
          <View style={{marginRight: 10}}>
            <HeaderRight
              searchWidth={searchWidth}
              searchState={searchState}
              value={search}
              onChangeText={e => {
                handleSearch(e);
              }}
              onPress={() => {
                !searchState && setSearchState(!searchState);
                animationToggle();
              }}
            />
          </View>
        </View>
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => {
              setSelected('top');
            }}>
            <CustomText
              title={'Top Picks'}
              type={'large'}
              color={'white'}
              style={{fontSize: 14}}
            />
            {selected == 'top' && <Divider style={styles.divider} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected('like');
            }}>
            <CustomText
              title={'Liked'}
              type={'large'}
              color={'white'}
              style={{fontSize: 14}}
            />
            {selected == 'like' && <Divider style={styles.divider} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected('follow');
            }}>
            <CustomText
              title={'follow'}
              type={'large'}
              color={'white'}
              style={{fontSize: 14}}
            />
            {selected == 'follow' && <Divider style={styles.divider} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected('visit');
            }}>
            <CustomText
              title={'Visitors'}
              type={'large'}
              color={'white'}
              style={{fontSize: 14}}
            />
            {selected == 'visit' && <Divider style={styles.divider} />}
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={search ? filtered : allUser}
        renderItem={renderPages}
        keyExtractor={(item, index) => item + index.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
      <Loading visible={loading} />
    </View>
  );
};
const mapStateToProps = state => {
  const {allUser} = state.app;
  const {user} = state.auth;
  return {allUser, user};
};
export default connect(mapStateToProps, {usersList, searchUser})(TopTab);
