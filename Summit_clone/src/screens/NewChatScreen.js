import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, TextInput } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import CustomHeader from "../components/common/CustomHeader";
import { Avatar } from "../components/ui";
import Screen from "../components/ui/Screen";
import colors from "../constants/colors";
import { db } from "../firebase";
import { useAuth } from "../context/Auth";
import NewChatScreenInput from "../components/chat/NewChatScreenInput";
import { getAllAttendees } from "../services/commonService";
import {faker} from "@faker-js/faker";


const NewChatScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [filterList, setFilteredList] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [attendeesToShow, setAttendeesToShow] = useState([])
  const { authData } = useAuth();

  useEffect(() => {
    getAllAttendees(setAttendees);
  }, []);

  useEffect(() => {
    setAttendeesToShow(attendees)
  }, [attendees])
  


  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: "none"
      },
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      },
      header: customHeaderComponent
    });
    const parent = navigation.getParent();
    parent.setOptions({
      tabBarStyle: {
        display: "none"
      }
    });

    return () => {
      parent.setOptions({
        tabBarStyle: {
          display: "flex"
        }
      });
      // setSelectedAttendees([]);

    };
  }, [navigation]);

  // useEffect(() => {
  //   if (attendees != null) {
  //     setFilteredList(attendees);
  //   }
  // }, [attendees]);

  const customHeaderComponent = () => (
    <CustomHeader>
      <View style={styles.customHeaderContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>NEW MESSAGE</Text>
      </View>
    </CustomHeader>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <View style={styles.renderItemContainer}>
        <Avatar src={{ uri: item.imageSource || faker.image.avatar() }} />
        <Text style={styles.name}>{`${item.firstName} ${item.lastName}`}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleItemClick = (item) => {
    const name = `${item.firstName} ${item.lastName}`;
    if (!emailList.includes(name)) {
      setEmailList([...emailList, name]);
      setEmail("");
    }
    setSelectedAttendees([...selectedAttendees, item]);

  };

  const handleChipClick = (email) => {
    const newArr = emailList.filter((item) => item != email);
    const newSelectedAttendees = selectedAttendees.filter(
      (item) => `${item.firstName} ${item.lastName}` !== email
    );
    setEmailList(newArr);
    setSelectedAttendees(newSelectedAttendees);
    if(newSelectedAttendees.length === 0){
      setAttendeesToShow(attendees)
    }
  };

  return (
    <Screen style={styles.screenContainer}>
      <View style={styles.toContainer}>
        <Text>To: </Text>
        {emailList?.map((email, index) => (
          <TouchableOpacity key={index} onPress={() => handleChipClick(email)}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>{email}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TextInput
          placeholderTextColor={colors.black}
          onChangeText={(text) => {
            setEmail(text)
             if(text !== "" ){
            setAttendeesToShow(attendees.filter((attendee) => {
              const fullName = `${attendee.firstName} ${attendee.lastName}`
              if(fullName.toLowerCase().startsWith(text.toLowerCase())){
                return attendee
              }
            }))
          }
          else {setAttendeesToShow(attendees)}
          }}
          value={email}
          style={styles.textInput}
        />
      </View>
      <View style={styles.flatListContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>ATTENDEES</Text>
        </View>

        <View style={styles.flatListInnerContainer}>
          <FlatList
            data={attendeesToShow}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />

          <NewChatScreenInput selectedAttendees={selectedAttendees} />
        </View>
      </View>
    </Screen>
  );
};

export default NewChatScreen;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: colors.white,
    flex: 1
  },
  headerText: {
    color: colors.primary,
    fontSize: RFPercentage(2.5),
    fontWeight: "bold"
  },
  customHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%"
  },
  cancel: {
    fontSize: RFPercentage(2)
  },

  toContainer: {
    flexDirection: "row",
    backgroundColor: colors.lightGray,
    padding: "5%",
    alignItems: "center",
    flexWrap: "wrap"
  },
  titleContainer: {
    padding: "5%"
  },
  titleText: {
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    color: colors.darkGray
  },
  flatListContainer: {
    backgroundColor: colors.white,
    flex: 1
  },
  flatListInnerContainer: {
    justifyContent: "space-between",
    flex: 1
  },
  renderItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: "5%",
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1
  },
  name: {
    marginLeft: "5%",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold"
  },

  textInput: {
    flex: 1
  },
  chip: {
    backgroundColor: colors.primary,
    padding: "3%",
    paddingHorizontal: "2%",
    borderRadius: 20,
    alignItems: "center",
    marginRight: "2%"
  },
  chipText: {
    color: colors.white
  }
});



