import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class SignInButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}>
        <LinearGradient
          start={{x: 0.25, y: 0}}
          end={{x: 1, y: 0.5}}
          locations={[0, 0.7]}
          colors={['#009BFF', '#0064FF']}
          style={styles.gradient}>
          <Text style={styles.caption}>SIGN IN</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    left: -40,
    backgroundColor: '#3F51B5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingRight: 16,
    //paddingLeft: 16,
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
    overflow: 'hidden',
  },
  caption: {
    padding: 7,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
