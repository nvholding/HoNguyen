import React, { Component } from 'react';
import { View, Button, Text, TextInput,  Alert, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from 'app/features/login/screens/LoginScreenStyles';
import * as loginActions from 'app/features/login/actions';
import { getLoginState } from 'app/features/login/selectors';

import i18n from 'app/utils/i18n';
import * as StringNames from 'app/assets/locales/StringNames';
import { getConfigs } from 'app/config';

const TAG = 'LoginScreen';

class LoginScreen extends Component {
	// https://medium.com/@User3141592/react-gotchas-and-best-practices-2d47fd67dd22
	_loginClick() {
		console.log(TAG + ' loginClick ');
		fetch('https://qlph.herokuapp.com/login', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			Username: this.state.username,
			Password: this.state.passworduser
		})
	})
	.then((response) => response.json())
	.then((responseData) => {
		//console.log(responseData);
		if (responseData.Noi_dung == 1) {
			this.props.onLogin(this.state.username, this.state.passworduser);	
		}else{
			setTimeout(() => {
			  Alert.alert(StringNames.LoginFail);
			}, 200);
		}
		
	})
	.catch((error) => {
		setTimeout(() => {
			  Alert.alert(StringNames.LoginFail);
			}, 200);
	});
		
	}
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			passworduser: ''
		}
	}
  render() {
    return (
      <View style={styles.container}>
        <Text>{StringNames.Login}</Text>
		<TextInput onChangeText={(username) => this.setState({ username })}
			value={this.state.username} placeholder={StringNames.Username} style={styles.input} />
		<TextInput onChangeText={(passworduser) => this.setState({ passworduser })}
			value={this.state.passworduser} placeholder={StringNames.Passworduser} style={styles.input} secureTextEntry />
        <Button onPress={() => this._loginClick()} title={i18n.t(StringNames.Login)} />
      </View>
    );
  }
}

// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
LoginScreen.propTypes = {
  status: PropTypes.string,
  onLogin: PropTypes.func,
};

function mapStateToProps(state) {
  console.log(TAG + ' mapStateToProps ' + JSON.stringify(state));
  return {
    status: getLoginState(state),
  };
}

function mapDispatchToProps(dispatch) {
  console.log(TAG + ' mapDispatchToProps ');
  
  return {
    onLogin: (username, password) => dispatch(loginActions.requestLogin(username, password)),
  };
}

// https://react-redux.js.org/api/connect
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
