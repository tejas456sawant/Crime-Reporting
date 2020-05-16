import React, { Component } from "react";
import {View, Text, StyleSheet} from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default class UpdateDetail extends Component{ 
    render(){
        return(
            <View style={styles.container}>
                <LinearGradient  start={{x: 0, y: 0}} end={{x: 0, y: 1.0}}
                locations={[0.3,0.9]}
                colors={[ '#F0F0FD','#E1E6EB']} style={styles.grad}>
                <Text style={styles.Title}>
                    {this.props.title}
                </Text></LinearGradient>
                <LinearGradient  start={{x: 0, y: 0}} end={{x: 0, y: 1.0}}
                locations={[0.7,0.9]}
                colors={[ '#F0F0FD','#E1E6EB']} style={styles.grad1}>
                <Text  style={styles.Content}>
                    {this.props.content}
                </Text></LinearGradient>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //position:"relative",
        backgroundColor:"#F0F0FD",
        borderRadius:30,
        
        //alignItems:'center',

    },
    Title:{
        paddingTop:"5%",
        paddingLeft:"5%",
        paddingRight:"5%",
        paddingBottom:"8%",
        fontSize: 20,
        //borderBottomWidth:1,
        //borderColor: "#635C73"
    },
    Content:{
        paddingTop:"9%",
        paddingLeft:"5%",
        paddingRight:"3%",
        paddingBottom:"9%",
        marginBottom:"9%",
        borderBottomColor:"#C6C3C4",
        borderBottomWidth: 1
    },
    grad:{
        borderTopLeftRadius:30,
        borderTopRightRadius:30
    },
    grad1:{
        borderBottomLeftRadius:30,
        borderBottomLeftRadius:30,
    }
})