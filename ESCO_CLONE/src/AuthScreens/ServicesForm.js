import React, { useState,useEffect } from "react"
import { SafeAreaView, ScrollView, StyleSheet, TextInput, View, Dimensions, Text } from "react-native";
import { Form, FormItem, Picker } from 'react-native-form-component';
import * as Animatable from 'react-native-animatable';



const ServiceForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [Wnumber, onChangeWnumber] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [City, setCity] = useState("");
  const [Address, setAddress] = useState("");
  const [Name, setName] = useState("");
  const [RestaruntType, setRestaruntType] = useState("");
  const [FoodType, setFoodType] = useState("");
  const [food, setfood] = useState("");
  const [service, setservice] = useState("");
  const [product, setfproduct] = useState("");
  let { width, height } = Dimensions.get('window');
  const [state, setState] = useState("")
        const [fade, setfade] = useState("")
        useEffect(() => {
            setState("zoomInDown"),
                setfade("fadeInUpBig")
        }, []);





  return (
    <SafeAreaView>
<View style={{ height: height * 0.07, width: width * 1, backgroundColor: "red", alignItems: "center", justifyContent: "center" }} >
          <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
            services
          </Text>
        </View>
      <ScrollView>
        
        <Animatable.View
        animation={fade}
        style={{
          flex: 1,
          padding: 20
        }} >
          <Form onButtonPress={() => navigation.navigate("PackageScreen")}>
            <FormItem
              label="Name"
              isRequired
              value={Name}
              onChangeText={(Name) => setName(Name)}
              asterik
              placeholder="Name"
              //   keyboardType="email-address"
              textContentType="emailAddress"
            />
            <FormItem
              label="Email"
              isRequired
              value={email}
              onChangeText={(email) => setEmail(email)}
              asterik
              placeholder="Email"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <FormItem
              label="WhatsApp Number"
              isRequired
              value={Wnumber}
              onChangeText={(Wnumber) => onChangeWnumber(Wnumber)}
              asterik
              placeholder="Whatsapp Number"
              keyboardType="numeric"
              textContentType="telephoneNumber"
            />
            <FormItem
              label="CNIC Number"
              isRequired
              value={CNIC}
              onChangeText={(CNIC) => setCNIC(CNIC)}
              asterik
              placeholder="CNIC number without dash"
              keyboardType="numeric"

            />
            {/* <Picker
              items={[
                { label: 'Commercial', value: 'Commercial' },
                { label: 'Home', value: 'Home' },
                { label: 'Stall', value: 'Stall' },
              ]}
              label="Resturant Type"
              selectedValue={RestaruntType}
              onSelection={(item) => setRestaruntType(item.value)}
            /> */}

            <FormItem
              label="City"
              isRequired
              value={City}
              onChangeText={(City) => setCity(City)}
              asterik
              placeholder="City"
              textContentType="addressCity"
            />
            <FormItem
              label="Complete Address"
              isRequired
              value={Address}
              onChangeText={(Address) => setAddress(Address)}
              asterik
              placeholder="Complete Address"
              style={{ height: 80 }}
            />

          </Form>
        </Animatable.View>
      </ScrollView>


    </SafeAreaView>
  )

}
export default ServiceForm;
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});