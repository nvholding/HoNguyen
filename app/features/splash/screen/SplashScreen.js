import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import PlatformDevices from 'app/utils/PlatformDevices';
import styles from 'app/features/splash/screen/SplashScreenStyles';
import * as NavigationHelpers from 'app/navigation/NavigationHelpers';

const TAG = 'SplashScreen';

export default class SplashScreen extends Component {
  componentDidMount() {
    console.log(TAG + ' componentDidMount');
    setTimeout(() => {
      NavigationHelpers.navigateToLogin();
    }, 2000);
  }

  render() {
    return (
	
      <View style={styles.container}>
		<View style={styles.container}>
			<Image style={styles.image} resizeMode='contain' source={require('../../../../images/logo.png')}></Image>
		</View>
        <Text> www.HoNguyen.vn</Text>
        <Text>Version : 0.0.01 </Text>
		<Text>Founder : NV Systems </Text>
      </View>
    );
  }
}
