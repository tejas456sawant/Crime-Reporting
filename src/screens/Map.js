import React, {Component} from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  YellowBox,
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import CurrentLocation from '../components/CurrentLocation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NextButton from '../components/NextButton';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import Firebase from '../components/Firebase';
import LinearGradient from 'react-native-linear-gradient';
import CheckBoxCustom from '../components/CheckBoxCustom';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import axios from 'axios';
import ToastMessageTop from '../components/ToastMessageTop';
import ToastMessageBottom from '../components/ToastMessageBottom';
import SpinnerComponent from '../components/SpinnerComponent';

YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);

var getDownloadImgURL = '';
var crime = '';
var crimeDescription = '';
var crimeSuspect = '';
var reportStatus = false;
//for location purpose
var coor1,
  coor2 = null;
var crimeLocation = {
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  locationAddress: '',
  time: '',
  usernameid: '',
};
var coordinate = {
  lat: 0,
  lon: 0,
};
class CrimeDescription extends Component {
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
                  return;
                }
                crimeDescription = '';
                if (this.state.Crime_Description != '') {
                  crimeDescription = this.state.Crime_Description;
                } else {
                  Alert.alert(
                    'Provide Info !',
                    'Please Give Crime Description',
                  );
                  return;
                }
                crimeSuspect = '';
                crimeSuspect = this.state.Crime_Suspect;
                this.props.navigation.navigate('SelectLocation');
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

class MapForLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.05,
      longitudeDelta:
        (Dimensions.get('window').width / Dimensions.get('window').height) *
        0.0122,
    },
    locationChosen: false,
    locationAdd: 'Loading....',
    LATLNG: {
      latitude: -35,
      longitude: 120,
    },
  };

  goToUploadImage = () => {
    if (coor1 != null && coor2 != null) {
      this.props.navigation.navigate('SelectPhoto');
    } else {
      Alert.alert('Provide Info !', 'Please select crime location');
    }
  };

  reverseGeo(coordinate) {
    const key = 'e3a9901eef8560';
    let {lat, lon} = coordinate;

    Promise.all(
      axios
        .get(
          'http://us1.locationiq.com/v1/reverse.php?key=' +
            key +
            '&lat=' +
            lat +
            '&lon=' +
            lon +
            '&format=json',
        )
        .then(response => {
          this.setState({locationAdd: response.data.display_name});
        }),
    );
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    coor1 = coords.latitude;
    coor2 = coords.longitude;
    coordinate.lat = coords.latitude;
    coordinate.lon = coords.longitude;
    this.reverseGeo(coordinate);
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        locationChosen: true,
      };
    });
  };

  getLocationHandler = () => {
    Geolocation.getCurrentPosition(
      pos => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          },
        };
        this.pickLocationHandler(coordsEvent);
      },
      err => {
        alert('Fetching the Position failed, please pick one manually!');
      },
    );
  };

  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = (
        <MapView.Marker
          coordinate={this.state.focusedLocation}
          title={this.state.locationAdd}
        />
      );
      crimeLocation.locationAddress = this.state.locationAdd;
      crimeLocation.coordinates.latitude = this.state.LATLNG.latitude;
      crimeLocation.coordinates.longitude = this.state.LATLNG.longitude;
      crimeLocation.usernameid = Firebase.auth().currentUser.uid;
      crimeLocation.time = Date().toLocaleString();
      ToastMessageTop(this.state.locationAdd);
    }

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          region={
            !this.state.locationChosen ? this.state.focusedLocation : null
          }
          style={styles.map}
          customMapStyle={mapStyle}
          onPress={this.pickLocationHandler}
          ref={ref => (this.map = ref)}>
          {marker}
        </MapView>
        <View style={styles.button}>
          <CurrentLocation onPress={this.getLocationHandler} />
        </View>
        <View style={styles.nextButton}>
          <NextButton onPress={this.goToUploadImage} />
        </View>
      </View>
    );
  }
}

