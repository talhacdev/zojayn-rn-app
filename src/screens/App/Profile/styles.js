import {StyleSheet} from 'react-native';
import fonts from '../../../theme/fonts';
import colors from '../../../theme/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  containerStyle: {
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colors.primary,
    padding: 15,
    width: '90%',
    alignSelf: 'center',
    // height: 45,
    justifyContent: 'center',
    margin: 10,
    marginTop: 20,
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 10,
    alignSelf: 'center',
    // backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 0.8,
    borderBottomColor: colors.primary,
    width: '25%',
    paddingBottom: 10,
    marginVertical: 10,

    marginLeft: 20,
    justifyContent: 'space-around',
  },
  input: {
    fontSize: 15,
    fontFamily: fonts.PoppinsRegular,
    marginLeft: 20,
    backgroundColor: colors.white,
    width: '90%',
    marginVertical: 5,
  },
});
export default styles;
