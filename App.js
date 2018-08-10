/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import { TipModal } from './src/index'

const instructions = Platform.select({
ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
android:
	'Double tap R on your keyboard to reload,\n' +
	'Shake or press menu button for dev menu',
});

export default class App extends Component {
	loading(){
		this.refs.tipModal._loading()
	}
	_success(){
		this.refs.tipModal._success('成功了',500)
	}
	_error(){
		this.refs.tipModal._error('失败了',500)
	}
	render() {
		return (
			<View style={styles.container}>
				<TipModal ref="tipModal"/>
				<Button title="loading" onPress={this.loading.bind(this)}/>
				<Button title="_success" onPress={this._success.bind(this)}/>
				<Button title="_error" onPress={this._error.bind(this)}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection:'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
