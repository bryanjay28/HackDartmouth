import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Expo, Audio, Permissions, ImagePicker } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.recording = null;
    this.state = {
      welcomeScreen: true,
      hasCameraPermission: false,
      hasMicrophonePermission: false,
      startRecording: false,
      notRecording: true,
    }
  }

  componentDidMount = async () => {
    const cameraResult = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollResult = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: cameraResult.status === 'granted' && cameraRollResult.status === 'granted' });

    const microphonePermissions = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({ hasMicrophonePermission: microphonePermissions.status === 'granted' });
  }

  componentDidUpdate = () => {
    const { startRecording, notRecording } = this.state;
    if (startRecording && notRecording) {
      this._recordSound();
    }
  }

  render() {
    const { welcomeScreen,
      hasCameraPermission,
      hasMicrophonePermission,
    } = this.state;
    if (!hasCameraPermission || !hasMicrophonePermission) {
      return (
        <Text>Please give camera or microphone access</Text>
      );
    }

    if (welcomeScreen) {
      return (
        <View style={styles.container}>
          <Text>Click to Enter the camera</Text>
          <Button
            title="Click to Enter the App"
            onPress={() => {
              this.setState({
                welcomeScreen: false,
              })
            }} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>CAMERA SHOULD BE HERE + THERE WILL BE SOUND</Text>
          <Button title="Record" />
        </View>
      );
    }
  }

  _recordSound = async () => {
    console.log('start recording');
    const { notRecording } = this.state;
    this.setState({ notRecording: !notRecording });

    const recording = new Audio.Recording();
    try {
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      // recording now
      this.recording = recording;
      console.log(recording);

    } catch (error) {
      console.log('Error with Recording');
      console.log(error);
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
