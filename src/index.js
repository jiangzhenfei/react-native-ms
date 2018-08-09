/*
    弹窗提示组件
*/

import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Modal,
    ActivityIndicator,
} from 'react-native';



export class TipModal extends React.Component{
    constructor( props ){
        super( props );
        this.state = {
            modalVisible: true,
            loading:true,
            tip:'默认的提示',
            success:true
        }
    }
    //打开弹窗
    _open(){
        this.setState( { modalVisible:true } )
    }
    //关闭弹窗
    _close(){
        this.setState( { modalVisible:false } )
    }
    //成功提示
    _success( tip ){
        this.setState( { 
            success:true,
            loading:false ,
            tip:tip || '成功'
        } )
    }
    //失败提示
    _error( tip ){
        this.setState( { 
            success:false,
            loading:false ,
            tip:tip || '失败!'
        } )
    }
    render(){
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
            >
                <View style={{flex:1, marginTop: 22, justifyContent: 'center', alignItems: 'center'}}>
                    <View style = { styles.loadingContainer }>
                        { this.state.loading?
                            (
                                <View>
                                    <ActivityIndicator
                                        animating={true}
                                        color='white'
                                        style={{
                                            marginTop: 10,
                                            width: 60,
                                            height: 60,
                                        }}
                                        size="large" />
                                </View>
                            ):(
                                <View>
                                    <Text style={{ color:'#fff'}}>{ this.state.tip }</Text>
                                </View>
                            )
                        }
                    </View>
                </View>
            </Modal>
        )
    }
}




const styles = StyleSheet.create({
    loadingContainer:{
        width:180,
        height:100,
        borderRadius:10,
        backgroundColor:'#000',
        opacity:0.3,
        justifyContent: 'center', 
        alignItems: 'center'
    }
})