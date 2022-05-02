import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import {
  logo_blue,
  google,
  fb,
  logout,
  eye,
  key,
  user,
  logocolored,
  arrowright,
  Facebook,
  Google,
} from '../../../assets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Header, ListItem} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import CustomText from '../../../components/Text';
import {RadioButton} from 'react-native-paper';
import {
  GradientButton,
  GradientsigninButton,
} from '../../../components/GradientButton';
import {BottomSheet} from '../../../components/BottomSheet';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Modal1 from '../../../components/Modal1';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  getgeneraldata,
  get_county,
  getallmyfilters,
} from '../../../redux/actions/auth';
import {connect} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {Loading} from '../../../components/Loading';

const Filters1 = ({
  route,
  token,
  userData,
  getgeneraldata,
  getallmyfilters,
  get_county,
}) => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  const [checked, setChecked] = useState('single');
  const [gender, setgender] = useState('Male');

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [alllanguage, setalllanguage] = useState([]);

  const [allnationality, setallnationality] = useState([]);
  const [alleducationlevel, setalleducationlevel] = useState([]);
  const [allprofession, setallprofession] = useState([]);
  const [apidata, setapidata] = useState([]);
  const [profession, setprofession] = useState('');
  const [educationlevel, seteducationlevel] = useState('');
  const [nationality, setnationality] = useState('');
  const [nationalityid, setnationalityid] = useState('');
  const [allethinicity, setallethinicity] = useState([]);
  const [ethinicity, setethinicity] = useState('');
  const [ethinicityid, setethinicityid] = useState('');
  const [language, setlanguage] = useState('');
  const [languageid, setlanguageid] = useState('');
  const [allcountry, setallcountry] = useState(['']);
  const [country, setcountry] = useState('');
  const [countryid, setcountryid] = useState('');
  const [agefrom, setagefrom] = useState('25');
  const [ageto, setageto] = useState('40');
  const [myprop, setmyprop] = useState(false);
  const [myallfilters, setmyallfilters] = useState(false);
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const res = getgeneraldata('', '')
      .then(res => {
        console.log('my array==>', res.data);
        if (res.data.status == true) {
          var arry = [];

          for (var i = 0; i < res.data.ethinicity.length; i++) {
            let person = {
              id: res.data.ethinicity[i].ethinic_id,
              title: res.data.ethinicity[i].ethinicity,
              status: 'ethinicity',
            };

            arry.push(person);
          }
          setallethinicity(arry);
          setethinicityid(arry[0].id);
          setethinicity(arry[0].title);

          var arry = [];

          for (var i = 0; i < res.data.language.length; i++) {
            let person = {
              id: res.data.language[i].language_id,
              title: res.data.language[i].language_name,
              status: 'language',
            };

            arry.push(person);
          }
          setalllanguage(arry);
          setlanguageid(arry[0].id);
          setlanguage(arry[0].title);

          var arry = [];

          for (var i = 0; i < res.data.nationality.length; i++) {
            let person = {
              id: res.data.nationality[i].nationality_id,
              title: res.data.nationality[i].nationality_name,
              status: 'nationality',
            };

            arry.push(person);
          }
          setallnationality(arry);
          setnationalityid(arry[0].id);
          setnationality(arry[0].title);

          var arry = [];

          for (var i = 0; i < res.data.educationlevel.length; i++) {
            let person = {
              id: i,
              title: res.data.educationlevel[i],
              status: 'educationlevel',
            };

            arry.push(person);
          }
          setalleducationlevel(arry);
          seteducationlevel(arry[0].title);

          var arry = [];

          for (var i = 0; i < res.data.professions.length; i++) {
            let person = {
              id: i,
              title: res.data.professions[i],
              status: 'professions',
            };

            arry.push(person);
          }
          setallprofession(arry);
          setprofession(arry[0].title);
        } else {
        }
      })
      .catch(err => {
        // setLoading(false);
        console.log(err);
        rej(err.message);
      });

    get_county('', '')
      .then(res1 => {
        if (res1.data.status == true) {
          var arry = [];

          for (var i = 0; i < res1.data.data.length; i++) {
            let person = {
              id: res1.data.data[i].country_id,
              title: res1.data.data[i].country_name,
              status: 'country',
            };

            arry.push(person);
          }
          setallcountry(arry);
          setcountryid(arry[0].id);
          setcountry(arry[0].title);
        } else {
        }
      })
      .catch(err => {
        // setLoading(false);
        console.log(err);
        rej(err.message);
      });

    getallmyfilters('', userData.auth)
      .then(res1 => {
        if (res1.data.status == true) {
          setmyallfilters(res1.data.data);
        } else {
        }
      })
      .catch(err => {
        console.log(err);
        rej(err.message);
      });

    setLoading(false);
  }, [myprop]);

  function handleChange(newValue) {
    if (newValue == 'false') {
      setmyprop(false);
    } else {
      newValue = {
        name: 'searchfilter',
        agefrom: agefrom,
        ageto: ageto,
        gender: gender,
        languageid: languageid,
        profession: profession,
        educationlevel: educationlevel,
        ethinicityid: ethinicityid,
        countryid: countryid,
        martial_status: checked,
      };
      setmyprop(newValue);

      getallmyfilters('', userData.auth)
        .then(res1 => {
          if (res1.data.status == true) {
            setmyallfilters(res1.data.data);
            console.log('my all filters', res1);
          } else {
          }
        })
        .catch(err => {
          // setLoading(false);
          console.log(err);
          rej(err.message);
        });
    }
  }

  function openrbsheet(var1) {
    if (var1 == 'ethinicity') {
      setapidata(allethinicity);
    } else if (var1 == 'language') {
      setapidata(alllanguage);
    } else if (var1 == 'nationality') {
      setapidata(allnationality);
    } else if (var1 == 'educationlevel') {
      setapidata(alleducationlevel);
    } else if (var1 == 'profession') {
      setapidata(allprofession);
    } else if (var1 == 'country') {
      setapidata(allcountry);
    } else if (var1 == 'agefrom') {
      var arry = [];
      for (var i = 15; i < 70; i++) {
        let person = {
          id: i,
          title: i,
          status: 'agefrom',
        };
        arry.push(person);
      }

      setapidata(arry);
    } else if (var1 == 'ageto') {
      var arry = [];
      for (var i = 15; i < 70; i++) {
        let person = {
          id: i,
          title: i,
          status: 'ageto',
        };
        arry.push(person);
      }

      setapidata(arry);
    }

    refRBSheet.current.open();
  }

  function closerbsheet(status1, id1, title1) {
    refRBSheet.current.close();
    if (status1 == 'country') {
      setcountry(title1);
      setcountryid(id1);
    } else if (status1 == 'ethinicity') {
      setethinicity(title1);
      setethinicityid(id1);
    } else if (status1 == 'language') {
      setlanguage(title1);
      setlanguageid(id1);
    } else if (status1 == 'nationality') {
      setnationality(title1);
      setnationalityid(id1);
    } else if (status1 == 'city') {
      setcity(title1);
      setcityid(id1);
    } else if (status1 == 'educationlevel') {
      seteducationlevel(title1);
    } else if (status1 == 'professions') {
      setprofession(title1);
    } else if (status1 == 'maritalstatus') {
      setmartial_status(title1);
    } else if (status1 == 'agefrom') {
      setagefrom(title1);
    } else if (status1 == 'ageto') {
      setageto(title1);
    }
  }

  console.log('myallfilters', myallfilters);

  const Item = ({title}) => (
    <View style={[styles.item]}>
      <Text
        style={[
          styles.title,
          {fontFamily: fonts.PoppinsBold, fontSize: 17, padding: 10},
        ]}>
        {title}
      </Text>
    </View>
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        closerbsheet(item.status, item.id, item.title);
      }}>
      <Item title={item.title} />
      {/* <View>
        <TouchableOpacity style={[styles.card]}>
          <View
            style={{
              flex: 0.9,
              justifyContent: 'center',
              marginTop: 3,
              paddingLeft: 25,
            }}>
            <CustomText
              title={item.filter_name}
              type={'large'}
              color={colors.secondary}
              style={{fontSize: 14}}
            />

            <CustomText
              title={
                item.age_from + ' to ' + item.age_to + '|' + item.education
              }
              type={'normal'}
              color={'gray'}
              style={{fontSize: 12}}
            />

            <CustomText
              title={item.marital_Status + '|' + item.job_status}
              type={'normal'}
              color={'gray'}
              style={{fontSize: 12}}
            />
          </View>

          <Ionicons
            name="chevron-forward"
            size={17}
            color={colors.primary}
            style={{alignSelf: 'center', right: 0}}
          />
        </TouchableOpacity>
      </View> */}
    </TouchableOpacity>
  );

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingRight: 10,
      }}>
      <Header
        containerStyle={{marginVertical: 40}}
        backgroundColor={'transparent'}
        leftComponent={
          <View
            style={{flexDirection: 'row', width: 500, alignItems: 'center'}}>
            <Ionicons
              name={'chevron-back'}
              size={20}
              color={colors.primary}
              onPress={() => {
                navigation.goBack();
              }}
              style={{alignSelf: 'center', paddingLeft: 10}}
            />
            <View>
              <CustomText
                title={'Search for people'}
                type={'large'}
                color={colors.secondary}
                style={{fontSize: 28, marginLeft: 20}}
              />
              <CustomText
                title={'Search people using your customized preferences '}
                type={'medium'}
                color={'black'}
                style={{fontSize: 13, marginLeft: 20}}
              />
            </View>
          </View>
        }
      />
      {myallfilters != false && (
        <View style={{paddingLeft: 25, marginTop: 10}}>
          <Text style={styles.sorry}>Quick search filters</Text>
          <Text style={{paddingLeft: 2}}>
            Select from your saved filters presets
          </Text>
        </View>
      )}
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        {myallfilters != false && (
          <View style={{marginTop: 25, paddingLeft: 15}}>
            <FlatList
              data={myallfilters}
              keyExtractor={item => item.key}
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      let a = {
                        gender: item.gender,
                        age_from: item.age_from,
                        age_to: item.age_to,
                        language_id: item.language_id,
                        education: item.education,
                        nationality_id: item.country_id,
                        marital_Status: item.marital_Status,
                        profession: item.job_status,
                        ethinicity: item.ethinic_id,
                      };
                      navigation.navigate('SearchResult', {
                        from: 'filters',
                        myparam: a,
                      });
                    }}
                    style={[styles.card]}>
                    <View
                      style={{
                        flex: 0.9,
                        justifyContent: 'center',
                        padding: 5,
                        paddingLeft: 25,
                      }}>
                      <CustomText
                        title={item.filter_name}
                        type={'large'}
                        color={colors.secondary}
                        style={{fontSize: 14}}
                      />
                      {/* <Text>{item.age_from+" to "+item.age_to}</Text>  */}

                      <CustomText
                        title={
                          item.age_from +
                          ' to ' +
                          item.age_to +
                          ' | ' +
                          item.gender +
                          ' | ' +
                          item.language_name +
                          ' | ' +
                          item.education +
                          ' | ' +
                          item.country_name +
                          ' | ' +
                          item.marital_Status
                        }
                        type={'normal'}
                        color={'gray'}
                        style={{fontSize: 12}}
                      />

                      {/* <CustomText
                        title={item.marital_Status + '|' + item.job_status}
                        type={'normal'}
                        color={'gray'}
                        style={{fontSize: 12}}
                      /> */}
                    </View>

                    <Ionicons
                      name="chevron-forward"
                      size={17}
                      color={colors.primary}
                      style={{alignSelf: 'center', right: 0}}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}

        <View style={{marginLeft: 25, marginTop: 40}}>
          <Text style={styles.sorry}>Custom Filter Edit</Text>
          <Text style={{paddingLeft: 1}}>
            Choose your custom filter preferences below
          </Text>
        </View>
        <View style={{paddingLeft: 25, marginTop: 30}}>
          <Text style={styles.sorry1}>Age range</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '70%',
            justifyContent: 'space-evenly',
            paddingLeft: 4,
          }}>
          <View
            style={{
              marginTop: 10,
              marginLeft: 10,
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center'}}>Between</Text>
          </View>

          <View
            style={{
              backgroundColor: colors.lightGray,
              height: 40,
              width: 60,
              marginTop: 12,
              borderRadius: 10,
            }}>
            {/* <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              <Text></Text>
              color="#dcdcdc"
            <TouchableOpacity/> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <View style={{}}>
                <TouchableOpacity onPress={() => openrbsheet('agefrom')}>
                  <Text style={{color: colors.secondary}}>{agefrom}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => openrbsheet('agefrom')}>
                <View style={{}}>
                  <EvilIcons name="chevron-down" size={18} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: 10,

              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center'}}>and</Text>
          </View>
          <View
            style={{
              backgroundColor: colors.lightGray,
              height: 40,
              width: 60,
              marginTop: 12,
              borderRadius: 10,
            }}>
            {/* <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              <Text></Text>
              color="#dcdcdc"
            <TouchableOpacity/> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <View style={{}}>
                <TouchableOpacity
                  style={
                    {
                      // justifyContent: 'center',
                      // alignItems: 'center',
                      // paddingTop: 10,
                    }
                  }
                  onPress={() => openrbsheet('ageto')}>
                  <Text style={{color: colors.secondary}}>{ageto}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => openrbsheet('ageto')}>
                <View style={{}}>
                  <EvilIcons name="chevron-down" size={18} color="black" />
                </View>
              </TouchableOpacity>
            </View>

            <RBSheet
              height={200}
              duration={250}
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              customStyles={{
                // wrapper: {
                //   backgroundColor: 'transparent',

                // },
                draggableIcon: {
                  backgroundColor: 'black',
                },
                container: {
                  // justifyContent: "center",
                  // alignItems: "center",
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                },
              }}>
              <FlatList
                data={apidata}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </RBSheet>
          </View>
        </View>
        <View style={{marginLeft: 25, marginTop: 30}}>
          <Text style={styles.sorry1}>Gender</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 20,
            paddingLeft: 5,

            width: '80%',
          }}>
          <View style={{flexDirection: 'row', width: '30%'}}>
            <View>
              <RadioButton
                color="red"
                value="Male"
                status={gender === 'Male' ? 'checked' : 'unchecked'}
                onPress={() => setgender('Male')}
              />
            </View>
            <View style={{marginTop: 7}}>
              <Text>Male</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', width: '60%'}}>
            <View style={{}}>
              <RadioButton
                value="Female"
                color="red"
                status={gender === 'Female' ? 'checked' : 'unchecked'}
                onPress={() => setgender('Female')}
              />
            </View>
            <View style={{marginTop: 7}}>
              <Text>Female</Text>
            </View>
          </View>
        </View>
        {/* <View style={{marginLeft: 25, marginTop: 30}}>
          <Text style={styles.sorry1}>Language</Text>
        </View>
        <View
          style={{
            paddingLeft: 25,
            marginTop: 10,
            flexDirection: 'row',

            width: '100%',
            borderBottomWidth: 1
          }}>
          <View style={{}}>
            <Text
              style={{
                paddingBottom: 10,
                paddingLeft: 10,
                borderColor: 'gray',
              }}>
              Turkish,Arabic
            </Text>
          </View>
          <View style={{position: 'absolute', right: 20, bottom: 8, flex: 1}}>
            <TouchableOpacity onPress={() => openrbsheet('ethinicity')}>
              <EvilIcons name="chevron-down" size={26} color="black" />
            </TouchableOpacity>
          </View>
        </View> */}
        <View style={{marginTop: 30, paddingLeft: 25}}>
          <Text
            style={{
              fontSize: 14,
              color: colors.secondary,
              fontFamily: fonts.PoppinsBold,
            }}>
            Language
          </Text>
        </View>
        <View style={{marginTop: 10, flexDirection: 'row', paddingLeft: 25}}>
          <View style={{borderBottomWidth: 0.5, width: '97%'}}>
            <TouchableOpacity onPress={() => openrbsheet('language')}>
              <Text style={{marginBottom: 10, paddingLeft: 15, fontSize: 12}}>
                {language}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{position: 'absolute', right: 10, bottom: 8}}>
            <TouchableOpacity onPress={() => openrbsheet('language')}>
              <EvilIcons name="chevron-down" size={26} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 20, paddingLeft: 25}}>
          <Text
            style={{
              fontSize: 14,
              color: colors.secondary,
              fontFamily: fonts.PoppinsBold,
            }}>
            Minimum Education
          </Text>
        </View>
        <View style={{marginTop: 10, flexDirection: 'row', paddingLeft: 25}}>
          <View style={{borderBottomWidth: 0.5, width: '97%'}}>
            <TouchableOpacity onPress={() => openrbsheet('educationlevel')}>
              <Text style={{marginBottom: 10, paddingLeft: 15, fontSize: 12}}>
                {educationlevel}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{position: 'absolute', right: 10, bottom: 8}}>
            <TouchableOpacity onPress={() => openrbsheet('educationlevel')}>
              <EvilIcons name="chevron-down" size={26} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 20, paddingLeft: 25}}>
          <Text
            style={{
              fontSize: 14,
              color: colors.secondary,
              fontFamily: fonts.PoppinsBold,
            }}>
            Job status
          </Text>
        </View>
        <View style={{marginTop: 10, flexDirection: 'row', paddingLeft: 25}}>
          <View style={{borderBottomWidth: 0.5, width: '97%'}}>
            <TouchableOpacity onPress={() => openrbsheet('profession')}>
              <Text style={{marginBottom: 10, paddingLeft: 15, fontSize: 12}}>
                {profession}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{position: 'absolute', right: 10, bottom: 8}}>
            <TouchableOpacity onPress={() => openrbsheet('profession')}>
              <EvilIcons name="chevron-down" size={26} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 20, paddingLeft: 25}}>
          <Text
            style={{
              fontSize: 14,
              color: colors.secondary,
              fontFamily: fonts.PoppinsBold,
            }}>
            Ethincity
          </Text>
        </View>
        <View style={{marginTop: 10, flexDirection: 'row', paddingLeft: 25}}>
          <View style={{borderBottomWidth: 0.5, width: '97%'}}>
            <TouchableOpacity onPress={() => openrbsheet('ethinicity')}>
              <Text style={{marginBottom: 10, paddingLeft: 15, fontSize: 12}}>
                {ethinicity}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{position: 'absolute', right: 10, bottom: 8}}>
            <TouchableOpacity onPress={() => openrbsheet('ethinicity')}>
              <EvilIcons name="chevron-down" size={26} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 20, paddingLeft: 25}}>
          <Text
            style={{
              fontSize: 14,
              color: colors.secondary,
              fontFamily: fonts.PoppinsBold,
            }}>
            Country
          </Text>
        </View>
        <View style={{marginTop: 10, flexDirection: 'row', paddingLeft: 25}}>
          <View style={{borderBottomWidth: 0.5, width: '97%'}}>
            <TouchableOpacity onPress={() => openrbsheet('country')}>
              <Text style={{marginBottom: 10, paddingLeft: 15, fontSize: 12}}>
                {country}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{position: 'absolute', right: 10, bottom: 8}}>
            <TouchableOpacity onPress={() => openrbsheet('country')}>
              <EvilIcons name="chevron-down" size={26} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{paddingLeft: 27, marginTop: 30}}>
          <Text style={styles.sorry1}>Current Martial status</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
            paddingHorizontal: 20,
          }}>
          <View style={{marginTop: 10}}>
            <RadioButton
              color={colors.primary}
              value="single"
              status={checked === 'single' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('single')}
            />
          </View>
          <View style={{paddingTop: 17}}>
            <Text>Single</Text>
          </View>
          <View style={{marginTop: 10}}>
            <RadioButton
              color={colors.primary}
              value="Engaged"
              status={checked === 'Engaged' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Engaged')}
            />
          </View>
          <View style={{paddingTop: 17}}>
            <Text>Engaged</Text>
          </View>
          <View style={{marginTop: 10}}>
            <RadioButton
              color={colors.primary}
              value="Widowed"
              status={checked === 'Widowed' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Widowed')}
            />
          </View>
          <View style={{paddingTop: 17}}>
            <Text>Widowed</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
          <View>
            <RadioButton
              color={colors.primary}
              value="first"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
            />
          </View>
          <View style={{marginTop: 7}}>
            <Text style={{textAlign: 'center'}}>
              Looking for polygamy(Second,third or forth marriage)
            </Text>
          </View>
        </View>

        <View style={{marginTop: 45}}>
          <GradientsigninButton
            title="Save as Preset"
            iconLeft={logout}
            onButtonPress={() => {
              handleChange('searchfilter');
            }}
          />
        </View>

        <View style={{marginBottom: 25, marginTop: -35}}>
          <GradientsigninButton
            title="Search"
            iconLeft={logout}
            onButtonPress={() => {
              let a = {
                gender: gender,
                age_from: agefrom,
                age_to: ageto,
                language_id: languageid,
                education: educationlevel,
                nationality_id: nationalityid,
                marital_Status: checked,
                profession: profession,
                ethinicity: ethinicityid,
              };
              navigation.navigate('SearchResult', {
                from: 'filters',
                myparam: a,
              });
            }}
          />
        </View>

        {/* <Modal1 /> */}

        <BottomSheet />

        {myprop != false && <Modal1 status={myprop} onChange={handleChange} />}
        <Loading visible={loading} />
      </KeyboardAwareScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  sorry: {
    fontSize: 20,
    color: colors.secondary,
    fontFamily: fonts.PoppinsBold,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.lightGray,
    borderWidth: 0.2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    height: 77,
    // justifyContent: 'center',
    // alignItems: 'cenboter',
    elevation: 4,
    margin: 10,
    borderRadius: 100,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  sorry1: {
    fontSize: 14,
    color: colors.secondary,
    fontFamily: fonts.PoppinsBold,
  },
  item: {
    padding: 2,
    marginHorizontal: 100,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  const {user, token} = state.auth;
  return {
    userData: user,
    token,
  };
};
export default connect(mapStateToProps, {
  getgeneraldata,
  get_county,
  getallmyfilters,
})(Filters1);
