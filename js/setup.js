import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Linking} from 'react-native';
import {StyleProvider} from 'native-base';
import App from './App';
import configureStore from './configureStore';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import DeepLinking from 'react-native-deep-linking';
import firebase from './utils/Firebase';

function setup(): React.Component {
  class Root extends Component {

    constructor() {
      super();
      this.state = {
        isLoRading: false,
        store: configureStore(() => this.setState({isLoading: false})),
      };
    }

    componentWillMount() {
      DeepLinking.addScheme('detox://');
      DeepLinking.addRoute('/deleteUser/:email/:password', (response) => {
        firebase.auth().signInWithEmailAndPassword(response.email, response.password).then(user => {
            if (user) {
              user.delete().then();
            }
          });

      });
      Linking.getInitialURL().then((url) => {
        if (url) {
          DeepLinking.evaluateUrl(url);
        }
      });


    }

    render() {
      return (
        <StyleProvider style={getTheme(platform)}>
          <Provider store={this.state.store}>
            <App />
          </Provider>
        </StyleProvider>
      );
    }
  }

  return Root;
}

export default setup;
