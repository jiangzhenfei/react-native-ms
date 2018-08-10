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
    Image,
    TouchableOpacity
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

export class ConfirmModal extends React.Component{
    constructor( props ){
        super( props );
        this.state = {
            modalVisible: false, 
            tip:          '默认的提示',
        }
    }
    /*打开弹窗口*/
    _open( tip ){
        this.setState( { modalVisible:true ,tip:tip } )
    }
    /*关闭弹窗口*/
    _close(){
        this.setState( { modalVisible:false,tip:'默认的提示' } )
    }
    
    render(){
        let {
            animationType  = 'fade',      //运动形式
            confirmFunc    = function(){} //确认按钮需要执行的函数
        } = this.props;
        return (
            <Modal
                animationType={ animationType }
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
            >
                <View style={{flex:1, marginTop: 22, justifyContent: 'center', alignItems: 'center'}}>
                    <View style = { [styles.loadingContainer,{justifyContent: 'flex-start', }] }>
                        <View style = { styles.text }>
                            <Text style = {{color:"#fff"}}>{ this.state.tip }</Text>
                        </View>
                        <View style = { styles.btnContainer }>
                            <TouchableOpacity style={{flex:1,}} onPress ={ confirmFunc }>
                                <View style = { [ styles.btn, { borderLeftWidth:0 }] }>
                                    <Text style = {{color:"#fff"}}>确定</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1,}} onPress ={ this._close.bind(this)}>
                                <View style={ [ styles.btn, { borderRightWidth:0 } ] }>
                                    <Text style = {{color:"#fff"}}>取消</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}




const styles = StyleSheet.create({
    loadingContainer:{
        position:'relative',
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
        width:30,
        height:30,
        backgroundColor:'#fff',
        borderRadius:15,
        overflow:'hidden'
    },
    icon:{
        width:'100%',
        height:'100%'
    },
    text:{
        height:60,
        justifyContent:'center',
        alignItems:'center'
    },
    btnContainer:{
        position:'absolute',
        bottom:0,
        width:'100%',
        height:40,
        flexDirection:'row',
    },
    btn:{
        flex:1,
        justifyContent: 'center', 
        alignItems: 'center',
        fontSize:16,
        borderWidth:1,
        borderColor:'#fff'
    }
})