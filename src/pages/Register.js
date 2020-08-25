import React, { Component } from 'react';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native'; 

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            displayname: '',
            email: '',
            password: '',
            errors: {}
        };
        this.validateForm = this.validateForm.bind(this);
    }
     

    handleName = (text) => {
        this.setState({ name: text})
      }

      handleDisplayName = (text) => {
        this.setState({ displayname: text})
      }

    handleEmail = (text) => {
        this.setState({ email: text})
      }
      handlePassword = (text) => {
        this.setState({ password: text})
      }


      validateForm () {
        const { errors } = this.state;
        const name = this.state.name;
        const displayname = this.state.displayname;
        const emailaddr = this.state.email;
        const pass = this.state.password;
        const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
        
        if (name === ''){
            errors.name = "Name cannot be empty.";
        } else {
            errors.name = '';
        }

        if (displayname === ''){
            errors.displayname = " Display name cannot be empty.";
        } else {
            errors.displayname = '';
        }

        if (emailaddr === ''){
          errors.email = "Email address cannot be empty.";
        } else if (emailaddr.length > 0 && !reg.test(emailaddr)){
          errors.email = "Please provide correct email address";
        } else {
          errors.email = '';
        }
    
        if (pass === ''){
          errors.pass = "Password cannot be empty.";
        } else if (pass && pass.length < 5) {
          errors.pass = "Password should be more than 5 characters.";
    
        } else {
          errors.pass = '';
    
        } 
        this.setState({ errors})
        if (errors.name==='' && errors.displayname==='' && errors.email=== '' && errors.pass === ''){
          this.submitForm();
        }
      }

submitForm = async () => {
    let that = this;
    axios.post('http://192.168.43.73:8082/registeruser',{
        name: this.state.name,
        displayname: this.state.displayname,
        email: this.state.email,
        password: this.state.password
    })
    .then(function (response) {
        if(response && response.data && response.data._id) {
            that.props.navigation.navigate('Home');
        } else {
            Toast.show(respone.data.message, 1000); 
        }
    })
    .catch(function (error){
        console.log(error);
    });

}

goToLogin = () => {
    this.props.navigation.navigate('Login');
}

render() {
    const { errors } = this.state;
    return (
        <View style={styles.container}>
        <Image source = {require('../images/chatlogo5.gif')} style = {styles.logo} />
        <Text style = {styles.text}>REGISTER</Text>
        <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Name" 
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              onChangeText={this.handleName}/>
           <Text style={[styles.errorstyle]}>{errors.name}</Text>      
          </View>

          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Display Name" 
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              onChangeText={this.handleDisplayName}/>
           <Text style={[styles.errorstyle]}>{errors.displayname}</Text>      
          </View>
         
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Email" 
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              onChangeText={this.handleEmail}/>
           <Text style={[styles.errorstyle]}>{errors.email}</Text>      
          </View>
        
         <View style={styles.inputView} >
            <TextInput  
              secureTextEntry
              style={styles.inputText}
              placeholder="Password" 
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              onChangeText={this.handlePassword}/>
            <Text style={[styles.errorstyle]}>{errors.pass}</Text>  
          </View>
          <TouchableOpacity style={styles.register}
          onPress={this.validateForm}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.login}
          onPress = {this.goToLogin}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          </View>
    );
  }
}


export default Register;

const styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#33ccff'
    },
    logo: {
      borderRadius: 50,
      width:70, 
      height: 70, 
    },
    text: {
      color: '#ffffff',
      marginBottom: 20,
      fontSize: 50,
      fontWeight: 'bold',
      textAlign: 'center',
      textShadowOffset: {
          height: 5,
          width: 5
      },
      textShadowRadius: 5,
      textShadowColor: '#1a0000'

  },
    inputView:{
      width:'80%',
      margin: 10,
      borderColor: "#000000",
      borderWidth: 1.5,
      borderRadius: 8,
      height:40,
      marginBottom:15,
      justifyContent:"center",
      padding:10,
      paddingTop: 10,
      paddingBottom: -15,
      lineHeight: 20,
    },
    inputText:{
      height:50,
      color:"white"
    },
    
    register:{
      backgroundColor: '#ffffff',
        padding: 13,
        margin: 10,
        height: 40,
        borderRadius: 5,
        width: 100,
        left: -80,
    },
    login:{
      backgroundColor: '#ffffff',
        padding: 13,
        margin: 10,
        height: 40,
        borderRadius: 5,
        width: 80,
        left: 50,
        marginTop: -47,
    },
    errorstyle:{                          
      fontSize: 10,
     alignSelf: 'center',
     color: 'red'
   },
  
    loginText:{
      color: '#000000',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      bottom: 6,
    },
    registerText: {
      color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        bottom: 6,
    }
   

  
  });