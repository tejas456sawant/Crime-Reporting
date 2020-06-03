import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import {CheckBox, ListItem} from 'react-native-elements';
import CheckBoxCustom from '../components/CheckBoxCustom';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import NextButton from './NextButton';

var crime = '';
var crimeDescription = '';
var crimeSuspect = '';

export default class CrimeDescription extends Component {
  state = {
    Personal_Crime: false,
    Property_Crime: false,
    Victimless_Crime: false,
    Organised_Crime: false,
    White_Collar_Crime: false,
    Hate_Crime: false,
    Crime_Description: '',
    Crime_Suspect: '',
  };
  render() {
    return (
      <View style={styles.crcontainer}>
        <ScrollView>
          <CheckBoxCustom
            title={'Personal Crime'}
            examples={'Assault, Battery, Homicide, etc'}
            onPress={() =>
              this.setState({Personal_Crime: !this.state.Personal_Crime})
            }
            checked={this.state.Personal_Crime}
          />
          <CheckBoxCustom
            title={'Property Crime'}
            examples={'Theft, Arson, Forgery, etc'}
            onPress={() =>
              this.setState({Property_Crime: !this.state.Property_Crime})
            }
            checked={this.state.Property_Crime}
          />
          <CheckBoxCustom
            title={'Victimless Crime'}
            examples={'Gambling, drug use, etc'}
            onPress={() =>
              this.setState({Victimless_Crime: !this.state.Victimless_Crime})
            }
            checked={this.state.Victimless_Crime}
          />
          <CheckBoxCustom
            title={'Organised Crime'}
            examples={'Terrorism, etc'}
            onPress={() =>
              this.setState({Organised_Crime: !this.state.Organised_Crime})
            }
            checked={this.state.Organised_Crime}
          />
          <CheckBoxCustom
            title={'White-Collar Crime'}
            examples={'Insider trading, Tax evasion, etc'}
            onPress={() =>
              this.setState({
                White_Collar_Crime: !this.state.White_Collar_Crime,
              })
            }
            checked={this.state.White_Collar_Crime}
          />
          <CheckBoxCustom
            title={'Hate Crime'}
            examples={
              'Crimes motivated by bias against race, caste, religion, national origin, etc'
            }
            onPress={() => this.setState({Hate_Crime: !this.state.Hate_Crime})}
            checked={this.state.Hate_Crime}
          />

          <TextInput
            style={{
              width: '90%',
              backgroundColor: '#8899dd33',
              paddingRight: 15,
              paddingLeft: 15,
              marginTop: '10%',
              alignSelf: 'center',
              alignContent: 'center',
              borderColor: '#ffffff33',
              borderWidth: 1,
              borderRadius: 20,
              color: '#ffffff99',
              textAlignVertical: 'top',
            }}
            multiline={true}
            placeholder="Details"
            placeholderTextColor="#999a"
            numberOfLines={3}
            onChangeText={text => this.setState({Crime_Description: text})}
          />
          <View>
            <TextInput
              style={{
                left: '20%',
                marginTop: '8%',
                width: '60%',
                backgroundColor: '#8899dd33',
                paddingRight: 15,
                paddingLeft: 15,
                textAlignVertical: 'top',
                borderColor: '#ffffff33',
                borderWidth: 1,
                borderRadius: 20,
                color: '#ffffff99',
                left: '5%',
              }}
              multiline={true}
              placeholder="Suspect (if any)"
              placeholderTextColor="#999a"
              onChangeText={text => this.setState({Crime_Suspect: text})}
            />

            <NextButton
              style={{
                bottom: '30%',
                width: '10%',
                marginBottom: 20,
                left: '80%',
              }}
              onPress={() => {
                crime = '';
                if (this.state.Personal_Crime) {
                  crime += 'Personal_Crime ';
                }
                if (this.state.Property_Crime) {
                  crime += 'Property_Crime ';
                }
                if (this.state.Victimless_Crime) {
                  crime += 'Victimless_Crime ';
                }
                if (this.state.Organised_Crime) {
                  crime += 'Organised_Crime ';
                }
                if (this.state.White_Collar_Crime) {
                  crime += 'White_Collar_Crime ';
                }
                if (this.state.Hate_Crime) {
                  crime += 'Hate_Crime ';
                }
                if (crime === '') {
                  Alert.alert('Select something !', 'Select Atleast One Crime');
                }
                crimeDescription = '';
                if (this.state.Crime_Description != '') {
                  crimeDescription = this.state.Crime_Description;
                } else {
                  Alert.alert(
                    'Provide Info !',
                    'Please Give Crime Description',
                  );
                }
                crimeSuspect = '';
                crimeSuspect = this.state.Crime_Suspect;
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  crcontainer: {
    flex: 1,
    color: '#000',
  },
});
