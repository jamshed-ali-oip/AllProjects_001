import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import colors from "../../constants/colors";

const SubmitButton = ({ title = "SUBMIT", onPress, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={disabled ? styles.disabled : styles.container}>
        <Text
          style={[
            styles.text,
            { color: disabled ? colors.darkGray : colors.black },
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: "5%",
    backgroundColor: colors.white,
    alignItems: "center",
    borderRadius: 24,
  },
  disabled: {
    width: "90%",
    padding: "5%",
    backgroundColor: colors.gray,
    alignItems: "center",
    borderRadius: 24,
  },
  text: {
    fontFamily: "SFProDisplaySemibold",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: -0.09,
    textAlign: "center",
    color: "#131415"
  },
});
