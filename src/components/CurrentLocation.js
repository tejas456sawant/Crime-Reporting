import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default class CurrentLocation extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}>
        <Icon name="location-pin" style={styles.icon} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0064FF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 200,
    minWidth: 50,
    minHeight: 50,
    borderRadius: 100,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowColor: '#111',
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
  },
  icon: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 24,
    alignSelf: 'center',
  },
});
