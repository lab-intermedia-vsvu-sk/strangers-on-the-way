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
  Image,
  Modal,
  TouchableHighlight
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
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {console.log("Modal has been closed.")}}
          >
         <View>
          <View>
            <Text style={{width: 100, height: 200}}>
              {this.state.message}
            </Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Continue</Text>
            </TouchableHighlight>
          </View>
         </View>
        </Modal>
      </View>
    
    );
  }

  state = {
    modalVisible: false,
    message: ""
  }


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setMessage(message){
    this.setState({message: message});
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
    var message = this.kindOfArt();
    this.setModalVisible(true);
    this.setMessage(message);
    console.log(message);
  }


  kindOfArt() {
    if(random <= 0.01 ){ // from 0 to 1%
      return "Piece of SHIT!";
    }
    else if(random > 0.01 && random <= 0.19){
      return "Unsufficiant for MARS!";
    }
    else if(random > 0.19 && random <= 0.35){
      return "POOR";
    }
    else if(random > 0.35 && random <= 0.51){
      return "Try AGAIN!";
    }
    else if(random > 0.51 && random <= 0.67){
      return "COOL!";
    }
    else if(random > 0.67 && random <= 0.99){
      return "WOW!"
    }
    else{
      return "MASTER PIECE!";
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
