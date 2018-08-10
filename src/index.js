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
    Image
} from 'react-native';

export class TipModal extends React.Component{
    constructor( props ){
        super( props );
        this.state = {
            modalVisible: false, 
            loading:      false,
            tip:          '默认的提示',
            success:      false
        }
    }
    /*打开弹窗口*/
    _open(){
        this.setState( { modalVisible:true } )
    }
    /*关闭弹窗口*/
    _close(){
        this.setState( { modalVisible:false } )
    }
    /*加载中....*/
    _loading ( ){
        this.setState( { 
            modalVisible:true,
            loading:true,
        } )
    }
    /*成功提示*/
    _success( tip, time ){
        this.setState( { 
            modalVisible:true,
            success:true,
            loading:false ,
            tip:tip || '成功'
        } )
        setTimeout(()=>{
            this._close()
        },time || 1000)
    }
    /*失败提示*/
    _error( tip, time ){ 
        this.setState( { 
            modalVisible:true,
            success:false,
            loading:false ,
            tip:tip || '失败!'
        } )
        setTimeout(()=>{
            this._close()
        },time || 1000)
    }
    render(){
        let {
            successIconComponent  = null, //成功自定义图标
            errorIconComponent    = null,  //失败自定义图标
            animationType         = 'fade'
        } = this.props;
        return (
            <Modal
                animationType={ animationType }
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
                                this.state.success?
                                (
                                    <View style={styles.parent}>
                                        {
                                            successIconComponent?
                                            (
                                                successIconComponent
                                            ):(
                                                <View style={styles.imageContainer}>
                                                    <Image
                                                        style={styles.icon}
                                                        source={require('./images/yes.png')}
                                                    />
                                            
                                                </View>
                                            )
                                        }
                                        
                                        <Text style={{ color:'#fff',marginTop:5}}>{ this.state.tip }</Text>
                                    </View>
                                ):(
                                    <View style={styles.parent}>
                                        {
                                            errorIconComponent?
                                            (
                                                errorIconComponent
                                            ):( 
                                                <View style={styles.imageContainer}>             
                                                    <Image
                                                        style={styles.icon}
                                                        source={require('./images/no.png')}
                                                    />
                                                </View>
                                            )
                                        }
                                        
                                        <Text style={{ color:'#fff',marginTop:5}}>{ this.state.tip }</Text>
                                    </View>
                                )
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
    },
    parent:{
        justifyContent:'center',
        alignItems:'center'
    },
    imageContainer:{
        width:40,
        height:40,
        backgroundColor:'#fff',
        borderRadius:20,
        overflow:'hidden'
    },
    icon:{
        width:'100%',
        height:'100%'
    }
})