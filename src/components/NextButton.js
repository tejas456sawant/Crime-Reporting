import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class NextButton extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]} onPress={this.props.onPress}>
        <Icon name="page-next-outline" style={styles.icon}></Icon>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#199D05",
    //flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //paddingRight: 16,
    //paddingLeft: 16,
    elevation: 2,
    minWidth: 50,
    minHeight: 50,
    borderRadius: 100,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1.2
    //borderRadius:50,
  },

  icon: {
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 24,
    alignSelf: "center"
  }
});