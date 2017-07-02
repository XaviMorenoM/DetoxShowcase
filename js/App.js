import React, {Component} from "react";
import {StyleSheet} from "react-native";
import CodePush from "react-native-code-push";

import {Container, Content, Text, View} from "native-base";
import Modal from "react-native-modalbox";
import MainStackRouter from "./Routers/MainStackRouter";
import ProgressBar from "./components/loaders/ProgressBar";

import theme from "./themes/base-theme";
const PushNotification = require('react-native-push-notification');
let onNotification = false;
PushNotification.configure({

  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    if (onNotification) {
      onNotification(notification.message.title);
    }
  },

  // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push
  // notifications) senderID: "YOUR GCM SENDER ID",

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: false,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null
  },
  modal: {
    justifyContent: "center",
    alignItems: "center"
  },
  modal1: {
    height: 300
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDownloadingModal: false,
      showInstalling: false,
      downloadProgress: 0
    };
    onNotification = this.onNotification.bind(this);
  }

  onNotification(message) {
    this.setState({message});
    setTimeout(() => this.setState({message: null}), 3000);
  }

  componentDidMount() {
    CodePush.sync(
      {updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE},
      status => {
        switch (status) {
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({showDownloadingModal: true});
            this._modal.open();
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({showInstalling: true});
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            this._modal.close();
            this.setState({showDownloadingModal: false});
            break;
          default:
            break;
        }
      },
      ({receivedBytes, totalBytes}) => {
        this.setState({downloadProgress: receivedBytes / totalBytes * 100});
      }
    );
  }

  render() {
    if (this.state.showDownloadingModal) {
      return (
        <Container
          theme={theme}
          style={{backgroundColor: theme.defaultBackgroundColor}}
        >
          <Content style={styles.container}>
            <Modal
              style={[styles.modal, styles.modal1]}
              backdrop={false}
              ref={c => {
                this._modal = c;
              }}
              swipeToClose={false}
            >
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  justifyContent: "center",
                  padding: 20
                }}
              >
                {this.state.showInstalling
                  ? <Text
                    style={{
                      color: theme.brandPrimary,
                      textAlign: "center",
                      marginBottom: 15,
                      fontSize: 15
                    }}
                  >
                    Installing update...
                  </Text>
                  : <View
                    style={{
                      flex: 1,
                      alignSelf: "stretch",
                      justifyContent: "center",
                      padding: 20
                    }}
                  >
                    <Text
                      style={{
                        color: theme.brandPrimary,
                        textAlign: "center",
                        marginBottom: 15,
                        fontSize: 15
                      }}
                    >
                      Downloading update...
                      {" "}
                      {`${parseInt(this.state.downloadProgress, 10)} %`}
                    </Text>
                    <ProgressBar
                      color="theme.brandPrimary"
                      progress={parseInt(this.state.downloadProgress, 10)}
                    />
                  </View>}
              </View>
            </Modal>
          </Content>
        </Container>
      );
    }

    return <View style={{
      flex: 1
    }}>
      <MainStackRouter />
      {this.state && this.state.message && <Text
        style={{
          position: 'absolute',
          top: 18,
          left: 0,
          right: 0,
          padding: 10,
          backgroundColor: '#222',
          color: '#fff'
        }}
      >{this.state.message}</Text>}
    </View>;
  }
}

export default App;
