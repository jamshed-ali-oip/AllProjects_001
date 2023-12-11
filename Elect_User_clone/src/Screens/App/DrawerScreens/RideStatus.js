import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../../assets/Colors/Colors'
import { CompletedRides, PendingRides, RideDetail } from '../../../redux/actions/ride.action'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
const { height, width } = Dimensions.get("window")
const RideStatus = ({ navigation }) => {
  const [status, setStatus] = useState(true)
  const [PEndingData, setPendingData] = useState([])
  const [CompleteData, setCompleteData] = useState([])
  const [Selected, setSelected] = useState([])
  const dispatch = useDispatch()
  const Flag = useSelector((state) => state?.auth?.ride?.ride)
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
  const pendingRequest = async () => {
    const data = await dispatch(PendingRides())
    console.log(data.data.data.rides)
    setPendingData(data.data.data.rides)
  }
  const CompletedRequest = async () => {
    const data = await dispatch(CompletedRides())
    console.log(data.data.data.rides)
    setCompleteData(data.data.data.rides)
  }
  useEffect(() => {
    pendingRequest()
    CompletedRequest()
  }, [])
  const RidETrack = (item) => {
    dispatch(RideDetail(item?.item?.id)).then(() => {


    })
  }
  const Complete = (item) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          height: height * 0.2,
          width: width * 0.88,
          alignSelf: "center",
          margin: width * 0.0125,
          borderRadius: width * 0.0125,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.30,
          shadowRadius: 4.65,

          elevation: 8,

        }}
      >
        <Image
          style={{ resizeMode: "contain", alignSelf: "center", marginTop: height * 0.0125 }}
          source={require("../../../assets/images/DrawerIcon/map.png")}
        />
        <Text
          style=
          {{
            color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
            fontFamily: "Poppins-Bold",
            fontSize: width * 0.04,
            marginLeft: width * 0.04
          }}
        >{item?.item?.dropoff_address?.slice(5, 39)}</Text>
        <View
          style={{
            flexDirection: "row", justifyContent: "space-between", paddingHorizontal: width * 0.04
          }}
        >
          <Text
            style=
            {{
              color: Colors.blackish,
              fontFamily: "Poppins-Bold",
              fontSize: width * 0.035,
            }}
          >{Country == "UKRAINE" ? "Всього поїздки" : "Trip Total"}:{Country == "UKRAINE" ? "₴" : "$ "}{item?.item?.ridePayment[0]?.total / 100}</Text>
          <Text
            style=
            {{
              color: Colors.blackish,
              fontFamily: "Poppins-Medium",
              fontSize: width * 0.035
            }}
          >{moment(item?.item?.requestedAt).format("hh:mm")}</Text>
        </View>
      </View >
    )
  }
  const Pending = (item) => {

    return (
      <View
        style={{
          backgroundColor: "white",
          height: height * 0.2,
          width: width * 0.88,
          alignSelf: "center",
          margin: width * 0.0125,
          borderRadius: width * 0.0125,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.30,
          shadowRadius: 4.65,

          elevation: 8,

        }}
      >
        <Image
          style={{ resizeMode: "contain", alignSelf: "center", marginTop: height * 0.0125 }}
          source={require("../../../assets/images/DrawerIcon/map.png")}
        />
        <TouchableOpacity
          onPress={() => { RidETrack(item) }}
        >
          <Text
            style=
            {{
              color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
              fontFamily: "Poppins-Bold",
              fontSize: width * 0.04,
              marginLeft: width * 0.04
            }}
          >{item?.item?.dropoff_address?.slice(5, 39)}</Text>
          <View
            style={{
              flexDirection: "row", justifyContent: "space-between", paddingHorizontal: width * 0.04
            }}
          >
            <Text
              style=
              {{
                color: Colors.blackish,
                fontFamily: "Poppins-Bold",
                fontSize: width * 0.035,
              }}
            >{Country == "UKRAINE" ? "Всього поїздки" : "Trip Total"}:{Country == "UKRAINE" ? "₴" : "$ "}{item?.item?.ridePayment[0]?.total / 100}</Text>
            <Text
              style=
              {{
                color: Colors.blackish,
                fontFamily: "Poppins-Medium",
                fontSize: width * 0.035
              }}
            >{moment(item?.item?.requestedAt).format("hh:mm")}</Text>
          </View>
        </TouchableOpacity>
      </View >
    )
  }
  return (
    <SafeAreaView>
      <View
        style={{ flexDirection: "row", alignItems: "center", padding: width * 0.0325 }}
      >
        <TouchableOpacity
          onPress={() => { navigation.goBack() }}
        >
          <Image
            style={{ resizeMode: "contain" }}
            source={require("../../../assets/images/back.png")}
          />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "Poppins-Bold", color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, fontSize: width * 0.045, marginLeft: width * 0.025 }}
        >
          {Country == "UKRAINE" ? "Статус поїздки" : "Ride Status"}
        </Text>
      </View>
      <View
        style=
        {{
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
          height: height * 0.15
        }}
      >
        <TouchableOpacity
          style={[styles.type, { borderBottomWidth: status === true ? 2 : 0 }]}
          onPress={() => { setStatus(true) }}
        >
          <Text
            style={styles.tag}
          >{Country == "UKRAINE" ? "В очікуванні" : "Pending"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.type, { borderBottomWidth: status === false ? 2 : 0 }]}
          onPress={() => { setStatus(false) }}
        >
          <Text
            style={styles.tag}
          >{Country == "UKRAINE" ? "Виконано" : "Completed"}</Text>
        </TouchableOpacity>
      </View>

      {
        status === true ? <View
          style={{ marginTop: -height * 0.085 }}
        >
          <FlatList
            data={PEndingData}
            renderItem={Pending}
            keyExtractor={item => item.id}
          />
        </View> :
          <View
            style={{ marginTop: -height * 0.085 }}
          >
            <FlatList
              data={CompleteData}
              renderItem={Complete}
              keyExtractor={item => item.id}
            />
          </View>

      }

    </SafeAreaView>
  )
}

export default RideStatus

const styles = StyleSheet.create({
  type: {
    // backgroundColor: "white",
    height: height * 0.0325,
    borderBottomColor: Colors.white,
    // borderBottomWidth: 2,

  },
  tag: {
    color: Colors.white,
    fontFamily: "Poppins-Medium"
  }
})