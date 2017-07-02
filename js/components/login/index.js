import React, {Component} from "react";
import {Image} from "react-native";
import {connect} from "react-redux";
import {
  Container,
  Content,
  Item,
  Input,
  Icon,
  View
} from "native-base";
import {Button, Text} from 'react-native';
import {login} from "../../actions/user";
import styles from "./styles";

const background = require("../../../images/shadow.png");

class Login extends Component {
  static propTypes = {
    login: React.PropTypes.func.isRequired,
    firebaseMessage: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {}
    };
    this.renderInput = this.renderInput.bind(this);
  }

  login() {
    if (this.props.login) {
      this.props.login(this.state.email, this.state.password);
    }
  }

  renderInput({name, error = undefined}) {
    var hasError = false;
    if (error !== undefined) {
      hasError = true;
    }
    return (
      <Item error={hasError}>
        <Icon active name={name === "email" ? "person" : "unlock"}/>
        <Input
          testID={`${name}Input`}
          placeholder={name === "email" ? "EMAIL" : "PASSWORD"}
          onChangeText={(text) => {
            let error = this.state.error;
            if (name === 'email') {
              error.email = undefined;
              if (text.length < 8 && text !== "") {
                error.email = "too short";
              }
              if (!text.includes("@") && text !== "") {
                error.email = "@ not included";
              }

            }
            else {
              error.password = undefined;
              if (text.length > 12) {
                error.password = "max 11 characters";
              }
              if (text.length < 5 && text.length > 0) {
                error.password = "Weak";
              }
            }
            this.setState({[name]: text, error})
          }}
        />
        {hasError
          ? <Item style={{borderColor: "transparent"}}>
            <Icon active style={{color: "red", marginTop: 5}} name="bug"/>
            <Text style={{fontSize: 15, color: "red"}}>{error}</Text>
          </Item>
          : <Text />}
      </Item>
    );
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <View style={styles.bg}>
              {!!this.props.firebaseMessage && <Text testID={`firebaseMessage`} style={{
                padding: 5,
                backgroundColor: this.props.firebaseMessage.indexOf('Error') >= 0 ? 'red' : 'green',
                fontWeight: 'bold',
                color: "#FFF"
              }} children={this.props.firebaseMessage}/>}
              {this.renderInput({name: 'email', error: this.state.error.email})}
              {this.renderInput({name: 'password', error: this.state.error.password})}
              <Button
                style={styles.btn}
                onPress={() => this.login()}
                testID={'submit'}
                title={'Login'}
              />
            </View>
          </Content>
        </View>
      </Container>
    );
  }
}

export default connect(state => ({firebaseMessage: state.user.firebaseMessage}), dispatch => ({
  login: (email, password) => dispatch(login(email, password))
}))(Login);
