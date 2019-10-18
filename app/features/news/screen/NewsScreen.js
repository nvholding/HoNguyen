import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from 'app/features/news/screen/NewsScreenStyles';
import i18n from 'app/utils/i18n';
import * as StringNames from 'app/assets/locales/StringNames';
const TAG = 'NewsScreen';

export default class NewsScreen extends Component {
  render() {
    return (
	  <WebView
        originWhitelist={['*']}
        source={{ html: "<iFrame src='http://www.honguyen.vn' width='100%' height='100%'/>" }}
      />
    );
  }
}
