import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
        }
    }
getCameraPermissions =async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status === 'granted',
            buttonState: 'clicked',
            scanned: 'false',
        })
    }
    
handleBarCodeScanned =async({type, data})=>{
      this.setState({
        scanned: true, 
        scannedData: data,
        buttonState: 'normal',
      })
    }
render(){
    const hasCameraPermissions = this.state.hasCameraPermissions
    const scanned = this.state.scanned
    const buttonState = this.state.buttonState
    if(buttonState === 'clicked' && hasCameraPermissions){
        return(
          <BarCodeScanner 
          onBarCodeScanned = { scanned? undefined: this.handleBarCodeScanned}
           style ={StyleSheet.absoluteFillObject} />
        )}
    else if(buttonState === 'normal'){
    return(
        <View style={styles.container}>
            <Image
              style={styles.image}
              source={require('./assets/scanner.png')}
            /> 
            <Text style={styles.titleText}>Bar Code Scanner</Text>
            <Text style={styles.requestText}>
            {hasCameraPermissions === true? this.state.scannedData: 'Request Camera Permissions'}
            </Text>
                <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermissions}>
                    <Text style={styles.buttonText}>Scan QR Code</Text>
                    </TouchableOpacity>
            </View>
    );}
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1, 
        justifyContent: 'center', 
        alignItems:'center',
        backgroundColor: '#264e70'
    },
    buttonText:{
        fontSize: 20,
        alignSelf: 'center',
        color: '#264e70',
        fontWeight: 'bold'
    },
    titleText:{
        fontSize: 33,
        alignSelf: 'center',
        color: '#bbd4ce',
        fontWeight: 'bold'
    },
    requestText:{
        fontSize: 15,
        alignSelf: 'center',
        color: '#ffff',
        fontWeight: 'bold',
        textDecorationLine: 'underline',

    },
    scanButton:{
        backgroundColor: '#bbd4ce',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 10,
        height: 35, 
        width: 150,
        padding:8,
    },
    image:{
      height:100,
      width: 100
    }
})