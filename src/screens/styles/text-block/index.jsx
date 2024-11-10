/**React Imports */
import EStyleSheet from 'react-native-extended-stylesheet';
import {getDeviceType} from 'react-native-device-info';

let deviceType = getDeviceType();

export default EStyleSheet.create({
  TextBlock: {
    marginTop: deviceType === 'Tablet' ? '7rem' : '10rem',
  },
  Video_Wrap: {
    marginBottom: deviceType === 'Tablet' ? '8rem' : '16rem',
  },
  Text: {
    flex: 1,
    fontFamily: 'Sen-Regular',
    fontSize: deviceType === 'Tablet' ? '9rem' : '15rem',
    lineHeight: deviceType === 'Tablet' ? '14rem' : '21rem',
    marginBottom: deviceType === 'Tablet' ? '8rem' : '16rem',
    letterSpacing: -0.35,
  },
  Text_Link: {
    flex: 1,
    fontFamily: 'Sen-Regular',
    fontSize: deviceType === 'Tablet' ? '9rem' : '15rem',
    lineHeight: deviceType === 'Tablet' ? '15rem' : '22rem',
    marginBottom: deviceType === 'Tablet' ? '8rem' : '12rem',
    letterSpacing: -0.35,
    textAlign: 'left',
  },
  Text_Link_Bold: {
    flex: 1,
    fontFamily: 'Sen-Bold',
  },
  Text_Dark: {
    flex: 1,
  },
  Text_Bold: {
    flex: 1,
    fontFamily: 'Sen-Bold',
    textDecorationLine: 'underline',
  },
  Text_Dark_Bold: {
    flex: 1,
    fontFamily: 'Sen-Bold',
  },
  Text_Image: {
    marginBottom: deviceType === 'Tablet' ? '8rem' : '16rem',
  },
  List: {
    marginBottom: deviceType === 'Tablet' ? '8rem' : '16rem',
  },
  List_Item: {
    position: 'relative',
    flexDirection: 'row',
  },
  Dot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    marginTop: deviceType === 'Tablet' ? '7rem' : '10rem',
    marginRight: deviceType === 'Tablet' ? '7rem' : '10rem',
  },
  Table: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.075)',
    marginBottom: deviceType === 'Tablet' ? '8rem' : '16rem',
  },
  Row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.075)',
  },
  'Row:last-child': {
    borderBottomWidth: 0,
  },
  'Row:nth-child-odd': {
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  Col: {
    padding: deviceType === 'Tablet' ? '7rem' : '10rem',
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.075)',
  },
  Text_Table: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.075)',
  },
  Text_Table_Item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: deviceType === 'Tablet' ? '10.5rem' : '15rem',
    paddingVertical: deviceType === 'Tablet' ? '7rem' : '10rem',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.075)',
  },
  'Text_Table_Item:last-child': {
    borderBottomWidth: 0,
  },
  Text_Table_Item_Inner: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.075)',
    alignItems: 'flex-start',
  },
  Text_Sm: {
    fontFamily: 'Sen-Bold',
    fontSize: deviceType === 'Tablet' ? '9.5rem' : '15rem',
    lineHeight: deviceType === 'Tablet' ? '14rem' : '20rem',
  },
  Duration_Wrap: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  Duration: {
    fontSize: deviceType === 'Tablet' ? '8.5rem' : '12rem',
    fontFamily: 'Sen-Bold',
  },
  Play_Btn: {
    width: deviceType === 'Tablet' ? '28rem' : '40rem',
    height: deviceType === 'Tablet' ? '28rem' : '40rem',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: deviceType === 'Tablet' ? '7rem' : '10rem',
  },
  Play_Icon: {
    fontSize: deviceType === 'Tablet' ? '17.5rem' : '25rem',
  },
  Text_Link_Sm: {
    fontSize: deviceType === 'Tablet' ? '9.5rem' : '15rem',
    lineHeight: deviceType === 'Tablet' ? '14rem' : '20rem',
    marginLeft: deviceType === 'Tablet' ? '7rem' : '10rem',
  },
  List_Sm: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  List_Item_Sm: {
    width: '50%',
  },
  Contact_Form: {
    marginVertical: deviceType === 'Tablet' ? '8rem' : '16rem',
  },
  Contact_Form_Wrap: {
    borderRadius: deviceType === 'Tablet' ? '7rem' : '10rem',
    padding: deviceType === 'Tablet' ? '14rem' : '20rem',
  },
  Contact_Form_Wrap_Inner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  Form_Grp: {
    width: '100%',
  },
  Input_Wrap: {
    marginBottom: deviceType === 'Tablet' ? '14rem' : '20rem',
  },
  Label: {
    fontFamily: 'Sen-Regular',
    fontSize: deviceType === 'Tablet' ? '9.5rem' : '15rem',
    marginBottom: deviceType === 'Tablet' ? '3.5rem' : '5rem',
  },
  Form_Control: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    height: deviceType === 'Tablet' ? '31.5rem' : '45rem',
    paddingHorizontal: deviceType === 'Tablet' ? '9.5rem' : '15rem',
    borderRadius: deviceType === 'Tablet' ? '3.5rem' : '5rem',
  },
  Form_Control_Lg: {
    height: deviceType === 'Tablet' ? '75rem' : '100rem',
    textAlignVertical: 'top',
  },
  Submit_Area: {
    width: '100%',
    alignItems: 'center',
  },
  Submit_Btn: {
    paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
    paddingHorizontal: deviceType === 'Tablet' ? '17.5rem' : '25rem',
    borderRadius: deviceType === 'Tablet' ? '3.5rem' : '5rem',
    borderWidth: 1,
    width: '180rem',
  },
  Submit_Btn_Text: {
    fontSize: deviceType === 'Tablet' ? '9.5rem' : '15rem',
    fontFamily: 'Sen-Regular',
    textAlign: 'center',
  },
});
