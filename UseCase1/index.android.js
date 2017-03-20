/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  TouchableHighlight,
  View,
  Modal,
  Image
} from 'react-native';
import Camera from 'react-native-camera';

export default class UseCase1 extends Component {
  
  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  capturedImage = null;


  render() {
    return (
      <View style={styles.container}>
       {/*CAMERA*/}
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          >
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
       
        {/*MODAL*/}
         <Modal 
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View>
          <View>
            
            <Image
              source={{uri: this.capturedImage}}
              style={{}}
            />

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>AGREE</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>DISAGREE</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>  
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => { this.capturedImage = data.path; 
                        console.log(data);
                        this.setModalVisible(true);
                      })
      .catch(err => console.error(err));
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
  button: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

AppRegistry.registerComponent('UseCase1', () => UseCase1);
