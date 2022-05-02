import React, {useReducer, useState, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  Keyboard,
  FlatList,
} from 'react-native';
import Button from '../../../components/Button';
import CustomText from '../../../components/Text';
import {Header, Badge, Icon} from 'react-native-elements';
import {Input} from '../../../components/Input/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import {SocialButton} from '../../../components/SocialButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Feather from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
//google
import colors from '../../../theme/colors';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {isEqualIcon} from 'react-native-paper/lib/typescript/components/Icon';
import {updown} from '../../../assets';
import CustomModal from '../../../components/Modal';
import {
  logo_blue,
  google,
  fb,
  logout,
  eye,
  key,
  user,
  mail,
  call,
  calendar,
  map,
  health,
  heart,
  note,
  book,
  office,
  weigh,
  game,
} from '../../../assets';
import {GradientButton} from '../../../components/GradientButton';

//facebook
const Filters = ({navigation, route}) => {
  const [checked, setChecked] = useState(true);
  const [editable, setEditable] = useState(true);
  const [genderEidt, setGenderEdit] = useState(false);
  const [date, setDate] = useState(new Date());
  const [modal, toggleModal] = useState(false);
  const [gender, setGender] = useState('');
  const [type, setType] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [ethinicity, setEthinicity] = useState('');
  const [country, setCountry] = useState('');
  const [Nationality, setNationality] = useState('');
  const [martial, setMartial] = useState('');
  const [religion, setReligion] = useState('');
  const [religionPractice, setReligionPractice] = useState('');
  const [hobbies, setHobbies] = useState('');
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    show.current.close();
    setDate(currentDate);
    setEditable(true);
  };
  const show = useRef(null);
  const from = route?.params?.from;
  const onGenderItemPress = gender => {
    console.log(gender);
    setGender(gender.name);
    toggleModal(!modal);
  };
  const onHeightPress = height => {
    setHeight(height.name);

    toggleModal(!modal);
  };
  const OnWeightPress = weight => {
    setWeight(weight.name);

    toggleModal(!modal);
  };
  const OnEthinicityPress = ethi => {
    setEthinicity(ethi.name);

    toggleModal(!modal);
  };
  const onCountryPress = ethi => {
    setCountry(ethi.name);

    toggleModal(!modal);
  };
  const onNationalityPress = ethi => {
    setNationality(ethi.name);

    toggleModal(!modal);
  };
  const onMartialPress = martial => {
    setMartial(martial.name);

    toggleModal(!modal);
  };
  const onReligionPress = martial => {
    setReligion(martial.name);

    toggleModal(!modal);
  };
  const onReligionPractice = religious => {
    setReligionPractice(religious.name);

    toggleModal(!modal);
  };
  const onHobbiesPress = hobbies => {
    setHobbies(hobbies.name);
    toggleModal(!modal);
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        containerStyle={{marginVertical: 20}}
        backgroundColor={'transparent'}
        leftComponent={
          <View
            style={{flexDirection: 'row', width: 500, alignItems: 'center'}}>
            <Ionicons
              name={'chevron-back'}
              size={20}
              color={'black'}
              onPress={() => {
                navigation.goBack();
              }}
              style={{alignSelf: 'center'}}
            />
            <View>
              <CustomText
                title={from}
                type={'large'}
                color={'black'}
                style={{fontSize: 20, marginLeft: 10}}
              />
              <CustomText
                title={'Add New Filters Below'}
                type={'medium'}
                color={'black'}
                style={{fontSize: 13, marginLeft: 10}}
              />
            </View>
          </View>
        }
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <FlatList
          data={new Array(2)}
          keyExtractor={item => item}
          renderItem={() => {
            return (
              <TouchableOpacity style={[styles.card]}>
                <View
                  style={{
                    flex: 0.9,
                    justifyContent: 'center',
                    margin: 10,
                    paddingLeft: 10,
                  }}>
                  <CustomText
                    title={'Filter Name'}
                    type={'large'}
                    color={'black'}
                    style={{fontSize: 14}}
                  />
                  <CustomText
                    title={'Filter details'}
                    type={'normal'}
                    color={'black'}
                    style={{fontSize: 14}}
                  />
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={17}
                  color="#ABABAB"
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            );
          }}
        />

        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
          }}>
          <View>
            <CustomText
              title={'Custom Filters'}
              type={'large'}
              color={'black'}
              style={{fontSize: 20, marginLeft: 20}}
            />
            <CustomText
              title={'Select Your Desire Filter'}
              type={'medium'}
              color={'black'}
              style={{fontSize: 13, marginLeft: 20}}
            />
          </View>
          <View>
            <Input
              keyboardType={'default'}
              placeholder={'Age'}
              onChangeText={e => {
                console.log(e);
              }}
              left={user}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setType('Gender');
                toggleModal(!modal);
              }}>
              <View pointerEvents="none">
                <Input
                  keyboardType={'default'}
                  placeholder={'Gender'}
                  value={gender}
                  iseditable={false}
                  keyboardType="phone-pad"
                  left={user}
                  right={updown}
                  onRightIconPress={() => {
                    setType('Gender');
                    toggleModal(!modal);
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setType('Height');
                toggleModal(!modal);
              }}>
              <View pointerEvents="none">
                <Input
                  keyboardType={'default'}
                  placeholder={'Height'}
                  value={height}
                  iseditable={false}
                  left={weigh}
                  right={updown}
                  onRightIconPress={() => {
                    setType('Height');
                    toggleModal(!modal);
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setType('Weight');
                toggleModal(!modal);
              }}>
              <View pointerEvents="none">
                <Input
                  keyboardType={'default'}
                  placeholder={'Weight'}
                  value={weight}
                  iseditable={false}
                  left={weigh}
                  right={updown}
                  onRightIconPress={() => {
                    setType('Weight');
                    toggleModal(!modal);
                  }}
                />
              </View>
            </TouchableOpacity>
            <Input
              keyboardType={'default'}
              placeholder={'Education'}
              onChangeText={e => {
                console.log(e);
              }}
              left={book}
            />

            <Input
              keyboardType={'default'}
              placeholder={'Profession'}
              onChangeText={e => {
                console.log(e);
              }}
              left={office}
            />
            <TouchableOpacity
              onPress={() => {
                setType('Religion');
                toggleModal(!modal);
              }}>
              <View pointerEvents="none">
                <Input
                  keyboardType={'default'}
                  placeholder={'Religion'}
                  value={religion}
                  iseditable={false}
                  left={book}
                  right={updown}
                  onRightIconPress={() => {
                    setType('Religion');
                    toggleModal(!modal);
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setType('Ethinicity');
                toggleModal(!modal);
              }}>
              <View pointerEvents="none">
                <Input
                  keyboardType={'default'}
                  placeholder={'Ethinicity'}
                  value={ethinicity}
                  iseditable={false}
                  left={map}
                  right={updown}
                  onRightIconPress={() => {
                    setType('Ethinicity');
                    toggleModal(!modal);
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setType('Country');
                toggleModal(!modal);
              }}>
              <View pointerEvents="none">
                <Input
                  keyboardType={'default'}
                  placeholder={'Country'}
                  value={country}
                  iseditable={false}
                  left={map}
                  right={updown}
                  onRightIconPress={() => {
                    setType('Country');
                    toggleModal(!modal);
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setType('Martial Status');
                toggleModal(!modal);
              }}>
              <View pointerEvents="none">
                <Input
                  keyboardType={'default'}
                  placeholder={'Current Martial Status'}
                  value={martial}
                  iseditable={false}
                  left={heart}
                  right={updown}
                  onRightIconPress={() => {
                    setType('Martial Status');
                    toggleModal(!modal);
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          {from == 'Profile Information' && (
            <View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  show.current.open();
                }}>
                <View pointerEvents="none">
                  <Input
                    iseditable={false}
                    value={moment(date).format('MMMM Do YYYY,')}
                    placeholder={'Date of Birth'}
                    left={calendar}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setType('Gender');
                  toggleModal(!modal);
                }}>
                <View pointerEvents="none">
                  <Input
                    keyboardType={'default'}
                    placeholder={'Gender'}
                    value={gender}
                    iseditable={false}
                    keyboardType="phone-pad"
                    left={user}
                    right={updown}
                    onRightIconPress={() => {
                      setType('Gender');
                      toggleModal(!modal);
                    }}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setType('Height');
                  toggleModal(!modal);
                }}>
                <View pointerEvents="none">
                  <Input
                    keyboardType={'default'}
                    placeholder={'Height'}
                    value={height}
                    iseditable={false}
                    left={weigh}
                    right={updown}
                    onRightIconPress={() => {
                      setType('Height');
                      toggleModal(!modal);
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setType('Weight');
                  toggleModal(!modal);
                }}>
                <View pointerEvents="none">
                  <Input
                    keyboardType={'default'}
                    placeholder={'Weight'}
                    value={weight}
                    iseditable={false}
                    left={weigh}
                    right={updown}
                    onRightIconPress={() => {
                      setType('Weight');
                      toggleModal(!modal);
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setType('Ethinicity');
                  toggleModal(!modal);
                }}>
                <View pointerEvents="none">
                  <Input
                    keyboardType={'default'}
                    placeholder={'Ethinicity'}
                    value={ethinicity}
                    iseditable={false}
                    left={map}
                    right={updown}
                    onRightIconPress={() => {
                      setType('Ethinicity');
                      toggleModal(!modal);
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setType('Country');
                  toggleModal(!modal);
                }}>
                <View pointerEvents="none">
                  <Input
                    keyboardType={'default'}
                    placeholder={'Country'}
                    value={country}
                    iseditable={false}
                    left={map}
                    right={updown}
                    onRightIconPress={() => {
                      setType('Country');
                      toggleModal(!modal);
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setType('Nationality');
                  toggleModal(!modal);
                }}>
                <View pointerEvents="none">
                  <Input
                    keyboardType={'default'}
                    placeholder={'Nationality'}
                    value={Nationality}
                    iseditable={false}
                    left={
                      <TextInput.Icon
                        name="earth"
                        size={15}
                        color={colors.primary}
                      />
                    }
                    right={updown}
                    left={map}
                    onRightIconPress={() => {
                      setType('Nationality');
                      toggleModal(!modal);
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
          {from === 'Additional Information' && (
            <View>
              <Input
                keyboardType={'default'}
                placeholder={'Education'}
                onChangeText={e => {
                  console.log(e);
                }}
                left={book}
              />

              <Input
                keyboardType={'default'}
                placeholder={'Profession'}
                onChangeText={e => {
                  console.log(e);
                }}
                left={office}
              />
              <Input
                keyboardType={'default'}
                placeholder={'Profession Business (if any)'}
                onChangeText={e => {
                  console.log(e);
                }}
                left={office}
              />
              <TouchableOpacity
                onPress={() => {
                  setType('Martial Status');
                  toggleModal(!modal);
                }}>
                <View pointerEvents="none">
                  <Input
                    keyboardType={'default'}
                    placeholder={'Current Martial Status'}
                    value={martial}
                    iseditable={false}
                    left={heart}
                    right={updown}
                    onRightIconPress={() => {
                      setType('Martial Status');
                      toggleModal(!modal);
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setType('Religion');
                  toggleModal(!modal);
                }}>
                <View pointerEvents="none">
                  <Input
                    keyboardType={'default'}
                    placeholder={'Religion'}
                    value={religion}
                    iseditable={false}
                    left={book}
                    right={updown}
                    onRightIconPress={() => {
                      setType('Religion');
                      toggleModal(!modal);
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setType('ReligionPractice');
                  toggleModal(!modal);
                }}>
                <View pointerEvents="none">
                  <Input
                    keyboardType={'default'}
                    placeholder={'Religion Practice'}
                    value={religionPractice}
                    iseditable={false}
                    left={note}
                    right={updown}
                    onRightIconPress={() => {
                      setType('ReligionPractice');
                      toggleModal(!modal);
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setType('Hobbies');
                  toggleModal(!modal);
                }}>
                <View pointerEvents="none">
                  <Input
                    keyboardType={'default'}
                    placeholder={'Hobbies'}
                    value={hobbies}
                    iseditable={false}
                    left={game}
                    right={updown}
                    onRightIconPress={() => {
                      setType('Hobbies');
                      toggleModal(!modal);
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
          {from === 'Additional Information' && (
            <View>
              <View>
                <CustomText
                  title={`Wali's Information`}
                  type={'large'}
                  color={'black'}
                  style={{fontSize: 20, marginLeft: 20, marginTop: 20}}
                />
                <CustomText
                  title={`Add your wali's information below`}
                  type={'medium'}
                  color={'black'}
                  style={{fontSize: 13, marginLeft: 20}}
                />
              </View>

              <Input
                keyboardType={'default'}
                placeholder={'First Name'}
                left={user}
                onChangeText={e => {
                  console.log(e);
                }}
              />
              <Input
                keyboardType={'default'}
                placeholder={'Last Name'}
                left={user}
                onChangeText={e => {
                  console.log(e);
                }}
                lef={user}
              />
              <Input
                keyboardType={'email-address'}
                placeholder={'Email'}
                left={mail}
                onChangeText={e => {
                  console.log(e);
                }}
              />
              <Input
                keyboardType={'phone-pad'}
                placeholder={'Phone Number'}
                left={call}
                onChangeText={e => {
                  console.log(e);
                }}
                // left={
                //   <TextInput.Icon
                //     name="phone"
                //     size={15}
                //     color={colors.primary}
                //   />
                // }
              />
            </View>
          )}
          <GradientButton
            title="Save & Search"
            onButtonPress={() => {
              navigation.navigate('Root');
            }}
          />
          <GradientButton
            title="Search"
            onButtonPress={() => {
              navigation.navigate('Root');
            }}
          />
        </View>

        <RBSheet
          ref={show}
          height={440}
          openDuration={250}
          customStyles={{
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              marginTop: 30,
              padding: 20,
            },
          }}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date ? date : new Date()}
            placeholder="Date"
            mode={'date'}
            display="inline"
            onChange={onChange}
          />
        </RBSheet>
        {modal && (
          <CustomModal
            heading={`Choose ${type}`}
            type={type}
            onPress={onGenderItemPress}
            value={gender}
            onHeightChange={onHeightPress}
            onWeightChange={OnWeightPress}
            onEthinicity={OnEthinicityPress}
            onCountry={onCountryPress}
            onNationality={onNationalityPress}
            onMartial={onMartialPress}
            onReligion={onReligionPress}
            onReligionPractice={onReligionPractice}
            onHobbies={onHobbiesPress}
          />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Filters;
