import React, {useEffect, useState} from 'react';
import {ImageBackground, Text, View, Image, Dimensions} from 'react-native';
import {Header, Badge} from 'react-native-elements';
import colors from '../../../theme/colors';
import CustomText from '../../../components/Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import styles from './styles';
import Button from '../../../components/Button';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
const {width, height} = Dimensions.get('window');
//redux
import {connect} from 'react-redux';
import {singleUser} from '../../../redux/actions/app';
import {Loading} from '../../../components/Loading';

const SingleProfile = ({singleUser, route}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {id} = route?.params;
  const [loading, setLoading] = useState(false);
  const [oneuser, setOneuser] = useState(null);
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
  useEffect(() => {
    const res = getSingleuser();
  }, [isFocused]);
  const getSingleuser = async () => {
    try {
      const formData = new FormData();
      formData.append('userid', id);
      const res = await singleUser(formData);
      setOneuser(res?.data?.data[0]);
      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };
  return (
    <View style={{flex: 1}}>
      <Header
        backgroundColor={colors.secondary}
        leftComponent={
          <Ionicons
            name={'chevron-back'}
            size={20}
            color={'white'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
        centerComponent={
          <CustomText
            title={'Welcome ' + oneuser?.first_name}
            type={'medium'}
            color={'white'}
            style={{fontSize: 15}}
          />
        }
        rightComponent={
          <MaterialCommunityIcons
            name={'dots-vertical'}
            size={20}
            color={'white'}
          />
        }
      />

      <ScrollView>
        <View>
          <FlatList
            data={new Array(1)}
            keyExtractor={item => item}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.cardContainer}
                  activeOpacity={1}
                  onPress={() => {
                    navigation.navigate('ImageViewer');
                  }}>
                  <ImageBackground
                    style={{width: '100%', height: height / 2.7}}
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
                      <View
                        style={{
                          flex: 0.6,
                          //   marginTop: '10%',j
                          justifyContent: 'center',
                        }}>
                        <Ionicons
                          name="play"
                          size={40}
                          style={{
                            alignSelf: 'center',
                            color: 'white',
                            marginTop: '20%',
                          }}
                        />
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={{flex: 1, marginTop: -30, alignSelf: 'center'}}>
          <FlatList
            data={new Array(3)}
            horizontal
            keyExtractor={item => item}
            ListFooterComponent={
              <View style={{flexDirection: 'row'}}>
                <ImageBackground
                  imageStyle={{borderRadius: 4}}
                  style={{
                    height: 54,
                    width: 54,
                    borderRadius: 3,
                    margin: 5,
                  }}
                  source={{
                    uri: 'https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      backgroundColor: 'rgba(235,235,235,0.9)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons name="lock-closed" size={20} color={'#000'} />
                  </View>
                </ImageBackground>
                <ImageBackground
                  imageStyle={{borderRadius: 4}}
                  style={{
                    height: 54,
                    width: 54,
                    borderRadius: 3,
                    margin: 5,
                  }}
                  source={{
                    uri: 'https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      backgroundColor: 'rgba(235,235,235,0.9)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons name="lock-closed" size={20} color={'#000'} />
                  </View>
                </ImageBackground>
              </View>
            }
            renderItem={({item, index}) => {
              return (
                <Image
                  style={{
                    height: 54,
                    width: 54,
                    borderRadius: 3,
                    margin: 5,

                    //   alignSelf: 'center',
                  }}
                  source={{
                    uri: 'https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                  }}
                />
              );
            }}
          />
        </View>

        <View style={styles.imageFooter}>
          <View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <CustomText
                title={oneuser?.first_name + ' ' + oneuser?.last_name}
                type={'large'}
                color={'black'}
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
                  title={'24 Male | VFX Artist'}
                  type={'normal'}
                  color={'black'}
                  style={{fontSize: 12}}
                />

                <Image
                  resizeMode="contain"
                  style={{
                    height: 16,
                    width: 16,
                    alignSelf: 'center',
                    marginLeft: 4,
                  }}
                  source={{
                    uri: 'data:image/png;base54,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',
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Ionicons
                  name="heart-outline"
                  style={{
                    color: 'black',
                    margin: 3,
                    fontSize: 20,
                  }}
                />
                <Ionicons
                  name="heart-outline"
                  style={{
                    color: 'black',
                    fontSize: 20,
                    margin: 3,
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            fontSize: 11,
            margin: 20,
          }}>
          <CustomText
            title={'Personal Information'}
            type={'large'}
            color={'black'}
            style={{
              fontSize: 14,
            }}
          />
          <TableRow title={'Age:'} data={oneuser?.age} />
          <TableRow title={'Height:'} data={oneuser?.height} />
          <TableRow title={'Weight:'} data={oneuser?.width} />
          <TableRow title={'Ehinicity:'} data={oneuser?.ethinicity} />
          <TableRow title={'Country:'} data={oneuser?.country} />
          <Divider style={{height: 1, marginVertical: 10}} />
          <CustomText
            title={'Additional Information'}
            type={'large'}
            color={'black'}
            style={{
              fontSize: 14,
            }}
          />
          <TableRow title={'Religion:'} data={oneuser?.religion} />
          <TableRow
            title={'Religion Practice:'}
            data={oneuser?.religion_practice}
          />
          <TableRow title={'Qualification:'} data={oneuser?.education} />
          <TableRow title={'Profession:'} data={oneuser?.profession} />
          <TableRow title={'Earning(Monthly):'} data={'$1000'} />
          <TableRow
            title={'Personal Business:'}
            data={oneuser?.professional_business}
          />
          <TableRow
            title={'Current Marital Status:'}
            data={oneuser?.martial_status}
          />
          <TableRow title={'Nationality:'} data={oneuser?.nationality} />
          <TableRow title={'Hobbies:'} data={oneuser?.hobbies} />
          <Divider style={{height: 1, marginVertical: 10}} />
          <CustomText
            title={'About'}
            type={'large'}
            color={'black'}
            style={{
              fontSize: 14,
            }}
          />
          <CustomText
            title={oneuser?.about}
            type={'normal'}
            color={'black'}
            style={{
              fontSize: 13,
            }}
          />
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
        </View>
      </ScrollView>
      <Loading visible={loading} />
    </View>
  );
};

export default connect(null, {singleUser})(SingleProfile);
const TableRow = ({title, data}) => {
  return (
    <View style={{flex: 1}}>
      <View style={[styles.detailContainer]}>
        <CustomText
          title={title}
          type={'large'}
          color={'black'}
          style={{
            fontSize: 13,
          }}
        />
        <CustomText
          title={data}
          type={'normal'}
          color={'black'}
          style={{
            fontSize: 13,
          }}
        />
      </View>
      {/* <Divider style={styles.dividerStyle} /> */}
    </View>
  );
};
