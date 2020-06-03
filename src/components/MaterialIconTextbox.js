import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class MaterialIconTextbox extends Component {
  state = {
    text: '',
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Icon name={this.props.textInputIcon} style={styles.iconStyle} />
        <TextInput
          secureTextEntry={this.props.SecureTextEntry}
          placeholder={this.props.placeholderText}
          placeholderTextColor="#999a"
          style={styles.inputStyle}
          onChangeText={this.props.onChangeText}
          keyboardType={this.props.keyboardType}
        />
        <TouchableOpacity onPress={this.props.onPress}>
          <Icon
            name={this.props.textInputIconPass}
            style={styles.iconStylePass}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    color: '#aaa',
    fontFamily: 'Roboto',
    fontSize: 24,
    paddingLeft: 8,
    margin: 0,
  },
  iconStylePass: {
    color: '#616161',
    fontFamily: 'Roboto',
    fontSize: 24,
    paddingLeft: 0,
    margin: 0,
    left: -3,
  },
  inputStyle: {
    flex: 1,

    color: '#bbb',
    alignSelf: 'stretch',
    margin: 0,
    paddingTop: 14,
    paddingRight: 5,
    paddingLeft: 15,
    paddingBottom: 8,
    borderColor: '#D9D5DC',
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    lineHeight: 16,
  },
});
