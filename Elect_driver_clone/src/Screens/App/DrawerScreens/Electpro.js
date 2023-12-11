import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable
} from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../../assets/Colors/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { PrimaryButton } from "../../../Compoents/Buttons/BTN"
import { Packages, SavedCards, Subscribe, SubscribePaymentIntent, SubscribedPackages } from '../../../redux/actions/driver.action'
import { useFocusEffect } from '@react-navigation/native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
let { width, height } = Dimensions.get("window")

const Electpro = ({ navigation }) => {
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
  const [PackagesLIst, setPackagesList] = useState()
  const [myPackagesLIst, setMyPackagesList] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch()
  const PackagesData = async () => {
    const data = await dispatch(Packages())
    console.log("Packages", data)
    setPackagesList(data)
  }
  useEffect(() => {
    PackagesData(),
      CardsCheck(),
      mypackages()
  }, [])

  const CardsCheck = async () => {
    const data = await dispatch(SavedCards())
    console.log("my cards Details", data?.data?.data?.paymentMethod)
    if (data?.data?.data?.paymentMethod?.length == 0) {
      setModalVisible(true)
    }
  }
  const mypackages = async () => {
    const data = await dispatch(SubscribedPackages())
    console.log("my data package", data)
    setMyPackagesList(data)
  }
  const subcribePackage = (item) => {
    const data = {
      subscriptionId: "4a414f1b-eefd-434e-96ab-a0673b38efc8"
    }
    dispatch(Subscribe(item, Toast))
    dispatch(SubscribePaymentIntent(data, Toast)).then(() => {
      mypackages();
      PackagesData()
    })
  }
  const handleAddcard = () => {
    navigation?.navigate("AddWallet"),
      setModalVisible(false)
  }
  const handlenOTNOW = () => {
    navigation?.goBack(),
      setModalVisible(false)
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.bg, flex: 1 }}
    >
      <View
        style={{ flexDirection: "row" }}
      >
        <TouchableOpacity
          onPress={() => { navigation.goBack() }}
        >
          <Image
            style={styles.back}
            source={require("../../../assets/images/back.png")}
          />
        </TouchableOpacity>
        <Text
          style={[styles.welcome, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme }]}
        >
          Elect-Pro
        </Text>

      </View>
      <Toast ref={(ref) => { Toast.setref(ref) }} />
      <View
        style={{ marginTop: height * 0.066 }}
      >
        {PackagesLIst?.entities?.map((i) => {
          return (
            <View
              style={styles.card}
            >
              <Text
                style={styles.title}
              >{i?.title?.toUpperCase()}</Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
              >
                <Text
                  style={styles.description}
                >{i?.description}</Text>
                <Text
                  style={styles.Price}
                >${i?.price}/-</Text>

              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
              >
                <Text
                  style={styles.validity}
                > Validity: {i?.expireDays !== 0 ? i?.expireDays + " Days" : null} {i?.expireMonths !== 0 ? i?.expireMonths + " Month" : null}{i?.expireYears !== 0 ? i?.expireYears + " Year" : null}</Text>

                <TouchableOpacity
                  onPress={() => { subcribePackage(i?.id) }}
                  style={styles.btn}
                >
                  <Text
                    style={styles.subbtntext}
                  >Subcribe</Text>
                </TouchableOpacity>
              </View>

            </View>
          )
        })}
      </View>
      <View>
        {myPackagesLIst?.entity ?
          <View
            style={styles.card}
          >
            <Text
              style={styles.title}
            >{myPackagesLIst?.entity?.title?.toUpperCase()}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            >
              <Text
                style={styles.description}
              >{myPackagesLIst?.entity?.description}</Text>
              <Text
                style={styles.Price}
              >${myPackagesLIst?.entity?.price}/-</Text>

            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            >
              <Text
                style={styles.validity}
              > Validity: {myPackagesLIst?.entity?.expireDays !== 0 ? myPackagesLIst?.entity?.expireDays + " Days" : null} {myPackagesLIst?.entity?.expireMonths !== 0 ? myPackagesLIst?.entity?.expireMonths + " Month" : null}{myPackagesLIst?.entity?.expireYears !== 0 ? myPackagesLIst?.entity?.expireYears + " Year" : null}</Text>

              <TouchableOpacity
                disabled={true}
                // onPress={() => { subcribePackage(i?.id) }}
                style={[styles.btn, { backgroundColor: "grey" }]}
              >
                <Text
                  style={styles.subbtntext}
                >Subcribed</Text>
              </TouchableOpacity>
            </View>

          </View> : null}

      </View>

      <View style={[styles.centeredView, { backgroundColor: modalVisible == true ? "rgba(0, 0, 0, 0.21)" : null }]}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Please add Card Before Subscrbing to any Package!</Text>
              <PrimaryButton
                onPress={() => { handleAddcard() }}
                title="Add Card" />
              <PrimaryButton
                onPress={() => { handlenOTNOW() }}
                title="Not Right Now" />

            </View>
          </View>
        </Modal>

      </View>

    </SafeAreaView>
  )
}

export default Electpro

const styles = StyleSheet.create({
  back: {
    resizeMode: "contain",
    height: height * 0.05,
    // backgroundColor:"red",
    width: width * 0.13,
    // alignSelf: "center",
    marginTop: height * 0.03,

  },
  welcome: {
    fontSize: width * 0.05,
    fontFamily: "Poppins-Bold",
    color: Colors.theme,
    marginTop: height * 0.036,
    marginLeft: width * 0.05,
    // backgroundColor:"red"
  },
  statement: {

    fontSize: width * 0.036,
    fontFamily: "Poppins-Light",
    color: Colors.text,
    marginTop: -height * 0.01,
    marginLeft: width * 0.05,
    // backgroundColor:"red"
  },
  statement2: {

    fontSize: width * 0.036,
    fontFamily: "Poppins-Bold",
    color: Colors.Orange,
    marginTop: -height * 0.012,
    marginLeft: width * 0.01,
    // backgroundColor:"red"
    textDecorationColor: Colors.Orange,
    textDecorationLine: "underline",
  },
  card: {
    backgroundColor: "white",
    width: width * 0.8,
    height: height * 0.15,
    marginTop: height * 0.01,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    padding: width * 0.025,
    elevation: 11,
    borderRadius: width * 0.015,

  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: width * 0.045,
    color: Colors.theme,
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: width * 0.032,
    color: Colors.blackish,

  },
  Price: {
    fontFamily: "Poppins-Bold",
    fontSize: width * 0.042,
    color: Colors.Orange,

  },
  validity: {
    fontFamily: "Poppins-Italic",
    fontSize: width * 0.03,
    color: Colors.metalic,

  },
  btn: {
    backgroundColor: Colors.Orange,
    padding: width * 0.012,
    borderRadius: width * 0.0415,
    width: width * 0.2,
    alignItems: "center"
  },
  subbtntext: {
    color: Colors.white,
    fontSize: width * 0.03,
    fontWeight: "800"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    position: "absolute",
    alignSelf: "center",
    height: height,
    backgroundColor: "rgba(0, 0, 0, 0.21)"
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  modalText: {
    marginBottom: width * 0.0354,
    textAlign: 'center',
    fontFamily: "Poppins-Medium",
    color: Colors.theme
  },
})