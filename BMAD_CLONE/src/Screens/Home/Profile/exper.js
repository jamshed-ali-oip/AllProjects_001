import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,Dimensions,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import LinearGradient from 'react-native-linear-gradient'
 import AppText from '../../../Components/AppText';
 import Feather from 'react-native-vector-icons/Feather';
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import FontAwesome from 'react-native-vector-icons/FontAwesome';
 import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

 const data = [
    { key: 'A', image: require('./../../../Assets/Images/post1.png') },
    { key: 'B', image: require('./../../../Assets/Images/post2.png')}, 
    { key: 'C', image: require('./../../../Assets/Images/post3.png')}, 
    { key: 'D', image: require('./../../../Assets/Images/Animal.png')}, 
    { key: 'E', image: require('./../../../Assets/Images/Tech.png')}, 
    { key: 'F', image: require('./../../../Assets/Images/share1.png')}, 
    { key: 'G', image: require('./../../../Assets/Images/share2.png')}, 
    { key: 'H', image: require('./../../../Assets/Images/share2.png') }, 
    { key: 'I', image: require('./../../../Assets/Images/share2.png')}, 
    { key: 'J', image: require('./../../../Assets/Images/share1.png')},
    { key: 'K', image: require('./../../../Assets/Images/share1.png')},
    { key: 'L', image: require('./../../../Assets/Images/share1.png')},
    { key: 'M', image: require('./../../../Assets/Images/post1.png')},
    { key: 'N', image: require('./../../../Assets/Images/post1.png')},
    { key: 'O', image: require('./../../../Assets/Images/Animal.png')},
    { key: 'P', image: require('./../../../Assets/Images/post1.png')},
    { key: 'Q', image: require('./../../../Assets/Images/Animal.png')},
    { key: 'R', image: require('./../../../Assets/Images/post1.png')},
    { key: 'S', image: require('./../../../Assets/Images/Animal.png')},
    { key: 'I', image: require('./../../../Assets/Images/share2.png')}, 
    { key: 'J', image: require('./../../../Assets/Images/share1.png')},
    { key: 'K', image: require('./../../../Assets/Images/share1.png')},
    { key: 'L', image: require('./../../../Assets/Images/share1.png')},
    { key: 'M', image: require('./../../../Assets/Images/post1.png')},
    { key: 'N', image: require('./../../../Assets/Images/post1.png')},
    { key: 'O', image: require('./../../../Assets/Images/Animal.png')},
    { key: 'P', image: require('./../../../Assets/Images/post1.png')},
    { key: 'Q', image: require('./../../../Assets/Images/Animal.png')},
    { key: 'R', image: require('./../../../Assets/Images/post1.png')},
    { key: 'S', image: require('./../../../Assets/Images/Animal.png')},
  ];
  
  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
  
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
  
    return data;
  };
  
