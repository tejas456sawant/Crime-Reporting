import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

export default class MaterialMapView extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <MapView style={styles.mapView1} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  mapView1: {
    backgroundColor: 'rgb(230,230,230)',
    height: '100%',
    width: '100%',
  },
});
