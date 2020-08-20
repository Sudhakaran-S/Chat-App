import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput,ImageBackground ,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import { chatInsert, chatList} from '../actions/chatAction';


class Chat extends Component{
	constructor(props){
	    super(props);
        this.state = {
            userid: this.props.navigation.state.params.userid,
            messages: []
        };
        this.onSend=this.onSend.bind(this);
    }

    componentDidMount(){
      const data = { 
        receiver_id : this.state.userid,
        sender_id : this.props.userReducer.userAuth._id
    }
    let that = this;
     setInterval(async () => {
      this.props.onGetMessage(data)
    },10000);
  }

  componentDidUpdate(nextProps) {
    if(this.props.chatReducer && this.props.chatReducer.chatList && this.props.chatReducer.chatList !==nextProps.chatReducer.chatList && this.props.chatReducer.chatListSuccess===true) {
        this.setState({
          messages : this.props.chatReducer.chatList
        })
      }
  }
    onSend(messages =[]) {
    	this.setState(previousState =>({
    		messages: GiftedChat.append(previousState.messages, messages),
    }))
   }
   submitChatMessage(messages= []) {
   	const date = new Date();
   	this.onSend(messages)
   	let details = {
      user: {
                _id: this.props.userReducer.userAuth._id
      },
   		receiver_id:this.state.userid,
   		sender_id:this.props.userReducer.userAuth._id,
   		chatdate:date,
   		text: messages && messages[0] && messages[0].text
   	}
   	this.props.onChatMessage(details);
   }
   
   renderBubble = (props) => {
   	return (<Bubble{...props}
   		textStyle={{
   			right:{
   				color:'#000000',
   			},
   			left:{
   				color:'#000000',
   			},
   		}}
   		timeTextStyle={{
   			right:{
   				color:'#000000',
   			},
   			left:{
   				color:'#000000'
   			},
   		}}
   		wrapperStyle={{
   			left:{
   				backgroundColor: '#F0F0F0',

   			},
   			right:{
   				backgroundColor:'#ADD8E6'
   			}
   		}}/>
   );
}

    render(){
        return (
              <View style={{flex: 1,marginTop: 90}}>
              <GiftedChat
              messages={this.state.messages}
              onSend={messages => this.submitChatMessage(messages)}
              renderBubble={this.renderBubble}
              users = {{
                _id: this.props.userReducer.userAuth._id,
              }}
             />
              </View>
            )
    }
}

function mapStateToProps(state) {
    return{
        chatReducer: state.chatReducer,
        userReducer: state.userReducer
    };
}

function mapDispatchToProps(dispatch) {
    return{
        onChatMessage: (chatMessage) => dispatch(chatInsert(chatMessage)),
        onGetMessage: (data) => dispatch(chatList(data)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 10
    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 50,
        color: '#ffffff',
    },
});
