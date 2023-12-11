import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../assets/Colors/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { AuthInput, InfoInput } from '../../../Compoents/Inputs/Inputs'
import { PrimaryButton } from '../../../Compoents/Buttons/BTN'
import { UpdateProfile, profileImage } from '../../../redux/actions/user.action'
import { Acheivements, Compliments } from '../../../redux/actions/driver.action'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ImagePicker, launchImageLibrary } from 'react-native-image-picker';
const { height, width } = Dimensions.get("window")
const Profile = ({ navigation }) => {
    const ProfileData = useSelector((state) => state?.auth?.userInfo)
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    console.log(ProfileData)
    const [edit, setedit] = useState(false)
    const [First, setfirst] = useState(ProfileData?.first_name)
    const [last, setlast] = useState(ProfileData?.last_name)
    const [Ache, setAche] = useState()
    const [Compli, setCompli] = useState()
    const [pic, setpic] = useState()

    const dispatch = useDispatch()
    const onFromPickerImage = () => {
        var options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        launchImageLibrary(options, (response) => {

            console.log("Profile ohoti", response
            )
            if (response) {
                dispatch(profileImage(response?.assets?.[0] || null, setpic))
                // console.log("datadtadtatta", response)

                // setpic(response?.assets)
            }
        });
    }
    const updateMe = () => {
        const data = {
            first_name: First,
            last_name: last,
            profile_picture: `${pic !== undefined ? pic?.data?.data?.file?.key : ProfileData?.profile_picture}`
        }
        dispatch(UpdateProfile(data, Toast))
    }
    const save = () => {
        updateMe();
        setedit(false)
    }
    const Accehvement = async () => {
        const data = await dispatch(Acheivements())
        // console.log("Acche ,details", data)
        setAche(data?.data?.data?.achievements)
    }
    const Complimet = async () => {
        const data = await dispatch(Compliments())
        // console.log("Acche ,details", data)
        setCompli(data?.data?.data?.Compliments)
    }
    useEffect(() => {
        Accehvement(),
            Complimet()
    }, [])
    console.log("data manage", Ache)

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.bg }}
        >
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
                    style={{ fontFamily: "Poppins-Bold", color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, fontSize: width * 0.045, marginLeft: width * 0.025, width: width * 0.7 }}
                >
                    {Country == "UKRAINE" ? "Профіль" : "Profile"}
                </Text>
                <TouchableOpacity
                    disabled={edit == false ? false : true}
                    onPress={() => { setedit(true) }}
                >
                    <Image
                        style={{ resizeMode: "contain", tintColor: edit == true ? Colors.placeholder : null }}
                        source={Country == "UKRAINE" ? require("../../../assets/images/DrawerIcon/editukr.png") : require("../../../assets/images/DrawerIcon/edit.png")}
                    />
                </TouchableOpacity>
            </View>
            <Toast ref={(ref) => { Toast.setref(ref) }} />
            <ScrollView>
                <TouchableOpacity
                    // style={{borderRadius:100}}
                    disabled={!edit}
                    onPress={() => { onFromPickerImage() }}
                >
                    <Image
                        style={{
                            resizeMode: "cover",
                            alignSelf: "center",
                            margin: width * 0.01,
                            height: height * 0.08,
                            width: width * 0.15,
                            backgroundColor: Colors.placeholder,
                            // resizeMode: "contain",
                            borderRadius: 100
                        }}
                        source={{ uri: `${pic !== undefined ? pic?.data?.data?.file?.key : ProfileData?.profile_picture}` }}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        alignSelf: "center",
                        fontFamily: "Poppins-Bold",
                        color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                        fontSize: width * 0.045
                    }}
                >{ProfileData?.first_name}{" "}{ProfileData?.last_name}</Text>

                <View>

                    <InfoInput
                        value={First}
                        source={require("../../../assets/images/profile.png")}
                        editable={edit}
                        onChangeText={setfirst}
                    />
                    <InfoInput
                        value={last}
                        source={require("../../../assets/images/profile.png")}
                        editable={edit}
                        onChangeText={setlast}
                    />

                    {
                        edit == true ? <PrimaryButton
                            onPress={() => { save() }}
                            title={Country == "UKRAINE" ? "зберегти" : "Save"} /> : null
                    }
                </View>
                <Text
                    style={{
                        marginLeft: width * 0.035,
                        fontSize: width * 0.035,
                        fontFamily: "Poppins-Bold",
                        marginTop: height * 0.035,
                        color: Colors.blackish
                    }}
                >{Country == "UKRAINE" ? "компліменти" : "Compliments"}</Text>
                <View
                    style={{
                        flexDirection: "row",

                        marginLeft: width * 0.035

                    }}
                >

                    {Compli?.length > 0 ?
                        Compli?.map((i) => {
                            return (

                                <View>

                                    <View
                                        style={{
                                            borderWidth: 2,
                                            borderRadius: width * 0.35,
                                            marginLeft: width * 0.035,
                                            borderColor: Colors.Orange
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height: height * 0.1,
                                                width: width * 0.187,
                                                resizeMode: "cover",
                                                borderRadius: width * 0.35,

                                            }}
                                            source={{ uri: `${i?.thumbnail}` }}
                                        />

                                    </View>
                                    <Text
                                        style={{
                                            width: width * 0.2,
                                            textAlign: "center",
                                            alignSelf: "center",
                                            fontFamily: "Poppins-Medium",
                                            fontSize: width * 0.03
                                        }}
                                    >{i?.title}</Text>
                                </View>
                            )
                        }) : <Text

                            style={{
                                fontSize: width * 0.035,
                                fontFamily: "Poppins-Medium",
                                color: "gray",
                                marginLeft: width * 0.035
                            }}
                        >{Country == "UKRAINE" ? "Без компліментів" : "No Compliments till now"}</Text>}
                </View>
                <Text
                    style={{
                        marginLeft: width * 0.035,
                        fontSize: width * 0.035,
                        fontFamily: "Poppins-Bold",
                        marginTop: height * 0.035,
                        color: Colors.blackish
                    }}
                >{Country == "UKRAINE" ? "Досягнення" : "Acheivements"}</Text>
                <View
                    style={{
                        flexDirection: "row",

                        marginLeft: width * 0.035

                    }}
                >

                    {Ache?.length > 0 ? Ache?.map((i) => {
                        return (

                            <View>

                                <View
                                    style={{
                                        borderWidth: 2,
                                        borderRadius: width * 0.35,
                                        marginLeft: width * 0.035,
                                        borderColor: Colors.Orange
                                    }}
                                >
                                    <Image
                                        style={{
                                            height: height * 0.1,
                                            width: width * 0.187,
                                            resizeMode: "cover",
                                            borderRadius: width * 0.35,

                                        }}
                                        source={{ uri: `${i?.thumbnail}` }}
                                    />

                                </View>
                                <Text
                                    style={{
                                        width: width * 0.2,
                                        textAlign: "center",
                                        alignSelf: "center",
                                        fontFamily: "Poppins-Medium",
                                        fontSize: width * 0.03
                                    }}
                                >{i?.title}</Text>
                            </View>
                        )
                    }) : <Text
                        style={{
                            fontSize: width * 0.035,
                            fontFamily: "Poppins-Medium",
                            color: "gray",
                            marginLeft: width * 0.035
                        }}
                    >{Country == "UKRAINE" ? "Досі досягнень немає" : "No Acheivements till now"}</Text>}
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({})