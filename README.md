# RNtips

### Install iView

Using npm:
```
npm install react-native-ms --save
```
## Usage
Using via `import`:

```js
import { TipModal } from 'react-native-ms';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';


export default class App extends Component {
  /* 打开loading弹出框 */
	loading(){
		this.refs.tipModal._loading()
	}
  /* 打开成功提示框,参数一是提示内容，参数二是多少时间自动关闭*/
	_success(){
		this.refs.tipModal._success('成功了',500)
	}
  /* 打开失败提示框,参数一是提示内容，参数二是多少时间自动关闭*/
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
```
### Props
#### 1.successIconComponent
组件有默认的成功提示图片，但是并不能符合所有人要求，使用如下
```js
<TipModal ref="tipModal"
  successIconComponent={
    <Icon 
      color = '#FFFFFF'
      type = 'evilicon'
      name = 'check'
      size = { 30 }
    />
  }
/>
```

#### 2.errorIconComponent
组件有默认的成功提示图片，但是并不能符合所有人要求，使用如下
```js
<TipModal ref="tipModal"
  errorIconComponent={
    <Icon 
      color = '#FFFFFF'
      type = 'evilicon'
      name = 'close-o'
      size = { 30 }
    />
  }
/>
```
