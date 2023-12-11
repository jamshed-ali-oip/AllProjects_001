import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView
} from 'react-native';
import React, {useState} from 'react';
const {height, width} = Dimensions.get('window');
import CPage1 from './CPage1';
import CPage2 from './CPage2';
import CPage3 from './CPage3';
import CPage4 from './CPage4';
import CPage5 from './CPage5';
import CPage6 from './CPage6';
import CPage7 from './CPage7';
import CPage8 from './CPage8';
import CPage9 from './CPage9';
import CPage10 from './CPage10';
import CPage11 from './CPage11';
import CPage12 from './CPage12';



const Connexion = () => {
  const [Page, setPage] = useState(1);
  const [select , setSelect] = useState();
  const [Data, setData] = useState();

  
  // console.log(Data,"PAGEPAGEPAGEPAGEPAGEPAGEPAGE")
  
  return (
    <>
      <ScrollView>
        {Page == 1 ? (
          <CPage1  setPage={setPage} Page={Page}/>
        ) : Page == 2 ? (
          <CPage2 setData={setData} Data={Data} setPage={setPage}/>
        ) : Page == 3 ? (
          <CPage3 setPage={setPage} Page={Page} Data={Data}/>
        ) : Page == 4 ? (
          <CPage4 setPage={setPage} />
        ) : Page == 5 ? (
          <CPage5 setPage={setPage} />
        ) : Page == 6 ? (
          <CPage6 setPage={setPage} />
        ) : Page == 7 ? (
          <CPage7 setPage={setPage} />
        ) : Page == 8 ? (
          <CPage8 setPage={setPage} />
        ) : Page == 9 ? (
          <CPage9 setPage={setPage} />
        ) : Page == 10 ? (
          <CPage10 setPage={setPage} />
        ) : Page == 11 ? (
          <CPage11 setPage={setPage} />
        ) :  Page == 12 ? (
          <CPage12 setPage={setPage} />
        ) : null}
        {/* <View style={styles.cont}>
          <TouchableOpacity
            disabled={Page == 1 ? true : false}
            onPress={() => {
              setPage(Page - 1);
            }}>
            <Image
              style={styles.navimg}
              source={
                // Page==1?null:Page==5?null:
                require('../../assets/images/prev.png')
              }
            />
          </TouchableOpacity>
          {
            Page == 8 ? 
              <TouchableOpacity 
              style={styles.middleView}
              disabled={Page <8 && Page > 8 ? true : false }
              >
                <Text style={styles.btnText}>
                  Confirmer
                </Text>
              </TouchableOpacity>
              :
              null 
          }

          <TouchableOpacity
            disabled={Page == 12 ? true : false}
            onPress={() => {
              setPage(Page + 1);
            }}>
            <Image
              style={[styles.navimg,{tintColor:Page==12?Platform.OS=='ios'?"white":null:null}]}
              source={
                Page == 11 ? null : require('../../assets/images/next.png')
              }
            />
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </>
  );
};

export default Connexion;

const styles = StyleSheet.create({
  check: {
    // backgroundColor: 'red',
    width: width * 0.075,
    height: height * 0.04,
    borderRadius: width * 0.038,
    justifyContent: 'center',
    alignItems: 'center',
    // padding:widsth
  },
  line: {
    width: width * 0.085,
    borderWidth: width * 0.0015,
    // borderColor:"red",
    height: 0,
    alignSelf: 'center',
  },
  container: {
    alignSelf: 'center',
    marginTop: height * 0.01,
  },
  num: {
    fontSize: width * 0.035,
    color: 'white',
    fontWeight: '600',
  },
  cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom:height*0.02,
    paddingHorizontal:width*0.02,
  },
  navimg: {
    height: height * 0.047,
    width: width * 0.12,
    resizeMode: 'contain',
    marginTop: height * 0.01,
    // marginHorizontal: width * 0.09,
  },
  middleView: {
    width: width * 0.6,
    height: height * 0.05,
    borderWidth: 2,
    borderColor: '#ffbc15',
    borderRadius: width * 0.018,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: width * 0.038, 
    fontFamily: 'Bebas Neue Pro Bold', 
    color:'#ffbc15'
    }
});
 