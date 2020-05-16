import React, { Component } from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";


export default class Header extends Component{
    render(){
        return(
            <View style={styles.container} >
                <Text style={styles.title}>{this.props.text1}</Text>  
                <View style={styles.container1}>                   
                </View>
            </View>
        )
    }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top:0,
      width: window.width,
      //overflow: 'hidden',
      height: window.width / 3.6,
      //width:"100%",
      //height:"12%",
      //backgroundColor: "#000",
      //alignItems: 'center',
      //justifyContent: 'center'
    },
    container1:{
        borderRadius: window.width,
        width: window.width * 2,
        height: window.width * 2,
        marginLeft: -(window.width / 2),
        position: "absolute",
        bottom: 0,
        overflow: "hidden",
        backgroundColor: "white",
        flex:1,
        elevation:10,
     
    },
    title:{
        position:"absolute",
        bottom:"32%",
        fontFamily:"sans-serif-condensed",
        alignSelf:"center",
        fontSize:45,
        color:'#461EB7',
        zIndex:100,
        elevation:100
    }
  
  });
