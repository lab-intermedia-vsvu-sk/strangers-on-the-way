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
import FileSystem from 'react-native-filesystem';


var random = null;
var masterPiece = 0.99;
var capturing = false;



export default class PicToMars extends Component {
  
  render() {
    return (

      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.temp}
          >
          <Text style={styles.percentage}>{this.state.percentage}</Text>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)} >SHOOT!</Text>
        </Camera>
        
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {console.log("Modal has been closed.")}}
          
          >
         <View style={styles.modal}>
          <View>
            <Text style={styles.message}>
              {this.state.message}
            </Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
              this.setPercentage(""); // reset percentage
            }}>
              <Text style={styles.capture}>Continue</Text>   
            </TouchableHighlight>
          </View>
         </View>
        </Modal>
      </View>
    
    );
  }

  state = {
    modalVisible: false,
    message: "",
    percentage: ""
  }
  

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setMessage(message){
    this.setState({message: message});
  }


  setPercentage(percentage){
    this.setState({percentage: percentage});
  }


  takePicture() {
    if(!capturing){ // if camera not capturing right now
      // now is capturing
      capturing = true;
      // capture
      this.camera.capture()
      .then((data) => { 
        console.log(data);
        // if not capturing
        // here picture is already taken
        /// define random number for current image
        random = Math.random();
        // set state variable percentage
        this.setPercentage(Math.round(random * 100) + " %"); // <- start animation here
        //run decission process
        setTimeout(
          () => { 
            this.decissionProcess(); 
            // capturing is down
            capturing = false; 
            // TODO: DELETE IMAGE
            // checkIfFileExists(data.path);
            // deleteFile(data.path);
          },
          100 // 10s of animation
        );
      })
        
      .catch(err => console.error(err));

    }
  }

  ///////// decide if the picture is art
  decissionProcess() {
    var percentage = Math.floor(random * 100); //0.4565432467899753 -> 45
    var message = this.kindOfArt();
    this.setModalVisible(true);
    this.setMessage(message);
  }


  kindOfArt() {
    if(random <= 0.01 ){ // from 0 to 1%
      return "Piece of SHIT!";
    }
    else if(random > 0.01 && random <= 0.19){
      return "Insufficient for MARS!";
    }
    else if(random > 0.19 && random <= 0.35){
      return "POOR";
    }
    else if(random > 0.35 && random <= 0.51){
      //return this.sendingProcess(); // <- test
      return "Try AGAIN!";
    }
    else if(random > 0.51 && random <= 0.67){
      return "COOL!";
    }
    else if(random > 0.67 && random <= masterPiece ){
      return "WOW!"
    }
    else{
      this.sendingProcess(); // <- only MASTER PIECE is sent to the MARS
      //return "MASTER PIECE!";
    }

  }


  //// SENDING PROCESS
  sendingProcess() {
    if( random >= masterPiece ){
      //send to the MARS
      //this.setTimeout();
      return "MASTER PIECE! ...sending to the MARS. Your Tracking CODE is: " + this.getTrackingCode();
    }else{
      //do noting
      return "test: " + this.getTrackingCode(); // <-test
    }
  }

  getTrackingCode() {
    return Math.floor( Math.random() * 100000000 );
  }


  

}

async function deleteFile(path) {
  await FileSystem.delete(path);
  console.log('file is deleted');
}

async function checkIfFileExists(path) {
  const fileExists = await FileSystem.fileExists(path);
  const directoryExists = await FileSystem.directoryExists(path);
  console.log(`file exists: ${fileExists}`);
  console.log(`directory exists: ${directoryExists}`);
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
    backgroundColor: '#000',
    borderRadius: 5,
    color: '#fff',
    padding: 10,
    margin: 40
  },
  modal:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  percentage: {
    textAlign: 'center',
    color: '#fff'
  }, 
  message: {
    textAlign: 'center'
  }
});





AppRegistry.registerComponent('PicToMars', () => PicToMars);
