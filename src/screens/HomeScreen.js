import React, { Component } from "react";
import { View, ScrollView,Text, StyleSheet, SafeAreaView, BackHandler, Button ,TouchableOpacity,Dimensions} from 'react-native';
//import LinearGradient from "react-native-linear-gradient";
//import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import UpdateList from '../components/UpdateList';
 
export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header text1="Updates"/> 
      
        <View style={styles.container1}>
        <UpdateList style={styles.list}/>
        <UpdateList style={styles.list}/>
        </View>
      </View>
    )
  }
}
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    //justifyContent: 'center'
  },
  container1:{
    position:"absolute",
    top: (window.width / 3.8)+20,
    width:"96%"
    
  },
  list:{
//    marginTop:10
  }
});