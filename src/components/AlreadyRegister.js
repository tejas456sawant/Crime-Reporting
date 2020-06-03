import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import NavigationService from './NavigationService';

export default class AlreadyRegister extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={() => NavigationService.navigate('login')}>
        <Text style={styles.caption}>Already Register</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3F51B5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 50,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  caption: {
    color: '#fff',
    alignSelf: 'flex-start',
    margin: 7,
    padding: 0,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
});
