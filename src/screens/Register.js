import React, { Component } from "react";
import { StyleSheet, View ,Text} from "react-native";
import MaterialIconTextbox from "../components/MaterialIconTextbox";
import AlreadyRegister from "../components/AlreadyRegister";
import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";
import Firebase,{DataBase,Auth} from '../components/Firebase';
import LinearGradient from 'react-native-linear-gradient';
import ToastMessageBottom from "../components/ToastMessageBottom";
import getFirebaseSignUpErrorMessage from '../components/getFirebaseSignUpErrorMessage';
import NavigationService from '../components/NavigationService';
import SpinnerComponent from '../components/SpinnerComponent';

export default class Register extends Component {

  state = {
    username:'',
    email:'',
    password:'',
    number:'',
    loading : false
  }

  handleSignUp = () => {
    this.setState({loading : true});
    console.log(this.state.email,this.state.password)
    Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      const { currentUser } = Firebase.auth();
      Firebase.database().ref(`userData/${currentUser.uid}`)
      .child('userinfo/')
      .push({
        UserId : currentUser.uid,
        UserName : this.state.username,
        EmailId : this.state.email,
        PhoneNumber: this.state.number,
        Password :this.state.password,
        Role: 'user',
        Avatar : '',
        CreatedAt : Date.now(),
        Level: 1,
      })
      .then(() => {
        NavigationService.navigate('screen');
        this.setState({loading:false})
      })
      .catch(error => {
        ToastMessageBottom(error)
        this.setState({loading:false})
      })
    })
    .catch(error => {
      console.log(error);
      this.setState({loading:false})
      let errMsg = getFirebaseSignUpErrorMessage(error.code)
      ToastMessageBottom(errMsg);
    })
  }

  renderButton() {
    if(this.state.loading) {
      return (<SpinnerComponent/>)
    }
    return (
      <View style={{flex:1}}>
      <AlreadyRegister style={styles.materialButtonViolet}>
      </AlreadyRegister>
        <MaterialButtonViolet1 
          style={styles.materialButtonViolet1}
          onPress={this.handleSignUp}
        >
        </MaterialButtonViolet1>
        </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containGradient}>
        <LinearGradient   start={{x: 0.0, y: 0}} end={{x: 0, y: 1.0}}
         locations={[0,0.3]}
         colors={[ '#1b2838','#2a475e']} style={styles.linearGradient}>
        </LinearGradient></View>
        <View style={styles.contain1}>
        <MaterialIconTextbox placeholderText={'Enter Username'} textInputIcon={'account-outline'}
          onChangeText={text => this.setState({username : text})}
          style={styles.materialIconTextbox1}
        ></MaterialIconTextbox>
        <MaterialIconTextbox placeholderText={'Enter Number'} textInputIcon={'phone'}
          style={styles.materialIconTextbox2}
          onChangeText={text => this.setState({number : text})}
          keyboardType={'phone-pad'}
        ></MaterialIconTextbox>
        <MaterialIconTextbox placeholderText={'Enter Password'} textInputIcon={'key'} textInputIconPass={'eye'} SecureTextEntry={true}
          style={styles.materialIconTextbox3}
          onChangeText={text => this.setState({password : text})}
        ></MaterialIconTextbox>
        <MaterialIconTextbox placeholderText={'Enter Email'} textInputIcon={'email-outline'}
          style={styles.materialIconTextbox4}
          onChangeText={text => this.setState({email : text})}
          keyboardType={'email-address'}
        ></MaterialIconTextbox >
        {this.renderButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containGradient:{
    position:"absolute",
    height:"45%",
    width:"100%",
    zIndex:-1,
  
  },
  contain1:{
    position: "absolute",
    paddingTop: '7%',
    //top: '23%',
    //width: '84%',
    //height: '54%',
    //elevation: 90,
    //backgroundColor: "#000",
    //borderColor:"#000",
    //borderWidth: 10,
    //borderRadius: 55,
    alignSelf: 'center',
    top:'10%',
    width: '84%',
    height: 483,
    backgroundColor: "#1b2838",
    //elevation: 60,
    elevation: 10,
    borderRadius: 45,
    shadowOffset: {
      height: 10,
      width: 0
    },
    shadowColor: "#456177",
    shadowOpacity: 0.39,
    shadowRadius: 5
  },
  container: {
    flex: 1, 
    backgroundColor: "#171A21",
  },
  materialIconTextbox1: {
    height: 42,
    marginTop: 30,
    marginLeft: 22,
    marginRight: 22
  },
  materialIconTextbox2 : {
    height: 42,
    marginTop: 160,
    marginLeft: 22,
    marginRight: 22
  },
  materialIconTextbox3: {
    height: 42,
    marginTop: -111,
    marginLeft: 22,
    marginRight: 22
  },
  materialIconTextbox4: {
    height: 42,
    marginTop: -108,
    marginLeft: 22,
    marginRight: 22
  },
  materialButtonViolet: {
    alignSelf:"center",
    
    backgroundColor: "#2a475e",
    height: 36,
    marginTop: 187,
  },
  materialButtonViolet1: {
    height: 36,
    backgroundColor: "#2a475e",
    alignSelf:"center",
    marginTop: 35,
    //marginLeft: 130,
    //marginRight: 130
  },
  linearGradient:{
    flex: 1,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60
  }
});