const Blob = RNFetchBlob.polyfill.Blob;
fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class PhotoForPothole extends Component {
  state = {
    //sample url you can set it empty but need to do some handling because image does not support empty url
    imageUri:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAZlBMVEUzMzP///8cHBwsLCxqamopKSnS0tLq6ur8/PwmJia0tLT19fUfHx+Li4s4ODgRERGbm5uFhYV6enrFxcViYmKqqqoZGRldXV1vb2/g4OBJSUk3NzdAQEBSUlLw8PDW1tYGBgbBwcE0vFRNAAAB2ElEQVR4nO3ZXW+CMBSA4ZZS145uDhzoVvfh//+TawWNW4DdQeJ5Hy9MiBf1zaFAUAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB3wvxj7fUtzx7Lea9+7SUuzXx86n+0Ye1FLqzbaPcwJyXbr73IhXWVfimsMdZYm7/+MNZX+smuvcplbVOTtGEY772KYz/wTmaT6MvdV3sc/YHUJr7Oe+nbaBSpTVSVkjj9eLnARGWvGYQ2KQ65SBqU7nI01HUYdhehTcKH0y5F2RTDwdBoXRd9FKFNfNicb86a4b/nJClKfyZJbaJiilK9DDfxvnbnU6mPIraJsvvD+5AkNC43SZ/zniK2SVTpRrY/kE4clzeXPCp1IbhJZt59jPGc5Pr4l6LIbRLTraxut+ki/OuR2NXWim2ifJmmo/2ub6ck2RVy58SXVd5FTs7115x+SkQ38a+/puNmTjqpTVKSqSZS5yTsb04YmlyeAd3EoMhtUo4Piegmh2qCOwWhTbw6PsfnUdHIbPK0DUWY9C2vSffg3h7nnLRuhL0etc3k/nrxNfGW436FZjOvXXuFK7ChmCXuFToAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDd+gE3BBvfW5jSuQAAAABJRU5ErkJggg==',
    firebaseImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStE88QZWx1eLEsnCSjvXBQHjxiXJ1nY0PlNkf7H6twi9ru_NBU3g',
    imgName: '',
    loading: false,
    videoUri:
      'http://anthillonline.com/wp-content/uploads/2013/07/videoPlaceholder.jpg',
  };

  loadSpinner() {
    if (this.state.loading) {
      return (
        <ActivityIndicator size="large" color="#0000ff" style={{top: '50%'}} />
      );
    }
  }

  getImage() {
    let options = {
      title: 'Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    this.setState({loading: true});
    ImagePicker.showImagePicker(options, response => {
      //console.warn('Response = ', response);

      if (response.didCancel) {
        //console.warn('User cancelled image picker');
      } else if (response.error) {
        //console.warn('ImagePicker Error: ', response.error);
      } else {
        let source = {
          uri: 'data:image/jpeg;base64,' + response.data,
          image: 'file.png',
        };

        this.setState({
          imageUri: response.uri,
          imgName: response.fileName,
        });
        this.uploadImage(this.state.imageUri);
      }
    });
  }

  uploadImage = (uri, mime = 'application/octet-stream') => {
    this.setState({loading: true});
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;
    const sessionId = new Date().getTime();
    const imageRef = Firebase.storage()
      .ref('/crimeImages/')
      .child(this.state.imgName);
    fs.readFile(uploadUri, 'base64')
      .then(data => {
        return Blob.build(data, {type: `${mime};Base64`});
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(blob, {contentType: mime});
      })
      .then(url => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        this.storeReference(url, sessionId);
      })
      .catch(err => {
        console.error(err);
        this.setState({loading: false});
      });
  };
  storeReference = url => {
    this.setState({firebaseImageUrl: url, loading: false});
    getDownloadImgURL = url;
    reportStatus = true;
    this.setState({loading: false});
    Alert.alert('Done', 'Done uploading photo');
    this.props.navigation.navigate('DoneUploading');
  };

  render() {
    return (
      <View style={styles.imgUploadContainer}>
        <View
          style={{
            borderRadius: 10,
            marginTop: 10,
            alignSelf: 'center',
            width: '95%',
            backgroundColor: '#2a475e',
            height: '45%',
          }}>
          <TouchableOpacity
            style={styles.welcome}
            onPress={this.getImage.bind(this)}>
            <LinearGradient
              start={{x: 0.25, y: 0}}
              end={{x: 1, y: 0.5}}
              locations={[0, 0.7]}
              colors={['#04C204', '#089608']}
              style={styles.gradient}>
              <Text style={{color: 'white'}}>Click to upload image</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Image
            source={{uri: this.state.imageUri}}
            style={{
              marginTop: 5,
              height: '60%',
              width: '95%',
              alignContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              top: '5%',
            }}
          />
        </View>
        {this.loadSpinner()}
        <View
          style={{
            borderRadius: 10,
            marginTop: 10,
            alignSelf: 'center',
            width: '95%',
            backgroundColor: '#2a475e',
            height: '45%',
          }}>
          <TouchableOpacity
            style={styles.welcome}
            onPress={this.getImage.bind(this)}>
            <LinearGradient
              start={{x: 0.25, y: 0}}
              end={{x: 1, y: 0.5}}
              locations={[0, 0.7]}
              colors={['#04C204', '#089608']}
              style={styles.gradient}>
              <Text style={{color: 'white'}}>Click to upload video</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Image
            source={{uri: this.state.videoUri}}
            style={{
              marginTop: 5,
              height: '60%',
              width: '95%',
              alignContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              top: '5%',
            }}
          />
          {this.loadSpinner()}
        </View>
      </View>
    );
  }
}

class Done extends Component {
  state = {
    loading: false,
  };

  loadSpinner() {
    if (this.state.loading) {
      return <SpinnerComponent />;
    }
  }

