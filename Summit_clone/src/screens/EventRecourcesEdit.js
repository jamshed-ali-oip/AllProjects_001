import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";




const { height, width } = Dimensions.get("window");


const EventRecourcesEdit = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "transparent",
          width: width * 1,
          position: "absolute",
          paddingRight: width * 0.033,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 3,
          top: 50,
          // marginTop: 50,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flexDirection: "row", alignItems: "center", backgroundColor: "transparent" }}
        >
          <Entypo
            name="chevron-small-left"
            size={width * 0.07}
            color="rgb(157, 5, 17)"
            style={{
              backgroundColor: "transparent",
              width: 30,
              paddingLeft: 3,
            }}
          />
          <Text
            style={[
              {
                backgroundColor: "transparent",
                fontSize: width * 0.05,
                fontFamily: "SFProDisplaySemibold",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "rgb(157, 5, 17)",
                left: width * -0.015,
                top: 0.5,
              },
            ]}
          >
            RESOURCES
          </Text>
        </TouchableOpacity>
        <View>
            <Text>Save</Text>
        </View>
      </View>
    </View>
  );
};



export default EventRecourcesEdit;
