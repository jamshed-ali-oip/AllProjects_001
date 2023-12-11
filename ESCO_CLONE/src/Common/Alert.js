import React from "react";
import { Text,Alert } from "react-native";

const CustomeAlert=({navigation})=>{
    return(
        Alert.alert(
            "Sign In",
            "Please SignIn or Sigup before performing any action",
            [
              {
                text: "Login or signup",
                onPress: () => (navigation.navigate("SplitScreen")),
                style: "cancel"
              },
              { text: "Not Now", onPress: () => console.log("") }
            ]
          )
        )
}
export default CustomeAlert;