  uploadReport = () => {
    this.setState({loading: true});
    if (reportStatus == true) {
      const {currentUser} = Firebase.auth();
      Firebase.database()
        .ref(`userData/${currentUser.uid}`)
        .child('crimeReports/')
        .push({
          crimeLocation: crimeLocation,
          crimeType: crime,
          crimeDescription,
          crimeSuspect,
          crimeImage: getDownloadImgURL,
          reportedAt: Date().toLocaleString(),
        })
        .then(() => {
          Firebase.database()
            .ref(`crimeReports/`)
            .push({
              reportedBy: currentUser.uid,
              crimeLocation: crimeLocation,
              crimeType: crime,
              crimeDescription,
              crimeSuspect,
              crimeImage: getDownloadImgURL,
              reportedAt: Date().toLocaleString(),
            })
            .then(() => {
              ToastMessageBottom('Thanks for Reporting');
              this.setState({loading: false});
            })
            .catch(err => {
              ToastMessageBottom(err);
              this.setState({loading: false});
            });
        })
        .catch(err => {
          ToastMessageBottom(err);
          this.setState({loading: false});
        });
    } else {
      ToastMessageBottom('Unexpected error');
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Text
          style={{
            alignSelf: 'center',
            top: '40%',
            fontSize: 25,
            left: '5%',
            color: 'red',
          }}>
          * False report may contain account suspension.
        </Text>
        {this.loadSpinner()}
        <TouchableOpacity
          style={styles.doneuploading}
          onPress={this.uploadReport}>
          <Text style={{color: 'white'}}>Report</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default class Map extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <App1 />
      </View>
    );
  }
}

const AppTabNavigator = createMaterialTopTabNavigator(
  {
    CrimeReport: {
      screen: CrimeDescription,
      navigationOptions: {
        tabBarLabel: ({tintColor}) => (
          <Text style={{color: tintColor, fontSize: 12}}>Select Location</Text>
        ),
        tabBarIcon: ({tintColor}) => (
          <Icon name="format-list-checkbox" color={tintColor} size={22} />
        ),
      },
    },

    SelectLocation: {
      screen: MapForLocation,
      navigationOptions: {
        tabBarLabel: ({tintColor}) => (
          <Text style={{color: tintColor, fontSize: 12}}>Select Location</Text>
        ),
        tabBarIcon: ({tintColor}) => (
          <Icon name="pin" color={tintColor} size={22} />
        ),
      },
    },

    SelectPhoto: {
      screen: PhotoForPothole,
      navigationOptions: {
        tabBarLabel: ({tintColor}) => (
          <Text style={{color: tintColor, fontSize: 12}}>Upload Photo</Text>
        ),
        tabBarIcon: ({tintColor}) => (
          <Icon name="image-filter-center-focus" color={tintColor} size={22} />
        ),
      },
    },
    DoneUploading: {
      screen: Done,
      navigationOptions: {
        tabBarLabel: ({tintColor}) => (
          <Text style={{color: tintColor, fontSize: 12}}>Done</Text>
        ),
        tabBarIcon: ({tintColor}) => (
          <Icon name="check" color={tintColor} size={22} />
        ),
      },
    },
  },
  {
    initialRouteName: 'CrimeReport',
    // order: ['Settings', 'Home'],
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    headerLeft: null,
    tabBarOptions: {
      activeTintColor: '#ffffff',
      inactiveTintColor: '#ffffff77',
      style: {
        backgroundColor: '#0E80E9',
        borderTopWidth: 0.5,
        borderBottomColor: '#c7d5e0',
        padding: 0,
      },
      indicatorStyle: {
        height: 0,
      },
      showIcon: true,
      showLabel: false,
    },
  },
);

const App1 = createAppContainer(AppTabNavigator);

const styles = StyleSheet.create({
  imgUploadContainer: {
    flex: 1,
    top: 10,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    padding: 8,
    top: '80%',
    left: '10%',
  },
  nextButton: {
    position: 'absolute',
    padding: 8,
    top: '80%',
    right: '10%',
  },
  welcome: {
    marginTop: 10,
    marginLeft: 15,
    backgroundColor: '#3F51B5',
    alignItems: 'center',
    justifyContent: 'center',
    //alignSelf:'center',
    //padding:10,
    overflow: 'hidden',
    elevation: 2,
    width: 200,
    height: '15%',
    borderRadius: 10,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  doneuploading: {
    top: '70%',
    left: '35%',
    backgroundColor: '#3F51B5',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    elevation: 2,
    width: 100,
    borderRadius: 50,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crcontainer: {
    flex: 1,
    color: '#000',
  },
});

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8ec3b9',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1a3646',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#4b6878',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#64779e',
      },
    ],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#4b6878',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#334e87',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#283d6a',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6f9ba5',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3C7680',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#304a7d',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#98a5be',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2c6675',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#255763',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#b0d5ce',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#023e58',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#98a5be',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#283d6a',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3a4762',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#0e1626',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#4e6d70',
      },
    ],
  },
];
