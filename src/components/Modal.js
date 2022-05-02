import React, {useState} from 'react';
import {Text, View, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import CustomText from './../components/Text';
import {Divider, RadioButton} from 'react-native-paper';
import {colors} from 'react-native-elements';

// const {height, width} = Dimensions.get('windows');
const CustomModal = ({
  heading,
  value,
  onPress,
  type,
  onHeightChange,
  onWeightChange,
  onEthinicity,
  onCountry,
  onNationality,
  onMartial,

  onHobbies,
  onReligion,
  onReligionPractice,
  onCovid,
  onHealth,
}) => {
  //Genders
  const [genders, setGenders] = useState([
    {id: 0, name: 'Male'},
    {id: 1, name: 'Female'},
    {id: 2, name: 'Unspecified'},
  ]);
  const [religion, setReligion] = useState([
    {id: 0, name: 'Islam'},
    {id: 1, name: 'Hindow'},
    {id: 2, name: 'Christian'},
    {id: 2, name: 'Jew'},
    {id: 2, name: 'Other'},
  ]);
  const [hobbies, setHobbies] = useState([
    {id: 0, name: 'Cricket'},
    {id: 1, name: 'Football'},
    {id: 2, name: 'Video Gaming'},
    {id: 2, name: 'Book Reading'},
    {id: 2, name: 'Other'},
  ]);
  const [religiousPractice, setReligionPractice] = useState([
    {id: 0, name: 'Religious'},
    {id: 1, name: 'Very Religious'},
    {id: 2, name: 'Just Religious'},
    {id: 2, name: 'Not Religious'},
    {id: 2, name: 'Not Specified'},
  ]);
  const [martial, setMartial] = useState([
    {id: 0, name: 'Married'},
    {id: 1, name: 'Single'},
    {id: 2, name: 'Divorced'},
    {id: 3, name: 'Not Specificed'},
  ]);
  const [heights, setHeights] = useState([
    {id: 0, name: `5 5`},
    {id: 1, name: `5 6`},
    {id: 2, name: `5 7`},
    {id: 2, name: `5 8`},
    {id: 2, name: `5 9`},
    {id: 2, name: `6 1 `},
    {id: 2, name: `6 2`},
    {id: 2, name: `6 3`},
  ]);
  const [weights, setweight] = useState([
    {id: 0, name: `100 lbs`},
    {id: 1, name: `120 lbs`},
    {id: 2, name: `130 lbs`},
    {id: 2, name: `140 lbs`},
    {id: 2, name: `150 lbs`},
    {id: 2, name: `160 lbs`},
    {id: 2, name: `170 lbs`},
    {id: 2, name: `180`},
  ]);
  const [Ethi, setEthi] = useState([
    {id: 0, name: `Africa`},
    {id: 1, name: `Asia`},
    {id: 2, name: `Europe`},
    {id: 2, name: `North America`},
    {id: 2, name: `South America`},
    {id: 2, name: `Austrila`},
  ]);
  const [country, setCountry] = useState([
    {id: 0, name: `Africa`},
    {id: 1, name: `Asia`},
    {id: 2, name: `Europe`},
    {id: 2, name: `North America`},
    {id: 2, name: `South America`},
    {id: 2, name: `Austrila`},
  ]);
  const [national, setNational] = useState([
    {id: 0, name: `Pakistani`},
    {id: 1, name: `Saudi`},
    {id: 2, name: `Indian`},
    {id: 2, name: `American`},
    {id: 2, name: `Africian`},
    {id: 2, name: `Austrilan`},
  ]);
  const [health, sethealth] = useState([
    {id: 0, name: `Fit`},
    {id: 1, name: `Unfit`},
    {id: 2, name: `UnSpecified`},
  ]);
  const [covid, setCovid] = useState([
    {id: 0, name: `None`},
    {id: 1, name: `Positive`},
    {id: 2, name: `Negitive`},
  ]);

  return (
    <Modal isVisible={true} coverScreen={true} hasBackdrop={true}>
      {type == 'Gender' ? (
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <CustomText
            title={heading}
            type={'medium'}
            style={{fontSize: 15, alignSelf: 'center', marginTop: 10}}
          />

          <FlatList
            data={genders}
            contentContainerStyle={{margin: 10}}
            keyExtractor={item => item}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => onPress(item)}>
                  <CustomText
                    title={item.name}
                    type={'normal'}
                    style={{fontSize: 17, marginLeft: 20, marginVertical: 10}}
                  />
                  <Divider style={{marginVertical: 10, height: 1}} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : type == 'Height' ? (
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <CustomText
            title={heading}
            type={'medium'}
            style={{fontSize: 15, alignSelf: 'center', marginTop: 10}}
          />

          <FlatList
            data={heights}
            contentContainerStyle={{margin: 10}}
            keyExtractor={item => item}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => onHeightChange(item)}>
                  <CustomText
                    title={item.name}
                    type={'normal'}
                    style={{fontSize: 17, marginLeft: 20, marginVertical: 10}}
                  />
                  <Divider style={{marginVertical: 10, height: 1}} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : type == 'Weight' ? (
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <CustomText
            title={heading}
            type={'medium'}
            style={{fontSize: 15, alignSelf: 'center', marginTop: 10}}
          />

          <FlatList
            data={weights}
            contentContainerStyle={{margin: 10}}
            keyExtractor={item => item}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => onWeightChange(item)}>
                  <CustomText
                    title={item.name}
                    type={'normal'}
                    style={{fontSize: 17, marginLeft: 20, marginVertical: 10}}
                  />
                  <Divider style={{marginVertical: 10, height: 1}} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : type == 'Ethinicity' ? (
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <CustomText
            title={heading}
            type={'medium'}
            style={{fontSize: 15, alignSelf: 'center', marginTop: 10}}
          />

          <FlatList
            data={Ethi}
            contentContainerStyle={{margin: 10}}
            keyExtractor={item => item}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => onEthinicity(item)}>
                  <CustomText
                    title={item.name}
                    type={'normal'}
                    style={{fontSize: 17, marginLeft: 20, marginVertical: 10}}
                  />
                  <Divider style={{marginVertical: 10, height: 1}} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : type == 'Nationality' ? (
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <CustomText
            title={heading}
            type={'medium'}
            style={{fontSize: 15, alignSelf: 'center', marginTop: 10}}
          />

          <FlatList
            data={national}
            contentContainerStyle={{margin: 10}}
            keyExtractor={item => item}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => onNationality(item)}>
                  <CustomText
                    title={item.name}
                    type={'normal'}
                    style={{fontSize: 17, marginLeft: 20, marginVertical: 10}}
                  />
                  <Divider style={{marginVertical: 10, height: 1}} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : type == 'Country' ? (
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <CustomText
            title={heading}
            type={'medium'}
            style={{fontSize: 15, alignSelf: 'center', marginTop: 10}}
          />

          <FlatList
            data={country}
            contentContainerStyle={{margin: 10}}
            keyExtractor={item => item}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => onCountry(item)}>
                  <CustomText
                    title={item.name}
                    type={'normal'}
                    style={{fontSize: 17, marginLeft: 20, marginVertical: 10}}
                  />
                  <Divider style={{marginVertical: 10, height: 1}} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : type == 'Martial Status' ? (
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <CustomText
            title={heading}
            type={'medium'}
            style={{fontSize: 15, alignSelf: 'center', marginTop: 10}}
          />

          <FlatList
            data={martial}
            contentContainerStyle={{margin: 10}}
            keyExtractor={item => item}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => onMartial(item)}>
                  <CustomText
                    title={item.name}
                    type={'normal'}
                    style={{fontSize: 17, marginLeft: 20, marginVertical: 10}}
                  />
                  <Divider style={{marginVertical: 10, height: 1}} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : type == 'Religion' ? (
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <CustomText
            title={heading}
            type={'medium'}
            style={{fontSize: 15, alignSelf: 'center', marginTop: 10}}
          />

          <FlatList
            data={religion}
            contentContainerStyle={{margin: 10}}
            keyExtractor={item => item}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => onReligion(item)}>
                  <CustomText
                    title={item.name}
                    type={'normal'}
                    style={{fontSize: 17, marginLeft: 20, marginVertical: 10}}
                  />
                  <Divider style={{marginVertical: 10, height: 1}} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : type == 'ReligionPractice' ? (
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <CustomText
            title={heading}
            type={'medium'}
            style={{fontSize: 15, alignSelf: 'center', marginTop: 10}}
          />

          <FlatList
            data={religiousPractice}
            contentContainerStyle={{margin: 10}}
            keyExtractor={item => item}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => onReligionPractice(item)}>
                  <CustomText
                    title={item.name}
                    type={'normal'}
                    style={{fontSize: 17, marginLeft: 20, marginVertical: 10}}
                  />
                  <Divider style={{marginVertical: 10, height: 1}} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : type == 'Hobbies' ? (
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <CustomText
            title={heading}
            type={'medium'}
            style={{fontSize: 15, alignSelf: 'center', marginTop: 10}}
          />

          <FlatList
            data={hobbies}
            contentContainerStyle={{margin: 10}}
            keyExtractor={item => item}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => onHobbies(item)}>
                  <CustomText
                    title={item.name}
                    type={'normal'}
                    style={{fontSize: 17, marginLeft: 20, marginVertical: 10}}
                  />
                  <Divider style={{marginVertical: 10, height: 1}} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : type == 'Health' ? (
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <CustomText
            title={heading}
            type={'medium'}
            style={{fontSize: 15, alignSelf: 'center', marginTop: 10}}
          />

          <FlatList
            data={health}
            contentContainerStyle={{margin: 10}}
            keyExtractor={item => item}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => onHealth(item)}>
                  <CustomText
                    title={item.name}
                    type={'normal'}
                    style={{fontSize: 17, marginLeft: 20, marginVertical: 10}}
                  />
                  <Divider style={{marginVertical: 10, height: 1}} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : type == 'Covid 19 History' ? (
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <CustomText
            title={heading}
            type={'medium'}
            style={{fontSize: 15, alignSelf: 'center', marginTop: 10}}
          />

          <FlatList
            data={covid}
            contentContainerStyle={{margin: 10}}
            keyExtractor={item => item}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => onCovid(item)}>
                  <CustomText
                    title={item.name}
                    type={'normal'}
                    style={{fontSize: 17, marginLeft: 20, marginVertical: 10}}
                  />
                  <Divider style={{marginVertical: 10, height: 1}} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        ''
      )}
    </Modal>
  );
};

export default CustomModal;
// {
//   type == 'Ethinicity' || type == 'Nationality' || type == 'Country'
//     ? showEthinicity(type)
//     : '';
// }
// {
//   type == 'Martial Status' ? showEthinicity(type) : '';
// }
