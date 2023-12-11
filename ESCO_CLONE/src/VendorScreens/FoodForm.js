import React, { useState } from "react"
import { SafeAreaView, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Form, FormItem, Picker } from 'react-native-form-component';

const FoodForm = () => {
  const [email, setEmail] = useState("");
  const [Wnumber, onChangeWnumber] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [City, setCity] = useState("");
  const [Address, setAddress] = useState("");


  const [RestaruntType, setRestaruntType] = useState("");
  const [FoodType, setFoodType] = useState("");
  let { width, height } = Dimensions.get('window');


  return (
    <SafeAreaView>

      <ScrollView>
        <View style={{
          height
        }} >
          
        </View>
        <View style={{
          flex: 1,
          padding: 20
        }} >
          <Form onButtonPress={() => console.warn('do something')}>
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
            <Picker
              items={[
                { label: 'Commercial', value: 'Commercial' },
                { label: 'Home', value: 'Home' },
                { label: 'Stall', value: 'Stall' },
              ]}
              label="Resturant Type"
              selectedValue={RestaruntType}
              onSelection={(item) => setRestaruntType(item.value)}
            />
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
            />
            <Picker
              items={[
                { label: 'Desi Food', value: "Desi Food" },
                { label: 'Chinease Food', value: 'Chinease Food' },
                { label: 'Fast Food', value: 'Fast Food' },
                { label: 'Backery item', value: "Backery item" },
                { label: 'Sea Food', value: 'Sea Food' },
                { label: 'Desert', value: 'Desert' },
                { label: 'Drinks', value: 'Drinks' },
              ]}
              label="Food Type"
              selectedValue={FoodType}
              onSelection={(item) => setFoodType(item.value)}
            />
          </Form>
        </View>
      </ScrollView>


    </SafeAreaView>
  )

}
export default FoodForm;
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});