import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../../components/Text';
import {Avatar} from 'react-native-elements';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {article, dashboard, collection, chat, settings} from '../../../assets';
import {Divider} from 'react-native-paper';
import {Loading} from '../../../components/Loading';
import {connect} from 'react-redux';
const AccountSettings = ({signInWithPhone}) => {
  const navigation = useNavigation();
  const [profileData, setData] = useState([
    {
      id: 0,
      name: 'Account Settings',
      onPress: 'account',
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
      name: 'Profile Information',
      onPress: 'profileInfo',

      icon: (
        <MaterialCommunityIcons
          name="filter"
          size={18}
          color={'white'}
          style={{position: 'absolute', right: 30}}
        />
      ),
    },

    // {id: 1, name: 'Pedidos'},
    {
      id: 2,
      name: 'Additional Information',
      onPress: 'additional',
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
      id: 3,
      name: 'Photos & Videos Management',
      onPress: 'Photo',
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
      id: 4,
      name: 'Change Password',
      onPress: 'reset',
      icon: (
        <MaterialIcons
          name="forum"
          size={22}
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
        resetCart();
      })
      .catch(err => {
        console.log(err);
      });
  };
  const resetCart = () => {
    new Promise((rsl, rej) => {
      addToCart([], '', rsl, rej);
    })
      .then(res => {
        resetTotalPrice();
      })
      .catch(err => {
        console.log(err);
      });
  };
  const renderProfile = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => {
            if (item.onPress === 'logout') {
              isLoggedIn
                ? onLogout()
                : navigation.navigate('Login', {from: 'Root'});
            } else if (item.onPress === 'account') {
              navigation.navigate('Profile', {from: item.name});

              // navigation.navigate('Terms');
            } else if (item.onPress === 'profileInfo') {
              navigation.navigate('Profile', {from: item.name});

              // navigation.navigate('Terms');
            } else if (item.onPress === 'additional') {
              navigation.navigate('Profile', {from: item.name});

              // navigation.navigate('Terms');
            } else if (item.onPress === 'Photo') {
              // alert('privacy');
              navigation.navigate('AddPhotoVid');
            } else if (item.onPress === 'reset') {
              navigation.navigate('Reset', {from: 'profile'});
            }
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image source={dashboard} style={styles.bottomIcon} />
            <CustomText
              title={item.name}
              type={'medium'}
              color={'black'}
              style={{
                fontSize: 15,
              }}
            />
          </View>
          <Ionicons name={'chevron-forward'} size={15} color="gray" />
        </TouchableOpacity>
        <Divider style={{height: 0.7, width: '90%', alignSelf: 'center'}} />
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', paddingTop: '10%'}}>
      <View style={{marginBottom: 20}}>
        <Avatar
          containerStyle={styles.avatar}
          size={100}
          overlayContainerStyle={{
            borderRadius: 100,

            borderColor: colors.primary,
          }}
          source={{
            uri: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
          }}
          activeOpacity={0.7}
        />
        <CustomText
          title={'Abdul Kadir Tauran'}
          type={'large'}
          color={'black'}
          style={{
            fontSize: 14,
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
        <CustomText
          title={'20 Miles, Turkey'}
          type={'normal'}
          style={{fontSize: 14, alignSelf: 'center'}}
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

export default AccountSettings;
