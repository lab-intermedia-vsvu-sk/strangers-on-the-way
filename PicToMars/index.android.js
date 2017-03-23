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
          aspect={Camera.constants.Aspect.fill}>
          <Text>{this.state.percentage}</Text>
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
            <Text>
              {this.state.message} hhh
            </Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
              this.setPercentage(""); // reset percentage
            }}>
              <Text style={styles.capture} onPress={this.sendingProcess()}>Continue</Text>
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
    this.camera.capture()
      .then((data) => { 
        console.log(data);
        // if not capturing
        if(!capturing){
          // here picture is already taken
          /// define random number for current image
          random = Math.random();
          // set state variable percentage
          this.setPercentage(Math.round(random * 100) + " %"); // <- start animation here
          //run decission process
          setTimeout(
            () => { this.decissionProcess(); },
            10000 // 10s of animation
          );
          // now is capturing
          capturing = true;
        }
        
        
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
    else if(random > 0.67 && random <= masterPiece ){
      return "WOW!"
    }
    else{
      this.sendingProcess();
      return "MASTER PIECE!";
    }

  }


  //// SENDING PROCESS
  sendingProcess() {
    if( random <= masterPiece ){
      //send to the MARS
    }else{
      //do noting
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
  },
  modal:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});





AppRegistry.registerComponent('PicToMars', () => PicToMars);
