import React, { Component } from 'react';
import { Text, StyleSheet, View, } from "react-native";
import { CheckBox,ListItem } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';

export default class CheckBoxCustom extends Component{
    render(){
        return(
            <View style={styles.container}>
            <LinearGradient colors={[ '#8899dd00','#8899dd22']}>
            <View style={{flexDirection:"row",backgroundColor:"#8899dd44",justifyContent:"center"}}>
               
                <View style={{flex:1,flexDirection:"column",width:"60%",padding:6}}> 
                    <Text style={{fontSize:15,color:"#ccc"}}>{this.props.title}</Text> 
                    <Text style={{color:"#ffffff66"}}>{this.props.examples}</Text>
                </View>
            
            <CheckBox 
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            iconRight
            checkedColor='#8ac'
            uncheckedColor='#88aacc66'
            checked={this.props.checked}
            onPress={this.props.onPress}
            />

            </View>
            </LinearGradient>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#000",
        width:"94%",
        alignSelf:"center",
        marginTop:"3%",borderRadius:5,
        overflow:"hidden"
    },
})