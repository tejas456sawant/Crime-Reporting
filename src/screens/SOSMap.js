import React, { Component } from "react";
import {
    View,
    Image,
    Button,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
  } from 'react-native';
import MapView, {Circle,Marker}from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import SOSButton from '../components/SOSButton';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from 'axios';
import ToastMessageBottom from "../components/ToastMessageBottom";
import ToastMessageTop from "../components/ToastMessageTop";
import Firebase from "../components/Firebase";

var coor1,coor2 = null;
var coordinate = {
  lat : 0,
  lon : 0
}
var locationForHelp = {
  coordinates : {
    latitude : 0 ,
    longitude : 0
  },
  locationAddress : '',
  time : '',
  usernameid : ''
};


export default class SOSMap extends Component {
    
  UNSAFE_componentWillMount() {
    this.getLocationHandler()
  }
    state =  {
      focusedLocation: {
        latitude: 37.7900352,
        longitude: -122.4013726,
        latitudeDelta: 0.05,
        longitudeDelta:
          Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.0122
      },
      locationChosen: false,
      LATLNG : {
        latitude: -35, 
        longitude: 120
      },
      locationAdd : 'Loading....'
  }

  reverseGeo(coordinate){
    const key = "e3a9901eef8560"
    let {lat, lon} = coordinate
    
    Promise.all(
      axios.get('http://us1.locationiq.com/v1/reverse.php?key=' + key + '&lat=' + lat + '&lon=' + lon + '&format=json')
      .then(response => {
        this.setState({locationAdd : response.data.display_name})
      })
    ) 
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    coor1 = coords.latitude;
    coor2 = coords.longitude;
    this.setState({LATLNG : coords});
    coordinate.lat = coords.latitude;
    coordinate.lon = coords.longitude;
    this.reverseGeo(coordinate);
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });
  };

  getHelp = () => {
    this.getLocationHandler();
    Firebase.database().ref('SOS/')
      .push({
        helpInfo : locationForHelp
      })
      .then(() => {
        ToastMessageBottom('You will get help ASAP');
      })
      .catch(error => {
        ToastMessageBottom(error)
      })
  }

  getLocationHandler = () => {
    Geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
      this.pickLocationHandler(coordsEvent);
    },
  err => {
    alert("Fetching the Position failed, please pick one manually!");
  })
  }

  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = <Marker coordinate={this.state.focusedLocation} showInfoWindow={true} title={this.state.locationAdd}>
        </Marker>;
      locationForHelp.locationAddress = this.state.locationAdd;
      locationForHelp.coordinates.latitude = this.state.LATLNG.latitude;
      locationForHelp.coordinates.longitude = this.state.LATLNG.longitude;
      locationForHelp.usernameid = Firebase.auth().currentUser.uid;
      locationForHelp.time = Date().toLocaleString();
      ToastMessageTop(this.state.locationAdd);
    }

    return (
        <View style={styles.container1}>           
          <MapView
            initialRegion={this.state.focusedLocation}
            region={!this.state.locationChosen ? this.state.focusedLocation : null}
            style={styles.map}
            customMapStyle={mapStyle}
            onPress={this.pickLocationHandler}
            ref={ref => this.map = ref}
          >
            {marker}
            <MapView.Circle
                key = { (coor1 + coor2).toString() }
                center = { this.state.LATLNG }
                radius = { 1000 }
                strokeWidth = { 3 }
                strokeColor = { '#009BFF66' }
                fillColor = { 'rgba(100,238,255,0.3)' }
        />
          </MapView>
          <View style={styles.button}>
            <SOSButton onPress={this.getHelp}></SOSButton>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    
    container1:{
        flex:1,
        height:"100%",
        width: "100%",
        alignItems: "center",
    },
    map: {
        width: "100%",
        height: "100%",
        //zIndex:-1,
       // margin:10
    },
    button: {
        position:"absolute",
        //padding:8,
        //zIndex:100,
        width:"80%",
        bottom :"6%",
        alignSelf:"center",
      }

})

const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ]