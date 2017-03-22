/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Imag
} from 'react-native';

import Camera from 'react-native-camera';


var random = null;

export default class PicToMars extends Component {
  
  render() {
    return (

      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    
    );
  }


  takePicture() {
    this.camera.capture()
      .then((data) => { 
        console.log(data);
        // here picture is already taken
        /// define random number
        random = Math.random();
        //run decission process
        this.decissionProcess();
      })
        
      .catch(err => console.error(err));
  }

  ///////// decide if the picture is art
  decissionProcess() {
    var percentage = Math.floor(random * 100); //0.4565432467899753 -> 45
    /*var message = kindOfArt();
    console.log(message);*/
    console.log("RANDOM");
    console.log(random);
  }


  kindOfArt() {
    if(random <= 0.01 ){ // from 0 to 1%
      return "Piece of SHIT";
    }
    else if(random > 0.01 && random <= 0.19){

    }



    else if(random > 0.1 && random <= 0.4)
    {
      return "QUITE";
    }
    else if(random > 0.4 && random <= 0.9){
      return "ALMOST SHIT";
    }
    else{
      return "SHIT";
    }
  }




}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});





AppRegistry.registerComponent('PicToMars', () => PicToMars);
