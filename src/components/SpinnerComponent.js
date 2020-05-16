import React, { Component } from 'react';
import { StyleSheet, View ,ActivityIndicator} from 'react-native';

export default class SpinnerComponent extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal,this.props.style]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})