const numColumns = 3;
const imageHeight = 420;
const Data = [
  'item 1',   'item 1',   'item 1',   'item 1',   'item 1',   'item 1',   'item 1',   'item 1',   'item 1', 
  'item 1',   'item 1',   'item 1',   'item 1',   'item 1',   'item 1',   'item 1',   'item 1',   'item 1', 
  'item 1',   'item 1',   'item 1',   'item 1',   'item 1',   'item 1',   'item 1',   'item 1',   'item 1', 
]
 const ProfileScreen = ({navigation, route}) => {
   console.log("sadasd")
    const renderItem = ({ item, index }) => {
     
        return (
          <View
            style={styles.item}
          >
              <TouchableOpacity>
                     <Image style={{height: 115, width: 115, borderRadius:10}} source={item.image} />
              </TouchableOpacity>
          </View>
        );
      };
      
    useEffect(()=>{
        // console.log(navigation)
    },[])

    let AnimatedHeaderValue = new Animated.Value(0)
    const Heade_Max = 550;
    const Header_Min = 150;

    const animatedHeaderBgColor = AnimatedHeaderValue.interpolate({
      inputRange: [0, imageHeight],
      outputRange: ['black', '#B01125'],
      extrapolateLeft: 'extend',
      extrapolateRight: 'clamp',
      // extrapolate:'extend',
     
    })

    const animatedHeaderHeight = AnimatedHeaderValue.interpolate({
      inputRange: [0, imageHeight ],
      outputRange: [imageHeight + 20 , 200],
      // extrapolate:'extend',
      extrapolateLeft: 'extend',
      extrapolateRight: 'clamp',
      
    })

    const animatedImageh = AnimatedHeaderValue.interpolate({
      inputRange: [0, 100 ],
      outputRange: [100  , 0],     
      extrapolateLeft: 'extend',
      extrapolateRight: 'clamp',
     
      
    })

    const animatedImagep = AnimatedHeaderValue.interpolate({
      inputRange: [90, 90 ],
      outputRange: [90  , 90],     
      extrapolateLeft: 'extend',
      extrapolateRight: 'identity',
      extrapolate:'clamp'
     
      
    })

    const animatedImagew = AnimatedHeaderValue.interpolate({
      inputRange: [0, 100 ],
      outputRange: [100  , 0],     
      extrapolateLeft: 'extend',
      extrapolateRight: 'clamp',
     
      
    })

 

     return(
         <SafeAreaView style={styles.container}>
              <StatusBar translucent backgroundColor="transparent" />
              <Animated.View
               style={[
                      styles.imagebackground,{
                          height: animatedHeaderHeight,
                         
                      }
                    ]}
              >
               <Animated.Image 
                   style={[
                      styles.imagebackground,{
                          height: animatedHeaderHeight,
                          backgroundColor: animatedHeaderBgColor
                      }
                    ]}
                  resizeMode='cover' source={require('./../../../Assets/Images/cover.jpg')} />
                  <Animated.View style={styles.image}>
                    
            
                    <View style={{borderRadius: 100, borderWidth: 2, borderColor: 'white'}}>
                   <Animated.Image  style={[{width: 120, height: 120, borderRadius:100, backgroundColor: 'black'},{
                     height: animatedImageh,
                     width: animatedImagew,
                   }]}
                      source={{uri: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'}}
                    />
                    
                    </View>

                    <Animated.View style={[styles.contentbellowImage,{
                       height: animatedImagep,
                    }]}>
                      <View style={{justifyContent:'center', flexDirection:'column',alignItems:'center'}}>
                       <AppText nol={2} textAlign="center" family="Poppins-Medium" size={hp("2%")} color="white" Label={"Connects"} />
                       <View
                        style={{
                          flexDirection:'row',
                          alignItems:'flex-start'
                        }}> 
                        <FontAwesome5
                              name="users"
                              color='white'
                              size={20}
                              style={{top:0, right:5}}
                        />
                        <AppText nol={1} textAlign="left" family="Poppins-Medium" size={hp("1.5%")} color="white" Label={"220"} />
                      </View>    
                      </View>
                      <View style={{justifyContent:'center', flexDirection:'column',alignItems:'center'}}>
                       <AppText nol={2} textAlign="left" family="Poppins-Medium" size={hp("2%")} color="white" Label={"Likes"} />
                       <View
                        style={{
                          flexDirection:'row',
                          alignItems:'flex-start'
                        }}> 
                        <Ionicons
                              name="heart"
                              color='white'
                              size={20}
                              style={{top:0, right:5}}
                        />
                       <AppText nol={1} textAlign="center" family="Poppins-Medium" size={hp("1.5%")} color="white" Label={"1.5K"} />
                      </View>
                      </View>
                    </Animated.View>
                 

                    <Animated.View style={[styles.upperImage,{
                       height: animatedImagep,
                    }]}>
                      <View style={{justifyContent:'center', flexDirection:'column',alignItems:'center'}}>
                       <AppText nol={2} textAlign="center" family="Poppins-Medium" size={hp("2%")} color="white" Label={"Muhammad Ahsan Muneer"} />
                       <AppText nol={1} textAlign="left" family="Poppins-Medium" size={hp("1.7%")} color="white" Label={"Software Engineer"} />
                      </View>
                    </Animated.View>
                    
                  </Animated.View>
                </Animated.View>
               {/* </ImageBackground> */}
            
                {/* </Animated.View> */}
             <ScrollView
             contentInsetAdjustmentBehavior="automatic"
             scrollEventThrottle={16}
             onScroll={
              Animated.event(
                [{
                  nativeEvent: {
                    contentOffset: {
                      y: AnimatedHeaderValue
                    }
                  }
                }],
                {useNativeDriver: false} 
              )
            }
                      
             >
              <View style={{paddingTop: 10}}></View>
              {/* <FlatList
                        ListHeaderComponentStyle={{height: '10%'}}
                        data={formatData(data, numColumns)}
                        renderItem={renderItem}
                        numColumns={numColumns}
                        scrollEnabled
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                          [{nativeEvent: {contentOffset:{y: AnimatedHeaderValue}}}],
                          {useNativeDriver: false}  
                        )}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={{width: '90%', alignSelf:'center' }}
                        // ListFooterComponent={
                        //     <View style={{height: 150}}/>
                        // }Smile a little more, regret a little less.
                    /> */}
              {/* <View style={{
                width: '95%',
                padding: 10,
                left: 10,
                justifyContent:'flex-start',
                flexDirection:'column'
                
              }}>
              <View
                style={{
                  flexDirection:'row',
                  alignItems:'flex-start'
                }}
                >
                 <Ionicons
                      name="md-mail"
                      color='#B01125'
                      size={20}
                      style={{top:0, right:5}}
                 />
               <AppText nol={2} textAlign="left" family="Poppins-Regular" size={hp("1.7%")} color="black" Label={"ahsanmuneer81@gmail.com"} />
            
              </View>
               <View
                style={{
                  flexDirection:'row',
                  alignItems:'flex-start'
                }}
                >
                 <Ionicons
                      name="home"
                      color='#B01125'
                      size={20}
                      style={{top:0, right:5}}
                 />
               <AppText nol={2} textAlign="left" family="Poppins-Regular" size={hp("1.7%")} color="black" Label={"Lives in Karachi"} />
            
              </View>
               <View
                style={{
                  flexDirection:'row',
                  alignItems:'flex-start'
                }}
                >
                 <Ionicons
                      name="ios-heart-sharp"
                      color='#B01125'
                      size={20}
                      style={{top:0, right:5}}
                 />
               <AppText nol={2} textAlign="left" family="Poppins-Regular" size={hp("1.7%")} color="black" Label={"Single"} />
            
              </View>
              <View
                style={{
                  flexDirection:'row',
                  alignItems:'flex-start'
                }}
                >
                 <Ionicons
                      name="today"
                      color='#B01125'
                      size={20}
                      style={{top:0, right:5}}
                 />
               <AppText nol={2} textAlign="left" family="Poppins-Regular" size={hp("1.7%")} color="black" Label={"Nov 11, 1996"} />
            
              </View>
              <View
                style={{
                  flexDirection:'row',
                  alignItems:'flex-start'
                }}
                >
                 <Ionicons
                      name="ios-information-circle"
                      color='#B01125'
                      size={20}
                      style={{top:0, right:5}}
                 />
               <AppText nol={3} textAlign="left" family="Poppins-Regular" size={hp("1.7%")} color="black"
                Label={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} />
            
              </View>
             
             </View> */}
             </ScrollView>
             {/* <View style={{height: 10}}></View> */}
                <FlatList
                       
                        data={formatData(data, numColumns)}
                        renderItem={renderItem}
                        numColumns={numColumns}
                        scrollEnabled
                        ListHeaderComponent={
                        <View style={{
                width: '95%',
                padding: 10,
                left: 10,
                justifyContent:'flex-start',
                flexDirection:'column'
                
              }}>
              <View
                style={{
                  flexDirection:'row',
                  alignItems:'flex-start'
                }}
                >
                 <Ionicons
                      name="md-mail"
                      color='#B01125'
                      size={20}
                      style={{top:0, right:5}}
                 />
               <AppText nol={2} textAlign="left" family="Poppins-Regular" size={hp("1.7%")} color="black" Label={"ahsanmuneer81@gmail.com"} />
            
              </View>
               <View
                style={{
                  flexDirection:'row',
                  alignItems:'flex-start'
                }}
                >
                 <Ionicons
                      name="home"
                      color='#B01125'
                      size={20}
                      style={{top:0, right:5}}
                 />
               <AppText nol={2} textAlign="left" family="Poppins-Regular" size={hp("1.7%")} color="black" Label={"Lives in Karachi"} />
            
              </View>
               <View
                style={{
                  flexDirection:'row',
                  alignItems:'flex-start'
                }}
                >
                 <Ionicons
                      name="ios-heart-sharp"
                      color='#B01125'
                      size={20}
                      style={{top:0, right:5}}
                 />
               <AppText nol={2} textAlign="left" family="Poppins-Regular" size={hp("1.7%")} color="black" Label={"Single"} />
            
              </View>
              <View
                style={{
                  flexDirection:'row',
                  alignItems:'flex-start'
                }}
                >
                 <Ionicons
                      name="today"
                      color='#B01125'
                      size={20}
                      style={{top:0, right:5}}
                 />
               <AppText nol={2} textAlign="left" family="Poppins-Regular" size={hp("1.7%")} color="black" Label={"Nov 11, 1996"} />
            
              </View>
              <View
                style={{
                  flexDirection:'row',
                  alignItems:'flex-start'
                }}
                >
                 <Ionicons
                      name="ios-information-circle"
                      color='#B01125'
                      size={20}
                      style={{top:0, right:5}}
                 />
               <AppText nol={3} textAlign="left" family="Poppins-Regular" size={hp("1.7%")} color="black"
                Label={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} />
            
              </View>
             
             </View>
                        }
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                          [{nativeEvent: {contentOffset:{y: AnimatedHeaderValue}}}],
                          {useNativeDriver: false}  
                        )}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={{width: '90%', alignSelf:'center' }}
                        // ListFooterComponent={
                        //     <View style={{height: 150}}/>
                        // }
                    />
                    
            
            
        </SafeAreaView>
     )
 }
 export default ProfileScreen;


 var styles = StyleSheet.create({
  contentbellowImage:{
    justifyContent:'space-between',
  
    width: 150,
    width: 150,
    alignItems:'center',
    flexDirection:'row',
    top: 20
  },
   upperImage:{
    justifyContent:'center', flexDirection:'row', width: '95%', top:20, alignItems:'center'
   },
    image:{
       alignItems:'center',
      zIndex: 1,top: -300,
      
    }, 
    imagebackground:{
       height: imageHeight ,
       width: '100%',
       opacity: 0.85,
      //  borderWidth: 2,
      //  borderColor: 'white'
      },
    container: {
        height: hp('103%'),
        backgroundColor: 'white'
      },
    touchableOpacity:{
        backgroundColor: 'white',
        borderWidth: 0,
        borderColor: 'white',
        width: wp('100%'),
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        bottom: 20,
        marginTop: 10,
      },
    touchableOpacity1:{
        backgroundColor: 'white',
        borderWidth: 0,
        borderColor: 'white',
        width: wp('29%'),
        height: hp('4%'),
        justifyContent: 'center',
        borderRadius: 25,
        alignItems:'center',
        flexDirection:'row',
        alignContent:'center',
        alignSelf:'center',
        elevation: 4,
        zIndex: 999,
    },
    container2: {
        flex: 1,
        marginVertical: 20,
    },
    item: {
        borderRadius:12,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: -4,
        height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        color: '#fff',
    },
})