import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const Loginbtn = (props) => {
  return (

    <TouchableOpacity onPress={props.link}>
        <Text>
            {props.title}
        </Text>
    </TouchableOpacity>
  )
}
const SignupBtn = (props) => {
    return (
  
      <TouchableOpacity onPress={()=>{props.link}}>
          <Text>
              {props.title}
          </Text>
      </TouchableOpacity>
    )
  }
  
export  {Loginbtn, SignupBtn}

const styles = StyleSheet.create({})