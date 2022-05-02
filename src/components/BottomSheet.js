import React, {useRef} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
export const BottomSheet = () => {
  const refRBSheet = useRef();

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({item}) => <Item title={item.title} />;
  return (
    <View>
      <RBSheet
        height={300}
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
        {/* <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        /> */}
      </RBSheet>
    </View>
  );
};
export default BottomSheet;
