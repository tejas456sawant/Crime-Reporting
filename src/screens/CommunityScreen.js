import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import Header1 from '../components/Header1';
export default class CommunityScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header1 text1="Community Reports" />
        <WebView
          source={{uri: 'https://realtimecrimereporting.000webhostapp.com/'}}
          style={{
            marginTop: 60,
            maxHeight: 425,
            width: 325,
            flex: 1,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
