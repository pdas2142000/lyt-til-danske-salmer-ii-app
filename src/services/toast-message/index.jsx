import Toast from "react-native-toast-message";

export const ShowToast = (
  Message,
  Type = "success",
  SubText = null,
  Position = "top"
) => {
  Toast.show({
    type: Type,
    position: Position,
    text1: Message,
    text2: SubText,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 100,
    text1NumberOfLines:3,
    text2NumberOfLines:3,
    onShow: () => {},
    onHide: () => {},
    onPress: () => {},
    props: {},
  });
};