import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Touchable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  logo_blue,
  Delete_multicolored_on,
  pluswidcircle,
  circlewithrectange,
} from '../../../assets';
import {Header, Badge} from 'react-native-elements';
import fonts from '../../../theme/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../theme/colors';
import CustomText from '../../../components/Text';
import {useNavigation, useIsFocused} from '@react-navigation/native';
const ImagePicker = require('react-native-image-picker');
import Video from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';
import {GradientButton} from '../../../components/GradientButton';
import AlertModal from '../../../components/AlertModal';

import styles from './styles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {uploadPhoto, uploaddp} from '../../../redux/actions/app';
//redux
import {
  getPhotos,
  updatePhotoStatus,
  movepublicimagetoasdp,
} from '../../../redux/actions/app';
import {Loading} from '../../../components/Loading';
import Modal1 from '../../../components/Modal1';
import {Dimensions} from 'react-native';

const AddPhotoVid = ({
  params,
  uploadPhoto,
  uploaddp,
  getPhotos,
  user,
  updatePhotoStatus,
  covered,
  movepublicimagetoasdp,
}) => {
  const navigation = useNavigation();
  const [isPaused, setIsPaused] = useState(true);
  const [vid, setVid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cover, setCover] = useState(covered ? covered[0]?.photo_url : '');
  const [msg, setMsg] = useState('');
  const [showAlert, setShoAlert] = useState(false);
  const [imageItem, setImageItem] = useState(null);
  const [move, setMove] = useState('');
  const [dp, setdp] = useState('');
  const [coverphoto, setcoverphoto] = useState(user.coverphoto);
  const [myprop, setmyprop] = useState(false);
  const isFocused = useIsFocused();
  const [updatecompo, setupdatecompo] = useState([]);
  const [publicPhotos, setpublicPhotos] = useState([]);
  const [privatePhotos, setprivatePhotos] = useState([]);
  const {height, width} = Dimensions.get('window');

  console.log('myuser', user);
  const movePicUpDown = async (item, status) => {
    try {
      const formData = new FormData();
      formData.append('photo_id', item);
      formData.append('photo_status', status);
      console.log('formdata', formData);
      if (status == 12) {
        const res = await movepublicimagetoasdp(
          formData,
          user?.auth,
          navigation,
        );
        console.log('dpresponse', res);
      } else {
        const res = await updatePhotoStatus(
          formData,
          user?.auth,
          user?.phone,
          navigation,
        );

        if (res.data.status == true) {
          const firstarrya = [];
          const scndarray = [];

          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i] != '') {
              if (res.data.data[i].photo_status == 0) {
                firstarrya.push(res.data.data[i]);
              } else {
                scndarray.push(res.data.data[i]);
              }
            }
          }

          setpublicPhotos(firstarrya);
          setprivatePhotos(scndarray);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openCamera = async () => {
    // setLoader(true);
    const options = {
      title: 'Video Picker',
      mediaType: 'video',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(async (options, response) => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('success ', response);

        // setVid(source);
        // // setFile(response);
        setLoading(true);
        const source = {uri: response.uri};
        const formData = new FormData();
        formData.append('file', {
          uri: response.uri,
          name: Math.random() * 1000,
          type: response?.uri?.split('.')[1],
        });
        formData.append('photo_status', -1);
        const res = await uploadPhoto(formData, user?.auth);
      }
    });
  };
  const openCamera1 = async index => {
    // setLoader(true);

    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if (index == 10) {
          try {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', {
              uri: response.uri,
              name: response.fileName,
              type: response.type,
            });
            formData.append('photo_status', index);

            (async () => {
              const res = await uploaddp(formData, user?.auth, navigation);

              setLoading(false);
            })();
          } catch (err) {
            console.log(err);
          }
        } else {
          uploadNewPhoto(response, index);
        }
      }
    });
  };

  const uploadNewPhoto = async (response, index) => {
    setupdatecompo(2);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', {
        uri: response.uri,
        name: response.fileName,
        type: response.type,
      });
      formData.append('photo_status', index);
      console.log(formData);

      const res = await uploadPhoto(formData, user?.auth, navigation);

      if (res.data.status == true) {
        // setupdatecompo(2);
        const firstarrya = [];
        const scndarray = [];

        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i] != '') {
            if (res.data.data[i].photo_status == 0) {
              firstarrya.push(res.data.data[i]);
            } else {
              scndarray.push(res.data.data[i]);
            }
          }
        }

        setpublicPhotos(firstarrya);
        setprivatePhotos(scndarray);
      } else {
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const unsub = getAllPhotos();
    return () => {
      unsub;
    };
  }, []);

  const getAllPhotos = async () => {
    try {
      setLoading(true);

      const res = await getPhotos(user?.auth, user?.phone, navigation);

      const firstarrya = [];
      const scndarray = [];

      for (var i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i] != '') {
          if (res.data.data[i].photo_status == 0) {
            firstarrya.push(res.data.data[i]);
          } else {
            scndarray.push(res.data.data[i]);
          }
        }
      }

      setpublicPhotos(firstarrya);
      setprivatePhotos(scndarray);

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
    setupdatecompo(1);
  };

  const myuri = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';
  // const myuri="https://www.youtube.com/watch?v=V6OJSIoh-lc";

  console.log('updatecompo value', updatecompo);

  function handleChange(newValue) {
    if (newValue == 'false') {
      setmyprop(false);
      setupdatecompo(21);
    } else {
      setmyprop(newValue);
    }
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        containerStyle={{marginVertical: 40}}
        backgroundColor={'transparent'}
        leftComponent={
          <View
            style={{flexDirection: 'row', width: 500, alignItems: 'center'}}>
            <Ionicons
              name={'chevron-back'}
              size={20}
              color={colors.secondary}
              onPress={() => {
                navigation.goBack();
              }}
              style={{alignSelf: 'center'}}
            />
            <View>
              <CustomText
                title={'Photos & videos'}
                type={'large'}
                color={colors.secondary}
                style={{fontSize: 28, marginLeft: 10}}
              />
              <CustomText
                title={'Manage your photos & videos here '}
                type={'medium'}
                color={'black'}
                style={{fontSize: 13, marginLeft: 10}}
              />
            </View>
          </View>
        }
      />
      <View style={{paddingLeft: 17, marginTop: 20}}>
        <Text style={styles1.email}>Cover</Text>
        <Text style={{color: 'black'}}>
          This cover will be visible on your profile
        </Text>
      </View>
      <View style={{maringVertical: 20}}>
        {user.coverphoto_status == 'Image' &&
          user.coverphoto ==
            'http://ranaentp.net/nikkahnama/uploads/Profile_pic_placeholder.png' && (
            <TouchableOpacity
              onPress={() => {
                // openCamera1(-2);
                handleChange('chooseoption');
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.lightGray,
                height: 220,
                marginTop: 20,
              }}>
              {user.coverphoto ==
              'http://ranaentp.net/nikkahnama/uploads/Profile_pic_placeholder.png' ? (
                <View style={{}}>
                  <View style={{alignItems: 'center', marginTop: 20}}>
                    {user.coverphoto ==
                      'http://ranaentp.net/nikkahnama/uploads/Profile_pic_placeholder.png' && (
                      <Image
                        source={pluswidcircle}
                        style={{height: 50, width: 50}}
                      />
                    )}
                  </View>
                  <View style={{marginTop: 20}}>
                    <CustomText
                      title={'Cover Photo / video'}
                      type={'large'}
                      color={colors.secondary}
                      style={{fontSize: 20, alignSelf: 'center'}}
                    />
                  </View>
                  <CustomText
                    title={'click here to add your photo / video'}
                    type={'normal'}
                    color={'black'}
                    style={{
                      fontSize: 12,
                      alignSelf: 'center',
                    }}
                  />
                  <CustomText
                    title={'(Max video 30 sec,20mb size)'}
                    type={'normal'}
                    color={'black'}
                    style={{
                      fontSize: 10,
                      alignSelf: 'center',
                      marginBottom: 25,
                    }}
                  />
                </View>
              ) : (
                <Image
                  resizeMode={'cover'}
                  source={{uri: user.coverphoto}}
                  style={{height: '100%', width: '100%'}}
                />
              )}
            </TouchableOpacity>
          )}

        {/* image work starts here */}

        {user.coverphoto_status == 'Image' &&
          user.coverphoto !=
            'http://ranaentp.net/nikkahnama/uploads/Profile_pic_placeholder.png' && (
            <View
              style={{
                resizeMode: 'contain',
                width: '100%',
                borderColor: colors.primary,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.lightGray,
                height: 220,
                marginTop: 20,
              }}>
              <Image
                resizeMode={'cover'}
                source={{uri: user.coverphoto}}
                style={{height: '100%', width: '100%'}}
              />

              <View
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  backgroundColor: 'white',
                  borderRadius: 50,
                  elevation: 30,
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    handleChange('chooseoption');
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{width: '100%', height: '100%', alignSelf: 'center'}}
                    source={Delete_multicolored_on}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

        {/* image work ends here */}

        {/* video works starts here */}
        {user.coverphoto_status == 'Video' && (
          <View
            style={{
              resizeMode: 'contain',
              width: '100%',
              borderColor: colors.primary,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.lightGray,
              height: 220,
              marginTop: 20,
            }}
            onPress={() => {
              setIsPaused(!isPaused);
            }}>
            <TouchableWithoutFeedback>
              <Video
                paused={isPaused}
                style={{
                  height: 230,
                  width: Dimensions.get('window').width,
                  minWidth: Dimensions.get('window').width,
                  borderColor: colors.primary,
                  backgroundColor: 'black',
                  elevation: 4,
                }}
                resizeMode="cover"
                source={{uri: user.coverphoto}}
              />
            </TouchableWithoutFeedback>

            <Ionicons
              onPress={() => {
                setIsPaused(!isPaused);
              }}
              name={isPaused ? 'play-circle' : 'pause-circle-sharp'}
              color="gray"
              size={40}
              style={{
                position: 'absolute',
                top: '42%',
                left: '45%',
              }}
            />

            <View
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                right: 10,
                top: 10,
                backgroundColor: 'white',
                borderRadius: 50,
                elevation: 30,
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  handleChange('chooseoption');
                }}>
                <Image
                  style={{width: '100%', height: '100%', alignSelf: 'center'}}
                  source={Delete_multicolored_on}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* video works ends here */}

        {/* your profile photo starts here */}

        <View
          style={{
            paddingLeft: 17,
            marginTop: 20,
          }}>
          <CustomText
            title={'Your profile photo'}
            type={'large'}
            color={colors.secondary}
            style={{fontSize: 22, marginTop: 15}}
          />
          <CustomText
            title={'Add your profile picture below'}
            type={'normal'}
            color={'black'}
            style={{
              fontSize: 12,
            }}
          />

          <View
            style={{
              height: 115,
              width: 100,
              borderRadius: 10,
              margin: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                openCamera1(10);
              }}>
              {user.dp ==
                'http://ranaentp.net/nikkahnama/uploads/Profile_pic_placeholder.png' && (
                <Image
                  source={circlewithrectange}
                  style={{height: 115, width: 100, borderRadius: 14}}
                />
              )}

              {user.dp !=
                'http://ranaentp.net/nikkahnama/uploads/Profile_pic_placeholder.png' && (
                <Image
                  style={{height: 115, width: 100, borderRadius: 14}}
                  source={{uri: user.dp}}
                />
              )}
            </TouchableOpacity>
            {user.dp !=
              'http://ranaentp.net/nikkahnama/uploads/Profile_pic_placeholder.png' && (
              <TouchableOpacity
                onPress={() => {
                  setImageItem(0);
                  setMsg('Are you sure to move image to public');
                  setMove(0);
                  setShoAlert(true);
                }}
                style={{
                  elevation: 4,
                  backgroundColor: 'white',
                  borderRadius: 100,
                  height: 17,
                  width: 17,
                  position: 'absolute',
                  right: -4,
                  bottom: -4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcons name="arrow-downward" size={14} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* your profile photo ends here */}

        <View
          style={{
            paddingLeft: 17,
            marginTop: 20,
          }}>
          <CustomText
            title={'Your public photos'}
            type={'large'}
            color={colors.secondary}
            style={{fontSize: 22, marginTop: 15}}
          />
          <CustomText
            title={'Add your public picture below'}
            type={'normal'}
            color={'black'}
            style={{
              fontSize: 12,
            }}
          />

          <FlatList
            data={publicPhotos}
            key={item => item.index}
            horizontal
            renderItem={({item, index}) => {
              return item.id == 'placeholder' ? (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    openCamera1(0);
                  }}
                  style={{
                    height: 115,
                    width: 100,
                    borderRadius: 10,
                    backgroundColor: colors.lightGray,
                    elevation: 4,
                    justifyContent: 'center',

                    alignItems: 'center',
                    shadowOpacity: 1,
                    shadowColor: '#BDBDBD',
                    shadowRadius: 3,
                    marginTop: 10,
                  }}>
                  <View
                    style={
                      {
                        // elevation: 4,
                        // backgroundColor: 'white',
                        // height: 20,
                        // width: 20,
                        // alignSelf: 'center',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                      }
                    }>
                    <Image
                      style={{height: 115, width: 100}}
                      source={circlewithrectange}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <View
                  key={index}
                  style={{
                    height: 115,
                    width: 100,
                    borderRadius: 10,
                    margin: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setMsg('Are you sure to set this image as profile photo');
                      setMove(12);
                      setShoAlert(true);
                      setImageItem(item.id);
                    }}
                    style={{
                      elevation: 4,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      height: 17,
                      width: 17,
                      position: 'absolute',
                      right: -6,
                      top: -8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons name="arrow-upward" size={14} />
                  </TouchableOpacity>

                  <Image
                    source={{uri: item.photo_url}}
                    style={{height: 115, width: 100, borderRadius: 14}}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setMsg('Are you sure to move image to private');
                      setMove(1);
                      setShoAlert(true);
                      setImageItem(item.id);
                    }}
                    style={{
                      elevation: 4,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      height: 17,
                      width: 17,
                      position: 'absolute',
                      right: -4,
                      bottom: -4,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons name="arrow-downward" size={14} />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>

        <View
          style={{
            marginTop: 20,
            paddingLeft: 17,
            marginBottom: 70,
            // borderBottomWidth: 0.3,
          }}>
          <CustomText
            title={'Your private photos'}
            type={'large'}
            color={colors.secondary}
            style={{fontSize: 22, marginTop: 15}}
          />
          <CustomText
            title={'Add your private photos below'}
            type={'normal'}
            color={'black'}
            style={{
              fontSize: 12,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <FlatList
              data={privatePhotos}
              key={item => item.index}
              horizontal
              renderItem={({item, index}) => {
                return item.id == 'placeholder' ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      openCamera1(1);
                    }}
                    style={{
                      height: 115,
                      width: 100,
                      borderRadius: 10,
                      backgroundColor: colors.lightGray,
                      elevation: 4,
                      justifyContent: 'center',

                      alignItems: 'center',
                      shadowOpacity: 1,
                      shadowColor: '#BDBDBD',
                      shadowRadius: 3,
                      marginTop: 10,
                    }}>
                    <View
                      style={
                        {
                          // elevation: 4,
                          // backgroundColor: 'white',
                          // borderRadius: 100,
                          // height: 20,
                          // width: 20,
                          // alignSelf: 'center',
                          // justifyContent: 'center',
                          // alignItems: 'center',
                        }
                      }>
                      <Image
                        style={{height: 115, width: 100}}
                        source={circlewithrectange}
                      />
                      {/* <MaterialIcons name="add" size={14} /> */}
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={{
                      height: 115,
                      width: 100,
                      borderRadius: 10,
                      margin: 10,
                    }}>
                    <Image
                      source={{
                        uri: item.photo_url,
                      }}
                      style={{height: 115, width: 100, borderRadius: 14}}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setImageItem(item.id);

                        setMsg('Are you sure to move image to public');
                        setMove(0);
                        setShoAlert(true);
                      }}
                      style={{
                        elevation: 4,
                        backgroundColor: 'white',
                        borderRadius: 100,
                        height: 17,
                        width: 17,
                        position: 'absolute',
                        right: -8,
                        top: -5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialIcons name="arrow-upward" size={14} />
                    </TouchableOpacity>

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
                  </View>
                );
              }}
            />
          </View>
        </View>

        {/* delete below */}
        {/* <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // borderBottomWidth: 0.2,
            
          }}> */}
        {/* <View style={{flexDirection: 'row'}}>
            <MaterialIcons name="video-library" size={17} />
            <CustomText
              title={'Your Vidoes'}
              type={'large'}
              color={'black'}
              style={{fontSize: 15, alignSelf: 'center', marginLeft: 5}}
            />
          </View>
          <CustomText
            title={'Add Videos in library'}
            type={'normal'}
            color={'black'}
            style={{
              fontSize: 12,
              alignSelf: 'center',
              marginVertical: 5,
              marginLeft: 14,
            }}
          />
        </View>
        <View
          style={{
           
          }}>
          <CustomText
            title={'Your private photos'}
            type={'large'}
            color={colors.secondary}
            style={{fontSize: 22, marginLeft: 15, marginTop: 15}}
          />
          <CustomText
            title={'Add your private photos below'}
            type={'normal'}
            color={'black'}
            style={{
              fontSize: 12,
              marginLeft: 15,
              
            }}
          />
          {1==2 ? (
            <TouchableOpacity
              activeOpacity={1}
              activeOpacity={0.7}
              onPress={() => openCamera()}
              style={{
                alignItems: 'center',
                height: 180,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 14,
                //   borderWidth: 1,
                borderColor: colors.primary,
                marginVertical: 10,
                backgroundColor: 'white',
                elevation: 4,
                shadowOpacity: 1,
                shadowColor: '#BDBDBD',
                shadowRadius: 6,
              }}>
              <MaterialIcons
                name="add-a-photo"
                size={35}
                color={colors.primary}
              />
              <CustomText
                title={'Add Video'}
                type={'normal'}
                color={colors.primary}
                style={{
                  fontSize: 12,
                  marginTop: 5,
                }}
              />
            </TouchableOpacity>
          ) : (
            <View
              style={{
                resizeMode: 'contain',
                height: 180,
                width: '100%',
                borderRadius: 14,
                //   borderWidth: 1,
                borderColor: colors.primary,
                marginVertical: 10,
                backgroundColor: 'white',
              }}
              onPress={() => {
                setIsPaused(!isPaused);
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setIsPaused(!isPaused);
                }}>
                <Video
                  paused={isPaused}
                  style={{
                    height: '100%',
                    width: '100%',

                    borderRadius: 14,

                    borderColor: colors.primary,

                    backgroundColor: 'black',
                    elevation: 4,
                  }}
                  source={{uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1"}}
                />
              </TouchableWithoutFeedback>

              <Ionicons
                onPress={() => {
                  setIsPaused(!isPaused);
                }}
                name={isPaused ? 'play-circle' : 'pause-circle-sharp'}
                color="gray"
                size={40}
                style={{
                  position: 'absolute',
                  top: '42%',
                  left: '45%',
                }}
              />
              <Entypo
                onPress={() => openCamera()}
                name="edit"
                size={15}
                color={'white'}
                style={{position: 'absolute', right: 10, top: 10}}
              />
            </View>
          )}
        </View>
        <GradientButton
          title="Save"
          onButtonPress={() => {
            navigation.goBack();
          }}
        /> */}
      </View>

      {/* til here delete */}

      <Loading visible={loading} />
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

      {myprop != false && <Modal1 status={myprop} onChange={handleChange} />}
    </ScrollView>
  );
};
const mapStateToProps = state => {
  console.log('userphotos', state);
  const {user} = state.auth;
  const {privatePhotos, publicPhotos, cover} = state.app;
  return {user, privatePhotos, publicPhotos, covered: cover};
};
export default connect(mapStateToProps, {
  uploadPhoto,
  getPhotos,
  updatePhotoStatus,
  uploaddp,
  movepublicimagetoasdp,
})(AddPhotoVid);
const styles1 = StyleSheet.create({
  email: {
    fontSize: 22,
    color: colors.secondary,
    fontFamily: fonts.PoppinsBold,
  },
});
