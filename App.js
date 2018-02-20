/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { PureComponent } from 'react';
import { Keyboard,AppRegistry, TextInput, View, Text, FlatList, ScrollView, Alert, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {parse } from './Parser'
import Button from './Button'
var Parser = require('expr-eval').Parser;
// var parserObj;
export default class App extends PureComponent {
  constructor(props) {
    super(props);
        // parserObj = new Parser();
    this.state = { text: '' ,
                   results: [],
                   };
  
  }
  
  onChangeText= (text)=>{
    this.setState({text})
  }

  onSubmitEditing= () => {
   // evali tex@ im grac@ 
    const results = [...this.state.results, { eval: Parser.evaluate(this.state.text), expression: this.state.text} ]
    this.setState({results, text: ''} )
  }
  
  componentDidUpdate(_, prevState) {
    if(prevState.results.length < this.state.results.length){
      setTimeout(() => {
        this.flatListRef.scrollToEnd();        //      :/ 
      }, 50); }
}


  _about= () => {
    Alert.alert(
      'About',
      'My name is Nelli',
      [
        {text: 'OK'},
      ],
      { cancelable: false }
    );
  }
  _help = () =>{
    Alert.alert(
      'Help',
      'This is under progress',
      [
        {text: 'OK'},
      ],
      { cancelable: false }
    );
  }

  _clear = () => {
    this.setState({results:[]})
  }

  _undo = () => {
    const { results } = this.state;
    if(results.length){
    this.setState({text: results.slice(-1)[0].expression, results: results.slice(0, results.length - 1) })
    this.textInputRef.focus()  
  }
    else 
    Alert.alert(
      'Error',
      'Nothing to remove',
      [
        {text: 'OK'},
      ],
      { cancelable: false }
    );
  }

  _remove = () => {
    const { results } = this.state;
    if(results.length)
    this.setState({results: results.slice(0, results.length - 1)})
    else 
    Alert.alert(
      'Error',
      'Nothing to remove',
      [
        {text: 'OK'},
      ],
      { cancelable: false }
    );

  }

  callback = (index) => {
    // console.warn(this.state.results[index])
    Alert.alert(
      'Computation',
      this.state.results[index].expression + '',
      
      [ 
        {text: 'OK'},
      ],
      { cancelable: false }
    );

  }

  render() {
    return (
      // <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}} accessible={false}>
      <View style={{alignItems: 'center'}} >
      
      <TextInput
        ref={(ref) => { this.textInputRef = ref; }}
        style={{height: 80, borderColor: '#ffb6c1', borderWidth: 3, width: 400, fontSize: 25, color: '#40e0d0' }}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitEditing}
        value={this.state.text}
        keyboardType={'numeric'}
        placeholder={'Write an expression here'}
      />
      <View style= {{flexDirection: 'row', marginTop: 10} }>
       <Button callback = {this._about} text="About" /> 
       <Button callback = {this._undo} text="Undo" /> 
       <Button callback = {this._remove} text="Remove" /> 
       <Button callback = {this._clear} text="Clear" /> 
       <Button callback = {this._help} text="Help" />
       </View>  
       <FlatList data={this.state.results}
                 onScroll= {Keyboard.dismiss}
                 ref={(ref) => { this.flatListRef = ref; }}
                 renderItem = {({ item, index }) =>  {
                  return ( 
                    <TouchableOpacity onPress = { () => this.callback(index)} >
                    <View style= {{ flexDirection: 'row', marginTop: 10}}> 
                    <Text style={{color: item.eval<0 ? 'red' : '#40e0d0', 
                                  fontSize:35, 
                                  borderLeftWidth: 2,
                                  borderBottomWidth: 2,
                                  borderTopWidth: 2 ,
                                  borderTopLeftRadius: 10,
                                  borderBottomLeftRadius: 10,
                                  borderColor: '#ffb6c1', 
                                  width: 80,
                                  height: 50
                                  }}>
                       r{index}
                      </Text>  
                      <Text style={{color: item.eval<0 ? 'red' : '#40e0d0', 
                                  fontSize:35, 
                                  borderLeftWidth: 2,
                                  borderRightWidth:2,
                                  borderBottomWidth: 2,
                                  borderTopWidth: 2 , 
                                  borderTopRightRadius: 10,
                                  borderBottomRightRadius: 10,
                                  borderColor: '#ffb6c1',
                                  width: 200,
                                  height: 50,
                                  textAlign: 'right'
                                  }}>
                             {item.eval}
                      </Text>  
                      </View>
                     </TouchableOpacity> 
                  )}} >

         </FlatList>
        
      </View> 
      // </TouchableWithoutFeedback>
    );
  }
 

}



  




