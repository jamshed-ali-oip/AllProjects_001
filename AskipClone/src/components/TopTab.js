import React from 'react';
import {
  View,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Colors from './Colors';
import MesScreen from '../screens/ProfileScreens/MesScreen';
import Connexion from '../screens/ProfileScreens/Connexion';
import Trophies from '../screens/ProfileScreens/Trophies';
const {height, width} = Dimensions.get('window');

const TopTab = () => {
  //   const layout = useWindowDimensions();

  const FirstRoute = ()=>{
    return(
     <>
     <MesScreen/>
     </>    );
  };

  const SecondRoute = () =>{
    return(
      <>
      <Connexion/>
      </>
    )
  }

                                // commited for v2

//   const ThirdRoute = () => {
// return(
//   <>
//     <Trophies/>
//     </>

// )
//       }
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    // third: ThirdRoute,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Mes informations'},
    {key: 'second', title: 'Connexion'},
    // {key: 'third', title: 'Mes trophées et mes points'},       // commited for v2
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: width}}
      
      renderTabBar={props => (
        <TabBar
        
          indicatorStyle={{backgroundColor: '#081a4f'}}
          {...props}
          style={{backgroundColor: 'white'}}
          labelStyle={{}}
          renderLabel={({route, focused, color}) => (
            <Text style={{color: focused ? Colors.theme_color : '#abacae',fontWeight:"700",fontSize:width*0.038,textAlign:"center"}}>
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
};

export default TopTab;

const styles = StyleSheet.create({});
