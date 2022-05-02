import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  StyleSheet,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../../components/Text';
import {Avatar} from 'react-native-elements';
import styles from './styles';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  article,
  dashboard,
  collection,
  Rate_on,
  Bookmark,
  Delete_multicolored_on,
  Premium,
  Filter,
  chat,
  Question,
  settings,
  call,
  Profile_multicolored,
  Profile_edit,
  Password_multicolored,
  Video,
  Blocked_person,
  Sign_out_multicolored,
  Privacy_multicolored,
} from '../../../assets';
import {Divider} from 'react-native-paper';
import {logoutSuccess} from '../../../redux/actions/auth';
import {CommonActions} from '@react-navigation/routers';
import {Header, Badge, Icon} from 'react-native-elements';

const Settings = ({logoutSuccess}) => {
  const navigation = useNavigation();
  const [profileData, setData] = useState([
    {
      id: 0,
      name: 'Profile management',
      onPress: 'profile',
      navicon: Profile_multicolored,
      icon: (
        <Ionicons
          name="md-person"
          size={18}
          color={'white'}
          style={{position: 'absolute', right: 30}}
        />
      ),
    },
    {
      id: 1,
      name: 'Account information',
      onPress: 'profile1',
      navicon: Profile_edit,
      icon: (
        <Ionicons
          name="md-person"
          size={18}
          color={'white'}
          style={{position: 'absolute', right: 30}}
        />
      ),
    },
    {
      id: 2,
      name: 'Blocked list control',
      onPress: 'profile2',
      navicon: Blocked_person,
      icon: (
        <Ionicons
          name="md-person"
          size={18}
          color={'white'}
          style={{position: 'absolute', right: 30}}
        />
      ),
    },

    {
      id: 3,
      name: 'Photos & Videos Management',
      onPress: 'Photo',
      navicon: Video,
      icon: (
        <MaterialIcons
          name="camera-enhance"
          size={18}
          color={'white'}
          style={{position: 'absolute', right: 30}}
        />
      ),
    },
    {
      id: 4,
      name: 'Change Password',
      onPress: 'profilechange',
      navicon: Password_multicolored,
      icon: (
        <MaterialCommunityIcons
          name="filter"
          size={18}
          color={'white'}
          style={{position: 'absolute', right: 30}}
        />
      ),
    },
    {
      id: 5,
      name: 'Notification & Privacy',
      onPress: 'profile4',
      navicon: Privacy_multicolored,
      icon: (
        <MaterialCommunityIcons
          name="filter"
          size={18}
          color={'white'}
          style={{position: 'absolute', right: 30}}
        />
      ),
    },
    {
      id: 6,
      name: 'Delete my account',
      onPress: 'profile5',
      navicon: Delete_multicolored_on,
      icon: (
        <MaterialCommunityIcons
          name="filter"
          size={18}
          color={'white'}
          style={{position: 'absolute', right: 30}}
        />
      ),
    },
    {
      id: 7,
      name: 'Saved Filter Preferences',
      onPress: 'profile6',
      navicon: Filter,
      icon: (
        <MaterialCommunityIcons
          name="filter"
          size={18}
          color={'white'}
          style={{position: 'absolute', right: 30}}
        />
      ),
    },
    {
      id: 8,
      name: 'Membership Information',
      onPress: 'membership',
      navicon: Premium,
      icon: (
        <MaterialIcons
          name="card-membership"
          size={22}
          color={'white'}
          style={{position: 'absolute', right: 30}}
        />
      ),
    },
    {
      id: 9,
      name: 'FAQs',
      onPress: 'faqs',
      navicon: Question,
      icon: (
        <MaterialIcons
          name="forum"
          size={22}
          color={'white'}
          style={{position: 'absolute', right: 30}}
        />
      ),
    },
    {
      id: 10,
      name: 'Rate App',
      navicon: Rate_on,
      icon: (
        <Ionicons
          name="star"
          size={20}
          color={'white'}
          style={{position: 'absolute', right: 30}}
        />
      ),
    },
    {
      id: 11,
      name: 'Help & Support',
      navicon: Bookmark,
      icon: (
        <Ionicons
          name="finger-print"
          size={20}
          color={'white'}
          style={{position: 'absolute', right: 30}}
        />
      ),
    },

    {
      id: 12,
      name: 'Logout',
      onPress: 'logout',
      navicon: Sign_out_multicolored,
      icon: (
        <Ionicons
          name="logout"
          size={20}
          color={'white'}
          style={{position: 'absolute', right: 30}}
        />
      ),
    },
  ]);
  const onLogout = () => {
    new Promise((rsl, rej) => {
      logoutSuccess(rsl, rej);
    })
      .then(res => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderProfile = ({item, index}) => {
    return (
      <View style={{}}>
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => {
            if (item.onPress === 'logout') {
              onLogout();
            } else if (item.onPress === 'profile') {
              navigation.navigate('Timeline');

              // navigation.navigate('Terms');
            } else if (item.onPress === 'profile1') {
              navigation.navigate('AccountInformation');

              // navigation.navigate('Terms');
            } else if (item.onPress === 'profile2') {
              navigation.navigate('Blockeduser');

              // navigation.navigate('Terms');
            } else if (item.onPress === 'profilechange') {
              navigation.navigate('Changepassword');

              // navigation.navigate('Terms');
            } else if (item.onPress === 'Photo') {
              // alert('privacy');
              navigation.navigate('AddPhotoVid');
            } else if (item.onPress === 'profile4') {
              // alert('privacy');
              navigation.navigate('NotificationAndPrivacy');
            } else if (item.onPress === 'profile5') {
              // alert('privacy');
              navigation.navigate('DeleteAccount');
            } else if (item.onPress === 'profile6') {
              // alert('privacy');
              navigation.navigate('Filters1');
            } else if (item.onPress === 'UserInfo') {
              // navigation.navigate('UserInfo');
            } else if (item.onPress === 'about') {
              // navigation.navigate('Terms');
            } else if (item.onPress === 'membership') {
              navigation.navigate('MemberShipinfo');
            } else if (item.onPress === 'faqs') {
              navigation.navigate('FAQs');
            } else if (item.onPress === 'filter') {
              navigation.navigate('Filters', {from: item.name});
            } else if (item.onPress === 'rate') {
              // handleShareApp();
            }
          }}>
          <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
            <Image source={item.navicon} style={styles.bottomIcon} />
            <CustomText
              title={item.name}
              type={'medium'}
              color={'black'}
              style={{
                fontSize: 15,
                fontWeight: 'bold',
              }}
            />
          </View>
          {/* <Ionicons name={'chevron-forward'} size={15} color="gray" /> */}
        </TouchableOpacity>
        {/* <Divider style={{height: 0.7, width: '90%', alignSelf: 'center'}} /> */}
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{}}>
        <Header
          containerStyle={{marginVertical: 20}}
          backgroundColor={'transparent'}
          leftComponent={
            <View
              style={{flexDirection: 'row', width: 500, alignItems: 'center'}}>
              <Ionicons
                name={'chevron-back'}
                size={18}
                color={colors.secondary}
                onPress={() => {
                  navigation.goBack();
                }}
                style={{alignSelf: 'center', paddingLeft: 12}}
              />
              <View>
                <CustomText
                  title={'Settings'}
                  type={'large'}
                  color={colors.secondary}
                  style={{
                    fontSize: 28,
                    paddingLeft: 12,
                    fontWeight: 'bold',
                    marginTop: 10,
                  }}
                />
                <CustomText
                  title={'Manage various important settings'}
                  type={'medium'}
                  color={'black'}
                  style={{fontSize: 13, paddingLeft: 12, marginTop: 10}}
                />
              </View>
            </View>
          }
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileData}
        renderItem={renderProfile}
        keyExtractor={item => item}
      />
    </SafeAreaView>
  );
};

export default connect(null, {logoutSuccess})(Settings);
