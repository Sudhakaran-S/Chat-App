import React, { Component } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
//import { userRegister } from './actions/userAction';
//import { connect } from 'react-redux';

class Register extends Component {
        constructor(props) {
            super(props);
            this.state = {
                name: '',
                displayname:'',
                email:'',
                password: '',
                errors: {},
            };
            this.validateForm = this.validateForm.bind(this);
            this.goToLogin=this.validateForm.bind(this);
        }
        handleName = (text) => {
        this.setState({ name: text })
    }
    handleDisplayName = (text) => {
        this.setState({ displayname: text })
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    validateForm = () => {
        const { errors } = this.state;
        const name = this.state.name;
        const dname = this.state.displayname;
        const emailaddr = this.state.email;
        const pass = this.state.password;
        const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,3})+$)$/;
        if (name === '') {
            errors.name = "name cannot be empty.";
        }
        else {
            errors.name = '';
        }

        if (dname === '') {
            errors.dname = "display name cannot be empty.";
        }
        else {
            errors.dname = '';
        }
        if (emailaddr === '') {
            errors.emailaddr = "Email address cannot be empty.";
        }
        else if (emailaddr.length > 0 && !reg.test(emailaddr)) {
            errors.emailaddr = "Please provide correct email address";
        }
        else {
            errors.emailaddr = '';
        }

        if (pass === '') {
            errors.pass = "Password cannot be empty.";
        }
        else if (pass && pass.length < 5) {
            errors.pass = "Password should be more than 5 charactres.";
        }
        else {
            errors.pass = '';
        }
        this.setState({ errors })
        if(errors.name==='' && errors.displayname==='' && errors.emailaddr==='' && errors.pass==='') {
            this.submitForm();
        }
    }
    submitForm = async () => {
        let that=this;
        axios.post('http://192.168.43.73:8082/registeruser', {  
                   name: this.state.name,
                   displayname:this.state.displayname,
                   email: this.state.email,
                   password:this.state.password
        }).then(function(response) {
            if(response && response.data) {
              that.props.navigation.navigate('Home');
            }
                 else{
             console.log(response.response.data);
           }
        })
            .catch(function (error) {
                console.log("Errors",error);
                console.log(error.response);
            });
    }
goToLogin(){
        this.props.navigation.navigate('Login');
    }
    
    render() {
        const { errors } = this.state;
        return (
            <View style = {styles.container}>
                <Text style = {styles.register}>REGISTRATION</Text>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "name"
                    placeholderTextColor = "#000"
                    autoCapitalize = "none"
                    onChangeText = {this.handleName} />
                <Text style={styles.errorstyle}>{errors.name}</Text>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "display name"
                    placeholderTextColor = "#000"
                    autoCapitalize = "none"
                    onChangeText = {this.handleDisplayName} />
                <Text style={styles.errorstyle}>{errors.dname}</Text>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Email"
                    placeholderTextColor = "#000"
                    autoCapitalize = "none"
                    onChangeText = {this.handleEmail} />
                <Text style={styles.errorstyle}>{errors.emailaddr}</Text>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Password"
                    placeholderTextColor = "#000"
                    autoCapitalize = "none"
                    onChangeText = {this.handlePassword} />
                <Text style={styles.errorstyle}>{errors.pass}</Text>
                 <TouchableOpacity
                        style = {styles.submitButton}
                        onPress = {this.validateForm}>
                        <Text style = {styles.submitButtonText}> Register </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {styles.loginButton}
                        onPress = {this.goToLogin}>
                        <Text style = {styles.submitButtonText}> Login </Text>
                    </TouchableOpacity>
                    
                
            </View>
        );
    }
}


export default Register;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6ffff',
        flex: 2,
        
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        width: '70%',
        padding: 10,
        fontSize: 16,
        lineHeight: 20,
        color: '#000',
        borderRadius: 7,
    },
    submitButton: {
        backgroundColor: '#00cccc',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 7,
        marginTop: 20,
        marginLeft: -120
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    loginButton: {
        backgroundColor: '#00cccc',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 7,
        marginTop: -55,
        marginLeft: 90
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
})