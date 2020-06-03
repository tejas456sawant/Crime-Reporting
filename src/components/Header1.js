import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

export default class Header1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
          <Icon name="report" style={styles.icon1} />
          <Text style={styles.title}>{this.props.text1}</Text>
        </View>
      </View>
    );
  }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    //flex:1,
    position: 'absolute',
    top: 0,
    width: window.width,
    //overflow: 'hidden',
    height: '10%',
    elevation: 20,
    //width:"100%",
    //height:"12%",
    backgroundColor: '#0E80E9',
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  container1: {
    marginLeft: '7%',
    flexDirection: 'row',
  },
  icon1: {
    flex: 1,
    color: '#fff',
    marginTop: '4%',
    fontSize: 30,
    //padding:10
  },
  title: {
    flex: 6,
    marginTop: '4%',
    right: '1%',
    color: '#fff',
    //position:"absolute",
    //bottom:"32%",
    fontFamily: 'roboto',
    alignSelf: 'baseline',
    fontSize: 18,
    //color:'#461EB7',
    //zIndex:100,
    //elevation:100
  },
});
