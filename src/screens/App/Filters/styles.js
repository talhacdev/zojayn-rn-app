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
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 0.2,
    borderColor: '#ddd',
    shadowColor: '#BDBDBD',
    shadowOpacity: 0.6,
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
