import React, { useEffect,useState } from "react";
// import auth from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-community/google-signin';
import {
      AccessToken,
      GraphRequest,
      GraphRequestManager,
      LoginManager,
    } from 'react-native-fbsdk-next';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput, SafeAreaView } from "react-native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
//   } from '@react-native-google-signin/google-signin';
let { width, height } = Dimensions.get('window');
const LoginUser = ({ navigation }) => {
    const [UserInfo, setUserInfo] = React.useState("");
    const [Token,SetToken] = React.useState("");
  
    console.log("my dataaa",UserInfo)
    console.log("my Token",Token)
    useEffect(()=>{
      GoogleSignin.configure({
        webClientId:
          '260759292128-4h94uja4bu3ad9ci5qqagubi6k1m0jfv.apps.googleusercontent.com',
      },[]);
    })
    async function onGoogleButtonPress() {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log("tokenn",idToken)
      return auth().signInWithCredential(googleCredential);
    }
  

   const getInfoFromToken = token => {
            const PROFILE_REQUEST_PARAMS = {
              fields: {
                string: 'id,name,first_name,last_name',
              },
            };
            const profileRequest = new GraphRequest(
              '/me',
              {token, parameters: PROFILE_REQUEST_PARAMS},
              (error, user) => {
                if (error) {
                  console.log('login info has error: ' + error);
                } else {

                  console.log('result:', user);
                  setUserInfo(user)
                  console.log(user)
                }
              },
            );
            new GraphRequestManager().addRequest(profileRequest).start();
          };
        
    const      loginWithFacebook = () => {
            // Attempt a login using the Facebook login dialog asking for default permissions.
            LoginManager.logInWithPermissions(['public_profile']).then(
              login => {
                if (login.isCancelled) {
                  console.log('Login cancelled');
                } else {
                  AccessToken.getCurrentAccessToken().then(data => {
                      console.log("tokenn",data.accessToken)

                      SetToken(data.accessToken)
                    const accessToken = data.accessToken.toString();
                    getInfoFromToken(accessToken);
                    check()
                  });
                }
              },
              error => {
                console.log('Login fail with error: ' + error);
              },
            );
          };
        const signIn = async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo });
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
              console.log(error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
              console.log(error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
              console.log(error)
            } else {
              // some other error happened
              console.log(error)
            }
          }
        };
         
          const check =()=>{
            if(Token !== null){
              navigation.navigate("dashboard")
            }else{return}
          }
    
  return (
        <SafeAreaView>
            <View

                style={{ backgroundColor: "white", flex: 1 }}
            >
                <View
                    style={styles.container}
                >
                    <Image
                        style={styles.tinyLogo}
                        source={require('../Images/logo.png')}
                    />


                </View>
                <View
                    style={styles.containerdown}

                >
                    <Text
                        style={{
                            color: "white",
                            justifyContent: "center",
                            alignSelf: "center",
                            fontSize: 25,
                            fontStyle: "italic",
                            marginTop: 40,
                            // marginBottom:0
                        }}
                    >
                        SignIn As User
                    </Text>



                    <TouchableOpacity
                        style={styles.Btn}
                        onPress={() => onGoogleButtonPress() }
                    >
                        <Image
                            style={styles.tinyIconGoogle}
                            source={require("../Images/gmail.png")}
                        />
                        <Text style={styles.text}>
                            Login with your Gmail
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.Btn2}
                        onPress={() => {loginWithFacebook()}}
                    >
                        <Image
                            style={styles.tinyIconFB}
                            source={require("../Images/facebook.png")}
                        />
                        <Text style={styles.text}>
                            Login with Facebook
                        </Text>
                    </TouchableOpacity>
                   <Text>{UserInfo.name}</Text>

                </View>

            </View>
        </SafeAreaView>


    )
}

export default LoginUser;

const styles = StyleSheet.create({
    container: {

        height: height * .32,
        width: width * 1,
        paddingLeft: 10

    },
    containerdown: {
        backgroundColor: "#ed1a23",
        height: height * .8,
        width: width * 1,
        paddingLeft: 10,
        borderTopStartRadius: 100,
        borderBottomEndRadius: 100,
        elevation: 5

    },
    Btn: {
        backgroundColor: "white",
        height: height * .09,
        width: width * .8,
        justifyContent: "space-evenly",
        alignSelf: "center",
        // marginRight:30 ,
        flexDirection: "row",
        marginTop: height * .05,
        borderRadius: 30,
        elevation: 10,
        padding: 10
    },
    Btn2: {
        backgroundColor: "white",
        height: height * .09,
        width: width * .8,
        justifyContent: "space-evenly",
        alignSelf: "center",
        // marginRight:30 ,
        marginTop: height * .02,
        borderRadius: 30,
        elevation: 10,
        padding: 10,
        flexDirection: "row",
    },
    text: {
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold",
        color: "black"
    },
    tinyLogo: {
        width: width * 0.6,
        height: height * .2,
        alignSelf: "center",
        marginTop: height * 0.1,
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 30,
        borderColor: "white",
        color: "white",
        backgroundColor: "#ca251b"
    },
    tinyIconGoogle: {
        width: 30,
        height: 30,
    },
    tinyIconFB: {
        width: 35,
        height: 35,
    },
    tinyIconPhone: {
        width: 42,
        height: 42,
    },
})

// import React, {Component} from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
// import {
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
//   LoginManager,
// } from 'react-native-fbsdk-next';

// export default class LoginUser extends Component {
//   state = {userInfo: {}};

//   logoutWithFacebook = () => {
//     LoginManager.logOut();
//     this.setState({userInfo: {}});
//   };

//   getInfoFromToken = token => {
//     const PROFILE_REQUEST_PARAMS = {
//       fields: {
//         string: 'id,name,first_name,last_name',
//       },
//     };
//     const profileRequest = new GraphRequest(
//       '/me',
//       {token, parameters: PROFILE_REQUEST_PARAMS},
//       (error, user) => {
//         if (error) {
//           console.log('login info has error: ' + error);
//         } else {
//           this.setState({userInfo: user});
//           console.log('result:', user);
//         }
//       },
//     );
//     new GraphRequestManager().addRequest(profileRequest).start();
//   };

//   loginWithFacebook = () => {
//     // Attempt a login using the Facebook login dialog asking for default permissions.
//     LoginManager.logInWithPermissions(['public_profile']).then(
//       login => {
//         if (login.isCancelled) {
//           console.log('Login cancelled');
//         } else {
//           AccessToken.getCurrentAccessToken().then(data => {
//               console.log("tokenn",data)
//             const accessToken = data.accessToken.toString();
//             this.getInfoFromToken(accessToken);
//           });
//         }
//       },
//       error => {
//         console.log('Login fail with error: ' + error);
//       },
//     );
//   };

//   state = {userInfo: {}};

//   render() {
//     const isLogin = this.state.userInfo.name;
//     const buttonText = isLogin ? 'Logout With Facebook' : 'Login From Facebook';
//     const onPressButton = isLogin
//       ? this.logoutWithFacebook
//       : this.loginWithFacebook;
//     return (
//       <View style={{flex: 1, margin: 50}}>
//         <TouchableOpacity
//           onPress={onPressButton}
//           style={{
//             backgroundColor: 'blue',
//             padding: 16,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Text>{buttonText}</Text>
//         </TouchableOpacity>
//         {this.state.userInfo.name && (
//           <Text style={{fontSize: 16, marginVertical: 16}}>
//             Logged in As {this.state.userInfo.name}
//           </Text>
//         )}
//       </View>
//     );
//   }
// }