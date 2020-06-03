import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class SOSButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <LinearGradient
          start={{x: 0.25, y: 0}}
          end={{x: 1, y: 0.5}}
          locations={[0, 0.7]}
          colors={['#009BFF', '#0064FF']}
          style={styles.gradient}>
          <Text style={styles.icon}>EMERGENCY SOS</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0077d5',
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
    overflow: 'hidden',
  },
  icon: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 22,
    alignSelf: 'center',
    padding: 8,
  },
  gradient: {
    flex: 1,
    width: '100%',
  },
});
