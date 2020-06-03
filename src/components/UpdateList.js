import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import UpdateDetail from './UpdateDetail';

export default class UpdateList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <UpdateDetail
          title="Lorem ipsum dolor sit amet, "
          content="Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,."
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //alignItems:'center',
    marginTop: 10,
    //left:"1%",
    alignSelf: 'center',
  },
});
