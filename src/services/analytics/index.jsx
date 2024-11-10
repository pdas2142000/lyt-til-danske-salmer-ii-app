import analytics from '@react-native-firebase/analytics';

export const pushToAnalytics = async (eventType, data = {}, enabled = true) => {
	try {
		// console.log('analytics', eventType, data, enabled);
		if (enabled) {
		await analytics().logEvent(eventType, data);
		}
	} catch (err) {
		console.log('err at pushtoanalytics', err);
	}
};

export const Screen_track = async ScreenName => {
  await analytics().logScreenView({
    screen_name: ScreenName,
    screen_class: ScreenName,
  });
};

export const Set_User_For_Analytics = async UserID => {
  if (UserID != '') {
    await analytics().setUserId(UserID);
  }
};

export const Remove_User_For_Analytics = async () => {
  await analytics().setUserId(null);
};
