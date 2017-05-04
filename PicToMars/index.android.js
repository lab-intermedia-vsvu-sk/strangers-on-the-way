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
  TouchableHighlight, 
  Linking
} from 'react-native';

import Camera from 'react-native-camera';
import FileSystem from 'react-native-filesystem';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
//import Hyperlink from 'react-native-hyperlink'


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
          type={this.state.camera}
          >
          
          <TouchableHighlight 
            style={styles.changeCamera} 
            onPress={this.changeCameraType.bind(this)}
          >
            <Image
              source={require('./assets/cam.png')}
              style={{width: 50, height: 51}}
            />

          </TouchableHighlight>

          <TouchableHighlight
            style={styles.capture} 
            onPress={this.takePicture.bind(this)}
          >
            <Image
              source={require('./assets/BUTTON2.png')}
              style={{width: 60, height: 60}}
            />
          </TouchableHighlight>
        
        </Camera>
        
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {console.log("Modal has been closed.")}}
          
          >
         <View style={styles.modal}>
          <View>
            
            <AnimatedCircularProgress
              ref='circularProgress'
              size={230}
              width={25}
              fill={Number(this.state.percentage)}
              tintColor="#ff0000"
              backgroundColor="#fff"
              style={{marginBottom: 70}}>
              
              
              {
                (fill) => (
                  <Text style={styles.points}>
                    { this.state.percentage } %
                  </Text>
                )
              }
            </AnimatedCircularProgress>

            <Image
              source={{uri: this.state.imagePath}}
              style={styles.imagePreview}
            />

            <Text style={styles.message}>
              {this.state.message}
            </Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
              this.setPercentage(""); // reset percentage
            }}>
              <Text style={styles.button}>Continue</Text>   
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
    percentage: "",
    imagePath: "",
    camera: 'back'
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

  setImagePath(path){
    this.setState({imagePath: path});
  }
  changeCamera(type){
    this.setState({camera: type});
  }


  changeCameraType(){
    if(this.state.camera == 'front'){
      this.changeCamera('back');
    }else{
      this.changeCamera('front');
    }
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
        this.setImagePath(data.path);
        // set state variable percentage
        this.setPercentage(Math.round(random * 100)); // <- start animation here
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
      //return this.sendingProcess();
      return "Piece of SHIT!";
    }
    else if(random > 0.01 && random <= 0.19){
      //return this.sendingProcess();
      return "Insufficient for MARS!";
    }
    else if(random > 0.19 && random <= 0.35){
      //return this.sendingProcess();
      return "POOR";
    }
    else if(random > 0.35 && random <= 0.51){
      //return this.sendingProcess(); // <- test
      return "Try AGAIN!";
    }
    else if(random > 0.51 && random <= 0.67){
      //return this.sendingProcess();
      return "COOL!";
    }
    else if(random > 0.67 && random <= masterPiece ){
      //return this.sendingProcess();
      return "WOW!"
    }
    else{
      return this.sendingProcess(); // <- only MASTER PIECE is sent to the MARS
      //return "MASTER PIECE!";
    }

  }


  //// SENDING PROCESS
  sendingProcess() {
    return <MasterPieceComponent />
  }

  getTrackingCode() {
    var timestamp = new Date().getTime();
    return timestamp; //Math.floor( Math.random() * 100000000 );
  }

}

class MasterPieceComponent extends Component {
  render() {
    return (
        <Text>
          MASTERPIECE!{'\n'}...sending to the MARS.{'\n'}Track Your PIC{'\n'}
          <Text
            style={{color: '#f00', textDecorationLine: 'underline'}}
            onPress={() => Linking.openURL('http://interaktivita.vsvu.sk/pictomars?' + this.getTrackingCode() ) }
          >HERE</Text>
        </Text>
    );
  }

  getTrackingCode() {
    var timestamp = new Date().getTime();
    return timestamp; //Math.floor( Math.random() * 100000000 );
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
    borderRadius: 5,
    padding: 10,
    margin: 40
  },
  button: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    textAlign: 'center',
    padding: 10,
    margin: 40
  },
  modal:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  }, 
  percentage: {
    textAlign: 'center',
    color: '#fff'
  }, 
  message: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20
  },
  points: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 60,
    left: 72,
    width: 90,
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: "100"
  },
  imagePreview: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 120,
    left: 90
  },
  changeCamera:{
    position: 'absolute',
    top: 25,
    right: 25
  }
});





AppRegistry.registerComponent('PicToMars', () => PicToMars);
