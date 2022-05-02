import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  Animated,
  TextInput,
  Dimensions,
} from 'react-native';
import {Header, Badge} from 'react-native-elements';
import colors from '../../../theme/colors';
import CustomText from '../../../components/Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import AlertModal from '../../../components/AlertModal';
import HeaderRight from '../../../components/HeaderRight';
const Dashboard = ({}) => {
  const navigation = useNavigation();
  const [searchWidth, setSearchWidth] = useState(new Animated.Value(0));
  const [searchState, setSearchState] = useState(false);
  const [cartIcons, setCartIcons] = useState([
    {id: 0, icon: <Ionicons name="eye" size={20} color="blue" />},
    {id: 1, icon: <Ionicons name="heart" size={20} color="gray" />},
    {
      id: 2,
      icon: (
        <MaterialCommunityIcons
          name="message-bulleted"
          size={20}
          color="#f09f3c"
        />
      ),
    },
    {
      id: 3,
      icon: <MaterialCommunityIcons name="share" size={20} color="green" />,
    },
  ]);
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

  return (
    <View style={{flex: 1}}>
      <Header
        backgroundColor={colors.secondary}
        centerComponent={
          !searchState && (
            <CustomText
              title={'Welcome Kadir123'}
              type={'medium'}
              color={'white'}
              style={{fontSize: 15}}
            />
          )
        }
        rightComponent={
          <HeaderRight
            searchWidth={searchWidth}
            searchState={searchState}
            onPress={() => {
              !searchState && setSearchState(!searchState);
              animationToggle();
            }}
          />
        }
      />
      <View
        style={{
          flexDirection: 'row',
          marginTop: '5%',
          justifyContent: 'center',
        }}>
        <Ionicons
          name={'flag'}
          size={17}
          color={'black'}
          style={{marginRight: 4, alignSelf: 'center'}}
        />
        <CustomText
          title={'Top Picks'}
          type={'large'}
          color={'black'}
          style={{fontSize: 15, alignSelf: 'center'}}
        />
      </View>
      <CustomText
        title={'Top Picks for you'}
        type={'normal'}
        color={'gray'}
        style={{fontSize: 12, alignSelf: 'center'}}
      />
      <FlatList
        data={new Array(10)}
        keyExtractor={item => item}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.cardContainer}
              activeOpacity={1}
              onPress={() => {
                navigation.navigate('Single');
              }}>
              <ImageBackground
                imageStyle={{
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
                style={{width: '100%', height: 200}}
                source={{
                  uri: 'https://images.unsplash.com/photo-1573007974656-b958089e9f7b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                }}>
                <View
                  style={{
                    with: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255,255,355,0.2)',
                  }}>
                  <View style={styles.badge}>
                    <Badge
                      status="success"
                      size={100}
                      badgeStyle={{marginRight: 4, alignSelf: 'center'}}
                    />

                    <CustomText
                      title={'Online'}
                      type={'normal'}
                      style={{fontSize: 10}}
                    />
                  </View>
                  <View style={styles.imageFooter}>
                    <View style={{flexDirection: 'row'}}>
                      <CustomText
                        title={'Andrew Jakson'}
                        type={'large'}
                        color={'white'}
                        style={{fontSize: 16}}
                      />
                      <Ionicons
                        name="checkmark-circle"
                        size={14}
                        color={'green'}
                        style={{alignSelf: 'center', marginLeft: 4}}
                      />
                      <Image
                        style={{
                          height: 14,
                          width: 14,
                          alignSelf: 'center',
                          marginLeft: 4,
                        }}
                        source={{
                          uri: 'https://i.pinimg.com/originals/b9/1b/84/b91b84189df193c557445b277fe82295.png',
                        }}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <CustomText
                          title={'24 Male | VFX Artifdgst'}
                          type={'normal'}
                          color={'white'}
                          style={{fontSize: 12}}
                        />

                        
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Ionicons
                          name="eye"
                          style={{
                            color: 'white',
                            margin: 3,
                          }}
                        />
                        <CustomText
                          title={'56 View'}
                          type={'normal'}
                          color={'white'}
                          style={{
                            fontSize: 11,
                            alignSelf: 'center',
                            marginRight: 10,
                          }}
                        />
                        <Ionicons
                          name="heart-outline"
                          style={{
                            color: 'white',
                            margin: 3,
                          }}
                        />
                        <CustomText
                          title={'23 Likes'}
                          type={'normal'}
                          color={'white'}
                          style={{fontSize: 11, alignSelf: 'center'}}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  justifyContent: 'space-between',
                }}>
                {cartIcons.map((item, index) => {
                  return (
                    <TouchableOpacity style={styles.footerIcon} key={index}>
                      {item.icon}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {/* <AlertModal
      heading="Saving your filtered preferences?"
      subHeading="Are you sure?"
      button1="Yes"
      button2="No"
      onYesPress={() => {
        alert('yes');
      }}
      onNoPress={() => {
        alert('no');
      }}
    /> */}
    </View>
  );
};

export default Dashboard;
