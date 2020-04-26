import React, { Component } from "react"
import { View, Text, StyleSheet} from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler"
import {white, green, red, orange} from './src/utils/colors'

class App extends Component {

  state = {
    started: false,
    counter:1,
    sec:0,
    min:0,
    hours: 0,
    timer:null
  }
  start = ()=>{
    if(!this.state.started)
    {
      let timer = setInterval(this.tick, 1000);
      this.setState({timer,started:true});
    }
    else
    {
      clearInterval(this.state.timer)
      this.setState({started:false})
    }
  }
  tick = ()=>{

    let  {sec,min,hours,counter} = this.state
    
    sec=counter
    hours = parseInt(sec/3600)
    sec = sec%3600
    min = parseInt(sec/60)
    sec = sec%60

    if(hours===24)
    {
      clearInterval(this.state.timer)
      alert("Competed 24 Hours! Auto Reset")
      this.setState({started:false,sec:0,min:0,hours:0,counter:1})
    }
    else
    {
      this.setState({sec,min,hours,counter:counter+1})
    }
  

  }
  reset = ()=>{
    clearInterval(this.state.timer)
    this.setState({started:false,sec:0,min:0,hours:0,counter:1})
  }

  render() {
    
    let {sec,min,hours,started} = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
        {hours<10 ? "0"+hours : hours}:
        {min<10 ? "0"+min : min}:
        {sec<10 ? "0"+sec : sec}
        </Text>
        <View>
          <TouchableOpacity onPress={this.start} style={[styles.btnRound,started?{borderColor:red}:{borderColor:green}]}>
            {started ? <Text style={styles.stop}>Stop</Text> : <Text style={styles.start}>Start</Text>}
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={this.reset} style={[styles.btnRound,styles.btnColor2]}>
            <Text style={styles.reset}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  text:{
    fontSize: 90,
    color: white
  },
  btnRound:{
    borderRadius: 100,
    borderWidth: 10,
    padding: 50,
    margin: 20
  },
  btnColor1:{
    marginTop: 40
  },
  btnColor2:{
    borderColor: orange,
  },
  start:{
    color: green,
    fontSize:20
  },
  stop:{
    color: red,
    fontSize:20
  },
  reset:{
    color: orange,
    fontSize:20
  }
})

export default App;