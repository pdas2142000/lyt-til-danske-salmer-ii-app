/**Libraries */
import EStyleSheet from 'react-native-extended-stylesheet'
import {getDeviceType} from 'react-native-device-info'

let deviceType = getDeviceType()

/**Main Export */
export default EStyleSheet.create({
	Container: {
		flex: 0,
		zIndex: 4,
	},
	Header: {
		paddingHorizontal: deviceType == 'Tablet' ? '14rem' : '16rem',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(0,0,0,0.1)',
		zIndex: 4,
	},
	HeaderWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: deviceType == 'Tablet' ? '4rem' : '6rem',
	},
	HeaderWrapInner: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	HeaderWrapLogo: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	HeaderWrapText: {
		fontFamily: 'Sen-Bold',
		fontSize: deviceType === 'Tablet' ? '14rem' : '22rem',
		paddingBottom: deviceType == 'Tablet' ? '4rem' : '7rem',
	},
	MenuBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: deviceType == 'Tablet' ? '4rem' : '6rem',
	},
	MenuIcon: {
		fontSize: deviceType == 'Tablet' ? '17.5rem' : '25rem',
	},
	BackIcon: {
		fontSize: deviceType == 'Tablet' ? '20.5rem' : '27rem',
		width: deviceType == 'Tablet' ? '20.5rem' : '27rem',
		height: deviceType == 'Tablet' ? '20.5rem' : '27rem',
	},
	ProfileBtn: {
		padding: deviceType == 'Tablet' ? '4rem' : '6rem',
	},
	ProfileIcon: {
		height: deviceType == 'Tablet' ? '17.5rem' : '25rem',
		width: deviceType == 'Tablet' ? '17.5rem' : '25rem',
		borderRadius: deviceType == 'Tablet' ? '17.5rem' : '25rem',
		resizeMode: 'cover',
	},
	Wrapper: {
		flex: 1,
		position: 'relative',
	},
	Content: {
		paddingHorizontal: deviceType == 'Tablet' ? '14rem' : '16rem',
		paddingTop: deviceType === 'Tablet' ? '14rem' : '20rem',
		paddingBottom: deviceType == 'Tablet' ? '35rem' : '50rem',
	},
	AddCard: {
		flex:1,
		paddingHorizontal: deviceType == 'Tablet' ? '14rem' : '16rem',
		paddingTop: deviceType === 'Tablet' ? '14rem' : '20rem',
		paddingBottom: deviceType == 'Tablet' ? '35rem' : '50rem',
	},
	ScreenTitle: {
		marginVertical: deviceType === 'Tablet' ? '7rem' : '10rem',
		paddingBottom: deviceType === 'Tablet' ? '5rem' : '8rem',
		position: 'relative',
		alignItems: 'flex-start',
	},
	ScreenTitleWrap: {
		paddingRight: deviceType == 'Tablet' ? '10.5rem' : '15rem',
	},
	ScreenTitleText: {
		fontFamily: 'Sen-Bold',
		fontSize: deviceType == 'Tablet' ? '17.5rem' : '25rem',
		zIndex: 2,
	},
	Line_hort: {
		position: 'absolute',
		height: 2,
		left: 0,
		right: 0,
		top: deviceType == 'Tablet' ? '10.5rem' : '15rem',
		backgroundColor: 'rgba(33,33,33,0.15)',
	},
	Main: {
		position: 'relative',
		flex: 1,
	},
	Main_Container: {
		position: 'relative',
		flex: 1,
		zIndex: 1,
	},
	Overlay: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.15)',
		zIndex: 3,
	},
	BottomSheet: {
		zIndex: 2,
	},
	BottomSheetWrap: {
		height: '100%',
		paddingBottom: 30,
	},
	Title_wrap: {
		alignItems: 'center',
	},
	Title: {
		fontFamily: 'Sen-Bold',
		fontSize: deviceType === 'Tablet' ? '12rem' : '18rem',
		lineHeight: deviceType === 'Tablet' ? '17.5rem' : '25rem',
		marginBottom: deviceType === 'Tablet' ? '8rem' : '16rem',
		letterSpacing: -0.35,
	},
	Search_wrap: {
		marginHorizontal: deviceType == 'Tablet' ? '17.5rem' : '25rem',
		marginBottom: deviceType == 'Tablet' ? '14rem' : '16rem',
		borderRadius: deviceType === 'Tablet' ? '5rem' : '8rem',
		paddingLeft: deviceType === 'Tablet' ? '11rem' : '16rem',
		flexDirection: 'row',
		alignItems: 'center',
	},
	Search_Icon: {
		color: 'rgba(0, 0, 0, 0.3)',
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
	},
	Search_Control: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		fontFamily: 'Sen-Regular',
		paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
		paddingRight: deviceType === 'Tablet' ? '11rem' : '16rem',
		paddingLeft: deviceType === 'Tablet' ? '8rem' : '12rem',
		letterSpacing: -0.35,
		flex: 1,
	},
	List_wrap: {
		flex: 1,
	},
	List_Item: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 45,
		paddingHorizontal: deviceType == 'Tablet' ? '17.5rem' : '25rem',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(0,0,0,0.075)',
	},
	Item_Label: {
		flex: 1,
		fontFamily: 'Sen-Regular',
		fontSize: deviceType == 'Tablet' ? '11rem' : '16rem',
		lineHeight: deviceType === 'Tablet' ? '17.5rem' : '25rem',
		letterSpacing: -0.35,
	},
	Error_Wrap: {
		alignItems: 'center',
		paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
	},
	Error_Wrap_Text: {
		fontFamily: 'Sen-Bold',
		fontSize: deviceType == 'Tablet' ? '11rem' : '16rem',
		lineHeight: deviceType === 'Tablet' ? '17.5rem' : '25rem',
		letterSpacing: -0.35,
	},
	Buttons_wrap: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: deviceType == 'Tablet' ? '17.5rem' : '25rem',
		paddingTop: 10,
	},
	Btn_Wrap: {
		flex: 1,
		borderRadius: deviceType === 'Tablet' ? '5rem' : '8rem',
		paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
		paddingHorizontal: deviceType === 'Tablet' ? '17.5rem' : '25rem',
		alignItems: 'center',
	},
	Btn_Text: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		fontFamily: 'Sen-Bold',
	},
	Close_Container: {
		paddingHorizontal: deviceType === 'Tablet' ? '8rem' : '12rem',
	},
	TextBlock: {
		flex: 1,
		fontFamily: 'Sen-Regular',
		fontSize: deviceType === 'Tablet' ? '9rem' : '35rem',
		lineHeight: deviceType === 'Tablet' ? '15rem' : '22rem',
		marginBottom: deviceType === 'Tablet' ? '8rem' : '16rem',
		letterSpacing: -0.35,
	}
})
